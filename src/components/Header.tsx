import { useEffect, useState } from 'react';
import { ArrowLeft, Mail, Menu, Moon, Sun, X } from 'lucide-react';
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme;
    setTheme(currentTheme === 'dark' ? 'dark' : 'light');

    const syncTheme = (event: StorageEvent) => {
      if (event.key !== 'theme' || (event.newValue !== 'light' && event.newValue !== 'dark')) return;
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

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
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
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute(
      'content',
      nextTheme === 'dark' ? '#0b0c0f' : '#ffffff',
    );
    setTheme(nextTheme);
  };

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
        <button
          className="icon-button theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark'
            ? (lang === 'vi' ? 'Bật giao diện sáng' : 'Use light mode')
            : (lang === 'vi' ? 'Bật giao diện tối' : 'Use dark mode')}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
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
