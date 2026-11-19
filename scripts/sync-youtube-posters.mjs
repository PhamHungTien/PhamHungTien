/**
 * Saves a local poster for every YouTube video the site embeds, so pages show the video
 * frame as an optimised AVIF/WebP image and contact no Google server until a visitor
 * presses play. Run after adding a video: npm run sync:youtube
 *
 * Videos are found in app data (youtubeId: '…') and guide front matter (youtubeId: …).
 * The largest 16:9 thumbnail YouTube offers is kept; existing posters are left alone
 * unless --force is passed.
 */
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const destination = new URL('src/assets/youtube/', root);
const force = process.argv.includes('--force');

async function files(dir) {
  const entries = await readdir(new URL(dir, root), { withFileTypes: true });
  return entries.filter((e) => e.isFile()).map((e) => `${dir}${e.name}`);
}

const sources = [...(await files('src/data/apps/')), ...(await files('src/content/guides/'))];
const ids = new Set();
for (const file of sources) {
  const text = await readFile(new URL(file, root), 'utf8');
  for (const match of text.matchAll(/youtubeId:\s*['"]?([\w-]{11})['"]?/g)) ids.add(match[1]);
}

// Largest first; maxres and hq720 are 16:9, the rest are letterboxed 4:3 fallbacks.
const variants = ['maxresdefault', 'hq720', 'sddefault', 'hqdefault'];

await mkdir(destination, { recursive: true });
let saved = 0;
for (const id of ids) {
  const target = new URL(`${id}.jpg`, destination);
  if (!force) {
    try {
      await access(target);
      continue;
    } catch {}
  }
  let done = false;
  for (const variant of variants) {
    const response = await fetch(`https://i.ytimg.com/vi/${id}/${variant}.jpg`, {
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) continue;
    await writeFile(target, Buffer.from(await response.arrayBuffer()));
    console.log(`${id}: ${variant}`);
    saved++;
    done = true;
    break;
  }
  if (!done) throw new Error(`No thumbnail found for YouTube video ${id}`);
}
console.log(`${ids.size} videos, ${saved} posters saved in src/assets/youtube/.`);
