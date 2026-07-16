import { ArrowRight, Check, Code2, Github, Mail, MonitorSmartphone, ShieldCheck } from 'lucide-react';
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
  const projectMailUrl = `mailto:phamhungtien.contact@gmail.com?subject=${encodeURIComponent(
    lang === 'vi' ? 'Trao đổi dự án phần mềm Apple hoặc website' : 'Apple software or web project'
  )}`;

  const serviceSteps = [1, 2, 3, 4].map((step) => ({
    title: t(`home.services.step${step}.title`),
    description: t(`home.services.step${step}.description`)
  }));

  const serviceCapabilities = [
    {
      icon: MonitorSmartphone,
      title: t('home.services.apple.title'),
      description: t('home.services.apple.description'),
      items: [1, 2, 3].map((item) => t(`home.services.apple.item${item}`))
    },
    {
      icon: Code2,
      title: t('home.services.web.title'),
      description: t('home.services.web.description'),
      items: [1, 2, 3].map((item) => t(`home.services.web.item${item}`))
    }
  ];

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
              <a className="button button--secondary" href="#services">
                <ArrowRight size={18} />
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
                <img
                  src={product.heroImage}
                  alt={product.gallery[0]?.alt[lang] ?? product.name}
                  decoding="async"
                  {...(index === 0
                    ? { loading: 'eager' as const, fetchPriority: 'high' as const }
                    : { loading: 'lazy' as const })}
                />
                <span>
                  <img src={product.icon} alt="" width={22} height={22} decoding="async" />
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
                  <img src={product.icon} alt="" width={42} height={42} loading="lazy" decoding="async" />
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

        <section className="services-section" id="services">
          <div className="services-intro">
            <div className="services-intro__copy">
              <h2>{t('home.services.title')}</h2>
              <p>{t('home.services.description')}</p>
              <a className="button button--primary" href={projectMailUrl}>
                <Mail size={18} />
                {t('home.services.cta')}
              </a>
            </div>
          </div>

          <div className="service-capabilities">
            {serviceCapabilities.map(({ icon: Icon, title, description, items }) => (
              <article className="service-capability" key={title}>
                <div className="service-capability__heading">
                  <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                  <h3>{title}</h3>
                </div>
                <p>{description}</p>
                <ul>
                  {items.map((item) => (
                    <li key={item}>
                      <Check size={15} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <ol className="service-process">
            {serviceSteps.map((step, index) => (
              <li key={step.title}>
                <span className="service-process__number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="app-store-assurance">
            <ShieldCheck size={26} aria-hidden="true" />
            <div>
              <h3>{t('home.services.assurance.title')}</h3>
              <p>{t('home.services.assurance.description')}</p>
            </div>
          </div>
        </section>

        <section className="contact-band" id="contact">
          <div>
            <h2>{t('home.contact.title')}</h2>
            <p>{t('home.contact.description')}</p>
          </div>
          <div className="contact-actions">
            <a className="button button--primary" href={projectMailUrl}>
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
