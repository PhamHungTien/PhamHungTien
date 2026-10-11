/** Shared client defaults; each application owns its route and plugins. */
export const clientBuild = {
  target: ['chrome111', 'edge111', 'firefox128', 'safari16.4'],
  sourcemap: false,
  minify: 'oxc' as const,
  rolldownOptions: {
    output: {
      entryFileNames: 'assets/[name]-[hash].js',
      chunkFileNames: 'assets/[name]-[hash].js',
      assetFileNames: 'assets/[name]-[hash][extname]',
    },
  },
};
export const sharedResolve = { dedupe: ['react', 'react-dom'] };
