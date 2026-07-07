import { ArrowRight, Github, Mail } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Lang } from '../types';
import { products } from '../data/products';
import { Header } from '../components/Header';

interface HomePageProps {
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
  t: (key: string) => string;
}

export function HomePage({ lang, onLanguageChange, t }: HomePageProps) {
  return (
    <div className="site-shell">
      <Header lang={lang} onLanguageChange={onLanguageChange} t={t} />

      <main>
        <section className="home-hero">
          <div className="home-hero__copy">
            <h1>{t('home.hero.title')}</h1>
            <p>{t('home.hero.description')}</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#products">
                {t('home.hero.primary')}
                <ArrowRight size={18} />
              </a>
              <a className="button button--secondary" href="#contact">
                <Mail size={18} />
                {t('home.hero.secondary')}
              </a>
            </div>
          </div>

          <div className="product-rail" aria-label={t('home.products.title')}>
            {products.map((product, index) => (
              <a
                className={`product-rail__item product-rail__item--${index + 1}`}
                href={product.route}
                key={product.slug}
                style={{ '--accent': product.accent } as CSSProperties}
              >
                <img src={product.heroImage} alt={product.gallery[0]?.alt[lang] ?? product.name} />
                <span>
                  <img src={product.icon} alt="" />
                  {product.name}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="product-index" id="products">
          <div className="section-copy">
            <h2>{t('home.products.title')}</h2>
            <p>{t('home.products.description')}</p>
          </div>

          <div className="product-list">
            {products.map((product) => (
              <a className="product-row" href={product.route} key={product.slug}>
                <span className="product-row__identity">
                  <img src={product.icon} alt="" />
                  <span>
                    <strong>{product.name}</strong>
                    <small>{product.category[lang]}</small>
                  </span>
                </span>
                <span className="product-row__summary">{product.description[lang]}</span>
                <span className="product-row__platforms">{product.platforms[lang]}</span>
                <ArrowRight size={18} />
              </a>
            ))}
          </div>
        </section>

        <section className="contact-band" id="contact">
          <div>
            <h2>{t('home.contact.title')}</h2>
            <p>{t('home.contact.description')}</p>
          </div>
          <div className="contact-actions">
            <a className="button button--primary" href="mailto:phamhungtien.contact@gmail.com">
              <Mail size={18} />
              {t('home.contact.email')}
            </a>
            <a className="button button--secondary" href="https://github.com/PhamHungTien" target="_blank" rel="noopener">
              <Github size={18} />
              {t('home.contact.github')}
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>{t('home.footer.note')}</span>
        <nav aria-label="Footer">
          {products.map((product) => (
            <a href={product.route} key={product.slug}>{product.name}</a>
          ))}
          <a href="mailto:phamhungtien.contact@gmail.com">{t('nav.contact')}</a>
        </nav>
      </footer>
    </div>
  );
}
