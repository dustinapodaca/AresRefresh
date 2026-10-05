# Home concepts (clean-slate, 2026-10-04)

Two different structures, both built only from `docs/home-content.md` and `DESIGN.md`.
Neither reuses anything from `_archive/`.

## Concept A: "The Dossier"

A vendor file read top to bottom. Proof comes first, then how the work gets done, then
where, then who, then how to start.

- **Section order:** Hero (headline, lead, GSA mark and contract number) → 01 Verify
  (key identifiers, grouped ledger, the "<1%" figure, the Buckley quote) → 02 Staffing
  (four habits) → 03 Coverage (cities at display size, six divisions) → 04 Careers →
  05 Contact (phone number at display size over the rust horizon glow) → footer index
  (About Us, Services, Careers).
- **Pinned moment:** 02 Staffing. The officer photograph holds still on the left while
  the four habits scroll past on the right, each brightening as it crosses the middle of
  the viewport.
- **Rail behavior:** a sticky rail in a right-hand margin column from 01 to 05, with a
  hairline track filled by scroll progress and a rust tick on the current mark. Below
  1200px it collapses into a running head under the header (`02 Staffing` plus a
  progress line).
- **Boundary crossings:**
  - The copper-glass tower photo (hero6) bleeds off the right edge and runs from the hero
    down under the opening of 01 Verify.
  - The "<1%" figure hangs out of the ledger into the quote's space.
  - The officers-from-behind photo (about-security) runs full bleed from the end of
    03 Coverage under the headline of 04 Careers.

## Concept B: "Field Log"

A chronological log: where Ares came from, what it does each shift, and the record that
results. The proof arrives last, as a summary.

- **Section order:** Full-bleed hero on the Pikes Peak photo (about-hero), headline set
  low → 03 Coverage first (cities as the opening statement) → 02 Staffing as a vertical
  timeline with photos alternating sides → the quote → 01 Verify as the closing summary
  ledger → 04 Careers → 05 Contact. The rail is reordered to match.
- **Pinned moment:** 01 Verify. The ledger pins full screen while three groups
  (Contract vehicle, Registration, Certification) replace each other in place as the
  reader scrolls.
- **Rail behavior:** horizontal. A running index across the top of the viewport at every
  width, filled left to right.
- **Boundary crossings:** the hero photo runs under the Coverage city list; a team photo
  at the range crosses from Staffing into the quote.

## The pick: Concept A

Concept A puts the signature first: the brief and PRODUCT.md say a buyer should verify
the company before reading any claim, and A opens on the ledger right after the hero,
while B makes them wait until the end. A keeps the ledger unpinned so a contracting
officer can read, select, and copy the numbers at their own pace; pinning a table (B)
swaps out rows at scroll speed and fights exactly that task. The pinned moment instead
goes to Staffing, which is a sequence by nature. A also uses the hero photo that
`src/seo/routes.json` already preloads (hero6), so the change needs no edits to the
off-limits SEO files.
