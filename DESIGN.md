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
- A running document rail (01 Record to 05 Contact) on desktop; a running head on mobile.
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
  - display-xl: the hero headline (two lines on desktop, set over the full-bleed photo;
    on Home the quote button and call link under the lead show below 1024px only, since
    the nav carries the quote button from there up; owner, 2026-10-06)
    and the Contact headline.
  - display-lg: section headlines (Record, Staffing, Careers).
  - display-md: the Coverage headline.
  - city: the three city rows (smaller on desktop, owner 2026-10-05).
- **Text: Inter** with `cv01 cv05 cv09 cv11 ss03`.
  - Sub-heads (ledger groups, staffing steps, divisions heading) are
    Inter 600 at 22 to 28px, -0.02em.
  - The pull quote is Inter 500 at display-md size.
  - Lead and intro paragraphs 18px; body 16px (steps 17px); labels 13 to 15px.
  - Hand-off lines 20px / 500. Links 15px / 500. Nav 14px / 400; buttons 14px / 500.
- **Data: IBM Plex Mono 400** with tabular, slashed-zero numerals: identifiers, phone
  numbers, the measured figure, rail marks, and the footer's column titles and legal
  line (uppercase only for the column titles). Never prose or headings.
- **Figure:** "<1%" in Plex Mono 400 at clamp(96px, 11vw, 160px), clamp(88px, 8.4vw, 124px) on desktop
  (owner, 2026-10-05), top-aligned with its note.
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
- **Order of beats on Home (owner, 2026-10-06):** photo hero; 01 Record (the measured
  figure and the open quote, for every buyer); 02 Quality (statement, patrol vehicles,
  facts); 03 Coverage (tight typographic lists); full-bleed photograph; 04 Careers (short);
  05 the open close. The federal ledger (01 Verify) and the short GSA block that replaced
  it were removed (owner, 2026-10-06): the Capability Statement carries every code, and
  the hero keeps its GSA line.
- **Copy hand-offs:** each section ends on a line that sets up the next headline, so the
  headlines read as one argument.
- **Cross-boundary elements:**
  - The hero photograph fills the hero edge to edge (from 900px) and runs down past it,
    ending under the opening of 01 Record.
  - The measured figure, top-aligned with its note, hangs down past it into the quote's
    rows.
  - A full-bleed photograph starts under the end of 03 Coverage and ends under the start
    of 04 Careers.
- **Mobile (below 768px):** single column, gutters 20px, the rail becomes the running
  head, ledger rows stack (label above value), buttons run full width.

### The document rail

- Desktop only (1200px and up). A sticky column on the right edge of the document, from
  the first section to Contact, in mono at 14px. Each page sets its own marks. Home:
  `01 Record`, `02 Quality`, `03 Coverage`, `04 Careers`, `05 Contact`. Services:
  `01 Divisions`, `02 Process`, `03 Areas` (no close since 2026-10-06).
- A 1px vertical track (hairline strong) runs beside the marks. The current mark turns
  ink and gains a 12px rust tick on the track. Marks are links to their section.
- These are the only section numbers on the page. Section numbers never appear above
  headlines.
- **One form per page (owner, 2026-10-05).** Same marks, links, active section, and
  running head everywhere; each redesigned page draws the desktop rail its own way, all
  flat, typographic, and on the canvas (references: Linear's edge minimap, Intercom's
  dimmed list, Raw Materials' status line, Shupatto's counter). `DocRail variant=`:
  - `rail` (Home): the track and rust tick above.
  - `dock` (Services): a 44px bar fixed at the bottom center (solid canvas, hairline-strong
    edge, 2px corners) with the current mark left, a 44px segment per section filling
    with the reading position (like the page's stage meter), and `02 / 03` right. Slides
    up once the first section is reached and away once the footer comes into view; it
    counts every section (the close was removed, owner, 2026-10-06). With nothing
    on the side, Services drops the rail column: its sections run the full container,
    centered like the opening (owner, 2026-10-05).
  - `counter` (About): the section number in Plex Mono at 72px, rolling up into place
    (260ms) when it changes, `/ 04` beside it, the name beneath, and a 24px bar per
    section to jump with.
  - `ticks` (Capability Statement): a column of 1px dashes, one per ~360px of each section
    (3 to 9, the first longer); dashes already read turn ink muted and the current one is
    the rust tick. Only the current label shows at rest; all show on hover or focus.
- **Running head (below 1200px):** a 36px strip fixed under the header showing the
  current mark (`02 Quality`) left, its count (`02 / 05`) right, and a 1px progress line
  along its bottom edge. It appears once the first section reaches the top and is solid
  canvas, not glass.

## Elevation & Depth

Flat. No shadows, no blur, no glass, no tonal card lifts. Depth comes from three sources
only: photographs that fade into the canvas, the scale gap between display type and
body, and the single rust horizon glow at the close. The footer's closing stage (owner,
2026-10-06, restored 2026-10-08) is the one place with a CSS light and glass at the end of
every page.

## Shapes

- **Controls:** 2px corners. Buttons are rectangles, never pills or circles.
- **Photos inside the column:** 4px corners, a 1px hairline edge (inset), and a mono
  caption line beneath when the photo documents something. Stock photographs (the
  Services division photos) carry no caption and are graded down
  (`saturate(0.78) brightness(0.84)`) to sit on the canvas.
- **Full-bleed photos:** square edges, edge to edge, faded into the canvas top and
  bottom with a linear gradient (at least 22% of the height each end).
- **Hero image (Home), from 2026-10-08:** the copper-glass tower `hero6.jpg` again (owner; it had moved to the Services band), graded `saturate(0.95) brightness(0.8) contrast(1.06)` at `50% 50%` from 900px with no black from the left but a soft vignette (owner, 2026-10-08; lighter than About's: the top shaded from 70% to clear by 44%, the edges and corners darkened up to 62% outside an oval around the towers), fit rather than zoomed (the photo's box runs only 4 to 7rem past the hero with 4% headroom for a 4% drift, so cover shows about 94% of its width at 1440 and all of it at 1920); readability comes from a strip of dark glass behind the copy (owner, 2026-10-08: full bleed from just above the headline to the hero's foot, canvas 72% to 48% left to right over a 24px blur, crisp white/10% edges top and bottom, no fade; the photo and its copper floor run on below it into 01 Record. From 1024px the headline runs across and the lead (6 columns) and the GSA mark (right-aligned) share the row below it. The lead and GSA label in #c4c8ce; 6.7:1 or better at the brightest point), `saturate(0.9) brightness(0.8)` at `62% 40%` on phones. The earlier Home hero, kept for the record: `hero-fold.webp` (owner-supplied, 2026-10-05): a dark glass
  panel with a glowing edge beside a sweep of amber and white light. Framed, not
  mirrored: on desktop it is anchored at its left edge (`object-position: 0% 50%`), so
  the light falls between the copy and the glass edge at about three quarters across.
  WebP, 2880px, quality 92 with sharp YUV (smooth gradients band at lower quality),
  314KB; the
  source is kept locally in `.impeccable/gen/hero-fold-source.jpg`. It is the one
  owner-approved exception to "no gradients for decoration": the light lives inside the
  image, never as a CSS gradient on the page. Full bleed from 900px, with a black
  shade from the left (solid canvas to 18%, clear by 88%); masked into the canvas at the
  bottom. Phones: above the copy at 42%, the edge just right of center. Earlier options (`hero-panels.webp`,
  `hero-glass.jpg`) stay in public/images; the copper-glass tower (`hero6.jpg`) is now
  the Services band and the source of the rust accent.
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
- The nav and menu "Request a Quote" is the same primary button (2px corners; the v08
  pill was retired by the owner, 2026-10-05). Nothing on the site is a pill.

### Ledger (the proof table)
- A `<dl>`-style table on hairline rows. Three columns on desktop: label (Inter,
  ink muted, 3 cols), value (Plex Mono, ink, 5 cols), verification route (quiet link,
  right-aligned, remaining cols).
- Rows are grouped (Contract vehicle, Registration, Certification); each group opens with
  its name in the Inter `title` style on a hairline-strong rule.
- Opens with a key row of four identifiers (GSA contract, UEI, CAGE, NAICS) as large mono
  values with labels beneath.
- Each group folds behind a tappable row (name, entry count, chevron) at every width,
  closed by default; the key row above stays visible.
- On mobile each row stacks: label, value, link.

### Typographic lists
- **City list:** each city at display-lg on its own row between hairlines, a link to its
  location page, with an arrow that nudges 4px on hover.
- **Division list:** two columns at every width (Inter 17px / 500 in ink; 15px on phones),
  1px hairline under each item.

### Pull quote
- Inter 500 at display-md size, ink, set across up to 10 columns with hanging punctuation. The
  attribution sits beneath in Inter small: role in ink, base in ink muted. No avatar, no card, no quote
  icon.

### 01 Record: proof cards over a wide quote (Home; owner 2026-10-06)
Mobbin: Lightdash and Ramp (proof cards over a customer quote). One grid replaces the
floating figure, the offset quote, and the separate values section. The owner-approved
exception to "no card containers" and "no glass" for this section.
- Head: "The record so far." with its lead, in the shared Home head (`.ds-sec-head`:
  display-lg in 7 columns, the lead in the last 5, aligned to the headline's foot; Quality
  uses the same head, and Coverage's headline is display-lg too).
- Black frosted glass, no colored light (owner, 2026-10-08: the rust gradients were too
  much): each card canvas at 72% over a 14px blur, a white/8% edge and a white/12% line along
  the top edge (brighter on hover). A faint dot grid (white/14%, 16px, the maps' grid) lies
  behind the grid, masked to an oval, so the glass has something to frost: it shows in the
  gaps and softens to nothing under each card. Each value card: the figure in Plex Mono (44
  to 60px) with its caption (#c4c8ce; Personnel's links to Indeed), a white/8% hairline,
  then the name (Inter 600 22px) and one line. Reliability <1% missed shifts since 2021;
  Integrity 16/18 client criteria rated Exceptional; Personnel 4.8/5 on Indeed. Then the
  client quote as a wide card (all three columns): the quote (Inter 500, 22 to 32px) left,
  the attribution right.
- Desktop: three across over the quote; the cards rise 64px into place on scroll.
  Phones: the four cards are sticky and pile up 16px apart, each frosting the one beneath,
  all one height (the tallest card's, measured in Record.tsx; owner, 2026-10-08), the quote
  at the top of its card and the attribution on its foot. The quote card stacks too, 16px
  under the third; the full pile holds for about 80px of scroll, then leaves as one, still
  fanned (owner, 2026-10-08: each card's bottom margin evens out the release points).
  No images (generated options were tried and removed, 2026-10-06; they stay in
  assets/generated/values/).

### Quality (Home 02, owner 2026-10-06)
- Moved whole from About (photo and facts), in exchange for the staffing passage.
  "Quality over quantity." at display-xl in 7 columns with its paragraph beside it (5
  columns, aligned to the headline's foot); then the patrol vehicles as a wide plate (7
  columns, 16:10, anchored to the photo's foot, captioned) beside the company facts on
  hairlines (established, ownership, licensed and bonded, NAICS; columns 9 to 12).
  Phones: stacked, the photo square. The owner allowed the vehicles photo on Home here.

### Pinned passage (About 01 Staffing, moved from Home 2026-10-06)
- "How we staff a post." On desktop the officer photograph holds still (sticky) in the
  left half while the four steps scroll in the right half. The active step reads at full
  ink; the rest rest at 0.8 opacity. Below 1024px the steps become a swipe row with a meter.

### Expandable service cards (owner request, 2026-10-05)
- The one exception to "no card containers", "no glow shadows", and "no icon circles":
  the division cards on Services and the competency cards on the Capability Statement.
  Near-black fill, a white/8 to 10% inset edge, a faint inner light from below, 4px
  corners like the photos (owner, 2026-10-05; were 14 to 18px), and a + that turns to an x. The + has no disc or box (owner, 2026-10-06): a 12px +
  (1.5px strokes) inside four 7px corner ticks on a 36px target, like crop marks on a spec
  sheet; the ticks tighten in on hover (180ms) and turn ink when the card is open. Nowhere else.

### Credential strip
- Phones only (hidden from 768px). Between the hero and 01 Record: the
  certification marks only (GSA, SBA, Women Owned, WBENC, Denver Economic Development &
  Opportunity, Colorado Verified Diverse Business, Colorado Verified Small Business; the
  last three added 2026-10-05 as WebPs at 32 to 36px tall), no text, with wide
  spacing (72px mobile, 112px desktop). No rules above or below; the edges fade out with
  a mask. Moves slowly (60s loop), pauses on hover, and holds still and becomes swipeable
  under reduced motion.

### Coverage map
- An authored SVG of Colorado to scale (37°N to 41°N, 102.05°W to 109.05°W) on a faint dot
  grid, with Denver, Colorado Springs, and Pueblo plotted from real coordinates and
  Interstate 25 traced through them. Colorado Springs is marked in rust as HQ with one
  soft rust glow. Sits beside the Coverage headline on desktop, under it on mobile.

### Services page ("The Schedule", 2026-10-05)
Same system as Home, its own structures (owner: "similar but unique to the page
contents"). Nothing on Services repeats a Home layout except the rail and the footer.
- **Opening:** headline (display-xl, 7 columns) with the lead beside it (no buttons; owner,
  2026-10-05). The photograph (owner, 2026-10-08: downtown Denver at sunset with the Front Range, swapped from the Request a Quote page, now from its 2400px original `hero1.jpg` as `services-hero/denver-sunset.webp`, 509KB, graded `saturate(0.8) sepia(0.1) brightness(0.78) contrast(1.12)` (owner, 2026-10-08: a tad brighter and crisper; was brightness 0.68, contrast 1.04); earlier the generated Denver towers, which now open the quote page; before that the tower `hero6.jpg`, now back on Home) fills the whole opening from the top of the page, behind the nav, like the other heroes; it sits 164px lower, with a vertically flipped copy of itself directly above so the glass frosts real image all the way to the top (owner, 2026-10-08; lead 5.1:1 or better, headline 6:1). On scroll only the glass and copy move at first: they slide up over the photo while the photo and everything below hold still, and once the glass's foot reaches the nav the whole page scrolls as usual (owner, 2026-10-08; the hold is a scroll-driven transform on the photo, the page below, and the footer over the first `--svc-cap` of scroll, measured in `Opening.tsx`, so it rides the compositor without jitter; browsers without scroll timelines get a JS spacer; without JS the page scrolls normally; replaces the drift). Because the held page sits `--svc-cap` below its layout box, the page's view-timeline ranges (stage bars, Denver plate) start that much later, and the dock hides once the footer's first line of content appears (owner: not at its top padding), not on the document box (2026-10-08: both had fired early).
  (owner, 2026-10-06): anchored to its bottom edge, graded down, masked into the canvas
  only at the bottom, drifting slightly as it leaves. Dark glass (the footer's: canvas at
  55% over a 22px blur; 68% below 1024px) covers it from the top down to a white/10% edge
  where the crisp photo begins (`clamp(15rem, 38svh, 28rem)` above the opening's foot).
  The headline and lead sit on the glass; the lead is #c4c8ce there (AA at the brightest
  point, 6:1 or better at every width). The place caption "Downtown Denver, Colorado" (mono, full ink with a slight dark text shadow; owner: it is just a subtitle) sits on the right just under the glass's edge and rides up with the glass, out of view (owner, 2026-10-08). No division index in the opening (owner, 2026-10-05): the
  division containers start a short scroll below.
- **Division order (owner, 2026-10-08):** 01 Government, 02 Specialized & Armed Protection (data centers named in its description and first in its detail, worded for unarmed or armed officers), 03 Industrial, 04 Airport & Transportation, 05 Commercial, 06 Institutional & Community.
- **Divisions as a bento of cards that open in place** (owner requests, 2026-10-05; the
  one exception to "no card containers", and with the nav the only glass). Desktop and
  tablet: two equal columns (owner, 2026-10-05; the earlier 4+2 / 2+4 bento spans were
  dropped); 4px corners on every card (the 10px / 28px plate corners were retired). Phones: one column. Each card: near-black fill (`#050607`), a white/10% edge and a
  faint inner light from below (drawn on top), the photo across the top (growing to
  fill when a row-mate is taller, slight 1.03 zoom on hover), and a frosted panel
  (24px blur over a dark tint) riding up over the photo's foot with the number beside
  the title (Inter 500, 22 to 24px), the division's one-line description, and the +.
  The + (or the photo) opens one card at a time: it takes its row's full width (its
  row-mate moves down and the cards after it re-pair beneath; a last odd card sits at
  half width), the + turns into an x, and the detail appears under the
  description (Government's GSA ledger row, then each site type with one plain line).
  Desktop opened: photo left (5/12) top to bottom, detail right on plain card fill.
  At every width (owner, 2026-10-05) the opened card glides to just under the nav (and the
  running head where it shows), one grid gap below it, so the card above is never seen. Detail is
  always in the HTML (`hidden` until opened).
- **Process as a schedule chart:** a mono axis (Pre-contract, Contract execution,
  Operational) over hairline rows. Each stage: number and title, a faint scope line, then a
  hairline bar with its quarter drawn in ink, one quarter further right per stage, and the
  body. The bars draw in as each row arrives. No pinned passage on this page.
  Below 1024px (owner, 2026-10-05) the stages become a swipe row (scroll snap, 84%
  slides on phones and 62% on tablets, so the next one peeks), under a process meter:
  stage numbers 01 to 04 over a hairline split into quarters with ticks, the phase labels
  beneath, and a 3px ink fill tied to the swipe position (from one quarter to full). Each
  number turns ink as its stage is reached; tapping a number swipes to it. Two swipe cues:
  a one-time nudge when the row first comes into view (the slides slide 44px toward the
  next stage and settle back, 900ms; skipped under reduced motion or once touched), and a
  quiet "Next stage" link under the row ("Back to the first stage" on the last). The per-stage
  bars step aside there. The meter is a position indicator, so it stays on under reduced
  motion.
- **Areas:** the Denver skyline as a wide plate in the column (21:9, 16:10 on phones) with
  a mono caption (it documents a real place), then the three cities as a three-column
  strip (Inter Tight 600, 24 to 32px) with arrows.
- **No close** (owner, 2026-10-06): the page ends on the three cities and hands straight
  to the footer; the nav carries the quote. ("Tell us about your site." with the phone,
  email, and actions was removed.)

### About page ("The Company File", 2026-10-05)
Home argues, Services schedules, About introduces. Concept and Mobbin board:
docs/about-concepts.md. Rail marks: 01 Staffing, 02 Commitments, 03 People.
- **Opening:** Pikes Peak and Garden of the Gods (`about-hero.jpg`, a real place, so a
  mono caption, top right under the nav) full bleed behind the headline, with a heavy
  shade from the top so the overcast sky stays in the canvas. Under the copy, the four
  certification marks on hairlines, each with its identifier in mono (GSA links to
  eLibrary); a label shows only where the mark says less than we do ("Minority
  woman-owned"). Entrance: marks rise 14px from 0.35 opacity and their rules draw, 80ms
  apart, once, when the row is seen (never from 0; static without JS or under reduced
  motion).
- **01 Staffing:** "How we staff a post." as the pinned passage (see above; moved whole
  from Home, owner 2026-10-06). The Company section ("Quality over quantity.", the facts,
  and the patrol vehicles plate) moved to Home. Was: a facts ledger beside the patrol
  vehicles as a captioned plate (square,
  anchored to the photo's bottom at every width, no frame edge so the caption is not
  boxed; owner, 2026-10-05).
- **02 Commitments:** four to clients, four to our people, as ruled lists (name, one
  line). Desktop and tablet: side by side. Phones: a two-tab switch with a sliding
  underline (240ms), one list at a time.
- **03 People:** the officer portrait (sticky on desktop) beside the five traits, whose
  initials read ALERT (owner, 2026-10-05; a column of large initials was tried and
  dropped as too much). Each word in Inter Tight 600 at 28 to 38px, full width, its line
  beneath. Phones: the traits swipe (72% slides; sideways only, a vertical swipe scrolls the page), with the Home staffing row's meter (a hairline that fills with the swipe, and "Swipe").
- **No close** (owner, 2026-10-06): the page ends on 03 People and hands straight to the
  footer. (04 Statement, the capability statement plate with its links, was removed; the
  Capability Statement page carries it.)

### Capability Statement page ("The Statement, Served", 2026-10-05)
The most important page after Home; it must stand out like Home. Concept and Mobbin
board: docs/capability-concepts.md. Every piece of the old page's content carries over.
Rail marks: 01 Capabilities, 02 Why Ares, 03 How to buy, 04 Credentials, 05 Download.
- **Hero:** generated copper fins on a building at dusk (owner, 2026-10-08:
  `capability-hero/cs-fins.webp`, 2752px at its native size, quality 82 with sharp YUV, 227KB, from the Services hero option
  `s4-fins`; generated, so no place caption; earlier the federal facade `cs-facade` and the
  glass-panels light `hero-panels.webp`, both kept, with the other options in
  `assets/generated/capability/`) shown whole (never cropped; full width at its own
  proportions, fading only at its very foot (2%; the frost softens the edge) so its color runs on under the
  facts' glass and the frost reads; below 900px a taller frame, clamp(27rem, 66svh, 38rem),
  cropped at the sides with the photo set further right (60%), under an evenly eased shade from the left (a kink in it read as a dark band), fading from 55% under the copy, with the lead in
  #c4c8ce there; from 900px the copy, the facts' glass, and the codes sit 40px higher and the
  photo 24px higher, owner 2026-10-08, the hero height unchanged; the photo is never
  shorter than the window less 96px, so narrower desktop and tablet windows crop its sides
  on the fins (66%) instead of leaving black under it, while 1440 and wider still show the
  whole frame), black from the left; below 900px a softer shade from the left keeps the lit fins
  off the lead. The spec line is ink muted on the photo. Headline 6.7:1, lead 6.3:1, spec
  6.9:1 or better at every width. "Capability
  statement." at display-xl, a two-sentence offer (no credential line; owner, 2026-10-05: the
  quick facts and sections below carry it), a white "Download the PDF"
  button with an authored download icon (no quote link; owner, 2026-10-06: the nav carries
  it), and a mono spec line
  (company, NAICS, 1 page, PDF, 1.3 MB since the lossless shrink of 2026-10-09, 2026). No floating document (removed by the owner, 2026-10-05). Under the hero, the four quick facts with notes and the SAM.gov route sit on one
  full-width hairline over a long band of frost (22px blur, a light 10%-to-0 tint since
  2026-10-08 so the photo's color shows through; was 28%; about 26rem past the row) that fades out downward (owner, 2026-10-05).
- **Capabilities (second pass, 2026-10-05):** six cards titled exactly as in the PDF in the Services card language
  without photos (#0e1013 fill, white/8% edge, faint light from below, 4px corners): mono
  number, Inter 600 title, a + that turns to an x, a line on who it is for, mono keys
  (hidden on phones). Three columns on
  desktop, two on tablet, one on phones. The + opens one card at a time in place: it
  spans its row and moves (in the DOM) to the start of it, so tab order matches; the
  closed cards after it widen to fill the last row (six-track grid on desktop). It lists
  four included services in
  two columns (one on phones). FLIP motion as on Services; at every width the opened card
  glides under the nav (and running head). The h3 holds the disclosure button.
- **Why Ares (second pass):** four differentiators, each with a mono proof line:
  restricted-area experience, four-stage deployment, client rating, officer rating (the
  Indeed proof links to the reviews).
  2x2 on hairlines on desktop; a swipe row with the Home meter on phones.
- **How to buy:** the GSA MAS as a spec block (title, mono status "● Active", spec rows,
  eLibrary route) beside the four procurement paths with mono status (13px, sentence
  case) and the set-aside note. Status lights kept from the old page (owner): green
  (#7cb85f) for active and available, amber (#f2b84b) for on request, each with a soft
  halo and one pulse outward when the section is first seen. These are the page's only
  functional colors.
- **Credentials ("Certifications and codes."):** seven marks on hairlines in a fixed 48px logo slot (white
  silhouettes, including the horizontal SBA WOSB mark `cert-sba-wosb.webp`; the GSA plate in its own colors), each with its
  number where one is published; then the full code listing as a two-column ledger.
  Phones: the listing folds behind a disclosure button in its h3, with the entry count.
- **Download (the close):** the PDF thumbnail beside "Take this capability statement
  with you.", Download, Open in a new tab, quote, and phone, over the closing rust light.

### Request a Quote page ("The Intake", 2026-10-05)
A short form page, so no rail and no scroll effects (owner). Concept and Mobbin board:
docs/contact-concepts.md.
- **Opening:** the generated Denver towers at blue hour (`services-hero/nb-s1-towers.webp`, swapped from Services, owner 2026-10-08; generated, so no place caption; the route's SEO preload still names `contact-hero.jpg` until the SEO pass)
  as a band under the nav, shaded from the top and left and masked into the canvas, with
  "Request a quote." and the lead low on it.
- **The intake (6 columns):** three parts, each a legend (Inter 600, 22 to 26px) on a
  hairline-strong rule. "What needs covering?" is a required radio group of the six
  divisions and something else, as rows on hairlines in two
  columns (16px ring in ink faint; checked fills ink with a canvas dot). Fields: label
  above (13px, ink muted, "Optional" in ink faint), a 48px filled field (#0e1013, white/16%
  edge, 2px corners, 16px text so phones don't zoom). Errors are amber (#f2b84b) once the
  reader has tried to send, with a line under the radio group. Then the primary button,
  the discretion line, and an inline status (aria-live) that only says "Sending your
  request…". The result shows as a **toast front and center** (owner, 2026-10-09; Mobbin:
  GetYourGuide, Perplexity): a dark glass card (canvas-tinted 80% over a 22px blur,
  white/12% edge, a light top line, a soft drop shadow, 4px corners, up to 440px), the green
  or amber light with one ring pulsing out, "Request sent." (Inter 600 20px), "Leadership
  reads every request and will reply to {email}.", and the request's subject in mono under a
  hairline. Not a modal (no scrim, no focus trap; Escape and the x close it). A sent request
  closes itself after 7s, a 2px hairline on its foot draining the time (paused on hover and
  focus); a failure stays, with the contact email. Motion (Emil): in 320ms
  `cubic-bezier(0.23, 1, 0.32, 1)` rising 14px from 0.96 scale and an 8px blur; out 180ms,
  faster, settling away; reduced motion is a short fade.
  On desktop the message box grows so the form ends level with the map (owner,
  2026-10-05).
- **The contact column (5 columns, from column 8):** "Rather talk?" with the phone in
  mono (30 to 40px) over the rust light, the email; "What happens next" as three ruled
  steps; the Colorado coverage map from Home. On desktop the map block is sticky (24px under the nav) while the form scrolls, letting go where the form ends (owner, 2026-10-08). Phones: the intake first, then this column.

### Careers page ("The Roster", 2026-10-05)
Recruits: the roles first, the reasons beside real Ares people. Concept and Mobbin board:
docs/careers-concepts.md. Rail marks: Roles, Why people stay, Apply.
- **Opening:** the Cadet Chapel at the U.S. Air Force Academy, Colorado Springs (owner,
  2026-10-09; desktop framed at 50% 40%; the client may pick another of the eight in
  `assets/careers-hero-options/`; was the Colorado Springs skyline, then Denver from the
  foothills;
  `careers-hero.jpg` key, captioned; the route's SEO preload) as a band, "Join the team." and the lead low on it, then the Indeed rating as a small
  linked proof ("4.8 / 5 Rated by our employees on Indeed"), a 1px rule like the logo
  lockup's, and the careers email beside it; stacked on phones (owner, 2026-10-09: the
  "See open roles" button was dropped, the roles sit right below). Phones and tablets get
  the Capability Statement's tall frame (clamp(27rem, 66svh, 38rem), copy low in it, a
  shade behind the copy, lightened twice at the owner's request on 2026-10-09 on both phones
  and desktop; headline 4.6:1 or better, lead 8:1).
- **01 Roles:** a quiet table on hairlines (Runway and Linear on Mobbin): role and line,
  location, and an Apply route that opens an email with the role in the
  subject. Column heads in mono on desktop (visually hidden but announced below 1024px);
  rows stack on phones. No type column: the title names it.
- **02 Why people stay:** the headline with the Indeed rating and the well-being paragraph
  beside it, then one photo that holds still (sticky; under the running head on phones)
  while the four reasons scroll past. Halfway down (the third reason) it crossfades from
  the team to the officer at the range (260ms), and the caption follows. No pan or zoom
  (owner, 2026-10-05: camera moves were too much). The reason in view reads ink with a
  rust number (on phones it lights in the middle of the open area below the photo); the
  rest rest at 0.8. Roles hands straight to this section (its hand-off
  line was removed by the owner).
- **04 Apply (the close):** "Send us your résumé." with the careers email large in mono over
  the rust light.
- **Rail (`list`):** the section names in Inter, dimmed, the current one in ink with a 6px
  dot that moves to it (220ms; instant under reduced motion).
- The docked apply card and the footer's extra top padding on /careers were removed.

### Location pages ("The Local File", 2026-10-06)
SEO landing pages for "security guards in <city>": answer the search, show the city's own
license, list the sites we are ready to staff there, then hand off. Concept and Mobbin
board: docs/locations-concepts.md. One component (`src/components/locations/`), one record
per city. No rail, no close, no photo, no section numbers.
- **Opening:** the search phrase as the headline (display-xl, 7 columns) and a two-sentence
  lead; the call link under it at every width, the quote button below 1024px only (the
  nav carries it from there up). Beside it (5
  columns; under it on phones) the Front Range drawn to scale (37.95 to 40.05°N, 106.2 to
  103.6°W) on the dot grid: I-25, the page's city in rust with its glow and ring, the other
  two cities faint, a local landmark (Colorado Springs: Pikes Peak, 14,115 ft, an open
  triangle; Denver: DEN, Pueblo: PUB, airports as open squares; Pueblo's name sits left of
  its dot so the airport can sit right), the city's
  coordinates and a 25-mile scale bar in mono. The drawing is SVG; its words are HTML laid
  over it from the same projection, in CSS pixels (faint 12px, landmark 14px, other cities
  15px, the city 13 to 20px by plate width so it always ends inside the frame).
- **Licensed in <city>:** Colorado has no statewide license; the city licenses security
  companies itself. The city's license as Home's ledger row (label, mono value, route):
  license number with "Verify ↗" (on its line at the right at every width; owner, 2026-10-08) (the city's public record; Colorado Springs: Accela;
  Denver: Accela; Pueblo has none, so "Request a copy", an email), status (licensed and bonded, armed and
  unarmed), training provider, armed endorsements, office (CO 80906 only, never a street; its note on one line, "Headquarters" with the distance or "since 2021"). On the Denver map the airport reads "DEN AIRPORT" on one line, lifted clear of the city's name.
- **Sites we are ready to staff here:** a ruled list, two columns from 768px read downward
  (4 + 3), each column closed by a hairline; each row is
  the site type (Inter 17px / 500), its division beneath (13px faint), and an arrow that
  nudges 4px on hover; it links to `/services#<division>` (ScrollToTop scrolls to the
  anchor). Never phrased as current clients or posts.
- **Where to next:** the page's ending, after a `beat-open`: three routes (Services,
  Capability Statement, About Ares) in the Services city-strip style on hairline-strong
  rules, then "Also licensed in Denver and Pueblo." Its heading is for screen readers
  only.
- **Motion:** one moment. I-25 draws down the map once it is well in view (1200ms, the
  standard ease; owner, 2026-10-08: was on load, which on phones ran before the map was
  reached; without JavaScript it plays on load), then a second ring pulses out twice from the
  city's ring, which stays. Reduced motion: drawn
  and still.

### 404 ("The Search Light", 2026-10-06)
Owner request: modern, clean, a glass panel over an aurora. Concept: docs/notfound-concepts.md.
- The first screen only: a giant "404" (Inter Tight 600, up to 330px, -0.05em) over a slow
  rust and amber aurora (the footer's glow, pooled behind the numerals) and soft conic
  beams from above that sway ±9deg over 16s, like a search light. The light fades out before
  the footer. Ambient; still under reduced motion.
- A dark glass card (canvas at 55% over a 22px blur, a white/10% edge, 4px corners, up to
  680px) rides up over the numerals' foot so they blur beneath it; the text starts below
  that frosted strip, never on it. Inside: "Page not found." (display-lg), one line of
  help, the address that was not found in mono ("No page at /…", filled in after
  hydration; the static 404.html reads "No page at this address"), four routes on
  white/10% hairlines (Home, Services, Capability Statement, Request a quote; two columns
  from 640px, arrows nudge on hover), and "Or call 719-696-3966". Text on the glass is ink
  or #c4c8ce (7:1 or better at the brightest point). The site's only glass card.

### Policies ("The Fine Print", 2026-10-06)
Privacy policy, terms of use, and accessibility statement at `/privacy`, `/terms`,
`/accessibility`. Concept: docs/legal-concepts.md. One layout, Read mode, no effects.
- Desktop: a sticky side column (3 columns): the three documents on a 1px hairline-strong
  track, the current one in ink with the rail's 12px rust tick; then "On this page" (13px
  faint label, 14px links, the section in view in ink). The document in columns 5 to 11.
  Phones: the documents as a row of links under the header (the current one underlined in
  ink); no table of contents.
- The document: title (display-lg, with a period), "Effective <date>" and "Ares Security
  LLC" in mono 13px faint, an 18px intro, an at-a-glance ledger (Home's ledger row, label 3
  and value 7 parts), then sections: Inter 600 20 to 24px sub-heads, 16px / 1.7 body in ink
  muted at 68ch, strong in ink, lists with a 10px hairline marker.

### Role, industry, insight, and city job pages (test branch, 2026-10-08)
From the CenCore review (docs/market-concepts.md). One shared vocabulary (`ds-mk-*`), no
rail, no cards, no eyebrows (breadcrumbs live in JSON-LD only).
- **Role pages (`/services/<slug>`):** the search phrase as the headline (display-xl, 7
  columns), lead, quote button (`/contact?service=<slug>`) and call link; beside it a spec
  sheet on hairlines (label 13px faint over value 16px ink; GSA routes to eLibrary). Then
  "What the post covers." (four duties two by two, the mono number on the title's line),
  "Where it is asked for." (industry routes), questions, an ask strip, "More services.".
- **Industry pages (`/industries/<slug>`):** a long headline (up to 15em), lead and actions
  in one row, then a full-bleed scene (generated with Nano Banana: light and architecture,
  no people, no caption) masked into the canvas. "What is at stake." (headline left, prose
  right), "What we deliver." (role routes), "Why Ares here." (spec sheet), the ask,
  questions, "Other industries.".
- **Questions:** the heading left (sticky on desktop) and native details on hairlines
  right, a + that folds into a minus (220ms). FAQPage JSON-LD in the body.
- **Ask strip:** one plain line (Inter Tight 500, 22 to 30px), the quote button and the
  call link, on a hairline-strong rule.
- **Routes:** ruled links, a title (Inter Tight 600, 20 to 24px) and a line, three across
  from 768px, arrows nudge on hover.
- **Insights:** the index as ruled rows (title, summary, category and date in a right
  column on desktop); articles in one 46rem reading column, 17px / 1.7, the first paragraph
  in ink, related links, more insights. Article JSON-LD.
- **Jobs by city (`/careers/<city>`):** open roles on hairlines with Apply (email with the
  role and city), licensing handled, why people stay (two by two) with the Indeed rating,
  other cities.
- **Quote form:** "About the post" adds square chips (40px, 2px corners, ink when chosen;
  never pills) for location, officers on post, schedule, and start, and selects for site
  type and how they heard. Prefilled from `?service=` and `?industry=`.
- **Services:** "By role, or by industry." (the index) after the divisions; "A security
  program, not a headcount." (three parts, the relief roster with its mono proof, and the
  systems officers are trained on as square tags). The dock counts five sections.

### Mobile breaks (below 1024px unless noted)
- **Swipe rows** (About Staffing and People, Capability Why Ares; scroll snap, 84% slides
  so the next one peeks) with a hairline progress bar that fills as the row scrolls.
- **Ledger groups fold** (at every width since 2026-10-05, owner request; first built
  for phones) behind tappable rows showing the group name, the entry count, and a
  chevron. The four key identifiers stay visible above them.
- **The figure** is set at 22vw on phones.
- **The pull quote sits right** (flush to the right edge, right-aligned), echoing the
  desktop layout where it lives in the right-hand columns. **The hero's GSA line is
  centered** on the screen, with its label and contract link left-aligned.

### Header
- Modeled on the v08 nav (tag `home-v08-framer-flow-final`, owner request 2026-10-04).
- Fixed, 84px desktop / 68px mobile (owner, 2026-10-08: 8px slimmer; were 92 / 76). Transparent over the page at the top (the hero photo
  runs up behind it, darkened at the top edge); once the page scrolls, a frosted black
  glass bar fades in (200ms): as dark as the Home hero's glass strip (canvas 72% to 48%
  left to right over a 24px blur; owner, 2026-10-08, was a flat 55% over 20px), with a faint
  white hairline.
  The mobile running head under it is flat canvas. With the mobile menu open the bar is solid.
  Owner request (2026-10-04); with the footer's closing band and the Services opening
  (2026-10-06), the only glass outside the Services cards.
- Desktop: a three-column grid. The Ares mark alone on the left (46px, white; was 52px), the links
  centered (Home, About, Services, Careers, Capability Statement; Inter 15px / 400 (14px
  below 1024px), white,
  with a 1px underline that draws in on hover and stays under the current page), and a
  primary "Request a Quote" button (2px corners) with an arrow on the right. No phone number in the bar.
- Mobile: the mark (38px; was 44px) and a three-line menu icon that turns into an X. The menu is a
  solid canvas sheet with 20px links on hairline rows, the phone and email, and the
  primary button.

### Footer
Redesigned 2026-10-06, restored 2026-10-08 (owner, after trying Ada's and Pally's
footers; Mobbin: Retool's ruled columns, Railway's wordmark under
glass, Windsurf's beams, Opacity's light). A bigger footer with no quote button (the nav
and each page's close carry it). Same canvas, no top rule, a `beat` above it.
- **Top:** the Ares lockup (the mark at 52px, a 60px rule at ink 50%, and the ARES /
  SECURITY text logo at 44px, 28px apart; owner's reference), the company line set large
  under it (Inter Tight 500, 26 to 36px, ink, balanced, about 24ch) in 7 columns; on the
  right (3 columns, bottom-aligned) the phone and email in mono at 15px (small: the close
  above carries the phone large), then the profiles as quiet external links: LinkedIn,
  Google (Business), Indeed. These are the only social profiles. Phones: stacked.
- **Columns** (Retool): each opens on a 1px vertical hairline (hairline strong), a mono
  uppercase title in ink faint, links in Inter 18px ink (16px on phones). Company (About
  Us, Services, Careers, Capability Statement); Service areas; Contracting as label and
  mono value (GSA MAS 47QSMS25D009Q linking to eLibrary, UEI, CAGE); Registration as a
  live status: the green light (#7cb85f) and "Active on SAM.gov", "Through March 26,
  2027", and a Verify route. Four columns on desktop; an even 2x2 on phones, the
  identifiers stacked label over value.
- Then the certification marks separated by thin vertical lines.
- **The closing stage** (owner request: "aurora or gradient or opacity or glass"): the ARES
  letters of the text logo across the full container (only the letters, not SECURITY),
  over a slow rust and amber light rising from the bottom edge (soft radial glows, a
  white-hot core, and a faint conic fan of beams, all blurred, drifting side to side over
  17 to 22s; still under reduced motion). The letters are lit from below: ink at the top
  warming to amber (#f1c49a to #e2925a) at the foot (a black-to-rust version was tried
  and dropped, owner 2026-10-08). Their lower third sinks under a band
  of dark glass (canvas at 55% over a 22px blur, a white/10% top edge) that holds the
  legal row (mono 12px in a light grey, #c4c8ce): copyright, "Colorado Springs,
  Colorado", Privacy, Terms, Accessibility. Static, no pointer tracking (a pointer-led wordmark light was tried and removed,
  2026-10-05). The large "Get to know Ares" index was removed earlier (2026-10-04).
- Tried and replaced on 2026-10-08: the aurora band without the letters, Ada's split
  lower half with a large lockup, and Pally's rippled band with ghosted letters.

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
- **Allowed moments on Home:** the hero photo drifts slightly slower than the page as the
  hero leaves (4%), while the hero's glass strip and its copy rise faster than the page (40svh, was 26svh until the owner asked for faster, 2026-10-08;
  over the hero's exit, desktop from 900px; owner, 2026-10-08), so three layers move apart; ledger hairlines draw from left to right as rows enter (the text is
  already there); the full-bleed photograph opens from a 7% side inset to full width; the
  figure settles 32px upward as it enters. Plus press and arrow-nudge feedback.
- **Allowed moments on Services (2026-10-05):** the opening band drifts as it leaves;
  the stage bars draw along the axis; the Denver photo settles inside its frame. The
  division cards open with a FLIP on the real cards (320ms, drawer curve
  `cubic-bezier(0.32, 0.72, 0, 1)`): every card glides from where it was to where it is;
  a card that grows opens out of its old size with a clip-path (never a scale, so text
  never stretches), the opening one riding above the others. The cards stay in the page, under the fixed nav, so the nav keeps its glass.
  The + rotates into an x (220ms). Under reduced motion it opens instantly. Plus the index and city
  arrow nudges.
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
- **In-page links glide** (owner, 2026-10-09): every same-page "#" link (the section rails,
  the policies' table of contents, "See open roles", the skip link) smooth-scrolls and lands
  the section's first line of content 32px under the nav (24px under the running head on
  phones), on every page; links from other pages (e.g. /services#industrial) land the same
  way. `src/lib/scrollToSection.ts`; instant under reduced motion.
- **Page changes** (owner, 2026-10-09; reworked the same day for phones): a View
  Transition where supported: the old page fades out in 160ms while the new one rises 12px
  into place over 320ms (strong ease-out), on the compositor, so a busy phone can't eat it.
  The header gets no view-transition-name (that made it a backdrop root and its frosted glass
  vanished). Browsers without View Transitions, and back and forward, get a one-shot CSS fade
  (opacity 0.35 to 1, 260ms). **From the phone menu** the page changes behind the solid
  sheet, and two frames later the sheet slides up off it (240ms, drawer curve), revealing the
  new page: the reveal is the transition, with no other. A link to the page already open closes
  the menu and scrolls to the top. Not on the first load; nothing under reduced motion.
  `src/components/SmoothAnchors.tsx`.

## Do's and Don'ts

**Do**
- Keep every fact exact: GSA MAS 47QSMS25D009Q, SIN 561612, UEI XQXDN6E33SF4, CAGE 9KL18,
  NAICS 561612, WOSB250470, WBE2303571, founded 2021 in Colorado Springs, 719-696-3966,
  contact@aressecurity.co.
- Pair every proof element with a way to verify it.
- Write plain, natural copy. No em-dashes, no slogans, no stacked adjectives.
- Use real Ares and Colorado photography. Patrol-vehicle photos on Home only in 02 Quality (owner, 2026-10-06).
- Say "minority woman-owned". Veterans: veteran supervisors, a veteran NRA firearms
  instructor, veterans encouraged to apply. Never "veteran-led".
- Clearances (owner, 2026-10-06): Ares has no facility clearance (FCL) yet and cannot
  sponsor clearances. Keep copy general: never "cleared officers/roles" or
  "clearance-eligible". Lead with the restricted-area work instead: entry control for a
  experience: access control for restricted areas on military installations (plural, not
  named), alongside base security forces, on SOPs Ares writes. Succinct and client-facing,
  not a duty list. Only the
  Careers escort role states a clearance requirement.

**Never**
- **Card containers:** no boxed, filled, or bordered cards; no tile grids of stats,
  features, or services. Owner exceptions: the Services and Capability cards, the Home values cards.
- **Glassmorphism:** no backdrop blur or frosted panels, except the nav bar, the footer's
  closing band, the Services opening, the Home hero's copy band, and the 404 card (owner requests).
- **Background bands:** no section fills or alternating light and dark strips; the canvas
  never changes.
- **Section dividers:** no rule, gradient line, or ornament between sections; space and
  the hand-off line do that work.
- **Italic accent words:** no italic or colored word inside a headline for emphasis.
- **Bracketed eyebrows:** no `[ LABEL ]`, no tracked uppercase kickers above headings.
- **Icon-circle grids:** no rows of icons in circles or squares with captions.
- **Uniform spacing:** no single repeated section padding; every gap is chosen.
- No pills anywhere, no gradient text, no glow shadows, no blue accent, no bounce or elastic
  easing, no entrance that starts from opacity 0.
- No invented statistics, clients, logos, quotes, staff counts, or response times.
