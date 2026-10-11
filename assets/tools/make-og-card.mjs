// Renders the link preview card (the picture iMessage, Google Messages, Slack, LinkedIn, and
// Facebook show when someone shares a link) to public/images/og/ares-security.jpg.
// One card for every page, the image only (owner, 2026-10-11): the Ares LinkedIn banner
// (assets/images-src/og/ares-linkedin-banner.png, the mark on glass over towers) scaled to
// 1200 wide and cropped to 1200x630 around the glass panel. Set as `ogImage` in
// src/seo/routes.json. Run from the repo root after replacing the banner:
//
//   node assets/tools/make-og-card.mjs
import fs from 'fs';
import puppeteer from 'puppeteer';

const banner = `data:image/png;base64,${fs.readFileSync('assets/images-src/og/ares-linkedin-banner.png').toString('base64')}`;
// The banner is 1288x727; at 1200 wide it is 677 tall. Shifting it up 32px keeps the glass
// panel centered in the 630px card.
const html = `<!doctype html><html><head><style>*{margin:0}html,body{width:1200px;height:630px;overflow:hidden;background:#000}
.card{width:1200px;height:630px;background:url(${banner}) center -32px / 1200px auto no-repeat}</style></head>
<body><div class="card"></div></body></html>`;

fs.mkdirSync('public/images/og', { recursive: true });
const browser = await puppeteer.launch();
const p = await browser.newPage();
await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await p.setContent(html, { waitUntil: 'load' });
const out = 'public/images/og/ares-security.jpg';
await p.screenshot({ path: out, type: 'jpeg', quality: 86, clip: { x: 0, y: 0, width: 1200, height: 630 } });
console.log(`${out}  ${Math.round(fs.statSync(out).size / 1024)} KB`);
await browser.close();
