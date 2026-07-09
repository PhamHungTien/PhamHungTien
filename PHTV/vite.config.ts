import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { copyFileSync, existsSync } from 'fs';

// Generate build timestamp for cache busting
const buildTimestamp = Date.now();

export default defineConfig(() => {
    return {
      base: '/PHTV/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        legacy({
          targets: ['defaults', 'not IE 11'],
        }),
        {
          name: 'copy-headers',
          writeBundle() {
            // Copy _headers file to dist for Cloudflare Pages/Netlify
            if (existsSync('_headers')) {
              copyFileSync('_headers', 'dist/_headers');
            }
          }
        }
      ],
      define: {
        // Never `define` a server-side secret here. Vite inlines the value verbatim into
        // the client bundle, which ships to GitHub Pages — so a GEMINI_API_KEY define puts
        // the real key on a public URL the moment any source file references it. Call such
        // APIs from a backend instead.
        '__BUILD_TIMESTAMP__': JSON.stringify(buildTimestamp)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        rollupOptions: {
          output: {
            entryFileNames: `assets/[name]-[hash].js`,
            chunkFileNames: `assets/[name]-[hash].js`,
            assetFileNames: `assets/[name]-[hash].[ext]`,
            manualChunks: {
              'vendor': ['react', 'react-dom', 'lucide-react']
            }
          }
        }
      }
    };
});
