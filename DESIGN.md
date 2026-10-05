---
version: 1
name: Ares Security — dark document system
description: "Ares Security's web design system. Adapted from the Framer design analysis (archived at .claude/design-passes/pass-2/DESIGN-framer.md) and fitted to the Ares brand: a near-black canvas, white display type with hard negative tracking, white pill CTAs, one blue signal for links and focus, and IBM Plex Mono for every contract number, certification, and measured figure, so proof reads like a spec sheet. Home is one continuous long-form document, not a stack of components."

colors:
  primary: "#ffffff"        # pill CTAs, display type, emphasized body
  on-primary: "#090909"
  ink: "#ffffff"
  ink-muted: "#999999"      # the only secondary text tone (binary hierarchy)
  canvas: "#090909"         # the one page surface, edge to edge
  surface-1: "#141414"      # secondary pill, rare lifted surface
  surface-2: "#1c1c1c"      # pressed/hover lift on secondary pill
  hairline: "#262626"       # every rule, table row, and image edge
  signal: "#0099ff"         # links, focus rings, selection only; never a fill

typography:
  display-xl:   { fontFamily: Inter, fontSize: "clamp(44px, 6.4vw, 92px)", fontWeight: 600, lineHeight: 0.98, letterSpacing: "-0.045em" }
  display-lg:   { fontFamily: Inter, fontSize: "clamp(34px, 4.2vw, 60px)", fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.04em" }
  display-md:   { fontFamily: Inter, fontSize: "clamp(26px, 2.6vw, 38px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.03em" }
  headline:     { fontFamily: Inter, fontSize: 22px, fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" }
  body-lg:      { fontFamily: Inter, fontSize: 18px, fontWeight: 400, lineHeight: 1.5, letterSpacing: "-0.01em" }
  body:         { fontFamily: Inter, fontSize: 16px, fontWeight: 400, lineHeight: 1.55 }
  caption:      { fontFamily: Inter, fontSize: 13px, fontWeight: 500, lineHeight: 1.3 }
  button:       { fontFamily: Inter, fontSize: 15px, fontWeight: 500, lineHeight: 1, letterSpacing: "-0.01em" }
  data:         { fontFamily: "IBM Plex Mono", fontSize: 15px, fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.01em", fontVariantNumeric: tabular-nums }
  data-figure:  { fontFamily: "IBM Plex Mono", fontSize: "clamp(96px, 15vw, 220px)", fontWeight: 400, lineHeight: 0.85, letterSpacing: "-0.06em" }
  rail:         { fontFamily: "IBM Plex Mono", fontSize: 12px, fontWeight: 400, lineHeight: 1.3, letterSpacing: "0.02em" }

rounded:
  image: 15px      # photographs that sit inside the column
  pill: 9999px     # every button
  bleed: 0px       # full-bleed photographs

spacing:
  base: 4px
  beat-tight: 48px     # between related beats inside a section
  beat: 96px           # default section turn
  beat-open: 160px     # chapter turns and the open quote
---

## Overview

Ares sells to people who verify before they call: federal contracting officers,
facility managers, procurement teams. The site behaves like the documents they already
trust. One near-black canvas runs from the header to the footer. White display type
states the argument; a monospace face carries every number that can be checked.

What came from Framer: the canvas and surface values, the white pill as the only primary
CTA shape, display type pulled tight, Inter's character variants in body type, and a
single blue reserved for links and focus.

What is Ares's own:
- **Proof as a ledger.** Contract, registration, and certification numbers live in one
  document-style table: hairline rows, a quiet label column, values in IBM Plex Mono with
  tabular numerals. Never a grid of tiles.
- **Measured figures, not slogans.** "<1%" missed shifts is set in mono at figure scale
  with its source period beside it.
- **A running document rail.** Home carries a thin margin rail with section reference
  marks (01 Verify, 02 Staffing, 03 Coverage, 04 Careers, 05 Contact) that tracks the
  reader, like a technical spec. The marks carry real wayfinding, which is why numbers
  are allowed here and nowhere else.
- **Photography instead of gradient spotlight cards.** Framer's magenta/violet/orange
  spotlight cards are retired: they read startup-playful for a federal contractor. Real
  staff and patrol photography, darkened into the canvas, does the atmospheric work.
- **The Ares mark** (`/ares-logo.svg`) and wordmark (`/images/ares-text.svg`) always
  render white on the canvas. No other brand color exists.

## Colors

- **Canvas `#090909`** is the only page surface. No background bands, no light
  interludes, no section fills. Dark only.
- **Ink `#ffffff` / Ink muted `#999999`** is the whole text hierarchy. No third gray.
- **Hairline `#262626`** draws every rule, table row, and image edge.
- **Surface 1 / 2 (`#141414` / `#1c1c1c`)** exist for the secondary pill and its pressed
  state. Avoid them as section or card fills.
- **Signal `#0099ff`** marks links, focus rings, and text selection. Never a background
  or button fill. One chromatic accent, total.

## Typography

- **Display:** Inter 600 (Framer's GT Walsheim substitute) with tracking that tightens
  as size grows: -0.045em at display-xl, -0.04em at display-lg, -0.03em at display-md.
  Reduce size before loosening tracking. Never exceed ~6rem.
- **Body:** Inter with `cv01 cv05 cv09 cv11 ss03` enabled. Measure 50–70ch.
- **Data (IBM Plex Mono):** contract and certification numbers, federal identifiers,
  phone numbers, measured figures, and rail marks. Tabular numerals. Mono is for data
  only, never as a "technical" costume on prose or headings.
- No eyebrows or kickers above headings. Headings carry their own weight.

## Layout

- **One continuous page.** Sections hand off: each section's closing line sets up the
  next headline, so the headlines read as one argument.
- **Group with type, spacing, and hairlines, not boxes.** Cards only where a photo and its
  caption form one link (the "Get to know Ares" panels), and even then without fills.
- **Varied rhythm.** Dense data → open quote → full-bleed photo → tight list. Section
  spacing is deliberately uneven (`beat-tight` / `beat` / `beat-open`).
- **Cross-boundary elements.** Full-bleed photographs span the turn between two
  sections, and display type or figures overlap a section's edge.
- **Container:** 1320px max, 28px gutters. On desktop the content column sits right of
  the 180px rail.

## Elevation & depth

Flat. Depth comes from photography fading into the canvas and from type scale, not from
shadows. Hairlines carry structure.

## Shapes

- Buttons: full pill. Primary is white on canvas; secondary is surface-1 with white text.
  Minimum 44px tall.
- Photos inside the column: 15px radius with a hairline edge. Full-bleed photos: square
  edges, faded into the canvas top and bottom.
- Icons: authored SVG arrows (1.5px stroke, round caps). No Unicode glyphs as icons.

## Motion

Four to six moments per page, all fast and crisp. No bounce.

- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` for state and feedback; linear for
  scroll-linked progress.
- Feedback: pills press to `scale(0.97)` over 160ms; link arrows nudge 3px on hover
  (hover-capable pointers only).
- Scroll-driven effects use CSS `animation-timeline` inside
  `@supports (animation-timeline: view())`. The default, unsupported, and
  `prefers-reduced-motion: reduce` states are static and fully visible.
- Content is never hidden while scrolling. The lowest opacity any text reaches is 0.62.

## Browser surfaces

Selection uses signal at 35% alpha. Scrollbars, caret, and focus rings are themed from
the palette. The page sets `color-scheme: dark` so native controls match.

## Do's and don'ts

**Do**
- Keep every fact exact: GSA MAS 47QSMS25D009Q, SIN/NAICS 561612, UEI XQXDN6E33SF4, CAGE
  9KL18, WOSB250470, WBE2303571, founded 2021 in Colorado Springs, 719-696-3966.
- Write plain, natural copy. No em-dashes. No slogans.
- Pair every proof element with a way to verify it (the GSA number links to eLibrary).

**Don't**
- Don't add a light mode, background bands, or boxed card grids.
- Don't use gradient spotlight cards, glass, gradient text, or glow shadows.
- Don't use signal blue as a fill.
- Don't invent statistics, clients, quotes, or response times. Don't show client logos
  (removed by the owner on 2026-09-01).
