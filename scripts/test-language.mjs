/** Run after npm run build: exercise the actual inline language bootstrap in built HTML. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const bootstrap = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .find((script) => script.includes('const languageRoutes'));
assert.ok(bootstrap, 'Built page includes language detection');

function visit(path, languages, saved, blocked = false) {
  let redirect;
  let stored = saved;
  const location = {
    href: `https://phamhungtien.com${path}`,
    replace(url) {
      redirect = url;
    },
  };
  vm.runInNewContext(bootstrap, {
    URL,
    location,
    navigator: { languages, language: languages[0] },
    localStorage: {
      getItem() {
        if (blocked) throw new Error('Storage disabled');
        return stored;
      },
      setItem(_key, value) {
        if (blocked) throw new Error('Storage disabled');
        stored = value;
      },
    },
  });
  return { redirect, stored };
}
assert.equal(visit('/', ['fr-CA', 'en-US']).redirect, 'https://phamhungtien.com/fr/');
assert.equal(visit('/', ['de-DE', 'ja-JP']).redirect, 'https://phamhungtien.com/ja/');
assert.equal(visit('/', ['vi-VN'], 'en').redirect, undefined, 'Saved English wins');
assert.equal(visit('/', ['fr-FR'], 'vi').redirect, 'https://phamhungtien.com/vi/');
assert.equal(
  visit('/', ['de-DE']).redirect,
  undefined,
  'Unsupported browser language uses English',
);
assert.equal(visit('/', []).redirect, undefined, 'Missing browser language uses English');
assert.equal(visit('/', ['ja-JP'], 'invalid').redirect, 'https://phamhungtien.com/ja/');
assert.equal(visit('/', ['fr-FR'], null, true).redirect, 'https://phamhungtien.com/fr/');
assert.equal(
  visit('/?lang=en', ['ja-JP'], null, true).redirect,
  undefined,
  'Explicit choice works without storage',
);
assert.equal(visit('/?lang=vi', ['fr-FR']).stored, 'vi');
assert.equal(visit('/vi/', ['ja-JP'], 'fr').redirect, undefined, 'Explicit locale URL wins');
assert.equal(visit('/vTTS/', ['ja-JP'], 'fr').redirect, undefined, 'App deep links stay intact');
assert.equal(
  visit('/?q=notes#apps', ['ja-JP']).redirect,
  'https://phamhungtien.com/ja/?q=notes#apps',
);
for (const locale of ['fr', 'ja']) {
  const page = await readFile(new URL(`../dist/${locale}/index.html`, import.meta.url), 'utf8');
  assert.ok(page.includes(`<html lang="${locale}"`));
  assert.ok(page.includes(`hreflang="${locale}"`));
  assert.equal((page.match(/data-app /g) ?? []).length, 7);
}
console.log(
  '✓ Language detection, preference persistence, fallback, deep links and translated home pages',
);
