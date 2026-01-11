import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { copyFileSync, existsSync } from 'fs';

// Generate build timestamp for cache busting
const buildTimestamp = Date.now();

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
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
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
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
