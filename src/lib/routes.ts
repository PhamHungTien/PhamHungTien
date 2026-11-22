import { defaultLangOf } from '../data/apps';
import type { App } from '../data/types';
import { LOCALES, type Locale } from '../i18n/locales';

export interface AlternateRoute {
  lang: Locale | 'x-default';
  path: string;
}

export function withDefaultAlternate(routes: AlternateRoute[]): AlternateRoute[] {
  if (routes.length < 2) return [];
  if (routes.some(({ lang }) => lang === 'x-default')) return routes;
  return [...routes, { lang: 'x-default', path: routes[0].path }];
}

export const homePath = (lang: Locale = 'en') => (lang === 'en' ? '/' : `/${lang}/`);
export const homeAlternates = LOCALES.map((lang) => ({ lang, path: homePath(lang) }));

export function appPath(app: App, lang: Locale = defaultLangOf(app)) {
  return lang === defaultLangOf(app) ? app.route : `/${lang}${app.route}`;
}

function appLanguages(app: App): Locale[] {
  const original = defaultLangOf(app);
  return [original, ...LOCALES.filter((lang) => lang !== original)];
}

export function appAlternates(app: App): AlternateRoute[] {
  return appLanguages(app).map((lang) => ({ lang, path: appPath(app, lang) }));
}

export type LegalKind = 'privacy' | 'terms';

export function legalPath(app: App, kind: LegalKind, lang: Locale = defaultLangOf(app)) {
  return `${appPath(app, lang)}${kind}.html`;
}

export function legalAlternates(app: App, kind: LegalKind): AlternateRoute[] {
  return appLanguages(app).map((lang) => ({ lang, path: legalPath(app, kind, lang) }));
}
