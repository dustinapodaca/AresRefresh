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
    fontFamily: "'PP Fraktion Mono', ui-monospace, Menlo, monospace"
    fontSize: "15px, 18px desktop (ledger values 17px)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
    fontFeature: "'tnum' 1, 'zero' 1"
  figure:
    fontFamily: "'PP Fraktion Mono', ui-monospace, Menlo, monospace"
    fontSize: "clamp(96px, 11vw, 160px)"
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: "-0.06em"
  phone:
    fontFamily: "'PP Fraktion Mono', ui-monospace, Menlo, monospace"
    fontSize: "30px, 44px from 640px"
    fontWeight: 400
    letterSpacing: "-0.01em"
  mark:
    fontFamily: "'PP Fraktion Mono', ui-monospace, Menlo, monospace"
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

> **Home replaced (owner, 2026-10-20).** The Home is now "The Ground" (Components, "Home"). Other
> entries that mention the Home Record cards, the Home hero strip or photo, the credential strip,
> the Home rail, or the Home close describe the Dossier Home it replaced, kept in
> `docs/home-dossier.md` and git tag `home-dossier-final`.

> **Services and Capability Statement replaced (owner, 2026-10-24).** Both pages are now the
> home-flora designs (Components, "Services page" and "Capability Statement page"). Other entries that
> mention the Services dock, division cards, opening, schedule chart, or relief panel, or the Capability
> ticks rail, cards, frost band, or Download close, describe the pages they replaced, kept in
> `docs/services-schedule.md` and `docs/capability-served.md` (live through commit `931e70d`).

> **Option switches removed (owner, 2026-10-19).** Where this file says an alternative "stays at
> `?…`" or lists forms "to compare at `?…`", that alternative is no longer on the site: only the
> chosen version ships. Each is archived in git tag `options-archive-2026-10-19` and described in
> `docs/options-archive.md`.

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
- One true-black canvas from header to footer. No bands, no fills, no dividers.
- Three faces with fixed jobs: Inter Tight states, Inter explains, Fraktion Mono proves.
- Proof as a ledger: label column, mono values, a verification route on every row.
- A running document rail on desktop and a running head on mobile (About, Careers; Home since
  2026-10-20 and Services since 2026-10-24 read as one scene without them; the Capability Statement
  has its own rail and phone bar).
- Uneven rhythm on purpose: dense, open, image, tight.
- Square-shouldered controls (2px corners). Nothing is a pill.

## Colors

A cool, nearly colorless palette with one warm light source.

- **Canvas `#000000`** (true black; owner, 2026-10-10, was #0a0b0d blue-black) is the only
  page surface, everywhere, including the header, the mobile menu, and the footer.
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
    on Home the quote button under the lead shows below 1024px only (the call link was removed, owner 2026-10-13), since
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
- **Data: PP Fraktion Mono 400** (owner, 2026-10-25, after a font trial; was IBM Plex Mono) with
  slashed-zero numerals: identifiers, phone
  numbers, the measured figure, rail marks, and the footer's column titles and legal
  line (uppercase only for the column titles). Never prose or headings.
  Its own zero is dotted, so every rule that sets the data face also sets the slashed zero
  (`font-variant-numeric: tabular-nums slashed-zero`; site-wide since 2026-10-25, owner). Labels in it are 13px or
  larger (12px only where a narrow phone needs it, like Home's Record names at 360px), and a mono line
  set beside Inter is one step above it (14px by 13px Inter) so the two read the same size; Fraktion's
  letters are shorter than Inter's. Inter labels are 13px or larger. Labels inside drawings show at
  about 12px on screen (owner, 2026-10-25). Exception: on phones the Services "What we staff" cards and four stages
  keep their original mono sizes (10 to 11.5px, the drawing labels 8.5 to 9; owner, 2026-10-25).
- **Figure:** "<1%" in the data face 400 at clamp(96px, 11vw, 160px), clamp(88px, 8.4vw, 124px) on desktop
  (owner, 2026-10-05), top-aligned with its note.
- **Phone in the close:** the data face at 30px, 44px from 640px. The Contact headline carries
  the size.
- **Hero headlines (every H1) carry no closing period** (owner, 2026-10-10, `heroTitle()` in
  src/lib); section headlines (H2) keep theirs.
- No eyebrows or kickers above headings. No bracketed labels. (Breadcrumbs above the
  headline on service, industry, city, and article pages are navigation, not a label: the
  owner's one exception, 2026-10-10. 13px, ink faint, links in ink muted, "/" in hairline
  strong, from the same trail as the BreadcrumbList JSON-LD. On phones one line, a long
  current page ending in an ellipsis; owner, 2026-10-16.)
- Font loading: self-hosted Latin subsets (`src/fonts.css`), `display=swap`: Inter (300 to 800),
  Inter Tight (500, 600), PP Fraktion Mono (400 and 700 only, so text set at 500 shows as 400; Pangram
  Pangram, licensed by the owner).

## Layout

- **Container:** 1280px content max, fluid gutter 20 to 32px. Desktop (1200px and up)
  splits into the content column and a 168px rail column on the right.
- **Grid:** 12 columns, 24px gap. Text blocks rarely exceed 7 columns; data may run the
  full content width.
- **Rhythm:** sections hand off with uneven space. `beat-tight` (56 to 80px) between
  dense blocks of the same thought, `beat` (88 to 136px) between sections, `beat-open`
  (128 to 208px) before and after the quote and the close. Never the same gap twice in a
  row.
- **Order of beats on Home:** see Components, "Home" (2026-10-20).
- **Copy hand-offs:** each section ends on a line that sets up the next headline, so the
  headlines read as one argument.
- **Mobile (below 768px):** single column, gutters 20px, the rail becomes the running
  head, ledger rows stack (label above value), buttons run full width.

### The document rail

- Desktop only (1200px and up). A sticky column on the right edge of the document, from
  the first section to Contact, in mono at 14px. Each page sets its own marks. Home has no rail
  since 2026-10-20 (it had `01 Record` to `06 Contact`). Services none since 2026-10-24
  (the earlier page had `01 Divisions`, `02 Process`, `03 Areas`).
- A 1px vertical track (hairline strong) runs beside the marks. The current mark turns
  ink and gains a 12px rust tick on the track. Marks are links to their section.
- These are the only section numbers on the page. Section numbers never appear above
  headlines.
- **One form per page (owner, 2026-10-05).** Same marks, links, active section, and
  running head everywhere; each redesigned page draws the desktop rail its own way, all
  flat, typographic, and on the canvas (references: Linear's edge minimap, Intercom's
  dimmed list, Raw Materials' status line, Shupatto's counter). `DocRail variant=`:
  - `rail` (the Dossier Home; unused since 2026-10-20): the track and rust tick above.
  - `dock` (the earlier Services page, unused since 2026-10-24): a 44px bar fixed at the bottom center (solid canvas, hairline-strong
    edge, 2px corners) with the current mark left, a 44px segment per section filling
    with the reading position (like the page's stage meter), and `02 / 03` right. Slides
    up once the first section is reached and away once the footer comes into view; it
    counts every section (the close was removed, owner, 2026-10-06). With nothing
    on the side, Services drops the rail column: its sections run the full container,
    centered like the opening (owner, 2026-10-05).
  - `counter` (About until 2026-10-25, unused since; About now draws `ticks`, owner): the section number in the data face at 72px, rolling up into place
    (260ms) when it changes, `/ 04` beside it, the name beneath, and a 24px bar per
    section to jump with.
  - `ticks` (About since 2026-10-25, owner: "lines like a book"; was the earlier Capability Statement's,
    whose live page has its own rail and phone bar): a column of 1px dashes, one per ~360px of each section
    (3 to 9, the first longer); dashes already read turn ink muted and the current one is
    the rust tick. Only the current label shows at rest; all show on hover or focus. Labels are the
    section names only, no numbers (owner, 2026-10-25).
- **Running head (below 1200px):** a 36px strip fixed under the header showing the
  current mark (`02 Quality`) left, its count (`02 / 05`) right, and a 1px progress line
  along its bottom edge. It appears once the first section reaches the top and is solid
  canvas, not glass.

## Cards and glass (owner, 2026-10-10)

Cards and glass are part of the system, not exceptions.
- **Cards** are flat black, a shade darker than nothing would suggest on a true-black page:
  `--ds-card #060708` (a card on a card, such as a diagram node or an opened card,
  `--ds-card-raised #0d0e11`), with a 1px glass edge (`--ds-card-edge`, owner 2026-10-12): light
  rakes across it on a 150deg diagonal, white 28% at the top-left corner, never below about 10%
  (no dark band down the sides), a warm grey glint with a tad of rust (212 186 166 at 30%, owner 2026-10-12) low on the right,
  and 20% again at the bottom-right corner; drawn as a gradient border (was lit top and bottom,
  fading to 4% mid-side, 2026-10-10). No glow, no gradient fill, no blur, no
  drop shadow. 4px corners. Hover brightens the edge (`--ds-card-edge-hover`).
- **Used by:** the Home Record cards and the prime-contractor panel (with its diagram), the
  Capability Statement cards and GSA MAS block, the Services industry cards (the edge drawn
  over the photo as a masked ring), the Teaming diagram, the About founder portrait, and the
  quote form's fields and chips (the same surface at control scale; errors amber).
- **Glass cards, the default since 2026-10-15** (owner; the earlier solid lit-edge cards stay at
  `?cards=solid`, which sticks for the session; after
  gladia.io's speech-to-text page): every card becomes see-through glass: a dark wash from 52%
  black at the top to 32% at the foot, the page behind blurred 22px with its color lifted
  (saturate 1.65), a 1px white/10% edge with a white/14% inner line along the top, a soft shadow
  beneath (0 12px 36px, black 28%), the site's 4px corners (owner, 2026-10-15; cards inside cards
  are lighter: white 6% to 1.5%, 16px blur). The three Home Record cards and the six Capability Statement
  cards (open or closed) copy gladia.io's "How it compares" cards: one light inside each card, a rust glow tucked into the lower right corner
  (centred just outside it, kept as faint as Gladia's: rust 42% at the core, 16% a third of the
  way out, gone by 72%), so only its edge shows (owner, 2026-10-15). Since 2026-10-18 (owner) that light takes the prime panel's
  ramp, a step darker (rust 52% at the core, deep rust, then umber, gone by 78%; `--ds-card-rust`); the six cards now live on Services. On those six (owner, 2026-10-18) the light sits on its
  own layer: hovering a closed card fades it out over 400ms on an even ease while an inner black fill fades in, so
  the card goes fully black (owner; its edge no longer brightens), and opening a card fades the black out and the light back over 520ms once the 320ms open has finished (an owner
  exception to the 300ms limit: "softly"). The whole card is the button (owner, 2026-10-18): the
  header button's hit area stretches over it, so hovering anywhere animates the + and turns the number rust, and a
  click anywhere opens or closes it; "Open the full page" stays on top. Instant under reduced motion. Glows behind the cards (in their corners,
  or under them) were tried the same day and removed. The same stroke (`--ds-glass-edge` white/10%, `--ds-glass-top` the
  white/14% inner top line) goes on every glass surface in this mode: the nav bar and float card,
  the Home hero strip, the Services opening and card panels, the Capability frost band, the
  footer band, the toast, and the 404 card. Gladia's "liquid" edge refraction (an SVG
  displacement filter) works in Chrome only, so it was left out.
- **Liquid glass, the default** (owner 2026-10-15; plain glass `?cards=glass`, solid `?cards=solid`; after gladia.io's audio
  intelligence and meeting assistant pages): the glass cards plus a rim that bends the light behind
  them like the edge of a lens. `src/lib/liquidGlass.ts` builds an SVG backdrop filter for each
  card's exact size, matched to Gladia's own filter (owner, 2026-10-15: the first version faded at the
  edges instead of bending): the filter region runs 12% past the element so the rim has real page to
  bend, the bend is strongest right at the rim and dies off within about 20px (e^(-d/4) over a 24px
  rim), reaching 100px, then a light frost (7px on the cards, 10px on the Home hero strip, Services
  cards, and 404; 18px on the Services opening, footer, and Capability hero (owner, 2026-10-15); the footer alone has a
  14px frost along its rim easing into its full 18px (was 3px), so its bend shows (it read as a fade); 12px on the Home Record cards) with the color lifted and a
  thin highlight along the rim lit from the top left) on the Record, Capability, and pipeline
  cards. Chromium only; Safari and Firefox keep the CSS frost. No light behind the cards (a rust
  arc like Gladia's purple planet was tried and removed, owner 2026-10-15); the Record and
  Capability cards keep their faint rust light in the lower right corner, so the rim bends only the
  dot grid and the page. More color through all of it (owner, 2026-10-15): the cards' wash is 36% to
  20% black (was 52% to 32%), the Home hero's glass strip 50% to 30% (was 72% to 48%) and liquid too
  (its 24px blur, through `--ds-liquid` on its ::before), and the nav bar 50% (was 72%; 82% with a
  desktop menu open). The nav keeps its CSS frost: on its thin bar the liquid filter didn't take and
  the page showed through sharp. Since 2026-10-15 (owner) the liquid is on every glass surface,
  each at its CSS blur: the Home hero strip (through `--ds-liquid` on its ::before; the
  Capability hero's frost band was too, until 2026-10-22: full width, it re-ran on every scroll frame
  and dropped the top of the page to about 92fps on a 120Hz Mac, so it keeps its CSS frost and holds
  120), the Services opening and its card panels, the footer band, and
  the 404 card, each checked to frost (fine detail behind cut by half or more). Chrome doesn't run
  the filter on fixed or sticky glass. Performance (owner, 2026-10-15, after an audit: the Capability
  page stuttered on phones from the hero through the cards, where liquid glass covered up to 88% of
  the screen): the Capability cards have no backdrop filter (they sit on plain black, so it showed
  nothing; tint, edge, and corner light kept), and on phones and tablets the frost band under the
  Capability hero ends 4rem past the quick facts (was about 26rem) with the CSS frost, not the
  liquid; the page now has no liquid on a phone. Full-width bands bend and light only the edges that read as glass,
  never their sides or an edge that only shows when a phone's address bar slides away (owner,
  2026-10-15): the footer band, the Capability hero band, and the Services card panels their top, the
  Services opening its bottom, the Home hero strip its top and bottom. Also, so the nav, the quote toast, and the Home Record cards'
  phone pile keep the CSS frost (the pile at 26px with 62% to 50% black so the card beneath
  doesn't show). The Home Record cards are a little denser on desktop too (26px, 46% to 30%
  black). The prime pipeline's cards and tiles are solid, not glass, on Home and now on /teaming,
  which shows the same pipeline and animation in place of the diagram (owner, 2026-10-15). The Government industry page's smaller prime panel shows it thin (owner, 2026-10-15: Home
  and /teaming carry the full one; `PrimeStrip.tsx`): the copy across the top with the button at
  the right, then under a hairline the prime, Ares (WOSB · WBENC), and the three posts in one row of
  the pipeline's tiles (upright on phones), moving like the full pipeline: the line grows with the
  scroll with its rust tip, and each tile lifts, traces its edge, catches the shine, and brings up
  its green tag (Teaming, Subcontracting credit) as the line reaches it; the posts light in turn
  off a rust bracket. The full pipeline stays there at `?prime=pipeline`, the diagram at
  `?prime=diagram`. Three whole forms of the strip to compare (owner, 2026-10-15: the upright tiles looked bad
  on phones; each form has its desktop and phone layout) at `?pstrip=`: **`card` (chosen, owner 2026-10-16)**, `ledger` (three ruled columns under a hairline that fills left to right with the scroll, its rust tip
  lighting each column's dot and bringing up its tag; on phones the same as rows on a rail that
  grows downward), `card` (one pipeline card that lifts, traces, and shines, holding prime, Ares, and
  the posts as square chips joined by small rust arrows; side by side on desktop, stacked on phones),
  `track` (the stage meter's look: three stops on a line that fills with the scroll, labels under
  each, the posts as one-width chips under Posts); `row` keeps the row of tiles.
- **Glass** (backdrop blur over a dark tint) is for things that sit over moving or
  photographic content: the header bar, the Home hero strip, the Services opening, the
  footer's closing band, the 404 card, the toast. Not for cards on the plain canvas.

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
- **Hero background (Home), from 2026-10-15 (owner).** Since 2026-10-20 the Home hero shows the
  terrain through its cut-out headline with its own settings (Components, "Home"); the fallback still
  and the inline `data-terrain` check below still apply. The rest of this entry describes the terrain
  on the Dossier hero: React Bits' Topography
  (`src/components/home/Topography.tsx`, WebGL2), contour lines of a terrain in the site's rust
  (since 2026-10-16, owner: the prime panel's ramp by brightness, dim lines umber and deep rust,
  brighter ones rust and copper, pale clay only on the brightest ridges; was one rust, `#7a3c17`; 22 lines, every fifth bolder, elevation 0.5 (owner, 2026-10-15; was 1.15, then 0.65), landforms at 0.65 scale from 900px so
  desktop reads zoomed out a little (the component narrows its camera on wide screens; phones keep
  1; it was 0.55, too busy, then 0.75), with lower, rounder hills there (0.26) and less fine detail (0.12, phones
  0.35), like Colorado's rolling high plains rather than pointy or busy (owner, 2026-10-15), tilt 32, a slow forward glide, glow
  0.6), drifting under the copy in the photo's box with the same shades and the glass strip over
  it; the cursor lifts the land and a click sends a ring out over it. It rises from flat on load,
  pauses off screen, and holds still under reduced motion. It runs behind the nav and reads through
  it (owner, 2026-10-15): no shade from the top (the photo's), less distance fog (0.12, was 0.35),
  and the terrain starts above the window (160px on desktop, 100px on phones, the box growing by as
  much so the copy stays put) so mid-distance land, not the dark horizon, sits behind the nav. The nav
  glass is lighter for it in the liquid mode (42% black over an 18px blur; was 50% over 24px, then 32% over 14px). On desktop it fades to black into 01 Record over a longer
  stretch than the photo did (transparent at the foot, 35% at a fifth of the way up, solid by 46%; owner, 2026-10-15). Below 900px the terrain runs on to the end of the
  lead, 16px above the quote button (owner, 2026-10-16; it ended at the headline): the box grows by the
  measured headline-and-lead height and the copy is pulled up by the same, so the copy stays put. 50px shorter
  there since the headline went to three lines on phones (owner, 2026-10-19; after 24, 20, 16, and 58px). The copper-glass tower photo below moved
  to the Services opening and stays here at `/?herobg=photo`. (One change to the React Bits source:
  its cleanup no longer destroys the WebGL context, which drew the hero white under React's
  development Strict Mode.)
  **Fallback still (2026-10-18, owner):** a captured frame of the live terrain (`/images/hero-topo/
  terrain-desktop.webp` from 900px, `terrain-phone.webp` below; captured at 1440 and 390, 2x) shows
  only where the terrain can't run: WebGL2 blocked or missing, a software renderer, no JavaScript,
  the prerender, reduced motion. Never one then the other (owner, 2026-10-18: the still-then-terrain
  crossfade was rejected). A small inline script in index.html (allowed by its sha256 in
  public/_headers) opens a WebGL2 context before the first paint and sets `<html data-terrain>`:
  `live` runs the terrain and hides the still (not even fetched), `still` shows the still and never
  loads the terrain. `lib/terrainSupport.ts` does the same when Home is reached from another page.
  If the terrain was expected but draws nothing within 4s of visible time, the still fades in
  (`fallback`, 600ms), the only fade. Recapture the still if the terrain's colors or camera change.
- **Rules:** 1px hairlines only. Rules belong to rows and lists (ledger rows, city rows,
  division rows). A rule is never used to separate one section from the next.
- **Icons:** authored SVG arrows only (1.5px stroke, round caps): `→` for internal
  links, `↗` for external verification links. No icon sets, no icon circles. Every arrow turns rust on hover (owner, 2026-10-19), on links
  and in the nav, but not on the filled buttons (Request a Quote and the like); underlines and text keep their own hover colors. The one
  exception (owner, 2026-10-10): a phone handset drawn the same way (`PhoneIcon.tsx`, 22px,
  no fill) as the call link beside the menu button on phones and tablets.

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
  ink muted, 3 cols), value (the data face, ink, 5 cols), verification route (quiet link,
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
  location page, with an arrow that nudges 4px on hover. On desktop (owner, 2026-10-16) the
  list sits under the Coverage lead, left of the map (5 columns), the names at 26 to 32px.
- **Division list:** two columns at every width (Inter 17px / 500 in ink; 15px on phones),
  1px hairline under each item.

### Pull quote
- Inter 500 at display-md size, ink, set across up to 10 columns with hanging punctuation. The
  attribution sits beneath in Inter small: role in ink, base in ink muted. No avatar, no card, no quote
  icon.

### Home ("The Ground", the official Home since 2026-10-20, owner)
Branch `home-flora`, studied from flora.ai and Framer-built sites: one ground (the terrain), one
line (rust light and wires that run through the sections), one camera (the scroll engine). It
replaced the Dossier Home (01 Record cards through the two-route close), whose entries moved to
`docs/home-dossier.md`; that Home is restorable from git tag `home-dossier-final` (audit
`44e1f8f`). `src/pages/Home.tsx`, the sections in `src/components/home/` (`Hero`, `Record`,
`Industries`, `Prime`, `Quality`, `Coverage`, `Careers`, `Contact`), their styles in `home.css`
and `nx-*.css` (class prefix `nx-`).
- **Order:** the cut-out hero; 01 The record so far; 02 The sites we protect; For prime
  contractors; 03 Quality over quantity; 04 Where we work; 05 Now hiring; 06 Request a quote, or
  call us. Section ids `record`, `industries`, `prime`, `quality`, `coverage`, `careers`,
  `contact`. No rail and no running head on Home: the page reads as one scene.
- **Two shared objects.** The Statement: every headline is Inter Tight 600 at
  `clamp(48px, 8.4vw, 150px)`, leading 0.92, -0.055em (`clamp(40px, 5.8vw, 96px)` for the prime
  contractors line), much larger than the other pages' heads, so scale does the grouping. The
  card label (AI-tells pass, owner 2026-10-25; replaced flora's "Node" bar of a rust square, tracked
  mono capitals, and a counter at the right): a pure black tab across the card's top, Inter 12.5px /
  500 in white, a fainter note at the right in white 58%; the card keeps its own surface. On the
  prime diagram a tab's type is ink faint until its node lights, then white, and the wires meet the
  tab. The industry post brief carries "Post brief / Ares Security"; the phone deck's cards have no
  tab and the deck no blurred-photo glow. Elsewhere a label is plain data-face text in sentence case.
  Tags are square (2px corners), never pills.
- **Hero:** the headline "Security officers for Colorado's Front Range" (no period) is cut out of
  the black, a window onto the rust terrain moving behind it: a black layer holds the headline
  in white over the ground with `mix-blend-mode: multiply`, so the letters show the land and the
  h1 stays real text. Inter Tight 600 at `clamp(54px, 12.2vw, 188px)` (phones
  `clamp(48px, 14.4vw, 80px)`), leading 0.88, three lines on desktop; "Front Range" never wraps.
  The ground is a warm rust field (brightest low and to the right) with the Topography terrain
  screened over it (`#9c4f22`, 26 lines at 1.4px, glow 0.9, brightness 1.5, tilt 32; from 900px
  elevation 0.3, scale 0.7, detail 0.14; phones 0.5, 1, 0.35), or the captured still where the
  terrain can't run (the same `data-terrain` check as before, in index.html). Below the
  headline, across the foot of the screen: the lead in #c4c8ce (5 columns, 44ch), Request a
  Quote and the phone link at the right (on desktop the phone link first, then the button at the far
  right; owner, 2026-10-23) (the phone link hidden on phones, owner 2026-10-22: the nav's
  handset carries it), then the proof row (the GSA mark in white, 16px, then GSA MAS 47QSMS25D009Q to eLibrary;
  Minority woman-owned (WOSB, WBENC, M/WBE: Denver's certification, owner 2026-10-23); Licensed in Colorado Springs, Denver, Pueblo) on white/14%
  hairlines, one column below 1024px; a vertical mono "Scroll" cue at the top right at every width (phones and tablets too
  since 2026-10-22, owner), fading out over the first 160px of scroll.
  Load-in where motion runs: the light comes up inside the letters (1.8s) and the copy rises 18px
  after it (0.9s, from 0.9s). On scroll the screen holds for 165% of a screen: the copy lifts
  away, the camera flies into the F of "Front" (the headline layer scaling up to 40x about the F's
  stem while the black fades out, so the land is all there is; the terrain pitching from tilt 32 to
  62 and speeding up). Then the Ares mark in white comes up dead center of the screen (owner,
  2026-10-22: like a title card in a film; `clamp(132px, 24vmin, 260px)`, rising from 0.94; a second vertical mono "Scroll" cue in white 90% sits
  at its lower right, its foot level with the mark's, 10 to 18px away, and travels with it) once most of
  the land shows, holds for a beat, and scrolls away with the land as the stage lets go: the land
  dims to 22% as it leaves and a shade rises from its foot, so it melts into the black above 01. The layer carries no `will-change`:
  with it, Chrome on a Mac kept its zoomed tiles and drew only "Fro" on the way back up
  (2026-10-20).
- **01 Record:** "The record so far." with one lead line ("Federal agencies and commercial
  clients hold us to the same record."). Each proof gets its own moment: the figure in the data face
  at `clamp(96px, 14vw, 232px)` (the "/45" and "/5" quieter at 0.42em), its caption (Personnel's
  links to Indeed), its line, and a diagram drawn only from its own number, never a count we
  don't have: <1% as a 10 by 10 field, 43/45 as 45 criteria with 43 lit and 2 outlined, 4.8/5 as
  five bars with the last at 80%, each under a mono line and over a low rust light. Desktop with
  motion: the section pins for about a screen per figure, with a meter across the top and the three names (Reliability, Client rating,
  Personnel; no numbers since 2026-10-25) each set where its stretch of the meter starts, on a tick
  that drops to the line: as the rust fill reaches a tick, the tick lights with a small glowing point
  where the tick meets the line, drawn over the line so the fill passes behind it, and its name turns ink; names already passed stay ink muted (owner, 2026-10-25); the moments cross over, the diagrams
  build, and each figure's digits roll into place from nearby values (never from 0) as its
  moment arrives. Phones and tablets pin the same way since 2026-10-25 (owner; they had the three stacked), about 80% of a
  screen per figure, everything a step smaller so each figure, its lines, and its diagram fit one screen
  (checked at 390 by 664, Safari with its bars showing); 64px from the lead to the meter (owner, 2026-10-26; was about 136), and no bottom padding once pinned, since the frame ends on its own room (owner, 2026-10-26: about 245px from the last diagram to 02's headline, was 310). The resolved page: the three stacked, every
  diagram built.
- **02 Industries:** "The sites we protect." and its lead. Desktop with motion (1024px and up):
  the scene pins for about 80% of a screen per industry in the owner's order (Government & Defense;
  Commercial & Retail; Critical & High-Liability Sites; Institutional & Community; Construction,
  Industrial & Logistics; Airport & Transportation. Owner, 2026-10-26: Commercial & Retail and
  Institutional & Community brought into the first half so commercial and community buyers see
  themselves within a swipe or two; Government stays first. The same order everywhere the six
  appear); the active
  industry's photo (its industry page's photo and framing) fills the window behind everything,
  each new one wiping up from the foot and settling from 1.12; the six names (with mono numbers)
  slide up a large list so the active one sits at the optical center beside a rust tick, the
  others fading with distance; a glass post brief on the right (22px blur) carries that
  industry's name, short line, "What we staff" (its roles, each a link to the role page), "What
  to send us", and ends on "Open the <industry> page →" (the per-industry Request a Quote was
  removed, owner 2026-10-22); a
  counter and six segments along the foot. Clicking a name glides to its step. Phones and tablets
  (below 1024px; owner, 2026-10-22; "All services & how a post starts →" to /services under the lead,
  above the cards (under the lead on desktop too since 2026-10-23), from a bundle: the stacked list ran about 6,400px on a phone):
  a swipe deck (`IndustryDeck.tsx` on Swiper's cards effect since 2026-10-23, owner, after
  skiper-ui's card carousel: Swiper's touch handling with momentum and snap-back; was framer-motion;
  loaded on its own below 1024px so desktop never fetches it, and not in the prerender). One card at a
  time at the full column width (up to 480px on tablets); swipe or use the arrows for the next; past
  the last card it rewinds to the first. The motion (owner, 2026-10-23, after skiper-ui's creative
  carousel, skiper50; the cards effect felt like "1, 2", and a deck version came between) is Swiper's
  creative effect: the neighbours fold back at the front card's edges like doors, turned 100 degrees
  and 200px deep, the outgoing one shaded, so a swipe swings the card away around its left edge as the
  next swings in from the right; 650ms on an ease-out curve. The backdrop's color follows the card at once
  (a 0.3s crossfade from the moment the swipe is let go; owner, 2026-10-23); focus waits until it settles. Each card (owner, 2026-10-22: the text and its shade hid most
  of the photo) is the industry's photo on top in a 3:2 frame with nothing over it (the Home
  industry grade, saturate 0.78, brightness 0.84), then the short post brief under it on the card
  surface (`--ds-card`): the Node bar ("Post brief" in ink muted, 01 / 06 in ink faint), the name in
  ink, its one line in ink muted, and "Open the page →" at the card's foot (the industry page holds
  the roles and what to send us). Every card is the same height, the photo plus the longest brief,
  so the photos match from card to card. The active photo, blurred, is the section's backdrop; a
  counter, a six-step meter (rust for the current), and no arrows (owner, 2026-10-25: each step is a 44px tap target named for its industry); "Swipe the card
  for the next industry" in mono. Above the deck, the six industries' short names (Government, Commercial, Critical sites, Community,
  Construction, Airport) three across and two down, every name the same size and evenly spaced,
  Inter 13px on 2px-cornered boxes: the active one in ink with an ink edge, the rest ink muted on a
  hairline; each a button (44px to tap) that jumps to its card through the row's own control, the
  same as the meter's steps, and follows the swipe (owner, 2026-10-26; `IndustryIndex.tsx`). No
  counters, capitals, dots, or glow. It sits 50px above the deck so the
  peeking cards clear it. The first card deals in
  once when first seen, and as it does (owner, 2026-10-23) the next two peek out above it as a stack,
  each a step smaller (about 24 and 47px showing), hold a beat, and tuck in behind it, so the reader
  sees there are more to swipe to. Everywhere else (desktop without motion, the prerender, no JavaScript; on phones
  until the deck has drawn): six stacked blocks, the photo (16:10, 4px corners, its number in mono)
  beside or above the same brief.
- **For prime contractors:** the copy (the two-tone line and "Teaming & subcontracting →") beside
  cards joined by wires, no panel around them: Prime contractor (Needs posts covered under its
  contract) to Ares Security (SBA WOSB WOSB250470, WBENC WBE2303571) to three posts
  (Restricted-Area Escort, Access Control, Relief & Surge). Each card carries the black label tab
  (Home's card label, above); "Teaming" sits on the first wire as plain data-face text on the black,
  and two proof notes sit beside the cards they prove (subcontracting credit; restricted areas on a
  Space Force base in Colorado, 2025 to 2027; the reliability note was removed, owner 2026-10-25). No dot
  grid, no rust pulses, no wire end squares, no boxed capital tags, no dashed leaders (AI-tells pass,
  owner 2026-10-25). The low rust light stays. On desktop the wires draw with the scroll and each card
  lights as its wire reaches it. Phones and tablets with motion (owner, 2026-10-25; was a rail drawing
  down one column): the heading and its line hold the screen together with the row beneath them
  (owner, 2026-10-25, after Midday's and Stripe's how-it-works: the row alone left the screen mostly
  black), centered in the room under the nav and tightened on short phones. Below 1024px "Teaming &
  subcontracting →" is a text link under the line (like the industries' all-services link), not the
  button (owner, 2026-10-25). The row slides sideways with
  the scroll, like the Services stages on desktop, in three stops: the prime; Ares with its note under
  it; the three posts in one column. The row slides for about two thirds of the hold, then stops while
  the posts fall out of one another with the scroll (the second slides down from behind the first,
  then the third from behind the second). Until then they wait as a deck: only the lower edges of the
  second and third show under the first, 7px apart, each a step narrower (after Superpower's stacked
  steps); the cards are solid and the waiting stack dims by brightness, not opacity, so no text shows
  through (owner, 2026-10-25). The escort note comes
  up last, and the rail runs on to its far end before the section lets go. The rail runs across the
  card tops and fills rust to the reading line (62% across) with a bright tip; each stop lights as it
  reaches the line. No rust light behind the row on phones (owner, 2026-10-25). Where the browser has scroll-driven animations (owner, 2026-10-25: the scripted pan was choppy on an
  iPhone), the frame holds with `position: sticky` over a runway as long as the pan, and the row's slide,
  the rail and its tip, the posts falling, and the note are CSS animations on the section's view timeline, so they move with the scroll itself; script
  only measures on load and resize and flips the lit states (`lib/stickyPan.ts`). Other browsers keep the
  GSAP pin. Reduced motion and the
  resolved page: one column, built. The Government & Defense page keeps its own panel (below).
- **03 Quality:** "Quality [photo] over quantity.": the patrol vehicles sit in the headline as a
  word-sized photo (`clamp(48px, 11.4vw, 196px)`). Desktop with motion: the stage pins for 270%
  of a screen; the photo grows out of the line to fill the screen while the headline blurs away;
  the four facts (Established, Primary NAICS, Longest client, Post training) come in as small
  glass chips, each with a rust leader line drawn to a point on the cars; then a beat on the finished
  spec sheet (owner, 2026-10-22: about a quarter of a screen), then the photo dims and the principle
  ("We would rather staff fewer posts well...") rises, while the four facts stay in view and step back into darker glass (their
  leader lines dimmed; owner, 2026-10-25: they faded away before; Established raised to clear the
  principle). Resolved: the headline with
  its inline photo, the principle, the photo full width (16:10; 4:5 on phones) captioned "Ares
  patrol vehicles", and the facts as a ledger with rust ticks (four across, two on tablets, one
  on phones).
- **04 Coverage:** "Where we work." and its lead, the three cities set large on the left
  (`clamp(36px, 4.3vw, 72px)`, Colorado Springs first as HQ), each a link to its city page, and
  Colorado to scale on the right (the coverage map's projection, its dot grid, a rust glow on
  Colorado Springs, Pikes Peak as an open triangle). I-25 draws north to south with the scroll while the whole map is on screen (from when its foot comes into view; owner, 2026-10-25), done by the time its top is a quarter of the way down the screen (owner, 2026-10-26; it ran to just under the nav), over at least 15% of a screen of scrolling so it never pops in on a short laptop, a
  bright tip riding it, and each city comes up as the line reaches it (owner, 2026-10-22: the dot grows in place, one
  sonar ping ripples out from it, the ring opens around it, the name rises 6px into place, Pikes Peak with
  Colorado Springs; radii, not scale, so nothing flies in from the map's corner); pointing at or
  focusing a city lights its pin and dims the others. Resolved: the route drawn, every pin lit.
- **05 Careers:** "Now hiring armed and unarmed officers." over two Ares officers seen from
  behind. From 768px with motion the stage pins for 150% of a screen and the photo opens from a
  narrow vertical slit to the full screen, two rust edges riding out like a door; the headline
  reads in over its lower third, then the line ("Training for your city license, schedules
  posted ahead, and a supervisor who answers. Veterans encouraged to apply."), "See open roles →",
  and three nodes (Training: For your city license; Schedules: Posted ahead; Supervisors: Who
  answer). Phones: the photo (4:5) with the copy beneath; where motion runs (owner, 2026-10-23) it opens as it
  comes up the screen, no pin: from a centered window 40% wide to the full width, settling from 1.25, the
  rust edges riding out and fading.
- **06 Contact:** "Request a quote, or call us." across the width, then the phone as the largest
  object on the page (the data face, `min(11.6vw, 180px)`, a tel: link under a "Call us" node bar
  with "For urgent procurement timelines or active contracts."): its digits read in and a rust
  line draws in as its underline, an arrow at its end; the email and base in mono beneath. Then,
  quieter, the quote line and Request a Quote, and a low rust horizon that comes up as the page
  ends and hands over to the footer's closing light.
- **Phones:** about 130 to 150px between one section and the next (owner, 2026-10-25, as on Services; was
  168 to 216px); the Contact foot keeps its room for the light rising into the footer.
- **Motion and the resolved page.** The scroll engine (`components/home/engine.tsx`): GSAP
  ScrollTrigger for every pin and scrub on the browser's own scrolling, loaded by dynamic import on
  Home only, after the first paint, and torn down when Home unmounts. Native scroll since
  2026-10-21 (owner: the Lenis glide felt weighted; flora.ai scrolls like any page): the wheel and
  trackpad move the page directly and only the animations ease, trailing the scroll by 0.2s
  (`SCRUB`; was 0.4 to 0.7). The Lenis glide's `?glide` switch and the package were removed with
  the other option switches (owner, 2026-10-25); in-page links use the browser's smooth scroll
  (`scrollToSection`). Every headline reads in word by
  word with the scroll (from 0.12 opacity and 38% lower), scrubbed so scrolling back un-reads it.
  The resolved page is the default and is what the prerender, no JavaScript, reduced motion, and
  automated browsers get: every section laid out and fully visible, nothing pinned or scrubbed
  (`?motion` forces the engine on in an automated browser for checks).

### Prime contractors panel (Government & Defense page and /teaming; was Home, end of 02 Industries; owner 2026-10-10, pass 2)
- **Replaced 2026-10-25 (owner, the AI-tells pass) on both pages by "How teaming works"**
  (`src/components/market/TeamingChain.tsx`): three plain steps on one hairline, the prime contractor
  (holds the contract and needs posts covered under it), Ares Security as subcontractor (SBA
  WOSB250470 and WBENC WBE2303571 in the data face, the work counting toward the prime's
  small-business subcontracting goals), and the posts. Each step a title in Inter Tight 600 and a
  line in ink muted; no boxes, green tags, dots, tiles, or glow. The hairline on the left fills rust
  with the scroll (from the chain's top at 75% of the window to its foot at 35%) and each step comes
  up from 0.62 as the fill reaches it; scrubbed both ways; drawn and lit without JavaScript or under
  reduced motion. On /teaming it sat under "What the prime gets." until 2026-10-26, when the page was
  rebuilt (Components, "Teaming page"); on the Government & Defense page the panel and its glow are gone: the heading, the two-tone line, and the
  Teaming & subcontracting button on the left, the chain on the right (stacked on phones).
  `PrimePipeline`, `PrimeStrip`, and `PrimeGlow` were deleted; what follows describes them.
- **Since 2026-10-20 Home has its own prime section** (the node canvas, under "Home" above). This
  entry stays for the Government & Defense page's strip (`PrimeStrip`, `PrimeGlow`) and the /teaming
  pipeline (`PrimePipeline`); where it says "Home" it describes the Dossier Home.
- **Being redone (owner, 2026-10-16: it read as AI-made).** So far, after gladia.io's "Start
  transcribing in minutes" card: black, the site's lit glass edge (`--ds-card-edge`) with a white/12%
  line along the top and a faint inner rim, so the edge reads as glass; inside, one wedge of light
  rising from the lower right corner behind the diagram, like Gladia's eclipse glow (owner: "more
  pronounced, uniform, clean"): concentric ellipses through the clay and rust family, pale clay
  (250 214 182) at the core, then copper (232 150 98), rust (196 104 58), deep rust (122 56 26), and
  umber (58 24 10) into black, turned 26deg to fan up and to the left, blurred 26px into one smooth
  ramp, with Gladia's faint grey streak beyond it. Sized in px (820 by 440; phones 520 by 300) so
  every panel gets the same light. The copy stays on clean black. **Now a flowing mesh gradient**
  (owner, 2026-10-16, after a ColorFlow embed; `PrimeGlow.tsx`, WebGL1): broad shapes from a
  two-octave, low-frequency domain warp with smooth wavy edges, mostly black and umber with deep
  rust, and rust and copper only in the hottest folds, no pale clay (darker, owner 2026-10-16; a
  second field shifts the hue between deeper and warmer rust). The motion is a seamless 90-second
  loop (every offset travels around a circle), so it repeats instead of drifting until the light
  all but vanished; with a dim floor in the corner, the lit side stays within a narrow range. **Drawn in
  CSS by default since 2026-10-16** (owner: it looked poor on a phone, where the shader ran at half
  the CSS size and a 3x screen showed it stretched about 6x): four large soft radial-gradient shapes
  (umber, deep rust, rust, copper; a touch browner and dimmer than at first, owner 2026-10-18) on their own long loops (23 to 38s, ease-in-out, transform only,
  so the compositor does the work and it is crisp at any density), masked to the lower right
  (phones: the lower part of the panel), with a faint still SVG grain against banding. Still under
  reduced motion. The shader stays at `?primeglow=webgl`. Kept to the lower right (phones: the lower part of the
  panel), black over the copy. Drawn at half resolution, paused off screen, one still frame under
  reduced motion, skipped for automated browsers (the prerender); the CSS wedge above is the
  fallback without WebGL. No dot grid, no backdrop
  blur. Home and the Government & Defense panel. What follows describes the panel before the redo.
- A contained panel (an owner exception to "no card containers", like the Record cards),
  after Slash, Flora, and Resend: near-black (#0c0d10) with a soft white/4.5% light from
  above, white/8% inset edge, white/12% top line, 4px corners, 40px padding (22 on phones).
  The line is two-toned (claim in ink, detail muted, Flora). Three proof points
  (subcontracting credit WOSB250470 · WBE2303571; restricted areas, Space Force base in
  Colorado, 2025 to 2027; reliability <1% since 2021) and a solid "Teaming and
  subcontracting →" button. Forms at `/?prime=split|diagram|vignettes`: **diagram (chosen,
  owner 2026-10-10: prime → Ares → three posts; reworked 2026-10-12, owner: the dot grid spans
  the whole panel, masked to black over the copy and in from the middle, vignetted to black in
  the right corners (from the top half on phones); the diagram has no frame, its hairline wires
  are SVG (the fork curves into the posts) and draw on scroll, and a rust light runs a 3.6s
  cycle from the prime through Ares (its rust dot pulses) down each wire, lighting each post's
  corner dot rust as it lands; it first starts when the diagram rises above the bottom quarter of
  the window, then loops; ambient, still under reduced motion)** The same diagram and light run on /teaming (one
  component, `src/components/home/PrimeFlow.tsx`), on the plain black page with no dot grid
  (owner, 2026-10-12).,
  **pipeline (the default since 2026-10-15, owner; the diagram is `/?prime=diagram`)**, after gladia.io's "foundation of every voice
  product"): Prime contractor and Ares Security (WOSB250470, WBE2303571) as cards on a vertical
  line that grows with the scroll, its rust tip riding at 70% of the window
  (`PrimePipeline.tsx`); from the foot of Ares three separate straight lines drop to the three
  posts as small tiles, the service name only, stepping down 28px each left to right (18px on
  phones). The drops fill with the scroll like the main line, and each tile lights as its drop
  reaches it, left first (owner, 2026-10-15: they were full cards, then curved wires). Every card
  and tile also gets gladia's shine as it lights: a soft band of light sweeping across it once
  (1.2s). Cards wait at 0.62
  opacity, 22px lower; as the tip reaches one it lifts into place, a light runs once around its
  edge (1.1s), its values brighten in turn, and a small status tag in the status green comes up
  (2px corners). Nothing loops once it is built (owner, 2026-10-15: a rust light running down
  the line and a green "Fewer than 1% of shifts missed" finish were removed). On desktop the copy sits centered in the panel beside it
  (owner, 2026-10-15; it was sticky). Built and still under reduced motion.
  split (ask left, proof right, a vertical hairline), vignettes (three small working pictures; the term bar
  fills on scroll). The panel settles 24px on scroll. All static under reduced motion.

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

### Coverage map
- Since 2026-10-20 (owner) Home draws its own map (Components, "Home", 04 Coverage); this map
  (`CoverageMap.tsx`) is the Request a Quote page's. Where this entry says "Home" it describes the
  Dossier Home.
- An authored SVG of Colorado to scale (37°N to 41°N, 102.05°W to 109.05°W) on a faint dot
  grid, with Denver, Colorado Springs, and Pueblo plotted from real coordinates and
  Interstate 25 traced through them. Colorado Springs is marked in rust as HQ with one
  soft rust glow. Sits beside the Coverage headline on desktop, under it on mobile.
  On Home's map (owner, 2026-10-16) Pikes Peak in ink faint, drawn as on the location maps (an
  open triangle, its name to the left of it), at every width; not on the quote page. (DEN was
  tried the same day and removed.)

### Services page ("The Post", live since 2026-10-24, owner)
From the home-flora bundles (3) and (5), on Home's language and scroll engine (`src/pages/Services.tsx`,
the sections in `src/components/svc/`, styles in `svc.css` and `sv-*.css`). It replaced "The
Schedule" (archived in `docs/services-schedule.md`; live through `931e70d`). No rail, dock, or running
head: the page reads as one scene like Home. Section ids `sv-services`, `divisions` (industries; old
`/services#divisions` links still land), `sv-process`, `sv-relief`, `areas` (the close).
- **Hero, "the establishing shot":** the copper-glass towers (`hero6.jpg`, the route's preload) full
  bleed behind the headline "A prepared / officer on / every post" (three lines at every width; owner
  2026-10-23), Inter Tight 600, centered. Load-in where motion runs: the photo opens out of a slit of
  light in the middle of the black (1.5s) while it settles from a close, low framing; the three lines
  rise in turn from behind masks with room for descenders (the waiting lines sit fully below their
  masks, so nothing peeks); the lead and actions follow; then the six services come in as nodes with
  wires to a "Your post · Colorado Springs · Denver · Pueblo" bar; a rust light runs each wire. After it
  settles the photo breathes (22s) and leans from the cursor.
  - Desktop: the six nodes around the headline (mono bar with number and key, the title, keys) are the
    site's dark glass as plain CSS frost (14px blur, saturate 1.2; not the liquid filter, light on the
    GPU), drift with the cursor by depth, and each links down to its card in "What we staff." (it
    glides; the card is `svc-<id>`). Wires leave from the middle of each node's foot (from its top for
    the two below the post bar) and curve into the bar's side; they redraw as the leave runs so they
    meet the nodes on the way back up. Lead in #c4c8ce, Request a Quote and "See the six industries →"
    (to `#divisions`); 1024 to 1279px the lead narrows to 36ch so it clears the side nodes. Scrolling:
    the stage holds (sticky, 90vh) while the photo closes to a framed window and dims, the nodes spread
    out and fade, and the copy lifts away.
  - Phones (below 768px; owner, 2026-10-25, from a Claude Cowork patch): no nodes. The headline sits
    at the top (about 40px of black under the nav, was about 59; owner, 2026-10-25), centered as on desktop (owner, 2026-10-26; was left aligned like Home), at Home's phone size before Home's 6px bump
    (`clamp(48px, 14.4vw, 80px)` below 600px). Under it the copper-glass towers stand in a window of
    their own (4px corners, the hairline photo edge), measured from just under the headline to just
    above the lead (`--wt`, `--wb`), with the canopy's copper light spilling onto the black below; then
    the lead (left aligned) and "Who we protect ↓" (no quote button: the nav carries it). On load the
    window's shutter rises while the camera settles. With motion on, the stage holds while scrolling
    opens the window out to the whole screen (the reverse of the desktop aperture; its hairline outline
    gone within the first 5% of the scroll, at once however soon the reader scrolls, owner 2026-10-25); the headline lifts
    away behind the photo (it sits under the photo layer, so the opening window slides over the words and
    cuts them off as they fade; owner, 2026-10-25) and a shade comes up under the lead. In the window the Ares mark comes in as glass (owner,
    2026-10-25, from the same Cowork work; ReactDrops' Liquid Glass Logo, its license kept in the four
    `src/components/liquid-glass-logo*` files, set up by `svc/SvGlassMark.tsx`):
    nothing shows on load; on the reader's first scroll (owner, 2026-10-25) it plays once with
    ReactDrops' own setup (owner, 2026-10-25, replacing a glass card held mid-sequence): the
    sphere-to-tile glass entrance with chromatic edges, its plate see-through so the towers show through the
    glass as it forms (owner, 2026-10-26: was a dark navy tile) and the plate filling the window it sits in,
    measured on every phone (owner, 2026-10-26; was a rectangle 24px wider than the square on each side;
    `stretch` and `stretchY` settings we added to the component elongate the shape so its rim and
    refraction stay exact; the sphere stays round and widens as it squares off; the logo keeps its size; squarer corners than
    the component's own, through a `corner` setting we added, 18 for its rounded square's 5, owner 2026-10-26), then the glass clears and leaves the original
    mark alone at its normal size, white on the dark setting, `logoScale` 0.93, no text reveal. The
    ARES / SECURITY text logo (`ares-text.svg`; owner, 2026-10-25, was the mark) on a 288px tile (the
    glass's box runs past the window so the component has room to draw it that size; once the glass
    has settled, 2.6s in, the real SVG fades in over 0.3s on top of the canvas, which is hidden once it is in (no crossfade,
    which blinked), at the same size (the canvas's own fit
    to its box) and spot, since the
    canvas draws it from a bitmap at 2x and read soft on a phone; owner, 2026-10-25), centered in the
    window (owner, 2026-10-25: back where it started), it stays over the photo while the window opens. Phones only and lazy-loaded (desktop never fetches it); reduced motion shows the component's
    still mark. (Was the towers dimmed behind a centered headline with the lead in a black glass card.)
- **01 What we staff.** (owner, 2026-10-24; the bundle's "Pick a service."): the headline left, the
  lead right; six tall panels (pure black with the site's glass edge and top line, no dot grid or
  corner light; owner 2026-10-25) (armed, unarmed, access, escort, patrol, relief; owner 2026-10-26: Mobile Patrol before Relief & Surge Coverage, everywhere the six services appear), each a big number (the data face; owner, 2026-10-25) and
  one word at the top, a small working example of the post in the middle (a qualification card, a
  patrol round, a visitor log, an escort plan, a patrol route, a relief week; no "Example" label and no status lines under the escort plan or patrol route (owner, 2026-10-25); running
  only in view, still under reduced motion), and the service's name (a link to its page), line, and
  keys at the foot. Desktop three by two; phones a swipe row with the shared swipe controls under it (below). On phones
  (owner, 2026-10-25) the six are one height with the text at the foot of every card and each piece
  centered between the header and the text (at least 20px and 24px clear), and each piece waits at its start until its card is
  swiped in (most of it on screen), then runs; it pauses when swiped away and picks up where it was.
- **02 The sites we protect.** (`divisions`): the six industries in a row running off the right edge
  (swipe, wheel, drag, arrows, a progress bar); on desktop the row drifts left as the page passes.
  Redrawn 2026-10-25 (owner: the AI-tells pass; after the industry rows of Dropbox and Beside on
  Mobbin), the same at every width: each industry an open column with no box and nothing over the
  photo. The photo (4:3, 4px corners, the hairline photo edge, the stock grade), then on the black:
  the name (Inter Tight 600), its one line in full (no clipped paragraph; it names the sites, so the
  separate site line was folded into it, owner 2026-10-25), and "Open the page →" as the standard
  underlined link at the foot, so the six line up. No mono chips, rust squares, or wire and nodes. Nothing reveals on
  hover; the one pointer response is the photo easing up 2% in its frame, the underline turning ink,
  and the arrow nudging (mouse only). Phones and tablets: above the row, the six industries' short names (Government, Commercial, Critical sites, Community,
  Construction, Airport) three across and two down, every name the same size and evenly spaced,
  Inter 13px on 2px-cornered boxes: the active one in ink with an ink edge, the rest ink muted on a
  hairline; each a button (44px to tap) that jumps to its card through the row's own control, the
  same as the meter's steps, and follows the swipe (owner, 2026-10-26; `IndustryIndex.tsx`). No
  counters, capitals, dots, or glow. It shows only once the
  page's script runs (the prerender and no-JavaScript page have no row to move).
- **Phone swipe controls** (both rows above; owner, 2026-10-25; `SwipeControls.tsx`): under the row,
  the same as Home's industry deck and the Capability Statement's reasons: a meter with one step per
  card (passed steps white, the current one rust; tap a step to go there), no arrows (owner, 2026-10-25:
  each step is a 44px tap target named for its card, the tap alternative to the swipe), and "Swipe for the next service" / "Swipe for the next industry" in the data face. On
  phones the industries' header bar and arrows give way to these; wider screens keep them.
- **03 Four stages, from site walk to first shift.** Desktop with motion: the section holds and a wide
  canvas pans sideways: four stage nodes wired left to right (each in Home's dossier form since
  2026-10-25, owner: the number (the data face) and the stage's keys (Inter, fainter, at the right) in a
  pure black tab across the card's top, the card under it pure black with the glass edge), stage 03's six systems as satellites
  (each a pure black box with the glass edge that hugs its authored icon and name, centered on its
  spot; owner 2026-10-25), faint phase labels. Phones and tablets with motion (owner, 2026-10-25; was a rail drawing down the
  stacked list): the same pan in one row, without the canvas's tells (AI-tells pass; after the
  editorial step rows of Craft Agency and Trawelt on Mobbin). The heading holds about 88px under
  the nav (less on short phones; owner, 2026-10-25: halfway between centered and 20px) with the row
  beneath it, and the intro sits 72px under the row in a clean black card (then 72px to the closing line and 72px
  from it to the relief schedule: one even step on phones) (the site's
  glass edge and top line on pure black like the "What we staff" panels, 4px corners; no lit edge;
  owner 2026-10-26, was a faint white wash), held with them (owner, 2026-10-25). The card waits until
  the pan has finished, as the section lets go, then fades up 14px like the Capability Statement's
  blocks (owner, 2026-10-26: an exception to "no entrance from opacity 0"), and goes again if
  scrolled back into the pan. Each stage is an open column with no box: its number in the data face (faint,
  rust once reached), the title, the paragraph; no keyword triplets. One hairline across the row, to the far edge of stage 04,
  fills rust to a reading line (62% across, easing out to the line's end as the pan finishes; the
  section lets go the moment it is full, no hold; owner 2026-10-25), no glow or tip; a stage not yet reached rests at 0.62 and comes
  up over 300ms. Stage 03's systems are a plain two-column list on hairlines in Inter, each with its icon. As stage 03 comes in (its left edge 52% across;
  owner, 2026-10-26) the six fall into place one after another in reading order, each dropping 14px from
  above, 70ms apart, and lift back out together when scrolled back (an owner exception to "no entrance
  from opacity 0"; motion only). Scrubbed, so it
  reverses. Where the browser has scroll-driven animations (owner, 2026-10-25: the scripted pan was choppy on an
  iPhone), the frame holds with `position: sticky` over a runway as long as the pan, and the row's slide
  and the rust fill are CSS animations on the section's view timeline, so they move with the scroll itself; script
  only measures on load and resize and flips the lit states (`lib/stickyPan.ts`). Other browsers keep the
  GSAP pin. Reduced motion and the resolved page: the four stacked on a rust wire.
- **04 The relief schedule.** An example week of day, swing, and night posts on a canvas card; in view
  it loops one moment: Thursday night's officer is out (red), an "On-call" cursor picks the shift up
  from this week's on-call slot and it locks in green ("Covered the same shift from this week's on-call
  schedule"), a quieter "Supervisor" cursor drifting over the week. Finished and still by default.
- **The close** (`areas`): "Armed and unarmed officers in **Colorado Springs**, **Denver**, and
  **Pueblo**." with the call link and Request a Quote, then Denver in front of the Front Range dissolving
  into the black with the three cities as large links over its foot (each arrow stays beside the last
  word when a name wraps). Desktop with motion: the photo opens from an inset as it scrolls in.
- **Phones:** about 88 to 120px between one section's last line and the next one's first (owner,
  2026-10-23).
- The resolved page (prerender, no JavaScript, reduced motion, automated browsers) shows every section
  built and still.

### About page ("The Company File", 2026-10-05)
Home argues, Services schedules, About introduces. Concept and Mobbin board:
docs/about-concepts.md. Rail marks (owner, 2026-10-19): 01 Why Ares exists, 02 What we do differently (owner, 2026-10-28; was What clients told us), 03 Who stands your post.
- **Opening:** Pikes Peak and Garden of the Gods (`about-hero.jpg`, a real place, so a
  mono caption, top right under the nav) full bleed behind the headline, with a heavy
  shade from the top so the overcast sky stays in the canvas. Under the copy, the four
  certification marks on hairlines, each with its identifier in mono (GSA links to
  eLibrary); a label shows only where the mark says less than we do ("Minority
  woman-owned"). Entrance (owner, 2026-10-23: one after another, in quick succession): the hairlines draw left
  to right at an even speed, 110ms each, so they read as one line running across the row, and as it
  reaches each mark the logo rises 12px into place, then its number or label (8px), both out of
  nothing (from opacity 0: an owner exception to "no entrance from opacity 0", 2026-10-23), 420ms on
  a strong ease-out; once. Each mark plays once 40% of it is on screen, and whatever comes on
  screen together cascades together, after a short beat at load: on desktop all four at load; on
  phones the first two at load (they sit at the foot of the first screen) and the second two as they
  scroll up (owner, 2026-10-23). Static without JS or under reduced motion.
- **Why Ares exists** (founder block, before 01; owner 2026-10-10, pass 2 after Slash,
  Flora, Resend): **`letter` (chosen, owner 2026-10-10)**: the headline in columns 1 to 4, the story
  in Inter 500 at 20 to 26px in two tones in columns 6 to 12 (all of it ink muted but the last
  sentence, in ink; owner, 2026-10-19). Since 2026-10-23 (owner) it speaks in company voice, not as
  Deidre's own story, and has no signature: the portrait, her name and LinkedIn link, and the role
  line were removed (`founder-deidre.jpg` stays in the repo, unused; the founder Person in
  index.html's JSON-LD stays). In its place, under the story, a "Since 2021" timeline (owner,
  2026-10-23): the label in mono 13px ink faint, then an ordered list of five years (2021 Founded in
  Colorado Springs; 2022 Longest client on post, continuously since; 2023 Registered on SAM.gov ·
  WBENC certified; 2025 Restricted-area escort and access control on a Space Force base; 2026 Denver
  M/WBE and SBE · Colorado Verified) as 2px ticks on a hairline-strong
  rule, each year in mono above its tick and its line beneath in ink muted (14px). From 768px
  horizontal, the five evenly across the letter's width; below, vertical with the rule on the left.
  As its top passes 72% of the way down the screen, a little before the middle (owner, 2026-10-23; it was the middle), the years
  come in one after another in quick succession (owner, 2026-10-23): the rule runs from the first
  tick to the last at an even speed, 90ms a step (on phones one segment per step), and as it reaches
  each year its tick draws in and turns rust (240ms) while the year and its line rise 10px from 0.62
  opacity (360ms, a strong ease-out); the 2026 tick then keeps a soft rust glow. Drawn and rust by default (prerender, no JavaScript, reduced motion); the
  waiting state is armed only after mount. The rule and ticks are decorative.
- **02 What we do differently.** (owner, 2026-10-28: Deidre found "What clients told us." corny; owner, 2026-10-18; replaced "How we work.", whose process lives on
  Services): the page's signature section, `Heard.tsx`. Four things clients said about their last
  guard company (paraphrased, not testimonials: no quotation marks, no names) and what Ares does
  instead, each a liquid glass card, softer than the site's other glass (owner, 2026-10-19: CSS frost 30px at 1.2
  color lift, the liquid 18px at 1.1, over a light about 40% dimmer) (LIQUID from 768px; the CSS frost below, where Android Chrome drew a seam across
  the card, owner 2026-10-19, and in other browsers): a mono "What we heard"
  in ink faint, the complaint in display type, a hairline, a mono "What we do" in rust, the answer in
  ink at lead size. Desktop: the headline, intro, and a mono counter (01 / 04, the card nearest the
  center) hold still on the left (sticky under the nav); the cards pass on the right, 24vh apart so one
  holds the center at a time, over a very soft rust light held at the middle of the screen (the prime
  panel's CSS shapes, quieter). As a card's top passes 42% of the way down the screen, a little above the middle (owner, 2026-10-19; it was
  the center band), a rust line draws through each line of
  the complaint (a background on the inline text, 600ms), the complaint dims from ink muted to ink
  faint, and the answer rises 12px from 0.8 to full; passed cards stay resolved (Heard's own observer). Phones and tablets: one column, the same moment. The
  resolved state is the default (prerender, no JavaScript, reduced motion); the waiting state applies
  only once armed after mount. Then "Those details are what clients thank us for most." and "Tell us
  about your site →".
- **03 Who stands your post.** (owner, 2026-10-18; replaced "What we commit to our officers." and
  the five traits): an officer credential (`People.tsx`). Two real officers share one plate
  (`officer-portrait.jpg` first, `backbone-officer.jpg` second; same 4:5 crop and dark grade, a soft
  rust rim light from the lower right, no captions or names; the "Officer 01" / "Officer 02"
  captions were removed, owner 2026-10-19) while a
  liquid glass card set like an ID checks off five standards a buyer can check (Screened, Licensed,
  Trained, Qualified, Supervised): a mono bar "Officer standard" / "05 checks", five rows (mono number,
  the word in display type, its line in ink muted, a circular check), a mono foot "Ares Security ·
  Colorado". The card's wash is denser than other glass (64% to 54% black) and its mono labels ink muted
  (the numbers #c4c8ce), so all stay AA over the photo. Desktop: a 260vh stage with a sticky frame; the
  plate takes the left 55% and the card overlaps its right edge by about 15% (LIQUID at 12px); scroll
  progress (--p, one passive rAF listener) eases the photo from 1.06 to 1 and checks the rows at 0.12,
  0.30, 0.48, 0.66, and 0.84 (the ring fills and a rust mark draws in, 300ms; rows never uncheck); as
  row 03 checks, the plate turns to the second officer (500ms crossfade, an 8px drift), and back to the
  first on the way up (owner; the checks stay). Phones and
  tablets (owner, 2026-10-18): the photo (4:5, at most 58% of the screen's height) holds under the nav
  and running head while the card passes over it, from over the photo's foot by 72px at the start to the
  photo clear below the card (144px, so officer 02 holds in full view a little longer) at the end, so the
  officer passes behind the glass and comes out the other side, face in full view; the two officers crossfade with the scroll (--swap, an 8px drift) from
  when the card covers about 85% of the first to when row 05 checks, so the second is whole before it comes
  out, and it all reverses on the way up (CSS frost only below 768px, the Android seam). The closing line follows the card
  and holds 24px under the photo, so it is already there when the card clears; the photo and the line
  let go together (owner). Rows check at the optical center (the page's scroll
  observer, once). Without JavaScript, in the prerender, and under reduced
  motion: both officers side by side above the card, every row checked; the motion is armed only after
  mount. Then the closing line two-toned like the founder letter, and the Indeed proof as a small mono
  link with the external arrow.
- **No close** (owner, 2026-10-06): the page ends on 03 Who stands your post and hands straight to the
  footer. (04 Statement, the capability statement plate with its links, was removed; the
  Capability Statement page carries it.)

### Capability Statement page ("The company card", live since 2026-10-24, owner)
From the home-flora bundle (4) (`src/pages/CapabilityStatement.tsx`, `src/components/capnext/cn.css`,
content from `components/capability/data.ts`). It replaced "The Statement, Served" (archived in
`docs/capability-served.md`; live through `931e70d`). For people who just need the information: one
striking object, then a document. Formal third person ("Ares"), as the PDF. Low motion: the card's
tilt and one fade-up per block (`data-rv`, once).
- **Hero:** downtown Denver at sunset (`services-hero/denver-sunset.webp`) full bleed with the place
  caption "Downtown Denver, Colorado" top right under the nav (the site's `ds-caption ds-cs-hero-cap`,
  as on the other photo heroes); "Capability Statement" (Inter Tight 600, no period), a two-sentence
  lead, Download the PDF and "Verify on SAM.gov ↗" (on phones always side by side, the link centered
  on the button; the gap, the button's padding, and both labels step down from their full size at 390px
  to 12px type at 320px so the pair fits; owner, 2026-10-25; the link smaller, 13px at 390px, owner 2026-10-26), the spec line "1 page · PDF · 1.5 MB · 2026"
  (hidden on phones; on phones the headline sits lower, about 200px under the nav). Beside it (under it
  below 1024px) **the company card**: the CR80 badge ratio on desktop, the site's black glass (wash,
  edge, top line, 22px blur at 1.65, soft shadow; every line 4.96:1 or better over the sunset), 4px
  corners, no glow or sheen; the logo and wordmark with "Capability statement · 2026", "Ares Security
  LLC" and its line, then fields: UEI, CAGE code, GSA MAS (each with a copy button), NAICS · PSC,
  Set-aside (WOSB eligible), SAM (Active, with its date), and a foot with a drawn contact chip and the
  WOSB and WBE numbers. It turns toward the cursor (up to 7 to 9 degrees). Phones: the rail card's
  lockup (the mark at 26px and "ARES SECURITY LLC" in mono caps, 13px) instead of the wordmark and big
  name, fields two across, more air.
- **The document:** the site container (the same edges as the nav). Desktop (1100px and up): a sticky
  left rail (280px) with a compact copy of the card (UEI, CAGE, GSA, NAICS, SAM), the section index (the
  current one lit), and Download the PDF; it lets go when its foot meets the end of the last section.
  Below 1100px the rail is replaced by a slim bar that slides down under the nav once the hero card has
  scrolled away: the current section (opens the index), a PDF button, and a row of the identifiers that
  copy with a tap (a 6px strip tucked under the nav so no seam shows). Five sections, "01 / 05" to
  "05 / 05"; no closing Download section (owner, 2026-10-23: the hero, rail, and bar carry the PDF).
- **01 Core competencies.** The six as a ruled list: mono number, the title as a link to its service
  page, one line, and what it includes as small tags (dropped on phones).
- **02 Why Ares.** Four cards in a 2x2 grid on hairlines, each led by a large mono figure: "Restricted
  areas", "4-stage deployment" (both two lines at every width), "43 / 45", "4.8 / 5", then the title
  (the second reads "Ready before the first shift"; owner), the body, and a mono source line (the
  second names the stages: "Audit · Compliance · Training · Deployment · Trained on post by
  leadership"). The cards stay black while their contents rise in. Phones: a swipe row with the Home
  industry deck's controls (a meter with the current step in rust, each step a 44px tap target; no
  arrows since 2026-10-25, owner) and "Swipe for
  the next reason".
- **03 Past performance.** (owner, 2026-10-24: no revenue figure; revenue is company data, not past
  performance.) The lead "Selected contracts since 2021. Clients are not named here."; then, reading
  like the PDF and without the AI tells (owner, 2026-10-25: was a featured card with a status light and
  a Scope / Where / Term / Status ledger with status dots and mono heads), one list in the PDF's order on
  hairlines: each contract's scope (Inter 500) and where it was beneath ("Space Force base, Colorado ·
  Subcontractor on a federal construction program", "Denver metro · Multiple contract renewals",
  "Pueblo" under "Unarmed retail security"), its term at the right in the data face ("2025 to late 2027", "Since 2022, ongoing", "Since
  2024, ongoing"; under the where on phones); then the PDF's footnote, "Plus seven completed armed
  security contracts in Colorado, 2021 to 2025.", and "References available on request." to /contact.
  A value renders only where `data.ts` has one (values wait on Deidre).
- **04 How to buy from Ares.** The GSA MAS block: label and a green "Active" light, the contract number
  large with a copy button, SIN, schedule, and period as a ledger, "View on GSA eLibrary ↗"; then the
  other procurement paths with status lights (green available, an outlined dot on request) and the
  WOSB set-aside note.
- **05 Codes and certifications.** "All data matches our SAM.gov registration." Three groups (Codes and
  registration, Certifications, Licensing) as ledgers: the mark, label, value (copy where useful), note.
  Marks are white silhouettes in a 56px slot with the label 32px past it; the square GSA mark keeps its
  colors at 40px. Phones: the first group as two-column tiles, the GSA mark at its tile's top right.

### Teaming page ("Your contract, our officers", live since 2026-10-26, owner)
The second of two forms in the owner's teaming-previews bundle (the first, "The teaming sheet", read
too close to the Capability Statement and was not built). `src/pages/Teaming.tsx`,
`src/components/teaming/tb.css` (class prefix `tb-`). It replaced the market-parts page (identifiers
sheet, Roles we fill, the How teaming works chain, How we work). Every fact is the previous page's.
Teaming is two companies, so the hero is two photos, not one card.
- **Hero:** two panels side by side (stacked on phones, the headline above them), 4px corners and the
  hairline photo edge: a Space Force base from the air, its row of domes and a C-17 on the apron,
  Denver and the Front Range behind (owner, 2026-10-26; zoomed 1.12x, brightness 0.88; tried before it the same day:
  the base at golden hour zoomed on its domes; the bundle had the steel-frame build downtown), "Your contract" / "You hold the
  contract and the posts under it."; About's two Ares officers seen from behind, "Our officers" /
  "Trained on your post, with relief behind every shift." A 2px rust wire with a soft glow crosses the
  seam (down the right edge on phones) with a small glass "Teaming" label where it crosses (2px corners,
  sentence case; a 34% wash over a 20px blur at 1.6 color, the glass edge and top line; owner,
  2026-10-26, was 72% and read as solid; on phones the wire and label sit 48px in from the edge so the
  label is wholly on the photos). Under the panels, "Teaming & subcontracting" on one line on desktop, then the lead with
  Talk teaming and "Capability Statement (PDF)" (on phones side by side on one row, the link centered on
  the button, stepping down to 12px type at 320px like the Capability Statement hero; owner, 2026-10-26). On phones each panel has a soft dark corner at its foot left behind the
  copy (owner, 2026-10-26). On load (motion only) the halves close in on the seam while the photos
  settle, the wire draws out from the middle, then the label comes up.
- **Who we team with.** Three wide rows on hairlines: a 16:9 photo strip (the Space Force base at golden hour, cloud-free edit, for primes (owner, 2026-10-26; was the
  radomes behind the fence), the
  Ares patrol vehicles for guard companies (owner, 2026-10-26; was an Ares officer), offices in Colorado
  Springs under Pikes Peak, the builder's sign edited out, for builders (owner, 2026-10-26; was the data
  center campus), cropped in 1.16x from the left so another company's name on the brick building there
  stays out of frame), the partner and its line, and
  the posts it needs as ruled links.
- **What the prime gets.** The line on subcontracting goals as the lead, then the three certification
  numbers large in the data face (WOSB250470, WBE2303571, 21353671) with their labels, then a short
  ledger (links in it take the row's type): licensed (each city a link to its own page; owner,
  2026-10-26), reliability, past performance, the GSA MAS contract vehicle, and the identifiers as
  a link to the Capability Statement (they live there, not here).
- **From the contract to the first shift.** Five steps (send the contract; who we can staff and when;
  post orders written with you, with mutual non-solicitation; trained on your post; relief behind every
  post) on a hairline that fills rust with the scroll, each number turning rust as it is reached
  (across on desktop, down on phones).
- **Questions,** the shared questions block, then the close: "Send us the contract." with the phone as
  the largest object (the data face, a rust rule drawing under it), the email and city in mono (stacked
  on phones), Talk teaming, and a low rust horizon into the footer.
- Quiet motion: the hero opener, one fade-up per block (`data-rv`, once), the step line. The resolved
  page (prerender, no JavaScript, reduced motion) shows everything, the wire drawn.

### Executive Protection division (mock, /executive-protection-next, 2026-10-30)

A preview of what an Executive Protection division page could be if Ares starts one (owner, 2026-10-30). Ares does not offer executive protection today. A preview page (owner, 2026-10-30): on the dev server and on Netlify only, never in the DreamHost release build (`src/lib/previewPages.ts`: `VITE_PREVIEW_PAGES` is set in netlify.toml; without it the build swaps the page for `previewStub.tsx` in vite.config.ts, leaves out its route and menu link, and the prerender and check:seo skip routes.json entries marked `preview`). Noindex and out of the sitemap. Linked from the Industries menu as "Executive protection" beside "All industries & how a post starts", as Teaming sits beside All services (desktop row and phone page); the button in the header reads "Request a consultation" on this route. Files: `src/pages/ExecutiveProtectionNext.tsx`, `src/components/ep/ep.css` (prefix `ep-`).

- **Why one page.** Executive protection is both a service and the people it serves, and its buyer (a chief of staff, a family office, a corporate security director) is not the buyer of guard posts. So it is a division page of its own, like /teaming, linked from the Services menu as a division, not a seventh service or a seventh industry card.
- **Hero.** The Colorado Capitol at night (`/images/services-hero/denver-capitol-night.webp`, unused on the live Services hero) full bleed, with one route leaving from the Capitol's door (07:40 Depart), running east to the avenue and turning northeast up it (07:52 Route B), then on past Route B a short way up the avenue, east along the cross street to the far corner, and sharply north (the owner's red line, 2026-10-30), out toward the city lights on the horizon (08:05 Arrive, a smaller mark, the line fading as it goes; owner, 2026-10-30, was drawn the other way, ending at the door, then straight past Route B, then a street jog). The stop labels are small glass chips like the Teaming label on the /teaming hero (2px corners, a 34% wash over a 20px blur at 1.6, the glass edge and top line; owner, 2026-10-30), Depart's under its dot, clear of the line. The headline has no period, like every H1. The photo is drawn as cover by hand on a 4:3 stage sized with container units, so the route (SVG in the photo's 800 by 600 units) and the HTML stop labels stay on the streets at every size; `--px` and `--py` are the object-position (0.5/0.75 desktop, 0.68 tablet, 0.8/0.5 phone, where the window is 52svh so the whole route fits). On load the photo settles, the line draws (stroke-dashoffset on pathLength 1; no non-scaling stroke, which breaks the dash), and each stop comes up as the line reaches it. Phones: the photo as a 52svh window, the headline below on black.
- **Sections.** Who we protect (four audiences, two across on hairlines); What a detail covers (Before, On the day, After as three panels, the middle one lit rust); One detail lead, known by name (the same-agents promise from how Ares runs every post, beside a glass card over the Capitol's dome: the planned Director of Executive Protection, his background, New York from 2027); Discreet by default (ledger); Where we work (Colorado now, licensed in Denver, Colorado Springs, and Pueblo; New York from 2027); five steps on the rust hairline; FAQ; the phone close.
- **Copy is draft.** The NDA-first, plain-clothes, nothing-posted, and New York lines are commitments for the owner to confirm before anything goes live. No clients, numbers, or credentials invented; armed coverage outside Colorado is said to follow each state's licensing.
- **Before it goes live.** Add an "Executive protection" option to the Request a Quote form (it reads `?service=executive-protection`; today that falls back to the default), real division photography (plain clothes, vehicles, no faces), the director's name if he wants it shown, and the New York license details once held.

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
  reads every request and will reply to {email}.", then (design review, owner 2026-10-13) what happens next as three short numbered
  steps on hairlines (We read your request; We walk your site, before anything is signed; You
  get a scoped proposal), the call link and the capability statement PDF, and the request's
  subject in mono under a hairline. No reply time. Closes itself after 14s (was 7s). Not a modal (no scrim, no focus trap; Escape and the x close it). A sent request
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
  `careers-hero.jpg` key, captioned; the route's SEO preload) as a band, "Security officer jobs in Colorado" (owner, 2026-10-19; was "Join the team.", then "Officer jobs with paid training") and the lead low on it, then the Indeed rating as a small
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
license, say what only this city's page can, list the sites we are ready to staff there,
answer two local questions, then hand off. Concept and Mobbin
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
- **Security in <city>.** (copy audit, 2026-10-10): right after the opening, the headline
  left and one paragraph of about 120 to 130 words right (`local` in data.ts), only facts
  already on the site and "ready to staff" wording, never current clients. Two questions
  per city (the city's license, and starting a post or the area covered) sit after the
  sites list as the shared questions block, with FAQPage JSON-LD. Pueblo's "where our CEO
  started" line waits for Deidre.
- **Licensed in <city>:** Colorado has no statewide license; the city licenses security
  companies itself. The city's license as Home's ledger row (label, mono value, route):
  license number with "Verify ↗" (on its line at the right at every width; owner, 2026-10-08) (the city's public record; Colorado Springs: Accela;
  Denver: Accela; Pueblo has none, so "Request a copy", an email), status (licensed and bonded, armed and
  unarmed), training provider, armed endorsements, office (CO 80906 only, never a street; its note on one line, "Headquarters" with the distance or "since 2021"). On the Denver map the airport reads "DEN AIRPORT" on one line, lifted clear of the city's name.
- **Sites we are ready to staff here:** a ruled list, two columns from 768px read downward
  (4 + 3), each column closed by a hairline; each row is
  the site type (Inter 17px / 500), its division beneath (13px faint), and an arrow that
  nudges 4px on hover; it links to `/services#<division>` (ScrollToTop scrolls to the
  anchor). Never phrased as current clients or posts. Since 2026-10-10 (copy audit) each row
  links to its industry's own page instead.
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
- The document: title (display-lg, no period since 2026-10-10), "Effective <date>" and "Ares Security
  LLC" in mono 13px faint, an 18px intro, an at-a-glance ledger (Home's ledger row, label 3
  and value 7 parts), then sections: Inter 600 20 to 24px sub-heads, 16px / 1.7 body in ink
  muted at 68ch, strong in ink, lists with a 10px hairline marker.

### Role, industry, insight, and city job pages (test branch, 2026-10-08)
From the CenCore review (docs/market-concepts.md). One shared vocabulary (`ds-mk-*`), no
rail, no cards, no eyebrows (breadcrumbs live in JSON-LD only).
- **Role pages (`/services/<slug>`):** the search phrase as the headline (display-xl, 7
  columns), lead, quote button (`/contact?service=<slug>`) and call link; behind the opening (owner,
  2026-10-26, on all six after a trial on Armed Security Officers) ReactDrops' Topographic Flow
  (`components/topographic-*`, unchanged; `market/RoleTerrain.tsx`): grey contour lines with deep rust
  (#8b4920) accents drifting on the black at 0.38 opacity, faint (owner), rings where the pointer moves,
  running up behind the nav and masked into the canvas at its foot; loaded on its own after the page,
  not in the prerender or automated browsers, still under reduced motion; beside it a spec
  sheet on hairlines (label 13px faint over value 16px ink; GSA routes to eLibrary). Then
  "What the post covers." (four duties two by two, the mono number on the title's line),
  "Where it is asked for." (industry routes), questions, an ask strip, "More services.".
- **Industry pages (`/industries/<slug>`):** a long headline (up to 15em), lead and actions
  in one row, then a full-bleed scene masked into the canvas, no caption. The scenes are
  moving to real photos the owner finds, one industry at a time (owner, 2026-10-12: the
  generated ones read as generic and fake; a second generated round was rejected too).
  Construction, Industrial & Logistics is the first: a steel-frame build in downtown
  Colorado Springs on a winter day, the contractor's name on the elevator core removed,
  framed at `50% 35%` so the crane and roofline show (each image can set its own `position`
  in `industries.ts`; default `50% 60%`). Government & Defense (renamed from Government & Military,
  owner 2026-10-16: federal agencies, military installations, and defense contractors, pitched
  like CenCore's defense page without its clearance claims): radomes behind a barbed-wire fence on a
  Space Force base in Colorado (DVIDS 7084760), strip at `50% 90%` (whole radomes, the mountains, the
  fence line), Home's card on the left radome behind the fence (`0% 50%`, 1.35x toward `22% 88%`; on desktop `29% 50%`, about
  three-fifths of the left radome showing, owner 2026-10-18, through the card's `desktopPosition`).
  The golden-hour base photo before it (and its cloud-free edit) is in images-unused. Airport & Transportation:
  Denver International's terminal and hotel at sunset with a jet climbing out (owner,
  2026-10-12, chosen back over a blue-hour roadway photo, kept graded and plain in
  images-unused), strip at `50% 96%` so the terminal rides above the bottom fade; phones zoom
  1.6x toward the right end and the jet (`mobile` in `industries.ts`: position, zoom, origin). Critical & High-Liability Sites: a data center campus under snowy peaks
  (owner, 2026-10-12, over a server-aisle photo kept in images-unused), strip at `50% 80%` on
  the building; phones and Home's card show the peaks too.
  Commercial & Retail (owner, 2026-10-16): the Denver Pavilions sign on 16th Street, its letters
  in rust with a glass tower behind (Unsplash, Benigno Hoyuela), strip at `50% 50%` on the D and the
  tower; phones show the whole word. The Coyote Ugly signs (on the wall and over the door) were
  removed with a masked edit, only the two patches put back (owner, 2026-10-16); the original is
  kept beside it. Institutional & Community (owner, 2026-10-16): apartment
  buildings at blue hour, balconies and warm lit windows (Unsplash, Getty Images), strip at `50% 72%`
  so the lit windows sit above the fade. All six industries now use real photos. "What is at stake." (headline left, prose
  right), "What we deliver." (role routes), "Why Ares here." (spec sheet), the ask,
  questions, "Other industries.".
- **Questions:** the heading left (sticky on desktop) and native details on hairlines
  right, a + that folds into a minus (220ms). One open at a time (owner, 2026-10-16): the answer
  eases open (260ms, rising 6px) and shut (200ms), the open one closing as another opens; native
  details without JS, a snap under reduced motion. FAQPage JSON-LD in the body.
- **Ask strip:** one plain line (Inter Tight 500, 22 to 30px), the quote button and the
  call link, on a hairline-strong rule.
- **Routes:** ruled links, a title (Inter Tight 600, 20 to 24px) and a line, three across
  from 768px, arrows nudge on hover.
- **Insights:** the index as ruled rows (title, summary, category and date in a right
  column on desktop); articles in one 46rem reading column, 17px / 1.7, the first paragraph
  in ink, then (2026-10-26) a Sources list of external links where the article has them, related
  links, its questions in the shared questions block with FAQPage JSON-LD where it has them, and more
  insights. A refreshed article shows "Updated <date>" in the meta row (its dateModified). Article
  JSON-LD.
- **Jobs by city (`/careers/<city>`):** open roles on hairlines with Apply (email with the
  role and city), licensing handled, why people stay (two by two) with the Indeed rating,
  other cities.
- **Quote form:** "About the post" adds square chips (40px, 2px corners, ink when chosen;
  never pills) for location, officers on post, schedule, and start, and selects for site
  type and how they heard. Prefilled from `?service=` and `?industry=`.
- **Services:** "By role, or by industry." (the index) after the divisions. "A security program,
  not a headcount." was folded away (owner, 2026-10-15: it repeated the four stages; tagged
  `services-program-option`): its post orders and SOPs went into stage 02, training on the post
  into 03, and leadership on the first shift and the audit logs into 04. Two parts stood on their
  own after the stages; since 2026-10-16 only the relief schedule does:
  - **04 The relief schedule** (owner, 2026-10-15; was "The relief roster"): a contained panel (the prime contractors panel's surface, 4px
    corners, 48px padding on desktop; since 2026-10-18 (owner) its redone surface: black, the lit glass edge, a brighter top line and
    a faint inner rim, without the rust light) with "The relief schedule." (display-md), its paragraph, and
    the proof beside the green status light ("Fewer than 1% of shifts missed since 2021", mono) in
    columns 1 to 5, and a small week of shifts in columns 7 to 12 (stacked on phones): Mon to Sun
    in mono over Day, Swing, and Night rows of small hairline tiles with a dot each, an On-call
    row of hatched slots a little apart (rust edge and hatch since 2026-10-18, owner), and a status line in mono under a hairline. One quiet
    moment once the whole week is on screen below the nav (owner, 2026-10-18; was 55% of it) (an example week, labeled as one for screen readers): the
    week fills in cell by cell (28ms apart), Thursday night's dot turns red (#e5534b; owner,
    2026-10-15, was amber) ("Thursday night: officer out", held 2.4s), the on-call slot beneath it
    lights green and a hairline rises into the shift (1560ms), and 1.8s later the shift turns green
    (from the call-out on, three times the first pace so it can be read; owner, 2026-10-15), "Covered
    the same shift from this week's on-call schedule" (owner). Once, then it holds; the finished week is the default (prerendered, no JS,
    reduced motion, or already on screen). The green is the Capability page's status green; the
    red is used only here.
  - **Trained on your systems** (folded into stage 03 Guard training, owner 2026-10-16; the
    section is tagged `services-systems-option`): the stage's line now ends on "the systems already
    there", and the six systems follow it as square tags with their authored icons (2px corners,
    hairline-strong edge, 14px, the icon in ink muted), wrapping. Below 1024px, in the swipe row,
    short names on smaller tags (13px, 30px tall: Card readers, CCTV, Visitor software, Radios,
    Gates and docks, Alarms) so the six take three rows, not six (owner, 2026-10-16). (Was its own
    section: headline and lead left, the tags two by two right.)
  The dock counts five sections (Services, Industries, Process, Relief schedule, Areas).

### Mobile breaks (below 1024px unless noted)
- **Swipe rows** (About Staffing and People, Capability Why Ares; scroll snap, 84% slides
  so the next one peeks) with a hairline progress bar that fills as the row scrolls.
- **Ledger groups fold** (at every width since 2026-10-05, owner request; first built
  for phones) behind tappable rows showing the group name, the entry count, and a
  chevron. The four key identifiers stay visible above them.
- **The figure** is set at 22vw on phones.
- **The pull quote sits right** (flush to the right edge, right-aligned), echoing the
  desktop layout where it lives in the right-hand columns. **The hero's proof row** is two
  by two (with the "current" option, the GSA line is centered instead).

### Header
- **Panel nav (owner, 2026-10-13; live), edge to edge:** the bar runs across the whole top at
  the old bar's height (`--ds-header`), square, one hairline along its foot, content aligned
  with the page container; on phones the open list covers the screen. The floating card
  described next stays at `?nav=float`.
- **Panel nav (owner, 2026-10-13; live).** From a 21st.dev "navbar2" the owner chose, rebuilt
  for the site (React Router, CSS motion, the site's own icons, 2px and 4px corners, no
  language switcher or sign-in). A floating dark-glass card (canvas at 72% over a 24px blur,
  90% when open, the site's glass edge as a masked ring), 60px tall on phones and 68px on
  desktop, inside the same `--ds-header` height (64px and 72px since 2026-10-13, owner). The lockup is the footer's scaled down: the
  mark, a 1px divider at ink 50% a little taller than it, and the wordmark nearly its height
  (owner, 2026-10-13). Desktop: the lockup, then
  Services, Industries, and Company as menu buttons (a 2px-cornered box of full black on hover and when open; owner, 2026-10-19, was a lighter tint) and
  Capability Statement as a link, held in a centered column so they never shift when the
  context button at the right changes length; no phone number on desktop (owner). A
  menu grows the card downward (grid rows, 350ms): a 288px real photo with a mono caption beneath on the
  left (owner, 2026-10-19; was on the right), 96px from the links, then two columns of large Inter Tight links under a small
  faint label, and a row of
  footer links under a hairline (Company adds LinkedIn, Google, and Indeed). In Services and
  Industries the footer holds the overview links (All services and how a post starts, Teaming;
  All industries and how a post starts), drawn with weight: ink, 16px / 500, a brighter
  underline (owner, 2026-10-13). Each photo sets its own framing: the patrol cars just below
  center (50% 90%), the Space Force base zoomed 1.6 toward the radomes on the left. In Industries the photo follows the
  link hovered or focused (owner, 2026-10-16): each industry's own page photo, crossfading in 220ms
  and holding until the menu closes, each with a one-line caption (Space Force base, data center in
  view of the Rockies, downtown Colorado Springs build, Denver International, Denver Pavilions, an
  apartment community in Colorado; the data center and apartment lines are the owner's).
  Services and Company keep one photo. Phones: lockup,
  handset, and a two-line menu button that turns to an X; the card opens into a list with the
  three menus as accordions (Services opens on "All services and how a post starts" and Teaming, Industries on "All industries and how a post starts" (also to /services), each then a divider and the six; Company lists its links, no city links; owner 2026-10-13), then a solid strip pinned to the bottom of the open menu so it stays on screen while the list scrolls: the phone (mono) with LinkedIn, Google, and Indeed as small monochrome marks on the right, the email, and the main button. No PDF button in the phone menu (owner, 2026-10-13). Company lists its links only. Closing the menu resets every section to folded. Since 2026-10-15 (owner, after gigaenergy.com's
  phone menu) the open sections carry photos: Services lists the six with a 56px real Ares photo
  beside each (the officer at the range for Armed, the officer with the badge for Unarmed, the
  officer portrait for Access Control, the Space Force base for Restricted-Area Escort, the patrol cars for
  Mobile Patrol, the team at the range for Relief & Surge), its name, and its tags in mono;
  Industries is a row of photo cards (the industry pages' photos, 16:10, 72% wide so the next one
  peeks) that swipes sideways, with the name and short line. The plain lists stay at ?mnav=list.
  Since later on 2026-10-15 (owner, a hybrid with yucca.co.za) the phone menu is pages that slide
  over: the main page lists Services, Industries, Company, and Capability Statement as large links
  (Inter Tight 600 20px, was 25; each page's title the same 20px) with arrows; tapping one slides the list a quarter to the left and dims it
  while that section's page slides in over it from the right (460ms, the drawer curve), with a bar holding
  Back (focused) on the left and the section's name on the right (owner, 2026-10-15), its content
  coming up in turn. Services and Industries keep the
  photo list and the swipe row; Company is four photo tiles (About Ares with Pikes Peak, Careers
  with the two officers from the Home careers band, Capability Statement with Denver at sunset,
  Insights with the owner's LinkedIn banner, `/images/nav/insights.png`; 90px (thinner, owner 2026-10-26; was 104), 4px corners, a dark
  wash from the foot). Teaming and Request a Quote aren't repeated there on phones: Teaming is on the
  Services page and the quote button is always pinned at the foot (owner, 2026-10-15). The pages reset to the main one when the menu closes. While a page scrolls, the logo bar stays at the top and the Back bar
  just under it, both solid, the content scrolling behind them (owner, 2026-10-15). The photo accordions stay at
  ?mnav=accordion. The menu button is three bars (the top one long) that slide off to the right one
  after another, then an X that draws in stroke by stroke; the reverse on close. The strip with the phone, email, and Request a Quote
  always sits on the bottom of the screen while the menu is open, however short the list (owner,
  2026-10-15): the open card is a column whose menu part grows to fill it.
  Home on desktop (owner, 2026-10-23): the nav's Request a Quote waits until the wordmark folds in at
  01 (the hero carries its own), or a menu opens. It comes out of a line, the mirror of the wordmark
  going into the mark: a hairline draws in at its right edge, the button opens out of it to the left,
  and the line goes; on the way back up the button folds into the line and the line goes.
  On phones and desktop, once the reader reaches the page's sections (when the running head
  would slide out; on desktop the rail shows instead), the divider folds away and the wordmark
  slides left into the mark (shrinking, fading, clipped behind it), and the mark grows (to about
  33px on phones, 39px on desktop) and stays that size; all of it slides back out on the way up or when a menu opens. Pages
  without a running head do this past 80% of the first screen. Reduced motion: a short fade
  only. (Owner, 2026-10-13.) On desktop, hovering the lockup grows it from its left edge (220ms), so it
  reads as the link home: 1.04 with the wordmark showing, 1.07 for the mark alone once folded (owner,
  2026-10-19); none under reduced motion.
  Desktop menus since 2026-10-15 (owner): the overview links (All services and how a post starts,
  Teaming; All industries and how a post starts) sit in a row above the columns, under a hairline,
  in Inter Tight 600 22px white, the menu links' size, with an 18px down-right arrow drawn like the
  site's arrows (turning rust on hover, owner 2026-10-19), no underline (owner, 2026-10-16; were 17px with a small arrow; they were the footer
  row before that). "&" in their names: "All services & how a post starts", "Teaming &
  subcontracting", "All industries & how a post starts". On the phone pages they are 20px rows with
  the 18px arrow at the right, like the main list, no underline (were 16px, underlined), with a
  hairline between them. On desktop the row is two columns like the menu's, so Teaming sits over the
  right-hand links (owner, 2026-10-16). The menu links have no underline: on hover the text slides 24px right and a rust → comes
  in on its left (260ms; rust since 2026-10-19, owner), sliding back out after; the current page holds that state. The menu
  toggles are a + whose upright stroke rotates flat into a - when open (300ms; in the desktop bar it
  turns rust on hover and while open, owner 2026-10-19), on desktop and in
  the phone accordions (was a caret).
  While a desktop menu is open, a frosted glass covers the page under the nav (after Figma's
  Glass: a 22px blur with the color lifted, a pale white frost over 12% black, a sheen from the top,
  and a fine grain), fading in and out with the menu (320ms); clicks pass through it.
  Not on phones, where the menu already covers the screen (owner, 2026-10-15).
  On desktop the menus open on hover (a 90ms delay, then moving between items swaps at once;
  leaving the card closes after 40ms and the panel folds away in 200ms; hovering Capability
  Statement closes it; owner, 2026-10-13); click keeps it open with a mouse and toggles for
  keyboards and touch. Closes on Escape, a click outside, or a page change. `src/components/NavPanel.tsx`. The
  previous nav (below) stays at `?nav=classic`.
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
  centered (About, Services, Careers, Insights, Capability Statement since 2026-10-10:
  no Home link, the mark goes home; Inter 15px / 400 (14px below 1024px), white,
  with a 1px underline that draws in on hover and stays under the current page), and a
  primary button (2px corners) with an arrow on the right, naming the next step for the page (design review, owner 2026-10-13): "Talk teaming" on /teaming and the Capability Statement (to the quote form's teaming option), "Apply" on Careers and the city job pages (to #apply), "Request a Quote" everywhere else; the phone menu's button matches. No phone number in the bar.
- **Services panel** (desktop, owner 2026-10-10): a chevron beside Services (and hovering)
  opens a solid canvas panel (hairline-strong edge, 4px corners, 600px) under the bar with
  first a row with "All services and how a post starts →" and "Teaming and subcontracting →"
  (15px / 500, set apart with space above and below; owner, 2026-10-10; 660px wide so both
  stay on one line), then the six services and the six industries in their fixed
  orders on hairline rows. Closes on Escape, a click outside, or a page change.
- Mobile: the mark (38px; was 44px), the phone icon (a call link, 44px target), and a
  three-line menu icon that turns into an X. The phone menu has a quiet "Teaming and
  subcontracting →" line under the links (phones have no Services panel). The menu is a
  solid canvas sheet over the whole screen (the bar's area included, a hairline where the
  bar ends) with 20px links on hairline rows, the phone and email, and the primary button.
  It grows out of the hamburger as a circle (300ms, drawer curve) and draws back into it
  (260ms, accelerating); the links ease in just behind it, 28ms apart, from 0.3 opacity
  and 10px (owner, 2026-10-09). Instant under reduced motion.

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
  uppercase label in ink faint (plain text tied to its list, not a heading; design review, owner 2026-10-13), links in Inter 18px ink (16px on phones). Company (About
  Us, Services, Careers, Capability Statement); Service areas; Contracting as label and
  mono value, matching the email signature (copy audit, 2026-10-10): GSA MAS 47QSMS25D009Q
  linking to eLibrary, UEI, CAGE, SBA WOSB, WBENC, Denver M/WBE and SBE, B2G vendor
  21353671 (labels in a 6.5em column); Registration as a
  live status: the green light (#7cb85f) and "Active on SAM.gov", "Through March 26,
  2027", and a Verify route. Four columns on desktop; an even 2x2 on phones, the
  identifiers stacked label over value.
- Then the certification marks (GSA, SBA, Women Owned, WBENC, Denver Economic Development &
  Opportunity; on phones, owner 2026-10-23: GSA on its own band across the top between two hairlines,
  the same height as each row below, then a 2x2 cross of SBA, Denver, Women Owned, WBENC, Denver a touch
  smaller) and the thin vertical lines between them spread across the footer's full
  width (owner, 2026-10-19; was up to 980px) with every gap the same, each line midway, and GSA starting on the footer's left
  text edge (owner, 2026-10-10; the lines are hidden list items so the spacing can do
  this). Marks 26px tall below 1024px (22px from 700 to 899px, owner 2026-10-19). Phones (below 700px): a 2x2 cross with the fifth mark
  centered across the bottom. Contracting labels are uppercase like GSA MAS: DENVER,
  B2G VID.
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
- **Home is the exception (owner, 2026-10-20):** one continuous, choreographed scroll on the
  scroll engine (Components, "Home"). There the four-to-six-moments rule, the 300ms limit for
  scroll-linked and entrance motion (UI feedback keeps it), and "no entrance from opacity 0" are
  lifted, but only where motion runs: the resolved page (prerender, no JavaScript, reduced motion,
  automated browsers) shows every section whole. No bounce or elastic easing there either.
- **Allowed moments on the earlier Services page (2026-10-05; the live page runs on Home's engine,
  Components, "Services page"):** the opening band drifts as it leaves;
  the stage bars draw along the axis; the Denver photo settles inside its frame. The
  division cards open with a FLIP on the real cards (320ms, drawer curve
  `cubic-bezier(0.32, 0.72, 0, 1)`): every card glides from where it was to where it is;
  a card that grows opens out of its old size with a clip-path (never a scale, so text
  never stretches), the opening one riding above the others. The cards stay in the page, under the fixed nav, so the nav keeps its glass.
  The + rotates into an x (220ms). Under reduced motion it opens instantly. Plus the index and city
  arrow nudges.
- **Added for mobile pacing (2026-10-04):** the credential strip's slow loop (removed with the
  Dossier Home, 2026-10-20), a single soft pulse ring on the HQ dot, I-25 drawing itself as the map enters, and the swipe
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
- **Page changes** (owner, 2026-10-09; reworked the same day for phones): on phones and
  tablets a View Transition where supported: the old page fades out in 160ms while the new one rises 12px
  into place over 320ms (strong ease-out), on the compositor, so a busy phone can't eat it.
  The header gets no view-transition-name (that made it a backdrop root and its frosted glass
  vanished). **Desktop** (owner's preference), browsers without View Transitions, and back and
  forward get a one-shot soft CSS fade
  (opacity 0.35 to 1, 260ms). **From the phone menu** the page changes behind the solid
  sheet, and two frames later the sheet draws back into the hamburger (260ms), revealing the
  new page: the reveal is the transition, with no other. Between the policy pages (/privacy,
  /terms, /accessibility) on phones and tablets, no transition at all (owner, 2026-10-09). A link to the page already open closes
  the menu and scrolls to the top. Not on the first load; nothing under reduced motion.
  `src/components/SmoothAnchors.tsx`.

## Do's and Don'ts

**Do**
- Keep every fact exact: GSA MAS 47QSMS25D009Q, SIN 561612, UEI XQXDN6E33SF4, CAGE 9KL18,
  NAICS 561612, WOSB250470, WBE2303571, founded 2021 in Colorado Springs, 719-696-3966,
  contact@aressecurity.co.
- Pair every proof element with a way to verify it.
- Write plain, natural copy. No em-dashes, no slogans, no stacked adjectives.
- "&" in names, "and" in sentences (owner, 2026-10-16). Use "&" in the names of the six services,
  the six industries, and named offerings ("Teaming & subcontracting"), and in the nav, button, and
  link labels that point to them ("All services & how a post starts"). Keep "and" in headlines,
  leads, body copy, FAQ answers, and descriptive lists ("Apartments and HOAs"), and keep official
  names as issued ("Merchant patrol and security license").
- Use real Ares and Colorado photography. Patrol-vehicle photos on Home only in Quality (owner, 2026-10-06).
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
- **Card containers:** cards follow "Cards and glass" above; no other boxed or filled
  containers, and no tile grids of icons with captions.
- **Glass:** only over moving or photographic content (see "Cards and glass"); never as a
  card surface on the plain canvas.
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
