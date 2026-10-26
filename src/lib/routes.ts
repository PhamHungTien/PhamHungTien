import type { App, Lang } from '../data/types';
import type { Locale } from '../i18n/locales';

/** One canonical language per destination: English, except Vietnamese-first PHTV. */
export const SITE_DEFAULT_LANG: Lang = 'en';
export const homePath = (_lang?: Locale) => '/';
export const appPath = (app: App, _lang?: Locale) => app.route;
export type LegalKind = 'privacy' | 'terms';
export const legalPath = (app: App, kind: LegalKind, _lang?: Lang) => `${app.route}${kind}.html`;
