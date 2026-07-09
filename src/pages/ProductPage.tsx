import { ArrowRight, ExternalLink, Github, Mail, Store } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Lang, Product } from '../types';
import { Header } from '../components/Header';
import { PhtvWordmark } from '../components/PhtvWordmark';

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

      <main>
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
            <p className="detail-description">{product.description[lang]}</p>
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

        <section className="detail-grid">
          <div className="install-panel">
            <h2>{product.slug === 'phtv' ? (lang === 'vi' ? 'Cài đặt nhanh' : 'Quick install') : t('product.open')}</h2>
            <p>
              {product.slug === 'phtv'
                ? (lang === 'vi' ? 'Cài bằng Homebrew hoặc tải đúng bản máy Mac từ trang PHTV.' : 'Install with Homebrew or download the correct Mac build from PHTV.')
                : product.support[lang]}
            </p>
            <code>{product.slug === 'phtv' ? 'brew install --cask phamhungtien/tap/phtv' : (product.appStoreUrl ? 'App Store' : product.route)}</code>
            <a href={primaryHref} target={product.appStoreUrl ? '_blank' : undefined} rel={product.appStoreUrl ? 'noopener' : undefined}>
              {product.ctaLabel[lang]}
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="feature-panel">
            <h2>{t('product.features')}</h2>
            <div className="feature-list">
              {product.features.map((feature) => (
                <article key={feature.title.en}>
                  <span className="feature-dot" />
                  <div>
                    <h3>{feature.title[lang]}</h3>
                    <p>{feature.description[lang]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-section" id="gallery">
          <div className="section-copy">
            <h2>{t('product.gallery')}</h2>
            <p>{product.subtitle[lang]}</p>
          </div>
          <div className="gallery-strip">
            {product.gallery.map((image) => (
              <figure key={image.src}>
                <img src={image.src} alt={image.alt[lang]} loading="lazy" decoding="async" />
                <figcaption>{image.alt[lang]}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="support-section" id="support">
          <div>
            <h2>{t('product.support')}</h2>
            <p>{product.support[lang]}</p>
          </div>
          <div className="contact-actions">
            <a className="button button--primary" href="mailto:phamhungtien.contact@gmail.com">
              <Mail size={18} />
              {t('product.supportCta')}
            </a>
            <a className="button button--secondary" href={`${product.route}privacy.html`}>
              {t('product.privacy')}
            </a>
            <a className="button button--secondary" href={`${product.route}terms.html`}>
              {t('product.terms')}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
