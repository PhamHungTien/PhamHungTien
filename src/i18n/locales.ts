/** Website navigation and home-page locales. App/legal translations remain independently scoped. */
export const LOCALES = ['en', 'vi', 'fr', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];
export const LANGUAGE_NAMES: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  fr: 'Français',
  ja: '日本語',
};
