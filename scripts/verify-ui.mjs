import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { render, prerenderRoutes } from '../dist-ssr/entry-server.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const contactUrls = [
  'https://www.facebook.com/phamhungtien1404',
  'https://www.instagram.com/phamhungtien1404/',
  'https://www.threads.net/@phamhungtien1404',
  'https://locket.cam/phamhungtien',
  'https://www.cake.me/me/phamhungtien',
  'https://www.tiktok.com/@phamhungtien14',
  'https://github.com/PhamHungTien',
  'mailto:contact@phamhungtien.com',
];

for (const route of prerenderRoutes) {
  const { html } = render(route);
  assert.equal([...html.matchAll(/class="contact-card"/g)].length, 9, `${route}: nine contact links`);
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, `${route}: one page heading`);
  assert.ok(html.includes('id="main-content"'), `${route}: skip-link destination`);
  for (const href of contactUrls) assert.ok(html.includes(`href="${href}"`), `${route}: ${href}`);
  for (const [, src] of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    assert.ok(src.startsWith('/assets/'), `${route}: local image path`);
    await access(join(root, 'dist', src));
  }
  if (route === '/') {
    assert.equal([...html.matchAll(/class="product-row"/g)].length, 6, 'home: six apps');
    assert.match(html, /donate-trigger[^>]+aria-haspopup="dialog"/, 'home: donate opens a dialog');
  } else {
    assert.ok(html.includes('id="features"') && html.includes('id="gallery"'), `${route}: navigation destinations`);
    assert.ok(!html.includes('<code>App Store</code>'), `${route}: no redundant installation block`);
  }
  console.log(`✓ ${route} — content, contacts, navigation, and image files`);
}

const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const originalQrHash = hash(await readFile(join(root, 'PHTV/public/assets/donate.webp')));
for (const folder of ['dist/assets', 'PHTV/dist/assets']) {
  const files = await readdir(join(root, folder));
  const qr = files.find((file) => /^donate-.*\.webp$/.test(file));
  assert.ok(qr, `${folder}: emitted donation QR`);
  assert.equal(hash(await readFile(join(root, folder, qr))), originalQrHash, `${folder}: unchanged original QR`);
}
console.log('✓ Home and PHTV both include the original donation QR');

const legalContacts = await readFile(join(root, 'assets/theme.js'), 'utf8');
for (const href of contactUrls) assert.ok(legalContacts.includes(href), `legal pages: ${href}`);
console.log('✓ Legal pages retain the same contact destinations');
