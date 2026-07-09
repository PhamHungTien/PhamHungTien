import { useEffect, useMemo } from 'react';
import { productRoutes } from './data/products';
import { useLanguage } from './hooks/useLanguage';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { getPageMeta, getStructuredData } from './seo';
import type { Lang } from './types';

function normalizePath(pathname: string) {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function setMeta(selector: string, content: string) {
  document.head.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
}

interface AppProps {
  /** Supplied by the prerenderer; the browser reads it from the address bar. */
  path?: string;
  initialLang?: Lang;
}

export function App({ path: pathProp, initialLang }: AppProps) {
  const { lang, setLanguage, t } = useLanguage(initialLang);
  const path = normalizePath(pathProp ?? window.location.pathname);

  const product = useMemo(() => productRoutes.get(path.toLowerCase()) ?? null, [path]);

  // The prerendered head is already correct for SSR_LANG; this keeps it truthful
  // after the visitor switches language.
  useEffect(() => {
    const meta = getPageMeta(product, lang);

    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.ogTitle);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[property="og:url"]', meta.canonical);
    setMeta('meta[property="og:image"]', meta.ogImage);
    setMeta('meta[property="og:image:alt"]', meta.ogImageAlt);
    setMeta('meta[name="twitter:title"]', meta.ogTitle);
    setMeta('meta[name="twitter:description"]', meta.description);
    setMeta('meta[name="twitter:image"]', meta.ogImage);

    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', meta.canonical);

    const jsonLd = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
    if (jsonLd) jsonLd.textContent = JSON.stringify(getStructuredData(product, lang));
  }, [lang, product]);

  if (product) {
    return <ProductPage product={product} lang={lang} onLanguageChange={setLanguage} t={t} />;
  }

  return <HomePage lang={lang} onLanguageChange={setLanguage} t={t} />;
}
