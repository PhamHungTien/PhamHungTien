import React, { useState, useEffect, useCallback } from 'react';
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
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
             Giao diện trực quan, tinh tế và dễ sử dụng.
          </p>
       </div>

       <div className="space-y-16">
          {/* Settings Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
              Cài đặt (Settings)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {settingsImages.map((item, idx) => {
                 const globalIndex = IMAGES.indexOf(item);
                 return (
                   <div 
                     key={idx} 
                     className="group relative flex flex-col bg-slate-900/40 rounded-2xl p-4 border border-white/5 hover:border-brand-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
                     onClick={() => openLightbox(globalIndex)}
                   >
                      <div className="aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xl bg-black/20">
                        <img 
                           src={item.src} 
                           alt={item.label} 
                           className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                           loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                         <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-2">
                           <Icons.Download size={12} className="rotate-180" />
                           Phóng to
                         </span>
                      </div>
                      <p className="text-center text-slate-400 mt-4 text-sm font-medium group-hover:text-white transition-colors">{item.label}</p>
                   </div>
                 );
               })}
            </div>
          </div>

          {/* PHTV Picker Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
              PHTV Picker (Emoji & GIF)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {pickerImages.map((item, idx) => {
                 const globalIndex = IMAGES.indexOf(item);
                 return (
                   <div 
                     key={idx} 
                     className="group relative flex flex-col bg-slate-900/40 rounded-2xl p-4 border border-white/5 hover:border-brand-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
                     onClick={() => openLightbox(globalIndex)}
                   >
                      <div className="aspect-[16/10] flex items-center justify-center overflow-hidden rounded-xl bg-black/20">
                        <img 
                           src={item.src} 
                           alt={item.label} 
                           className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                           loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                         <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-2">
                           <Icons.Download size={12} className="rotate-180" />
                           Phóng to
                         </span>
                      </div>
                      <p className="text-center text-slate-400 mt-4 text-sm font-medium group-hover:text-white transition-colors">{item.label}</p>
                   </div>
                 );
               })}
            </div>
          </div>
       </div>

       {/* Enhanced Lightbox Modal */}
       {selectedIndex !== null && (
         <div 
           className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ease-in-out
             ${isClosing ? 'bg-black/0 backdrop-blur-none' : 'bg-slate-950/98 backdrop-blur-2xl'}`}
           onClick={closeLightbox}
         >
           {/* Top Bar - Absolute to not affect flex centering */}
           <div className={`absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-30 transition-all duration-500 ${isClosing ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
              <div className="flex flex-col gap-1">
                <span className="text-white font-black text-xl md:text-2xl tracking-tight">{IMAGES[selectedIndex].label}</span>
                <div className="flex items-center gap-2">
                  <span className="bg-brand-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{IMAGES[selectedIndex].category}</span>
                  <span className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">{selectedIndex + 1} / {IMAGES.length}</span>
                </div>
              </div>
              <button 
                className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/10 hover:rotate-90 group"
                onClick={closeLightbox}
              >
                <Icons.X size={24} className="group-hover:scale-110" />
              </button>
           </div>

           {/* Main Content Area - Perfectly Centered */}
           <div className="w-full h-full flex items-center justify-center p-4 md:p-20 pointer-events-none">
              {/* Navigation - Left */}
              <button 
                className={`absolute left-6 md:left-12 z-40 p-5 bg-white/5 hover:bg-brand-500 text-white rounded-[1.5rem] transition-all border border-white/10 hidden md:flex items-center justify-center group pointer-events-auto ${isClosing ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0 delay-300'}`}
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              >
                <Icons.ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={32} />
              </button>

              {/* Image Container */}
              <div 
                className={`relative w-full h-full flex items-center justify-center transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) pointer-events-auto
                  ${isClosing ? 'opacity-0 scale-90 blur-xl' : 'opacity-100 scale-100 blur-0'}`}
                onClick={(e) => e.stopPropagation()}
              >
                 <img 
                   key={IMAGES[selectedIndex].src}
                   src={IMAGES[selectedIndex].src} 
                   alt={IMAGES[selectedIndex].label}
                   className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 animate-in fade-in zoom-in-95 duration-500"
                 />
              </div>

              {/* Navigation - Right */}
              <button 
                className={`absolute right-6 md:right-12 z-40 p-5 bg-white/5 hover:bg-brand-500 text-white rounded-[1.5rem] transition-all border border-white/10 hidden md:flex items-center justify-center group pointer-events-auto ${isClosing ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0 delay-300'}`}
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
              >
                <Icons.ArrowRight className="group-hover:translate-x-1 transition-transform" size={32} />
              </button>
           </div>

           {/* Mobile Navigation - Absolute bottom */}
           <div className={`absolute bottom-0 left-0 right-0 p-8 flex justify-center gap-4 md:hidden z-30 transition-all duration-500 ${isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
              <button 
                className="flex-1 py-5 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 active:scale-95"
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              >
                <Icons.ArrowRight className="rotate-180 text-brand-400" size={28} />
              </button>
              <button 
                className="flex-1 py-5 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 active:scale-95"
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
              >
                <Icons.ArrowRight className="text-brand-400" size={28} />
              </button>
           </div>
         </div>
       )}
    </section>
  );
};