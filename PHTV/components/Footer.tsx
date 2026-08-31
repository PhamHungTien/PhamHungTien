import React from 'react';
import { Icons } from "./Icons";
import { useI18n } from '../i18n';
import { socialProfiles } from '../../src/data/socials';

const iconImg = '/PHTV/phtv-icon.webp';

const socialIcons = {
  facebook: Icons.Facebook,
  instagram: Icons.Instagram,
  threads: Icons.AtSign,
  locket: Icons.Camera,
  cake: Icons.Cake,
  tiktok: Icons.Music2,
  linkedin: Icons.Linkedin,
  github: Icons.Github,
  email: Icons.Mail
};

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

        <div className="phtv-footer-contacts mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {socialProfiles.map((social) => {
            const Icon = socialIcons[social.id];
            const content = (
              <>
                <span className="phtv-footer-contact__icon"><Icon size={17} /></span>
                <span className="min-w-0">
                  <strong className="block text-sm font-semibold text-white">{social.label}</strong>
                  <small className="block truncate text-xs text-slate-400">{social.handle}</small>
                </span>
                {social.href && <Icons.ArrowRight className="ml-auto shrink-0 text-slate-500" size={15} />}
              </>
            );

            return social.href ? (
              <a
                key={social.id}
                href={social.href}
                target={social.href.startsWith('https://') ? '_blank' : undefined}
                rel={social.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                className="phtv-footer-contact"
              >
                {content}
              </a>
            ) : (
              <div key={social.id} className="phtv-footer-contact phtv-footer-contact--static">
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/6 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Pham Hung Tien. PHTV.</p>
          <div className="flex gap-5">
            <a href="mailto:contact@phamhungtien.com" className="transition-colors hover:text-white">{t('footer.support')}</a>
            <a href="privacy.html" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="terms.html" className="transition-colors hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
