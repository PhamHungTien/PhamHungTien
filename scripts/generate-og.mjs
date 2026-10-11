import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const apps = [
  [
    'phtv',
    'PHTV',
    'PHTV',
    'assets/phtv-icon.webp',
    ['Gõ tiếng Việt.', 'Theo cách của bạn.'],
    'Bộ gõ riêng tư cho macOS.',
  ],
  [
    'vtts',
    'vTTS',
    'vTTS',
    'vTTS/assets/app-icon.png',
    ['Let your books', 'speak to you.'],
    'Books and text to speech, on your device.',
  ],
  [
    'padcodeai',
    'PadCodeAI',
    'Pad Code AI',
    'PadCodeAI/assets/app-icon.png',
    ['Your code.', 'Anywhere.'],
    'An offline coding workspace for iPad and iPhone.',
  ],
  [
    'padnotesai',
    'PadNotesAI',
    'Pad Notes AI',
    'PadNotesAI/assets/app-icon.png',
    ['A place for', 'your thoughts.'],
    'Notes, documents and OCR across your devices.',
  ],
  [
    'mynasmanager',
    'MyNASManager',
    'My NAS Manager',
    'MyNASManager/assets/app-icon.png',
    ['Your NAS.', 'Within reach.'],
    'Files, monitoring and SSH in one place.',
  ],
  [
    'lunarv',
    'LunarV',
    'LunarV',
    'assets/lunarv-icon.png',
    ['Keep your days', 'in harmony.'],
    'Vietnamese lunar dates, widgets and reminders.',
  ],
  [
    'lunarblock',
    'LunarBlock',
    'Lunar Block',
    'LunarBlock/assets/app-icon.png',
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
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="paper"><stop stop-color="#faf5ec"/><stop offset="1" stop-color="#f0e2ce"/></linearGradient><radialGradient id="glow"><stop stop-color="#deb67b" stop-opacity=".35"/><stop offset="1" stop-color="#deb67b" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="url(#paper)"/><ellipse cx="1080" cy="150" rx="490" ry="430" fill="url(#glow)"/><path d="M72 78H190" stroke="#a36928" stroke-width="5" stroke-linecap="round"/><circle cx="208" cy="78" r="3" fill="#a34e34"/><g font-family="Helvetica Neue,Arial,sans-serif" fill="#36271f">${body}<path d="M72 507H1128" stroke="#cdb99c"/>${txt(72, 554, 24, 'phamhungtien.com', 'fill="#756354"')}${txt(1128, 554, 22, footer, 'text-anchor="end" fill="#756354"')}</g></svg>`;
  const path = `public/og/${slug}.png`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path);
  outputs.push(path);
}
const panel = (i, label) =>
  `<rect x="832" y="126" width="292" height="364" rx="64" fill="#fffaf2" stroke="#d4b98e"/><image href="${icons[i]}" x="878" y="168" width="200" height="200"/>${txt(978, 433, 24, label, 'text-anchor="middle" fill="#756354"')}`;
await card(
  'home',
  txt(72, 235, 64, 'Small ideas.', 'font-weight="700" letter-spacing="-2"') +
    txt(
      72,
      315,
      64,
      'Thoughtfully built.',
      'font-family="Georgia,serif" font-style="italic" letter-spacing="-2"',
    ) +
    txt(74, 390, 28, 'Apps for everyday ideas.', 'fill="#756354"') +
    icons
      .map(
        (icon, i) =>
          `<image href="${icon}" x="${792 + (i === 6 ? 1 : i % 3) * 116}" y="${130 + Math.floor(i / 3) * 116}" width="96" height="96"/>`,
      )
      .join(''),
  'The app collection',
);
for (const [i, a] of apps.entries()) {
  const [slug, route, name, , lines, detail] = a;
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
      txt(74, 422, 25, detail, 'fill="#756354"') +
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
          'fill="#756354"',
        ) +
        panel(i, heading),
      name,
    );
    const file = `${route}/${slug === 'phtv' ? 'public/' : ''}${kind}.html`;
    let html = await readFile(file, 'utf8');
    html = html.replace(/\s*<!-- social-preview:start -->[\s\S]*?<!-- social-preview:end -->/g, '');
    const title = `${name} — ${local}`,
      desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? title;
    const image = `https://phamhungtien.com/og/${slug}-${kind}.png?v=earth-1`;
    const tags = {
      'og:type': 'website',
      'og:site_name': 'Pham Hung Tien',
      'og:title': title,
      'og:description': desc,
      'og:url': `https://phamhungtien.com/${route}/${kind}.html`,
      'og:image': image,
      'og:image:secure_url': image,
      'og:image:type': 'image/png',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': title,
    };
    const block =
      '\n<!-- social-preview:start -->\n' +
      Object.entries(tags)
        .map(([key, val]) => `<meta property="${key}" content="${esc(val)}" />`)
        .join('\n') +
      '\n' +
      Object.entries({
        'twitter:card': 'summary_large_image',
        'twitter:title': title,
        'twitter:description': desc,
        'twitter:image': image,
        'twitter:image:alt': title,
      })
        .map(([key, val]) => `<meta name="${key}" content="${esc(val)}" />`)
        .join('\n') +
      '\n<!-- social-preview:end -->\n';
    await writeFile(file, html.replace('</head>', `${block}</head>`));
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
    background: '#e9dfd0',
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
console.log(`Generated ${outputs.length} social previews, 1200 × 630, and legal metadata.`);
