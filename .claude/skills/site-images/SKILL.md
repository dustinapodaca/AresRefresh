---
name: site-images
description: How images, the capability statement PDF, and icons work on the Ares site, and an audit that finds broken, stale, or unused images. Use whenever an image is added, replaced, swapped, regraded, or removed (heroes, plates, logos, cert marks, portraits, generated scenes), when generating an image with Nano Banana, when the PDF is re-exported, when the favicon changes, or for page weight, Lighthouse image warnings, or "why is this image blurry/heavy/missing".
---

# Site images

The 2026-10-09 optimization plan (`ASSET-OPTIMIZATION.md`) is done. Images now go through
a pipeline. Code never points at a deployed image file directly.

```
assets/images-src/<original>                 originals, not deployed (19 MB)
        │  python3 -I assets/tools/optimize-images.py     (cwebp + sips)
        ▼
public/images/opt/<slug>-<w>.<hash8>.webp    480 to 2400px WebP, cached for a year
src/lib/images.generated.ts                  manifest: old path -> src, srcSet, width, height
        │  responsive('/images/<old path>', sizes?)   src/lib/responsive.ts
        ▼
<img {...responsive('/images/hero6.jpg')} alt="..." />
```

The keys are the old `/images/...` paths. They are names, not files: `/images/hero6.jpg`
does not exist in `public/`.

## Audit first, audit last

```bash
node .claude/skills/site-images/scripts/image-audit.mjs
```

It's read-only. It fails on a broken image, a manifest key used as a raw URL (`src="/images/..."`,
`url(/images/...)`), a missing pipeline source, or a manifest out of step with
`public/images/opt/`. It warns about images served outside the pipeline, manifest entries
nothing uses, and deployed files nothing names. It also prints the sizes. Run it before and
after any image change.

As of 2026-10-11 the audit is clean (no warnings). `footer-bg.jpg` (dead CSS from the
pre-Dossier footer) and `capabilities-hero.jpg` (the old link preview photo) moved to
`assets/images-unused/` that day.

## Link preview cards

The picture shown when someone shares a link (iMessage, Google Messages, Slack, LinkedIn,
Facebook). Six 1200x630 JPEGs in `public/images/og/`, drawn by
`node assets/tools/make-og-cards.mjs` from the owner's LinkedIn banner
(`assets/images-src/og/ares-linkedin-banner.png`) with a dark glass strip carrying one line
and a mono detail. The lines live in `CARDS` in that script; which page gets which card is
`ogCards` in `src/seo/routes.json` (a `match` covers the path and everything under it; the
rest get the default `ogImage`). They stay plain JPEGs outside the pipeline on purpose, and
keep their names so shared links don't break. Apps cache a link's preview when it is first
shared, so a changed card can take a while to show on old links.

## Add or replace a photo

1. Put the best original in `assets/images-src/` (a full-size master may live in
   `.impeccable/gen/`, gitignored; the script reads `MASTERS/...` sources from there).
2. Add or edit its entry in `PHOTOS` in `assets/tools/optimize-images.py`:
   `{'key': '/images/<path the code uses>', 'source': 'assets/images-src/<file>', 'q': 80}`.
   Quality: 80 for photos, 82 to 84 for PNG originals and fine detail, 76 for noisy images
   under glass. The script drops 6 points at 2000px and up, and never upscales.
   To replace an image in place, keep the key and change only `source`. No code changes.
3. Run `python3 -I assets/tools/optimize-images.py` from the repo root. It wipes and
   rewrites `public/images/opt/`, so every file gets a new hash. Commit the folder and the
   manifest together.
4. In the component: `<img {...responsive('/images/<key>')} alt="..." />`.
   - **Full-bleed heroes** need a measured `sizes` entry in `SIZES` in
     `src/lib/responsive.ts`. They're drawn up to 3.7x the screen width on phones; without it the
     browser picks a file that's too small and the hero goes soft. Add `decoding="sync"` and
     `{...{ fetchpriority: 'high' }}` (the React 18 spelling).
   - A hero that a route preloads is set by `preloadImage` in `src/seo/routes.json` (a
     manifest key; ask before editing). `src/lib/prefetchHeroes.ts` warms it on link hover.
   - Everything else: `loading="lazy" decoding="async"`, and pass `sizes` when the image
     is narrower than the screen (e.g. `'160px'` for the founder portrait).
5. Run the audit, then `npm run build`. Screenshot at 1440 and 390, and measure text contrast
   if type sits on the photo (`.playwright-mcp/` scripts, AA 4.5:1).
6. Record it in `DESIGN.md` (which photo, its grading filter, its position) and in the
   handoff if the owner chose it.

**Logos and cert marks** go in `LOGOS` (filename only, original in `assets/images-src/`).
They come out as one 128px-tall WebP (lossless or q90, whichever is smaller) and are
recolored to white silhouettes in CSS.

**Removing an image:** delete its entry, move the original to `assets/images-unused/`,
rerun the script, and run the audit.

**SVG masks** (`/images/ares-text.svg`) stay as plain files in `public/images/`. That's
correct.

## Grading and placement (DESIGN.md is the authority)

Photos sit on true black (#000). Stock and generated photos are graded down, e.g.
`saturate(0.78) brightness(0.84)`. Full-bleed photos fade into the canvas with CSS masks,
never overlay gradients. Real places get a mono caption; generated scenes never do. Owner
choices on framing (`object-position`, crops per breakpoint) are recorded per page in
DESIGN.md. Read that page's section before touching its image, and change only the
breakpoint you were asked about.

## Generated images

- **Model: Nano Banana 2** (the owner's default). OpenAI only if asked.
  `GEMINI_API_KEY=... python3 -I assets/generated/gemini-image.py --prompt-file <p.txt> --out <img.png> [--ref <page screenshot>]`.
  The key is passed inline only, never written to a file or committed. The handoff lists
  rotating the key that was pasted on 2026-10-08 as pending. About 15 cents an image, so say
  how many you plan to make before running a batch.
- **Only** places, architecture, Colorado landscape, light and texture. **Never** people
  presented as Ares staff, officers or uniforms, branded vehicles, client sites, or anything
  a buyer could read as a real Ares photo. Never caption a generated scene as a real place.
- Pass a screenshot of the target page as `--ref` so the palette matches. Keep the side the
  text sits on quiet and dark, and let the bottom fall to near-black.
- Keep the prompt (`.prompt.txt`) and record (`.prompt.json`) beside the image in
  `assets/generated/`, and add it to that folder's README catalog. That README still says
  "copy it into public/images/". It's out of date: put the chosen original in
  `assets/images-src/` and use the pipeline.

## The capability statement PDF

`public/files/Ares-Security-Capability-Statement-2026.pdf` (1.35 MB). The owner builds it
("I'll do it on my own", 2026-10-10). Keep the path and filename. To shrink a new export
without visible change, keep the original in `assets/files-src/` and run
`python -I assets/tools/optimize-pdf.py assets/files-src/<name>.pdf public/files/<name>.pdf 3`
(needs pikepdf and jpegtran). Then update the size in the Capability Statement hero's spec
line. The PDF's content is still listed for review: "cleared", Buckley, badging, and
Emergency Response, which was retired. The POC block stays generic.

## Icons

`public/favicon-v2.svg` is the source (the mark in #c4c8ce, set up and left on purpose). Rebuild the PNGs,
ICO, Apple touch icon, and manifest with `node assets/tools/make-icons.mjs`.

## Performance context

Lighthouse mobile (2026-10-09, production build): most pages 93 to 96, Home 83, Services 78.
Home and Services trade speed for sharp heroes; smaller hero files would add 10+ points. That's the
owner's call, so offer it and don't just do it. Measure on `npm run build && npx vite preview`, never the
dev server.
