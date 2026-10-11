import { ArrowRight, Heart, Search, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Lang } from '../types';
import { products } from '../data/products';
import { Header } from '../components/Header';
import { ContactSection } from '../components/ContactSection';
import { DonateDialog } from '../components/DonateDialog';

interface HomePageProps {
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
  t: (key: string) => string;
}

export function HomePage({ lang, onLanguageChange, t }: HomePageProps) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState('All');
  const vi = lang === 'vi';
  const filtered = products.filter(product => {
    const text = `${product.name} ${product.category[lang]} ${product.description[lang]}`.toLocaleLowerCase();
    return text.includes(query.toLocaleLowerCase().trim()) && (platform === 'All' || product.operatingSystem.toLowerCase().includes(platform.toLowerCase()));
  });
  return (
    <div className="site-shell">
      <Header lang={lang} onLanguageChange={onLanguageChange} t={t} />

      <main id="main-content">
        <section className="collection-hero">
          <div className="collection-hero__copy">
            <p className="eyebrow">PHAM HUNG TIEN</p>
            <h1>{vi ? 'Ý tưởng nhỏ.' : 'Small ideas.'}<br /><span>{vi ? 'Trải nghiệm lớn.' : 'Thoughtfully built.'}</span></h1>
            <a className="button button--primary" href="#products">{vi ? 'Khám phá ứng dụng' : 'Explore the collection'}<ArrowRight size={17} /></a>
          </div>
          <a className="hero-study" href={products.find(product => product.slug === 'vtts')!.route}>
            <div className="hero-study__image"><img src={products.find(product => product.slug === 'vtts')!.heroImage} alt={vi ? 'Giao diện vTTS' : 'A closer look at vTTS'} fetchPriority="high" /></div>
            <div className="hero-study__caption"><span>IN FOCUS / vTTS</span><span>{vi ? 'Xem ứng dụng' : 'Take a closer look'} <ArrowUpRight size={15} /></span></div>
          </a>
        </section>
        <section className="product-directory" id="products">
          <div className="section-copy directory-heading">
            <div><p className="eyebrow">THE COLLECTION</p><h2>{t('home.products.title')}</h2></div>
            <button className="button button--secondary donate-trigger" type="button" onClick={() => setDonateOpen(true)} aria-haspopup="dialog">
              <Heart size={17} aria-hidden="true" />{t('common.donate')}
            </button>
          </div>

          <div className="collection-tools">
            <div className="platform-filters" role="group" aria-label={vi ? 'Lọc nền tảng' : 'Filter platforms'}>
              {['All', 'iOS', 'iPadOS', 'macOS', 'visionOS'].map(value => <button key={value} type="button" aria-pressed={platform === value} onClick={() => setPlatform(value)}>{value === 'All' ? (vi ? 'Tất cả' : 'All apps') : value}</button>)}
            </div>
            <label className="app-search"><Search size={17} aria-hidden="true" /><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={vi ? 'Tìm ứng dụng…' : 'Find an app…'} aria-label={vi ? 'Tìm ứng dụng' : 'Find an app'} /></label>
          </div>
          <p className="collection-count" role="status">{filtered.length} {vi ? 'ứng dụng' : filtered.length === 1 ? 'app' : 'apps'}</p>
          <div className="product-list">
            {filtered.map((product) => {
              return <a className="product-row" href={product.route} key={product.slug} style={{ '--card-accent': product.accent } as CSSProperties}>
                <div className="app-card-artwork"><img src={product.localizedHeroImages?.[lang] ?? product.heroImage} alt="" loading="lazy" decoding="async" /><span className="app-card-index">{String(products.indexOf(product) + 1).padStart(2, '0')}</span></div>
                <div className="app-card-top"><img src={product.icon} alt="" width={64} height={64} loading="lazy" decoding="async" /><ArrowUpRight size={22} aria-hidden="true" /></div>
                <div className="app-card-copy"><small>{product.category[lang]}</small><h3>{product.name}</h3><p>{product.subtitle[lang]}</p></div>
                <div className="app-card-bottom"><span>{product.platforms[lang]}</span><strong>{product.githubUrl ? (vi ? 'Mã nguồn mở' : 'Open source') : 'App Store'}</strong></div>
              </a>;
            })}
          </div>
          {filtered.length === 0 && <div className="empty-collection"><p>{vi ? 'Không tìm thấy ứng dụng phù hợp.' : 'No matching apps.'}</p><button className="button button--secondary" onClick={() => { setQuery(''); setPlatform('All'); }}>{vi ? 'Xóa bộ lọc' : 'Reset filters'}</button></div>}
        </section>

        <ContactSection t={t} />
      </main>

      <footer className="site-footer">
        <span>{t('home.footer.note')}</span>
        <nav aria-label="Footer">
          <a href="#contact">{t('nav.contact')}</a>
        </nav>
      </footer>
      <DonateDialog isOpen={donateOpen} onClose={() => setDonateOpen(false)} lang={lang} />
    </div>
  );
}
