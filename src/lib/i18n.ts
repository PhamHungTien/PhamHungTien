import { ui, type UiKey } from '../i18n/ui';
import type { Locale } from '../i18n/locales';

export const t = (lang: Locale, key: UiKey): string => ui[lang][key];

export const htmlLang = (lang: Locale) => lang;
export const ogLocale = (lang: Locale) =>
  ({ en: 'en_US', vi: 'vi_VN', ja: 'ja_JP', es: 'es_ES', zh: 'zh_CN' })[lang];
