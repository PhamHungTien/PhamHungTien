import type { Locale } from '../i18n/locales';
import { homePath } from './routes';

/** Website privacy policy: /privacy/ (English) and /vi/privacy/ (Vietnamese). */
export const sitePrivacyPath = (lang: Locale) => `${homePath(lang === 'vi' ? 'vi' : 'en')}privacy/`;
