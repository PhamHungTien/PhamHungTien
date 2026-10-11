import path from 'node:path';
import { defineConfig } from 'vite';
import { webPlugins } from '../config/plugins.ts';
import { copyFileSync, existsSync } from 'node:fs';
import { clientBuild, sharedResolve } from '../config/build.ts';

export default defineConfig(({ isSsrBuild }) => ({
  base: '/PHTV/',
  server: { port: 3000, host: '127.0.0.1' },
  plugins: [
    ...webPlugins(Boolean(isSsrBuild)),
    {
      name: 'copy-headers',
      writeBundle() {
        if (!isSsrBuild && existsSync('_headers')) copyFileSync('_headers', 'dist/_headers');
      },
    },
  ],
  // Only public build metadata belongs in the client bundle.
  define: { __BUILD_TIMESTAMP__: JSON.stringify(Date.now()) },
  resolve: { ...sharedResolve, alias: { '@': path.resolve(import.meta.dirname, '.') } },
  build: {
    ...clientBuild,
    outDir: isSsrBuild ? 'dist-ssr' : 'dist',
    copyPublicDir: !isSsrBuild,
    ssrEmitAssets: false,
    rolldownOptions: isSsrBuild
      ? { output: { entryFileNames: 'entry-server.js' } }
      : clientBuild.rolldownOptions,
  },
}));
