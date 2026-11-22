/** Run after build: canonical languages, navigation and static-host legacy redirects. */
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import vm from 'node:vm';

const read = (path) => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const storeIds = {
  vtts: '6817003401',
  padcodeai: '6774398897',
  padnotesai: '6779363432',
  mynasmanager: '6780180564',
  lunarv: '6770913893',
  lunarblock: '6773545437',
};

function checkStoreBadges(html, slug, lang) {
  const badgeLinks = [...html.matchAll(/<a class="store-badge"[^>]*>([\s\S]*?)<\/a>/g)].map(
    ([link]) => link,
  );
  const id = storeIds[slug];
  if (!id) {
    assert.equal(badgeLinks.length, 0, `${slug}: no store badge for a direct download`);
    return;
  }
  assert.equal(badgeLinks.length, slug === 'vtts' ? 2 : 1, `${slug}: store badge count`);
  assert.ok(
    badgeLinks[0].includes(`href="https://apps.apple.com/app/id${id}"`),
    `${slug}: App Store link`,
  );
  assert.ok(
    badgeLinks[0].includes(`src="/assets/store-badges/app-store-${lang}.svg"`),
    `${slug}: localized Apple badge`,
  );
  if (slug === 'vtts') {
    assert.ok(
      badgeLinks[1].includes(
        'href="https://play.google.com/store/apps/details?id=com.phamhungtien.vtts"',
      ),
      'vTTS: Google Play link',
    );
    assert.ok(
      badgeLinks[1].includes(`src="/assets/store-badges/google-play-${lang}.svg"`),
      'vTTS: localized Google Play badge',
    );
  }
}

async function checkPage(path, lang, alternatePaths = []) {
  const html = await read(path);
  assert.ok(html.includes(`<html lang="${lang}"`), `${path}: ${lang} document`);
  assert.ok(!html.includes('http-equiv="refresh"'), `${path}: real localized page`);
  assert.equal(
    html.match(/<details class="language-switcher"(?=[ >])/g)?.length,
    1,
    `${path}: one language switcher`,
  );
  for (const [language, href] of alternatePaths) {
    assert.ok(
      html.includes(`hreflang="${language}" href="https://phamhungtien.com${href}"`),
      `${path}: ${language} alternate`,
    );
    assert.ok(html.includes(`href="${href}" lang="${language}"`), `${path}: language switch link`);
  }
  return html;
}

const languages = ['en', 'vi', 'ja', 'es', 'zh'];
const home = languages.map((lang) => [lang, lang === 'en' ? '/' : `/${lang}/`]);
const homePages = new Map();
for (const [lang, path] of home) {
  homePages.set(lang, await checkPage(`${path.slice(1)}index.html`, lang, home));
}
const homeEn = homePages.get('en');
const homeVi = homePages.get('vi');
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
  const paths = languages.map((lang) => [
    lang,
    lang === originalLang ? `/${app}/` : `/${lang}/${app}/`,
  ]);
  for (const [lang, path] of paths) {
    const html = await checkPage(`${path.slice(1)}index.html`, lang, paths);
    checkStoreBadges(html, app.toLowerCase(), lang);
    assert.ok(homePages.get(lang).includes(`href="${path}"`), `${lang}: home links to ${app}`);
    for (const kind of ['privacy', 'terms']) {
      assert.ok(html.includes(`href="${path}${kind}.html"`), `${path}: ${kind} link`);
    }
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
const privacy = home.map(([lang, path]) => [lang, `${path}privacy/`]);
for (const [lang, path] of privacy) {
  const html = await checkPage(`${path.slice(1)}index.html`, lang, privacy);
  assert.ok(html.includes('noindex, follow'), `${path}: legal indexing policy`);
  assert.ok(homePages.get(lang).includes(`href="${path}"`), `${lang}: home links to privacy`);
}

const indexPaths = languages.map((lang) => [
  lang,
  lang === 'en' ? '/guides/' : lang === 'vi' ? '/huong-dan/' : `/${lang}/guides/`,
]);
const guideIndexPages = new Map();
for (const [lang, path] of indexPaths) {
  const html = await checkPage(`${path.slice(1)}index.html`, lang, indexPaths);
  guideIndexPages.set(lang, html);
  assert.ok(html.includes('id="all"'), `${path}: legacy guide index anchor`);
  assert.ok(homePages.get(lang).includes(`href="${path}"`), `${lang}: home links to guides`);
  for (const app of ['padcodeai', 'vtts']) {
    assert.ok(html.includes(`id="${app}-guides"`), `${path}: section for ${app}`);
  }
}

const originalVietnameseGuides = [
  'bang-go-telex-day-du',
  'bang-ma-tieng-viet-unicode-tcvn3-vni',
  'cach-go-vni-telex-hay-vni',
  'go-tat-tren-mac-voi-phtv',
  'go-tieng-viet-tren-mac-voi-phtv',
  'sua-loi-go-tieng-viet-tren-mac',
];
const guideFiles = await readdir(new URL('../src/content/guides/', import.meta.url));
const guideSlugs = new Set(
  guideFiles.flatMap((file) => {
    const slug = file.match(/^(.+)\.(?:en|vi|ja|es|zh)\.md$/)?.[1];
    return slug ? [slug] : [];
  }),
);
for (const slug of guideSlugs) {
  const legacyVietnamese = originalVietnameseGuides.includes(slug);
  const paths = [
    ['en', `/${legacyVietnamese ? 'en/guides' : 'guides'}/${slug}/`],
    ['vi', `/${legacyVietnamese ? 'guides' : 'huong-dan'}/${slug}/`],
    ...languages.slice(2).map((lang) => [lang, `/${lang}/guides/${slug}/`]),
  ];
  for (const [lang, path] of paths) {
    assert.ok(guideFiles.includes(`${slug}.${lang}.md`), `${slug}: ${lang} Markdown`);
    const html = await checkPage(`${path.slice(1)}index.html`, lang, paths);
    assert.match(html, /<article class="guide\b/, `${path}: article body`);
    const contents = await readFile(
      new URL(`../src/content/guides/${slug}.${lang}.md`, import.meta.url),
      'utf8',
    );
    const app = contents.match(/^app: ([a-z]+)$/m)?.[1];
    if (app) checkStoreBadges(html, app, lang);
    assert.ok(
      guideIndexPages.get(lang).includes(`href="${path}"`),
      `${path}: link from guide index`,
    );
  }
}

for (const [oldPath, target] of [
  ['en/index.html', '/'],
  ['fr/index.html', '/'],
  ['en/vTTS/index.html', '/vTTS/'],
  ['vi/LunarV/index.html', '/LunarV/'],
  ['vi/PHTV/index.html', '/PHTV/'],
  ...originalVietnameseGuides.map((slug) => [`huong-dan/${slug}/index.html`, `/guides/${slug}/`]),
]) {
  const html = await read(oldPath);
  assert.ok(
    html.includes(`http-equiv="refresh" content="0;url=${target}"`),
    `${oldPath}: no-JS redirect to ${target}`,
  );
  assert.ok(
    html.includes(`rel="canonical" href="https://phamhungtien.com${target}"`),
    `${oldPath}: legacy canonical`,
  );
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
