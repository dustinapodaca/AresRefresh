# Asset optimization — Ares Security

**Current state:** `dist/` ships **21 MB**, of which **18 MB is images** and
1.9 MB is the capability-statement PDF. JS + CSS together are only 404 KB.
Images are ~89% of the deploy.

Vite copies `public/` into `dist/` verbatim, so **every file in
`public/images/` is deployed whether or not any page references it.**

**Two rules that make this drop-in:**

1. **Keep the exact same filenames.** Replace in place in `public/images/`
   and no code changes are needed anywhere.
2. **Do not upscale.** Every "recommended" width below is smaller than the
   current width. Re-exporting at the same size gains nothing.

> Want WebP/AVIF instead? That changes filenames, so it needs `<picture>`
> elements in the components. Tell me and I'll wire that up — but the JPEG
> targets below already remove ~85% of the weight, so it's optional.

---

## 1. Delete first — 6.6 MB that is never served

None of these are referenced anywhere in `src/` or `index.html`. They are
pure deploy weight. The `client-*` logos became unused when the Past
Performance section was removed from the capability statement page.

| File | Size | Note |
|---|---|---|
| `hero1.jpg` | 1218 KB | unused hero variant |
| `about-security.jpg` | 1168 KB | unused |
| `hero4.jpg` | 877 KB | unused hero variant |
| `about-address-bg.jpg` | 839 KB | never wired up |
| `hero5.jpg` | 749 KB | unused hero variant |
| `client-pps.png` | 403 KB | orphaned with Past Performance |
| `hero2.jpg` | 379 KB | unused hero variant |
| `hero3.jpg` | 344 KB | unused hero variant |
| `client-spaceforce.png` | 292 KB | orphaned |
| `client-natural-grocers.png` | 227 KB | orphaned |
| `client-airforce.png` | 83 KB | orphaned |
| `gsa-pdf-logo.png` | 71 KB | used only by the old hi-fi PDF file |
| `client-army-corps.png` | 31 KB | orphaned |
| `client-olgoonik.png` | 15 KB | orphaned |
| `gsa-logo.png` | 12 KB | superseded by `cert-gsa-*` |
| `cert-gsa.png` | 5 KB | superseded |

**Keep these somewhere else** (an archive folder outside `public/`) if you
may want the client logos back — the capability-statement PDF may still
need them.

---

## 2. Full-bleed backgrounds — resize to 1920px wide max

These render edge-to-edge behind text, usually under a dark gradient
overlay, so they tolerate firm compression. **JPEG quality 72–78.**

| File | Now | Current px | → Resize to | Target |
|---|---|---|---|---|
| `hero6.jpg` | 1316 KB | 2400×1600 | **1920×1280** | ~180 KB |
| `capabilities-hero.jpg` | 1161 KB | 2255×1864 | **1920×1587** | ~200 KB |
| `careers-hero.jpg` | 1053 KB | 2390×1454 | **1920×1168** | ~170 KB |
| `careers-apply.jpg` | 940 KB | 2400×1600 | **1920×1280** | ~160 KB |
| `about-banner.jpg` | 730 KB | 2000×1391 | **1600×1113** | ~140 KB |
| `about-hero.jpg` | 545 KB | 2400×1600 | **1920×1280** | ~150 KB |
| `footer-bg.jpg` | 499 KB | 1999×1681 | **1600×1345** | ~130 KB |
| `contact-hero.jpg` | 432 KB | 1400×805 | keep 1400×805 | ~120 KB |
| `capability-hero.jpg` ⭐ | 410 KB | 2400×1600 | **1920×1280** | ~140 KB |
| `woman-owned-bg.jpg` | 344 KB | 2400×1600 | **1600×1067** | ~90 KB |
| `cap-cta-bg.jpg` | 251 KB | 2400×1600 | **1600×1067** | ~90 KB |
| `why-stages-bg.jpg` | 161 KB | 2400×1600 | **1600×1067** | ~80 KB |

⭐ **`capability-hero.jpg` is the highest-leverage file on the site** — it is
now the preloaded hero for **10 pages** (the capability statement plus all
8 new location/service pages). Every KB saved here is saved ten times.

---

## 3. Content and card images — resize to display size

These sit in cards at roughly half the viewport or smaller, so they need far
fewer pixels than a full-bleed hero. **JPEG quality 78–82** (these are looked
at directly, so keep a little more quality).

| File | Now | Current px | → Resize to | Target |
|---|---|---|---|---|
| `capabilities-card.jpg` ⚠️ | 1168 KB | 1408×736 | **1200×627** | ~120 KB |
| `about-sunset.jpg` | 432 KB | 1400×805 | **1200×690** | ~110 KB |
| `careers-philosophy.jpg` | 365 KB | 1184×880 | **1000×743** | ~100 KB |
| `mission-vehicle.jpg` | 230 KB | 750×842 | keep 750×842 | ~90 KB |
| `officer-portrait.jpg` | 227 KB | 992×1040 | **900×944** | ~90 KB |
| `careers-team.jpg` | 227 KB | 1184×880 | **1000×743** | ~85 KB |
| `matrix-commercial.jpg` | 226 KB | 1000×667 | **900×600** | ~70 KB |
| `backbone-officer.jpg` | 176 KB | 733×900 | keep 733×900 | ~80 KB |

⚠️ **`capabilities-card.jpg` is the worst ratio on the site**: 1.1 MB for an
image displayed in a card at ~700px wide. It is over-compressed-for-size in
the wrong direction — big file, modest dimensions. Re-export fixes it.

The other `matrix-*.jpg` files are already under 150 KB and are fine.

---

## 4. The PDF — 1.9 MB

`public/files/Ares-Security-Capability-Statement-2026.pdf` is 1.9 MB. It is a
download rather than a page asset, so it does not affect Core Web Vitals, but
it is a big file for a 3-page document. Exporting with downsampled images
(150–200 DPI) typically lands it under 500 KB.

---

## 5. Expected result

| | Before | After |
|---|---|---|
| `public/images/` | 18 MB | **~2.3 MB** |
| PDF | 1.9 MB | ~0.5 MB |
| **Total deploy** | **21 MB** | **~3.2 MB** |

That is roughly an **85% reduction**, and it lands directly on Largest
Contentful Paint — the Core Web Vital that most affects both ranking and
bounce rate on mobile.

---

## Appendix — commands

**macOS, no installs** (resize in place; re-encode quality separately):

```bash
cd public/images
# Resize the big backgrounds to 1920px on the long edge
sips -Z 1920 hero6.jpg careers-apply.jpg about-hero.jpg capability-hero.jpg
sips -Z 1920 capabilities-hero.jpg careers-hero.jpg
sips -Z 1600 about-banner.jpg footer-bg.jpg woman-owned-bg.jpg cap-cta-bg.jpg why-stages-bg.jpg
sips -Z 1200 capabilities-card.jpg about-sunset.jpg
sips -Z 1000 careers-philosophy.jpg careers-team.jpg
sips -Z 900  matrix-commercial.jpg officer-portrait.jpg
```

**With ImageMagick** (resize + quality in one pass, better results):

```bash
cd public/images
for f in hero6 capabilities-hero careers-hero careers-apply about-hero capability-hero; do
  magick "$f.jpg" -resize 1920x -quality 76 -strip -interlace Plane "$f.jpg"
done
for f in about-banner footer-bg woman-owned-bg cap-cta-bg why-stages-bg; do
  magick "$f.jpg" -resize 1600x -quality 76 -strip -interlace Plane "$f.jpg"
done
for f in capabilities-card about-sunset; do
  magick "$f.jpg" -resize 1200x -quality 80 -strip -interlace Plane "$f.jpg"
done
for f in careers-philosophy careers-team; do
  magick "$f.jpg" -resize 1000x -quality 80 -strip -interlace Plane "$f.jpg"
done
for f in matrix-commercial officer-portrait; do
  magick "$f.jpg" -resize 900x -quality 80 -strip -interlace Plane "$f.jpg"
done
for f in mission-vehicle backbone-officer contact-hero; do
  magick "$f.jpg" -quality 80 -strip -interlace Plane "$f.jpg"
done
```

`-strip` removes EXIF (often tens of KB); `-interlace Plane` makes JPEGs
progressive, which renders a low-fi pass sooner and improves perceived LCP.

**Verify afterwards:**

```bash
du -sh public/images          # expect ~2-3 MB
npm run build && npm run check:seo
```
