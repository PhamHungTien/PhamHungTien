#!/usr/bin/env node
/**
 * Checks the built site for the things that matter for search engines, sharing and
 * visitors, and that have broken before. Run after `npm run build`.
 *
 *   node scripts/verify.mjs [outDir]
 */
import { existsSync } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import sharp from 'sharp';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, process.argv[2] ?? 'dist');
const ORIGIN = 'https://phamhungtien.com';
const errors = [];
const fail = (page, message) => errors.push(`${page}: ${message}`);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

/** "/vTTS/" -> dist/vTTS/index.html, "/x.png?v=1" -> dist/x.png */
function fileFor(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  return join(outDir, clean.endsWith('/') ? `${clean}index.html` : clean);
}

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const alternateLinks = (html) =>
  [...html.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => [lang, href]);
const headAlternates = (html) => alternateLinks(html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? '');
const noindex = (html) => /<meta name="robots" content="noindex/.test(html);
const metas = (html) =>
  Object.fromEntries(
    [...html.matchAll(/<meta\b[^>]*>/g)]
      .map(([tag]) => [attr(tag, 'property') ?? attr(tag, 'name'), attr(tag, 'content')])
      .filter(([key]) => key),
  );

const pages = new Map();
for await (const file of walk(outDir)) {
  if (!file.endsWith('.html')) continue;
  const html = await readFile(file, 'utf8');
  if (html.includes('http-equiv="refresh"')) continue; // lowercase alias stubs
  const rel = `/${relative(outDir, file).replaceAll('\\', '/')}`.replace(/index\.html$/, '');
  pages.set(rel, html);
}

const REMOVED_NETWORKS = ['instagram.com', 'threads.net', 'tiktok.com', 'locket.cam', 'cake.me'];
const uniqueMetadata = { title: new Map(), description: new Map() };

for (const [path, html] of pages) {
  const is404 = path === '/404.html';
  const meta = metas(html);
  const count = (re) => [...html.matchAll(re)].length;

  if (count(/<title>/g) !== 1) fail(path, 'needs exactly one <title>');
  if (count(/<h1[\s>]/g) !== 1) fail(path, 'needs exactly one <h1>');
  if (!/<html lang="(en|vi|fr|ja|es|zh)"/.test(html)) fail(path, 'missing html lang');
  if (!html.includes('data-site-security'))
    fail(path, 'missing Content-Security-Policy (run postbuild)');
  if (!html.includes('id="main-content"')) fail(path, 'missing skip-link target');

  const description = meta.description ?? '';
  const minDescription = /<html lang="zh"/.test(html) ? 20 : 50;
  if (description.length < minDescription || description.length > 170)
    fail(path, `description is ${description.length} characters (want ${minDescription}–170)`);

  if (!noindex(html)) {
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    for (const [name, value] of Object.entries({ title, description })) {
      const previous = uniqueMetadata[name].get(value);
      if (previous) fail(path, `duplicate ${name} shared with ${previous}`);
      else uniqueMetadata[name].set(value, path);
    }
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!is404 && canonical !== `${ORIGIN}${path}`) fail(path, `canonical is ${canonical}`);

  const ogImage = meta['og:image'];
  if (!ogImage?.startsWith(`${ORIGIN}/og/`) || !existsSync(fileFor(new URL(ogImage).pathname)))
    fail(path, `og:image missing or not built: ${ogImage}`);

  for (const [, json] of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    try {
      JSON.parse(json);
    } catch {
      fail(path, 'invalid JSON-LD');
    }
  }

  const alternates = headAlternates(html);
  const group = new Map(alternates);
  if (alternates.length) {
    const lang = html.match(/<html lang="([^"]+)"/)?.[1];
    if (group.size !== alternates.length) fail(path, 'duplicate hreflang');
    if (group.get(lang) !== canonical) fail(path, 'hreflang group does not include its own URL');
    if (!group.has('x-default')) fail(path, 'hreflang group needs an x-default URL');
  }
  for (const [lang, href] of alternates) {
    const target = new URL(href).pathname;
    const other = pages.get(target);
    if (!other || href !== `${ORIGIN}${target}`) {
      fail(path, `hreflang ${lang} points to a missing or noncanonical URL ${href}`);
      continue;
    }
    if (noindex(other) !== noindex(html)) fail(path, `hreflang mixes indexing rules at ${target}`);
    if (lang !== 'x-default' && !other.includes(`<html lang="${lang}"`))
      fail(path, `hreflang ${lang} names the wrong language at ${target}`);
    if (JSON.stringify(headAlternates(other).sort()) !== JSON.stringify(alternates.toSorted()))
      fail(path, `hreflang group differs at ${target}`);
  }

  // Internal links and assets resolve to built files.
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#]*)/g)) {
    if (url.startsWith('//')) continue;
    if (!existsSync(fileFor(url))) fail(path, `broken internal reference ${url}`);
  }
  for (const [, set] of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of set.split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url.startsWith('/') && !existsSync(fileFor(url)))
        fail(path, `broken srcset entry ${url}`);
    }
  }
  for (const network of REMOVED_NETWORKS)
    if (html.includes(network)) fail(path, `links to removed profile ${network}`);
}

// Sitemap lists every indexable page, and nothing else.
const sitemap = await readFile(join(outDir, 'sitemap.xml'), 'utf8');
const listed = new Set();
for (const [, entry] of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
  if (!loc?.startsWith(`${ORIGIN}/`)) {
    fail('sitemap.xml', `noncanonical or missing loc ${loc}`);
    continue;
  }
  const path = new URL(loc).pathname;
  if (loc !== `${ORIGIN}${path}`) fail('sitemap.xml', `noncanonical loc ${loc}`);
  if (listed.has(path)) fail('sitemap.xml', `duplicate loc ${path}`);
  listed.add(path);
  const html = pages.get(path);
  if (
    html &&
    JSON.stringify(alternateLinks(entry).sort()) !== JSON.stringify(headAlternates(html).sort())
  )
    fail('sitemap.xml', `hreflang group differs from HTML for ${path}`);
  for (const [, image] of entry.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)) {
    if (!image.startsWith(`${ORIGIN}/`) || !existsSync(fileFor(new URL(image).pathname)))
      fail('sitemap.xml', `image is absent for ${path}: ${image}`);
  }
}
for (const [path, html] of pages) {
  if (noindex(html)) {
    if (listed.has(path)) fail('sitemap.xml', `lists noindex page ${path}`);
  } else if (!listed.has(path)) fail('sitemap.xml', `missing ${path}`);
}
for (const path of listed) if (!pages.has(path)) fail('sitemap.xml', `lists missing page ${path}`);

const robots = await readFile(join(outDir, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail('robots.txt', 'missing sitemap line');

for (const required of [
  'CNAME',
  '.nojekyll',
  '404.html',
  'favicon.ico',
  'site.webmanifest',
  'vTTS/assets/app-icon.png',
  'assets/phtv-icon.webp',
])
  if (!existsSync(join(outDir, required))) fail('dist', `missing ${required}`);

// Open Graph cards: right size for every network, small enough to be fetched quickly.
for (const file of (await readdir(join(root, 'public/og'))).filter((f) => f.endsWith('.png'))) {
  const path = join(root, 'public/og', file);
  const { width, height } = await sharp(path).metadata();
  if (width !== 1200 || height !== 630)
    fail(`og/${file}`, `is ${width}×${height}, expected 1200×630`);
  if ((await stat(path)).size > 1024 * 1024) fail(`og/${file}`, 'is larger than 1 MB');
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exit(1);
}
console.log(
  `✓ ${pages.size} pages verified: titles, headings, descriptions, canonicals, hreflang, Open Graph, JSON-LD, CSP, links, images and sitemap.`,
);
