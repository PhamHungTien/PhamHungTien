import type { ImageMetadata } from 'astro';
import type { AppSlug } from '../data/types';

/**
 * App Store media for every app, read from src/assets/apps/<slug>/store/<lang>/.
 * The folders are filled by `npm run sync:media` straight from App Store Connect, so the
 * website always shows the same artwork, screenshots and previews as the store listing.
 *
 *   header.webp      product page header art (2.33:1)
 *   search.webp      search results art (3:2), used for app cards
 *   <device>-NN.webp screenshots, device = iphone | ipad | mac | vision
 *   preview-<device>.mp4 / .webp   App Preview video and its poster frame
 */
import type { Locale } from '../i18n/locales';
export type Device = 'iphone' | 'ipad' | 'mac' | 'vision';

export interface DeviceMedia {
  device: Device;
  shots: ImageMetadata[];
  preview?: { src: string; poster?: ImageMetadata };
}

export interface StoreMedia {
  header?: ImageMetadata;
  search?: ImageMetadata;
  devices: DeviceMedia[];
}

const images = import.meta.glob<{ default: ImageMetadata }>('../assets/apps/*/store/*/*.webp', {
  eager: true,
});
const videos = import.meta.glob<string>('../assets/apps/*/store/*/*.mp4', {
  eager: true,
  query: '?url',
  import: 'default',
});

const DEVICE_ORDER: Device[] = ['iphone', 'ipad', 'mac', 'vision'];

function collect(slug: AppSlug, lang: Locale): StoreMedia | undefined {
  const prefix = `../assets/apps/${slug}/store/${lang}/`;
  const files = Object.keys(images).filter((path) => path.startsWith(prefix));
  if (!files.length) return undefined;
  const image = (name: string) => images[`${prefix}${name}.webp`]?.default;
  const devices = DEVICE_ORDER.map((device): DeviceMedia => {
    const shots = files
      .filter((path) => new RegExp(`/${device}-\\d+\\.webp$`).test(path))
      .sort()
      .map((path) => images[path].default);
    const src = videos[`${prefix}preview-${device}.mp4`];
    return {
      device,
      shots,
      preview: src ? { src, poster: image(`preview-${device}`) } : undefined,
    };
  }).filter((entry) => entry.shots.length || entry.preview);
  return { header: image('header'), search: image('search'), devices };
}

/** Media in the page language, falling back to English (the store's primary listing). */
export function storeMedia(slug: AppSlug, lang: Locale): StoreMedia {
  return collect(slug, lang) ?? collect(slug, 'en') ?? { devices: [] };
}

export const DEVICE_LABEL: Record<Device, string> = {
  iphone: 'iPhone',
  ipad: 'iPad',
  mac: 'Mac',
  vision: 'Apple Vision Pro',
};
