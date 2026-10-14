import type { Lang, Localized } from '../data/types';
import { ui, type UiKey } from '../i18n/ui';

export const otherLang = (lang: Lang): Lang => (lang === 'vi' ? 'en' : 'vi');

/** Translate a UI string. Every key exists in both languages (enforced by the type). */
export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}

/** Pick one language out of a Localized value. */
export const l = <T>(value: Localized<T>, lang: Lang): T => value[lang];

export const htmlLang = (lang: Lang) => (lang === 'vi' ? 'vi' : 'en');
export const ogLocale = (lang: Lang) => (lang === 'vi' ? 'vi_VN' : 'en_US');
