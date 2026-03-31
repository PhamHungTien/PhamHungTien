import React from 'react';
import { Icons } from './Icons';

const iconImg = '/PHTV/phtv-icon.webp';

interface FooterProps {
  onDonateClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDonateClick }) => {
  return (
    <footer className="border-t border-white/6 bg-black/10 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-4">
              <img src={iconImg} alt="PHTV Logo" className="h-12 w-12 object-contain" />
              <div>
                <span className="block text-2xl font-black tracking-tight text-white">PHTV</span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Precision Hybrid Typing Vietnamese
                </span>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 md:text-base">
              Bộ gõ tiếng Việt hiện đại cho macOS, tập trung vào hiệu năng, độ ổn định và quyền riêng tư.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { icon: Icons.Github, href: 'https://github.com/PhamHungTien/PHTV', label: 'GitHub' },
                { icon: Icons.Linkedin, href: 'https://www.linkedin.com/in/ph%E1%BA%A1m-h%C3%B9ng-ti%E1%BA%BFn-a1b405327/', label: 'LinkedIn' },
                { icon: Icons.Video, href: 'https://www.youtube.com/@PhuocRin', label: 'YouTube' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:text-white"
                  title={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}

              <a
                href="mailto:phamhungtien.contact@gmail.com"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-300 transition-colors hover:text-white"
                title="Email"
              >
                <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-300/80">Liên kết</h4>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li><a href="#features" className="transition-colors hover:text-white">Tính năng</a></li>
              <li><a href="#gallery" className="transition-colors hover:text-white">Giao diện</a></li>
              <li><a href="#install" className="transition-colors hover:text-white">Cài đặt</a></li>
              <li><a href="#faq" className="transition-colors hover:text-white">FAQ</a></li>
              <li><a href="https://github.com/PhamHungTien/PHTV/releases" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">GitHub Releases</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.28em] text-amber-300/80">Hỗ trợ</h4>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              Nếu PHTV hữu ích với bạn, mình rất trân trọng mọi phản hồi, issue hoặc một ly cà phê ủng hộ.
            </p>
            <button
              onClick={onDonateClick}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
            >
              <Icons.Coffee size={16} />
              Ủng hộ dự án
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/6 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Pham Hung Tien.</p>
          <p>Designed for a calmer, clearer macOS-first experience.</p>
        </div>
      </div>
    </footer>
  );
};
