import React from 'react';
import { Icons } from './Icons';

export const VideoTutorial: React.FC = () => {
  return (
    <section id="tutorial" className="py-32 md:py-48 bg-slate-950/30 border-y border-white/5 scroll-mt-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 dark:text-white tracking-tighter italic uppercase">Video Hướng dẫn</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80">
            Xem video hướng dẫn cài đặt và cấu hình PHTV chi tiết từ YouTube Phước Rin.
          </p>
        </div>

        <div className="glass-panel rounded-[2.5rem] overflow-hidden shadow-3xl group relative transition-all duration-500 hover:border-brand-500/30 aspect-video border border-white/10">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/q7hDz-Pdhvw"
            title="Bộ gõ tiếng Việt không lỗi Spotlight cho Macbook"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://www.youtube.com/@PhuocRin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-400 transition-colors font-black text-lg uppercase tracking-widest"
          >
            <Icons.Video size={24} className="text-red-500" />
            <span>Kênh Phước Rin</span>
            <Icons.ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
