# The Dossier Home (retired 2026-10-20)

The Home that was live until the owner made the `home-flora` design the official Home on
2026-10-20. These entries were cut from DESIGN.md unchanged, so the design authority describes
only what ships. The code is restorable from git tag `home-dossier-final` (audit `44e1f8f`);
the two other candidates from 2026-10-19 are tagged `archive/v3design` and
`archive/home-reimagined`.

### 01 Record: proof cards over a wide quote (Home; owner 2026-10-06)
Mobbin: Lightdash and Ramp (proof cards over a customer quote). One grid replaces the
floating figure, the offset quote, and the separate values section. The owner-approved
exception to "no card containers" and "no glass" for this section.
- Head: "The record so far." with its lead, in the shared Home head (`.ds-sec-head`:
  display-lg in 7 columns, the lead in the last 5, aligned to the headline's foot; Quality
  uses the same head, and Coverage's headline is display-lg too).
- Black frosted glass, no colored light (owner, 2026-10-08: the rust gradients were too
  much): each card canvas at 72% over a 14px blur, with the prime panel's soft white/4.5%
  light from above (owner, 2026-10-10), a white/8% edge and a white/12% line along
  the top edge (brighter on hover). A faint dot grid (white/14%, 16px, the maps' grid) lies
  behind the grid, masked to an oval, so the glass has something to frost: it shows in the
  gaps and softens to nothing under each card. Each value card: the figure in Plex Mono (44
  to 60px) with its caption (#c4c8ce; Personnel's links to Indeed), a white/8% hairline,
  then the name (Inter 600 22px) and one line. Reliability <1% missed shifts since 2021;
  Client rating 43/45 criteria rated Very Good or Exceptional (across five past performance
  evaluations, none below Satisfactory; was "Integrity" 16/18); Personnel 4.8/5 on Indeed.
  The placeholder client quote card was removed (owner, 2026-10-10: it was not a real quote).
- Desktop: three across; the cards rise 64px into place on scroll.
  Phones: the three cards are sticky and pile up 16px apart, each frosting the one beneath,
  all one height (the tallest card's, measured in Record.tsx; owner, 2026-10-08), the quote
  at the top of its card and the attribution on its foot. The quote card stacks too, 16px
  under the third; the full pile holds for about 80px of scroll, then leaves as one, still
  fanned (owner, 2026-10-08: each card's bottom margin evens out the release points).
  No images (generated options were tried and removed, 2026-10-06; they stay in
  assets/generated/values/).

### Home hero copy and the proof row (copy audit round 2, owner 2026-10-10)
"- **Current default: h1** (owner, 2026-10-19): "Security officers for Colorado's Front Range." over B2's lead
  (two lines on desktop, three on phones), picked from ten at `/?hero=h1` to `h10`; B2's headline moved to the
  Services opening. **B2** before it (owner, 2026-10-10): "A prepared officer on every post." / "From
  restricted areas and critical sites to offices and campuses: officers trained on your post
  before the first shift." ("data centers" until 2026-10-18; the web audit, owner: keep public copy broad.)
  Two lines at every width. Before it: B (too long), then
  **option A** "Security for sites where every entry counts." / "Armed and
  unarmed officers, access control, and restricted-area escorts along Colorado's Front Range,
  for government and critical sites as well as offices, retail, and campuses." (Owner,
  2026-10-10: no "military construction" up front; escorts are not the lead word and appear once in the hero;
  they are visible elsewhere on the site, not the whole identity.) No eyebrow; the search phrase lives in the title and description.
- **Kept for the client (Deidre) to compare:** `/?hero=current|b|c` in `Hero.tsx` (`OPTIONS`):
  current ("Security guards for federal and commercial sites." with the GSA mark), B
  ("Security guards and escorts for Colorado's controlled sites."), C ("Escorts. Access
  control. Officers. One standard."). Gallery: `.playwright-mcp/gallery/hero-options.html`.
- **Proof row** (A, B, C): three lines on white/12% hairlines, 14px, #c4c8ce on the glass,
  each a link with a white/20% underline: GSA MAS 47QSMS25D009Q (mono, to eLibrary),
  Minority woman-owned (WOSB, WBENC) (to the Capability Statement), Licensed in Colorado
  Springs, Denver, Pueblo. Three across from 1024px; below, two then the third full width.
  (The escort line was removed, owner 2026-10-10.)

### 02 Industries (Home, copy audit round 2, owner 2026-10-10)
- "The sites we protect." in the shared head, then the six industries in the owner's
  order. **Chosen: plates**: the first three (Government & Defense; Critical &
  High-Liability Sites; Construction, Industrial & Logistics) as photographs in the column
  (the industry pages' generated images, 4:5, 16:10 on phones, 4px corners, white/8% inset
  edge, graded `saturate(0.78) brightness(0.84)`, no caption, 1.03 zoom on hover), the name
  (Inter Tight 600, 22 to 28px) with its arrow kept to the last word, and the short line.
  The other three as the ruled route strip. Then "For prime contractors." (display-md, its
  line and "Teaming and subcontracting →" in columns 8 to 12).
- **Kept for the client to compare:** `/?industries=rows` (type only: the first three as
  large numbered rows on hairline-strong rules). In `Industries.tsx`.
- The six-name list left 04 Coverage (this section replaces it).

### Quality (Home 02, owner 2026-10-06)
- Moved whole from About (photo and facts), in exchange for the staffing passage.
  "Quality over quantity." at display-xl in 7 columns with its paragraph beside it (5
  columns, aligned to the headline's foot); then, **since 2026-10-16 (owner), the `wide` form**:
  the patrol vehicles across the whole column on desktop (21:9, the cars 44px lower in the frame
  than at first, owner; 32px until 2026-10-18), the four facts in a row beneath it, captioned; phones unchanged
  (stacked, square). The other forms stay at `/?vehicles=side|portrait|glass`; what follows is
  `side`, the earlier default: the patrol vehicles as a wide plate (7
  columns, 16:10, anchored to the photo's foot, 24px lower in its frame on desktop so the cars ride lower, captioned; owner's new photo of two Ares SUVs, 2026-10-12) beside the company facts on
  hairlines (established, NAICS, longest client, post training; post training replaced the ownership row, owner 2026-10-18; columns 9 to 12; the licensed row was removed, owner 2026-10-12). On desktop the facts' top and bottom rules line up with the photo's top and bottom edges, the rows sharing the height evenly, and the caption hangs below the photo; the photo has no frame edge (owner, 2026-10-12).
  Phones: stacked, the photo square. The owner allowed the vehicles photo on Home here.

### The close (Home 06 Contact; owner 2026-10-16)
- **Two routes** (after Linear's "How can we help?" and Grok's contact cards, from Mobbin):
  "Request a quote, or call us." at display-xl, then two glass cards side by side from 768px
  (stacked on phones), the site's glass recipe (1px white/10% edge, white/14% top line, a dark
  wash over a 22px blur, 4px corners) over the rust light, moved to sit under them. "Request a
  quote": one line on what follows (a site walk before anything is signed, then a scoped
  proposal) and the primary button (full width on phones). "Call us": the phone in Plex Mono (30
  to 36px), the email and base in small mono beneath. The primes line that sat under the cards
  was removed (owner). The earlier close and three other forms stay at
  `/?close=current|centered|starter|ledger` (`Contact.tsx`).

### Credential strip
- Phones only (hidden from 768px). Between the hero and 01 Record: the
  certification marks only (GSA, SBA, Women Owned, WBENC, Denver Economic Development &
  Opportunity, Colorado Verified Diverse Business, Colorado Verified Small Business; the
  last three added 2026-10-05 as WebPs at 32 to 36px tall), no text, with wide
  spacing (72px mobile, 112px desktop). No rules above or below; the edges fade out with
  a mask. Moves slowly (60s loop), pauses on hover, and holds still and becomes swipeable
  under reduced motion. It starts with Colorado Verified Diverse Business in the middle of the
  screen, then Colorado Verified Small Business, GSA, and SBA come in (owner, 2026-10-13).

- **Hero image (Home), from 2026-10-08:** the copper-glass tower `hero6.jpg` again (owner; it had moved to the Services band), graded `saturate(0.95) brightness(0.8) contrast(1.06)` at `50% 50%` from 900px with no black from the left but a soft vignette (owner, 2026-10-08; lighter than About's: the top shaded from 70% to clear by 44%, the edges and corners darkened up to 62% outside an oval around the towers), fit rather than zoomed (the photo's box runs only 4 to 7rem past the hero with 4% headroom for a 4% drift, so cover shows about 94% of its width at 1440 and all of it at 1920); readability comes from a strip of dark glass behind the copy (owner, 2026-10-08: full bleed from just above the headline to the hero's foot, canvas 72% to 48% left to right over a 24px blur, crisp white/10% edges top and bottom, no fade; the photo and its copper floor run on below it into 01 Record. From 1024px the headline runs across and the lead (6 columns, up to 46ch) sits below it, then the proof row across the full width (copy audit, owner 2026-10-10; it replaced the GSA mark, which still shows with the "current" option). The lead and GSA label in #c4c8ce; 6.7:1 or better at the brightest point), `saturate(0.9) brightness(0.8)` at `62% 40%` on phones, moved 36px further right below 768px (owner, 2026-10-12). The earlier Home hero, kept for the record: `hero-fold.webp` (owner-supplied, 2026-10-05): a dark glass
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

- **Order of beats on Home (owner, 2026-10-10, copy audit):** photo hero; 01 Record (the
  three proof cards); 02 Industries (the six, the first three as plates, then "For prime
  contractors."); 03 Quality (statement, patrol vehicles, facts); 04 Coverage (map and
  cities); full-bleed photograph; 05 Careers (short); 06 the open close. (Before
  2026-10-10: Record, Quality, Coverage with the six industry names, Careers, close.) The federal ledger (01 Verify) and the short GSA block that replaced
  it were removed (owner, 2026-10-06): the Capability Statement carries every code, and
  the hero keeps its GSA line.

- **Cross-boundary elements:**
  - The hero photograph fills the hero edge to edge (from 900px) and runs down past it,
    ending under the opening of 01 Record.
  - The measured figure, top-aligned with its note, hangs down past it into the quote's
    rows.
  - A full-bleed photograph starts under the end of 03 Coverage and ends under the start
    of 04 Careers.

- **Allowed moments on Home:** the hero photo drifts slightly slower than the page as the
  hero leaves (4%), while the hero's glass strip and its copy rise faster than the page (40svh, was 26svh until the owner asked for faster, 2026-10-08;
  over the hero's exit, desktop from 900px; owner, 2026-10-08), so three layers move apart; ledger hairlines draw from left to right as rows enter (the text is
  already there); the full-bleed photograph opens from a 7% side inset to full width; the
  figure settles 32px upward as it enters. Plus press and arrow-nudge feedback.
