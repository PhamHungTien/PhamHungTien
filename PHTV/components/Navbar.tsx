import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';
import iconImg from '../src/assets/icon.webp';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("https://github.com/PhamHungTien/PHTV/releases/latest");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Caching logic to prevent GitHub API Rate Limiting
    const CACHE_KEY = 'phtv_release_data';
    const CACHE_DURATION = 3600000; // 1 hour in milliseconds

    const fetchRelease = async () => {
      const now = Date.now();
      
      // 1. Try to load from cache
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { url, timestamp } = JSON.parse(cached);
          if (now - timestamp < CACHE_DURATION && url) {
            setDownloadUrl(url);
            return; // Exit if cache is valid
          }
        }
      } catch (e) {
        console.warn("Cache parsing error", e);
        localStorage.removeItem(CACHE_KEY);
      }

      // 2. Fetch from API if cache is invalid/missing
      try {
        const res = await fetch('https://api.github.com/repos/PhamHungTien/PHTV/releases/latest');
        if (!res.ok) throw new Error('Rate limit or network error');
        
        const data = await res.json();
        const dmgAsset = data.assets?.find((asset: any) => asset.name.endsWith('.dmg'));
        
        if (dmgAsset) {
          const newUrl = dmgAsset.browser_download_url;
          setDownloadUrl(newUrl);
          
          // Save to cache
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            url: newUrl,
            version: data.tag_name,
            timestamp: now
          }));
        }
      } catch (err) {
        console.error("Failed to fetch release, using fallback link.", err);
        // Keep default state (generic latest releases link)
      }
    };

    fetchRelease();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3 shadow-lg shadow-black/20' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={iconImg} 
            alt="PHTV Logo" 
            className="w-10 h-10 rounded-xl shadow-lg shadow-brand-500/20" 
          />
          <span className="font-bold text-xl tracking-tight text-white hidden sm:block">PHTV</span>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Tính năng</a>
          <a href="#shortcuts" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Phím tắt</a>
          <a href="#gallery" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Giao diện</a>
          <a href="#install" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Cài đặt</a>
          <a href="#faq" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/PhamHungTien/PHTV" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <Icons.Github size={20} />
            <span className="text-sm font-medium">GitHub</span>
          </a>
          <a 
            href={downloadUrl}
            className="flex items-center gap-2 bg-white text-brand-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-brand-50 transition-all transform hover:scale-105 shadow-lg shadow-white/10"
          >
            <Icons.Download size={16} />
            <span>Tải ngay</span>
          </a>
        </div>
      </div>
    </nav>
  );
};