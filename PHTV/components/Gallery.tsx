import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from './Icons';

// Helper function to get correct asset paths
const getAssetPath = (filename: string) => {
  return new URL(`../src/assets/UI/${filename}`, import.meta.url).href;
};

const IMAGES = [
  { src: getAssetPath("menubar.webp"), label: "Menu Bar", category: "Settings" },
  { src: getAssetPath("setting-bogo.webp"), label: "Kiểu gõ", category: "Settings" },
  { src: getAssetPath("setting-phimtat.webp"), label: "Phím tắt", category: "Settings" },
  { src: getAssetPath("setting-gotat.webp"), label: "Gõ tắt", category: "Settings" },
  { src: getAssetPath("setting-ungdung.webp"), label: "Ứng dụng", category: "Settings" },
  { src: getAssetPath("setting-hethong.webp"), label: "Hệ thống", category: "Settings" },
  { src: getAssetPath("setting-baoloi.webp"), label: "Báo lỗi", category: "Settings" },
  { src: getAssetPath("setting-thongtin.webp"), label: "Thông tin", category: "Settings" },
  { src: getAssetPath("picker-emoji.webp"), label: "Emoji & Kaomoji Picker", category: "Picker" },
  { src: getAssetPath("picker-gif.webp"), label: "GIF Picker", category: "Picker" },
  { src: getAssetPath("picker-sticker.webp"), label: "Sticker Picker", category: "Picker" }
];

export const Gallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsClosing(false);
  };

  const closeLightbox = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedIndex(null);
      setIsClosing(false);
    }, 300);
  }, []);

  const navigate = useCallback((direction: number) => {
    if (selectedIndex === null) return;
    const newIndex = (selectedIndex + direction + IMAGES.length) % IMAGES.length;
    setSelectedIndex(newIndex);
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, closeLightbox, navigate]);

  const settingsImages = IMAGES.filter(img => img.category === "Settings");
  const pickerImages = IMAGES.filter(img => img.category === "Picker");

  const lightboxContent = selectedIndex !== null ? (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 transition-all duration-500 ease-in-out
        ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      style={{ isolation: 'isolate' }}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-950/95 backdrop-blur-2xl transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={closeLightbox}
      />

      {/* Top Bar */}
      <div className={`absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start z-50 transition-all duration-500 ${isClosing ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="flex flex-col gap-1.5">
          <span className="text-white font-black text-xl md:text-3xl tracking-tight leading-none uppercase">{IMAGES[selectedIndex].label}</span>
          <div className="flex items-center gap-3">
            <span className="bg-brand-500 text-white text-[10px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest shadow-lg">{IMAGES[selectedIndex].category}</span>
            <span className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black">{selectedIndex + 1} / {IMAGES.length}</span>
          </div>
        </div>
        <button 
          className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/10 hover:rotate-90 group backdrop-blur-md"
          onClick={closeLightbox}
        >
          <Icons.X size={24} className="group-hover:scale-110" />
        </button>
      </div>

      {/* Main Image Viewport */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <button 
          className={`absolute left-0 md:left-4 z-50 p-5 md:p-6 bg-white/5 hover:bg-brand-500 text-white rounded-[2rem] transition-all border border-white/10 hidden md:flex items-center justify-center group pointer-events-auto shadow-2xl backdrop-blur-md ${isClosing ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'}`}
          onClick={(e) => { e.stopPropagation(); navigate(-1); }}
        >
          <Icons.ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={32} />
        </button>

        <div 
          className={`relative max-w-full max-h-full flex items-center justify-center transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) pointer-events-auto
            ${isClosing ? 'scale-90 blur-2xl opacity-0' : 'scale-100 blur-0 opacity-100'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            key={IMAGES[selectedIndex].src}
            src={IMAGES[selectedIndex].src} 
            alt={IMAGES[selectedIndex].label}
            className="max-w-[90vw] max-h-[70vh] md:max-h-[80vh] object-contain rounded-[1.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 select-none transition-transform duration-500"
          />
        </div>

        <button 
          className={`absolute right-0 md:right-4 z-50 p-5 md:p-6 bg-white/5 hover:bg-brand-500 text-white rounded-[2rem] transition-all border border-white/10 hidden md:flex items-center justify-center group pointer-events-auto shadow-2xl backdrop-blur-md ${isClosing ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}
          onClick={(e) => { e.stopPropagation(); navigate(1); }}
        >
          <Icons.ArrowRight className="group-hover:translate-x-1 transition-transform" size={32} />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`absolute bottom-10 left-0 right-0 p-6 flex justify-center gap-6 md:hidden z-50 transition-all duration-500 ${isClosing ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <button className="flex-1 max-w-[120px] py-5 bg-white/5 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-white/10 active:scale-90 shadow-2xl" onClick={(e) => { e.stopPropagation(); navigate(-1); }}><Icons.ArrowRight className="rotate-180 text-brand-400" size={28} /></button>
        <button className="flex-1 max-w-[120px] py-5 bg-white/5 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-white/10 active:scale-90 shadow-2xl" onClick={(e) => { e.stopPropagation(); navigate(1); }}><Icons.ArrowRight className="text-brand-400" size={28} /></button>
      </div>
    </div>
  ) : null;

  return (
    <section id="gallery" className="py-24 max-w-7xl mx-auto px-6">
       <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand-400 font-bold mb-4 uppercase tracking-wider text-sm">
            <Icons.Layers size={16} />
            <span>Giao diện</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Screenshots
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
             Giao diện trực quan, tinh tế và đồng bộ tuyệt đối với macOS.
          </p>
       </div>

       <div className="space-y-16">
          {/* Settings Section */}
          <div>
            <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)]"></div>
              Cài đặt hệ thống
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {settingsImages.map((item, idx) => {
                 const globalIndex = IMAGES.indexOf(item);
                 return (
                   <div 
                     key={idx} 
                     className="group relative flex flex-col bg-slate-900/40 rounded-2xl p-4 border border-white/5 hover:border-brand-500/30 transition-all duration-500 cursor-pointer overflow-hidden shadow-lg"
                     onClick={() => openLightbox(globalIndex)}
                   >
                      <div className="aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xl bg-black/20">
                        <img src={item.src} alt={item.label} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                         <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase text-white border border-white/10 flex items-center gap-2 tracking-widest">
                           Phóng to
                         </span>
                      </div>
                      <p className="text-center text-slate-400 mt-4 text-xs font-black uppercase tracking-widest group-hover:text-white transition-colors">{item.label}</p>
                   </div>
                 );
               })}
            </div>
          </div>

          {/* PHTV Picker Section */}
          <div>
            <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
              PHTV Picker
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {pickerImages.map((item, idx) => {
                 const globalIndex = IMAGES.indexOf(item);
                 return (
                   <div 
                     key={idx} 
                     className="group relative flex flex-col bg-slate-900/40 rounded-2xl p-4 border border-white/5 hover:border-brand-500/30 transition-all duration-500 cursor-pointer overflow-hidden shadow-lg"
                     onClick={() => openLightbox(globalIndex)}
                   >
                      <div className="aspect-[16/10] flex items-center justify-center overflow-hidden rounded-xl bg-black/20">
                        <img src={item.src} alt={item.label} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                         <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase text-white border border-white/10 flex items-center gap-2 tracking-widest">
                           Phóng to
                         </span>
                      </div>
                      <p className="text-center text-slate-400 mt-4 text-xs font-black uppercase tracking-widest group-hover:text-white transition-colors">{item.label}</p>
                   </div>
                 );
               })}
            </div>
          </div>
       </div>

       {/* Lightbox using Portal to avoid parent transform issues */}
       {selectedIndex !== null && createPortal(lightboxContent, document.body)}
    </section>
  );
};
