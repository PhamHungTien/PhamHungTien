import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALES, type Locale } from '../i18n/locales';
import type { AlternateRoute } from './routes';

export type Guide = CollectionEntry<'guides'>;

export const GUIDES_PATH = '/guides/';
const guideIndexes: Record<Locale, string> = {
  en: GUIDES_PATH,
  vi: '/huong-dan/',
  ja: '/ja/guides/',
  es: '/es/guides/',
  zh: '/zh/guides/',
};
export const guidesPath = (lang: Locale = 'en') => guideIndexes[lang];

// Preserve the Vietnamese canonical URLs these articles had before translation.
const originalVietnameseSlugs = new Set([
  'bang-go-telex-day-du',
  'bang-ma-tieng-viet-unicode-tcvn3-vni',
  'cach-go-vni-telex-hay-vni',
  'go-tat-tren-mac-voi-phtv',
  'go-tieng-viet-tren-mac-voi-phtv',
  'sua-loi-go-tieng-viet-tren-mac',
]);

export function guidePath(slug: string, lang: Locale = 'en'): string {
  let base = guidesPath(lang);
  if (originalVietnameseSlugs.has(slug)) {
    if (lang === 'vi') base = GUIDES_PATH;
    if (lang === 'en') base = '/en/guides/';
  }
  return `${base}${slug}/`;
}

export const guideLang = (guide: Guide): Locale => guide.data.lang;
export const guideSlug = (guide: Guide) => guide.id.slice(0, -(guideLang(guide).length + 1));
export const guideUrl = (guide: Guide) => guidePath(guideSlug(guide), guideLang(guide));
export const guideOgKey = (guide: Guide) => `guide-${guide.id}`;

export const guideIndexAlternates: AlternateRoute[] = LOCALES.map((lang) => ({
  lang,
  path: guidesPath(lang),
}));

export function guideAlternates(slug: string, variants: Guide[]): AlternateRoute[] {
  const original: Locale = originalVietnameseSlugs.has(slug) ? 'vi' : 'en';
  const languages = new Set(variants.filter((guide) => guideSlug(guide) === slug).map(guideLang));
  return [original, ...LOCALES.filter((lang) => lang !== original)]
    .filter((lang) => languages.has(lang))
    .map((lang) => ({ lang, path: guidePath(slug, lang) }));
}

/** Newest first; on the same day, guides with a video lead. */
export async function getGuides(lang?: Locale): Promise<Guide[]> {
  const guides = await getCollection('guides', (guide) => !lang || guide.data.lang === lang);
  return guides.sort(
    (a, b) =>
      b.data.published.localeCompare(a.data.published) ||
      Number(Boolean(b.data.youtubeId)) - Number(Boolean(a.data.youtubeId)) ||
      a.id.localeCompare(b.id),
  );
}

export function readingMinutes(guide: Guide): number {
  const text = (guide.body ?? '').replace(/```[\s\S]*?```/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = ['ja', 'zh'].includes(guide.data.lang) ? text.length / 500 : words / 200;
  return Math.max(2, Math.round(minutes));
}

export function formatDate(iso: string, lang: Locale): string {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : lang, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
