#!/usr/bin/env node
/**
 * Runs after `astro build` on the static output:
 *
 *   1. Content-Security-Policy. GitHub Pages cannot send headers, so every page gets
 *      a <meta> policy that allows only its own inline scripts (by hash).
 *   2. Legacy URLs. App icons that external pages (READMEs, App Store notes) link to.
 *   3. Lowercase aliases (/vtts/ -> /vTTS/). Skipped on case-insensitive disks such as
 *      the default macOS volume, where /phtv/ and /PHTV/ would be the same folder;
 *      CI builds on Linux, so the deployed site always has them.
 *
 *   node scripts/postbuild.mjs [outDir]
 */
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, process.argv[2] ?? 'dist');
const ORIGIN = 'https://phamhungtien.com';

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

// ------------------------------------------------------------------ 1. CSP

const sha256 = (body) => `'sha256-${createHash('sha256').update(body).digest('base64')}'`;

/**
 * Pages that load Google AdSense (only the guides) need its loader to inject further
 * scripts and frames from many Google hosts, so they get a policy that allows HTTPS
 * scripts and frames instead of the strict, hash-based one every other page keeps.
 */
function adsPolicy() {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
    "style-src 'self' 'unsafe-inline' https:",
    "img-src 'self' data: blob: https:",
    "font-src 'self' https: data:",
    "media-src 'self' https:",
    "connect-src 'self' https:",
    'frame-src https:',
    'fenced-frame-src https:',
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}

function policyFor(html) {
  if (html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')) return adsPolicy();
  const inlineScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(([, attributes, body]) => !/\bsrc\s*=/i.test(attributes) && body.trim())
    .map(([, , body]) => sha256(body));
  return [
    "default-src 'self'",
    `script-src 'self' ${inlineScripts.join(' ')} https://apis.google.com https://www.gstatic.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self'",
    "media-src 'self'",
    "connect-src 'self' https://api.github.com https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.firebaseapp.com",
    'frame-src https://www.youtube-nocookie.com https://*.firebaseapp.com https://accounts.google.com',
    "worker-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}

let pages = 0;
for await (const file of htmlFiles(outDir)) {
  let html = await readFile(file, 'utf8');
  html = html.replace(/<meta[^>]*data-site-security[^>]*>/g, '');
  const policy = policyFor(html).replace(/"/g, '&quot;');
  html = html.replace(
    /<meta charset="utf-8"\s*\/?>/i,
    (charset) =>
      `${charset}<meta data-site-security http-equiv="Content-Security-Policy" content="${policy}"><meta data-site-security name="referrer" content="strict-origin-when-cross-origin">`,
  );
  await writeFile(file, html);
  pages++;
}
console.log(`  csp      ${pages} pages`);

// --------------------------------------------------------- 2. legacy URLs

const legacyFiles = {
  'vTTS/assets/app-icon.png': 'src/assets/apps/vtts/app-icon.png',
  'PadCodeAI/assets/app-icon.png': 'src/assets/apps/padcodeai/app-icon.png',
  'PadNotesAI/assets/app-icon.png': 'src/assets/apps/padnotesai/app-icon.png',
  'MyNASManager/assets/app-icon.png': 'src/assets/apps/mynasmanager/app-icon.png',
  'LunarBlock/assets/app-icon.png': 'src/assets/apps/lunarblock/app-icon.png',
  'assets/lunarv-icon.png': 'src/assets/apps/lunarv/app-icon.png',
  'assets/phtv-icon.webp': 'src/assets/apps/phtv/app-icon.webp',
  'PHTV/phtv-icon.webp': 'src/assets/apps/phtv/app-icon.webp',
};
for (const [target, source] of Object.entries(legacyFiles)) {
  await mkdir(dirname(join(outDir, target)), { recursive: true });
  await copyFile(join(root, source), join(outDir, target));
}
console.log(`  legacy   ${Object.keys(legacyFiles).length} files`);

// ------------------------------------------------------------- 3. aliases

async function caseSensitive(dir) {
  const probe = join(dir, '.case-probe');
  await rm(probe, { recursive: true, force: true });
  await mkdir(join(probe, 'Aa'), { recursive: true });
  let sensitive = true;
  try {
    await mkdir(join(probe, 'aA'));
  } catch {
    sensitive = false;
  }
  await rm(probe, { recursive: true, force: true });
  return sensitive;
}

const aliases = {
  phtv: '/PHTV/',
  vtts: '/vTTS/',
  lunarv: '/LunarV/',
  lunarblock: '/LunarBlock/',
  padcodeai: '/PadCodeAI/',
  padnotesai: '/PadNotesAI/',
  aipadnotes: '/PadNotesAI/',
  mynasmanager: '/MyNASManager/',
};

if (await caseSensitive(outDir)) {
  for (const [alias, target] of Object.entries(aliases)) {
    const url = `${ORIGIN}${target}`;
    const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting to ${target}</title>
<link rel="canonical" href="${url}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${target}">
</head>
<body><p>This page moved to <a href="${target}">${url}</a>.</p></body>
</html>
`;
    await mkdir(join(outDir, alias), { recursive: true });
    await writeFile(join(outDir, alias, 'index.html'), body);
  }
  console.log(`  aliases  ${Object.keys(aliases).length} redirect pages`);
} else {
  console.log('  aliases  skipped (case-insensitive disk; CI adds them)');
}
