/** Languages with full website content. Keep English first as the site default. */
export const LOCALES = ['en', 'vi', 'ja', 'es', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];
export const PREFIXED_LOCALES = ['ja', 'es', 'zh'] as const satisfies readonly Locale[];
export const LANGUAGE_NAMES: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  ja: '日本語',
  es: 'Español',
  zh: '简体中文',
};
