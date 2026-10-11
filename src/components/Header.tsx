import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Home, Mail, Menu, X } from 'lucide-react';
import type { Lang } from '../types';
import { GlassOptics } from './GlassOptics';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  lang: Lang;
  t: (key: string) => string;
  productName?: string;
}

export function Header({ lang, t, productName }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const desktop = matchMedia('(min-width: 1081px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('pointerdown', closeOutside);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('pointerdown', closeOutside);
      desktop.removeEventListener('change', closeOnDesktop);
      if (headerRef.current?.contains(document.activeElement))
        toggleRef.current?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className={`site-header${productName ? ' site-header--product' : ''}`}>
      <GlassOptics />
      <a className="skip-link" href="#main-content">
        {lang === 'vi' ? 'Đến nội dung' : 'Skip to content'}
      </a>
      <a className="brand-link" href="/" aria-label={lang === 'vi' ? 'Trang chủ' : 'Home'}>
        <Home size={18} aria-hidden="true" />
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
        {!productName && <a href="#contact">{t('nav.contact')}</a>}
        {productName && <a href="#features">{t('product.features')}</a>}
        {productName && <a href="#gallery">{t('product.gallery')}</a>}
        {productName && <a href="#community">{lang === 'vi' ? 'Thảo luận' : 'Discussions'}</a>}
        {productName && <a href="#contact">{t('nav.contact')}</a>}
      </nav>

      <div className="header-actions">
        <ThemeToggle lang={lang} />
        {productName ? (
          <a
            className="icon-button"
            href="mailto:contact@phamhungtien.com"
            aria-label={t('nav.support')}
          >
            <Mail size={17} />
          </a>
        ) : null}
        <button
          ref={toggleRef}
          className="mobile-menu-toggle"
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            menuOpen
              ? lang === 'vi'
                ? 'Đóng menu'
                : 'Close menu'
              : lang === 'vi'
                ? 'Mở menu'
                : 'Open menu'
          }
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <nav
        className={`mobile-navigation${menuOpen ? ' is-open' : ''}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        inert={!menuOpen}
      >
        {productName && (
          <a href="/" onClick={closeMenu}>
            <Home size={18} aria-hidden="true" />
            {t('common.backHome')}
          </a>
        )}
        {productName ? (
          <>
            <a href="#features" onClick={closeMenu}>
              {t('product.features')}
            </a>
            <a href="#gallery" onClick={closeMenu}>
              {t('product.gallery')}
            </a>
            <a href="#community" onClick={closeMenu}>
              {lang === 'vi' ? 'Thảo luận' : 'Discussions'}
            </a>
          </>
        ) : (
          <a href="#products" onClick={closeMenu}>
            {t('nav.products')}
          </a>
        )}
        <a href="#contact" onClick={closeMenu}>
          {t('nav.contact')}
        </a>
      </nav>
    </header>
  );
}
