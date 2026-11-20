/**
 * Updates every app's icon and orbit planet from its Icon Composer document.
 *
 *   npm run icons                       on the Mac, from the documents in ~/Documents
 *   npm run icons -- --from <dir>       from <dir>/<slug>.png (a 1024 px render) and
 *                                       <dir>/<slug>.icon (the document), on any machine
 *
 * Icons: Apple's ictool (Xcode → Icon Composer) renders the document exactly as App Store
 * builds do, Liquid Glass included, at 1024 px; it is saved at 512 px as
 * src/assets/apps/<slug>/app-icon.png. Store builds only expose 152–256 px icons, so they
 * are not used.
 *
 * Planets: the document's layers, each tinted with its own fill and placed as on the icon
 * canvas, are cropped to the artwork, centred on a square and saved as
 * src/assets/planet-artwork/<slug>.png. Glow layers the planet draws itself are left out.
 * The planet colours to copy into src/data/planet-appearance.ts are printed (background
 * gradient start = lit pole, end = body; glyph fill).
 *
 * After changing icons, run `npm run og` and bump OG_VERSION in src/lib/seo.ts.
 */
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

/** Each app's Icon Composer document, relative to ~/Documents, and layers to leave out. */
const SOURCES = {
  phtv: { icon: 'PHTV-AppStore/Apps/macOS/PHTV.icon' },
  vtts: { icon: 'vTTS/platforms/apple/vTTS.icon' },
  padcodeai: { icon: 'PadCodeAI/PadCodeAI.icon' },
  padnotesai: { icon: 'PadNotesAI/PadNotesAI.icon' },
  mynasmanager: { icon: 'MyNASManager/MyNASManager.icon' },
  lunarv: { icon: 'LunarV/LunarV.icon' },
  lunarblock: { icon: 'LunarBlock/LunarBlock.icon', skip: ['Halo.svg'] },
};
const ICTOOL =
  '/Applications/Xcode.app/Contents/Applications/Icon Composer.app/Contents/Executables/ictool';
const CANVAS = 1024;
const PLANET = 640;
const ICON = 512;

const args = process.argv.slice(2);
const fromIndex = args.indexOf('--from');
const from = fromIndex >= 0 ? args[fromIndex + 1] : null;
if (!from && !existsSync(ICTOOL)) console.warn('ictool not found (Xcode 26+): icons are skipped.');

/** "display-p3:r,g,b,a" → a CSS color() and 0–255 channels for tinting. */
function color(value) {
  const [space, rest] = value.includes(':') ? value.split(':') : ['srgb', value];
  const [r, g, b] = rest.split(',').map(Number);
  const css = `color(${space === 'display-p3' ? 'display-p3' : 'srgb'} ${r} ${g} ${b})`;
  return { css, rgb: [r, g, b].map((c) => Math.round(Math.min(1, Math.max(0, c)) * 255)) };
}

async function writeIcon(slug, render) {
  await sharp(render)
    .resize(ICON, ICON)
    .png({ compressionLevel: 9 })
    .toFile(join('src/assets/apps', slug, 'app-icon.png'));
}

async function writePlanet(slug, path, skip) {
  const doc = JSON.parse(await readFile(join(path, 'icon.json'), 'utf8'));

  const layers = [];
  let glyphFill = null;
  // Groups and layers are listed front to back; draw back to front.
  for (const group of [...doc.groups].reverse()) {
    for (const layer of [...group.layers].reverse()) {
      const name = layer['image-name'];
      if (!name || skip.has(name)) continue;
      const file = join(path, 'Assets', name);
      const source = await readFile(file);
      const scale = layer.position?.scale ?? 1;
      const [dx, dy] = layer.position?.['translation-in-points'] ?? [0, 0];
      // Vector layers share the icon canvas; bitmap layers are scaled from their own size.
      const meta = await sharp(source).metadata();
      const vector = name.endsWith('.svg');
      const width = Math.round((vector ? CANVAS : (meta.width ?? CANVAS)) * scale);
      const height = Math.round((vector ? CANVAS : (meta.height ?? CANVAS)) * scale);
      let image = await sharp(source, { density: 300 })
        .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .ensureAlpha()
        .png()
        .toBuffer();
      if (layer.fill?.solid) {
        const { rgb } = color(layer.fill.solid);
        glyphFill ??= layer.fill.solid;
        const alpha = await sharp(image).extractChannel('alpha').toBuffer();
        image = await sharp({
          create: { width, height, channels: 3, background: { r: rgb[0], g: rgb[1], b: rgb[2] } },
        })
          .joinChannel(alpha)
          .png()
          .toBuffer();
      }
      layers.push({
        input: image,
        left: Math.round((CANVAS - width) / 2 + dx),
        top: Math.round((CANVAS - height) / 2 + dy),
      });
    }
  }

  const composed = await sharp({
    create: {
      width: CANVAS,
      height: CANVAS,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(layers)
    .png()
    .toBuffer();
  // Crop to the artwork and centre it on a square, so every planet scales it the same way.
  const trimmed = await sharp(composed)
    .trim({ threshold: 1 })
    .png()
    .toBuffer({ resolveWithObject: true });
  const side = Math.max(trimmed.info.width, trimmed.info.height);
  // sharp resizes before it composites, so square up first and scale in a second pass.
  const square = await sharp({
    create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      {
        input: trimmed.data,
        left: Math.round((side - trimmed.info.width) / 2),
        top: Math.round((side - trimmed.info.height) / 2),
      },
    ])
    .png()
    .toBuffer();
  await sharp(square)
    .resize(PLANET, PLANET)
    .png({ compressionLevel: 9 })
    .toFile(join('src/assets/planet-artwork', `${slug}.png`));

  const fill = doc.fill ?? {};
  const [pole, base] = fill['linear-gradient'] ?? [fill.solid, fill.solid];
  console.log(
    JSON.stringify({
      slug,
      base: base && color(base).css,
      pole: pole && color(pole).css,
      glyph: glyphFill && color(glyphFill).css,
      aspect: +(trimmed.info.width / trimmed.info.height).toFixed(3),
    }),
  );
}

const scratch = await mkdtemp(join(tmpdir(), 'app-icons-'));
for (const [slug, source] of Object.entries(SOURCES)) {
  const document = from ? join(from, `${slug}.icon`) : join(homedir(), 'Documents', source.icon);
  if (!existsSync(document)) {
    console.warn(`${slug}: no Icon Composer document at ${document}`);
    continue;
  }
  let render = from ? join(from, `${slug}.png`) : join(scratch, `${slug}.png`);
  if (!from && existsSync(ICTOOL)) {
    const result = spawnSync(
      ICTOOL,
      [document, '--export-image', '--output-file', render, '--platform', 'iOS'].concat([
        '--rendition',
        'Default',
        '--width',
        '1024',
        '--height',
        '1024',
        '--scale',
        '1',
      ]),
      { encoding: 'utf8' },
    );
    if (result.status !== 0) {
      console.warn(`${slug}: ictool failed: ${result.stderr.trim()}`);
      render = null;
    }
  }
  if (render && existsSync(render)) await writeIcon(slug, render);
  await writePlanet(slug, document, new Set(source.skip ?? []));
}
await rm(scratch, { recursive: true, force: true });
console.log('Done. Copy the printed colours into src/data/planet-appearance.ts if they changed.');
