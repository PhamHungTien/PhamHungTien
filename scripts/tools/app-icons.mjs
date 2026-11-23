/**
 * Updates each app icon from its Icon Composer render.
 *
 *   npm run icons                       on the Mac, from the documents in ~/Documents
 *   npm run icons -- --from <dir>       from <dir>/<slug>.png (a 1024 px render) on any machine
 *
 * Icons: Apple's ictool (Xcode → Icon Composer) renders the document exactly as App Store
 * builds do, Liquid Glass included, at 1024 px; it is saved at 512 px as
 * src/assets/apps/<slug>/app-icon.png. Store builds only expose 152–256 px icons, so they
 * are not used.
 *
 * After changing icons, run `npm run og` and bump OG_VERSION in src/lib/seo.ts.
 */
import { existsSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

/** Each app's Icon Composer document, relative to ~/Documents. */
const SOURCES = {
  phtv: 'PHTV-AppStore/Apps/macOS/PHTV.icon',
  vtts: 'vTTS/platforms/apple/vTTS.icon',
  padcodeai: 'PadCodeAI/PadCodeAI.icon',
  padnotesai: 'PadNotesAI/PadNotesAI.icon',
  mynasmanager: 'MyNASManager/MyNASManager.icon',
  lunarv: 'LunarV/LunarV.icon',
  lunarblock: 'LunarBlock/LunarBlock.icon',
};
const ICTOOL =
  '/Applications/Xcode.app/Contents/Applications/Icon Composer.app/Contents/Executables/ictool';
const ICON = 512;

const args = process.argv.slice(2);
const fromIndex = args.indexOf('--from');
const from = fromIndex >= 0 ? args[fromIndex + 1] : null;
if (!from && !existsSync(ICTOOL)) console.warn('ictool not found (Xcode 26+): icons are skipped.');

async function writeIcon(slug, render) {
  await sharp(render)
    .resize(ICON, ICON)
    .png({ compressionLevel: 9 })
    .toFile(join('src/assets/apps', slug, 'app-icon.png'));
}

const scratch = await mkdtemp(join(tmpdir(), 'app-icons-'));
for (const [slug, source] of Object.entries(SOURCES)) {
  if (from) {
    const render = join(from, `${slug}.png`);
    if (existsSync(render)) await writeIcon(slug, render);
    else console.warn(`${slug}: no render at ${render}`);
    continue;
  }
  const document = join(homedir(), 'Documents', source);
  if (!existsSync(document)) {
    console.warn(`${slug}: no Icon Composer document at ${document}`);
    continue;
  }
  if (existsSync(ICTOOL)) {
    const render = join(scratch, `${slug}.png`);
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
      console.warn(`${slug}: ictool failed: ${result.stderr?.trim() || result.error?.message}`);
    } else if (existsSync(render)) await writeIcon(slug, render);
  }
}
await rm(scratch, { recursive: true, force: true });
console.log('Done. The app pages and home scene use the updated icons.');
