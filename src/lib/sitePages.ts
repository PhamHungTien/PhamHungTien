import type { Locale } from '../i18n/locales';
import { homePath } from './routes';

/** Website privacy policy: /privacy/ (English); the old Vietnamese URL redirects here. */
export const sitePrivacyPath = (lang: Locale) => `${homePath(lang === 'vi' ? 'vi' : 'en')}privacy/`;
