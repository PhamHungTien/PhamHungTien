#!/usr/bin/env node
/**
 * Regenerates the site icons in public/ from src/assets/brand/logo.svg:
 * favicon.svg, favicon.ico (32 px), apple-touch-icon.png and the web-manifest icons.
 *
 *   node scripts/tools/brand-icons.mjs
 */
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const logo = await readFile('src/assets/brand/logo.svg', 'utf8');
// Full-bleed variant for platforms that apply their own mask (iOS, Android maskable).
const square = logo.replace(/<rect width="64" height="64" rx="15"/, '<rect width="64" height="64"');
const png = (svg, size) =>
  sharp(Buffer.from(svg), { density: 1200 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

await writeFile('public/favicon.svg', logo.replace(/\s*<!--.*?-->/s, ''));
await writeFile('public/apple-touch-icon.png', await png(square, 180));
await writeFile('public/icon-192.png', await png(logo, 192));
await writeFile('public/icon-512.png', await png(logo, 512));
await writeFile('public/icon-maskable-512.png', await png(square, 512));

// favicon.ico: one 32 px PNG in an ICO container, which every browser accepts.
const ico = await png(logo, 32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(ico.length, 14);
header.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([header, ico]));
console.log('✓ icons written to public/');
