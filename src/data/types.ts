import type { ImageMetadata } from 'astro';

export type Lang = 'vi' | 'en';
export const LANGS: readonly Lang[] = ['en', 'vi'];

/** Every user-facing string is written in both languages. */
export type Localized<T = string> = Record<Lang, T>;

export type AppSlug =
  'phtv' | 'vtts' | 'padcodeai' | 'padnotesai' | 'mynasmanager' | 'lunarv' | 'lunarblock';

/**
 * Operating systems an app runs on. Add a value here (and a label in
 * src/data/platforms.ts) when an app ships somewhere new.
 */
export type Platform =
  | 'ios'
  | 'ipados'
  | 'macos'
  | 'visionos'
  | 'watchos'
  | 'tvos'
  | 'android'
  | 'windows'
  | 'linux'
  | 'web';

/** Where an app can be downloaded. Labels and order live in src/data/platforms.ts. */
export type Store = 'appStore' | 'googlePlay' | 'microsoftStore' | 'flathub' | 'snapcraft' | 'web';

export interface AppLinks {
  stores?: Partial<Record<Store, string>>;
  /** Public source code repository. */
  source?: string;
  /** The app's own community page (forum, fan page). */
  community?: string;
}

export interface AppFact {
  label: Localized;
  value: Localized;
}

export interface AppFeature {
  title: Localized;
  description: Localized;
}

export interface AppImage {
  src: ImageMetadata;
  /** A screenshot taken in the other interface language, when one exists. */
  localizedSrc?: Localized<ImageMetadata>;
  alt: Localized;
}

export interface AppInstall {
  /** owner/repo whose latest GitHub release provides the downloads. */
  githubRepo: string;
  homebrew?: string;
  steps: Localized[];
}

export interface AppTutorial {
  youtubeId: string;
  title: Localized;
  description: Localized;
  credit?: Localized;
}

export interface AppFaq {
  question: Localized;
  /** Plain text; `inline code` is rendered as code. */
  answer: Localized;
}

/** One app = one file in src/data/apps. Everything an app page shows comes from here. */
export interface App {
  slug: AppSlug;
  name: string;
  /** Public path, e.g. "/vTTS/". Casing is part of the URL and must not change. */
  route: string;
  /** Language of the canonical page. The other language is served under /<lang>/. */
  defaultLang?: Lang;
  /** Languages of the legal documents in src/content/legal/<slug>. Defaults to defaultLang. */
  legalLangs?: Lang[];
  icon: ImageMetadata;
  heroImage: ImageMetadata;
  gallery: AppImage[];
  accent: string;
  links: AppLinks;
  videoUrl?: string;
  localizedVideoUrls?: Localized;
  videoPosters?: Localized;
  videoPortrait?: boolean;
  videoDescription?: Localized;
  category: Localized;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  platforms: Platform[];
  /** Minimum system versions, e.g. "iOS 17+, macOS 14+". Shown to search engines. */
  requirements?: string;
  /** schema.org SoftwareApplication.applicationCategory */
  appCategory: string;
  facts: AppFact[];
  features: AppFeature[];
  support: Localized;
  install?: AppInstall;
  tutorial?: AppTutorial;
  faq?: AppFaq[];
  /** Which discussion board backs the Discussions tab. */
  community?: 'phtv' | 'app';
}
