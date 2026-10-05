---
version: 2
name: Ares Security — field document system
description: "Ares Security's web design system, derived from the Mobbin research in docs/inspiration.md (Atlas, Superpower, Giga, Locomotive, basement.studio, Nite Riot, Samara, Attio, Framer). The page is a technical document on a warm charcoal canvas: a visible frame of full-height column lines carries the reading rail, proof is set as ledgers whose columns are the frame's columns, photographs sit square inside the frame, and a single bronze accent (sampled from the hero's copper glass) marks progress, annotations, and links. Replaces the Framer-derived system (archived at .claude/design-passes/framer-system/DESIGN.md)."

colors:
  canvas: "#121110"        # warm charcoal (Atlas), the one page surface
  surface: "#1a1917"       # glass fallback, rare lift
  hairline: "#2c2a27"      # frame lines, ledger rules, image edges
  ink: "#f3f0ea"           # warm off-white (Superpower), headings and values
  ink-muted: "#a29d95"     # the only secondary text tone
  bronze: "#8b4920"        # deep rust; glows only
  bronze-light: "#d08a5a"  # the accent: links, focus, active rail mark, progress, markers

typography:
  display:      { fontFamily: "Inter Tight", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 0.96 }
  display-xxl:  { fontSize: "clamp(44px, 7.6vw, 116px)" }
  display-lg:   { fontSize: "clamp(34px, 4.2vw, 60px)" }
  display-md:   { fontSize: "clamp(26px, 2.6vw, 38px)", fontWeight: 500 }
  body:         { fontFamily: Inter, fontSize: 16px-18px, lineHeight: 1.5 }
  data:         { fontFamily: "IBM Plex Mono", fontSize: 15px-18px, fontVariantNumeric: tabular-nums }
  annotation:   { fontFamily: "IBM Plex Mono", fontSize: 11px, letterSpacing: "0.08em", textTransform: uppercase }

frame:
  columns: "220px repeat(3, 1fr)"   # index column (rail) + three content columns
  container: 1320px, 28px gutters
  lines: "1px hairline at every column boundary, full document height, desktop only"

rounded:
  photo: 0px        # photographs are square, set inside the frame
  button: 9999px    # pills (owner-approved), the only rounded control
  glass: 16px       # the one glass panel at the close

spacing:
  base: 4px
  cell: 28px        # content sits 28px off every frame line
  beat-tight: 48px
  beat: 96px
  beat-open: 160px
---

## Overview

Ares sells to people who verify before they call. The page reads like a field document:
a warm charcoal sheet ruled by a visible frame, numbers set as data, photographs pinned
inside the frame, and one bronze accent that marks where you are and what you can act on.

The system comes from patterns, not brands (see `docs/inspiration.md`):
- **Atlas:** full-height frame lines through every section; square photos inside them;
  a warm charcoal canvas instead of pure black.
- **Superpower:** a full-bleed photograph with proof along the bottom edge, square
  annotation markers with small uppercase labels, a warm off-white for type.
- **Giga:** a warm horizon glow at the bottom of a dark field.
- **Locomotive / basement.studio:** dense ledgers whose columns line up, giant type
  separated by rules.
- **Samara:** one line threading numbered steps.
- **Attio:** a pull quote beside a narrow attribution column.
- **Framer:** card-less columns, one color for every standalone link.

## The flow principles (non-negotiable)

1. **One continuous surface.** Canvas from header to footer. No background bands, no
   section dividers, almost no cards. Group with type, spacing, and hairlines.
2. **A thread through the page.** The frame's first line carries the reading rail
   (01 Verify, 02 Staffing, 03 Coverage, 04 Company, 05 Contact); its progress fills in
   bronze. On mobile the thread is a slim bar under the header.
3. **Proof as a ledger.** One document table, columns locked to the frame, thin rules,
   mono numbers. Cities are a typographic list, divisions are frame cells, never boxes.
4. **Elements cross boundaries.** The hero photograph runs under the opening of the
   ledger; the measured figure hangs into the quote; a full-bleed photograph spans the
   turn into the company section with the next headline crossing its edge.
5. **Varied rhythm.** Dense data, open quote, pinned narrative, giant list, full-bleed
   image, tight panels, glow. Spacing is deliberately uneven.
6. **Copy hands off.** Each section's last line sets up the next headline: who we are →
   proof → how we staff → where → join us → contact.
7. **Scroll-driven continuity.** One or two pinned moments (the staff photo holds while
   the steps advance). CSS `animation-timeline` only, static by default.

## Colors

- **Canvas `#121110`** is the only surface. Dark only.
- **Ink `#f3f0ea` / muted `#a29d95`**: the whole text hierarchy.
- **Hairline `#2c2a27`**: frame lines, ledger rules, image edges.
- **Bronze-light `#d08a5a`** is the single accent: links, focus rings, the active rail
  mark, progress fills, annotation markers. 5:1 on canvas. Never a fill for large areas.
- **Bronze `#8b4920`** appears only as light (the horizon glow behind the close).
- No blue. No other hue.

## Typography

- **Display: Inter Tight 600**, tight tracking (-0.035em), leading 0.96 to 1.05.
  Reduce size before loosening tracking.
- **Body: Inter**, with `cv01 cv05 cv09 cv11 ss03`. Measure 45 to 65ch.
- **Data: IBM Plex Mono**, tabular numerals: identifiers, phone, figures, rail marks,
  step numbers.
- **Annotation: Plex Mono 11px uppercase, +0.08em**, used only for markers pinned on
  photographs and frame labels. Never above a heading (no eyebrows or kickers).

## Layout

- **The frame:** `220px | 1fr | 1fr | 1fr` inside a 1320px container. Content cells sit
  28px off each line. The index column holds the rail; headings and content start at the
  second column. Desktop shows the lines; mobile drops them and keeps the bar.
- **Hero:** full viewport. The photograph sits under the nav with a black gradient from
  the bar, the headline spans the frame, the subtext sits in columns 3 and 4, and a
  proof strip along the bottom edge is split by the frame lines.
- **Ledger:** group, item (with detail beneath), number: one per frame column.
- **Photographs:** square edges, hairline border inside the column; full-bleed images
  fade into the canvas and keep the frame lines drawn over them.

## Shapes

- Buttons: full pill (`.pill`), 14px / 500. White primary, flat canvas secondary with a
  lit hairline edge. Only "Request a Quote" carries an arrow.
- Glass: once, the contact panel over the bronze glow, 16px radius, solid fallback.
- Markers: a 7px square outline plus an annotation label on a canvas/80 backing.

## Motion (4 to 6 moments)

- Rail progress (bronze) along the first frame line.
- Hero photograph recedes as the ledger rises over it.
- Step line fills in bronze along the frame line while the staff photo is pinned.
- Step headings brighten as they pass (floor 0.72).
- Press (`scale(0.97)`, 160ms) and arrow nudges (hover-capable pointers only).
- Easing `cubic-bezier(0.23, 1, 0.32, 1)`; linear for scroll-linked progress. Everything
  is static under `prefers-reduced-motion: reduce` or without scroll timelines.

## Do's and don'ts

**Do**
- Keep every fact exact: GSA MAS 47QSMS25D009Q, SIN/NAICS 561612, UEI XQXDN6E33SF4,
  CAGE 9KL18, WOSB250470, WBE2303571, founded 2021 in Colorado Springs, 719-696-3966.
- Write plain, natural copy. No em-dashes. No slogans.
- Pair proof with a way to verify it.

**Don't**
- No light mode, background bands, section dividers, or card grids.
- No gradient text, glow shadows, or decorative glass (one panel only).
- No invented statistics, clients, quotes, or response times. No client logos.
- No patrol-vehicle photography on Home.
