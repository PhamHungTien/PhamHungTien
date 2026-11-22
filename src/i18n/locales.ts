/** Website navigation and home-page locales. App/legal translations remain independently scoped. */
export const LOCALES = ['en', 'vi', 'fr', 'ja', 'es'] as const;
export type Locale = (typeof LOCALES)[number] | 'zh';
export const GUIDE_LANGS = ['en', 'vi', 'ja', 'es'] as const;
export type GuideLang = (typeof GUIDE_LANGS)[number];
export const isGuideLang = (lang: Locale): lang is GuideLang =>
  GUIDE_LANGS.some((available) => available === lang);
export const LANGUAGE_NAMES: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  fr: 'Français',
  ja: '日本語',
  es: 'Español',
  zh: '简体中文',
};
