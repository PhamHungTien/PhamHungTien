import React from 'react';
import { Icons } from './Icons';
import { useI18n } from '../i18n';
import { ContactSection } from '../../src/components/ContactSection';
import { translate } from '../../src/i18n';

interface FooterProps {
  onDonateClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDonateClick }) => {
  const { lang, t } = useI18n();

  return (
    <footer className="relative z-10 border-t border-white/6 py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <a href="/PHTV/" className="flex items-center gap-3">
            <img src="/PHTV/phtv-icon.webp" alt="" width={36} height={36} />
            <span className="text-lg font-semibold text-white">PHTV</span>
          </a>
          <nav aria-label={t('footer.links')} className="flex flex-wrap gap-x-5 text-sm text-slate-400">
            <a href="#features" className="inline-flex min-h-11 items-center hover:text-white">{t('nav.features')}</a>
            <a href="#install" className="inline-flex min-h-11 items-center hover:text-white">{t('nav.install')}</a>
            <a href="https://github.com/PhamHungTien/PHTV/releases" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-white">GitHub Releases</a>
          </nav>
        </div>
        <ContactSection t={(key) => translate(lang, key)} />
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-2 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Pham Hung Tien</p>
          <div className="flex flex-wrap items-center gap-x-5">
            <button type="button" onClick={onDonateClick} aria-haspopup="dialog" className="inline-flex min-h-11 items-center gap-2 hover:text-white">
              <Icons.Heart size={16} aria-hidden="true" />{translate(lang, 'common.donate')}
            </button>
            <a href="privacy.html" className="inline-flex min-h-11 items-center hover:text-white">{translate(lang, 'product.privacy')}</a>
            <a href="terms.html" className="inline-flex min-h-11 items-center hover:text-white">{translate(lang, 'product.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
