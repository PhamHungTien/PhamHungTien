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

const REMOVED_NETWORKS = [
  'instagram.com',
  'threads.net',
  'tiktok.com',
  'locket.cam',
  'cake.me',
  'facebook.com/phamhungtien1404',
];

for (const [path, html] of pages) {
  const is404 = path === '/404.html';
  const meta = metas(html);
  const count = (re) => [...html.matchAll(re)].length;

  if (count(/<title>/g) !== 1) fail(path, 'needs exactly one <title>');
  if (count(/<h1[\s>]/g) !== 1) fail(path, 'needs exactly one <h1>');
  if (!/<html lang="(en|vi)"/.test(html)) fail(path, 'missing html lang');
  if (!html.includes('data-site-security'))
    fail(path, 'missing Content-Security-Policy (run postbuild)');
  if (!html.includes('id="main-content"')) fail(path, 'missing skip-link target');

  const description = meta.description ?? '';
  if (description.length < 50 || description.length > 170)
    fail(path, `description is ${description.length} characters (want 50–170)`);

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

  // hreflang: every alternate exists and lists this page back.
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  for (const [, lang, href] of alternates) {
    if (lang === 'x-default') continue;
    const target = new URL(href).pathname;
    const other = pages.get(target);
    if (!other) fail(path, `hreflang ${lang} points to a missing page ${target}`);
    else if (!other.includes(`href="${ORIGIN}${path}"`))
      fail(path, `hreflang ${lang} page ${target} does not link back`);
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
const listed = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => new URL(loc).pathname),
);
for (const path of pages.keys())
  if (path !== '/404.html' && !listed.has(path)) fail('sitemap.xml', `missing ${path}`);
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
