// Image audit for the Ares site. Read-only. Run from the repo root (project/react):
//
//   node .claude/skills/site-images/scripts/image-audit.mjs
//
// Checks that every image the code names goes through the pipeline
// (assets/tools/optimize-images.py -> public/images/opt/ + src/lib/images.generated.ts),
// that the manifest and the files on disk agree, and what is deployed but unused.
// Ends with a size report. Exit code 1 when an image is broken or the manifest is stale.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const MANIFEST = join(ROOT, 'src/lib/images.generated.ts');
const SCRIPT = join(ROOT, 'assets/tools/optimize-images.py');
if (!existsSync(MANIFEST) || !existsSync(SCRIPT)) { console.error('Run from the repo root (project/react).'); process.exit(2); }

const errors = [];
const warnings = [];
const notes = [];

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out); else out.push(p);
  }
  return out;
}
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
const mb = (bytes) => `${(bytes / 1048576).toFixed(1)} MB`;
const dirSize = (dir) => walk(dir).reduce((n, f) => n + statSync(f).size, 0);

// The manifest: key -> { src, srcSet?, width, height }
const mtext = readFileSync(MANIFEST, 'utf8');
const marker = 'IMAGES: Record<string, ImageEntry> = ';
const manifest = JSON.parse(mtext.slice(mtext.indexOf(marker) + marker.length).replace(/;\s*$/, ''));
const keys = new Set(Object.keys(manifest));

// Where the code names images. The manifest itself is not a use.
const codeFiles = [...walk(join(ROOT, 'src')), join(ROOT, 'index.html')]
  .filter((f) => /\.(tsx?|css|html|json)$/.test(f) && f !== MANIFEST);
const IMG = /\/images\/[A-Za-z0-9_./-]+\.(?:jpe?g|png|webp|svg|gif|avif)/g;
const refs = new Map(); // path -> [{ file, line, text }]
for (const f of codeFiles) {
  readFileSync(f, 'utf8').split('\n').forEach((text, i) => {
    for (const m of text.matchAll(IMG)) {
      if (m[0].startsWith('/images/opt/')) continue;
      if (!refs.has(m[0])) refs.set(m[0], []);
      refs.get(m[0]).push({ file: relative(ROOT, f), line: i + 1, text: text.trim() });
    }
  });
}

// 1. Every named image resolves, and photos go through responsive().
const RAW = /src=["'{]+\s*["']?\/images\/|url\(\s*["']?\/images\//;
for (const [path, uses] of refs) {
  const inManifest = keys.has(path);
  const onDisk = existsSync(join(ROOT, 'public', path));
  if (!inManifest && !onDisk) {
    for (const u of uses) errors.push(`${u.file}:${u.line} names ${path}, which is not in the manifest or public/ (broken image)`);
    continue;
  }
  if (inManifest) {
    for (const u of uses) if (RAW.test(u.text)) errors.push(`${u.file}:${u.line} uses ${path} as a raw URL; that file is not deployed. Use responsive('${path}')`);
  } else if (!path.endsWith('.svg') && !path.startsWith('/images/og/')) {
    // SVG masks and the link preview cards (plain JPEGs for crawlers) are meant to be served as is.
    const where = uses.map((u) => `${u.file}:${u.line}`).join(', ');
    warnings.push(`${path} is served as the original file, outside the pipeline (${where})`);
  }
}

// 2. Manifest and public/images/opt agree.
const optDir = join(ROOT, 'public/images/opt');
const optFiles = new Set(existsSync(optDir) ? readdirSync(optDir) : []);
const wanted = new Set();
for (const [key, e] of Object.entries(manifest)) {
  const files = [e.src, ...(e.srcSet ? e.srcSet.split(',').map((s) => s.trim().split(' ')[0]) : [])];
  for (const f of files) {
    const name = f.replace('/images/opt/', '');
    wanted.add(name);
    if (!optFiles.has(name)) errors.push(`manifest entry ${key} points at ${f}, which is missing. Rerun the pipeline`);
  }
  if (!refs.has(key)) warnings.push(`${key} is in the manifest but nothing in src/ uses it (its sizes still deploy)`);
}
for (const f of optFiles) if (!wanted.has(f)) warnings.push(`public/images/opt/${f} is not in the manifest (stale; rerun the pipeline)`);

// 3. The pipeline's sources exist, and every entry is in the manifest.
const py = readFileSync(SCRIPT, 'utf8');
const MASTERS = process.env.MASTERS || join(ROOT, '.impeccable/gen');
for (const m of py.matchAll(/\{'key': '([^']+)', 'source': '([^']+)'(?:[^}]*'fallback': '([^']+)')?/g)) {
  const [, key, source, fallback] = m;
  const resolveSrc = (p) => (p.startsWith('MASTERS') ? p.replace('MASTERS', MASTERS) : join(ROOT, p));
  if (![source, fallback].filter(Boolean).some((p) => existsSync(resolveSrc(p)))) errors.push(`optimize-images.py: no source for ${key} (${source}${fallback ? ` or ${fallback}` : ''}); the script will stop`);
  if (!keys.has(key)) errors.push(`optimize-images.py lists ${key}, but the manifest lacks it. Rerun the pipeline`);
}
const logos = (py.match(/LOGOS = \[([\s\S]*?)\]/) || [, ''])[1].match(/'([^']+)'/g)?.map((s) => s.slice(1, -1)) || [];
for (const l of logos) {
  if (!existsSync(join(ROOT, 'assets/images-src', l))) errors.push(`optimize-images.py: logo source assets/images-src/${l} is missing`);
  if (!keys.has('/images/' + l)) errors.push(`logo /images/${l} is not in the manifest. Rerun the pipeline`);
}

// 4. Deployed files outside the pipeline that nothing names.
const publicText = walk(join(ROOT, 'public')).filter((f) => /\.(html|txt|md|json|xml|webmanifest|css)$/.test(f)).map((f) => readFileSync(f, 'utf8')).join('\n');
const allCode = codeFiles.map((f) => readFileSync(f, 'utf8')).join('\n') + publicText;
for (const f of walk(join(ROOT, 'public/images'))) {
  if (f.startsWith(optDir)) continue;
  const p = '/' + relative(join(ROOT, 'public'), f);
  if (!allCode.includes(p)) warnings.push(`${p} (${kb(statSync(f).size)}) deploys but nothing names it; move it to assets/images-unused/`);
}

// 5. Sizes.
const largest = [...optFiles].map((f) => ({ f, s: statSync(join(optDir, f)).size })).sort((a, b) => b.s - a.s).slice(0, 8);
notes.push(`public/images: ${mb(dirSize(join(ROOT, 'public/images')))} (opt/ ${mb(dirSize(optDir))}, ${optFiles.size} files)`);
notes.push(`largest generated files: ${largest.map((x) => `${x.f.replace(/\.[0-9a-f]{8}\.webp$/, '')} ${kb(x.s)}`).join(', ')}`);
for (const f of walk(join(ROOT, 'public/files'))) notes.push(`${relative(ROOT, f)}: ${kb(statSync(f).size)}`);
if (existsSync(join(ROOT, 'dist'))) notes.push(`dist/: ${mb(dirSize(join(ROOT, 'dist')))} (from the last build)`);
for (const d of ['assets/images-src', 'assets/images-unused']) notes.push(`${d}: ${mb(dirSize(join(ROOT, d)))} (not deployed)`);

console.log(`Image audit: ${refs.size} image paths named in code, ${keys.size} manifest entries\n`);
if (errors.length) { console.log(`Errors (${errors.length}):`); errors.forEach((e) => console.log('  x ' + e)); console.log(''); }
if (warnings.length) { console.log(`Warnings (${warnings.length}):`); warnings.forEach((w) => console.log('  ! ' + w)); console.log(''); }
console.log('Sizes:'); notes.forEach((n) => console.log('  ' + n));
console.log(`\n${errors.length ? 'FAIL' : 'PASS'}: ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
