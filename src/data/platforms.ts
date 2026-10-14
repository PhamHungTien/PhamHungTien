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

export const platformList = (platforms: Platform[]) =>
  PLATFORM_ORDER.filter((p) => platforms.includes(p)).map((p) => PLATFORM_LABELS[p]);

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
