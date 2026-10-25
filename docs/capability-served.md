# Capability Statement, "The Statement, Served" (archived)

The Capability Statement entry from DESIGN.md as it stood before the page was replaced on 2026-10-24 (owner). It
describes the page that was live through commit `931e70d` (deployed 2026-10-23); restore it from
there. The page that replaced it is described in DESIGN.md.

### Capability Statement page ("The Statement, Served", 2026-10-05)
The most important page after Home; it must stand out like Home. Concept and Mobbin
board: docs/capability-concepts.md. Every piece of the old page's content carries over.
Rail marks: 01 Capabilities, 02 Why Ares, 03 How to buy, 04 Credentials, 05 Download.
- **Hero:** downtown Denver at sunset (owner, 2026-10-12: `services-hero/denver-sunset.webp`, the Services opening's photo until then, in the same frame and shades, with the place caption "Downtown Denver, Colorado" top right under the nav like About; the fins image moved to `assets/images-unused/capability-hero/`). Before it, generated copper fins on a building at dusk (owner, 2026-10-08:
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
  off the lead. The spec line is ink muted on the photo. Since 2026-10-13 (owner) the shade from the left is lighter on desktop, the lightest
  eased shade that keeps 4.5:1 (78% at the edge, easing to 0 at the right; was 100% to 0 by
  72%), with the lead and spec line in #c4c8ce: headline 4.51:1, lead 4.79:1, spec 4.55:1 at
  the brightest point (the Denver sunset). "Capability
  statement." at display-xl, a two-sentence offer (no credential line; owner, 2026-10-05: the
  quick facts and sections below carry it), a white "Download the PDF"
  button with an authored download icon (no quote link; owner, 2026-10-06: the nav carries
  it), and a mono spec line
  (company, NAICS, 1 page, PDF, 1.5 MB for the owner's new statement of 2026-10-19 after the same lossless
  shrink, 2.28 MB as exported; 2026). No floating document (removed by the owner, 2026-10-05). Under the hero, the four quick facts with notes and the SAM.gov route sit on one
  full-width hairline over a long band of frost (22px blur, a light 10%-to-0 tint since
  2026-10-08 so the photo's color shows through; was 28%; about 26rem past the row) that fades out downward (owner, 2026-10-05).
- **Services first (owner, 2026-10-18; web audit item G):** the six capability cards below now open
  the Services page under "What we staff." (owner), right after the opening and before "Who we protect.", in the site's "we" voice,
  each open card with "Open the full page →" to its service page (as the industry cards do). They
  replace Services' "By role." list. The Capability Statement's "Core competencies." is now that
  plain list: the six as ruled routes to their service pages (title and one line), in the page's
  third person. The earlier layout is tagged `services-before-capability-cards`.
- **Capabilities (second pass, 2026-10-05):** six cards named as on the service pages (owner, 2026-10-10: Armed Security Officers, Unarmed Security Officers, Access Control Officers, Restricted-Area Escort, Relief & Surge Coverage, Mobile Patrol; the PDF follows) in the Services card language
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
- **Past performance (rail 03, owner 2026-10-11):** "Selected contracts since 2021." (a selection, never worded as a full count), with more than $2.1 million in revenue 2021 through 2025, as ledger rows (scope, where, mono term): the Space Force base subcontract, armed
  multi-site Denver metro, retail Pueblo, and seven completed armed contracts in Colorado
  (2021 to 2025). Clients never named (the dispensaries never mentioned).
- **Credentials ("Certifications and codes.", owner 2026-10-11, from the copy audit):** one
  grouped ledger, each identifier once: Contract vehicle (the square GSA mark
  `cert-gsa-square`, in its own colors), Registration (SAM status with the footer's green
  light, UEI, CAGE, DUNS, NAICS, PSC), Certifications (SBA WOSB, WBENC, Denver M/WBE and SBE,
  the two Colorado marks; no separate SAM-registered small business row), Licenses and service
  area. Each group opens with its name in the `title` style on a hairline-strong rule; rows on
  hairlines with the mark (white silhouette) in an 88px slot, label, mono value, faint note.
  Phones: mark, label, and value on one line (value right), the note beneath; not folded.
  The earlier marks-then-listing layout stays at `?creds=marks`.
- **Copy (design review, owner 2026-10-13):** a copy icon (two overlapping sheets, 15px, drawn
  like the arrows, ink muted; a check for 1.6s once copied, announced; 28px target) beside the
  UEI and CAGE in the hero facts, the GSA contract number in the How to buy block, and the GSA,
  UEI, and CAGE rows of the credentials table. With the handset, an owner exception to arrows
  only.
- **Voice (owner 2026-10-11, copy audit):** this page, like the PDF, speaks as Ares in formal
  third person ("Ares has…", "How to buy from Ares."); the rest of the site says "we".
  The first-person lines stay at `?voice=first`.
- **Download (the close):** the PDF thumbnail beside "Take this capability statement
  with you.", Download and Open in a new tab, over the closing rust light (the quote and phone links came out, owner 2026-10-15).
