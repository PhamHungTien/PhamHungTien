import { ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Lang } from '../types';
import { products } from '../data/products';
import { Header } from '../components/Header';
import { ContactSection } from '../components/ContactSection';

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
        <section className="product-directory" id="products">
          <div className="section-copy">
            <h1>{t('home.products.title')}</h1>
          </div>

          <div className="product-list">
            {products.map((product, index) => (
              <a
                className="product-row"
                href={product.route}
                key={product.slug}
                style={{ '--row-accent': product.accent, '--row-delay': `${index * 42}ms` } as CSSProperties}
              >
                <span className="product-row__identity">
                  <img src={product.icon} alt="" width={42} height={42} loading="lazy" decoding="async" />
                  <span>
                    <strong>{product.name}</strong>
                    <small>{product.category[lang]}</small>
                    <small className="product-row__platforms-mobile">{product.platforms[lang]}</small>
                  </span>
                </span>
                <span className="product-row__platforms">{product.platforms[lang]}</span>
                <span className="product-row__arrow" aria-hidden="true"><ArrowRight size={17} /></span>
              </a>
            ))}
          </div>
        </section>

        <ContactSection t={t} />
      </main>

      <footer className="site-footer">
        <span>{t('home.footer.note')}</span>
        <nav aria-label="Footer">
          <a href="#contact">{t('nav.contact')}</a>
        </nav>
      </footer>
    </div>
  );
}
