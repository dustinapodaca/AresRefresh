---
name: Ares Security
description: A dark, documented record of a federal security contractor, read top to bottom like a dossier.
colors:
  canvas: "#0a0b0d"
  ink: "#eef0f2"
  ink-muted: "#9aa0a8"
  ink-faint: "#7d838c"
  hairline: "#1d2025"
  hairline-strong: "#2c3037"
  rust: "#bc6f40"
  rust-deep: "#8b4920"
typography:
  # Typography adopted from v10 (tag home-v10-mobbin-redesign), owner request 2026-10-04.
  display-xl:
    fontFamily: "'Inter Tight', Inter, system-ui, sans-serif"
    fontSize: "clamp(44px, 6vw, 88px)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-0.05em"
  display-lg:
    fontFamily: "'Inter Tight', Inter, system-ui, sans-serif"
    fontSize: "clamp(34px, 4.2vw, 60px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  display-md:
    fontFamily: "'Inter Tight', Inter, system-ui, sans-serif"
    fontSize: "clamp(26px, 2.6vw, 38px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  city:
    fontFamily: "'Inter Tight', Inter, system-ui, sans-serif"
    fontSize: "clamp(36px, 6vw, 88px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "22px (steps 24px, 28px desktop)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px (steps 17px)"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "'cv01', 'cv05', 'cv09', 'cv11', 'ss03'"
  small:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px (labels 13px)"
    fontWeight: 400
    lineHeight: 1.45
  data:
    fontFamily: "'IBM Plex Mono', ui-monospace, Menlo, monospace"
    fontSize: "15px, 18px desktop (ledger values 17px)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
    fontFeature: "'tnum' 1, 'zero' 1"
  figure:
    fontFamily: "'IBM Plex Mono', ui-monospace, Menlo, monospace"
    fontSize: "clamp(96px, 11vw, 160px)"
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: "-0.06em"
  phone:
    fontFamily: "'IBM Plex Mono', ui-monospace, Menlo, monospace"
    fontSize: "30px, 44px from 640px"
    fontWeight: 400
    letterSpacing: "-0.01em"
  mark:
    fontFamily: "'IBM Plex Mono', ui-monospace, Menlo, monospace"
    fontSize: "14px rail, 12px running head and footer"
    fontWeight: 400
    letterSpacing: "0.02em (footer column titles: uppercase, 0.1em)"
rounded:
  none: "0px"
  hair: "2px"
  photo: "4px"
spacing:
  gutter: "clamp(1.25rem, 3vw, 2rem)"
  beat-tight: "clamp(3.5rem, 6vw, 5rem)"
  beat: "clamp(5.5rem, 10vw, 8.5rem)"
  beat-open: "clamp(8rem, 16vw, 13rem)"
  rail: "168px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.hair}"
    height: "48px"
    padding: "0 22px"
    typography: "{typography.small}"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.canvas}"
  button-quiet:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hair}"
    height: "48px"
    padding: "0 4px"
  ledger-row:
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    padding: "18px 0"
  rail-mark:
    textColor: "{colors.ink-faint}"
    typography: "{typography.mark}"
  rail-mark-active:
    textColor: "{colors.ink}"
---

# Design System: Ares Security

## Overview

**Creative North Star: "The Dossier"**

The Ares site reads like the file a contracting officer builds on a vendor: one dark
sheet, read top to bottom, where every claim has a number beside it and every number
has a place to check it. The page is a continuous document, not a stack of panels. Type,
spacing, and hairlines do all of the grouping. Photographs are real Ares people and
Colorado places, set like exhibits.

The tone is precise and calm. It borrows the discipline of a technical specification
(label column, mono values, running section marks) and the pacing of long-form
editorial (big open quotes, a pinned passage, photographs that cross a turn in the
story). It is never luxury and never startup-playful: no gradients for decoration, no
glass, no bounce.

This system was written fresh for the clean-slate redesign (2026-10-04) from the brief,
PRODUCT.md, and the Mobbin board in `docs/inspiration.md`. It replaces nothing in
`_archive/`, which is not a design reference.

**Key Characteristics:**
- One blue-black canvas from header to footer. No bands, no fills, no dividers.
- Three faces with fixed jobs: Inter Tight states, Inter explains, Plex Mono proves.
- Proof as a ledger: label column, mono values, a verification route on every row.
- A running document rail (01 Verify to 05 Contact) on desktop; a running head on mobile.
- Uneven rhythm on purpose: dense, open, image, tight.
- Square-shouldered controls (2px corners). Nothing is a pill.

## Colors

A cool, nearly colorless palette with one warm light source.

- **Canvas `#0a0b0d`** (blue-black) is the only page surface, everywhere, including the
  header, the mobile menu, and the footer.
- **Ink `#eef0f2`** for headlines, values, and primary text.
- **Ink muted `#9aa0a8`** for body copy, ledger labels, and secondary links (7.4:1).
- **Ink faint `#7d838c`** for captions, rail marks at rest, and source notes. Never
  below 12px (4.9:1).
- **Hairline `#1d2025`** draws ledger rows, list rules, and photo edges.
- **Hairline strong `#2c3037`** for the one rule that must read (ledger group heads, the
  rail track, focused inputs).
- **Rust `#bc6f40` / rust deep `#8b4920`** is light, not paint. It was sampled from the
  copper glass in the hero photograph. It is used for: the closing horizon glow, the
  active rail tick, focus rings, and text selection (40% alpha). Never a button fill,
  never a text color for body copy, never a background block.

Links are ink with a 1px underline in hairline strong, offset 4px; on hover the
underline turns ink. There is no link blue.

## Typography

Adopted from v10 (tag `home-v10-mobbin-redesign`) at the owner's request on 2026-10-04;
only the type came over, not that version's layout or colors. The hero and Contact
headlines, the figure, and the city list were then scaled down on desktop (owner); mobile
sizes are unchanged.

- **Display: Inter Tight 600**, very tight (-0.05em at display-xl and the city list,
  -0.04em at display-lg, -0.03em at display-md, which drops to weight 500). Leading 0.94
  to 1.15. Reduce size before loosening tracking.
  - display-xl: the hero headline (two lines on desktop, running over the photo's faded
    edge) and the Contact headline.
  - display-lg: section headlines (Verify, Staffing, Careers).
  - display-md: the Coverage headline.
  - city: the three city rows.
- **Text: Inter** with `cv01 cv05 cv09 cv11 ss03`.
  - Sub-heads (ledger groups, staffing steps, divisions heading) are
    Inter 600 at 22 to 28px, -0.02em.
  - The pull quote is Inter 500 at display-md size.
  - Lead and intro paragraphs 18px; body 16px (steps 17px); labels 13 to 15px.
  - Hand-off lines 20px / 500. Links 15px / 500. Nav 14px / 400; buttons 14px / 500.
- **Data: IBM Plex Mono 400** with tabular, slashed-zero numerals: identifiers, phone
  numbers, the measured figure, rail marks, and the footer's column titles and legal
  line (uppercase only for the column titles). Never prose or headings.
- **Figure:** "<1%" in Plex Mono 400 at clamp(96px, 11vw, 160px), top-aligned with its note.
- **Phone in the close:** Plex Mono at 30px, 44px from 640px. The Contact headline carries
  the size.
- No eyebrows or kickers above headings. No bracketed labels.
- Font loading: Google Fonts, `display=swap`: Inter (300 to 800), Inter Tight (500, 600),
  IBM Plex Mono (400, 500).

## Layout

- **Container:** 1280px content max, fluid gutter 20 to 32px. Desktop (1200px and up)
  splits into the content column and a 168px rail column on the right.
- **Grid:** 12 columns, 24px gap. Text blocks rarely exceed 7 columns; data may run the
  full content width.
- **Rhythm:** sections hand off with uneven space. `beat-tight` (56 to 80px) between
  dense blocks of the same thought, `beat` (88 to 136px) between sections, `beat-open`
  (128 to 208px) before and after the quote and the close. Never the same gap twice in a
  row.
- **Order of beats on Home:** photo hero, dense ledger, open quote, pinned staffing
  passage, tight typographic lists, full-bleed photograph, short careers block, open
  close.
- **Copy hand-offs:** each section ends on a line that sets up the next headline, so the
  headlines read as one argument.
- **Cross-boundary elements:**
  - The hero photograph starts beside the headline and runs down past the hero, ending
    under the opening of 01 Verify.
  - The measured figure, top-aligned with its note, hangs down past it into the quote's
    rows.
  - A full-bleed photograph starts under the end of 03 Coverage and ends under the start
    of 04 Careers.
- **Mobile (below 768px):** single column, gutters 20px, the rail becomes the running
  head, ledger rows stack (label above value), buttons run full width.

### The document rail

- Desktop only (1200px and up). A sticky column on the right edge of the document, from
  01 Verify to 05 Contact. Marks: `01 Verify`, `02 Staffing`, `03 Coverage`,
  `04 Careers`, `05 Contact`, in mono at 14px.
- A 1px vertical track (hairline strong) runs beside the marks. The current mark turns
  ink and gains a 12px rust tick on the track. Marks are links to their section.
- These are the only section numbers on the page. Section numbers never appear above
  headlines.
- **Running head (below 1200px):** a 36px strip fixed under the header showing the
  current mark (`02 Staffing`) left and a 1px progress line along its bottom edge. It
  appears once 01 Verify reaches the top and is solid canvas, not glass.

## Elevation & Depth

Flat. No shadows, no blur, no glass, no tonal card lifts. Depth comes from three sources
only: photographs that fade into the canvas, the scale gap between display type and
body, and the single rust horizon glow at the close.

## Shapes

- **Controls:** 2px corners. Buttons are rectangles, never pills or circles.
- **Photos inside the column:** 4px corners, a 1px hairline edge (inset), and a mono
  caption line beneath when the photo documents something.
- **Full-bleed photos:** square edges, edge to edge, faded into the canvas top and
  bottom with a linear gradient (at least 22% of the height each end).
- **Hero photo:** square edges, bleeds off the right edge of the viewport, faded into the
  canvas on its left and bottom edges.
- **Rules:** 1px hairlines only. Rules belong to rows and lists (ledger rows, city rows,
  division rows). A rule is never used to separate one section from the next.
- **Icons:** authored SVG arrows only (1.5px stroke, round caps): `→` for internal
  links, `↗` for external verification links. No icon sets, no icon circles.

## Components

### Buttons
- **Primary:** ink fill, canvas text, 48px tall (40px in the header), 2px corners, Inter
  14px / 500. Hover lightens to pure white. Only "Request a quote" carries an arrow.
- **Quiet:** text in ink with the standard underline and an arrow; no box. Used for every
  secondary action (call, download, view on eLibrary).
- Press: `scale(0.98)` over 140ms. Mobile stacks run full width.

### Ledger (the proof table)
- A `<dl>`-style table on hairline rows. Three columns on desktop: label (Inter,
  ink muted, 3 cols), value (Plex Mono, ink, 5 cols), verification route (quiet link,
  right-aligned, remaining cols).
- Rows are grouped (Contract vehicle, Registration, Certification); each group opens with
  its name in the Inter `title` style on a hairline-strong rule.
- Opens with a key row of four identifiers (GSA contract, UEI, CAGE, NAICS) as large mono
  values with labels beneath.
- On mobile each row stacks: label, value, link.

### Typographic lists
- **City list:** each city at display-lg on its own row between hairlines, a link to its
  location page, with an arrow that nudges 4px on hover.
- **Division list:** two columns of Inter 17px / 500 in ink, 1px hairline under each item.

### Pull quote
- Inter 500 at display-md size, ink, set across up to 10 columns with hanging punctuation. The
  attribution sits beneath in Inter small: role in ink, base in ink muted. No avatar, no card, no quote
  icon.

### Pinned passage (Staffing)
- On desktop the photograph holds still (sticky) in the left half while four steps
  scroll in the right half. The active step reads at full ink; the rest rest at 0.8
  opacity, the floor that keeps dimmed body copy at AA contrast. On mobile it unpins into a plain sequence.

### Credential strip
- Between the hero and 01 Verify: the four certification marks alternating with short
  facts (minority woman-owned; armed, unarmed, and cleared officers; founded 2021;
  Colorado Springs, Denver, Pueblo). No rules above or below; the edges fade out with a
  mask. Moves slowly (50s loop), pauses on hover, and holds still and becomes swipeable
  under reduced motion.

### Coverage map
- An authored SVG of Colorado to scale (37°N to 41°N, 102.05°W to 109.05°W) on a faint dot
  grid, with Denver, Colorado Springs, and Pueblo plotted from real coordinates and
  Interstate 25 traced through them. Colorado Springs is marked in rust as HQ with one
  soft rust glow. Sits beside the Coverage headline on desktop, under it on mobile.

### Mobile breaks (below 1024px unless noted)
- **Staffing steps become a swipe row** (scroll snap, 84% slides so the next one peeks),
  each with a large mono numeral, and a hairline progress bar that fills as the row
  scrolls. Desktop keeps the pinned passage.
- **Ledger groups fold** (below 768px) behind tappable rows showing the group name, the
  entry count, and a chevron. The four key identifiers stay visible above them.
- **The figure grows** to 36vw so it reads as a visual, not a line of text.

### Header
- Fixed, 64px, solid canvas. A hairline appears beneath once the page scrolls. Left: the
  Ares mark alone in white (44px desktop, 32px mobile; no wordmark). Right: nav links (Inter 14px / 400, ink muted, ink when
  current), the phone number in mono (wide screens only), and the primary button.
- Mobile: the mark, plus a "Menu" button with two lines. The menu is a solid
  canvas sheet with links at display-md on hairline rows and the contact block below.

### Footer
- Same canvas, no top rule. Columns for the company (About Us, Services, Careers),
  service areas, contracting (mono), and contact (mono), then the certification marks
  separated by thin vertical lines and a small legal line. The large "Get to know Ares"
  index was removed by the owner (2026-10-04).

## Motion

Few, fast, and crisp. Four to six moments per page.

- **Easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)` for state changes and feedback; `linear`
  for anything driven by scroll position.
- **Durations:** press 140ms; hover and rail state 180ms; menu open 220ms (close 160ms).
  No UI transition above 300ms.
- **Scroll-driven effects** use CSS `animation-timeline: view()` / `scroll()` inside
  `@supports (animation-timeline: view())`. The default, unsupported, and
  `prefers-reduced-motion: reduce` states are static and fully visible.
- **Text is never hidden.** Scroll effects may move or dim text, but never below AA
  contrast: body copy dims no lower than 0.8 opacity (the hard floor for any text is 0.62). Opacity entrances from 0 are not allowed.
- **Allowed moments on Home:** the hero photo scrolls 10% slower than the page as the
  hero leaves; ledger hairlines draw from left to right as rows enter (the text is
  already there); staffing steps brighten as they cross the middle of the viewport
  (desktop); the full-bleed photograph opens from a 7% side inset to full width; the
  figure settles 32px upward as it enters. Plus press and arrow-nudge feedback.
- **Added for mobile pacing (2026-10-04):** the credential strip's slow loop, a single
  soft pulse ring on the HQ dot, I-25 drawing itself as the map enters, and the swipe
  row's progress bar. The two loops are ambient and stop under reduced motion.
- **Position indicators** (the rail fill, the running-head progress line, and the swipe
  row's bar) are tied
  to scroll position and stay on under reduced motion; they move only as fast as the
  reader scrolls.
- Photographs dissolve into the canvas with CSS masks, never with overlay gradients that
  leave a visible edge.
- Hover motion is gated behind `(hover: hover) and (pointer: fine)`.

## Do's and Don'ts

**Do**
- Keep every fact exact: GSA MAS 47QSMS25D009Q, SIN 561612, UEI XQXDN6E33SF4, CAGE 9KL18,
  NAICS 561612, WOSB250470, WBE2303571, founded 2021 in Colorado Springs, 719-696-3966,
  contact@aressecurity.co.
- Pair every proof element with a way to verify it.
- Write plain, natural copy. No em-dashes, no slogans, no stacked adjectives.
- Use real Ares and Colorado photography. No patrol-vehicle photos on Home.
- Say "minority woman-owned". Veterans: veteran supervisors, a veteran NRA firearms
  instructor, veterans encouraged to apply. Never "veteran-led".

**Never**
- **Card containers:** no boxed, filled, or bordered cards; no tile grids of stats,
  features, or services.
- **Glassmorphism:** no backdrop blur, frosted panels, or translucent nav.
- **Background bands:** no section fills or alternating light and dark strips; the canvas
  never changes.
- **Section dividers:** no rule, gradient line, or ornament between sections; space and
  the hand-off line do that work.
- **Italic accent words:** no italic or colored word inside a headline for emphasis.
- **Bracketed eyebrows:** no `[ LABEL ]`, no tracked uppercase kickers above headings.
- **Icon-circle grids:** no rows of icons in circles or squares with captions.
- **Uniform spacing:** no single repeated section padding; every gap is chosen.
- No pills, no gradient text, no glow shadows, no blue accent, no bounce or elastic
  easing, no entrance that starts from opacity 0.
- No invented statistics, clients, logos, quotes, staff counts, or response times.
