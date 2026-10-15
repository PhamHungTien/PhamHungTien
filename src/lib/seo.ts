import type { App, Lang } from '../data/types';
import { SITE } from '../data/site';
import { apps } from '../data/apps';
import { socialProfiles } from '../data/socials';
import appStore from '../data/appstore.json';
import { t } from './i18n';
import { platformList, storesOf } from '../data/platforms';
import { appPath, homePath } from './routes';

/** Bump when the Open Graph cards in public/og are regenerated (npm run og). */
export const OG_VERSION = 'pht-4';
export const OG_SIZE = { width: 1200, height: 630 } as const;

export const absolute = (path: string) => new URL(path, SITE.origin).href;
export const ogImage = (name: string) => absolute(`/og/${name}.png?v=${OG_VERSION}`);

/** Search results show ~155 characters; keep whole sentences where possible. */
export function metaDescription(text: string, max = 158) {
  if (text.length <= max) return text;
  let out = '';
  for (const sentence of text.match(/[^.!?]+[.!?]+/g) ?? []) {
    if ((out + sentence).trim().length > max) break;
    out += sentence;
  }
  return out.trim() || `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}

type StoreRecord = {
  version?: string;
  currentVersionReleaseDate?: string;
  price?: number;
  currency?: string;
};
const storeApps = appStore.apps as Record<string, StoreRecord | undefined>;

const PERSON_ID = `${SITE.origin}/#person`;
const WEBSITE_ID = `${SITE.origin}/#website`;

export const personSchema = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE.name,
  alternateName: SITE.asciiName,
  url: `${SITE.origin}/`,
  email: `mailto:${SITE.email}`,
  image: ogImage('home'),
  jobTitle: 'App Developer',
  nationality: { '@type': 'Country', name: 'Vietnam' },
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'VNUHCM University of Science',
    url: 'https://hcmus.edu.vn/',
  },
  knowsAbout: [
    'Swift',
    'SwiftUI',
    'iOS development',
    'macOS development',
    'On-device machine learning',
    'Embedded systems',
    'STM32',
    'ESP32',
  ],
  sameAs: socialProfiles.map((p) => p.href).filter((href) => href.startsWith('https://')),
};

const websiteSchema = (lang: Lang) => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE.origin}/`,
  name: SITE.name,
  alternateName: SITE.asciiName,
  publisher: { '@id': PERSON_ID },
  inLanguage: ['en', 'vi'],
  description: t(lang, 'meta.home.description'),
});

export function homeJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema,
      websiteSchema(lang),
      {
        '@type': 'ProfilePage',
        '@id': `${absolute(homePath(lang))}#profile`,
        url: absolute(homePath(lang)),
        name: t(lang, 'meta.home.title'),
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        inLanguage: lang,
      },
      {
        '@type': 'ItemList',
        name: t(lang, 'home.apps.title'),
        itemListElement: apps.map((app, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: app.name,
          url: absolute(appPath(app, lang)),
        })),
      },
    ],
  };
}

export function appJsonLd(app: App, lang: Lang) {
  const url = absolute(appPath(app, lang));
  const software: Record<string, unknown> = {
    '@type': 'SoftwareApplication',
    '@id': `${absolute(app.route)}#app`,
    name: app.name,
    description: app.description[lang],
    applicationCategory: app.appCategory,
    operatingSystem: app.requirements ?? platformList(app.platforms).join(', '),
    url,
    image: ogImage(app.slug),
    inLanguage: lang,
    author: { '@id': PERSON_ID },
    featureList: app.features.map((feature) => feature.title[lang]),
    screenshot: app.gallery.map((image) => absolute((image.localizedSrc?.[lang] ?? image.src).src)),
  };
  const stores = storesOf(app.links.stores);
  if (stores.length) software.downloadUrl = software.installUrl = stores.map((store) => store.url);
  if (app.links.source) software.codeRepository = app.links.source;

  // Only facts confirmed by the App Store lookup (npm run sync:appstore) are published.
  const store = storeApps[app.slug];
  if (store?.version) software.softwareVersion = store.version;
  if (store?.currentVersionReleaseDate)
    software.dateModified = store.currentVersionReleaseDate.slice(0, 10);
  const price = store?.price ?? (app.links.source ? 0 : undefined);
  if (price !== undefined) {
    software.offers = {
      '@type': 'Offer',
      price: String(price),
      priceCurrency: store?.currency ?? 'USD',
      availability: 'https://schema.org/InStock',
      url: stores[0]?.url ?? app.links.source ?? url,
    };
  }

  const graph: unknown[] = [
    personSchema,
    software,
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t(lang, 'nav.home'),
          item: absolute(homePath(lang)),
        },
        { '@type': 'ListItem', position: 2, name: app.name, item: url },
      ],
    },
  ];

  if (app.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      inLanguage: lang,
      mainEntity: app.faq.map((item) => ({
        '@type': 'Question',
        name: item.question[lang],
        acceptedAnswer: { '@type': 'Answer', text: item.answer[lang].replaceAll('`', '') },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
