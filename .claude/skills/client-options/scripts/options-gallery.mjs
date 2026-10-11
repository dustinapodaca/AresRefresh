// Build a side-by-side gallery of client options (?hero=, ?prime=, ...) from a spec.
// Run from the repo root (project/react) with the dev server up (npm run dev, :5173):
//
//   node .claude/skills/client-options/scripts/options-gallery.mjs <spec.json> [--base http://localhost:5173]
//
// Spec (keep specs in .playwright-mcp/gallery/specs/, gitignored):
// {
//   "name": "round4-options",               // output: .playwright-mcp/gallery/<name>.html + <name>/*.png
//   "title": "Round 4 options",
//   "intro": "What changed and what to look at.",
//   "groups": [{
//     "heading": "Home hero",
//     "intro": "Optional line under the heading.",
//     "page": "/", "param": "hero",
//     "selector": ".ds-hero",                // optional: shoot this element; default is the top of the page
//     "options": [
//       { "value": "b2", "label": "B2", "tag": "default", "copy": "<b>Headline.</b><br>Lead.", "note": "Why it differs." },
//       { "value": "a", "label": "Option A" }
//     ]
//   }]
// }
//
// Captures run with reduced motion so scroll effects sit in their final, fully visible state.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer';

const [specPath, ...rest] = process.argv.slice(2);
if (!specPath) { console.error('Usage: options-gallery.mjs <spec.json> [--base URL]'); process.exit(2); }
const base = rest.includes('--base') ? rest[rest.indexOf('--base') + 1] : 'http://localhost:5173';
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
const galleryDir = join(process.cwd(), '.playwright-mcp/gallery');
const shotDir = join(galleryDir, spec.name);
mkdirSync(shotDir, { recursive: true });

try { await fetch(base); } catch { console.error(`Nothing is answering at ${base}. Start npm run dev first.`); process.exit(2); }

const esc = (s = '') => String(s).replace(/&(?!\w+;|#\d+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const url = (g, o) => {
  const u = new URL(g.page, base);
  u.searchParams.set(g.param, o.value);
  if (g.anchor) u.hash = g.anchor;
  return u.toString();
};

const browser = await puppeteer.launch();
const VIEWS = [{ tag: 'd', width: 1440, height: 900, maxH: 1400 }, { tag: 'm', width: 390, height: 844, maxH: 1700 }];
for (const g of spec.groups) {
  for (const o of g.options) {
    for (const v of VIEWS) {
      const p = await browser.newPage();
      await p.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 2 });
      await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await p.goto(url(g, o), { waitUntil: 'networkidle0' });
      await new Promise((r) => setTimeout(r, 700));
      const file = join(shotDir, `${g.param}-${o.value}-${v.tag}.png`);
      let clip = { x: 0, y: 0, width: v.width, height: v.tag === 'd' ? v.height : 1250 };
      if (g.selector) {
        const box = await p.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { y: r.top + scrollY, h: r.height };
        }, g.selector);
        if (!box) {
          console.error(`\n${g.selector} is not on ${url(g, o)}. Fix the selector in the spec.`);
          await browser.close();
          process.exit(1);
        }
        clip = { x: 0, y: Math.max(0, box.y), width: v.width, height: Math.min(box.h, v.maxH) };
      }
      await p.screenshot({ path: file, clip, captureBeyondViewport: true });
      console.log(`  ${g.param}=${o.value} @${v.width}`);
      await p.close();
    }
  }
}
await browser.close();

// The page, in the gallery's existing style (dark, Inter, the rust tag for the default).
const sections = spec.groups.map((g) => `
<h1 class="group">${esc(g.heading)}</h1>
${g.intro ? `<p class="intro">${esc(g.intro)}</p>` : ''}
${g.options.map((o) => `<section class="opt"><div><h2>${esc(o.label || o.value)} ${o.tag ? `<span class="tag rec">${esc(o.tag)}</span>` : ''}</h2>
${o.copy ? `<p class="copy">${o.copy}</p>` : ''}<img src="${spec.name}/${g.param}-${o.value}-d.png" alt="${esc(o.label || o.value)}, desktop">
<p class="note">${o.note ? esc(o.note) + ' ' : ''}<a href="${url(g, o)}">Open live</a> <span class="tag">?${esc(g.param)}=${esc(o.value)}</span></p></div>
<div class="m"><span class="tag">390px</span><img src="${spec.name}/${g.param}-${o.value}-m.png" alt="${esc(o.label || o.value)}, phone" style="margin-top:8px"></div></section>`).join('\n')}`).join('\n');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(spec.title)}</title>
<style>
:root{--bg:#000;--fg:#eef0f2;--mu:#9aa0a8;--fa:#7d838c;--rule:#1d2025;--rust:#bc6f40}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.55 Inter,system-ui,sans-serif;padding:40px 32px 80px}
h1{font:600 40px/1.05 'Inter Tight',Inter,sans-serif;letter-spacing:-.03em;margin:0 0 8px}h1.group{margin-top:56px;font-size:32px}
.intro{color:var(--mu);max-width:70ch;margin:0 0 32px}
.opt{border-top:1px solid #2c3037;padding:28px 0 56px;display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:32px}
.opt h2{font:600 24px/1.2 Inter,sans-serif;letter-spacing:-.02em;margin:0 0 4px}
.tag{font:13px 'IBM Plex Mono',monospace;color:var(--fa)}.rec{color:var(--rust)}
.copy{margin:10px 0 18px;color:var(--mu);max-width:80ch}.copy b{color:var(--fg);font-weight:600}
img{display:block;width:100%;border:1px solid var(--rule);border-radius:4px}
a{color:var(--fg);text-underline-offset:4px;text-decoration-color:#2c3037}
.note{color:var(--mu);font-size:14px;margin-top:12px}
@media(max-width:900px){body{padding:24px 16px 64px}.opt{grid-template-columns:1fr}.opt .m{max-width:300px}}
</style></head><body>
<h1>${esc(spec.title)}</h1>
${spec.intro ? `<p class="intro">${esc(spec.intro)}</p>` : ''}
${sections}
</body></html>`;
const out = join(galleryDir, `${spec.name}.html`);
writeFileSync(out, html);
console.log(`\nWrote ${out}\nOpen: open "${out}"`);
