import React from 'react';
import { Icons } from './Icons';
import { useI18n } from '../i18n';

const iconImg = '/assets/phtv-icon.webp';

interface FooterProps {
  onDonateClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDonateClick }) => {
  const { t } = useI18n();

  return (
    <footer className="relative z-10 border-t border-white/6 bg-black/10 py-12 md:py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.35fr_0.65fr]">
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
              {t('footer.desc')}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="md:text-right">
            <h4 className="text-sm font-semibold text-white">{t('footer.links')}</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li><a href="#features" className="transition-colors hover:text-white">{t('nav.features')}</a></li>
              <li><a href="#install" className="transition-colors hover:text-white">{t('nav.install')}</a></li>
              <li><a href="https://github.com/PhamHungTien/PHTV/releases" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">GitHub Releases</a></li>
              <li><a href="privacy.html" className="transition-colors hover:text-white">Privacy Policy</a></li>
              <li><a href="terms.html" className="transition-colors hover:text-white">Terms of Use</a></li>
            </ul>
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
