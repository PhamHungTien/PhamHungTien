import { useEffect, useState } from 'react';
import { ArrowLeft, Mail, Menu, X } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

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
        <a href={productName ? '#support' : '#services'}>{productName ? t('nav.contact') : t('nav.services')}</a>
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
        <button
          className="mobile-menu-toggle"
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <nav
        className={`mobile-navigation${menuOpen ? ' is-open' : ''}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {productName ? (
          <a href="/" onClick={closeMenu}>
            <ArrowLeft size={18} />
            {t('common.backHome')}
          </a>
        ) : (
          <a href="#products" onClick={closeMenu}>{t('nav.products')}</a>
        )}
        <a href="/PHTV/" onClick={closeMenu}>{t('nav.phtv')}</a>
        <a href={productName ? '#support' : '#services'} onClick={closeMenu}>
          {productName ? t('nav.contact') : t('nav.services')}
        </a>
      </nav>
    </header>
  );
}
