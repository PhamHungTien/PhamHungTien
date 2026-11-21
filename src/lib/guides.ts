import { getCollection, type CollectionEntry } from 'astro:content';
import { LANGS, type Lang } from '../data/types';
import type { AlternateRoute } from './routes';

export type Guide = CollectionEntry<'guides'>;

export const GUIDES_PATH = '/guides/';
const VI_GUIDES_PATH = '/huong-dan/';
export const guidesPath = (lang: Lang = 'en') => (lang === 'vi' ? VI_GUIDES_PATH : GUIDES_PATH);

// These articles were first indexed in Vietnamese at /guides/<slug>/.
const originalVietnameseSlugs = new Set([
  'bang-go-telex-day-du',
  'bang-ma-tieng-viet-unicode-tcvn3-vni',
  'cach-go-vni-telex-hay-vni',
  'go-tat-tren-mac-voi-phtv',
  'go-tieng-viet-tren-mac-voi-phtv',
  'sua-loi-go-tieng-viet-tren-mac',
]);

export function guidePath(slug: string, lang: Lang = 'en'): string {
  const base = originalVietnameseSlugs.has(slug)
    ? lang === 'vi'
      ? GUIDES_PATH
      : '/en/guides/'
    : guidesPath(lang);
  return `${base}${slug}/`;
}

export const guideLang = (guide: Guide): Lang => guide.data.lang;
export const guideSlug = (guide: Guide) => guide.id.slice(0, -(guideLang(guide).length + 1));
export const guideUrl = (guide: Guide) => guidePath(guideSlug(guide), guideLang(guide));
export const guideOgKey = (guide: Guide) => `guide-${guide.id}`;

export function guideAlternates(slug?: string): AlternateRoute[] {
  const versions = LANGS.map((lang) => ({
    lang,
    path: slug ? guidePath(slug, lang) : guidesPath(lang),
  }));
  const defaultLang = slug && originalVietnameseSlugs.has(slug) ? 'vi' : 'en';
  return [
    ...versions,
    { lang: 'x-default', path: slug ? guidePath(slug, defaultLang) : guidesPath(defaultLang) },
  ];
}

/** Newest first; on the same day, guides with a video lead. */
export async function getGuides(lang: Lang = 'en'): Promise<Guide[]> {
  const guides = await getCollection('guides', (guide) => guide.data.lang === lang);
  return guides.sort(
    (a, b) =>
      b.data.published.localeCompare(a.data.published) ||
      Number(Boolean(b.data.youtubeId)) - Number(Boolean(a.data.youtubeId)) ||
      a.id.localeCompare(b.id),
  );
}

export function readingMinutes(guide: Guide): number {
  const words = (guide.body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

export function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'vi' ? 'vi-VN' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
