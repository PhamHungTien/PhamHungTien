export type Lang = 'vi' | 'en';

export type ProductSlug =
  | 'phtv'
  | 'lunarv'
  | 'padcodeai'
  | 'padnotesai'
  | 'mynasmanager'
  | 'lunarblock';

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
  alt: Localized;
}

export interface Product {
  slug: ProductSlug;
  name: string;
  route: string;
  icon: string;
  heroImage: string;
  gallery: ProductGalleryImage[];
  accent: string;
  appStoreUrl?: string;
  githubUrl?: string;
  isStandalone?: boolean;
  category: Localized;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  ctaLabel: Localized;
  secondaryCtaLabel?: Localized;
  platforms: Localized;
  facts: ProductFact[];
  features: ProductFeature[];
  support: Localized;
}
