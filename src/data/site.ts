/** Site identity, shared by every page and by the build scripts. */
export const SITE = {
  origin: 'https://phamhungtien.com',
  name: 'Phạm Hùng Tiến',
  /** ASCII spelling, kept for search and for people who type without diacritics. */
  asciiName: 'Pham Hung Tien',
  email: 'contact@phamhungtien.com',
  github: 'https://github.com/PhamHungTien',
  youtube: 'https://www.youtube.com/@phamhungtien14',
  repository: 'https://github.com/PhamHungTien/PhamHungTien',
  paypal: 'https://www.paypal.com/paypalme/phamhungtien1404',
  /** Google AdSense publisher ID (also in public/ads.txt). */
  adsense: 'ca-pub-1148793312095742',
} as const;
