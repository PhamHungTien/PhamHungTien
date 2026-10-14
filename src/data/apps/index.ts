import type { App, AppSlug, Lang } from '../types';
import phtv from './phtv';
import vtts from './vtts';
import padcodeai from './padcodeai';
import padnotesai from './padnotesai';
import mynasmanager from './mynasmanager';
import lunarv from './lunarv';
import lunarblock from './lunarblock';

/** Display order everywhere on the site. To add an app, create its file and list it here. */
export const apps: App[] = [phtv, vtts, padcodeai, padnotesai, mynasmanager, lunarv, lunarblock];

export const appBySlug = new Map<AppSlug, App>(apps.map((app) => [app.slug, app]));

/** "/vTTS/" -> "vTTS": the path segment used by the dynamic routes. */
export const appSegment = (app: App) => app.route.replaceAll('/', '');

export const defaultLangOf = (app: App): Lang => app.defaultLang ?? 'en';

/** Languages the privacy policy and terms are written in. */
export const legalLangsOf = (app: App): Lang[] => app.legalLangs ?? [defaultLangOf(app)];
