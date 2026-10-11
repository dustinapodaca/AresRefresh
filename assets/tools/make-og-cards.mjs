// Renders the link preview cards (the picture iMessage, Google Messages, Slack, LinkedIn, and
// Facebook show when someone shares a link) into public/images/og/ (2026-10-11, owner).
// Base: the Ares LinkedIn banner (assets/images-src/og/ares-linkedin-banner.png: the mark on
// glass over towers). Each card adds a dark glass strip along the foot with one line and a
// mono detail line. 1200x630, JPEG. Which page gets which card: "ogCards" in
// src/seo/routes.json. Run from the repo root after changing a line or the banner:
//
//   node assets/tools/make-og-cards.mjs
//
// Card text follows the site's copy rules: no em dashes, no invented claims, facts exact.
import fs from 'fs';
import puppeteer from 'puppeteer';

const CARDS = [
  { file: 'ares-security', line: 'Security officers across Colorado’s Front Range', detail: 'Colorado Springs · Denver · Pueblo' },
  { file: 'services', line: 'Armed and unarmed officers, patrol, and access control', detail: 'Six services · Six industries · Colorado' },
  { file: 'careers', line: 'Careers: security officer roles in Colorado', detail: 'careers@aressecurity.co' },
  { file: 'capability-statement', line: 'Capability statement', detail: 'GSA MAS 47QSMS25D009Q · UEI XQXDN6E33SF4 · CAGE 9KL18' },
  { file: 'teaming', line: 'Teaming and subcontracting for prime contractors', detail: 'WOSB250470 · WBE2303571' },
  { file: 'request-a-quote', line: 'Request a security quote', detail: '719-696-3966 · contact@aressecurity.co' },
];

const b64 = (p) => fs.readFileSync(p).toString('base64');
const banner = `data:image/png;base64,${b64('assets/images-src/og/ares-linkedin-banner.png')}`;
const interTight = `data:font/woff2;base64,${b64('public/fonts/inter-tight-latin-var.woff2')}`;
const plexMono = `data:font/woff2;base64,${b64('public/fonts/ibm-plex-mono-latin-400.woff2')}`;

// The banner is 1288x727; at 1200 wide it is 677 tall. Shifting it up 40px keeps the whole
// glass panel and mark in view above the strip.
const page = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Inter Tight';src:url(${interTight}) format('woff2');font-weight:100 900}
@font-face{font-family:'Plex Mono';src:url(${plexMono}) format('woff2');font-weight:400}
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden;background:#000}
.card{position:relative;width:1200px;height:630px;background:url(${banner}) center -40px / 1200px auto no-repeat}
/* Dark glass strip: a blurred copy of the photo under a canvas tint (headless Chrome does
   not draw backdrop-filter in screenshots, so the blur is real pixels). */
.strip{position:absolute;left:0;right:0;bottom:0;height:146px;overflow:hidden;border-top:1px solid rgba(255,255,255,.14)}
.strip::before{content:"";position:absolute;inset:-40px;background:url(${banner}) center calc(-40px - 484px + 40px) / 1200px auto no-repeat;filter:blur(18px)}
.strip::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.80),rgba(0,0,0,.62))}
.copy{position:absolute;z-index:1;left:56px;right:56px;top:28px}
.line{font:600 44px/1.08 'Inter Tight';letter-spacing:-.03em;color:#eef0f2;white-space:nowrap}
.detail{margin-top:14px;font:400 21px/1 'Plex Mono';color:#c4c8ce;letter-spacing:.01em;font-variant-numeric:tabular-nums slashed-zero}
</style></head><body><div class="card"><div class="strip"><div class="copy">
<div class="line">${c.line}</div><div class="detail">${c.detail}</div></div></div></div></body></html>`;

fs.mkdirSync('public/images/og', { recursive: true });
const browser = await puppeteer.launch();
const p = await browser.newPage();
await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
for (const c of CARDS) {
  await p.setContent(page(c), { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  const over = await p.evaluate(() => { const l = document.querySelector('.line'); return l.scrollWidth - l.clientWidth; });
  if (over > 0) console.warn(`  ${c.file}: the line runs ${over}px past the card; shorten it`);
  const out = `public/images/og/${c.file}.jpg`;
  await p.screenshot({ path: out, type: 'jpeg', quality: 86, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(`${out}  ${Math.round(fs.statSync(out).size / 1024)} KB`);
}
await browser.close();
