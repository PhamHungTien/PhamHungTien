import sharp from 'sharp';
import { readFile, readdir, stat } from 'node:fs/promises';
const files=(await readdir('public/og')).filter(f=>f.endsWith('.png'));
if(files.length!==22)throw Error(`Expected 22 cards, got ${files.length}`);
for(const file of files){const m=await sharp(`public/og/${file}`).metadata();if(m.width!==1200||m.height!==630||(await stat(`public/og/${file}`)).size>1024*1024)throw Error(`Invalid card: ${file}`);}
const routes=['vTTS','PadCodeAI','PadNotesAI','MyNASManager','LunarV','LunarBlock','PHTV'];
const pages=['dist/index.html',...routes.map(r=>r==='PHTV'?'PHTV/dist/index.html':`dist/${r}/index.html`),...routes.flatMap(r=>['privacy','terms'].map(k=>`${r}/${r==='PHTV'?'dist/':''}${k}.html`))];
for(const page of pages){const html=await readFile(page,'utf8');const values={};for(const tag of html.matchAll(/<meta\b[^>]*>/g)){const key=tag[0].match(/(?:property|name)="([^"]+)"/)?.[1];const value=tag[0].match(/content="([^"]*)"/)?.[1];if(key)values[key]=value;}
 const url=new URL(values['og:image']);const file=url.pathname.split('/').at(-1);
 if(!files.includes(file)||url.origin!=='https://phamhungtien.com'||url.searchParams.get('v')!=='earth-1'||values['og:image:width']!=='1200'||values['og:image:height']!=='630'||!values['og:image:alt']||values['twitter:image']!==values['og:image']||values['twitter:card']!=='summary_large_image')throw Error(`Invalid social metadata: ${page}`);
}
console.log(`✓ ${files.length} cards and ${pages.length} pages have valid social previews.`);
