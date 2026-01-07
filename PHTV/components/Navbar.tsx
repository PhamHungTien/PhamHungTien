import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import { useGitHubData } from '../hooks/useGitHubData';
import iconImg from '../src/assets/icon.webp';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { downloadUrl } = useGitHubData();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'glass-panel py-3 shadow-2xl shadow-black/40' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-500/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src={iconImg} 
              alt="PHTV Logo" 
              className="relative w-10 h-10 rounded-xl shadow-lg transition-transform group-hover:scale-110" 
            />
          </div>
          <span className="font-black text-2xl tracking-tighter text-white hidden sm:block group-hover:text-glow transition-all">PHTV</span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {['Features', 'Shortcuts', 'Gallery', 'Install', 'FAQ'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-bold text-slate-400 hover:text-white transition-all hover:-translate-y-0.5"
            >
              {item === 'Features' ? 'Tính năng' : 
               item === 'Shortcuts' ? 'Phím tắt' : 
               item === 'Gallery' ? 'Giao diện' : 
               item === 'Install' ? 'Cài đặt' : 'FAQ'}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <a 
            href="https://github.com/PhamHungTien/PHTV" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            title="GitHub Repository"
          >
            <Icons.Github size={22} />
          </a>
          <a 
            href={downloadUrl}
            className="flex items-center gap-2 bg-white text-slate-950 px-6 py-2.5 rounded-xl text-sm font-black hover:bg-slate-100 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
          >
            <Icons.Download size={18} />
            <span>Tải ngay</span>
          </a>
        </div>
      </div>
    </nav>
  );
};