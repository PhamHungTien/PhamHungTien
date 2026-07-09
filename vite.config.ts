import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [react()],
  server: {
    port: 4174,
    host: '0.0.0.0'
  },
  build: {
    outDir: isSsrBuild ? 'dist-ssr' : 'dist',
    sourcemap: false,
    // Asset URLs inside the SSR bundle must resolve to the client build's emitted files.
    ssrEmitAssets: false,
    copyPublicDir: !isSsrBuild,
    rollupOptions: {
      output: isSsrBuild
        ? { entryFileNames: 'entry-server.js' }
        : {
            entryFileNames: 'assets/[name]-[hash].js',
            chunkFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash][extname]'
          }
    }
  }
}));
