import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const origin = 'https://phamhungtien.com';
const routes = ['PHTV', 'vTTS', 'PadCodeAI', 'PadNotesAI', 'MyNASManager', 'LunarV', 'LunarBlock'];
const pages = [{ file: 'dist/index.html', url: `${origin}/` }];
for (const route of routes) {
  pages.push({
    file: route === 'PHTV' ? 'PHTV/dist/index.html' : `dist/${route}/index.html`,
    url: `${origin}/${route}/`,
  });
  for (const kind of ['privacy', 'terms'])
    pages.push({
      file: `${route}/${route === 'PHTV' ? 'dist/' : ''}${kind}.html`,
      url: `${origin}/${route}/${kind}.html`,
    });
}
for (const { file, url } of pages) {
  const html = await readFile(file, 'utf8');
  assert.equal([...html.matchAll(/<title>/g)].length, 1, `${file}: one title`);
  const headings = [...html.matchAll(/<h1[\s>]/g)].length;
  // PHTV legal pages contain one heading per mutually exclusive language section.
  assert.equal(
    headings,
    file.includes('PHTV') && /(?:privacy|terms)\.html$/.test(file) ? 2 : 1,
    `${file}: heading count`,
  );
  const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
  assert.equal(canonicals.length, 1, `${file}: one canonical`);
  assert.ok(canonicals[0][0].includes(`href="${url}"`), `${file}: correct canonical`);
  assert.match(html, /<meta\b[^>]*name="description"[^>]*content="[^"]+"/, `${file}: description`);
  assert.ok(!/http-equiv="refresh"/i.test(html), `${file}: no redirect over content`);
  for (const [, json] of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(json);
}
const phtv = await readFile('PHTV/dist/index.html', 'utf8');
assert.ok(phtv.includes('Gõ tiếng Việt theo cách của bạn.'), 'PHTV: prerendered content');
assert.ok(!phtv.includes('"aggregateRating"'), 'PHTV: no unverified ratings');
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
for (const { url } of pages) assert.ok(sitemap.includes(`<loc>${url}</loc>`), `sitemap: ${url}`);
console.log(`✓ SEO validated for ${pages.length} indexable pages, including static PHTV content.`);
