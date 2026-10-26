import type { APIRoute } from 'astro';
import { apps, defaultLangOf } from '../data/apps';
import { type Locale } from '../i18n/locales';
import { type Lang } from '../data/types';
import appStore from '../data/appstore.json';
import { appPath, homePath, legalPath } from '../lib/routes';
import { absolute, ogImage } from '../lib/seo';
import { getGuides, guideLang, GUIDES_PATH, guidePath } from '../lib/guides';
import { sitePrivacyPath } from '../lib/sitePages';

/**
 * One <url> per page, each listing every language version (hreflang) so search
 * engines understand /vTTS/ and /vi/vTTS/ are translations, not duplicates.
 */
interface Entry {
  versions: { lang: Locale; path: string }[];
  lastmod?: string;
  image?: { loc: string; title: string };
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const releaseDate = (slug: string) =>
  (appStore.apps as Record<string, { currentVersionReleaseDate?: string }>)[
    slug
  ]?.currentVersionReleaseDate?.slice(0, 10);

export const GET: APIRoute = async () => {
  const guides = await getGuides();
  const entries: Entry[] = [
    { versions: [{ lang: 'en', path: homePath() }] },
    ...apps.map((app) => ({
      versions: [{ lang: defaultLangOf(app), path: appPath(app) }],
      lastmod: releaseDate(app.slug),
      image: { loc: ogImage(app.slug), title: app.name },
    })),
    { versions: [{ lang: 'en' as Lang, path: GUIDES_PATH }], lastmod: guides[0]?.data.published },
    ...guides.map((g) => ({
      versions: [{ lang: guideLang(g), path: guidePath(g.id) }],
      lastmod: g.data.updated ?? g.data.published,
      image: { loc: ogImage(`guide-${g.id}`), title: g.data.title },
    })),
    { versions: [{ lang: 'en', path: sitePrivacyPath('en') }] },
    ...apps.flatMap((app) =>
      (['privacy', 'terms'] as const).map((kind) => ({
        versions: [{ lang: defaultLangOf(app), path: legalPath(app, kind) }],
      })),
    ),
  ];

  const urls = entries.flatMap(({ versions, lastmod, image }) =>
    versions.map(({ path }) => {
      const alternates =
        versions.length > 1
          ? versions
              .map(
                (v) =>
                  `    <xhtml:link rel="alternate" hreflang="${v.lang}" href="${escape(absolute(v.path))}"/>`,
              )
              .concat(
                `    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(absolute(versions[0].path))}"/>`,
              )
              .join('\n')
          : '';
      const imageBlock = image
        ? `    <image:image><image:loc>${escape(image.loc)}</image:loc><image:title>${escape(image.title)}</image:title></image:image>`
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
