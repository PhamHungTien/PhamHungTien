/**
 * Generates the 1200×630 Open Graph cards in public/og (one per app, per legal page,
 * and the home page). Run `npm run og` after changing an app name, tagline or icon,
 * then bump OG_VERSION in src/lib/seo.ts so social networks refetch the images.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const apps = [
  [
    'phtv',
    'PHTV',
    'PHTV',
    'src/assets/apps/phtv/app-icon.webp',
    ['Gõ tiếng Việt.', 'Theo cách của bạn.'],
    'Bộ gõ riêng tư cho macOS.',
  ],
  [
    'vtts',
    'vTTS',
    'vTTS',
    'src/assets/apps/vtts/app-icon.png',
    ['Let your books', 'speak to you.'],
    'Books and text to speech, on your device.',
  ],
  [
    'padcodeai',
    'PadCodeAI',
    'Pad Code AI',
    'src/assets/apps/padcodeai/app-icon.png',
    ['Your code.', 'Anywhere.'],
    'An offline coding workspace for iPad and iPhone.',
  ],
  [
    'padnotesai',
    'PadNotesAI',
    'Pad Notes AI',
    'src/assets/apps/padnotesai/app-icon.png',
    ['A place for', 'your thoughts.'],
    'Notes, documents and OCR across your devices.',
  ],
  [
    'mynasmanager',
    'MyNASManager',
    'My NAS Manager',
    'src/assets/apps/mynasmanager/app-icon.png',
    ['Your NAS.', 'Within reach.'],
    'Files, monitoring and SSH in one place.',
  ],
  [
    'lunarv',
    'LunarV',
    'LunarV',
    'src/assets/apps/lunarv/app-icon.png',
    ['Keep your days', 'in harmony.'],
    'Vietnamese lunar dates, widgets and reminders.',
  ],
  [
    'lunarblock',
    'LunarBlock',
    'Lunar Block',
    'src/assets/apps/lunarblock/app-icon.png',
    ['A new dimension', 'of play.'],
    'A tactile 3D block puzzle.',
  ],
];
const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
await mkdir('public/og', { recursive: true });
const icons = await Promise.all(
  apps.map(
    async (a) =>
      `data:image/png;base64,${(await sharp(a[3]).resize(256, 256, { fit: 'contain' }).png().toBuffer()).toString('base64')}`,
  ),
);
const txt = (x, y, size, text, extra = '') =>
  `<text x="${x}" y="${y}" font-size="${size}" ${extra}>${esc(text)}</text>`;
const outputs = [];
async function card(slug, body, footer) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f3f5f8"/><g transform="translate(72 66) scale(0.6875)"><rect width="64" height="64" rx="15" fill="#7a1424"/><rect x="27.5" y="22" width="9" height="28" rx="4.5" fill="#fff"/><rect x="14" y="13" width="36" height="14" rx="7" fill="#f0c04e"/></g><g font-family="Be Vietnam Pro,Helvetica Neue,Arial,sans-serif" fill="#131a27">${txt(132, 96, 22, 'Phạm Hùng Tiến', 'font-weight="600"')}${body}<path d="M72 507H1128" stroke="#d9dee6" stroke-width="2"/>${txt(72, 554, 24, 'phamhungtien.com', 'fill="#566074"')}${txt(1128, 554, 22, footer, 'text-anchor="end" fill="#566074"')}</g></svg>`;
  const path = `public/og/${slug}.png`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path);
  outputs.push(path);
}
const panel = (i, label) =>
  `<rect x="832" y="126" width="292" height="344" rx="40" fill="#ffffff" stroke="#d9dee6" stroke-width="2"/><image href="${icons[i]}" x="878" y="162" width="200" height="200"/>${txt(978, 423, 24, label, 'text-anchor="middle" fill="#566074" font-weight="500"')}`;
await card(
  'home',
  txt(70, 268, 104, 'Phạm Hùng Tiến', 'font-weight="700" letter-spacing="-4"') +
    txt(74, 330, 30, 'Independent app developer', 'fill="#566074" font-weight="500"') +
    `<rect x="72" y="372" width="1056" height="104" rx="28" fill="#ffffff" stroke="#d9dee6" stroke-width="2"/>` +
    icons
      .map(
        (icon, i) => `<image href="${icon}" x="${104 + i * 146}" y="384" width="80" height="80"/>`,
      )
      .join(''),
  'Offline-first, private apps',
);
for (const [i, a] of apps.entries()) {
  const [slug, , name, , lines, detail] = a;
  await card(
    slug,
    txt(72, 187, 36, name, 'font-weight="600"') +
      lines
        .map((line, j) =>
          txt(
            72,
            278 + j * 76,
            slug === 'phtv' ? 55 : 62,
            line,
            'font-weight="700" letter-spacing="-2"',
          ),
        )
        .join('') +
      txt(74, 422, 25, detail, 'fill="#566074"') +
      panel(i, name),
    slug === 'phtv' ? 'macOS' : 'App Store',
  );
  for (const kind of ['privacy', 'terms']) {
    const heading = kind === 'privacy' ? 'Privacy Policy' : 'Terms of Use';
    const local =
      slug === 'phtv'
        ? kind === 'privacy'
          ? 'Chính sách riêng tư'
          : 'Điều khoản sử dụng'
        : heading;
    await card(
      `${slug}-${kind}`,
      txt(72, 205, 36, name, 'font-weight="600"') +
        txt(72, 305, slug === 'phtv' ? 49 : 60, local, 'font-weight="700" letter-spacing="-1"') +
        txt(
          74,
          374,
          25,
          slug === 'phtv'
            ? kind === 'privacy'
              ? 'Thông tin về dữ liệu của bạn.'
              : 'Thông tin và điều kiện sử dụng.'
            : kind === 'privacy'
              ? 'Your data, clearly explained.'
              : 'The details behind the app.',
          'fill="#566074"',
        ) +
        panel(i, heading),
      name,
    );
  }
}
for (const file of outputs) {
  const m = await sharp(file).metadata();
  if (m.width !== 1200 || m.height !== 630) throw Error(file);
}
await sharp({
  create: {
    width: 1200,
    height: Math.ceil(outputs.length / 4) * 158,
    channels: 3,
    background: '#e9edf2',
  },
})
  .composite(
    await Promise.all(
      outputs.map(async (file, i) => ({
        input: await sharp(file).resize(300, 158).toBuffer(),
        left: (i % 4) * 300,
        top: Math.floor(i / 4) * 158,
      })),
    ),
  )
  .jpeg({ quality: 90 })
  .toFile('/tmp/social-preview-contact-sheet.jpg');
console.log(`Generated ${outputs.length} social previews, 1200 × 630.`);
