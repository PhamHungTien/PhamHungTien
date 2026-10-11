import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Home, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import type { Lang } from '../types';
import { GlassOptics } from './GlassOptics';

interface HeaderProps {
  lang: Lang;
  t: (key: string) => string;
  productName?: string;
}

export function Header({ lang, t, productName }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme;
    setTheme(currentTheme === 'dark' ? 'dark' : 'light');

    const syncTheme = (event: StorageEvent) => {
      if (event.key !== 'theme' || (event.newValue !== 'light' && event.newValue !== 'dark'))
        return;
      document.documentElement.dataset.theme = event.newValue;
      setTheme(event.newValue);
    };

    window.addEventListener('storage', syncTheme);
    return () => window.removeEventListener('storage', syncTheme);
  }, []);

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

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // Theme switching still works when storage is unavailable.
    }
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute(
        'content',
        getComputedStyle(document.documentElement).getPropertyValue('--glass-page').trim(),
      );
    setTheme(nextTheme);
  };

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
        <button
          className="icon-button theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === 'dark'
              ? lang === 'vi'
                ? 'Bật giao diện sáng'
                : 'Use light mode'
              : lang === 'vi'
                ? 'Bật giao diện tối'
                : 'Use dark mode'
          }
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
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
