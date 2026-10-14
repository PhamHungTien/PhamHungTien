import type { App, Lang } from '../data/types';
import { defaultLangOf, legalLangsOf } from '../data/apps';
import { otherLang } from './i18n';

/**
 * URL scheme. Each page has a default language served at its historical path; the
 * other language lives under a /<lang>/ prefix:
 *
 *   /            English home       /vi/            Vietnamese home
 *   /vTTS/       English app page   /vi/vTTS/       Vietnamese app page
 *   /PHTV/       Vietnamese (PHTV)  /en/PHTV/       English
 */
export const SITE_DEFAULT_LANG: Lang = 'en';

const prefix = (lang: Lang, defaultLang: Lang) => (lang === defaultLang ? '' : `/${lang}`);

export const homePath = (lang: Lang) => `${prefix(lang, SITE_DEFAULT_LANG)}/`;

export const appPath = (app: App, lang: Lang) => `${prefix(lang, defaultLangOf(app))}${app.route}`;

export type LegalKind = 'privacy' | 'terms';
/** Falls back to the app's default language when a document is not translated. */
export const legalPath = (app: App, kind: LegalKind, lang: Lang) => {
  const docLang = legalLangsOf(app).includes(lang) ? lang : defaultLangOf(app);
  return `${prefix(docLang, defaultLangOf(app))}${app.route}${kind}.html`;
};

export interface Alternate {
  lang: Lang;
  href: string;
}

/** Both language versions of a page, for hreflang and the language switch. */
export function alternatesFor(pathFor: (lang: Lang) => string, langs: Lang[]): Alternate[] {
  return langs.map((lang) => ({ lang, href: pathFor(lang) }));
}

export { otherLang };
