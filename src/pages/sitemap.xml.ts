import type { APIRoute } from 'astro';
import { apps } from '../data/apps';
import {
  appAlternates,
  homeAlternates,
  withDefaultAlternate,
  type AlternateRoute,
} from '../lib/routes';
import { absolute, ogImage } from '../lib/seo';
import {
  getGuides,
  guideAlternates,
  guideIndexAlternates,
  guideOgKey,
  guideSlug,
  guideUrl,
} from '../lib/guides';

interface Entry {
  path: string;
  versions: AlternateRoute[];
  lastmod?: string;
  image?: string;
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const pagesIn = (versions: AlternateRoute[], image?: string): Entry[] =>
  versions
    .filter(({ lang }) => lang !== 'x-default')
    .map(({ path }) => ({ path, versions, image }));

export const GET: APIRoute = async () => {
  const guides = await getGuides();
  const entries: Entry[] = [
    ...pagesIn(homeAlternates),
    ...apps.flatMap((app) => pagesIn(appAlternates(app), ogImage(app.slug))),
    ...pagesIn(guideIndexAlternates),
    ...guides.map((guide) => ({
      path: guideUrl(guide),
      versions: guideAlternates(guideSlug(guide), guides),
      lastmod: guide.data.updated ?? guide.data.published,
      image: ogImage(guideOgKey(guide)),
    })),
  ];

  const urls = entries.map(({ path, versions, lastmod, image }) => {
    const alternates = withDefaultAlternate(versions).map(
      ({ lang, path }) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escape(absolute(path))}"/>`,
    );
    return [
      '  <url>',
      `    <loc>${escape(absolute(path))}</loc>`,
      lastmod && `    <lastmod>${lastmod}</lastmod>`,
      ...alternates,
      image && `    <image:image><image:loc>${escape(image)}</image:loc></image:image>`,
      '  </url>',
    ]
      .filter(Boolean)
      .join('\n');
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
