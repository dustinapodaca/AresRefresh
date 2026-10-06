# Location pages: content inventory

Pages: `/locations/colorado-springs`, `/locations/denver`, `/locations/pueblo`. They exist
mainly for search ("security guards in Colorado Springs"). Each is a brief local overview
that hands the visitor on to Home, Services, the Capability Statement, or a quote.

Sources: the old pages (LandingLayout, light "Moonstone" styles), `src/seo/routes.json`
(read only), PRODUCT.md, the handoff's owner facts, and the sales team's city notes
(2026-10-06, context only, "not bible").

## What the old Colorado Springs page carried, and where it goes

| Old content | Decision |
|---|---|
| Breadcrumb Home / Service Areas / Colorado Springs | Kept in JSON-LD (routes.json); no visible breadcrumb (the nav and the cities line carry the way back) |
| H1 "Security Guards in *Colorado Springs*" (italic accent) | "Security guards in Colorado Springs." (no italic accent word; matches the search phrase and the route title) |
| Lede: home office, not a branch; leadership based here | Kept as the lead, shorter |
| 01 Local base: founded 2021, HQ, scheduling/training/supervision local, on-call, <1% missed shifts | Lead + one ledger row; <1% stays on Home (not repeated) |
| Bullets: WOSB/WBENC, GSA MAS, leadership works first shift | Company-wide; left to Home and the Capability Statement (linked) |
| 02 Coverage: fixed posts, gates, lobbies, patrol, escort, surge/event, armed and unarmed | Folded into the local sector list |
| Sector bullets: government, commercial/retail/hospitality, industrial/construction/utility, healthcare/education/campus | Kept as the local list, each linked to its Services division |
| 03 Documentation: post orders, training, records on request; GSA and SAM | Dropped (Capability Statement carries it; linked) |
| Four-stage process strip | Dropped (Services carries it; linked) |
| CTA "We respond within one business day" | Removed: response times are never stated |
| Kicker labels "01 · Local base" | Removed (no kickers) |

## New, from the sales notes (true and safe)

- Colorado has no statewide security license; a few cities license security companies
  themselves. Ares holds those licenses in Colorado Springs, Denver, and Pueblo.
- Colorado Springs: Contract Security Agency license #0850744L; approved training
  provider; armed endorsements from our NRA-certified (veteran) firearms instructor.
- Office shown only as Colorado Springs, CO 80906 (never a street address).
- Local sectors: defense contractors and military-adjacent sites, data centers,
  construction and industrial sites, commercial property and retail loss prevention,
  institutions, airport-area development (COS, Peak Innovation Park), utilities.

## Not used (conflicts with owner facts)

- "Veteran-led" (never; veteran supervisors and a veteran instructor only).
- "We respond within one business day" (no response times).
- Any clearance claim.
- Named target companies (QTS and others): targets, not clients; never implied as clients.
