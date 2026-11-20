/**
 * Post-build assertions on the prerendered HTML. Run with `npm run check:seo`.
 *
 * Catches the failure modes that are invisible in a browser but expensive in
 * search: duplicate head tags from Helmet racing the static tags, a canonical
 * pointing at the wrong host, two pages sharing a title, or a page that
 * prerendered without its content.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const { host, routes } = JSON.parse(readFileSync(join(root, 'src/seo/routes.json'), 'utf8'));

const errors = [];
const warnings = [];
const titles = new Map();

const count = (s, re) => (s.match(re) || []).length;
const attr = (s, re) => { const m = s.match(re); return m ? m[1] : null; };
/** Titles/descriptions are HTML-escaped in the output; compare decoded text. */
const decode = (s) =>
  s == null
    ? null
    : s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
        .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));

for (const p of Object.keys(routes)) {
  const meta = routes[p];
  // Preview pages are built only where VITE_PREVIEW_PAGES is set (Netlify; src/lib/previewPages.ts).
  if (meta.preview && process.env.VITE_PREVIEW_PAGES !== 'true') continue;
  const file = p === '/' ? join(distDir, 'index.html') : join(distDir, `${p.replace(/^\//, '')}.html`);
  const rel = file.replace(`${root}/`, '');

  if (!existsSync(file)) { errors.push(`${rel}: MISSING (route ${p} was not prerendered)`); continue; }
  // Strip HTML comments first: index.html documents its own head tags and
  // mentions tag names literally, which would otherwise be counted as real tags.
  const html = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');

  // --- exactly one of each head tag ---
  const nTitle = count(html, /<title[\s>]/g);
  const nDesc = count(html, /<meta[^>]+name="description"/g);
  const nCanon = count(html, /<link[^>]+rel="canonical"/g);
  if (nTitle !== 1) errors.push(`${rel}: expected 1 <title>, found ${nTitle}`);
  if (nDesc !== 1) errors.push(`${rel}: expected 1 meta description, found ${nDesc}`);

  if (meta.noindex) {
    if (nCanon !== 0) errors.push(`${rel}: noindex page must not have a canonical (found ${nCanon})`);
    if (!/<meta[^>]+name="robots"[^>]+noindex/.test(html)) errors.push(`${rel}: missing <meta name="robots" content="noindex">`);
  } else {
    if (nCanon !== 1) errors.push(`${rel}: expected 1 canonical, found ${nCanon}`);
    const canon = attr(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
    const expected = p === '/' ? `${host}/` : host + p;
    if (canon !== expected) errors.push(`${rel}: canonical is "${canon}", expected "${expected}"`);
    const ogUrl = attr(html, /<meta[^>]+property="og:url"[^>]+content="([^"]+)"/);
    if (!ogUrl || !ogUrl.startsWith(host)) errors.push(`${rel}: og:url "${ogUrl}" does not start with ${host}`);
  }

  // --- exactly one h1 ---
  const nH1 = count(html, /<h1[\s>]/g);
  if (nH1 !== 1) errors.push(`${rel}: expected exactly 1 <h1>, found ${nH1}`);

  // --- unique titles ---
  const title = decode(attr(html, /<title[^>]*>([^<]*)<\/title>/));
  if (title) {
    if (titles.has(title)) errors.push(`${rel}: duplicate <title> shared with ${titles.get(title)} — "${title}"`);
    else titles.set(title, rel);
    if (title !== meta.title) errors.push(`${rel}: title "${title}" != routes.json "${meta.title}"`);
    if (title.length > 60) warnings.push(`${rel}: title is ${title.length} chars (>60 may truncate)`);
  }

  const desc = decode(attr(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/));
  if (desc && desc.length > 160) warnings.push(`${rel}: description is ${desc.length} chars (>160 may truncate)`);

  // --- prerender actually captured content ---
  if (!/<div id="root"[^>]*>\s*<\S/.test(html)) errors.push(`${rel}: #root looks empty — prerender did not capture content`);

  // --- structured data parses ---
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { errors.push(`${rel}: invalid JSON-LD — ${e.message}`); }
  }
}

// --- every <img> carries a description in alt (2026-11-20, after Bing flagged Home) ---
// A missing alt attribute is an error (the deploy stops). An empty alt="" is a warning: Bing's
// SEO013_ImgAltExists reports an empty alt as missing, on every page it appears on. An image that
// truly must stay decorative carries data-decorative and is skipped (Bing still flags its page, so
// use it rarely). Every built page, the 404 included.
const htmlFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? htmlFiles(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [],
  );
let imgCount = 0;
const emptyAlt = new Map(); // src -> pages
for (const file of htmlFiles(distDir)) {
  const html = readFileSync(file, 'utf8');
  const rel = file.slice(distDir.length + 1);
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    imgCount += 1;
    const tag = m[0];
    if (!/\salt(\s*=|[\s/>])/i.test(tag)) {
      errors.push(`${rel}: <img> without an alt attribute: ${tag.slice(0, 160)}`);
    } else if (/\salt(\s*=\s*(""|''))?(?=[\s/>])/i.test(tag) && !/\sdata-decorative\b/i.test(tag)) {
      const src = (tag.match(/\ssrc="([^"]+)"/i)?.[1] ?? tag.match(/\ssrcset="([^\s"]+)/i)?.[1] ?? '?').replace(/\.[0-9a-f]{8}\./, '.');
      if (!emptyAlt.has(src)) emptyAlt.set(src, new Set());
      emptyAlt.get(src).add(rel);
    }
  }
}
for (const [src, pages] of emptyAlt) {
  warnings.push(`empty alt="" (Bing reports it as missing): ${src} on ${pages.size} page${pages.size === 1 ? '' : 's'}${pages.size <= 3 ? ` (${[...pages].join(', ')})` : ''}`);
}
const emptyCount = [...emptyAlt.values()].reduce((n, p) => n + p.size, 0);

// --- sitemap + robots ---
const sitemap = join(distDir, 'sitemap.xml');
if (!existsSync(sitemap)) errors.push('dist/sitemap.xml: MISSING');
else {
  const xml = readFileSync(sitemap, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expected = Object.keys(routes).filter((p) => !routes[p].noindex).length;
  if (locs.length !== expected) errors.push(`dist/sitemap.xml: ${locs.length} URLs, expected ${expected}`);
  for (const l of locs) if (!l.startsWith(host)) errors.push(`dist/sitemap.xml: "${l}" does not start with ${host}`);
  if (/\/404/.test(xml)) errors.push('dist/sitemap.xml: contains /404');
}
if (!existsSync(join(distDir, 'robots.txt'))) errors.push('dist/robots.txt: MISSING');

// --- cutover guard: the host 301 must still be commented out ---
const redirects = join(distDir, '_redirects');
if (existsSync(redirects)) {
  for (const line of readFileSync(redirects, 'utf8').split('\n')) {
    const t = line.trim();
    if (t && !t.startsWith('#') && t.includes('netlify.app') && t.includes('301')) {
      errors.push('dist/_redirects: the netlify.app -> aressecurity.co 301 is ACTIVE. It must stay commented out until cutover.');
    }
  }
}

for (const w of warnings) console.warn(`  warn  ${w}`);
if (errors.length) {
  console.error(`\n[check:seo] ${errors.length} error(s):`);
  for (const e of errors) console.error(`  ERROR ${e}`);
  process.exit(1);
}
console.log(`\n[check:seo] PASS — ${titles.size} pages, all unique titles, canonicals on ${host}, ${imgCount} images, ${emptyCount} empty alt${warnings.length ? `, ${warnings.length} warning(s)` : ''}`);
