import type { Localized, Platform, Store } from './types';

/** Display names, in the order platforms are listed and filtered on the site. */
export const PLATFORM_LABELS: Record<Platform, string> = {
  ios: 'iOS',
  ipados: 'iPadOS',
  macos: 'macOS',
  visionos: 'visionOS',
  watchos: 'watchOS',
  tvos: 'tvOS',
  android: 'Android',
  windows: 'Windows',
  linux: 'Linux',
  web: 'Web',
};

export const PLATFORM_ORDER = Object.keys(PLATFORM_LABELS) as Platform[];

/** Every platform by name, for structured data (schema.org operatingSystem). */
export const platformList = (platforms: Platform[]) =>
  PLATFORM_ORDER.filter((p) => platforms.includes(p)).map((p) => PLATFORM_LABELS[p]);

/**
 * What visitors see and filter by. iPhone and iPad builds are one product, so iOS and
 * iPadOS share a label; each other platform stands alone. Order is display order.
 */
export const PLATFORM_GROUPS: { id: string; label: string; platforms: Platform[] }[] = [
  { id: 'ios', label: 'iOS & iPadOS', platforms: ['ios', 'ipados'] },
  { id: 'macos', label: 'macOS', platforms: ['macos'] },
  { id: 'android', label: 'Android', platforms: ['android'] },
  { id: 'windows', label: 'Windows', platforms: ['windows'] },
  { id: 'linux', label: 'Linux', platforms: ['linux'] },
  { id: 'web', label: 'Web', platforms: ['web'] },
  { id: 'visionos', label: 'visionOS', platforms: ['visionos'] },
  { id: 'watchos', label: 'watchOS', platforms: ['watchos'] },
  { id: 'tvos', label: 'tvOS', platforms: ['tvos'] },
];

export const platformGroupsOf = (platforms: Platform[]) =>
  PLATFORM_GROUPS.filter((group) => group.platforms.some((p) => platforms.includes(p)));

/** Download buttons, in priority order: the first store an app is in becomes its main button. */
export const STORES: Record<Store, { name: string; cta: Localized }> = {
  appStore: {
    name: 'App Store',
    cta: { en: 'Download on the App Store', vi: 'Tải trên App Store' },
  },
  googlePlay: {
    name: 'Google Play',
    cta: { en: 'Get it on Google Play', vi: 'Tải trên Google Play' },
  },
  microsoftStore: {
    name: 'Microsoft Store',
    cta: { en: 'Get it from Microsoft', vi: 'Tải từ Microsoft Store' },
  },
  flathub: { name: 'Flathub', cta: { en: 'Get it on Flathub', vi: 'Tải trên Flathub' } },
  snapcraft: {
    name: 'Snap Store',
    cta: { en: 'Get it from the Snap Store', vi: 'Tải trên Snap Store' },
  },
  web: { name: 'Web', cta: { en: 'Open the web app', vi: 'Mở bản web' } },
};

export const STORE_ORDER = Object.keys(STORES) as Store[];

export const storesOf = (stores: Partial<Record<Store, string>> = {}) =>
  STORE_ORDER.filter((store) => stores[store]).map((store) => ({
    store,
    url: stores[store]!,
    ...STORES[store],
  }));
