// Renders the tab and home-screen icons from public/favicon-v2.svg (2026-10-09):
// favicon-v2-48/192/512.png and the ICO (16, 32, 48, 64) keep the rounded black square with
// transparent corners; apple-touch-icon-v2.png (180) is a full black square, since iOS rounds
// it itself. Run after changing the SVG: node assets/tools/make-icons.mjs
// The mark is placed up and left of the box's center on purpose (owner, 2026-10-09): it is
// set to sit inside the circle that launchers and some browsers crop icons to. Keep the SVG's
// translate(82.19 75.00).
import puppeteer from 'puppeteer';
import fs from 'fs';

const svg = fs.readFileSync('public/favicon-v2.svg', 'utf8');
const square = svg.replace(/rx="96" ry="96"/, 'rx="0" ry="0"');
const b = await puppeteer.launch();
const p = await b.newPage();

async function render(source, size) {
  await p.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  await p.setContent(`<html><body style="margin:0;background:transparent"><img src="data:image/svg+xml;base64,${Buffer.from(source).toString('base64')}" width="${size}" height="${size}" style="display:block"></body></html>`);
  await p.evaluate(() => document.images[0].decode());
  return p.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
}

for (const s of [48, 192, 512]) fs.writeFileSync(`public/favicon-v2-${s}.png`, await render(svg, s));
fs.writeFileSync('public/apple-touch-icon-v2.png', await render(square, 180));

// ICO with PNG-encoded images (supported by every current browser and Windows).
const sizes = [16, 32, 48, 64];
const pngs = [];
for (const s of sizes) pngs.push(await render(svg, s));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
const dir = Buffer.alloc(16 * sizes.length);
let offset = 6 + dir.length;
sizes.forEach((s, i) => {
  const o = i * 16;
  dir.writeUInt8(s, o); dir.writeUInt8(s, o + 1); dir.writeUInt8(0, o + 2); dir.writeUInt8(0, o + 3);
  dir.writeUInt16LE(1, o + 4); dir.writeUInt16LE(32, o + 6);
  dir.writeUInt32LE(pngs[i].length, o + 8); dir.writeUInt32LE(offset, o + 12);
  offset += pngs[i].length;
});
fs.writeFileSync('public/favicon.ico', Buffer.concat([header, dir, ...pngs]));
await b.close();
console.log('icons written');
