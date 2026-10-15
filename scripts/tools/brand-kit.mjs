#!/usr/bin/env node
/**
 * Builds the brand kit in brand/ from the logo geometry in src/assets/brand/logo.svg:
 * SVG marks and lockups (wordmark converted to outlines, so no font is needed to open
 * them), PNG exports, favicons, social images and a preview sheet.
 *
 *   node scripts/tools/brand-kit.mjs
 */
import sharp from 'sharp';
import opentype from 'opentype.js';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const OUT = 'brand';
const C = {
  maroon: '#7a1424',
  gold: '#f0c04e',
  white: '#ffffff',
  ink: '#131a27',
  night: '#0d1118',
};
const NAME = 'Phạm Hùng Tiến';

// ------------------------------------------------------------------ geometry
// The mark: a "T" for Tiến whose crossbar is an app tile resting on the stem.
const tile = (fill, rx = 15) => `<rect width="64" height="64" rx="${rx}" fill="${fill}"/>`;
const stem = (fill) => `<rect x="27.5" y="22" width="9" height="28" rx="4.5" fill="${fill}"/>`;
const bar = (fill) => `<rect x="14" y="13" width="36" height="14" rx="7" fill="${fill}"/>`;

const markBody = ({ rx = 15 } = {}) => `${tile(C.maroon, rx)}${stem(C.white)}${bar(C.gold)}`;
/** Single colour: the tile with the T cut out, for stamping, embossing and fax-grade use. */
const monoBody = (fill, id) =>
  `<mask id="${id}"><rect width="64" height="64" fill="#fff"/>${stem('#000')}${bar('#000')}</mask>` +
  `<rect width="64" height="64" rx="15" fill="${fill}" mask="url(#${id})"/>`;

const svg = (w, h, body, label = NAME) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w * 8}" height="${h * 8}" role="img" aria-label="${label}">\n  ${body}\n</svg>\n`;

// ------------------------------------------------------------------ wordmark
const fontDir = 'node_modules/@fontsource/be-vietnam-pro/files';
const loadFont = async (subset) =>
  opentype.parse(
    (await readFile(`${fontDir}/be-vietnam-pro-${subset}-700-normal.woff`)).buffer.slice(0),
  );
const fonts = [await loadFont('latin'), await loadFont('vietnamese')];
const pick = (ch) => fonts.find((f) => f.charToGlyphIndex(ch) > 0) ?? fonts[0];

/** Outlines `text` at `size` with the baseline at (x, y); returns { d, width }. */
function wordmark(text, x, y, size, tracking = -0.02) {
  let cursor = x;
  let d = '';
  for (const ch of text) {
    const font = pick(ch);
    const glyph = font.charToGlyph(ch);
    d += glyph.getPath(cursor, y, size).toPathData(2);
    cursor += (glyph.advanceWidth / font.unitsPerEm) * size + tracking * size;
  }
  return { d, width: cursor - x - tracking * size };
}
const capHeight = (size) => (fonts[0].tables.os2.sCapHeight / fonts[0].unitsPerEm) * size;

// Horizontal lockup: caps centred on the mark, gap = half the mark.
function horizontal(textFill) {
  const size = 30;
  const x = 64 + 18;
  const { d, width } = wordmark(NAME, x, 32 + capHeight(size) / 2, size);
  return {
    w: Math.ceil(x + width + 2),
    h: 64,
    body: `${markBody()}<path fill="${textFill}" d="${d}"/>`,
  };
}

// Stacked lockup: mark above, name centred below.
function stacked(textFill) {
  const size = 26;
  const probe = wordmark(NAME, 0, 0, size);
  const w = Math.ceil(Math.max(probe.width, 64) + 8);
  const { d } = wordmark(NAME, (w - probe.width) / 2, 64 + 22 + capHeight(size), size);
  const mx = (w - 64) / 2;
  return {
    w,
    h: 64 + 22 + Math.ceil(capHeight(size)) + 10,
    body: `<g transform="translate(${mx} 0)">${markBody()}</g><path fill="${textFill}" d="${d}"/>`,
  };
}

// ------------------------------------------------------------------ outputs
const write = (path, data) => writeFile(`${OUT}/${path}`, data);
const render = (svgText, width, height = width) =>
  // Rasterise at the target size directly (vector → exact pixels, no resampling blur).
  sharp(
    Buffer.from(
      svgText.replace(
        /<svg([^>]*?) width="[^"]*" height="[^"]*"/,
        `<svg$1 width="${width}" height="${height}"`,
      ),
    ),
  )
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();

await rm(OUT, { recursive: true, force: true });
for (const dir of ['svg', 'png', 'favicon', 'social'])
  await mkdir(`${OUT}/${dir}`, { recursive: true });

const marks = {
  'logo-mark': svg(64, 64, markBody()),
  'logo-mark-square': svg(64, 64, markBody({ rx: 0 })),
  'logo-glyph': svg(
    36,
    37,
    `<g transform="translate(-14 -13)">${stem(C.maroon)}${bar(C.gold)}</g>`,
  ),
  'logo-mono-black': svg(64, 64, monoBody('#000000', 'cut')),
  'logo-mono-white': svg(64, 64, monoBody('#ffffff', 'cut')),
};
const lockups = {
  'lockup-horizontal': horizontal(C.ink),
  'lockup-horizontal-dark': horizontal(C.white),
  'lockup-stacked': stacked(C.ink),
  'lockup-stacked-dark': stacked(C.white),
};
for (const [name, value] of Object.entries(lockups))
  marks[name] = svg(value.w, value.h, value.body);
for (const [name, text] of Object.entries(marks)) await write(`svg/${name}.svg`, text);

for (const size of [16, 32, 48, 64, 128, 180, 192, 256, 512, 1024]) {
  await write(`png/logo-mark-${size}.png`, await render(marks['logo-mark'], size));
}
await write('png/logo-mark-square-1024.png', await render(marks['logo-mark-square'], 1024));
await write('png/logo-mono-black-512.png', await render(marks['logo-mono-black'], 512));
await write('png/logo-mono-white-512.png', await render(marks['logo-mono-white'], 512));
for (const [name, { w, h }] of Object.entries(lockups)) {
  const scale = 12; // 64 units → 768 px tall for horizontal, plenty for print and slides
  await write(`png/${name}.png`, await render(marks[name], w * scale, h * scale));
}

for (const file of [
  'favicon.svg',
  'favicon.ico',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'site.webmanifest',
]) {
  await copyFile(`public/${file}`, `${OUT}/favicon/${file}`);
}

// Social: avatar (square, full bleed, platforms crop to a circle) and a 3:1 header.
const avatar = svg(
  64,
  64,
  `<rect width="64" height="64" fill="${C.maroon}"/><g transform="translate(9.6 9.6) scale(.7)">${stem(C.white)}${bar(C.gold)}</g>`,
);
await write('svg/avatar.svg', avatar);
await write('social/avatar-1024.png', await render(avatar, 1024));

const lockupDark = lockups['lockup-horizontal-dark'];
const bw = 1500;
const bh = 500;
const s = Math.min((bw * 0.62) / lockupDark.w, (bh * 0.34) / lockupDark.h);
const banner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${bw} ${bh}" width="${bw}" height="${bh}">
  <rect width="${bw}" height="${bh}" fill="${C.night}"/>
  <rect x="0" y="${bh - 10}" width="${bw}" height="10" fill="${C.maroon}"/>
  <rect x="0" y="${bh - 10}" width="${bw * 0.18}" height="10" fill="${C.gold}"/>
  <g transform="translate(${(bw - lockupDark.w * s) / 2} ${(bh - lockupDark.h * s) / 2}) scale(${s})">${lockupDark.body}</g>
</svg>\n`;
await write('svg/banner-1500x500.svg', banner);
await write('social/banner-1500x500.png', await render(banner, bw, bh));
await copyFile('public/og/home.png', `${OUT}/social/og-home-1200x630.png`);

// Preview sheet: every asset on the background it is meant for.
const cell = (x, y, w, h, bg, inner, iw, ih, label) => {
  const scale = Math.min((w - 80) / iw, (h - 90) / ih);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${bg}" stroke="#d9dee6"/>
  <g transform="translate(${x + (w - iw * scale) / 2} ${y + 26 + (h - 70 - ih * scale) / 2}) scale(${scale})">${inner}</g>
  <text x="${x + 20}" y="${y + h - 18}" font-family="sans-serif" font-size="15" fill="${bg === C.night || bg === C.maroon ? '#9aa4b6' : '#566074'}">${label}</text>`;
};
const inner = (svgText) => svgText.replace(/^<svg[^>]*>|<\/svg>\s*$/g, '');
const pw = 1600;
const ph = 1240;
const preview = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${pw} ${ph}" width="${pw}" height="${ph}">
  <rect width="${pw}" height="${ph}" fill="#f3f5f8"/>
  <text x="40" y="70" font-family="sans-serif" font-weight="700" font-size="34" fill="${C.ink}">Phạm Hùng Tiến — brand kit</text>
  ${cell(40, 110, 360, 300, '#ffffff', inner(marks['logo-mark']), 64, 64, 'logo-mark')}
  ${cell(420, 110, 360, 300, C.night, inner(marks['logo-mark']), 64, 64, 'logo-mark on dark')}
  ${cell(800, 110, 360, 300, '#ffffff', inner(marks['logo-glyph']), 36, 37, 'logo-glyph')}
  ${cell(1180, 110, 180, 300, '#ffffff', inner(marks['logo-mono-black']), 64, 64, 'mono black')}
  ${cell(1380, 110, 180, 300, C.maroon, inner(marks['logo-mono-white']), 64, 64, 'mono white')}
  ${cell(40, 430, 760, 260, '#ffffff', lockups['lockup-horizontal'].body, lockups['lockup-horizontal'].w, 64, 'lockup-horizontal')}
  ${cell(820, 430, 740, 260, C.night, lockups['lockup-horizontal-dark'].body, lockups['lockup-horizontal-dark'].w, 64, 'lockup-horizontal-dark')}
  ${cell(40, 710, 500, 490, '#ffffff', lockups['lockup-stacked'].body, lockups['lockup-stacked'].w, lockups['lockup-stacked'].h, 'lockup-stacked')}
  ${cell(560, 710, 500, 490, C.night, lockups['lockup-stacked-dark'].body, lockups['lockup-stacked-dark'].w, lockups['lockup-stacked-dark'].h, 'lockup-stacked-dark')}
  <g font-family="sans-serif" font-size="16">
    ${[
      [C.maroon, 'Maroon', '#7A1424'],
      [C.gold, 'Gold', '#F0C04E'],
      [C.ink, 'Ink', '#131A27'],
      [C.night, 'Night', '#0D1118'],
      ['#ffffff', 'White', '#FFFFFF'],
    ]
      .map(
        ([fill, label, hex], i) =>
          `<rect x="1080" y="${710 + i * 98}" width="80" height="80" rx="14" fill="${fill}" stroke="#d9dee6"/>
    <text x="1180" y="${745 + i * 98}" font-weight="700" fill="${C.ink}">${label}</text>
    <text x="1180" y="${770 + i * 98}" fill="#566074">${hex}</text>`,
      )
      .join('\n    ')}
  </g>
</svg>\n`;
await write('preview.png', await render(preview, pw, ph));

console.log(`✓ brand kit written to ${OUT}/`);
