import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/** The same frontend compiler pipeline for all website entry points. */
export function webPlugins(isSsrBuild: boolean) {
  return [react(), ...(!isSsrBuild ? [tailwindcss()] : [])];
}
