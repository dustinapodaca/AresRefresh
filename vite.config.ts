import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Preview pages (src/lib/previewPages.ts): in a build without VITE_PREVIEW_PAGES (the DreamHost
// release), the page module is swapped for an empty stand-in, so neither its code nor its stylesheet
// is in the bundle. Netlify sets the variable in netlify.toml; the dev server always has the pages.
// Add one alias per preview page, e.g. { find: /^\.\/pages\/SomePage$/, replacement: PREVIEW_STUB }
// (the Executive Protection preview, removed 2026-11-13, is in git tag archive/executive-protection).
const PREVIEW_STUB = fileURLToPath(new URL('./src/lib/previewStub.tsx', import.meta.url));
const PREVIEW_ALIASES: { find: RegExp; replacement: string }[] = [];

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
  resolve:
    command === 'build' && process.env.VITE_PREVIEW_PAGES !== 'true'
      ? { alias: PREVIEW_ALIASES }
      : undefined,
}));
