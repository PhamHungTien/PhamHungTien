import { ArrowRight, ExternalLink, Github, Mail, Store } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Lang, Product } from '../types';
import { Header } from '../components/Header';
import { PhtvWordmark } from '../components/PhtvWordmark';
import { ContactSection } from '../components/ContactSection';

interface ProductPageProps {
  product: Product;
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
  t: (key: string) => string;
}

export function ProductPage({ product, lang, onLanguageChange, t }: ProductPageProps) {
  const primaryHref = product.appStoreUrl ?? product.route;
  const secondaryHref = product.githubUrl ?? `${product.route}privacy.html`;
  const secondaryLabel = product.secondaryCtaLabel?.[lang] ?? (product.githubUrl ? t('common.github') : t('product.privacy'));

  return (
    <div className="site-shell product-page" style={{ '--accent': product.accent } as CSSProperties}>
      <Header lang={lang} onLanguageChange={onLanguageChange} t={t} productName={product.name} />

      <main id="main-content">
        <section className="detail-hero">
          <div className="detail-hero__copy">
            {product.slug === 'phtv' ? (
              <PhtvWordmark />
            ) : (
              <div className="detail-lockup">
                <img src={product.icon} alt="" width={42} height={42} decoding="async" />
                <span>
                  <strong>{product.name}</strong>
                  <small>{product.category[lang]}</small>
                </span>
              </div>
            )}

            <h1>{product.title[lang]}</h1>
            <p className="detail-subtitle">{product.subtitle[lang]}</p>
            <div className="hero-actions">
              <a className="button button--primary" href={primaryHref} target={product.appStoreUrl ? '_blank' : undefined} rel={product.appStoreUrl ? 'noopener' : undefined}>
                {product.appStoreUrl ? <Store size={18} /> : <ArrowRight size={18} />}
                {product.ctaLabel[lang]}
              </a>
              <a className="button button--secondary" href={secondaryHref} target={product.githubUrl ? '_blank' : undefined} rel={product.githubUrl ? 'noopener' : undefined}>
                {product.githubUrl ? <Github size={18} /> : <ExternalLink size={18} />}
                {secondaryLabel}
              </a>
            </div>
          </div>

          <figure className="detail-hero__media">
            <img
              src={product.heroImage}
              alt={product.gallery[0]?.alt[lang] ?? product.name}
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        </section>

        <section className="facts-band" aria-label={t('common.platforms')}>
          {product.facts.map((fact) => (
            <div className="fact-item" key={fact.label.en}>
              <span>{fact.label[lang]}</span>
              <strong>{fact.value[lang]}</strong>
            </div>
          ))}
        </section>

        <section className="detail-grid" id="features">
          <div className="install-panel">
            <h2>{product.slug === 'phtv' ? (lang === 'vi' ? 'Cài đặt nhanh' : 'Quick install') : t('product.support')}</h2>
            <p>
              {product.slug === 'phtv'
                ? (lang === 'vi' ? 'Cài bằng Homebrew hoặc tải đúng bản máy Mac từ trang PHTV.' : 'Install with Homebrew or download the correct Mac build from PHTV.')
                : product.support[lang]}
            </p>
            {product.slug === 'phtv' && <code>brew install --cask phamhungtien/tap/phtv</code>}
            <a href={product.slug === 'phtv' ? primaryHref : 'mailto:contact@phamhungtien.com'}>
              {product.slug !== 'phtv' && <Mail size={16} aria-hidden="true" />}
              {product.slug === 'phtv' ? product.ctaLabel[lang] : t('product.supportCta')}
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="feature-panel">
            <h2>{t('product.features')}</h2>
            <div className="feature-list">
              {product.features.map((feature) => (
                <article key={feature.title.en}>
                  <span className="feature-dot" />
                  <h3>{feature.title[lang]}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="section-copy">
            <h2>{t('product.gallery')}</h2>
          </div>
          <div className="gallery-strip">
            {product.gallery.map((image) => (
              <figure key={image.src}>
                <a className="gallery-preview" href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`${lang === 'vi' ? 'Xem ảnh đầy đủ' : 'View full image'}: ${image.alt[lang]}`}>
                  <img src={image.src} alt={image.alt[lang]} loading="lazy" decoding="async" />
                </a>
                <figcaption>{image.alt[lang]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <ContactSection t={t} />

        <nav className="product-legal" aria-label={t('product.support')}>
          <a href={`${product.route}privacy.html`}>{t('product.privacy')}</a>
          <a href={`${product.route}terms.html`}>{t('product.terms')}</a>
        </nav>
      </main>
    </div>
  );
}
