import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icons';

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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDownloadOpen, setDesktopDownloadOpen] = useState(false);
  const desktopDownloadRef = useRef<HTMLDivElement | null>(null);
  const downloadLabel = hasSplitDownloads ? 'Tải cho Mac' : 'Tải ngay';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'Tính năng', href: '#features', tab: 'home' },
    { name: 'Phím tắt', href: '#shortcuts', tab: 'home' },
    { name: 'Giao diện', href: '#gallery', tab: 'home' },
    { name: 'Cài đặt', href: '#install', tab: 'home' },
    { name: 'Thảo luận', href: '#community', tab: 'community' },
    { name: 'FAQ', href: '#faq', tab: 'home' },
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
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'glass-panel py-3 shadow-2xl shadow-black/40' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={() => { onTabChange?.('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <img 
              src={iconImg} 
              alt="PHTV Logo" 
              className="w-10 h-10 transition-all duration-500 group-hover:scale-110 object-contain" 
            />
            <span className="font-black text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 via-red-500 to-rose-400 bg-[length:200%_auto] animate-gradient-flow hidden sm:block group-hover:text-glow transition-all pr-3 py-1">PHTV</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href} 
                onClick={(e) => handleLinkClick(e, item.tab, item.href)}
                className={`text-sm font-bold transition-all hover:-translate-y-0.5 flex items-center gap-1.5 ${
                  (item.tab === activeTab) ? 'text-brand-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
                {item.tab === 'community' && (
                  <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-5">
            <a 
              href="https://github.com/PhamHungTien/PHTV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              title="GitHub Repository"
              aria-label="Xem mã nguồn trên GitHub"
            >
              <Icons.Github size={22} />
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
                  className="flex items-center gap-2 bg-white text-slate-950 px-6 py-2.5 rounded-xl text-sm font-black hover:bg-slate-100 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
                  aria-label="Tải xuống PHTV"
                  aria-expanded={desktopDownloadOpen}
                  aria-haspopup="menu"
                >
                  <Icons.Download size={18} />
                  <span>{downloadLabel}</span>
                  <Icons.ChevronDown size={16} className={`transition-transform ${desktopDownloadOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute right-0 top-full pt-3 transition-all duration-200 ${desktopDownloadOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-2'}`}>
                  <div className="w-[320px] rounded-3xl border border-white/10 bg-slate-950/95 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                    <div className="px-3 pb-3 pt-1 border-b border-white/5">
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-brand-400">Tải nhanh</p>
                      <p className="mt-1 text-sm font-semibold text-slate-300">Chọn đúng bản cho Apple Silicon hoặc Intel ngay tại đây.</p>
                    </div>

                    <div className="mt-3 space-y-2">
                      <a
                        href={arm64DownloadUrl ?? releaseUrl}
                        onClick={handleDirectDownloadClick}
                        className="flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-brand-600 to-purple-600 px-4 py-3 text-left text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/20"
                      >
                        <span className="flex items-center gap-3">
                          <Icons.Download size={18} />
                          <span>
                            <span className="block text-sm font-black">Apple Silicon</span>
                            <span className="block text-xs font-semibold uppercase tracking-widest text-white/75">M1 / M2 / M3 / M4</span>
                          </span>
                        </span>
                        <Icons.ArrowRight size={18} className="shrink-0" />
                      </a>

                      <a
                        href={intelDownloadUrl ?? releaseUrl}
                        onClick={handleDirectDownloadClick}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
                      >
                        <span className="flex items-center gap-3">
                          <Icons.Download size={18} />
                          <span>
                            <span className="block text-sm font-black">Intel</span>
                            <span className="block text-xs font-semibold uppercase tracking-widest text-slate-400">Core i5 / i7 / i9</span>
                          </span>
                        </span>
                        <Icons.ArrowRight size={18} className="shrink-0 text-slate-400" />
                      </a>

                      <a
                        href="#install"
                        onClick={handleInstallClick}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-brand-500/20 bg-brand-500/10 px-4 py-3 text-left text-brand-300 transition-all hover:bg-brand-500/15"
                      >
                        <span className="flex items-center gap-3">
                          <Icons.Terminal size={18} />
                          <span>
                            <span className="block text-sm font-black">Homebrew</span>
                            <span className="block text-xs font-semibold text-brand-200/80">Tự chọn đúng binary</span>
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
                className="hidden xs:flex items-center gap-2 bg-white text-slate-950 px-6 py-2.5 rounded-xl text-sm font-black hover:bg-slate-100 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
                aria-label="Tải xuống PHTV"
              >
                <Icons.Download size={18} />
                <span>{downloadLabel}</span>
              </a>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {mobileMenuOpen ? <Icons.X size={28} /> : <Icons.Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" onClick={() => setMobileMenuOpen(false)}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-[280px] bg-slate-900 border-l border-white/5 p-8 flex flex-col transition-transform duration-500 ease-out shadow-2xl ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center gap-4 mb-12">
            <img src={iconImg} alt="PHTV" className="w-10 h-10 object-contain" />
            <span className="font-black text-2xl text-white">PHTV</span>
          </div>
          
          <div className="flex flex-col gap-6">
            {navLinks.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                onClick={(e) => handleLinkClick(e, item.tab, item.href)}
                className={`text-lg font-bold flex items-center justify-between group ${
                  item.tab === activeTab ? 'text-brand-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  {item.name}
                  {item.tab === 'community' && (
                    <span className="bg-brand-500 text-white text-[8px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter">New</span>
                  )}
                </span>
                <Icons.ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-brand-500" />
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            {hasSplitDownloads ? (
              <>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-400">Tải nhanh</p>
                  <p className="mt-2 text-sm text-slate-400">Chọn đúng file ngay trong menu này, không cần kéo xuống dưới.</p>
                </div>

                <a
                  href={arm64DownloadUrl ?? releaseUrl}
                  onClick={handleDirectDownloadClick}
                  className="flex items-center justify-between gap-3 w-full py-4 px-5 bg-gradient-to-r from-brand-600 to-purple-600 text-white rounded-2xl font-black text-base shadow-xl shadow-brand-500/20"
                >
                  <span className="flex items-center gap-3">
                    <Icons.Download size={20} />
                    Apple Silicon
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/75">M1-M4</span>
                </a>

                <a
                  href={intelDownloadUrl ?? releaseUrl}
                  onClick={handleDirectDownloadClick}
                  className="flex items-center justify-between gap-3 w-full py-4 px-5 bg-white/10 border border-white/10 text-white rounded-2xl font-black text-base"
                >
                  <span className="flex items-center gap-3">
                    <Icons.Download size={20} />
                    Intel
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Core Intel</span>
                </a>

                <a
                  href="#install"
                  onClick={handleInstallClick}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-brand-500/10 border border-brand-500/20 text-brand-300 rounded-2xl font-black text-base"
                >
                  <Icons.Terminal size={20} />
                  Homebrew tự chọn bản
                </a>
              </>
            ) : (
              <a
                href={downloadUrl}
                onClick={handleDirectDownloadClick}
                className="flex items-center justify-center gap-3 w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-lg shadow-xl shadow-white/5"
              >
                <Icons.Download size={20} />
                {downloadLabel}
              </a>
            )}
            <div className="flex justify-center gap-6 pt-4 border-t border-white/5">
              <a href="https://github.com/PhamHungTien/PHTV" className="text-slate-400 hover:text-white transition-colors"><Icons.Github size={24} /></a>
              <a href="mailto:phamhungtien.contact@gmail.com" className="text-slate-400 hover:text-white transition-colors"><Icons.Coffee size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
