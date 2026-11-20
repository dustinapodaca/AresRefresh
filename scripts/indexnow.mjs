/**
 * IndexNow for the DreamHost deploys (2026-11-20). Tells Bing (and through it Copilot), Yandex,
 * Seznam, and Naver which URLs changed, so nobody submits them by hand. The Netlify plugin in
 * netlify/plugins/indexnow only ever ran on Netlify production, which the site never used.
 *
 *   npm run indexnow -- --dry-run         what changed between dist/ and the live site; sends nothing
 *   npm run indexnow                      the same compare, then sends it (dist/ must already be live)
 *   npm run indexnow -- --all             every sitemap URL, for a first run or a full resubmit
 *   npm run indexnow -- --urls a,b        just these URLs
 *   node scripts/indexnow.mjs --prepare   deploy/dreamhost.sh, before the upload: compare, save the list
 *   node scripts/indexnow.mjs --send-pending   deploy/dreamhost.sh, after the upload: send that list
 *
 * What counts as changed, compared with the live site before the upload:
 *   pages  every sitemap <loc> that is new, or whose <lastmod> differs from the live sitemap's. The
 *          lastmod is each page's last real content change (scripts/sitemap.mjs fingerprints the
 *          words, title, description, and JSON-LD), so new asset hashes alone don't count.
 *   files  dist/llms.txt and every dist/files/*.pdf whose SHA-256 differs from the live copy's, or
 *          that is not live yet.
 *
 * The key is public by design: IndexNow fetches https://aressecurity.co/<key>.txt to check the site
 * is ours. It lives in public/<key>.txt (32 hex characters, the file holds only the key).
 *
 * Never fails a deploy: every error is a warning and the exit code is always 0.
 */
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const pendingFile = join(root, '.indexnow-pending.json');
const HOST = 'aressecurity.co';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000;

const args = process.argv.slice(2);
const has = (flag) => args.includes(flag);
const valueOf = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
};
const log = (msg) => console.log(`IndexNow: ${msg}`);

/** The one public/<32 hex>.txt whose content is its own name. */
function readKey() {
  const dir = join(root, 'public');
  for (const name of readdirSync(dir)) {
    const m = name.match(/^([0-9a-f]{32})\.txt$/);
    if (m && readFileSync(join(dir, name), 'utf8').trim() === m[1]) return m[1];
  }
  return null;
}

/** loc -> lastmod for every <url> in a sitemap. */
function parseSitemap(xml) {
  const map = new Map();
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = m[1].match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1];
    const lastmod = m[1].match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/)?.[1] ?? '';
    if (loc) map.set(loc, lastmod);
  }
  return map;
}

async function fetchLive(path, asBuffer = false) {
  const res = await fetch(`${ORIGIN}${path}`, { redirect: 'follow', headers: { 'Cache-Control': 'no-cache' } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${path} on the live site returned HTTP ${res.status}`);
  return asBuffer ? Buffer.from(await res.arrayBuffer()) : res.text();
}

const sha = (buf) => createHash('sha256').update(buf).digest('hex');

/** The URLs whose content differs between dist/ and the live site. */
async function changedUrls() {
  const builtXml = join(dist, 'sitemap.xml');
  if (!existsSync(builtXml)) throw new Error('dist/sitemap.xml is missing; build first');
  const built = parseSitemap(readFileSync(builtXml, 'utf8'));
  const liveXml = await fetchLive('/sitemap.xml');
  const live = liveXml ? parseSitemap(liveXml) : new Map();
  const urls = [];
  for (const [loc, lastmod] of built) if (live.get(loc) !== lastmod) urls.push(loc);

  const files = [];
  if (existsSync(join(dist, 'llms.txt'))) files.push('/llms.txt');
  const filesDir = join(dist, 'files');
  if (existsSync(filesDir)) for (const f of readdirSync(filesDir)) if (f.endsWith('.pdf')) files.push(`/files/${f}`);
  for (const path of files) {
    const liveCopy = await fetchLive(path, true);
    if (!liveCopy || sha(liveCopy) !== sha(readFileSync(join(dist, path)))) urls.push(`${ORIGIN}${path}`);
  }
  return urls;
}

async function submit(key, urlList) {
  if (!urlList.length) {
    log('nothing changed, nothing sent.');
    return;
  }
  const list = urlList.slice(0, MAX_URLS);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList: list }),
  });
  const ok = res.status === 200 || res.status === 202;
  log(`submitted ${list.length} URL${list.length === 1 ? '' : 's'}, HTTP ${res.status}${ok ? '' : ` (not accepted: ${(await res.text()).slice(0, 200)})`}`);
  for (const u of list) console.log(`  ${u}`);
}

function print(urls, what) {
  log(`${urls.length} URL${urls.length === 1 ? '' : 's'} ${what}`);
  for (const u of urls) console.log(`  ${u}`);
}

async function main() {
  const key = readKey();
  if (!key) {
    log('no key file (public/<32 hex>.txt holding its own name); skipped.');
    return;
  }
  const dry = has('--dry-run');

  if (has('--send-pending')) {
    if (!existsSync(pendingFile)) {
      log('no pending list (the compare did not run or failed); nothing sent.');
      return;
    }
    const urls = JSON.parse(readFileSync(pendingFile, 'utf8'));
    rmSync(pendingFile, { force: true });
    await submit(key, urls);
    return;
  }

  let urls;
  if (has('--urls')) {
    urls = (valueOf('--urls') ?? '').split(',').map((u) => u.trim()).filter(Boolean)
      .map((u) => (u.startsWith('http') ? u : `${ORIGIN}${u.startsWith('/') ? '' : '/'}${u}`));
  } else if (has('--all')) {
    const xml = existsSync(join(dist, 'sitemap.xml')) ? readFileSync(join(dist, 'sitemap.xml'), 'utf8') : await fetchLive('/sitemap.xml');
    urls = [...parseSitemap(xml ?? '').keys()];
  } else {
    urls = await changedUrls();
  }

  if (has('--prepare')) {
    writeFileSync(pendingFile, JSON.stringify(urls, null, 2));
    print(urls, dry ? 'would be sent after the upload' : 'to send after the upload');
    if (dry) rmSync(pendingFile, { force: true });
    return;
  }
  if (dry) {
    print(urls, 'would be sent (dry run, nothing sent)');
    return;
  }
  await submit(key, urls);
}

main().catch((err) => {
  console.log(`IndexNow warning (the deploy goes on): ${err.message}`);
});
