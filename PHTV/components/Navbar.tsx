import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';
import { useI18n } from '../i18n';
import './Navbar.css';

const iconImg = '/PHTV/phtv-icon.webp';

interface NavbarProps {
  activeTab?: 'home' | 'community';
  onTabChange?: (tab: 'home' | 'community') => void;
  downloadUrl: string;
  releaseUrl: string;
  arm64DownloadUrl: string | null;
  intelDownloadUrl: string | null;
  hasSplitDownloads: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'home',
  onTabChange,
  downloadUrl,
  releaseUrl,
  arm64DownloadUrl,
  intelDownloadUrl,
  hasSplitDownloads
}) => {
  const { lang, changeLanguage, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDownloadOpen, setDesktopDownloadOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  );
  const desktopDownloadRef = useRef<HTMLDivElement | null>(null);
  const mobileNavigationRef = useRef<HTMLElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);
  const downloadLabel = hasSplitDownloads ? t('nav.download_label') : t('nav.download_now');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Theme switching still works when storage is unavailable.
    }

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", theme === 'dark' ? "#0b0c0f" : "#ffffff");
    }
  }, [theme]);

  // Sync theme across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    mobileNavigationRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
      }
      if (event.key === 'Tab') {
        const controls = [mobileToggleRef.current, ...Array.from(mobileNavigationRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? [])].filter((element): element is HTMLButtonElement | HTMLAnchorElement => element !== null);
        const index = controls.indexOf(document.activeElement as HTMLAnchorElement);
        if (event.shiftKey && index <= 0) {
          event.preventDefault();
          controls.at(-1)?.focus();
        } else if (!event.shiftKey && (index === controls.length - 1 || index === -1)) {
          event.preventDefault();
          controls[0]?.focus();
        }
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) setMobileMenuOpen(false); };
    window.addEventListener('keydown', handleKeys);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      window.removeEventListener('keydown', handleKeys);
      desktop.removeEventListener('change', closeOnDesktop);
      document.body.style.overflow = previousOverflow;
      mobileToggleRef.current?.focus({ preventScroll: true });
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!desktopDownloadOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!desktopDownloadRef.current?.contains(event.target as Node)) {
        setDesktopDownloadOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDesktopDownloadOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [desktopDownloadOpen]);

  const navLinks = [
    { name: t('nav.features'), href: '#features', tab: 'home' },
    { name: t('nav.gallery'), href: '#gallery', tab: 'home' },
    { name: t('nav.community'), href: '#community', tab: 'community' },
  ];

  const handleLinkClick = (e: React.MouseEvent, tab: string, href: string) => {
    if (tab === 'community') {
      e.preventDefault();
      onTabChange?.('community');
      window.location.hash = '#community';
    } else {
      if (activeTab === 'community') {
        // If we are in community and click a home link, switch back
        onTabChange?.('home');
        // Let the default anchor behavior scroll to the id after tab switch
      }
    }
    setMobileMenuOpen(false);
    setDesktopDownloadOpen(false);
  };

  const handleInstallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (activeTab === 'community') {
      e.preventDefault();
      onTabChange?.('home');
      window.location.hash = '#install';
    }

    setMobileMenuOpen(false);
    setDesktopDownloadOpen(false);
  };

  const handleDirectDownloadClick = () => {
    setMobileMenuOpen(false);
    setDesktopDownloadOpen(false);
  };

  return (
    <>
      <nav className="phtv-navbar fixed top-0 left-0 right-0 z-[100]">
        <div className={`phtv-navbar__inner mx-auto flex max-w-6xl items-center justify-between border-b px-4 py-3 transition-all duration-300 md:px-6 ${
          scrolled
            ? 'glass-panel border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.28)]'
            : 'border-white/6 bg-black/10 backdrop-blur-md'
        }`}>
          <button 
            onClick={() => { onTabChange?.('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group flex items-center gap-3"
          >
            <img 
              src={iconImg} 
              alt="PHTV Logo" 
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="hidden text-left sm:block">
              <span className="block text-lg font-black tracking-[0.04em] text-white">PHTV</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300/80">macOS Vietnamese Input</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            <a 
              href="/" 
              className="flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-slate-100"
            >
              {t('nav.home' as any)}
            </a>
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href} 
                onClick={(e) => handleLinkClick(e, item.tab, item.href)}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                  item.tab === 'community' && item.tab === activeTab ? 'text-white' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Toggle Button */}
            <button
              onClick={() => changeLanguage(lang === 'vi' ? 'en' : 'vi')}
              className="phtv-nav-control rounded-lg border border-white/8 bg-white/[0.03] px-3.5 py-2 text-sm font-semibold transition-all hover:bg-white/[0.07] outline-none cursor-pointer flex items-center justify-center min-h-[38px]"
              title={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
            >
              {lang === 'vi' ? (
                <>
                  <span className="font-extrabold text-white">VI</span>
                  <span className="mx-1.5 opacity-30">|</span>
                  <span className="opacity-55 font-medium text-slate-300">EN</span>
                </>
              ) : (
                <>
                  <span className="opacity-55 font-medium text-slate-300">VI</span>
                  <span className="mx-1.5 opacity-30">|</span>
                  <span className="font-extrabold text-white">EN</span>
                </>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="phtv-nav-control phtv-icon-control rounded-lg border border-white/8 bg-white/[0.03] p-2 text-slate-300 transition-colors hover:text-white flex items-center justify-center min-h-[38px] min-w-[38px]"
              aria-label={theme === 'dark' ? (lang === 'vi' ? 'Bật giao diện sáng' : 'Use light mode') : (lang === 'vi' ? 'Bật giao diện tối' : 'Use dark mode')}
            >
              {theme === 'dark' ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />}
            </button>

            <a 
              href="https://github.com/PhamHungTien/PHTV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="phtv-nav-control phtv-icon-control hidden items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] p-2 text-slate-300 transition-colors hover:text-white sm:flex"
              title="GitHub Repository"
              aria-label="Xem mã nguồn trên GitHub"
            >
              <Icons.Github size={18} aria-hidden="true" />
            </a>
            
            {hasSplitDownloads ? (
              <div
                ref={desktopDownloadRef}
                className="relative hidden xs:block"
                onMouseEnter={() => setDesktopDownloadOpen(true)}
                onMouseLeave={() => setDesktopDownloadOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setDesktopDownloadOpen((current) => !current)}
                  onFocus={() => setDesktopDownloadOpen(true)}
                  className="phtv-download-button flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-black text-slate-950 transition-all hover:bg-slate-100"
                  aria-label="Tải xuống PHTV"
                  aria-expanded={desktopDownloadOpen}
                  aria-haspopup="menu"
                >
                  <Icons.Download size={18} />
                  <span>{downloadLabel}</span>
                  <Icons.ChevronDown size={16} className={`transition-transform ${desktopDownloadOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute right-0 top-full pt-3 transition-all duration-200 ${desktopDownloadOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`}>
                  <div className="phtv-download-menu w-[270px] rounded-lg border border-white/10 bg-white p-2 shadow-lg">
                    <div className="space-y-1">
                      <a
                        href={arm64DownloadUrl ?? releaseUrl}
                        onClick={handleDirectDownloadClick}
                        className="flex items-center justify-between gap-3 rounded-md bg-blue-600 px-3 py-2.5 text-left text-white"
                      >
                        <span className="flex items-center gap-3">
                          <Icons.Download size={18} />
                          <span>
                            <span className="block text-sm font-black">Apple Silicon</span>
                            <span className="block text-xs text-white/75">{t('nav.apple_silicon_desc')}</span>
                          </span>
                        </span>
                        <Icons.ArrowRight size={18} className="shrink-0" />
                      </a>

                      <a
                        href={intelDownloadUrl ?? releaseUrl}
                        onClick={handleDirectDownloadClick}
                        className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-slate-900 hover:bg-slate-100"
                      >
                        <span className="flex items-center gap-3">
                          <Icons.Download size={18} />
                          <span>
                            <span className="block text-sm font-black">Intel</span>
                          <span className="block text-xs text-slate-500">{t('nav.intel_desc')}</span>
                          </span>
                        </span>
                        <Icons.ArrowRight size={18} className="shrink-0 text-slate-400" />
                      </a>

                      <a
                        href="#install"
                        onClick={handleInstallClick}
                        className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-slate-900 hover:bg-slate-100"
                      >
                        <span className="flex items-center gap-3">
                          <Icons.Terminal size={18} />
                          <span>
                            <span className="block text-sm font-black">Homebrew</span>
                            <span className="block text-xs text-slate-500">{t('nav.homebrew_desc')}</span>
                          </span>
                        </span>
                        <Icons.ArrowRight size={18} className="shrink-0" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a
                href={downloadUrl}
                onClick={handleDirectDownloadClick}
                className="phtv-download-button hidden xs:flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-black text-slate-950 transition-all hover:bg-slate-100"
                aria-label="Tải xuống PHTV"
              >
                <Icons.Download size={18} />
                <span>{downloadLabel}</span>
              </a>
            )}

            {/* Mobile Menu Button */}
            <button 
              ref={mobileToggleRef}
              type="button"
              className="phtv-nav-control phtv-icon-control inline-flex items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] text-slate-300 transition-colors hover:text-white lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t('nav.close_menu') : t('nav.open_menu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="phtv-mobile-navigation"
            >
              {mobileMenuOpen ? <Icons.X size={20} aria-hidden="true" /> : <Icons.Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="phtv-navigation-overlay">
          <button className="phtv-navigation-backdrop" type="button" tabIndex={-1} aria-label={t('nav.close_menu')} onClick={() => setMobileMenuOpen(false)} />
          <nav id="phtv-mobile-navigation" ref={mobileNavigationRef} className="phtv-navigation-panel" aria-label={lang === 'vi' ? 'Điều hướng PHTV' : 'PHTV navigation'}>
            <div className="phtv-navigation-links">
              <a href="/" onClick={() => setMobileMenuOpen(false)}>
                <Icons.ArrowRight className="phtv-navigation-back" size={18} aria-hidden="true" />
                <span>{t('nav.home')}</span>
              </a>
              {navLinks.map((item, index) => {
                const Icon = [Icons.Zap, Icons.Image, Icons.MessageSquare][index];
                return (
                  <a key={item.href} href={item.href} onClick={(event) => handleLinkClick(event, item.tab, item.href)} aria-current={item.tab === 'community' && activeTab === 'community' ? 'page' : undefined}>
                    <Icon size={18} aria-hidden="true" />
                    <span>{item.name}</span>
                    <Icons.ArrowRight size={15} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            <div className="phtv-navigation-downloads">
              <span className="phtv-navigation-label">{t('nav.download_label')}</span>
              <div className="phtv-navigation-download-grid">
                {hasSplitDownloads ? (
                  <>
                    <a href={arm64DownloadUrl ?? releaseUrl} onClick={handleDirectDownloadClick}><Icons.Download size={16} aria-hidden="true" />Apple Silicon</a>
                    <a href={intelDownloadUrl ?? releaseUrl} onClick={handleDirectDownloadClick}><Icons.Download size={16} aria-hidden="true" />Intel</a>
                  </>
                ) : (
                  <a href={downloadUrl} onClick={handleDirectDownloadClick}><Icons.Download size={16} aria-hidden="true" />{downloadLabel}</a>
                )}
              </div>
              <a className="phtv-navigation-homebrew" href="#install" onClick={handleInstallClick}><Icons.Terminal size={16} aria-hidden="true" />Homebrew</a>
            </div>
            <div className="phtv-navigation-footer">
              <a href="https://github.com/PhamHungTien/PHTV" target="_blank" rel="noopener noreferrer"><Icons.Github size={17} aria-hidden="true" />GitHub</a>
              <a href="mailto:contact@phamhungtien.com"><Icons.Mail size={17} aria-hidden="true" />Email</a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
