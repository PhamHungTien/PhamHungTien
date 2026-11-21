import { defaultLangOf, legalLangsOf } from '../data/apps';
import { LANGS, type App } from '../data/types';
import type { Locale } from '../i18n/locales';

export interface AlternateRoute {
  lang: Locale | 'x-default';
  path: string;
}

export function withDefaultAlternate(routes: AlternateRoute[]): AlternateRoute[] {
  if (routes.length < 2) return [];
  if (routes.some(({ lang }) => lang === 'x-default')) return routes;
  return [...routes, { lang: 'x-default', path: routes[0].path }];
}

export const homePath = (lang: Locale = 'en') => (lang === 'vi' ? '/vi/' : '/');
export const homeAlternates = LANGS.map((lang) => ({ lang, path: homePath(lang) }));

export function appPath(app: App, lang: Locale = defaultLangOf(app)) {
  if (lang === 'zh' && app.slug === 'lunarv') return `/zh${app.route}`;
  if ((lang === 'en' || lang === 'vi') && lang !== defaultLangOf(app))
    return `/${lang}${app.route}`;
  return app.route;
}

function appLanguages(app: App): Locale[] {
  return [
    defaultLangOf(app),
    ...LANGS.filter((lang) => lang !== defaultLangOf(app)),
    ...(app.slug === 'lunarv' ? ['zh' as const] : []),
  ];
}

export function appAlternates(app: App): AlternateRoute[] {
  return appLanguages(app).map((lang) => ({ lang, path: appPath(app, lang) }));
}

export type LegalKind = 'privacy' | 'terms';

export function legalPath(app: App, kind: LegalKind, lang: Locale = defaultLangOf(app)) {
  const translated =
    (lang === 'zh' && app.slug === 'lunarv') ||
    ((lang === 'en' || lang === 'vi') && legalLangsOf(app).includes(lang));
  return `${appPath(app, translated ? lang : defaultLangOf(app))}${kind}.html`;
}

export function legalAlternates(app: App, kind: LegalKind): AlternateRoute[] {
  const available = legalLangsOf(app);
  return appLanguages(app)
    .filter(
      (lang) => lang === 'zh' || ((lang === 'en' || lang === 'vi') && available.includes(lang)),
    )
    .map((lang) => ({ lang, path: legalPath(app, kind, lang) }));
}
