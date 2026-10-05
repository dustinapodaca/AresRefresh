# Home redesign: inspiration board

Mobbin references for the second Home refinement pass (2026-10-04). Rule: take
**patterns, not pixels**. No brand's look, imagery, or copy is reused. Where a reference
conflicts with `DESIGN.md`, DESIGN.md wins: one near-black canvas, white display type,
IBM Plex Mono for data only, hairlines instead of boxes, bronze only as light, one glass
panel, 4 to 6 motion moments.

## Weak areas this board answers (from the Impeccable critique, 24/32)

1. The back half (Coverage into "Get to know Ares") reverts to "component, next component"
   and has no full-bleed beat mid-page.
2. The hand-off line became a template: four identical 22px lines, one an echo.
3. The ledger is nine ungrouped rows with an empty cell, and the capability statement
   is not next to the proof.
4. Staffing pacing: 34vh steps, dim headings read as disabled, and "<1%" sits beside the
   quote as if the contracting officer claimed it.
5. Mobile has no visible action for about six screens.

## Kept references (11 plus one from the Framer search)

| # | Reference | Pattern taken | Ares section | Adaptation to DESIGN.md |
|---|---|---|---|---|
| 1 | [basement.studio, Awards](https://mobbin.com/sites/sections/bb09f59f-11c2-4b8c-9858-b424eacabb8b) (owner pick) | Dense ledger rows on a dark canvas: strong name column, quiet middle column, right-aligned value, a hairline under every row, no boxes | 01 Verify ledger | Already our base pattern. Keep values in Plex Mono with tabular numerals, labels in Inter muted. Tighten row height slightly so nine-plus rows read as one document. |
| 2 | [Locomotive, Awards & Recognitions](https://mobbin.com/sites/sections/3972031f-245c-461e-bed8-9b8845b92fd0) | Grouped ledger: the group name sits once in a left column and spans its rows; a heavier rule opens each group | 01 Verify ledger | Group the rows into Contract vehicle / Federal registration / Ownership and certification. Group rule is white at 20%, row rules stay hairline. On mobile the group name becomes a small heading above its rows. |
| 3 | [Ragged Edge, Awards](https://mobbin.com/sites/sections/145b0e1c-3e0d-4565-b3d8-e82646927497) | Each entry is a title line with its sub-lines beneath, and the list ends without a box | 01 Verify ledger, last row | Close the ledger with a "Capability statement" row whose value is a link, so the next action sits inside the proof instead of in the nav only. |
| 4 | [Atlas, product frame](https://mobbin.com/sites/sections/2f379c3d-dfcb-4eb2-8a2f-d01cc298f5f5) (owner pick) | Full-height vertical frame lines that run through every section, so the page reads as one drawing | Whole page, desktop | Our rail line becomes that frame: one hairline running the full height of the document at the rail's x, with the progress fill drawn along it. One line, not a grid, so it never becomes decoration. |
| 5 | [Atlas, Thesis](https://mobbin.com/sites/sections/d6a6c40a-3ac3-49c9-9d4c-ff6f125e80ab) | Display headline crossing the top edge of a photograph | Coverage into "Get to know Ares" | The "Get to know Ares" headline overlaps the bottom edge of a new full-bleed team photograph. Real Ares staff, darkened into the canvas, square edges, masked fade. |
| 6 | [Nite Riot, Index](https://mobbin.com/sites/sections/1aa05a05-6920-4f35-a581-3dcf42634162) | Full-bleed, desaturated-dark photo used as a transition ground with type sitting on it | Coverage into "Get to know Ares" | Same move with our team-at-the-range photo; brightness pulled down so white type keeps over 7:1. No text columns on the photo, just the heading crossing its edge. |
| 7 | [Samara, How it works](https://mobbin.com/sites/sections/001f0854-a5f2-42e5-b54f-349fdf95799a) | One vertical line threading the steps, a node on the line at each step | 02 Staffing steps | A hairline down the left of the step list with a small node per step; the line's lit segment grows as you read (see 9). |
| 8 | [SpaceXAI, Interview process](https://mobbin.com/sites/sections/1ee44354-b1c3-4736-b652-3f019ed17c60) | Numbered steps as ruled rows: muted numeral column, title, one line of body, generous but not empty spacing | 02 Staffing steps | Compact rows with mono numerals 01 to 04 (allowed: the order is real, plan before signing, train before the first shift). Step height drops from 34vh to about 22vh. |
| 9 | [Runway, Onboarding](https://mobbin.com/sites/sections/bcbe23c6-95ea-467d-abc5-d913d2bc3667) | A progress line that is filled up to the current step | 02 Staffing steps | The step line fills white as the reader scrolls, driven by a CSS scroll timeline; static and fully drawn when unsupported or under reduced motion. Counts as the staffing motion moment, replacing nothing new. |
| 10 | [Attio, Customer quote](https://mobbin.com/sites/sections/2ce67fb5-10f1-49fa-8ba6-e94d7bf516aa) | Pull quote in a wide right column with the attribution in a narrow left column, separated from neighboring content | 02 Staffing, testimonial | The quote gets its own row below the "<1%" figure instead of sitting beside it, so the figure no longer reads as the officer's claim. Attribution moves to Inter (mono is for data only). |
| 11 | [Steep, Customer quote](https://mobbin.com/sites/sections/0c2b53c7-4f79-43e1-bea1-7704507fecc6) | Large editorial quote with a single small attribution line and open space around it | 02 Staffing, testimonial | Quote stays large and left-aligned (DESIGN.md layout), with more air above than below so it reads as a pause between data and steps. |

| 12 | [Framer, feature columns](https://mobbin.com/sites/sections/56089a60-4bb9-4c69-b7df-12b4312d24e2) (owner asked to search Framer) | Card-less columns: title, two lines of body, one inline text link, and every standalone text link in the same signal color | "Get to know Ares" panels, Coverage | Small standalone links (panel CTAs, "All services", the capability statement row) all take signal blue with the authored arrow; large typographic city rows stay white because they act as headings. |

## From board to system (DESIGN.md v2)

The board replaced the Framer-derived system (archived at
`.claude/design-passes/framer-system/DESIGN.md`). What each reference became:

| Reference | Became in DESIGN.md v2 | Where on Home |
|---|---|---|
| Atlas (frame, Thesis) | Warm charcoal canvas `#121110`; a visible 4-column frame (220px index + 3) with full-height lines; square photos inside the frame | Every section; lines continue over the hero and Pikes Peak photos |
| Superpower | Proof strip along the hero's bottom edge; square annotation markers with uppercase Plex Mono labels; warm off-white ink `#f3f0ea` | Hero strip (GSA mark, MAS number, WOSB/WBENC, founded); markers on the staff photo |
| Giga | Warm horizon glow at the bottom of a dark field | Bronze glow behind the contact glass |
| Locomotive (awards, work index), basement.studio | Ledger columns locked to the frame; giant type separated by rules | Verify ledger (group / item / number); city rows at up to 124px |
| Samara, Runway | One line threading numbered steps, filling with progress | Staffing steps ride the frame line; bronze fill |
| Attio, Steep | Quote beside a narrow attribution column | Testimonial, with the "<1%" figure hanging into it |
| Nite Riot | Full-bleed dark photo as a transition ground | Pikes Peak photo between Coverage and Company |
| Framer | One color for every standalone link; card-less columns | Bronze links; company panels one per frame column |

Flow principles kept from the owner's brief: one continuous surface (no bands or
section dividers), the rail thread, proof as a ledger, cross-boundary elements, varied
rhythm, copy hand-offs, and scroll-driven continuity.

## Considered and set aside

- **Linear, careers rows** ([link](https://mobbin.com/sites/sections/b94b791e-21d7-46d0-95e8-cd3ec25fc5ee)): a roles list would replace the
  owner-approved "Get to know Ares" panels, so it was not used.
- **Superpower hero proof strip** ([owner pick](https://mobbin.com/sites/sections/7c1e2d1c-3200-4d81-b4ef-b00ae9bfb5fb)): the exact
  section was not retrievable through Mobbin search; sibling Superpower sections showed
  rounded image cards and an orange accent, both against DESIGN.md. Our hero already
  carries its proof in the GSA plate, so no change.
- **Garden sticky steps** ([owner pick](https://mobbin.com/sites/sections/38333d73-f428-421e-bfe3-c954e3926136)) and **Giga progress line**
  ([owner pick](https://mobbin.com/sites/sections/f850ffc1-be4a-4064-88d5-9b52d2ec9d52)): the exact sections were not retrievable
  through search; Samara, SpaceXAI and Runway (rows 7 to 9) cover the same patterns.
- **Analogue ruled lists** ([owner pick](https://mobbin.com/sites/sections/7063e124-d7b5-4fe4-9797-b318a5be20d1)): not retrievable;
  our city list already uses large ruled type (seen also in Locomotive's work index).
- **Framer, tiles past the edge** ([link](https://mobbin.com/sites/sections/2b0c0ef0-b1ea-44a4-be39-5131856c962f)): a statement followed by
  image tiles that run off the viewport. It would break the content column and the rail,
  so not used. Framer's gradient feature cards were already retired by DESIGN.md.
- **Closing CTAs** (Figma, OpenTable, Aboard): all are bands or bright fills; our bronze
  glass close is stronger and stays.
- **Mobile header CTA**: no strong Mobbin reference surfaced. The fix (a compact quote pill
  in the mobile header) comes from the critique and the owner's own premise that the
  quote button "is always in the nav".
