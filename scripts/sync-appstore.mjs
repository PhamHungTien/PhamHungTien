import { readFile, writeFile, rename } from 'node:fs/promises';
const destination = new URL('../src/data/appstore.json', import.meta.url);
const previous = JSON.parse(await readFile(destination, 'utf8'));
const ids = Object.values(previous.apps).map(app => app.trackId);
const response = await fetch(`https://itunes.apple.com/lookup?id=${ids.join(',')}&country=us`, { signal: AbortSignal.timeout(30000) });
if (!response.ok) throw new Error(`Apple returned HTTP ${response.status}`);
const { results } = await response.json();
const apps = {};
for (const [slug, old] of Object.entries(previous.apps)) {
  const app = results.find(item => item.trackId === old.trackId);
  if (!app?.version || !app?.trackViewUrl || !app?.currentVersionReleaseDate) throw new Error(`Missing Apple data for ${slug}; snapshot preserved`);
  apps[slug] = Object.fromEntries(Object.keys(old).map(key => [key, app[key] ?? null]));
}
const checkedAt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const temporary = new URL('../src/data/appstore.json.tmp', import.meta.url);
await writeFile(temporary, JSON.stringify({ checkedAt, storefront: 'us', apps }, null, 2) + '\n');
await rename(temporary, destination);
console.log(`Updated ${Object.keys(apps).length} App Store listings (${checkedAt}). Run npm run build to include them in the site.`);
