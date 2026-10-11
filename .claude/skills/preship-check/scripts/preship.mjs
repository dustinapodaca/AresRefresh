// Pre-ship check for the Ares site. Run from the repo root (project/react):
//
//   node .claude/skills/preship-check/scripts/preship.mjs [--no-build] [--pages /,/about] [--desktop-only] [--port 4175]
//
// 1. npm run build and npm run check:seo (skip the build with --no-build)
// 2. Serves dist/ the way Netlify does: pretty URLs, public/_headers (the CSP included),
//    the 301s in public/_redirects, 404.html for anything else
// 3. Opens every route in src/seo/routes.json (plus a made-up URL) at 1440 and 390 in
//    Chromium and reports CSP violations, console and page errors, failed requests, broken
//    images, sideways overflow, and the H1 count
// 4. Checks every internal link and #anchor resolves
// 5. Checks facts and wording (page text, structured data, llms.txt, the AI catalogs and skills):
//    identifiers, phone, emails, the SAM date, that the two AI catalogs match,
//    and phrases the owner has ruled out
//
// Exit code 1 when anything under "Errors" is found. "Warnings" need a person to read them.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import http from 'node:http';
import { extname, join, resolve } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name, fallback) => { const i = args.indexOf(name); return i > -1 ? args[i + 1] : fallback; };
const PORT = Number(opt('--port', 4175));
const BASE = `http://localhost:${PORT}`;
const BOGUS = '/preship-no-such-page';

if (!existsSync(join(ROOT, 'src/seo/routes.json'))) {
  console.error('Run this from the repo root (project/react).');
  process.exit(2);
}

const errors = [];
const warnings = [];
const err = (area, msg) => errors.push(`[${area}] ${msg}`);
const warn = (area, msg) => warnings.push(`[${area}] ${msg}`);
const step = (s) => console.log(`\n== ${s}`);

// ---------- 1. Build and SEO check ----------
function run(cmd, cmdArgs) {
  const r = spawnSync(cmd, cmdArgs, { cwd: ROOT, encoding: 'utf8', shell: false });
  return { ok: r.status === 0, out: `${r.stdout || ''}${r.stderr || ''}` };
}
if (!flag('--no-build')) {
  step('npm run build');
  const b = run('npm', ['run', 'build']);
  if (!b.ok) { console.log(b.out.slice(-4000)); console.error('Build failed; stopping.'); process.exit(1); }
  console.log('build ok');
}
if (!existsSync(DIST)) { console.error('No dist/. Build first or drop --no-build.'); process.exit(1); }
step('npm run check:seo');
{
  const s = run('npm', ['run', 'check:seo']);
  const tail = s.out.trim().split('\n').slice(-6).join('\n');
  console.log(tail);
  if (!s.ok) err('seo', 'npm run check:seo failed (output above)');
}

// ---------- 2. Netlify-like static server ----------
function parseHeaders() {
  const file = join(ROOT, 'public/_headers');
  if (!existsSync(file)) return [];
  const rules = [];
  let cur = null;
  for (const raw of readFileSync(file, 'utf8').split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    if (/^\S/.test(raw)) { cur = { re: new RegExp('^' + raw.trim().replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'), headers: {} }; rules.push(cur); }
    else if (cur) { const i = raw.indexOf(':'); cur.headers[raw.slice(0, i).trim()] = raw.slice(i + 1).trim(); }
  }
  return rules;
}
function parseRedirects() {
  const file = join(ROOT, 'public/_redirects');
  if (!existsSync(file)) return new Map();
  const map = new Map();
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const [from, to, status] = t.split(/\s+/);
    if (!from.includes('*') && /^30[1278]/.test(status || '301')) map.set(from, to);
  }
  return map;
}
const HEADER_RULES = parseHeaders();
const REDIRECTS = parseRedirects();
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.xml': 'application/xml', '.pdf': 'application/pdf', '.webmanifest': 'application/manifest+json' };

function fileFor(pathname) {
  const p = decodeURIComponent(pathname);
  const cands = p.endsWith('/') ? [join(DIST, p, 'index.html')] : [join(DIST, p), join(DIST, `${p}.html`), join(DIST, p, 'index.html')];
  return cands.find((f) => f.startsWith(DIST) && existsSync(f) && statSync(f).isFile()) || null;
}
const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, BASE);
  const headers = {};
  for (const r of HEADER_RULES) if (r.re.test(pathname)) Object.assign(headers, r.headers);
  let file = fileFor(pathname);
  let status = 200;
  if (!file && REDIRECTS.has(pathname)) { res.writeHead(301, { ...headers, Location: REDIRECTS.get(pathname) }); return res.end(); }
  if (!file) { file = join(DIST, '404.html'); status = 404; }
  res.writeHead(status, { ...headers, 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((ok, no) => server.once('error', no).listen(PORT, ok)).catch((e) => {
  console.error(`Port ${PORT} is busy (${e.code}). Pass --port <n>.`);
  process.exit(2);
});
const csp = HEADER_RULES.find((r) => r.headers['Content-Security-Policy']);
console.log(`\nServing dist/ on ${BASE} (${HEADER_RULES.length} header rules${csp ? ', CSP on' : ', NO CSP'}, ${REDIRECTS.size} redirects)`);

// ---------- 3. Browser pass ----------
const { routes } = JSON.parse(readFileSync(join(ROOT, 'src/seo/routes.json'), 'utf8'));
let pages = Object.keys(routes);
const only = opt('--pages', null);
if (only) pages = only.split(',').map((s) => s.trim());
pages.push(BOGUS);

const puppeteer = (await import('puppeteer')).default;
const browser = await puppeteer.launch();
const VIEWPORTS = [{ width: 1440, height: 900, tag: '1440' }, { width: 390, height: 844, tag: '390', isMobile: true, hasTouch: true, deviceScaleFactor: 2 }]
  .filter((v) => !flag('--desktop-only') || v.tag === '1440');
const idsByPage = new Map();
const links = []; // { from, path, hash }

step(`Browser pass: ${pages.length} pages x ${VIEWPORTS.length} widths`);
for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  await page.evaluateOnNewDocument(() => {
    window.__csp = [];
    document.addEventListener('securitypolicyviolation', (e) => window.__csp.push(`${e.violatedDirective} ${e.blockedURI || ''}`.trim()));
  });
  let current = '';
  const pageErrs = [];
  // "Failed to load resource" carries no URL; the response listener below reports those with one.
  page.on('console', (m) => { if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) pageErrs.push(`console: ${m.text().slice(0, 180)}`); });
  page.on('pageerror', (e) => pageErrs.push(`script error: ${e.message.slice(0, 180)}`));
  page.on('requestfailed', (r) => { if (r.url().startsWith(BASE)) pageErrs.push(`request failed: ${r.url().replace(BASE, '')} ${r.failure()?.errorText || ''}`); });
  page.on('response', (r) => {
    const u = r.url();
    if (u.startsWith(BASE) && r.status() >= 400 && new URL(u).pathname !== current) pageErrs.push(`HTTP ${r.status()}: ${u.replace(BASE, '')}`);
  });

  for (const path of pages) {
    current = path;
    pageErrs.length = 0;
    let resp;
    try {
      resp = await page.goto(BASE + path, { waitUntil: 'networkidle0', timeout: 45000 });
    } catch (e) { err('load', `${path} @${vp.tag}: ${e.message.slice(0, 120)}`); continue; }
    const want = path === BOGUS ? 404 : 200;
    if (resp && resp.status() !== want) err('load', `${path}: HTTP ${resp.status()} (expected ${want})`);

    // Scroll the whole page so lazy images and scroll effects run.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
      scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 400));

    const r = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const over = document.documentElement.scrollWidth - vw;
      const describe = (el) => el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + (el.classList.length ? '.' + [...el.classList].slice(0, 2).join('.') : '');
      let offenders = [];
      if (over > 1) {
        offenders = [...document.querySelectorAll('body *')]
          .filter((el) => { const b = el.getBoundingClientRect(); return b.width > 0 && b.right > vw + 1 && getComputedStyle(el).position !== 'fixed'; })
          .slice(0, 4).map(describe);
      }
      const broken = [...document.images].filter((i) => i.complete && i.getAttribute('src') && i.naturalWidth === 0).map((i) => i.getAttribute('src'));
      const anchors = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
      return { over, offenders, broken, csp: window.__csp, h1: document.querySelectorAll('h1').length, ids: [...document.querySelectorAll('[id]')].map((e) => e.id), anchors };
    });

    const where = `${path} @${vp.tag}`;
    for (const v of new Set(r.csp)) err('csp', `${where}: ${v}`);
    for (const e of new Set(pageErrs)) err('errors', `${where}: ${e}`);
    for (const b of new Set(r.broken)) err('images', `${where}: broken image ${b}`);
    if (r.over > 1) err('overflow', `${where}: page is ${r.over}px wider than the screen (${r.offenders.join(', ') || 'source not found'})`);
    if (vp.tag === '1440') {
      if (r.h1 !== 1 && path !== BOGUS) err('h1', `${path}: ${r.h1} <h1> elements (one per page)`);
      idsByPage.set(path, new Set(r.ids));
      for (const href of r.anchors) {
        if (/^(mailto:|tel:|javascript:)/i.test(href)) continue;
        let u;
        try { u = new URL(href, BASE + path); } catch { err('links', `${path}: bad href "${href}"`); continue; }
        if (u.origin !== BASE) continue;
        links.push({ from: path, path: u.pathname.replace(/\/$/, '') || '/', hash: u.hash.slice(1) });
      }
    }
    process.stdout.write(`  ${where}${r.over > 1 || r.csp.length || pageErrs.length || r.broken.length ? '  <- issues' : ''}\n`);
  }
  await page.close();
}
await browser.close();

// ---------- 4. Links and anchors ----------
step('Internal links and anchors');
const routeSet = new Set(Object.keys(routes));
const checked = new Set();
for (const l of links) {
  const key = `${l.from} -> ${l.path}#${l.hash}`;
  if (checked.has(key)) continue;
  checked.add(key);
  if (l.path === l.from) {
    if (l.hash && !idsByPage.get(l.from)?.has(decodeURIComponent(l.hash))) err('anchors', `${l.from} links to its own #${l.hash}, but there is no id="${l.hash}"`);
    continue;
  }
  const isRoute = routeSet.has(l.path);
  if (!isRoute) {
    if (REDIRECTS.has(l.path)) warn('links', `${l.from} links to ${l.path}, which redirects to ${REDIRECTS.get(l.path)}; link to the new URL`);
    else if (!fileFor(l.path)) err('links', `${l.from} links to ${l.path}, which does not exist`);
    continue;
  }
  if (l.hash && idsByPage.has(l.path) && !idsByPage.get(l.path).has(decodeURIComponent(l.hash))) {
    err('anchors', `${l.from} links to ${l.path}#${l.hash}, but that page has no id="${l.hash}"`);
  }
}
console.log(`  ${checked.size} link targets checked`);

// ---------- 5. Facts and wording ----------
step('Facts and wording');
const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d)).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
const visibleText = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

const sources = [];
const ldSeen = new Set();
for (const p of Object.keys(routes)) {
  const f = p === '/' ? join(DIST, 'index.html') : join(DIST, `${p.slice(1)}.html`);
  if (!existsSync(f)) continue;
  const html = readFileSync(f, 'utf8');
  sources.push({ name: p, text: visibleText(html), page: true });
  // Structured data (JSON-LD) is what search engines read; the same block on many pages is checked once.
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    const text = decode(m[1]).replace(/\s+/g, ' ');
    if (ldSeen.has(text)) continue;
    ldSeen.add(text);
    sources.push({ name: `${p} (structured data)`, text, page: false });
  }
}
const publicDocs = ['public/llms.txt', 'public/.well-known/ard.json', ...readdirSync(join(ROOT, 'public/skills')).map((d) => `public/skills/${d}/SKILL.md`)];
for (const f of publicDocs) if (existsSync(join(ROOT, f))) sources.push({ name: f, text: readFileSync(join(ROOT, f), 'utf8').replace(/\s+/g, ' '), page: false });

const ctx = (text, i, len) => '"…' + text.slice(Math.max(0, i - 50), i + len + 50).trim() + '…"';
// A rule stated as a rule ("never state a response time") is not a claim.
const negated = (text, i) => /\b(never|not|no|don't|do not|avoid|without)\b[^.]{0,60}$/i.test(text.slice(Math.max(0, i - 80), i));
function scan(re, area, msg, { only = () => true, level = warn, allow = () => false, rule = false } = {}) {
  for (const s of sources) {
    if (!only(s)) continue;
    const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    let m, n = 0;
    while ((m = g.exec(s.text)) && n < 3) {
      if (allow(m, s) || (rule && negated(s.text, m.index))) continue;
      level(area, `${s.name}: ${msg}: ${ctx(s.text, m.index, m[0].length)}`);
      n++;
    }
  }
}

// Exact identifiers: any value next to these labels that is not the real one is an error.
const FACTS = [
  [/GSA MAS:?\s+([A-Z0-9]{8,})/, '47QSMS25D009Q', 'GSA MAS'],
  [/\bUEI:?\s+([A-Z0-9]{10,})/, 'XQXDN6E33SF4', 'UEI'],
  [/\bCAGE(?: code)?:?\s+([A-Z0-9]{5})\b/, '9KL18', 'CAGE'],
  [/\bNAICS:?\s+(\d{6})\b/, '561612', 'NAICS'],
  [/\bSIN:?\s+(\d{6})\b/, '561612', 'SIN'],
  [/\bWOSB(\d{6})\b/, '250470', 'WOSB number'],
  [/\bWBE(\d{7})\b/, '2303571', 'WBE number'],
];
for (const [re, good, label] of FACTS) {
  scan(re, 'facts', `${label} should be ${label.startsWith('WOSB') ? 'WOSB' : label.startsWith('WBE') ? 'WBE' : ''}${good}`, { level: err, allow: (m) => m[1] === good });
}
scan(/\(?\b\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/, 'facts', 'a phone number other than 719-696-3966', { level: err, allow: (m) => m[0].replace(/\D/g, '') === '7196963966' || /^\d{4}-\d{3}-\d{4}$/.test(m[0]) });
scan(/[\w.+-]+@aressecurity\.co\b/, 'facts', 'an Ares email other than contact@ or careers@', { allow: (m) => ['contact@aressecurity.co', 'careers@aressecurity.co'].includes(m[0].toLowerCase()) });

const dataTs = readFileSync(join(ROOT, 'src/components/capability/data.ts'), 'utf8');
const sam = (dataTs.match(/SAM_ACTIVE_THROUGH\s*=\s*'([^']+)'/) || [])[1];
if (sam) {
  for (const f of publicDocs) {
    const t = readFileSync(join(ROOT, f), 'utf8');
    // Only files that state a SAM date; naming SAM.gov as a place to verify is fine.
    if (/SAM[^.]{0,80}\b(through|until|expires?)\b/i.test(t) && !t.includes(sam)) err('facts', `${f} states a SAM date that is not the current one, "${sam}" (SAM_ACTIVE_THROUGH)`);
  }
}
const ard = join(ROOT, 'public/.well-known/ard.json');
const cat = join(ROOT, 'public/.well-known/ai-catalog.json');
if (existsSync(ard) && existsSync(cat) && readFileSync(ard, 'utf8') !== readFileSync(cat, 'utf8')) err('facts', 'public/.well-known/ard.json and ai-catalog.json differ; they must stay identical');

// Wording the owner has ruled out (DESIGN.md, docs/HANDOFF.md). Warnings: a person decides.
scan(/—/, 'wording', 'em dash (the owner wants none)');
scan(/veteran[- ]led|veteran[- ]owned/i, 'wording', 'the owner is not a veteran', { rule: true });
scan(/\bcleared (officers?|guards?|roles?|personnel|staff)\b|clearance[- ]eligible/i, 'wording', 'no "cleared" staff claims (no FCL)', { rule: true });
// Asking about a site's own clearance requirements is fine; a clearance an officer holds is a Careers-only line.
scan(/\b(TS|top secret|secret|active|security) clearances?\b/i, 'wording', 'clearance requirements belong on Careers only', { only: (s) => s.page && !s.name.startsWith('/careers'), rule: true });
scan(/\bAASC\b/, 'wording', 'Ares is not an AASC member', { rule: true });
scan(/respond within|response times?|reply within|within (one|1|24|48|two|2) (business )?(hours?|days?)/i, 'wording', 'no reply or response times', { rule: true });
scan(/growth paths?|career paths?/i, 'wording', 'career growth paths are not true yet', { rule: true });
scan(/\bbadging\b/i, 'wording', 'Ares does not do badging', { rule: true });
scan(/\b(Buckley|Schriever|Peterson|Fort Carson|Cheyenne Mountain)\b/, 'wording', 'installations stay unnamed', { rule: true });
scan(/\b(emergency response|event security)\b/i, 'wording', 'retired service name', { rule: true });

// ---------- Report ----------
server.close();
console.log('\n' + '='.repeat(60));
if (errors.length) { console.log(`\nErrors (${errors.length}):`); for (const e of errors) console.log('  x ' + e); }
if (warnings.length) { console.log(`\nWarnings (${warnings.length}), read each one:`); for (const w of warnings) console.log('  ! ' + w); }
console.log(`\n${errors.length ? 'FAIL' : 'PASS'}: ${errors.length} errors, ${warnings.length} warnings, ${pages.length} pages at ${VIEWPORTS.map((v) => v.tag).join(' and ')}.`);
process.exit(errors.length ? 1 : 0);
