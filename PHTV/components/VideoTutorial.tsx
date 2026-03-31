import React from 'react';
import { Icons } from './Icons';

export const VideoTutorial: React.FC = () => {
  return (
    <section id="tutorial" className="py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-10 text-center md:mb-12">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-300/80">Hướng dẫn</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">Xem nhanh cách cài và thiết lập</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
            Một video duy nhất, gọn và dễ theo dõi cho người mới bắt đầu.
          </p>
        </div>

        <div className="glass-panel overflow-hidden rounded-[2rem] border border-white/10">
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/q7hDz-Pdhvw"
              title="Bộ gõ tiếng Việt không lỗi Spotlight cho Macbook"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://www.youtube.com/@PhuocRin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white"
          >
            <Icons.Video size={16} className="text-red-400" />
            Xem thêm trên kênh Phước Rin
            <Icons.ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
