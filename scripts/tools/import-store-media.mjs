/**
 * Copies App Store media into the site in web-ready formats.
 *
 *   node scripts/tools/import-store-media.mjs <media-dir>
 *
 * <media-dir> is the folder written by `npm run sync:media` (scripts/sync-appstore-media.mjs):
 * <slug>/<locale>/{header,search,iphone-NN,ipad-NN,mac-NN,vision-NN,preview-*}.jpg|mp4.
 * Images become WebP and previews are copied, all into src/assets/apps/<slug>/store/<lang>/.
 * Astro makes the responsive image sizes at build time and gives every file a hashed,
 * cacheable URL. Each target folder is replaced, so removed screenshots disappear too.
 */
import { readdir, mkdir, rm, copyFile, stat } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const source = process.argv[2];
if (!source) {
  console.error('usage: node scripts/tools/import-store-media.mjs <media-dir>');
  process.exit(1);
}

/** App Store locale → site language folder. */
const LANG = { 'en-US': 'en', vi: 'vi', 'zh-Hans': 'zh' };
/** Longest edge kept for each kind; Astro scales down from here. */
const MAX = {
  iphone: 1320,
  ipad: 1600,
  mac: 2400,
  vision: 2400,
  header: 2560,
  search: 1920,
  preview: 1280,
};

let images = 0;
let videos = 0;
for (const slug of await readdir(source)) {
  if (!(await stat(join(source, slug))).isDirectory()) continue;
  for (const locale of await readdir(join(source, slug))) {
    const lang = LANG[locale];
    if (!lang) continue;
    const from = join(source, slug, locale);
    const imageDir = join('src/assets/apps', slug, 'store', lang);
    await rm(imageDir, { recursive: true, force: true });
    await mkdir(imageDir, { recursive: true });
    for (const file of (await readdir(from)).sort()) {
      const ext = extname(file);
      const name = basename(file, ext);
      if (ext === '.mp4') {
        await copyFile(join(from, file), join(imageDir, file));
        videos++;
        continue;
      }
      if (ext !== '.jpg' && ext !== '.png') continue;
      const kind = name.replace(/-\d+$/, '').replace(/^preview-.*/, 'preview');
      const max = MAX[kind] ?? 2400;
      await sharp(join(from, file))
        .resize({ width: max, height: max, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: kind === 'header' || kind === 'search' ? 84 : 82, effort: 5 })
        .toFile(join(imageDir, `${name}.webp`));
      images++;
    }
  }
}
console.log(`Imported ${images} images and ${videos} previews.`);
