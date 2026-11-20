/**
 * Pulls every app's App Store media from App Store Connect and puts it on the website.
 *
 *   npm run sync:media                 download, then import into src/assets/apps/<slug>/store
 *   npm run sync:media -- --download-only --out <dir>   download only
 *   npm run sync:media -- --app lunarv --no-video        one app, skip previews
 *
 * What it takes from the newest App Store version of each platform, per page language:
 *   screenshots (iPhone 6.9"/6.5", iPad 13", Mac, Apple Vision Pro), the first App Preview
 *   of each device, and the product page header and search results art from the app's
 *   asset library. Versions still in review are included, so the site can show new media
 *   before the release goes live.
 *
 * Credentials: an App Store Connect API key (AuthKey_<KEYID>.p8) and "Issuer ID.txt" in
 * ASC_KEY_DIR (default ~/Documents/Apple App Manager). They are read, never printed or copied.
 * Previews need ffmpeg (brew install ffmpeg). Writes docs/provenance/appstore-media.json.
 */
import { createPrivateKey, sign } from 'node:crypto';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join, posix } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};

/** Bundle id → site slug, and the page languages each app needs (App Store locales). */
const APPS = {
  'com.phamhungtien.phtv.appstore': { slug: 'phtv', locales: ['en-US', 'vi'] },
  'com.phamhungtien.vTTS': { slug: 'vtts', locales: ['en-US'] },
  'com.phamhungtien.PadCodeAI': { slug: 'padcodeai', locales: ['en-US'] },
  'com.phamhungtien.PadNotesAI': { slug: 'padnotesai', locales: ['en-US'] },
  'com.phamhungtien.MyNASManager': { slug: 'mynasmanager', locales: ['en-US'] },
  'com.phamhungtien.LunarV': { slug: 'lunarv', locales: ['en-US', 'vi', 'zh-Hans'] },
  'com.phamhungtien.LunarBlock': { slug: 'lunarblock', locales: ['en-US'] },
};
const SHOT_TYPES = [
  ['APP_IPHONE_67', 'iphone'],
  ['APP_IPHONE_65', 'iphone'],
  ['APP_IPAD_PRO_3GEN_129', 'ipad'],
  ['APP_DESKTOP', 'mac'],
  ['APP_APPLE_VISION_PRO', 'vision'],
];
const PREVIEW_TYPES = [
  ['IPHONE_67', 'iphone'],
  ['IPHONE_65', 'iphone'],
  ['IPAD_PRO_3GEN_129', 'ipad'],
  ['DESKTOP', 'mac'],
];
/** Longest edge requested from Apple's image service (it resizes on request). */
const MAX_EDGE = { iphone: 1320, ipad: 1600, mac: 2400, vision: 2400, art: 2560, poster: 1280 };

const keyDir = process.env.ASC_KEY_DIR ?? join(homedir(), 'Documents', 'Apple App Manager');
const keyFile = (await readdir(keyDir)).find((name) => /^AuthKey_[A-Z0-9]+\.p8$/.test(name));
if (!keyFile) throw new Error(`No AuthKey_<KEYID>.p8 in ${keyDir} (set ASC_KEY_DIR)`);
const keyId = keyFile.slice(8, -3);
const privateKey = createPrivateKey(await readFile(join(keyDir, keyFile), 'utf8'));
const issuer = (await readFile(join(keyDir, 'Issuer ID.txt'), 'utf8')).trim();

let token = { value: '', expires: 0 };
function bearer() {
  const now = Math.floor(Date.now() / 1000);
  if (token.value && token.expires - now > 120) return token.value;
  const b64 = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const body = `${b64({ alg: 'ES256', kid: keyId, typ: 'JWT' })}.${b64({ iss: issuer, iat: now, exp: now + 900, aud: 'appstoreconnect-v1' })}`;
  const signature = sign('sha256', Buffer.from(body), {
    key: privateKey,
    dsaEncoding: 'ieee-p1363',
  });
  token = { value: `${body}.${signature.toString('base64url')}`, expires: now + 900 };
  return token.value;
}

async function api(path, params) {
  const url = new URL(path, 'https://api.appstoreconnect.apple.com');
  for (const [key, value] of Object.entries(params ?? {})) url.searchParams.set(key, value);
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(url, { headers: { Authorization: `Bearer ${bearer()}` } });
    if (response.ok) return response.json();
    if (response.status === 401 && attempt < 2) token.value = '';
    else if ([429, 500, 502, 503].includes(response.status) && attempt < 3)
      await new Promise((resolve) => setTimeout(resolve, 2000 * (attempt + 1)));
    else throw new Error(`App Store Connect ${response.status} for ${url.pathname}`);
  }
}

/** All pages of a collection, with `included` resources indexed by id. */
async function collection(path, params) {
  const data = [];
  const included = new Map();
  let page = await api(path, params);
  for (;;) {
    data.push(...page.data);
    for (const item of page.included ?? []) included.set(item.id, item);
    if (!page.links?.next) return { data, included };
    page = await api(page.links.next);
  }
}

function imageUrl(asset, maxEdge, format = 'jpg') {
  const scale = Math.min(1, maxEdge / Math.max(asset.width, asset.height));
  return asset.templateUrl
    .replace('{w}', String(Math.round(asset.width * scale)))
    .replace('{h}', String(Math.round(asset.height * scale)))
    .replace('{f}', format);
}

async function download(url, file) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
}

/** App Previews are HLS whose segments are byte ranges of one fMP4 file per track. */
async function previewTracks(masterUrl) {
  const master = await (await fetch(masterUrl)).text();
  const lines = master.split('\n');
  let best = { bandwidth: -1, url: '' };
  lines.forEach((line, index) => {
    const bandwidth = Number(/BANDWIDTH=(\d+)/.exec(line)?.[1]);
    if (line.startsWith('#EXT-X-STREAM-INF') && bandwidth > best.bandwidth)
      best = { bandwidth, url: lines[index + 1].trim() };
  });
  const full = async (playlist) => {
    const text = await (await fetch(playlist)).text();
    const uri = /#EXT-X-MAP:URI="([^"]+)"/.exec(text)?.[1];
    if (!uri) throw new Error('Unexpected preview playlist');
    return uri.startsWith('http') ? uri : posix.join(posix.dirname(playlist), uri);
  };
  const audio = /TYPE=AUDIO[^\n]*URI="([^"]+)"/.exec(master)?.[1];
  return { video: await full(best.url), audio: audio ? await full(audio) : undefined };
}

async function savePreview(masterUrl, file) {
  const { video, audio } = await previewTracks(masterUrl);
  const videoFile = `${file}.video.mp4`;
  const audioFile = `${file}.audio.mp4`;
  await download(video, videoFile);
  if (audio) await download(audio, audioFile);
  const result = spawnSync(
    'ffmpeg',
    [
      ...['-v', 'error', '-y', '-i', videoFile],
      ...(audio ? ['-i', audioFile, '-map', '0:v:0', '-map', '1:a:0'] : ['-map', '0:v:0']),
      ...['-vf', "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))'"],
      ...['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '26', '-pix_fmt', 'yuv420p'],
      ...['-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', '-shortest', file],
    ],
    { encoding: 'utf8' },
  );
  await rm(videoFile, { force: true });
  await rm(audioFile, { force: true });
  if (result.status !== 0) throw new Error(`ffmpeg: ${result.stderr.slice(-300)}`);
}

const hasFfmpeg = !flag('--no-video') && spawnSync('ffmpeg', ['-version']).status === 0;
if (!flag('--no-video') && !hasFfmpeg) console.warn('ffmpeg not found: App Previews are skipped.');

const out = option('--out', join(tmpdir(), 'phamhungtien-store-media'));
const only = option('--app');
await rm(out, { recursive: true, force: true });
const provenance = { synced: new Date().toISOString().slice(0, 10), apps: {} };

const { data: storeApps } = await collection('/v1/apps', {
  'fields[apps]': 'name,bundleId',
  limit: '200',
});
for (const storeApp of storeApps) {
  const config = APPS[storeApp.attributes.bundleId];
  if (!config || (only && only !== config.slug)) continue;
  const { slug, locales } = config;
  const record = (provenance.apps[slug] = {
    name: storeApp.attributes.name,
    versions: {},
    locales: {},
  });

  // Newest version per platform, whatever its review state.
  const { data: versions } = await collection(`/v1/apps/${storeApp.id}/appStoreVersions`, {
    'fields[appStoreVersions]': 'versionString,platform,appStoreState,createdDate',
    limit: '20',
  });
  const latest = new Map();
  for (const version of versions.sort((a, b) =>
    (b.attributes.createdDate ?? '').localeCompare(a.attributes.createdDate ?? ''),
  ))
    if (!latest.has(version.attributes.platform)) latest.set(version.attributes.platform, version);
  for (const [platform, version] of latest)
    record.versions[platform] =
      `${version.attributes.versionString} (${version.attributes.appStoreState})`;

  // Header and search art from the asset library, matched to a locale by reference name.
  const library = (await api(`/v1/apps/${storeApp.id}/assetLibrary`)).data;
  const { data: libraryImages, included: placements } = await collection(
    `/v1/appAssetLibraries/${library.id}/images`,
    { include: 'placements', 'limit[placements]': '50', limit: '200' },
  );
  const art = (locale, placementType) => {
    const short = locale === 'zh-Hans' ? 'zh-Hans' : locale.split('-')[0];
    const pattern = new RegExp(`(^|[\\s·_-])(${locale}|${short})([\\s·_.-]|$)`);
    return libraryImages
      .filter((image) =>
        (image.relationships?.placements?.data ?? []).some(
          (ref) => placements.get(ref.id)?.attributes.placementType === placementType,
        ),
      )
      .filter((image) => {
        const name = `${image.attributes.referenceName ?? ''} ${image.attributes.fileName ?? ''}`;
        return pattern.test(name) && (locale === 'zh-Hans' || !/zh-Han/.test(name));
      })
      .sort((a, b) =>
        (b.attributes.createdDate ?? '').localeCompare(a.attributes.createdDate ?? ''),
      )[0];
  };

  for (const locale of locales) {
    const dir = join(out, slug, locale);
    await mkdir(dir, { recursive: true });
    const entry = (record.locales[locale] = { screenshots: {}, previews: [], art: {} });
    const jobs = [];

    for (const version of latest.values()) {
      const { data: localizations } = await collection(
        `/v1/appStoreVersions/${version.id}/appStoreVersionLocalizations`,
        { 'fields[appStoreVersionLocalizations]': 'locale', limit: '50' },
      );
      const localization = localizations.find((item) => item.attributes.locale === locale);
      if (!localization) continue;

      const { data: sets, included: shots } = await collection(
        `/v1/appStoreVersionLocalizations/${localization.id}/appScreenshotSets`,
        { include: 'appScreenshots', 'limit[appScreenshots]': '10', limit: '50' },
      );
      for (const [type, device] of SHOT_TYPES) {
        const set = sets.find((item) => item.attributes.screenshotDisplayType === type);
        if (!set || entry.screenshots[device]) continue;
        const assets = (set.relationships.appScreenshots.data ?? [])
          .map((ref) => shots.get(ref.id)?.attributes.imageAsset)
          .filter(Boolean);
        entry.screenshots[device] = assets.length;
        assets.forEach((asset, index) => {
          const name = `${device}-${String(index + 1).padStart(2, '0')}.jpg`;
          jobs.push(() => download(imageUrl(asset, MAX_EDGE[device]), join(dir, name)));
        });
      }

      const { data: previewSets, included: previews } = await collection(
        `/v1/appStoreVersionLocalizations/${localization.id}/appPreviewSets`,
        { include: 'appPreviews', limit: '50' },
      );
      for (const [type, device] of PREVIEW_TYPES) {
        const set = previewSets.find((item) => item.attributes.previewType === type);
        const preview = set && previews.get(set.relationships.appPreviews.data?.[0]?.id);
        if (!preview || entry.previews.includes(device)) continue;
        entry.previews.push(device);
        const { videoUrl, previewImage } = preview.attributes;
        if (previewImage)
          jobs.push(() =>
            download(imageUrl(previewImage, MAX_EDGE.poster), join(dir, `preview-${device}.jpg`)),
          );
        if (videoUrl && hasFfmpeg)
          jobs.push(() => savePreview(videoUrl, join(dir, `preview-${device}.mp4`)));
      }
    }

    for (const [kind, placementType] of [
      ['header', 'PRODUCT_PAGE_HEADER_ASSET'],
      ['search', 'APP_STORE_SEARCH_RESULTS_ASSET'],
    ]) {
      const image = art(locale, placementType);
      if (!image?.attributes.imageAsset) continue;
      entry.art[kind] = image.attributes.referenceName;
      jobs.push(() =>
        download(imageUrl(image.attributes.imageAsset, MAX_EDGE.art), join(dir, `${kind}.jpg`)),
      );
    }

    // A few downloads at a time: fast, without tripping Apple's rate limits.
    const queue = [...jobs];
    await Promise.all(
      Array.from({ length: 6 }, async () => {
        while (queue.length) await queue.shift()();
      }),
    );
    const shotCount = Object.values(entry.screenshots).reduce((sum, count) => sum + count, 0);
    console.log(`${slug} ${locale}: ${shotCount} screenshots, ${entry.previews.length} previews`);
  }
}

const provenanceJson = `${JSON.stringify(provenance, null, 2)}\n`;
if (flag('--download-only')) {
  await writeFile(join(out, 'provenance.json'), provenanceJson);
  console.log(`Downloaded to ${out}`);
} else {
  if (!only) await writeFile('docs/provenance/appstore-media.json', provenanceJson);
  if (!existsSync('scripts/tools/import-store-media.mjs'))
    throw new Error('Run from the repository root');
  execFileSync('node', ['scripts/tools/import-store-media.mjs', out], { stdio: 'inherit' });
  console.log('Done. Review the pages (npm run dev), then commit src/assets/apps/*/store.');
}
