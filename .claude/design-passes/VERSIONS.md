# Home page versions

Every Home iteration, numbered in the order it was made (all on 2026-10-04). The number
is the same everywhere: the git tag, the folder here, and how we talk about it.

## Live branches (work happens here)

| Branch | What it is |
|---|---|
| `redesign-a-framer` | **Option A.** Same content as v08. The good option so far. |
| `redesign-b-fresh` | Fresh redesign started from v00 (original Home), nav and footer in scope. |
| `seo`, `main`, `edit` | The live site branches. Untouched by the redesign. |

## Versions

| # | Name | Runnable tag (`git checkout <tag>`) | Archive folder here | Notes |
|---|---|---|---|---|
| v00 | Original Home | `home-v00-original` | none | The starting point, on `seo` |
| v01 | Light, Apple-style | none | `v01-light-apple/` | Code + screenshot only |
| v02 | Framer dark | see v06 | `v02-framer-dark/` | Includes the Framer DESIGN.md |
| v03 | xAI dark, new layout | none | `v03-xai/` | Code + screenshot only |
| v03b | xAI dark, original layout | none | `v03b-xai-original-layout/` | Code + screenshot only |
| v04 | Own blend (Framer/xAI/Vercel) | none | `v04-own-blend/` | Steel hero photo |
| v04b | Own blend, skyscraper hero | none | `v04b-own-blend-skyscraper/` | Code + screenshot only |
| v05 | Vercel dark | `home-v05-vercel` | `v05-vercel/` | |
| v06 | Framer dark restored | `home-v06-framer` | (v02) | v02 brought back as the flow base |
| v07 | Framer flow pass | `home-v07-framer-flow` | none | First continuous long-form version |
| v08 | Framer flow, final | `home-v08-framer-flow-final` | none | **Option A**: GSA plate, bronze glow, pill buttons, About/Services/Careers panels |
| v09 | Mobbin refinement | `home-v09-mobbin-refine` | none | Rejected |
| v10 | Mobbin redesign | `home-v10-mobbin-redesign` | none | Rejected ("field document" frame grid) |

"Code + screenshot only" versions were never committed on their own; their Home.tsx and
screenshots live in the folder, but the colors and fonts they used were changed later, so
running one again means reapplying its tokens.

To look at any runnable version: `git checkout <tag>` then `npm run dev`. To get back to
the current work: `git checkout redesign-b-fresh`.
