import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { clientBuild, sharedResolve } from './config/build.ts';

export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [react()],
  server: {
    port: 4174,
    host: '127.0.0.1',
  },
  resolve: sharedResolve,
  build: {
    ...clientBuild,
    outDir: isSsrBuild ? 'dist-ssr' : 'dist',
    sourcemap: false,
    // Asset URLs inside the SSR bundle must resolve to the client build's emitted files.
    ssrEmitAssets: false,
    copyPublicDir: !isSsrBuild,
    rolldownOptions: {
      output: isSsrBuild
        ? { entryFileNames: 'entry-server.js' }
        : {
            entryFileNames: 'assets/[name]-[hash].js',
            chunkFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash][extname]',
          },
    },
  },
}));
