import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../PHTV/dist-ssr/entry-server.js';
const file = new URL('../PHTV/dist/index.html', import.meta.url);
const html = await readFile(file, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('PHTV root placeholder is missing');
await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`));
console.log('✓ PHTV content prerendered for crawlers and hydration.');
