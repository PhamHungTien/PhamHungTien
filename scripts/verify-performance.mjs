#!/usr/bin/env node
/** Build-output budgets; browser runtime checks remain a separate QA step. */
import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const routes = [
  'index.html',
  'PHTV/index.html',
  'vTTS/index.html',
  'PadCodeAI/index.html',
  'PadNotesAI/index.html',
  'MyNASManager/index.html',
  'LunarV/index.html',
  'LunarBlock/index.html',
  'guides/index.html',
];
let failed = false;
for (const route of routes) {
  const html = await readFile(new URL(`../dist/${route}`, import.meta.url), 'utf8');
  const bytes = Buffer.byteLength(html);
  const gzip = gzipSync(html).length;
  const errors = [];
  if (bytes > 100_000) errors.push(`HTML ${bytes} exceeds 100,000 bytes`);
  if (gzip > 25_000) errors.push(`gzip HTML ${gzip} exceeds 25,000 bytes`);
  if (!/<link\b[^>]*rel="stylesheet"/.test(html)) errors.push('Missing cacheable stylesheet');
  if (
    !/<html\b[^>]*lang="vi"/.test(html) &&
    /<link\b(?=[^>]*rel="preload")(?=[^>]*vietnamese)[^>]*>/.test(html)
  )
    errors.push('Unnecessary Vietnamese font preload');
  console.log(
    `${errors.length ? 'FAIL' : 'PASS'} ${route}: ${bytes} bytes HTML, ${gzip} gzip${errors.length ? ` — ${errors.join('; ')}` : ''}`,
  );
  failed ||= errors.length > 0;
}
process.exitCode = failed ? 1 : 0;
