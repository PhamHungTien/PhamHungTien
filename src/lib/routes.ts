import type { App, Lang } from '../data/types';
import type { Locale } from '../i18n/locales';

/** One canonical language per destination: English, except Vietnamese-first PHTV and LunarV. */
export const SITE_DEFAULT_LANG: Lang = 'en';
export const homePath = (_lang?: Locale) => '/';
export const appPath = (app: App, lang?: Locale) =>
  lang === 'en' && (app.slug === 'phtv' || app.slug === 'lunarv') ? `/en${app.route}` : app.route;
export type LegalKind = 'privacy' | 'terms';
export const legalPath = (app: App, kind: LegalKind, lang?: Lang) =>
  `${appPath(app, lang)}${kind}.html`;
