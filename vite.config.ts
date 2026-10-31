import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Preview pages (src/lib/previewPages.ts): in a build without VITE_PREVIEW_PAGES (the DreamHost
// release), the page module is swapped for an empty stand-in, so neither its code nor its stylesheet
// is in the bundle. Netlify sets the variable in netlify.toml; the dev server always has the pages.
const PREVIEW_STUB = fileURLToPath(new URL('./src/lib/previewStub.tsx', import.meta.url));

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
  resolve:
    command === 'build' && process.env.VITE_PREVIEW_PAGES !== 'true'
      ? { alias: [{ find: /^\.\/pages\/ExecutiveProtectionNext$/, replacement: PREVIEW_STUB }] }
      : undefined,
}));
