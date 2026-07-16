import type { Lang, Product } from './types';
import { products } from './data/products';
import { translate } from './i18n';

export const SITE = {
  origin: 'https://phamhungtien.com',
  name: 'Pham Hung Tien',
  author: 'Phạm Hùng Tiến',
  email: 'phamhungtien.contact@gmail.com',
  github: 'https://github.com/PhamHungTien',
  twitter: '@phamhungtien'
} as const;

/** Social crawlers do not run JavaScript, so every card image must be a stable, unhashed path. */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogImage: string;
  ogImageAlt: string;
  ogType: 'website' | 'product';
  locale: Lang;
}

function ogImageFor(slug: string) {
  return `${SITE.origin}/og/${slug}.png`;
}

export function getPageMeta(product: Product | null, lang: Lang): PageMeta {
  if (!product) {
    return {
      title: translate(lang, 'meta.home.title'),
      description: translate(lang, 'meta.home.description'),
      canonical: `${SITE.origin}/`,
      ogTitle: translate(lang, 'meta.home.title'),
      ogImage: ogImageFor('home'),
      ogImageAlt: translate(lang, 'meta.home.title'),
      ogType: 'website',
      locale: lang
    };
  }

  return {
    title: `${product.name} — ${product.category[lang]} | ${SITE.name}`,
    description: product.description[lang],
    canonical: `${SITE.origin}${product.route}`,
    ogTitle: `${product.name} — ${product.title[lang]}`,
    ogImage: ogImageFor(product.slug),
    ogImageAlt: product.gallery[0]?.alt[lang] ?? product.name,
    ogType: 'product',
    locale: lang
  };
}

const personSchema = {
  '@type': 'Person',
  '@id': `${SITE.origin}/#person`,
  name: SITE.author,
  alternateName: SITE.name,
  url: `${SITE.origin}/`,
  email: `mailto:${SITE.email}`,
  sameAs: [SITE.github]
};

function softwareApplicationSchema(product: Product, lang: Lang) {
  const schema: Record<string, unknown> = {
    '@type': 'SoftwareApplication',
    '@id': `${SITE.origin}${product.route}#app`,
    name: product.name,
    description: product.description[lang],
    applicationCategory: product.appCategory,
    operatingSystem: product.operatingSystem,
    url: `${SITE.origin}${product.route}`,
    image: ogImageFor(product.slug),
    author: { '@id': `${SITE.origin}/#person` },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: product.features.map((feature) => feature.title[lang])
  };

  if (product.appStoreUrl) schema.downloadUrl = product.appStoreUrl;
  if (product.githubUrl) schema.codeRepository = product.githubUrl;

  return schema;
}

function breadcrumbSchema(product: Product, lang: Lang) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: translate(lang, 'nav.home'),
        item: `${SITE.origin}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.name,
        item: `${SITE.origin}${product.route}`
      }
    ]
  };
}

/** Returns one `@graph` document; a single JSON-LD block is easier for crawlers to reconcile. */
export function getStructuredData(product: Product | null, lang: Lang) {
  const graph: unknown[] = [personSchema];

  if (product) {
    graph.push(softwareApplicationSchema(product, lang), breadcrumbSchema(product, lang));
  } else {
    graph.push(
      {
        '@type': 'WebSite',
        '@id': `${SITE.origin}/#website`,
        url: `${SITE.origin}/`,
        name: SITE.name,
        description: translate(lang, 'meta.home.description'),
        publisher: { '@id': `${SITE.origin}/#person` },
        inLanguage: ['vi', 'en']
      },
      {
        '@type': 'ItemList',
        name: translate(lang, 'home.products.title'),
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: product.name,
          url: `${SITE.origin}${product.route}`
        }))
      },
      {
        '@type': 'Service',
        '@id': `${SITE.origin}/#software-design-development`,
        name: lang === 'vi' ? 'Thiết kế và phát triển phần mềm Apple cùng website theo nhu cầu' : 'Bespoke Apple software and web design and development',
        description: translate(lang, 'home.services.description'),
        provider: { '@id': `${SITE.origin}/#person` },
        areaServed: 'Worldwide',
        serviceType: ['Apple platform application design and development', 'Web design and development'],
        url: `${SITE.origin}/#services`
      }
    );
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
