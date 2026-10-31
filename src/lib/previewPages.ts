// Preview pages (owner, 2026-10-30): pages being tried out that show on the dev server and on Netlify
// builds only. netlify.toml sets VITE_PREVIEW_PAGES; the DreamHost release build doesn't, so those
// pages, their routes, and their menu links never reach the live site. Routes flagged `preview` in
// routes.json are prerendered and checked only when it is set (scripts/prerender.mjs, check-seo.mjs).
export const PREVIEW_PAGES = import.meta.env.DEV || import.meta.env.VITE_PREVIEW_PAGES === 'true';
