import type { Lang } from './types';

export const dictionary: Record<Lang, Record<string, string>> = {
  vi: {
    'meta.home.title': 'Pham Hung Tien | Ứng dụng',
    'meta.home.description': 'Danh mục ứng dụng do Pham Hung Tien thiết kế và phát triển cho iPhone, iPad, Mac và Apple Vision Pro.',
    'nav.products': 'Sản phẩm',
    'nav.phtv': 'PHTV',
    'nav.contact': 'Liên hệ',
    'nav.home': 'Trang chủ',
    'nav.support': 'Hỗ trợ',
    'home.products.title': 'Sản phẩm',
    'home.contact.title': 'Liên hệ',
    'home.contact.username': 'Tên người dùng',
    'home.footer.note': 'Ứng dụng bởi Pham Hung Tien.',
    'product.open': 'Tải ứng dụng',
    'product.features': 'Tính năng nổi bật',
    'product.gallery': 'Giao diện',
    'product.support': 'Hỗ trợ',
    'product.supportCta': 'Gửi email hỗ trợ',
    'product.privacy': 'Quyền riêng tư',
    'product.terms': 'Điều khoản',
    'common.platforms': 'Nền tảng',
    'common.github': 'GitHub',
    'common.appStore': 'App Store',
    'common.backHome': 'Về trang chủ',
    'common.allProducts': 'Tất cả sản phẩm',
    'common.copyright': '© 2026 Pham Hung Tien. Bảo lưu mọi quyền.'
  },
  en: {
    'meta.home.title': 'Pham Hung Tien | Apps',
    'meta.home.description': 'A focused collection of apps designed and developed by Pham Hung Tien for iPhone, iPad, Mac, and Apple Vision Pro.',
    'nav.products': 'Products',
    'nav.phtv': 'PHTV',
    'nav.contact': 'Contact',
    'nav.home': 'Home',
    'nav.support': 'Support',
    'home.products.title': 'Products',
    'home.contact.title': 'Connect',
    'home.contact.username': 'Username',
    'home.footer.note': 'Apps by Pham Hung Tien.',
    'product.open': 'Get the app',
    'product.features': 'Highlights',
    'product.gallery': 'Interface',
    'product.support': 'Support',
    'product.supportCta': 'Email support',
    'product.privacy': 'Privacy',
    'product.terms': 'Terms',
    'common.platforms': 'Platforms',
    'common.github': 'GitHub',
    'common.appStore': 'App Store',
    'common.backHome': 'Back home',
    'common.allProducts': 'All products',
    'common.copyright': '© 2026 Pham Hung Tien. All rights reserved.'
  }
};

export function translate(lang: Lang, key: string) {
  return dictionary[lang][key] ?? dictionary.en[key] ?? key;
}
