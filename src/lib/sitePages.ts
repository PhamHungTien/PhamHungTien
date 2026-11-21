import type { Locale } from '../i18n/locales';
import { homePath } from './routes';

/** Website privacy policy in the requested site language. */
export const sitePrivacyPath = (lang: Locale) => `${homePath(lang === 'vi' ? 'vi' : 'en')}privacy/`;
