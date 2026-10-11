import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import { App } from './App';
import { productRoutes, prerenderRoutes, products } from './data/products';
import { getPageMeta, getStructuredData, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE } from './seo';
import { SSR_LANG } from './hooks/useLanguage';

export { prerenderRoutes, products, SITE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT };

/** Wait for lazy sections so hydration never receives an aborted Suspense boundary. */
export async function render(route: string) {
  const product = productRoutes.get(route.toLowerCase()) ?? null;
  const html = await new Promise<string>((resolve, reject) => {
    const output = new PassThrough();
    let result = '';
    output.on('data', (chunk) => {
      result += chunk.toString();
    });
    output.on('end', () => resolve(result));
    output.on('error', reject);
    const stream = renderToPipeableStream(<App path={route} />, {
      onAllReady() {
        stream.pipe(output);
      },
      onError(error) {
        reject(error);
      },
    });
  });
  return {
    html,
    meta: getPageMeta(product, SSR_LANG),
    structuredData: getStructuredData(product, SSR_LANG),
  };
}
