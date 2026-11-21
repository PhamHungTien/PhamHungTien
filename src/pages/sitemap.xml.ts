import type { APIRoute } from 'astro';
import { apps } from '../data/apps';
import { type Lang } from '../data/types';
import {
  appAlternates,
  homeAlternates,
  withDefaultAlternate,
  type AlternateRoute,
} from '../lib/routes';
import { absolute, ogImage } from '../lib/seo';
import { getGuides, guideLang, GUIDES_PATH, guidePath } from '../lib/guides';

/**
 * One <url> per indexable page, each listing every language version (hreflang) so search
 * engines understand /vTTS/ and /vi/vTTS/ are translations, not duplicates.
 */
interface Entry {
  versions: AlternateRoute[];
  lastmod?: string;
  image?: string;
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const guides = await getGuides();
  const entries: Entry[] = [
    {
      versions: homeAlternates,
    },
    ...apps.map((app) => ({
      versions: appAlternates(app),
      image: ogImage(app.slug),
    })),
    { versions: [{ lang: 'en' as Lang, path: GUIDES_PATH }] },
    ...guides.map((g) => ({
      versions: [{ lang: guideLang(g), path: guidePath(g.id) }],
      lastmod: g.data.updated ?? g.data.published,
      image: ogImage(`guide-${g.id}`),
    })),
    // Privacy policies and terms stay public (and linked) but are noindex: they are not
    // listed here, so crawlers spend their time on the apps and guides.
  ];

  const urls = entries.flatMap(({ versions, lastmod, image }) =>
    versions
      .filter(({ lang }) => lang !== 'x-default')
      .map(({ path }) => {
        const alternates = withDefaultAlternate(versions)
          .map(
            ({ lang, path }) =>
              `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escape(absolute(path))}"/>`,
          )
          .join('\n');
        const imageBlock = image
          ? `    <image:image><image:loc>${escape(image)}</image:loc></image:image>`
          : '';
        return [
          '  <url>',
          `    <loc>${escape(absolute(path))}</loc>`,
          lastmod && `    <lastmod>${lastmod}</lastmod>`,
          alternates,
          imageBlock,
          '  </url>',
        ]
          .filter(Boolean)
          .join('\n');
      }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
