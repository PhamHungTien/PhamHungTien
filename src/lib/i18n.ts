import type { Lang, Localized } from '../data/types';
import { ui, type UiKey } from '../i18n/ui';
import type { Locale } from '../i18n/locales';
import { homeTranslations } from '../i18n/home-translations';

export const otherLang = (lang: Lang): Lang => (lang === 'vi' ? 'en' : 'vi');

/** Translate a UI string. Every key exists in both languages (enforced by the type). */
export function t(lang: Locale, key: UiKey): string {
  if (lang === 'en' || lang === 'vi' || lang === 'zh') return ui[lang][key];
  return (homeTranslations[lang] as Partial<Record<UiKey, string>>)[key] ?? ui.en[key];
}

/** Pick one language out of a Localized value. */
export const l = <T>(value: Localized<T>, lang: Lang): T => value[lang];

export const htmlLang = (lang: Locale) => lang;
export const ogLocale = (lang: Locale) =>
  ({ en: 'en_US', vi: 'vi_VN', fr: 'fr_FR', ja: 'ja_JP', zh: 'zh_CN' })[lang];
