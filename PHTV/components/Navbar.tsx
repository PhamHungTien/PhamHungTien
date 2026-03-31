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
    { name: 'Giao diện', href: '#gallery', tab: 'home' },
    { name: 'Cài đặt', href: '#install', tab: 'home' },
    { name: 'FAQ', href: '#faq', tab: 'home' },
    { name: 'Thảo luận', href: '#community', tab: 'community' },
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
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 pt-4 md:px-6 md:pt-5">
        <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 md:px-6 ${
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
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href} 
                onClick={(e) => handleLinkClick(e, item.tab, item.href)}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                  item.tab === activeTab ? 'text-white' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {item.name}
                {item.tab === 'community' && (
                  <span className="flex h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.45)]"></span>
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a 
              href="https://github.com/PhamHungTien/PHTV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden rounded-full border border-white/8 bg-white/[0.03] p-2 text-slate-300 transition-colors hover:text-white sm:flex"
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
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-slate-950 transition-all hover:bg-slate-100"
                  aria-label="Tải xuống PHTV"
                  aria-expanded={desktopDownloadOpen}
                  aria-haspopup="menu"
                >
                  <Icons.Download size={18} />
                  <span>{downloadLabel}</span>
                  <Icons.ChevronDown size={16} className={`transition-transform ${desktopDownloadOpen ? 'rotate-180' : ''}`} />
                </button>

                <div className={`absolute right-0 top-full pt-3 transition-all duration-200 ${desktopDownloadOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`}>
                  <div className="w-[320px] rounded-[1.75rem] border border-white/10 bg-[#0b0f18]/96 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                    <div className="border-b border-white/6 px-3 pb-3 pt-1">
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-300">Tải nhanh</p>
                      <p className="mt-1 text-sm text-slate-400">Chọn theo kiến trúc máy, không cần quan tâm đời chip cụ thể.</p>
                    </div>

                    <div className="mt-3 space-y-2">
                      <a
                        href={arm64DownloadUrl ?? releaseUrl}
                        onClick={handleDirectDownloadClick}
                        className="flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3 text-left text-slate-950 transition-all hover:-translate-y-0.5"
                      >
                        <span className="flex items-center gap-3">
                          <Icons.Download size={18} />
                          <span>
                            <span className="block text-sm font-black">Apple Silicon</span>
                            <span className="block text-xs font-semibold uppercase tracking-widest text-slate-900/65">Mac dùng chip Apple</span>
                          </span>
                        </span>
                        <Icons.ArrowRight size={18} className="shrink-0" />
                      </a>

                      <a
                        href={intelDownloadUrl ?? releaseUrl}
                        onClick={handleDirectDownloadClick}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white transition-all hover:-translate-y-0.5 hover:bg-white/9"
                      >
                        <span className="flex items-center gap-3">
                          <Icons.Download size={18} />
                          <span>
                            <span className="block text-sm font-black">Intel</span>
                            <span className="block text-xs font-semibold uppercase tracking-widest text-slate-400">Mac dùng chip Intel</span>
                          </span>
                        </span>
                        <Icons.ArrowRight size={18} className="shrink-0 text-slate-400" />
                      </a>

                      <a
                        href="#install"
                        onClick={handleInstallClick}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#131b2a] px-4 py-3 text-left text-slate-200 transition-all hover:bg-[#182235]"
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
                className="hidden xs:flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-black text-slate-950 transition-all hover:bg-slate-100"
                aria-label="Tải xuống PHTV"
              >
                <Icons.Download size={18} />
                <span>{downloadLabel}</span>
              </a>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="rounded-full border border-white/8 bg-white/[0.03] p-2 text-slate-300 transition-colors hover:text-white lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {mobileMenuOpen ? <Icons.X size={28} /> : <Icons.Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-300 ${mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)}></div>
        <div className={`absolute right-4 top-4 bottom-4 w-[min(320px,calc(100vw-2rem))] rounded-[2rem] border border-white/10 bg-[#0c111b]/96 p-7 flex flex-col transition-transform duration-300 ease-out shadow-[0_25px_80px_rgba(0,0,0,0.45)] ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center gap-4 mb-12">
            <img src={iconImg} alt="PHTV" className="w-10 h-10 object-contain" />
            <div>
              <span className="block text-xl font-black text-white">PHTV</span>
              <span className="block text-[10px] uppercase tracking-[0.24em] text-slate-500">Precision Hybrid Typing</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            {navLinks.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                onClick={(e) => handleLinkClick(e, item.tab, item.href)}
                className={`group flex items-center justify-between text-lg font-semibold ${
                  item.tab === activeTab ? 'text-brand-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  {item.name}
                  {item.tab === 'community' && (
                    <span className="rounded-md bg-amber-400 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-tighter text-slate-950">New</span>
                  )}
                </span>
                <Icons.ArrowRight size={18} className="text-amber-300 opacity-0 -translate-x-2 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            {hasSplitDownloads ? (
              <>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-300">Tải nhanh</p>
                  <p className="mt-2 text-sm text-slate-400">Chọn đúng file ngay trong menu này, không cần kéo xuống dưới.</p>
                </div>

                <a
                  href={arm64DownloadUrl ?? releaseUrl}
                  onClick={handleDirectDownloadClick}
                  className="flex items-center justify-between gap-3 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-4 font-black text-base text-slate-950"
                >
                  <span className="flex items-center gap-3">
                    <Icons.Download size={20} />
                    Apple Silicon
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-900/65">Mac dùng chip Apple</span>
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
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Mac dùng chip Intel</span>
                </a>

                <a
                  href="#install"
                  onClick={handleInstallClick}
                  className="flex items-center justify-center gap-3 w-full rounded-2xl border border-white/10 bg-[#131b2a] py-4 font-black text-base text-slate-200"
                >
                  <Icons.Terminal size={20} />
                  Homebrew tự chọn bản
                </a>
              </>
            ) : (
              <a
                href={downloadUrl}
                onClick={handleDirectDownloadClick}
                className="flex items-center justify-center gap-3 w-full rounded-2xl bg-white py-4 text-lg font-black text-slate-950"
              >
                <Icons.Download size={20} />
                {downloadLabel}
              </a>
            )}
            <div className="flex justify-center gap-6 border-t border-white/5 pt-4">
              <a href="https://github.com/PhamHungTien/PHTV" className="text-slate-400 transition-colors hover:text-white"><Icons.Github size={24} /></a>
              <a href="mailto:phamhungtien.contact@gmail.com" className="text-slate-400 transition-colors hover:text-white"><Icons.Coffee size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
