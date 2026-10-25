# Services, "The Schedule" (archived)

The Services entry from DESIGN.md as it stood before the page was replaced on 2026-10-24 (owner). It
describes the page that was live through commit `931e70d` (deployed 2026-10-23); restore it from
there. The page that replaced it is described in DESIGN.md.

### Services page ("The Schedule", 2026-10-05)
Same system as Home, its own structures (owner: "similar but unique to the page
contents"). Nothing on Services repeats a Home layout except the rail and the footer.
- **Opening: aperture, the default since 2026-10-15 (owner)**, described under "Four openings" below.
  What follows is the earlier glass opening, kept at `/services?open=current`: headline (display-xl, 7 columns) with the lead beside it (no buttons; owner,
  2026-10-05). **Photo since 2026-10-15 (owner): the copper-glass tower (`hero6.jpg`, from the Home
  hero), anchored at its foot so the lit copper underside sits in the clear area below the glass,
  no caption (not a named place); headline 6:1, lead 7:1 or better.** The Capitol is `?photo=capitol`. Headline since 2026-10-19
  (owner): Home's "A prepared officer on every post." (Home now opens on "Security officers for Colorado's Front Range."); the
  line before it stays at `/services?hero=officers`. Copy (copy audit round 2, 2026-10-10): "Security officers, patrol, and access
  control." / "Armed and unarmed coverage for federal, commercial, and industrial sites in
  Colorado Springs, Denver, and Pueblo. Pick a service, or find your industry." The audit's
  options A, B, C and the old copy stay switchable for the client at `/services?hero=`
  (`COPY` in `Opening.tsx`). The photograph (owner, 2026-10-12: the Colorado State Capitol and downtown Denver at night, from above, `services-hero/denver-capitol-night.webp` (Unsplash, Kevin Bree), 2400px, framed so the dome and towers sit in the clear area (`22% 62%`, set lower by `calc(132px - 36.5vw)` from 1024px at its own proportions, 255px lower below), caption "Colorado State Capitol, Denver"; the glass over it is much lighter, canvas at 12% instead of 55% (68% on phones) with the same 22px blur, since the photo is already dark (`tint` in `PHOTOS`; the other options keep the darker glass). Earlier that day: downtown Colorado Springs at dusk with Pikes Peak in alpenglow, now `?photo=pikes`, `services-hero/colorado-springs.webp`, 2527px, same grade; set 200px lower on phones and tablets, and at its own proportions 110px lower from 1024px, so the lit skyline and the mountains sit in the clear area while the peak glows through the glass; caption "Downtown Colorado Springs, Colorado". A stormy-day view of downtown was tried first, kept in images-unused. Two Denver options stay switchable for the owner at `/services?photo=skyline|capitol` (`PHOTOS` in `Opening.tsx`, each with its own framing and caption). Before it, owner 2026-10-08: downtown Denver at sunset with the Front Range, swapped from the Request a Quote page, now from its 2400px original `hero1.jpg` as `services-hero/denver-sunset.webp`, 509KB, graded `saturate(0.8) sepia(0.1) brightness(0.78) contrast(1.12)` (owner, 2026-10-08: a tad brighter and crisper; was brightness 0.68, contrast 1.04); earlier the generated Denver towers, which now open the quote page; before that the tower `hero6.jpg`, now back on Home) fills the whole opening from the top of the page, behind the nav, like the other heroes; it sat 164px lower then; a vertically flipped copy of itself directly above so the glass frosts real image all the way to the top (owner, 2026-10-08; lead 5.1:1 or better, headline 6:1). On scroll only the glass and copy move at first: they slide up over the photo while the photo and everything below hold still, and once the glass's foot reaches the nav the whole page scrolls as usual (owner, 2026-10-08; the hold is a scroll-driven transform on the photo, the page below, and the footer over the first `--svc-cap` of scroll, measured in `Opening.tsx`, so it rides the compositor without jitter; browsers without scroll timelines get a JS spacer; without JS the page scrolls normally; replaces the drift). Because the held page sits `--svc-cap` below its layout box, the page's view-timeline ranges (stage bars, Denver plate) start that much later, and the dock hides once the footer's first line of content appears (owner: not at its top padding), not on the document box (2026-10-08: both had fired early).
  (owner, 2026-10-06): anchored to its bottom edge, graded down, masked into the canvas
  only at the bottom, drifting slightly as it leaves. Dark glass (the footer's: canvas at
  55% over a 22px blur; 68% below 1024px) covers it from the top down to a white/10% edge
  where the crisp photo begins (`clamp(15rem, 38svh, 28rem)` above the opening's foot).
  The headline and lead sit on the glass; the lead is #c4c8ce there (AA at the brightest
  point, 6:1 or better at every width). The place caption "Downtown Colorado Springs, Colorado" (mono, full ink with a slight dark text shadow; owner: it is just a subtitle) sits on the right just under the glass's edge and rides up with the glass, out of view (owner, 2026-10-08). No division index in the opening (owner, 2026-10-05): the
  division containers start a short scroll below.
- **Four openings with glass, no scroll hold** (owner, 2026-10-15: "another home page hero that
  needs to wow"; from Mobbin, Emil, and Impeccable), to compare at `/services?open=`. Each uses the
  copper-glass tower (graded like the Home hero) and holds only the headline, the lead, and a quiet
  "Who we protect ↓" link to the industries: the services and industries stay in the page below, so
  the opening sends the reader down to them (owner, 2026-10-15; versions with the six services in the
  opening, including `index`, are tagged `services-open-roles-option`; three plainer forms, `plate`,
  `split`, `overlap`, were dropped as too basic). **Aperture is the default (owner, 2026-10-15)**;
  curtain, sink, and lens stay at `?open=curtain|sink|lens`, and the earlier sliding glass, the only
  form with the scroll hold, at `?open=current`.
  - `curtain`: the photo seen through tall frosted panes like the tower's own curtain wall (six from
    1024px, three below), 1px mullions between them, the headline (8 columns) and the lead (in ink)
    over their tops. A pane is a blurred copy of the photo laid exactly over it (no backdrop filter,
    so cheap on phones) under a tint dark at the top behind the copy and clear through the middle;
    under the pointer the frost fades (260ms) to the crisp photo. On the first view the glass forms
    pane by pane (900ms, 80ms apart). The opening fades into the canvas at its foot.
  - `aperture`: the headline at display-xl, the same size as every other page's, set as two lines at
    every width, "A prepared officer" / "on every post" (owner, 2026-10-19) (owner, 2026-10-15;
    it was up to 116px), then the photo as a plate in the column (4px
    corners) that opens to the screen's edges over the first 70% of a screen of scroll, the photo
    settling from 1.1 inside it (tied to the scroll; static without scroll timelines or under reduced
    motion). A liquid glass card with the lead straddles the plate's top edge on the right, beside the
    headline's foot, so its rim bends the photo's edge. The card is the site's glass card, the Home
    Record cards' recipe without their rust corner light (owner, 2026-10-15: just the dark liquid
    glass): 1px glass edge and top line, soft shadow, liquid at 12px with a darker wash (56% to 44% black) because it crosses the
    bright sky (lead 5.2:1 at the brightest point). Phones (owner, 2026-10-15: too dark, no copper
    coming through): the card overlaps only the photo's last 56px and its wash is much lighter, so the copper underside shows above it and glows into it (lead 16:1). On phones the card keeps the CSS
    frost, not the liquid filter, with more color through it (owner, 2026-10-15: a 4% to 24% black
    wash, a 14px blur, no saturation boost): Android Chrome drew a seam down the card where it tiles the
    filter, which a laptop's phone view never shows (owner, 2026-10-15). Phones: the card over the plate's foot.
  - `sink`: the headline huge (up to 148px) low over the photo, its last line resting in a full-width
    band of liquid glass (18px frost, its top edge bent and lit, like the footer's ARES letters) that
    holds the lead and the link. A shade over the photo keeps the headline 6:1 or better.
  - `lens`: one tall liquid glass slab (6 columns, from under the nav to 56px above the foot, the
    site's glass edge, a wider 32px rim and a light 7px frost) with the headline at its top and the
    lead at its foot, clear glass between where the towers bend through. The photo drifts slowly
    behind it on desktop (26s, ambient, off under reduced motion) so the bend moves. Phones: the photo
    above, the slab over its lower part.
- **One set of six industries (owner, 2026-10-10):** the divisions and the separate four-link
  Industries list were the same list shown twice, so the section is now "Who we protect."
  ("Open one to see the sites we staff."): six cards in the owner's fixed order (overrides the audit): Government &
  Military; Critical & High-Liability Sites; Construction, Industrial & Logistics; Airport &
  Transportation; Commercial & Retail; Institutional & Community. The same order wherever
  the six appear (the six services also keep one order, owner 2026-10-10: Armed, Unarmed,
  Access control, Restricted-area escort, Relief and surge coverage, Mobile patrol; Mobile
  Patrol is that card's name on the Capability Statement too) (Home, industry pages, the quote form, llms.txt). Each opens to its summary and
  site types; the open card shows "Open the full page →" (owner, 2026-10-10; screen readers hear the industry name) to its industry page in its heading area, under the description (hidden while closed). "By role." keeps only the
  services. **One name per industry** on Home ("Six industries"), Services, the industry
  pages, the city-page tags, and the quote form's site types. "Specialized & Armed
  Protection" became Critical & High-Liability Sites (a kind of site, not a service; data
  centers one example), its page moved from /industries/data-centers (301 redirect) to
  /industries/critical-infrastructure. Two new industry pages: /industries/
  institutional-community and /industries/airport-transportation ("ready to staff", no
  airport client named), with generated images in the same style.
- **Divisions as a bento of cards that open in place** (owner requests, 2026-10-05; the
  one exception to "no card containers", and with the nav the only glass). Desktop and
  tablet: two equal columns (owner, 2026-10-05; the earlier 4+2 / 2+4 bento spans were
  dropped); 4px corners on every card (the 10px / 28px plate corners were retired). Phones: one column. Each card: near-black fill (`#050607`), a white/10% edge and a
  faint inner light from below (drawn on top), the photo across the top (growing to
  fill when a row-mate is taller, slight 1.03 zoom on hover), and a frosted panel
  riding up over the photo's foot. Its frost is not a live backdrop filter (owner, 2026-10-15: the
  liquid filter on six panels re-filtered on every scroll frame and glitched on fast scrolls): each
  panel carries its own copy of the card's photo with the photo flipped beneath it (its reflection,
  fading out, so the frost runs all the way down instead of hitting black), laid exactly where the
  photo sits behind the panel and blurred once (14px, the color lifted 1.6), under a dark tint (46%
  to 76% black; every card's text 5.1:1 or better) and a light along its top. It paints once and
  scrolls as a picture, so nothing re-filters while the page moves. With the number beside
  the title (Inter 500, 22 to 24px), the division's one-line description, and the +.
  The + (or the photo; since 2026-10-18, owner, anywhere on the card, with the number turning rust and the +
  animating on card hover) opens one card at a time: it takes its row's full width (its
  row-mate moves down and the cards after it re-pair beneath; a last odd card sits at
  half width), the + turns into an x, and the detail appears under the
  description (Government's GSA ledger row, then each site type with one plain line).
  Desktop opened: photo left (5/12) top to bottom, detail right on plain card fill.
  At every width (owner, 2026-10-05) the opened card glides to just under the nav (and the
  running head where it shows), one grid gap below it, so the card above is never seen. Detail is
  always in the HTML (`hidden` until opened).
- **Process head** (owner, 2026-10-16): on desktop the site's section head, the headline in 7
  columns and its lead in the last 5 at the headline's foot (was the headline across with the lead
  beneath, which left the right side empty; the others at `/services?stagehead=current|column|wide`).
- **Process as a schedule chart:** a mono axis (Pre-contract, Contract execution,
  Operational) over hairline rows. Each stage: number and title, a faint scope line, then a
  hairline bar with its quarter drawn in ink, one quarter further right per stage, and the
  body. The bars draw in as each row arrives, and a 2px by 13px rust tick comes up at the end of
  each quarter as its draw reaches it (owner, 2026-10-16; desktop, shown and still without scroll
  timelines or under reduced motion). No pinned passage on this page.
  Below 1024px (owner, 2026-10-05) the stages become a swipe row (scroll snap, 84%
  slides on phones and 62% on tablets, so the next one peeks), under a process meter:
  stage numbers 01 to 04 over a hairline split into quarters with ticks, the phase labels
  beneath, and a 3px ink fill tied to the swipe position (from one quarter to full). Each
  number sits at the end of its quarter, over where the fill stops for that stage, 04 at the right
  edge; the current stage's number is rust and the ones passed ink (owner, 2026-10-15; was each
  number turning ink as reached, at the start of its quarter); tapping a number swipes to it. Two swipe cues:
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
