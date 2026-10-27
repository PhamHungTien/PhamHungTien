/** Run after build: canonical languages and static-host legacy redirects. */
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';

const read = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const home = await read('index.html');
assert.ok(home.includes('<html lang="en"'));
assert.ok(!home.includes('languageRoutes'), 'No browser-language redirect');
assert.ok(!home.includes('data-language'), 'No language picker');
assert.ok(home.includes('href="/PHTV/"'), 'Home links to Vietnamese-first PHTV');
assert.ok(home.includes('href="/en/PHTV/"'), 'English app card links to the English PHTV page');

for (const app of [
  'vTTS',
  'PadCodeAI',
  'PadNotesAI',
  'MyNASManager',
  'LunarV',
  'LunarBlock',
  'PHTV',
]) {
  const lang = ['PHTV', 'LunarV'].includes(app) ? 'vi' : 'en';
  for (const file of ['index.html', 'privacy.html', 'terms.html']) {
    const html = await read(`${app}/${file}`);
    assert.ok(html.includes(`<html lang="${lang}"`), `${app}/${file} language`);
    assert.ok(!html.includes('data-language'), `${app}/${file} has no language picker`);
    if (file === 'index.html' && ['PHTV', 'LunarV'].includes(app)) {
      assert.ok(html.includes('<link rel="alternate" hreflang="en"'), `${app} English alternate`);
    } else {
      assert.ok(
        !/<link rel="alternate" hreflang=/.test(html),
        `${app}/${file} has no alternate locale metadata`,
      );
    }
  }
}
for (const [oldPath, target] of [
  ['vi/index.html', '/'],
  ['en/index.html', '/'],
  ['fr/index.html', '/'],
  ['ja/index.html', '/'],
  ['vi/vTTS/index.html', '/vTTS/'],
  ['vi/LunarV/index.html', '/LunarV/'],
  ['vi/privacy/index.html', '/privacy/'],
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
const guides = await readdir(new URL('../dist/guides/', import.meta.url), { withFileTypes: true });
const englishGuides = [
  'nghe-sach-epub-giong-doc-tieng-viet-voi-vtts',
  'truy-cap-synology-nas-tu-xa-an-toan',
  'am-lich-viet-nam-cach-tinh-can-chi-tiet-khi',
];
for (const guide of guides.filter((entry) => entry.isDirectory())) {
  const html = await read(`guides/${guide.name}/index.html`);
  const lang = englishGuides.includes(guide.name) ? 'en' : 'vi';
  assert.ok(html.includes(`<html lang="${lang}"`), `${guide.name}: guide language`);
}
for (const app of ['PHTV', 'LunarV']) {
  for (const file of ['index.html', 'privacy.html', 'terms.html']) {
    const html = await read(`en/${app}/${file}`);
    assert.ok(html.includes('<html lang="en"'), `en/${app}/${file} language`);
  }
}
for (const file of ['index.html', 'privacy.html', 'terms.html']) {
  const html = await read(`zh/LunarV/${file}`);
  assert.ok(html.includes('<html lang="zh"'), `zh/LunarV/${file} language`);
  assert.ok(html.includes('简体中文'), `zh/LunarV/${file} language links`);
}
const lunar = await read('LunarV/index.html');
assert.ok(lunar.includes('Lịch âm Việt Nam trên thiết bị Apple.'));
assert.ok(lunar.includes('Bài viết tiếng Anh'));
assert.ok(lunar.includes('visionOS'), 'LunarV supports visionOS');
assert.ok(
  (await read('en/LunarV/index.html')).includes('visionOS'),
  'English LunarV supports visionOS',
);
assert.ok(
  (await read('zh/LunarV/index.html')).includes('visionOS'),
  'Chinese LunarV supports visionOS',
);
const lunarPrivacy = await read('LunarV/privacy.html');
assert.ok(lunarPrivacy.includes('không thu thập, lưu trữ hoặc truyền'));
const lunarTerms = await read('LunarV/terms.html');
assert.ok(lunarTerms.includes('Điều khoản sử dụng'));
const sitemap = await read('sitemap.xml');
assert.ok(sitemap.includes('/zh/LunarV/'), 'Chinese LunarV in sitemap');
assert.ok(sitemap.includes('/en/PHTV/'), 'English PHTV in sitemap');
assert.ok(
  !/<loc>[^<]*\/(vi|fr|ja|huong-dan)\//.test(sitemap),
  'Sitemap only contains canonical pages',
);
console.log(
  '✓ English site, Vietnamese PHTV and LunarV, guide languages, removed picker, legacy query/hash redirects and canonical sitemap',
);
