// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

/**
 * One static site for the portfolio, every app page and their legal documents.
 * See docs/ARCHITECTURE.md for how routes, languages and islands fit together.
 */
export default defineConfig({
  site: 'https://phamhungtien.com',
  output: 'static',
  // /vTTS/ stays a folder, while /vTTS/privacy.html stays a file. App Store listings
  // link to those exact URLs, so they must never change shape.
  trailingSlash: 'ignore',
  build: {
    format: 'preserve',
    assets: 'assets/build',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  // React is only shipped for the two discussion boards; everything else is HTML + CSS.
  integrations: [react()],
  image: {
    responsiveStyles: false,
  },
  prefetch: false,
  devToolbar: { enabled: false },
  vite: {
    build: {
      assetsInlineLimit: 0,
      // The Firebase SDK (~700 kB) is one lazy chunk, loaded only when Discussions opens.
      chunkSizeWarningLimit: 800,
    },
  },
});
