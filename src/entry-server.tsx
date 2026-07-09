import { renderToString } from 'react-dom/server';
import { App } from './App';
import { productRoutes, prerenderRoutes, products } from './data/products';
import { getPageMeta, getStructuredData, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE } from './seo';
import { SSR_LANG } from './hooks/useLanguage';

export { prerenderRoutes, products, SITE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT };

export function render(route: string) {
  const product = productRoutes.get(route.toLowerCase()) ?? null;

  return {
    html: renderToString(<App path={route} initialLang={SSR_LANG} />),
    meta: getPageMeta(product, SSR_LANG),
    structuredData: getStructuredData(product, SSR_LANG)
  };
}
