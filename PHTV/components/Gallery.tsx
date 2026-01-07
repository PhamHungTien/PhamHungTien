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
           className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-300 ease-in-out
             ${isClosing ? 'bg-black/0 backdrop-blur-none' : 'bg-slate-950/95 backdrop-blur-xl'}`}
           onClick={closeLightbox}
         >
           {/* Top Bar */}
           <div className={`absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 transition-transform duration-300 ${isClosing ? '-translate-y-full' : 'translate-y-0'}`}>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">{IMAGES[selectedIndex].label}</span>
                <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">Hình {selectedIndex + 1} / {IMAGES.length}</span>
              </div>
              <button 
                className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10"
                onClick={closeLightbox}
              >
                <Icons.X size={24} />
              </button>
           </div>

           {/* Main Content Area */}
           <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              {/* Navigation - Left */}
              <button 
                className="absolute left-4 md:left-8 z-20 p-4 bg-black/20 hover:bg-white/10 text-white rounded-full transition-all border border-white/5 hidden md:block group"
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              >
                <Icons.ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={28} />
              </button>

              {/* Image with zoom animation */}
              <div 
                className={`relative max-w-5xl max-h-full transition-all duration-300 ease-out flex items-center justify-center
                  ${isClosing ? 'opacity-0 scale-90 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
                onClick={(e) => e.stopPropagation()}
              >
                 <img 
                   key={IMAGES[selectedIndex].src}
                   src={IMAGES[selectedIndex].src} 
                   alt={IMAGES[selectedIndex].label}
                   className="max-w-full max-h-[75vh] md:max-h-[80vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 animate-in fade-in zoom-in-95 duration-300"
                 />
              </div>

              {/* Navigation - Right */}
              <button 
                className="absolute right-4 md:right-8 z-20 p-4 bg-black/20 hover:bg-white/10 text-white rounded-full transition-all border border-white/5 hidden md:block group"
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
              >
                <Icons.ArrowRight className="group-hover:translate-x-1 transition-transform" size={28} />
              </button>
           </div>

           {/* Bottom Thumbnails/Mobile Navigation */}
           <div className={`absolute bottom-0 left-0 right-0 p-8 flex justify-center gap-4 md:hidden z-10 transition-transform duration-300 ${isClosing ? 'translate-y-full' : 'translate-y-0'}`}>
              <button 
                className="flex-1 py-4 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10"
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              >
                <Icons.ArrowRight className="rotate-180" size={24} />
              </button>
              <button 
                className="flex-1 py-4 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10"
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
              >
                <Icons.ArrowRight size={24} />
              </button>
           </div>
         </div>
       )}
    </section>
  );
};