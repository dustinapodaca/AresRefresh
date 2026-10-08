# Marketing gaps from the CenCore review (test branch, 2026-10-08)

Branch `test/marketing-gaps`, from `redesign-b-fresh` at 0fc5906. Source: a crawl of
cencoregroup.com (about 85 pages) compared with this site. CenCore sells clearance; Ares
cannot claim an FCL, so only the clearance-free parts of their playbook were adopted, and
Ares' own lead (open federal identifiers, capability statement, WOSB/WBENC, city licenses
with Verify links) was kept.

Mobbin: Linear and Dovetail (questions as an accordion, heading left), Linear and Clerk
(articles as ruled rows), Reducto and Webflow (a sales form with structured choices).

## What was built

| Gap (CenCore has it, Ares did not) | Built |
|---|---|
| One page per role, a repeatable template | Six role pages `/services/<slug>`, the capability statement's six services: spec sheet, what the post covers, where we post them, questions, an ask, more services |
| Sector pages with a specific ask | Four industry pages `/industries/<slug>`: what is at stake, what we deliver, why Ares here (proof rows with routes), a specific ask, questions; Nano Banana scenes (light and architecture, no people) |
| Structured quote form | Service by role, location, officers on post, schedule, start window, site type, how did you hear (AI assistants and agency referral included); no clearance question; prefilled from role and industry pages |
| FAQs with FAQPage schema | On every role and industry page (native details, JSON-LD in the body) |
| A named surge / on-call offering | "The relief roster" on Services (on-call coverage in every contract; no response times) |
| "Program, not staffing" | "A security program, not a headcount." on Services: post orders and SOPs, records you can audit, supervision |
| Systems officers operate | "Trained on your systems." on Services (card readers, visitor software, CCTV monitors, intercoms and radios, gate and dock controls, alarm panels); a commitment, not a claim of past work. No badging |
| Buyer-education blog | `/insights` with five articles (armed vs unarmed, post orders, construction sites, buying through GSA, Colorado licensing) with Article schema |
| City recruiting pages | `/careers/<city>` for Colorado Springs, Denver, Pueblo |
| Safety-concern route | "Report a concern" in the footer legal row (email) |

Also: a Services column in the footer, Insights under Company, "By role, or by industry."
on Services, and "Jobs by city" on Careers.

## Not built (needs the owner)

- A named leadership bio and photo (the owner's name and approval).
- Client quotes beyond the one on Home; employee quotes on Careers (need real people).
- An incumbent-roster form (only when a contract is won).
- A news category (no awards or hires to announce yet).

## Must wait for the FCL or scale

Clearance tiers, cleared-guard language, CSTs, clearance sponsorship, SCIF and accreditation
work, nationwide surge, fill-rate or headcount claims.
