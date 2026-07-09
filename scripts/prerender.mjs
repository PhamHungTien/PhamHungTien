/**
 * Turns the client build's single index.html shell into one real HTML document per
 * route, each carrying its own <title>, description, canonical, Open Graph card and
 * JSON-LD. Social crawlers never run JavaScript, so anything set only from a React
 * effect is invisible to them.
 *
 * Also emits sitemap.xml and redirect stubs, because GitHub Pages honours neither
 * _redirects (Netlify) nor .htaccess (Apache).
 *
 * Runs after `vite build` and `vite build --ssr src/entry-server.tsx`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(root, 'dist');

const server = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);
const { render, prerenderRoutes, products, SITE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } = server;

const template = await readFile(join(distDir, 'index.html'), 'utf8');
const buildDate = new Date().toISOString().slice(0, 10);

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** A literal `</script>` inside the JSON-LD payload would close the tag early. */
const escapeJsonLd = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

function buildHead(meta, structuredData) {
  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`,

    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE.name)}" />`,
    `<meta property="og:locale" content="vi_VN" />`,
    `<meta property="og:locale:alternate" content="en_US" />`,
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:image" content="${escapeAttr(meta.ogImage)}" />`,
    `<meta property="og:image:secure_url" content="${escapeAttr(meta.ogImage)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(meta.ogImageAlt)}" />`,

    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${SITE.twitter}" />`,
    `<meta name="twitter:creator" content="${SITE.twitter}" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(meta.ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttr(meta.ogImageAlt)}" />`,

    `<script type="application/ld+json">${escapeJsonLd(structuredData)}</script>`
  ];

  return tags.map((tag) => `    ${tag}`).join('\n');
}

async function emit(relPath, contents) {
  const outPath = join(distDir, relPath);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, contents, 'utf8');
}

// ---------------------------------------------------------------- HTML routes

for (const route of prerenderRoutes) {
  const { html, meta, structuredData } = render(route);

  const page = template
    .replace('<!--app-head-->', buildHead(meta, structuredData))
    .replace('<!--app-html-->', html);

  if (page.includes('<!--app-head-->') || page.includes('<!--app-html-->')) {
    throw new Error(`Prerender markers were not replaced for ${route}`);
  }

  await emit(route === '/' ? 'index.html' : join(route, 'index.html'), page);
  console.log(`  route  ${route.padEnd(16)} ${meta.title}`);
}

// ------------------------------------------------------------------- sitemap

const sitemapUrls = [
  { loc: `${SITE.origin}/`, priority: '1.0', changefreq: 'weekly' },
  ...products.flatMap((product) => [
    {
      loc: `${SITE.origin}${product.route}`,
      priority: '0.9',
      changefreq: 'weekly',
      image: { loc: `${SITE.origin}/og/${product.slug}.png`, title: product.name, caption: product.description.vi }
    },
    { loc: `${SITE.origin}${product.route}privacy.html`, priority: '0.4', changefreq: 'yearly' },
    { loc: `${SITE.origin}${product.route}terms.html`, priority: '0.4', changefreq: 'yearly' }
  ])
];

const escapeXml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapUrls
  .map(({ loc, priority, changefreq, image }) => {
    const imageBlock = image
      ? `
    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`
      : '';

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageBlock}
  </url>`;
  })
  .join('\n')}
</urlset>
`;

await emit('sitemap.xml', sitemap);
console.log(`\n  sitemap  ${sitemapUrls.length} urls`);

// ------------------------------------------------------------ redirect stubs

/**
 * GitHub Pages is case-sensitive and serves 404.html (HTTP 404) for /phtv, so any
 * inbound link to a lowercase path loses its equity. A zero-delay meta refresh plus
 * a canonical is the strongest redirect a static host can express.
 */
const aliases = {
  phtv: '/PHTV/',
  lunarv: '/LunarV/',
  padcodeai: '/PadCodeAI/',
  padnotesai: '/PadNotesAI/',
  aipadnotes: '/PadNotesAI/',
  mynasmanager: '/MyNASManager/',
  lunarblock: '/LunarBlock/'
};

for (const [alias, target] of Object.entries(aliases)) {
  const url = `${SITE.origin}${target}`;
  await emit(
    join(alias, 'index.html'),
    `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${url}" />
    <title>Redirecting to ${target}</title>
  </head>
  <body>
    <p>Redirecting to <a href="${target}">${url}</a>.</p>
    <script>window.location.replace(${JSON.stringify(target)});</script>
  </body>
</html>
`
  );
}

console.log(`  aliases  ${Object.keys(aliases).length} redirect stubs`);
console.log(`\n✓ prerender complete`);
