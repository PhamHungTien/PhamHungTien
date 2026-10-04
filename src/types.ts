export type Lang = 'vi' | 'en';

export type ProductSlug =
  | 'phtv'
  | 'lunarv'
  | 'padcodeai'
  | 'padnotesai'
  | 'mynasmanager'
  | 'lunarblock'
  | 'vtts';

export type Localized<T = string> = Record<Lang, T>;

export interface ProductFact {
  label: Localized;
  value: Localized;
}

export interface ProductFeature {
  title: Localized;
  description: Localized;
}

export interface ProductGalleryImage {
  src: string;
  localizedSrc?: Localized;
  alt: Localized;
}

export interface Product {
  slug: ProductSlug;
  name: string;
  route: string;
  icon: string;
  heroImage: string;
  localizedHeroImages?: Localized;
  gallery: ProductGalleryImage[];
  accent: string;
  appStoreUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  localizedVideoUrls?: Localized;
  videoPosters?: Localized;
  videoPortrait?: boolean;
  communityUrl?: string;
  videoDescription?: Localized;
  isStandalone?: boolean;
  category: Localized;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  ctaLabel: Localized;
  secondaryCtaLabel?: Localized;
  platforms: Localized;
  /** schema.org SoftwareApplication.operatingSystem */
  operatingSystem: string;
  /** schema.org SoftwareApplication.applicationCategory */
  appCategory: string;
  facts: ProductFact[];
  features: ProductFeature[];
  support: Localized;
}
