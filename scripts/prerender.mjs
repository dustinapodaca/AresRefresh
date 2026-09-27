/**
 * Build-time prerendering: writes one static HTML file per route so every
 * page ships real markup with its own head tags.
 *
 * Why this exists: the app boots into an empty <div id="root">. Google
 * renders JS, but Bing, LinkedIn, Slack, Facebook and most AI crawlers do
 * not — without this they see a blank page on every URL.
 *
 * Approach: serve the built dist/ with `vite preview`, drive it with
 * Puppeteer, and snapshot the rendered DOM per route.
 *
 * Two details that matter:
 *  1. The pristine dist/index.html shell is cached in memory BEFORE any
 *     route is written. Otherwise later routes would boot from an
 *     already-prerendered Home page and inherit its markup.
 *  2. Flat output paths (dist/about.html, not dist/about/index.html).
 *     Netlify serves /about from about.html with a 200 and no redirect;
 *     a directory would 301 to /about/ and split the canonical.
 *
 * Failure policy: if Chrome cannot launch (a common CI problem), this exits
 * non-zero with a clear message rather than silently shipping a
 * JS-only build. Set PRERENDER_OPTIONAL=1 to downgrade that to a warning
 * so a deploy can still go out while the cause is investigated.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');
const PORT = 4183;

const { routes } = JSON.parse(readFileSync(join(root, 'src/seo/routes.json'), 'utf8'));
const paths = Object.keys(routes);

/** '/' -> dist/index.html ; '/services/armed-security' -> dist/services/armed-security.html */
function outFile(p) {
  return p === '/' ? join(distDir, 'index.html') : join(distDir, `${p.replace(/^\//, '')}.html`);
}

function fail(msg) {
  if (process.env.PRERENDER_OPTIONAL === '1') {
    console.warn(`[prerender] SKIPPED: ${msg}`);
    console.warn('[prerender] Shipping a JS-only build. Non-JS crawlers will see an empty page.');
    process.exit(0);
  }
  console.error(`[prerender] FAILED: ${msg}`);
  process.exit(1);
}

if (!existsSync(join(distDir, 'index.html'))) {
  fail('dist/index.html not found — run `vite build` first.');
}

// Cache the pristine shell before we overwrite anything (see note 1 above).
const shell = readFileSync(join(distDir, 'index.html'), 'utf8');

let puppeteer;
try {
  puppeteer = (await import('puppeteer')).default;
} catch {
  fail('puppeteer is not installed (`npm i -D puppeteer`).');
}

const server = await preview({
  root,
  preview: { port: PORT, strictPort: true },
  logLevel: 'warn',
});

let browser;
try {
  browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
} catch (err) {
  await server.close();
  fail(`could not launch Chrome — ${err.message}`);
}

const base = `http://localhost:${PORT}`;
let written = 0;

try {
  const page = await browser.newPage();
  // Render '/' LAST so no other route ever boots from a prerendered Home.
  const ordered = [...paths.filter((p) => p !== '/'), '/'];

  for (const p of ordered) {
    // /404 has no route of its own; hit a path that cannot match so the
    // catch-all renders, and write the result to dist/404.html.
    const target = p === '/404' ? '/__prerender_not_found__' : p;

    const res = await page.goto(base + target, { waitUntil: 'networkidle0', timeout: 45000 });
    if (!res) throw new Error(`no response for ${target}`);

    await page.waitForSelector('h1', { timeout: 15000 });

    const html = await page.evaluate(() => `<!doctype html>${document.documentElement.outerHTML}`);

    const file = outFile(p);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    written += 1;
    console.log(`[prerender] ${p.padEnd(30)} -> ${file.replace(`${root}/`, '')}`);
  }
} catch (err) {
  await browser.close();
  await server.close();
  fail(err.message);
}

await browser.close();
await server.close();

// Sanity check: the shell we started from must not have leaked into a
// route file as its own content.
if (readFileSync(outFile('/'), 'utf8') === shell) {
  console.warn('[prerender] WARNING: dist/index.html is unchanged — did Home actually render?');
}

console.log(`[prerender] wrote ${written} HTML files`);
