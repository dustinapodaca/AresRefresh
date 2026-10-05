---
target: Home page (restored Pass 2)
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/dustinapodaca/Code/git/AresClaude/ares-security/project/react/src/pages/Home.tsx"
target_fingerprint: "sha256:238c72335c037168060d1f1a162af5eea842d6df70c23b974fef532dedad925c"
target_path: /Users/dustinapodaca/Code/git/AresClaude/ares-security/project/react/src/pages/Home.tsx
timestamp: 2026-10-04T23-49-00Z
slug: src-pages-home-tsx
---
⚠️ DEGRADED: single-context for Assessment B (detector ran in parent; Assessment A ran isolated in sub-agent a7f8b01)

## Design Health Score: 23/32 (Good; 7 and 10 n/a for a marketing surface)
| # | Heuristic | Score |
|---|---|---|
| 1 | Visibility of status | 3 |
| 2 | Match real world | 3 |
| 3 | User control | 3 |
| 4 | Consistency | 2 (division pills look like buttons but are not links) |
| 5 | Error prevention | 3 |
| 6 | Recognition | 3 |
| 7 | Flexibility | n/a |
| 8 | Aesthetic/minimal | 3 (monotonous uniform rhythm) |
| 9 | Error recovery | 3 |
| 10 | Help/docs | n/a |

## Design specificity
Spec sheet is authored for contracting officers; hero image, "Services and service areas", boxed careers card, and contact strip are category-interchangeable. Detector: 14 findings (7 low-contrast in gradient Performance card, skipped heading h2→h5, all-caps body 45 chars, 2 extreme-tracking + 1 tight-leading on display type (intentional per Framer DESIGN.md), overused-font Inter (intentional per DESIGN.md)).

## Priority issues
- [P1] Stacked modules, no narrative spine: identical H2 + box + py-24/32 per section. → layout, animate
- [P1] Copy never hands off; quote praises documentation but "Clean documentation" sits two screens later. → clarify
- [P1] Testimonial is the long form; approved text is the shortened one. → clarify
- [P2] Careers boxed card interrupts the buyer path before the close. → distill/layout
- [P2] Generic abstract hero; cert marks only in footer. → layout/polish

## Component seams (top to bottom)
1 hero CTAs→inset rounded image; 2 image→verify H2 (128px dead air); 3 verify H2→4-card bento; 4 bento→testimonial (~256px + rule, hardest cut); 5 testimonial→staffing H2 cold start; 6 staffing H2→photo+list module; 7 practices→surface-1 band switch; 8 services H2→pills; 9 All services→city cards; 10 band switch back→boxed careers card; 11 careers→contact (double gap + rule); 12 contact→footer (third rule, duplicated details). Global: uniform section spacing; identical H2 scale.

## Persona red flags
Jordan: SIN/MAS/UEI/CAGE/NAICS and "badge cycle" unexplained; pills look clickable. Riley: fake-button pills; "Minority woman-owned" wraps at 1440; dead middle in Performance card. Casey: ~1,700px of spec cards before any human content; phone appears only at the bottom. Contracting officer: no capability statement CTA beside the proof or at the close; cert marks only in footer.

## Questions to consider
Why is the spec sheet boxed into cards instead of being the page's document spine? Should careers sit inside the buyer path? What if the page ended on the capability statement?
