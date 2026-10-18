/**
 * Writes dist/sitemap.xml from src/seo/routes.json — the same file that
 * feeds <Seo> and the prerenderer, so the three cannot drift.
 *
 * Routes flagged `noindex` (i.e. /404) are excluded.
 *
 * lastmod is each page's last real content change, not the build date (web audit, 2026-10-18:
 * a date that moves on every build teaches Google to ignore it). Each prerendered page's words,
 * title, description, and structured data are fingerprinted; src/seo/lastmod.json keeps the
 * fingerprint and the date it last changed. A page whose fingerprint differs gets today's date,
 * and the file is rewritten, so commit it with the change that moved it.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { host, routes } = JSON.parse(readFileSync(resolve(root, 'src/seo/routes.json'), 'utf8'));

const today = new Date().toISOString().slice(0, 10);
const paths = Object.keys(routes).filter((p) => !routes[p].noindex);

const storeFile = resolve(root, 'src/seo/lastmod.json');
const store = existsSync(storeFile) ? JSON.parse(readFileSync(storeFile, 'utf8')) : {};

/** The page's content as a reader or crawler gets it, without markup or asset names. */
function fingerprint(p) {
  const html = readFileSync(resolve(root, 'dist', p === '/' ? 'index.html' : `${p.slice(1)}.html`), 'utf8');
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? '';
  const description = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/)?.[1] ?? '';
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('');
  const body = html.slice(html.indexOf('<div id="root"'))
    .replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return createHash('sha1').update([title, description, ld, body].join('\n')).digest('hex');
}

const next = {};
let changed = 0;
for (const p of paths) {
  const hash = fingerprint(p);
  const kept = store[p];
  if (kept && kept.hash === hash) next[p] = kept;
  else {
    next[p] = { hash, date: today };
    changed += 1;
  }
}
writeFileSync(storeFile, `${JSON.stringify(next, null, 2)}\n`);

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
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${next[p].date}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(resolve(root, 'dist/sitemap.xml'), xml);
console.log(`[sitemap] wrote dist/sitemap.xml with ${paths.length} URLs (${changed} changed since the last build, dated ${today})`);
