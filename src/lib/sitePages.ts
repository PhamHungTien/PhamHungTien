import type { Lang } from '../data/types';
import { homePath } from './routes';

/** Website privacy policy: /privacy/ (English) and /vi/privacy/ (Vietnamese). */
export const sitePrivacyPath = (lang: Lang) => `${homePath(lang)}privacy/`;
