# Services content inventory

Content only, extracted from the pre-redesign Services page (`src/pages/Services.tsx` at
`9254f47` on `redesign-b-fresh`, unchanged since `seo`). No layout, components, class
names, or visual patterns are carried over. This file is the only input from the old page.

Sources: **[S]** old Services.tsx. **[P]** PRODUCT.md / DESIGN.md facts. **[O]** owner
direction (2026-10-05): keep the six service divisions and their Matrix photos.

## Page heading

- Breadcrumb: Home / Services & Process [S]
- H1: "Services & Process" [S]
- Sub: "Precise, reliable security solutions for any environment — built on superior
  detail, outstanding communication, and technical proposals that set the standard." [S]
- Background photo: `/images/capabilities-hero.jpg` (generic city street, not Colorado) [S].
  `src/seo/routes.json` preloads this file for /services (off limits).

## The Ares Service Matrix (keep all six, with photos) [S][O]

Section headline: "The Ares Service Matrix". Side note: "What we ship / What the client gets".

| # | Division | Body | Site types | Photo |
|---|---|---|---|---|
| 01 | Government Security Personnel | Lawful, immediate access to federal and state facilities. DoW-vetted officers — GSA Schedule #47QSMS25D009Q for streamlined procurement, no new competition required. | Military Bases, Courthouses, Federal Buildings, State Agencies, TS/SCI Cleared | `matrix-government.jpg` (flag on a federal building, 640×427) |
| 02 | Airport & Transportation Security | Perimeter protection, passenger-area security, baggage, and cargo operations with professional 24/7 uniformed and plainclothes coverage. | Airports, Transportation Hubs, Aviation Facilities | `matrix-airport.jpg` (terminal concourse, 1200×627, WebP data in a .jpg) |
| 03 | Commercial & High-Traffic Security | Visible deterrence and loss-prevention that scales with foot traffic while protecting revenue and customer experience. | Retail, Banks, Hotels, Malls, Grocery | `matrix-commercial.jpg` (retail floor, 1000×667) |
| 04 | Industrial, Logistics & Construction | 24/7 posted guards, mobile patrols, perimeter security, and auditable checkpoint logs. | Industrial Sites, Warehouses, Construction, Critical Infrastructure | `matrix-industrial.jpg` (cranes at dusk, 640×360) |
| 05 | Specialized & Armed Protection | Licensed, firearms-compliant officers for cash-handling, regulated, or high-liability sites. | Armed Asset Protection, High-Risk Environments, Data Centers | `matrix-specialized.jpg` (server aisle, 640×384, WebP data in a .jpg) |
| 06 | Institutional & Community Security | Tailored, trust-based security for sensitive and community environments where calm presence matters most. | Hospitals, Schools, Museums, Places of Worship, Residential & Retirement | `matrix-community.jpg` (residential building, 640×427) |

Photo constraint: four of the six are 640px wide. Shown larger than about 560 CSS px they
go soft, so they are set as exhibits inside the column, not full bleed.

## Where we work (navigation aid) [S]

- Label: "Where We Work"
- Links: Colorado Springs `/locations/colorado-springs`, Denver `/locations/denver`,
  Pueblo `/locations/pueblo`. These keep the location pages reachable from /services.

## Four stages to deployment [S]

Section headline: "Four Stages to Deployment". Side note: "Every engagement moves through
these four stages". Phase labels under the row: Pre-Contract, Contract Execution,
Operational.

| # | Stage | Micro | Short line | Lead | Body |
|---|---|---|---|---|---|
| 1 | Technical Audit | Scope · Risk · Site Walk | We walk the site, document risk, and brief command structure before paper changes hands. | We invest time upfront so you don't pay for surprises later. | By walking the site and mapping risks with your team before any contract is signed, we identify vulnerabilities early and build a solution that fits your exact operational needs — preventing costly gaps or changes down the road. |
| 2 | Compliance Mapping | Regs · Clearances · SOPs | Regs, clearances, and SOPs mapped against the facility — federal, state, or commercial. | Full regulatory alignment from day one. | We cross-reference every regulation, clearance, and SOP against your specific facility — federal, state, or commercial. This eliminates compliance risk and gives you complete audit confidence from the moment we go live. |
| 3 | Guard Training | Post Orders · Firearms · Drills | Post orders, firearms qualification, drill cadence. Every officer current at time of post. | Site-specific training by leadership — never a new guard without it. | No officer is ever sent to your site without hands-on training from a member of our leadership team who has personally worked that exact post. They learn the unique nuances, entry points, client expectations, and daily rhythms so your protection is consistent and professional from the very first shift. |
| 4 | Deployment | Go-Live · QA · Reporting | Go-live with QA review and real-time reporting pipeline. Same-shift into client ops. | Seamless go-live with zero coverage gaps. | We deploy with full staffing levels and a robust on-call system so there are never lapses — not even for a single shift. Real-time quality assurance, daily reporting, and immediate leadership support ensure smooth operations and total peace of mind. |

## Why our process matters [S]

- Headline: "Why Our Process Matters". Label: "How it works" / "Our approach".
- Paragraph: "Every site is different. Every shift pattern, threat profile, and compliance
  requirement is unique. Our four-stage process exists because protection that holds up
  under scrutiny can't be rushed, copied from another contract, or trusted to a stranger
  on day one."
- Background photo: `/images/why-stages-bg.jpg` (abstract concrete, decorative).

## Closing banner [S]

- Label: "Personnel in Action"
- Headline: "Discipline · Vigilance · Professionalism in the Field"
- Photo: `/images/about-banner.jpg` (Denver skyline with the Front Range, 2000×1391; the
  only Colorado place on this page).
- Docks into the footer (`data-extended` on the footer for /services).

## Facts available from PRODUCT.md for proof and the close [P]

- GSA MAS 47QSMS25D009Q, SIN 561612; agencies can award task orders at pre-negotiated
  pricing without opening a new competition.
- Every officer is trained on site by a member of leadership who has personally worked
  that exact post.
- Fewer than 1% missed shifts since 2021; on-call scheduling standard in every contract.
- 719-696-3966, contact@aressecurity.co. Capability statement at /capability-statement.
- Veterans: veteran supervisors; the NRA firearms instructor is a veteran.
