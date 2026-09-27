/**
 * Writes dist/sitemap.xml from src/seo/routes.json — the same file that
 * feeds <Seo> and the prerenderer, so the three cannot drift.
 *
 * Routes flagged `noindex` (i.e. /404) are excluded.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { host, routes } = JSON.parse(readFileSync(resolve(root, 'src/seo/routes.json'), 'utf8'));

const lastmod = new Date().toISOString().slice(0, 10);
const paths = Object.keys(routes).filter((p) => !routes[p].noindex);

// Home first, then shallower paths before deeper ones, alphabetical within
// a depth — purely so the file is readable by a human reviewing it.
paths.sort((a, b) => {
  if (a === '/') return -1;
  if (b === '/') return 1;
  const d = a.split('/').length - b.split('/').length;
  return d !== 0 ? d : a.localeCompare(b);
});

const urls = paths
  .map((p) => {
    const loc = p === '/' ? `${host}/` : host + p;
    const priority = p === '/' ? '1.0' : p.split('/').length > 2 ? '0.7' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(resolve(root, 'dist/sitemap.xml'), xml);
console.log(`[sitemap] wrote dist/sitemap.xml with ${paths.length} URLs (lastmod ${lastmod})`);
