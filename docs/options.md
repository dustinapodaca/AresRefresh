# Live options

Every alternative kept on the site for the owner and the client (Deidre) to compare. The
default is what ships and what search engines see; the others appear only with the switch
in the URL. Keep this list in step with the code (see `.claude/skills/client-options`).

Last checked against the code: 2026-10-11, branch `audit`.

## Query switches

| Where | Switch | Default | Other options | Code | Gallery selector |
|---|---|---|---|---|---|
| Navigation (every page) | `?nav=` (sticks for the session) | `full` the panel nav edge to edge (owner, 2026-10-13) | `float` the floating card, `classic` the previous bar | `src/components/NavPanel.tsx`, `src/components/Header.tsx` | top of page |
| Home hero | `/?hero=` | `b2` "A prepared officer on every post." (owner, 2026-10-10) | `current`, `a`, `b`, `b1`, `b3`, `b4`, `c` | `src/components/home/Hero.tsx` (`OPTIONS`) | `.ds-hero` |
| Home 02 Industries | `/?industries=` | `plates` (owner, 2026-10-10) | `rows` | `src/components/home/Industries.tsx` | `.ds-industries` |
| Home, hero background | `/?herobg=` | Topography (React Bits contour terrain in rust; owner, 2026-10-15) | `photo` the copper-glass tower, the hero photo until 2026-10-15 | `src/components/home/Hero.tsx`, `Topography.tsx` | `.ds-hero` |
| Home, For prime contractors | `/?prime=` | `pipeline` (owner, 2026-10-15, after gladia.io) | `diagram` (the default 2026-10-10 to 10-15), `split`, `vignettes` | `src/components/home/Industries.tsx` (`PrimesPanel`) | `.ds-primes-panel` |
| Site-wide, card surface | `?cards=` (sticks for the session) | glass (owner, 2026-10-15, after gladia.io's speech-to-text page) | `solid` (the lit-edge cards, the default until 2026-10-15) | `src/App.tsx` (`useCardStyle`), `src/dossier.css` ("Glass cards") | `.ds-values-list`, `.ds-primes-panel` |
| Home, patrol vehicles (Quality) | `/?vehicles=` | `side` the photo beside the facts | `wide`, `portrait`, `glass` (design review, 2026-10-13) | `src/components/home/Quality.tsx` (`FORMS`) | `.ds-quality` |
| Services opening | `/services?hero=` | `plan` "Security officers, patrol, and access control." (copy audit) | `a`, `b`, `c`, `current` | `src/components/services/Opening.tsx` (`COPY`) | n/a, the opening is the top of the page |
| Capability Statement, Past performance | `/capability-statement?past=` | `record` selected current and completed contracts (owner, 2026-10-11) | `current` the three current only | `src/components/capability/Sections.tsx` (`Past`), `data.ts` (`PAST_PERFORMANCE`, `PAST_CURRENT`) | `.ds-cs-past` |
| Capability Statement, Certifications and codes | `/capability-statement?creds=` | `table` one grouped table, each identifier once (owner, 2026-10-11) | `marks` the marks, then the code listing | `Sections.tsx` (`CredTable`), `data.ts` (`CRED_GROUPS`) | `.ds-cs-creds` |
| Capability Statement, voice | `/capability-statement?voice=` | `third` formal third person (owner, 2026-10-11) | `first` "we" and "our" | `Sections.tsx` (`useCsOptions`), `data.ts` (`THIRD_PERSON`) | `.ds-cs-why` |
| Services opening photo | `/services?photo=` | `tower` the copper-glass tower, moved from the Home hero (owner, 2026-10-15) | `capitol` Denver State Capitol at night (the default 2026-10-12 to 10-15); `pikes` downtown Colorado Springs, Pikes Peak; `skyline` Denver skyline at dusk | `src/components/services/Opening.tsx` (`PHOTOS`) | n/a, the opening is the top of the page |
| About, Why Ares exists | `/about?founder=` | `letter` (owner, 2026-10-10) | `note` | `src/components/about/Founder.tsx` | `.ds-founder` |

## Whole-page previews

| Route | What | Kept as | Notes |
|---|---|---|---|
| `/home-next` | Resend-style Home (black, dark frosted glass, seven beats) | tag `home-resend-option`; `src/pages/HomeNext.tsx`, `src/home-next.css` | `noindex`, not in the sitemap. The Dossier Home stays the default. |

## Tags of earlier Home versions

`home-v00-original` through `home-v11-dossier`. See README.md "Home redesign versions".

## Galleries

**The running gallery:** `docs/options-gallery.json` builds
`.playwright-mcp/gallery/all-options.html` (gitignored), every option above at 1440 and 390
with its copy and an "Open live" link. Add each new option to it in the same commit as the
code, then re-run (dev server up):

```bash
node .claude/skills/client-options/scripts/options-gallery.mjs docs/options-gallery.json
```

Older one-round galleries in `.playwright-mcp/gallery/` stay as the record:
`hero-options.html`, `round3-options.html`, `round3b-options.html`, `group2-options.html`,
and others.
