import React, { useState, useEffect } from 'react';
import { Icons } from './Icons';

// Helper function to get correct asset paths
const getAssetPath = (filename: string) => {
  return new URL(`../src/assets/UI/${filename}`, import.meta.url).href;
};

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; label: string } | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const openLightbox = (src: string, label: string) => {
    setSelectedImage({ src, label });
    setIsOpening(true);
    setTimeout(() => setIsOpening(false), 10);
  };

  const closeLightbox = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedImage(null);
      setIsClosing(false);
    }, 200);
  };

  // Đóng lightbox khi nhấn ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeLightbox();
      }
    };
    
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

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
          {/* Settings & Menu Bar Images */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
              Cài đặt (Settings)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { src: getAssetPath("menubar.webp"), label: "Menu Bar" },
                 { src: getAssetPath("setting-bogo.webp"), label: "Kiểu gõ" },
                 { src: getAssetPath("setting-phimtat.webp"), label: "Phím tắt" },
                 { src: getAssetPath("setting-gotat.webp"), label: "Gõ tắt" },
                 { src: getAssetPath("setting-ungdung.webp"), label: "Ứng dụng" },
                 { src: getAssetPath("setting-hethong.webp"), label: "Hệ thống" },
                 { src: getAssetPath("setting-baoloi.webp"), label: "Báo lỗi" },
                 { src: getAssetPath("setting-thongtin.webp"), label: "Thông tin" }
               ].map((item, idx) => (
                 <div key={idx} className="group flex flex-col cursor-pointer" onClick={() => openLightbox(item.src, item.label)}>
                    <div className="flex-1 flex items-end">
                      <img 
                         src={item.src} 
                         alt={item.label} 
                         className="rounded-xl w-full object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-center text-slate-500 mt-2 text-sm italic">{item.label}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* PHTV Picker Images */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-purple-500 rounded-full"></span>
              PHTV Picker (Emoji & GIF)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { src: getAssetPath("picker-emoji.webp"), label: "Emoji & Kaomoji Picker" },
                 { src: getAssetPath("picker-gif.webp"), label: "GIF Picker" },
                 { src: getAssetPath("picker-sticker.webp"), label: "Sticker Picker" }
               ].map((item, idx) => (
                 <div key={idx} className="group flex flex-col cursor-pointer" onClick={() => openLightbox(item.src, item.label)}>
                    <div className="flex-1 flex items-end">
                      <img 
                         src={item.src} 
                         alt={item.label} 
                         className="rounded-xl w-full object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-center text-slate-500 mt-2 text-sm italic">{item.label}</p>
                 </div>
               ))}
            </div>
          </div>
       </div>

       {/* Lightbox Modal */}
       {selectedImage && (
         <div 
           className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-all duration-200 ease-out
             ${isClosing || isOpening ? 'bg-black/0 backdrop-blur-none' : 'bg-black/90 backdrop-blur-md'}`}
           onClick={closeLightbox}
         >
           <div 
             className={`relative flex flex-col items-center justify-center w-full h-full transition-all duration-200 ease-out
               ${isClosing || isOpening ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
             onClick={(e) => e.stopPropagation()}
           >
             {/* Close button */}
             <button 
               className="absolute top-0 right-0 md:top-4 md:right-4 z-10 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
               onClick={closeLightbox}
             >
               <Icons.X size={28} />
             </button>
             
             {/* Image container */}
             <div className="flex-1 flex items-center justify-center w-full max-h-[calc(100vh-120px)] overflow-hidden">
               <img 
                 src={selectedImage.src} 
                 alt={selectedImage.label}
                 className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
               />
             </div>
             
             {/* Label */}
             <p className="text-center text-white/90 mt-4 text-base md:text-lg font-medium">{selectedImage.label}</p>
           </div>
         </div>
       )}
    </section>
  );
};