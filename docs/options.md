# Live options

Every alternative kept on the site for the owner and the client (Deidre) to compare. The
default is what ships and what search engines see; the others appear only with the switch
in the URL. Keep this list in step with the code (see `.claude/skills/client-options`).

Last checked against the code: 2026-10-11, branch `audit`.

## Query switches

| Where | Switch | Default | Other options | Code | Gallery selector |
|---|---|---|---|---|---|
| Home hero | `/?hero=` | `b2` "A prepared officer on every post." (owner, 2026-10-10) | `current`, `a`, `b`, `b1`, `b3`, `b4`, `c` | `src/components/home/Hero.tsx` (`OPTIONS`) | `.ds-hero` |
| Home 02 Industries | `/?industries=` | `plates` (owner, 2026-10-10) | `rows` | `src/components/home/Industries.tsx` | `.ds-industries` |
| Home, For prime contractors | `/?prime=` | `diagram` (owner, 2026-10-10) | `split`, `vignettes` | `src/components/home/Industries.tsx` (`PrimesPanel`) | `.ds-primes-panel` |
| Services opening | `/services?hero=` | `plan` "Security officers, patrol, and access control." (copy audit) | `a`, `b`, `c`, `current` | `src/components/services/Opening.tsx` (`COPY`) | n/a, the opening is the top of the page |
| About, Why Ares exists | `/about?founder=` | `letter` (owner, 2026-10-10) | `note` | `src/components/about/Founder.tsx` | `.ds-founder` |

## Whole-page previews

| Route | What | Kept as | Notes |
|---|---|---|---|
| `/home-next` | Resend-style Home (black, dark frosted glass, seven beats) | tag `home-resend-option`; `src/pages/HomeNext.tsx`, `src/home-next.css` | `noindex`, not in the sitemap. The Dossier Home stays the default. |

## Tags of earlier Home versions

`home-v00-original` through `home-v11-dossier`. See README.md "Home redesign versions".

## Galleries

Local review pages in `.playwright-mcp/gallery/` (gitignored): `hero-options.html`,
`round3-options.html`, `round3b-options.html`, `group2-options.html`, and others. New rounds
get a new file; build them with the client-options skill's `options-gallery.mjs`.
