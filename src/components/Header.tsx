import { ArrowLeft, Mail } from 'lucide-react';
import type { Lang } from '../types';
import { products } from '../data/products';
import { LanguageSwitch } from './LanguageSwitch';

interface HeaderProps {
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
  t: (key: string) => string;
  productName?: string;
}

export function Header({ lang, onLanguageChange, t, productName }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand-link" href="/" aria-label="Pham Hung Tien">
        <span className="brand-mark">P</span>
        <span>Pham Hung Tien</span>
      </a>

      <nav className="site-nav" aria-label="Main navigation">
        {productName ? (
          <a href="/" className="nav-back">
            <ArrowLeft size={17} />
            {t('common.backHome')}
          </a>
        ) : (
          <a href="#products">{t('nav.products')}</a>
        )}
        <a href="/PHTV/">{t('nav.phtv')}</a>
        <a href={productName ? '#support' : '#contact'}>{t('nav.contact')}</a>
      </nav>

      <div className="header-actions">
        <LanguageSwitch lang={lang} onChange={onLanguageChange} />
        {productName ? (
          <a className="icon-button" href="mailto:phamhungtien.contact@gmail.com" aria-label={t('nav.support')}>
            <Mail size={17} />
          </a>
        ) : (
          <a className="header-product-link" href={products[0].route}>
            PHTV
          </a>
        )}
      </div>
    </header>
  );
}
