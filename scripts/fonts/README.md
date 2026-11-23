# The site's fonts: Die Grotesk D Ares Display and Die Grotesk B Ares Text

The site is set in Klim Type Foundry's Die Grotesk (owner, 2026-11-22): style D for headlines, style B
for text, with PP Fraktion Mono for data. The owner licensed Die Grotesk but the font files weren't at
hand, so the two faces the site serves were built from what was: Klim's test font (the variable
`test-die-grotesk-vf-roman.woff2`, letters, digits, and `, - .` only) and the specimen PDF that came with
the purchase (`936831520-DieGrotesk-specimen.pdf`), whose embedded subsets hold the rest of the character
set. They're named after Ares so they never pass for Klim's own files. Use them until the licensed files
turn up, then rebuild from those (below).

## What the site serves (`public/fonts/`)

| File | Family | Weights | What it is |
|---|---|---|---|
| `die-grotesk-d-ares-display-{500,600,700}.woff2` | Die Grotesk D Ares Display | 500, 600, 700 | D with +45 units (0.045em) of tracking built in, so the site's headline tracking (-0.05em, set for Inter Tight) sets at -0.005em, the owner's pick |
| `die-grotesk-b-ares-text-{300..700}.woff2` | Die Grotesk B Ares Text | 300 to 700 | B cut to set like Inter, the text face before: scaled 5% to Inter's x-height, Inter's line metrics, per-weight tracking so running text is as wide as Inter's (within 0.4% on the site's copy), and Inter's digit widths so `ch` measures wrap where they did |

`src/fonts.css` declares them; `index.html` preloads the display 600 and the text 400 and 500. The URLs
carry `?v=2`: bump it whenever a file changes, or browsers keep the old one.

## How they were built

1. `build-die-grotesk-d-ares.py <scratch> <outdir> [A|B|C|D]` instances the test font at the style
   (opsz 6, 18, 30, 42) and each weight (300 to 700), then adds every glyph the PDF's upright subsets
   hold (442 characters in all). The four styles share outlines and differ only in spacing, stepping
   evenly A, B, C, D, so a glyph from another style is moved to the target as C + (C - A)/2 and so on.
   Weight comes from whichever style has the glyph at both weights; where the PDF has only Medium, the
   outline is thickened or thinned by the change in D's own stem. Accented letters use the target's own
   base letter at the exact weight, with the mark placed as in C. `<scratch>` holds `spec/spec.pdf` and
   `die/roman.woff2`. Outputs are in `built/` (D and B, 300 to 700).
2. `track.py built/die-grotesk-d-ares-W.woff2 public/fonts/die-grotesk-d-ares-display-W.woff2 45 "Die Grotesk D Ares Display"`
   for W in 500, 600, 700.
3. `match-inter.py built/die-grotesk-b-ares-W.woff2 public/fonts/die-grotesk-b-ares-text-W.woff2 T "Die Grotesk B Ares Text" ref/inter-latin-var.woff2 W`
   with T = 32.1, 30.6, 21.3, 20.4, 20.1 for W = 300, 400, 500, 600, 700 (measured: the tracking that
   makes the site's copy as wide as Inter's at each weight).

Both `track.py` and `match-inter.py` flatten composite glyphs first, since Die Grotesk builds i and j
from a stem and a zero-width dot and moving only the stem left the dot behind.

Python with `fonttools`, `brotli`, and `pypdf` (a venv: `python3 -m venv .venv && .venv/bin/pip install fonttools brotli pypdf`).

## Check

`python3 scripts/fonts/check-coverage.py` after `npm run build`: every character on every prerendered
page must be in both faces (86 of 86 on 2026-11-22). A new character outside the 442 falls back to the
system font; add it from the PDF if it's there, or ask.

## Known limits of the stand-ins

- No kerning for the characters added from the PDF (the PDF carries none); letters from the test font
  keep its kerning.
- Five fixed weights, not the variable range.
- Characters the PDF has only in Medium are thickened or thinned for the other weights, not drawn.

## When the licensed files turn up

Replace the built faces with Klim's, keeping what the site relies on: the headline face at the same
tracking (add 45 units with `track.py`, or set headlines -0.005em in CSS instead), and the text face at
Inter's size and spacing (`match-inter.py` with fresh measurements, since Klim's B may differ slightly
from these). Keep the family names or update `src/fonts.css`, `index.html`'s preloads, and `--ds-*` /
`--font-*` in `src/dossier.css` and `src/index.css`. Bump `?v=`. Run the coverage check and look at
every hero. The switch that compared the fonts (Inter, plain D, D text cut like Inter, D + B) is in tag
`type-font-switch-option`.
