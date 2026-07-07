import { useEffect, useMemo } from 'react';
import { productRoutes, products } from './data/products';
import { useLanguage } from './hooks/useLanguage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

function normalizePath(pathname: string) {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function App() {
  const { lang, setLanguage, t } = useLanguage();
  const path = normalizePath(window.location.pathname);

  const product = useMemo(() => {
    const lowerPath = path.toLowerCase();
    return productRoutes.get(lowerPath) ?? null;
  }, [path]);

  useEffect(() => {
    const title = product ? `${product.name} | Pham Hung Tien` : t('meta.home.title');
    const description = product ? product.description[lang] : t('meta.home.description');

    document.title = title;

    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    descriptionMeta?.setAttribute('content', description);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    canonical?.setAttribute('href', `https://phamhungtien.com${product?.route ?? '/'}`);
  }, [lang, product, t]);

  if (product) {
    return <ProductPage product={product} lang={lang} onLanguageChange={setLanguage} t={t} />;
  }

  return <HomePage lang={lang} onLanguageChange={setLanguage} t={t} />;
}

export const routesToPrerender = products.filter((product) => !product.isStandalone).map((product) => product.route);
