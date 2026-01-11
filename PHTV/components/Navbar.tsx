import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { useGitHubData } from '../hooks/useGitHubData';

const iconImg = '/PHTV/phtv-icon.webp';

interface NavbarProps {
  activeTab?: 'home' | 'community';
  onTabChange?: (tab: 'home' | 'community') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab = 'home', onTabChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { downloadUrl } = useGitHubData();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              className="w-10 h-10 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-white/10 group-hover:border-rose-500/30 transition-all duration-500 group-hover:scale-110 object-cover" 
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
                {item.name === 'Cộng đồng' && (
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
            
            <a 
              href={downloadUrl}
              className="hidden xs:flex items-center gap-2 bg-white text-slate-950 px-6 py-2.5 rounded-xl text-sm font-black hover:bg-slate-100 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
              aria-label="Tải xuống PHTV"
            >
              <Icons.Download size={18} />
              <span>Tải ngay</span>
            </a>

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
            <img src={iconImg} alt="PHTV" className="w-10 h-10 rounded-xl border border-white/10 shadow-lg object-cover" />
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
                  {item.name === 'Cộng đồng' && (
                    <span className="bg-brand-500 text-white text-[8px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-tighter">New</span>
                  )}
                </span>
                <Icons.ArrowRight size={18} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-brand-500" />
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <a 
              href={downloadUrl}
              className="flex items-center justify-center gap-3 w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-lg shadow-xl shadow-white/5"
            >
              <Icons.Download size={20} />
              Tải ngay
            </a>
            <div className="flex justify-center gap-6 pt-4 border-t border-white/5">
              <a href="https://github.com/PhamHungTien/PHTV" className="text-slate-400 hover:text-white transition-colors"><Icons.Github size={24} /></a>
              <a href="mailto:hungtien10a7@gmail.com" className="text-slate-400 hover:text-white transition-colors"><Icons.Coffee size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
