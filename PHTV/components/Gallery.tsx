import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from './Icons';

// Helper function to get correct asset paths
const getAssetPath = (filename: string) => {
  return `/PHTV/assets/UI/${filename}`;
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
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
       <div className="mb-12 text-center md:mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-amber-300/80">
            <Icons.Layers size={14} />
            <span>Giao diện</span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
            Một giao diện gọn, rõ và gần với trải nghiệm macOS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
             Xem nhanh các màn hình quan trọng để nắm rõ cách PHTV hoạt động trong thực tế.
          </p>
       </div>

       <div className="space-y-12">
          {/* Settings Section */}
          <div>
            <h3 className="mb-6 flex items-center gap-3 text-xl font-black text-white md:text-2xl">
              <div className="h-7 w-1 rounded-full bg-amber-300"></div>
              Cài đặt
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
               {settingsImages.map((item, idx) => {
                 const globalIndex = IMAGES.indexOf(item);
                 return (
                   <div 
                     key={idx} 
                     className="glass-card group relative flex cursor-pointer flex-col overflow-hidden rounded-[1.5rem] p-4"
                     onClick={() => openLightbox(globalIndex)}
                   >
                      <div className="aspect-[4/3] flex items-center justify-center overflow-hidden rounded-[1rem] bg-black/20">
                        <img src={item.src} alt={item.label} className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]" loading="lazy" />
                      </div>
                      <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                         <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                           Phóng to
                         </span>
                      </div>
                      <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.18em] text-slate-400 transition-colors group-hover:text-white">{item.label}</p>
                   </div>
                 );
               })}
            </div>
          </div>

          {/* PHTV Picker Section */}
          <div>
            <h3 className="mb-6 flex items-center gap-3 text-xl font-black text-white md:text-2xl">
              <div className="h-7 w-1 rounded-full bg-rose-300"></div>
              PHTV Picker
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
               {pickerImages.map((item, idx) => {
                 const globalIndex = IMAGES.indexOf(item);
                 return (
                   <div 
                     key={idx} 
                     className="glass-card group relative flex cursor-pointer flex-col overflow-hidden rounded-[1.5rem] p-4"
                     onClick={() => openLightbox(globalIndex)}
                   >
                      <div className="aspect-[16/10] flex items-center justify-center overflow-hidden rounded-[1rem] bg-black/20">
                        <img src={item.src} alt={item.label} className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]" loading="lazy" />
                      </div>
                      <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pb-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                         <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                           Phóng to
                         </span>
                      </div>
                      <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.18em] text-slate-400 transition-colors group-hover:text-white">{item.label}</p>
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
