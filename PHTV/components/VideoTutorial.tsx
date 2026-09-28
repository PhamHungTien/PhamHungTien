import React from 'react';
import { Icons } from './Icons';
import { useI18n } from '../i18n';

export const VideoTutorial: React.FC = () => {
  const { lang } = useI18n();

  return (
    <section id="tutorial" className="reveal scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-7 max-w-2xl">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            {lang === 'vi' ? 'Video hướng dẫn cài đặt' : 'Installation Video Guide'}
          </h2>
          <p className="mt-2 text-sm text-slate-400 md:text-base">
            {lang === 'vi'
              ? 'Theo dõi từng bước cài đặt và thiết lập bộ gõ PHTV trên macOS để có trải nghiệm gõ mượt mà nhất.'
              : 'Follow step-by-step instructions to install and configure PHTV on macOS for the best typing experience.'}
          </p>
        </div>

        <div className="glass-panel overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <div className="aspect-video w-full bg-slate-950/60">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/q7hDz-Pdhvw"
              title="Hướng dẫn cài đặt PHTV - Bộ gõ tiếng Việt cho macOS"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Icons.Video size={16} className="text-red-500" />
            <span>{lang === 'vi' ? 'Video thực hiện bởi Phước Rin' : 'Video by Phước Rin'}</span>
          </div>
          <a
            href="https://youtu.be/q7hDz-Pdhvw?si=17aLcJkI-KoVJGRj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-blue-500 transition-colors hover:text-blue-400"
          >
            {lang === 'vi' ? 'Mở trên YouTube' : 'Open on YouTube'}
            <Icons.ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
