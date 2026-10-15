#!/usr/bin/env node
/**
 * Builds the brand kit in brand/ from the logo geometry in src/assets/brand/logo.svg:
 * SVG marks and lockups (wordmark converted to outlines, so no font is needed to open
 * them), PNG exports, favicons, social images, YouTube channel art and a preview sheet.
 *
 *   node scripts/tools/brand-kit.mjs
 */
import sharp from 'sharp';
import opentype from 'opentype.js';
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const OUT = 'brand';
const C = {
  maroon: '#7a1424',
  gold: '#f0c04e',
  white: '#ffffff',
  ink: '#131a27',
  night: '#0d1118',
};
const NAME = 'Phạm Hùng Tiến';

// ------------------------------------------------------------------ geometry
// The mark: a "T" for Tiến wearing a nón lá (also the circumflex of "ế"), on an app-icon tile.
// Keep in sync with src/assets/brand/logo.svg (the generator reads nothing else from it).
const SQUIRCLE = 'M20 0h24c14 0 20 6 20 20v24c0 14-6 20-20 20H20C6 64 0 58 0 44V20C0 6 6 0 20 0Z';
const tile = (fill, square = false) =>
  square
    ? `<rect width="64" height="64" fill="${fill}"/>`
    : `<path d="${SQUIRCLE}" fill="${fill}"/>`;
const letter = (stroke) =>
  `<path d="M17.5 31h29M32 31v20" stroke="${stroke}" stroke-width="11" stroke-linecap="round" fill="none"/>`;
const accent = (fill) =>
  `<path d="M32 8.5 47.5 19Q32 22 16.5 19Z" fill="${fill}" stroke="${fill}" stroke-width="4.5" stroke-linejoin="round"/>`;
const glyph = (letterFill, accentFill) => `${letter(letterFill)}${accent(accentFill)}`;

const markBody = ({ square = false } = {}) => `${tile(C.maroon, square)}${glyph(C.white, C.gold)}`;
/** Single colour: the tile with the glyph cut out, for stamping, engraving and one-colour print. */
const monoBody = (fill, id) =>
  `<mask id="${id}"><rect width="64" height="64" fill="#fff"/>${glyph('#000', '#000')}</mask>` +
  `<path d="${SQUIRCLE}" fill="${fill}" mask="url(#${id})"/>`;

const svg = (w, h, body, label = NAME) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w * 8}" height="${h * 8}" role="img" aria-label="${label}">\n  ${body}\n</svg>\n`;

// ------------------------------------------------------------------ wordmark
const fontDir = 'node_modules/@fontsource/be-vietnam-pro/files';
const loadFont = async (subset, weight) =>
  opentype.parse(
    (await readFile(`${fontDir}/be-vietnam-pro-${subset}-${weight}-normal.woff`)).buffer.slice(0),
  );
// Each weight ships as a Latin and a Vietnamese subset; a character uses whichever has it.
const FONTS = {};
for (const weight of [500, 700])
  FONTS[weight] = [await loadFont('latin', weight), await loadFont('vietnamese', weight)];
const fonts = FONTS[700];
const pick = (ch, set = fonts) => set.find((f) => f.charToGlyphIndex(ch) > 0) ?? set[0];

/** Outlines `text` at `size` with the baseline at (x, y); returns { d, width }. */
function wordmark(text, x, y, size, tracking = -0.02, weight = 700) {
  let cursor = x;
  let d = '';
  for (const ch of text) {
    const font = pick(ch, FONTS[weight]);
    const glyph = font.charToGlyph(ch);
    d += glyph.getPath(cursor, y, size).toPathData(2);
    cursor += (glyph.advanceWidth / font.unitsPerEm) * size + tracking * size;
  }
  return { d, width: cursor - x - tracking * size };
}
const capHeight = (size) => (fonts[0].tables.os2.sCapHeight / fonts[0].unitsPerEm) * size;

// Horizontal lockup: caps centred on the mark, gap = half the mark.
function horizontal(textFill) {
  const size = 30;
  const x = 64 + 18;
  const { d, width } = wordmark(NAME, x, 32 + capHeight(size) / 2, size);
  return {
    w: Math.ceil(x + width + 2),
    h: 64,
    body: `${markBody()}<path fill="${textFill}" d="${d}"/>`,
  };
}

// Stacked lockup: mark above, name centred below.
function stacked(textFill) {
  const size = 26;
  const probe = wordmark(NAME, 0, 0, size);
  const w = Math.ceil(Math.max(probe.width, 64) + 8);
  const { d } = wordmark(NAME, (w - probe.width) / 2, 64 + 22 + capHeight(size), size);
  const mx = (w - 64) / 2;
  return {
    w,
    h: 64 + 22 + Math.ceil(capHeight(size)) + 10,
    body: `<g transform="translate(${mx} 0)">${markBody()}</g><path fill="${textFill}" d="${d}"/>`,
  };
}

// ------------------------------------------------------------------ outputs
const write = (path, data) => writeFile(`${OUT}/${path}`, data);
const render = (svgText, width, height = width) =>
  // Rasterise at the target size directly (vector → exact pixels, no resampling blur).
  sharp(
    Buffer.from(
      svgText.replace(
        /<svg([^>]*?) width="[^"]*" height="[^"]*"/,
        `<svg$1 width="${width}" height="${height}"`,
      ),
    ),
  )
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();

// Clear generated output only; README.md is hand-written and lives alongside.
for (const dir of ['svg', 'png', 'favicon', 'social', 'youtube', 'preview.png'])
  await rm(`${OUT}/${dir}`, { recursive: true, force: true });
for (const dir of ['svg', 'png', 'favicon', 'social', 'youtube'])
  await mkdir(`${OUT}/${dir}`, { recursive: true });

const marks = {
  'logo-mark': svg(64, 64, markBody()),
  'logo-mark-square': svg(64, 64, markBody({ square: true })),
  'logo-glyph': svg(40, 51, `<g transform="translate(-12 -6)">${glyph(C.maroon, C.gold)}</g>`),
  'logo-mono-black': svg(64, 64, monoBody('#000000', 'cut')),
  'logo-mono-white': svg(64, 64, monoBody('#ffffff', 'cut')),
};
const lockups = {
  'lockup-horizontal': horizontal(C.ink),
  'lockup-horizontal-dark': horizontal(C.white),
  'lockup-stacked': stacked(C.ink),
  'lockup-stacked-dark': stacked(C.white),
};
for (const [name, value] of Object.entries(lockups))
  marks[name] = svg(value.w, value.h, value.body);
for (const [name, text] of Object.entries(marks)) await write(`svg/${name}.svg`, text);

for (const size of [16, 32, 48, 64, 128, 180, 192, 256, 512, 1024]) {
  await write(`png/logo-mark-${size}.png`, await render(marks['logo-mark'], size));
}
await write('png/logo-mark-square-1024.png', await render(marks['logo-mark-square'], 1024));
await write('png/logo-mono-black-512.png', await render(marks['logo-mono-black'], 512));
await write('png/logo-mono-white-512.png', await render(marks['logo-mono-white'], 512));
for (const [name, { w, h }] of Object.entries(lockups)) {
  const scale = 12; // 64 units → 768 px tall for horizontal, plenty for print and slides
  await write(`png/${name}.png`, await render(marks[name], w * scale, h * scale));
}

for (const file of [
  'favicon.svg',
  'favicon.ico',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'site.webmanifest',
]) {
  await copyFile(`public/${file}`, `${OUT}/favicon/${file}`);
}

// Social: avatar (square, full bleed, platforms crop to a circle) and a 3:1 header.
const avatar = svg(
  64,
  64,
  `<rect width="64" height="64" fill="${C.maroon}"/><g transform="translate(9.6 9.6) scale(.7)">${glyph(C.white, C.gold)}</g>`,
);
await write('svg/avatar.svg', avatar);
await write('social/avatar-1024.png', await render(avatar, 1024));

const lockupDark = lockups['lockup-horizontal-dark'];
const bw = 1500;
const bh = 500;
const s = Math.min((bw * 0.62) / lockupDark.w, (bh * 0.34) / lockupDark.h);
const banner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${bw} ${bh}" width="${bw}" height="${bh}">
  <rect width="${bw}" height="${bh}" fill="${C.night}"/>
  <rect x="0" y="${bh - 10}" width="${bw}" height="10" fill="${C.maroon}"/>
  <rect x="0" y="${bh - 10}" width="${bw * 0.18}" height="10" fill="${C.gold}"/>
  <g transform="translate(${(bw - lockupDark.w * s) / 2} ${(bh - lockupDark.h * s) / 2}) scale(${s})">${lockupDark.body}</g>
</svg>\n`;
await write('svg/banner-1500x500.svg', banner);
await write('social/banner-1500x500.png', await render(banner, bw, bh));
await copyFile('public/og/home.png', `${OUT}/social/og-home-1200x630.png`);

// ------------------------------------------------------------------ YouTube
// Sizes follow YouTube's guidelines: avatar 800 px (shown as a circle), banner 2560 × 1440
// with everything important inside the 1546 × 423 centre that every device shows,
// watermark 150 px, thumbnails 1280 × 720.
const YT_TAGLINE = 'Làm ứng dụng · Lập trình · Công nghệ';
const textPath = (
  text,
  x,
  y,
  size,
  fill,
  { weight = 700, tracking = -0.02, anchor = 'start' } = {},
) => {
  const probe = wordmark(text, 0, 0, size, tracking, weight);
  const left = anchor === 'middle' ? x - probe.width / 2 : x;
  const { d } = wordmark(text, left, y, size, tracking, weight);
  return { svg: `<path fill="${fill}" d="${d}"/>`, width: probe.width };
};
/** The nón lá on its own, as a decorative shape (same curve as the mark). */
const hat = (fill, opacity) =>
  `<path d="M32 8.5 47.5 19Q32 22 16.5 19Z" fill="${fill}" stroke="${fill}" stroke-width="4.5" stroke-linejoin="round" opacity="${opacity}"/>`;
const glow = (id, color, opacity) =>
  `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="${opacity}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;

// Avatar: the glyph alone on maroon, sized for YouTube's circular crop.
const ytAvatarScale = 0.8;
const ytAvatar = svg(
  64,
  64,
  `<rect width="64" height="64" fill="${C.maroon}"/><g transform="translate(${32 - 32 * ytAvatarScale} ${32 - 31.5 * ytAvatarScale}) scale(${ytAvatarScale})">${glyph(C.white, C.gold)}</g>`,
);
await write('youtube/avatar-800.png', await render(ytAvatar, 800));

// Watermark: the full mark on transparency, shown in the corner of every video.
await write('youtube/watermark-150.png', await render(marks['logo-mark'], 150));

// Banner.
const BW = 2560;
const BH = 1440;
const safe = { x: (BW - 1546) / 2, y: (BH - 423) / 2, w: 1546, h: 423 };
const lockS = 150 / 64; // mark 150 px tall
const lockW = lockupDark.w * lockS;
const tagline = textPath(YT_TAGLINE, BW / 2, safe.y + 316, 46, '#9aa4b6', {
  weight: 500,
  tracking: 0,
  anchor: 'middle',
});
const ytBanner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BW} ${BH}" width="${BW}" height="${BH}">
  <defs>${glow('g1', C.maroon, 0.55)}${glow('g2', C.gold, 0.16)}${glow('g3', C.maroon, 0.35)}</defs>
  <rect width="${BW}" height="${BH}" fill="${C.night}"/>
  <ellipse cx="${BW * 0.16}" cy="${BH * 0.5}" rx="900" ry="620" fill="url(#g1)"/>
  <ellipse cx="${BW * 0.86}" cy="${BH * 0.42}" rx="760" ry="520" fill="url(#g2)"/>
  <ellipse cx="${BW * 0.62}" cy="${BH * 0.78}" rx="700" ry="420" fill="url(#g3)"/>
  <g transform="translate(${BW * 0.74} ${BH * 0.2}) scale(26)">${hat(C.gold, 0.06)}</g>
  <g transform="translate(${BW * 0.02} ${BH * 0.52}) scale(16)">${hat(C.gold, 0.045)}</g>
  <g transform="translate(${(BW - lockW) / 2} ${safe.y + 96}) scale(${lockS})">${lockupDark.body}</g>
  ${tagline.svg}
  <rect x="0" y="${BH - 14}" width="${BW}" height="14" fill="${C.maroon}"/>
  <rect x="0" y="${BH - 14}" width="${BW * 0.18}" height="14" fill="${C.gold}"/>
</svg>\n`;
await write('youtube/banner-2560x1440.png', await render(ytBanner, BW, BH));

// Thumbnails: a clean base to design on, and a filled-in example of the layout.
const TW = 1280;
const TH = 720;
const thumbBase = (
  extra = '',
) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TW} ${TH}" width="${TW}" height="${TH}">
  <defs>${glow('t1', C.maroon, 0.7)}${glow('t2', C.gold, 0.18)}</defs>
  <rect width="${TW}" height="${TH}" fill="${C.night}"/>
  <ellipse cx="${TW * 0.78}" cy="${TH * 0.52}" rx="560" ry="460" fill="url(#t1)"/>
  <ellipse cx="${TW * 0.96}" cy="${TH * 0.08}" rx="360" ry="260" fill="url(#t2)"/>
  <g transform="translate(56 50) scale(${56 / 64})">${markBody()}</g>
  ${textPath(NAME, 128, 50 + 28 + capHeight(26) / 2, 26, C.white).svg}
  <rect x="0" y="${TH - 12}" width="${TW}" height="12" fill="${C.maroon}"/>
  <rect x="0" y="${TH - 12}" width="${TW * 0.18}" height="12" fill="${C.gold}"/>
  ${extra}
</svg>\n`;
await write('youtube/thumbnail-base-1280x720.png', await render(thumbBase(), TW, TH));

const phtvIcon = await sharp('src/assets/apps/phtv/app-icon.webp')
  .resize(420, 420)
  .png()
  .toBuffer();
const example = thumbBase(`
  ${textPath('Gõ tiếng Việt', 56, 330, 104, C.white, { tracking: -0.035 }).svg}
  ${textPath('trên Mac', 56, 452, 104, C.gold, { tracking: -0.035 }).svg}
  ${textPath('Hướng dẫn chi tiết với PHTV', 60, 540, 38, '#c9d0dc', { weight: 500, tracking: 0 }).svg}
  <image href="data:image/png;base64,${phtvIcon.toString('base64')}" x="790" y="150" width="420" height="420"/>`);
await write('youtube/thumbnail-example-1280x720.png', await render(example, TW, TH));

// Preview sheet: every asset on the background it is meant for.
const cell = (x, y, w, h, bg, inner, iw, ih, label) => {
  const scale = Math.min((w - 80) / iw, (h - 90) / ih);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${bg}" stroke="#d9dee6"/>
  <g transform="translate(${x + (w - iw * scale) / 2} ${y + 26 + (h - 70 - ih * scale) / 2}) scale(${scale})">${inner}</g>
  <text x="${x + 20}" y="${y + h - 18}" font-family="sans-serif" font-size="15" fill="${bg === C.night || bg === C.maroon ? '#9aa4b6' : '#566074'}">${label}</text>`;
};
const inner = (svgText) => svgText.replace(/^<svg[^>]*>|<\/svg>\s*$/g, '');
const pw = 1600;
const ph = 1240;
const preview = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${pw} ${ph}" width="${pw}" height="${ph}">
  <rect width="${pw}" height="${ph}" fill="#f3f5f8"/>
  <text x="40" y="70" font-family="sans-serif" font-weight="700" font-size="34" fill="${C.ink}">Phạm Hùng Tiến — brand kit</text>
  ${cell(40, 110, 360, 300, '#ffffff', inner(marks['logo-mark']), 64, 64, 'logo-mark')}
  ${cell(420, 110, 360, 300, C.night, inner(marks['logo-mark']), 64, 64, 'logo-mark on dark')}
  ${cell(800, 110, 360, 300, '#ffffff', inner(marks['logo-glyph']), 40, 51, 'logo-glyph')}
  ${cell(1180, 110, 180, 300, '#ffffff', inner(marks['logo-mono-black']), 64, 64, 'mono black')}
  ${cell(1380, 110, 180, 300, C.maroon, inner(marks['logo-mono-white']), 64, 64, 'mono white')}
  ${cell(40, 430, 760, 260, '#ffffff', lockups['lockup-horizontal'].body, lockups['lockup-horizontal'].w, 64, 'lockup-horizontal')}
  ${cell(820, 430, 740, 260, C.night, lockups['lockup-horizontal-dark'].body, lockups['lockup-horizontal-dark'].w, 64, 'lockup-horizontal-dark')}
  ${cell(40, 710, 500, 490, '#ffffff', lockups['lockup-stacked'].body, lockups['lockup-stacked'].w, lockups['lockup-stacked'].h, 'lockup-stacked')}
  ${cell(560, 710, 500, 490, C.night, lockups['lockup-stacked-dark'].body, lockups['lockup-stacked-dark'].w, lockups['lockup-stacked-dark'].h, 'lockup-stacked-dark')}
  <g font-family="sans-serif" font-size="16">
    ${[
      [C.maroon, 'Maroon', '#7A1424'],
      [C.gold, 'Gold', '#F0C04E'],
      [C.ink, 'Ink', '#131A27'],
      [C.night, 'Night', '#0D1118'],
      ['#ffffff', 'White', '#FFFFFF'],
    ]
      .map(
        ([fill, label, hex], i) =>
          `<rect x="1080" y="${710 + i * 98}" width="80" height="80" rx="14" fill="${fill}" stroke="#d9dee6"/>
    <text x="1180" y="${745 + i * 98}" font-weight="700" fill="${C.ink}">${label}</text>
    <text x="1180" y="${770 + i * 98}" fill="#566074">${hex}</text>`,
      )
      .join('\n    ')}
  </g>
</svg>\n`;
await write('preview.png', await render(preview, pw, ph));

console.log(`✓ brand kit written to ${OUT}/`);
