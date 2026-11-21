/** Run after build: canonical languages, navigation and static-host legacy redirects. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const read = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');

async function checkPage(path, lang, alternatePaths = []) {
  const html = await read(path);
  assert.ok(html.includes(`<html lang="${lang}"`), `${path}: ${lang} document`);
  assert.ok(!html.includes('http-equiv="refresh"'), `${path}: real localized page`);
  for (const [language, href] of alternatePaths) {
    assert.ok(
      html.includes(`hreflang="${language}" href="https://phamhungtien.com${href}"`),
      `${path}: ${language} alternate`,
    );
    assert.ok(html.includes(`href="${href}" lang="${language}"`), `${path}: language switch link`);
  }
  return html;
}

const home = [
  ['en', '/'],
  ['vi', '/vi/'],
];
const homeEn = await checkPage('index.html', 'en', home);
const homeVi = await checkPage('vi/index.html', 'vi', home);
assert.ok(homeEn.includes('href="/en/PHTV/"'), 'English home links to English PHTV');
assert.ok(homeVi.includes('href="/vi/vTTS/"'), 'Vietnamese home links to Vietnamese vTTS');
assert.ok(homeVi.includes('href="/PHTV/"'), 'Vietnamese home links to canonical Vietnamese PHTV');

for (const [app, originalLang] of Object.entries({
  PHTV: 'vi',
  LunarV: 'vi',
  vTTS: 'en',
  PadCodeAI: 'en',
  PadNotesAI: 'en',
  MyNASManager: 'en',
  LunarBlock: 'en',
})) {
  const languages = app === 'LunarV' ? ['en', 'vi', 'zh'] : ['en', 'vi'];
  const paths = languages.map((lang) => [
    lang,
    lang === originalLang ? `/${app}/` : `/${lang}/${app}/`,
  ]);
  for (const [lang, path] of paths) {
    await checkPage(`${path.slice(1)}index.html`, lang, paths);
  }
  for (const kind of ['privacy', 'terms']) {
    const legal = paths.map(([lang, path]) => [lang, `${path}${kind}.html`]);
    for (const [lang, href] of legal) {
      const html = await checkPage(href.slice(1), lang, legal);
      assert.match(html, /<time datetime="\d{4}-\d{2}-\d{2}"/, `${href}: modification date`);
      assert.ok(html.includes('noindex, follow'), `${href}: legal indexing policy`);
    }
  }
}
const privacy = [
  ['en', '/privacy/'],
  ['vi', '/vi/privacy/'],
];
for (const [lang, path] of privacy) await checkPage(`${path.slice(1)}index.html`, lang, privacy);

for (const [oldPath, target] of [
  ['en/index.html', '/'],
  ['fr/index.html', '/'],
  ['ja/index.html', '/'],
  ['en/vTTS/index.html', '/vTTS/'],
  ['vi/LunarV/index.html', '/LunarV/'],
  ['vi/PHTV/index.html', '/PHTV/'],
  ['huong-dan/index.html', '/guides/'],
  ['huong-dan/bang-go-telex-day-du/index.html', '/guides/bang-go-telex-day-du/'],
]) {
  const html = await read(oldPath);
  assert.ok(html.includes('http-equiv="refresh"'), `${oldPath}: no-JS redirect`);
  assert.ok(html.includes('noindex, follow'), `${oldPath}: noindex`);
  const script = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1])
    .find((s) => s.includes('location.replace'));
  assert.ok(script, `${oldPath}: redirect script`);
  let redirected;
  vm.runInNewContext(script, {
    location: {
      search: '?q=notes',
      hash: '#features',
      replace: (url) => {
        redirected = url;
      },
    },
  });
  assert.equal(redirected, `${target}?q=notes#features`, `${oldPath}: preserve query/hash`);
}
console.log('✓ Localized pages, language switcher links, public legal URLs and legacy redirects');
