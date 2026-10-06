# Product

<!-- impeccable:product-schema 1 -->

Source note: init ran without a live interview. The owner directed that the context
below be used as the interview answers ("answer its questions from it without asking
me", 2026-10-04). Facts marked *(brief)* come from that direction; facts marked
*(site)* come from content already published on the site or its committed files.

## Platform

web

## Users

- **Federal contracting officers** *(brief)* evaluating a security vendor for a federal
  site. They verify registration and contract vehicles (GSA, UEI, CAGE, NAICS,
  set-aside status) before they ever call.
- **Facility managers** *(brief)* at commercial, industrial, and institutional sites who
  need dependable coverage and a responsive point of contact.
- **Procurement teams** *(brief)* assembling vendor files and comparing contractors.
- Secondary: **job seekers** applying for armed, unarmed, cleared, and office roles
  *(site: /careers)*.

## Product Purpose

Ares Security LLC is a security services firm providing armed, unarmed, and cleared
security officers *(brief)* to federal and commercial clients across Colorado
Springs, Denver, and Pueblo *(brief, site)*. The website's job is to let a buyer
verify the company fast and start a quote or a call. Success is a qualified quote
request, phone call, or capability statement download.

## Positioning

- Minority woman-owned *(owner, 2026-10-04)*; WOSB certified (WOSB250470, set-aside
  eligible) and WBENC certified (WBE2303571) *(site)*.
- GSA Multiple Award Schedule contract holder, contract 47QSMS25D009Q, SIN 561612
  *(site)*: agencies can award task orders at pre-negotiated pricing without opening
  a new competition *(site)*.
- Every officer is trained on site by a member of leadership who has personally worked
  that exact post *(site)*.
- Fewer than 1% missed shifts since founding in 2021; on-call scheduling standard in
  every contract *(site)*.

## Operating Context

Buyers evaluate vendors against documents: capability statements, SAM.gov
registration, GSA eLibrary listings, post orders, and proposals. The site mirrors
that world: precise, documented, credible *(brief)*. A downloadable capability
statement PDF exists at /capability-statement *(site)*.

## Capabilities and Constraints

- Six service divisions *(site: /services)*: Government Security Personnel; Airport &
  Transportation Security; Commercial & High-Traffic Security; Industrial, Logistics &
  Construction; Specialized & Armed Protection; Institutional & Community Security.
- Service areas with dedicated pages: Colorado Springs, Denver, Pueblo *(site)*.
- Federal identifiers *(site)*: UEI XQXDN6E33SF4, CAGE 9KL18, primary NAICS 561612.
- Local licenses (armed security and training provider) *(capability statement PDF,
  2026)*: Denver #2021-BFN-0001984, Colorado Springs #0850744L, Pueblo #26422.
- Founded 2021 in Colorado Springs, CO. Phone 719-696-3966. Email
  contact@aressecurity.co *(site)*.
- Technical: Vite + React 18 + Tailwind v4, prerendered static pages with per-route SEO
  (`src/seo/`), sitemap and SEO check scripts. Routing, `src/seo/*`, `scripts/`,
  `netlify/`, and `public/_redirects` are off limits for design work *(owner)*.

## Brand Commitments

- Name: Ares Security (legal: Ares Security LLC). Logo mark `/ares-logo.svg` and
  wordmark `/images/ares-text.svg` *(site)*.
- Voice: plain, precise, natural. Never AI-sounding copy, no em-dashes, no slogans
  *(owner)*. Not luxury, not startup-playful *(brief)*.
- Visual direction: defined by DESIGN.md (clean-slate redesign of Home, nav, and footer,
  started 2026-10-04 from the original Home; the chosen style then rolls out site-wide).
  Brief: dark, clean, modern, sharp, close to Apple-level polish, reading as a serious
  federal contractor (precise, documented, credible). Not luxury, not startup-playful.
  Signature: proof presented like a spec sheet *(brief)*. Earlier passes live in
  `_archive/` and are not design reference.

## Evidence on Hand

- Testimonial (placeholder, shortened with the owner's approval): "Ares arrived
  prepared. Their documentation was cleaner than the incumbent's from day one."
  Attribution: Contracting Officer, USAF · Buckley Space Force Base *(site, owner)*.
- Real staff and brand photography in `public/images/`: officer portraits
  (`officer-portrait.jpg`, `backbone-officer.jpg`), team at the range
  (`careers-philosophy.jpg`, `careers-team.jpg`), branded patrol vehicles
  (`mission-vehicle.jpg`), officers from behind (`about-security.jpg`).
- Certification marks: GSA, SBA, Women Owned, WBENC (`public/images/cert-*`).
- Veterans: veteran supervisors on staff; the NRA firearms instructor is a veteran; the
  company actively hires veterans. The owner is not a veteran; never write
  "veteran-led" *(owner)*.
- From the owner's capability statement PDF *(2026)*: clients rate Ares Exceptional on 16
  of 18 criteria across multi-year contracts (quality of services, overall performance,
  repeat business) over 2+ years of monitored performance; employees rate Ares 4.8 out of
  5 on Indeed (management and work-life balance highest).
- **Absent, never fabricate:** client logos or client names (the owner removed the past
  performance logo grid on 2026-09-01), additional testimonials, staff counts, response
  times, or any other statistics beyond those listed here.

## Product Principles

1. Proof before persuasion: a buyer should be able to verify the company before reading
   any claim.
2. Every number is real and checkable; precision is the brand.
3. Plain language over marketing language.
4. One clear next step: request a quote, call, or download the capability statement.

## Accessibility & Inclusion

WCAG AA contrast on all text and controls; motion must respect
`prefers-reduced-motion`, and content is never hidden while scrolling *(owner)*.
