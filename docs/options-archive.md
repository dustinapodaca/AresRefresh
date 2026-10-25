# Options archive

**No option switches are live (2026-10-25).** The AI-tells pass's `?card=` (plain, flora, dossier: dossier
chosen) and `?mono=` font trial (PP Fraktion Mono chosen) were removed the same day. On the dev server a
Before / Now switch (`src/components/CompareSwitch.tsx`, dev only) jumps between this copy (:5173) and
a worktree at `../react-before` on a382ed4, the site before the pass (`npx vite --port 5175` there).
Everything below was removed at launch
(owner, 2026-10-19). The site ships only the chosen version of each; the alternatives exist only
here and in git.

- **Restore the exact code:** the tag `options-archive-2026-10-19` (commit 77d4ab3, pushed to
  GitHub) is the last version with every switch working. To look: `git worktree add
  ../ares-options options-archive-2026-10-19`, run it, and open the URLs below. To bring one back,
  copy that option's component code from the tag into `audit` (and any CSS rules for its variant:
  they were pruned from `src/dossier.css` in the same change).
- **Defaults at removal** (what ships now): Home hero h1 "Security officers for Colorado's Front
  Range." with the terrain background; Industries plates; prime panel pipeline with the CSS light;
  Quality wide; close routes; liquid glass cards; the edge-to-edge panel nav with the sliding phone
  menu; Services opening aperture with the tower photo and "A prepared officer on every post.";
  Services stage head `head`; About founder letter; Capability Statement record, table, third
  person; Government strip card.
- The table below is the record as of 2026-10-11, with later defaults noted where they changed.
  Home hero gained ten headlines on 2026-10-19 (`h1`…`h10`; `h1` chosen); the Services opening
  headline became "A prepared officer on every post." (its earlier line at `?hero=officers`).

## Query switches

| Where | Switch | Default | Other options | Code | Gallery selector |
|---|---|---|---|---|---|
| Navigation (every page) | `?nav=` (sticks for the session) | `full` the panel nav edge to edge (owner, 2026-10-13) | `float` the floating card, `classic` the previous bar | `src/components/NavPanel.tsx`, `src/components/Header.tsx` | top of page |
| Home hero | `/?hero=` | `b2` "A prepared officer on every post." (owner, 2026-10-10) | `current`, `a`, `b`, `b1`, `b3`, `b4`, `c` | `src/components/home/Hero.tsx` (`OPTIONS`) | `.ds-hero` |
| Home 02 Industries | `/?industries=` | `plates` (owner, 2026-10-10) | `rows` | `src/components/home/Industries.tsx` | `.ds-industries` |
| Home, hero background | `/?herobg=` | Topography (React Bits contour terrain in rust; owner, 2026-10-15) | `photo` the copper-glass tower, the hero photo until 2026-10-15 | `src/components/home/Hero.tsx`, `Topography.tsx` | `.ds-hero` |
| Home, For prime contractors | `/?prime=` | `pipeline` (owner, 2026-10-15, after gladia.io) | `diagram` (the default 2026-10-10 to 10-15), `split`, `vignettes` | `src/components/home/Industries.tsx` (`PrimesPanel`) | `.ds-primes-panel` |
| Government industry page, prime panel | `/industries/government-military?prime=` | `strip`, the pipeline thin in one row (owner, 2026-10-15) | `pipeline` (Home's full one), `diagram` (the earlier PrimeFlow) | `src/pages/IndustryPage.tsx`, `src/components/market/PrimeStrip.tsx` | `.ds-pstrip`, `.ds-primes-compact` |
| Government prime strip | `/industries/government-military?pstrip=` | `card` (chosen, owner 2026-10-16): one pipeline card holding the flow, side by side on desktop, stacked on phones, posts as chips | `ledger` ruled columns (rows on phones) on a line that grows with the scroll; `track` three stops on a line that fills with the scroll, posts as chips beneath; `row` the row of tiles (upright on phones, owner: looked bad) | `src/components/market/PrimeStrip.tsx` | `.ds-pph-*`, `.ds-pstrip-*` |
| Phone menu | `?mnav=` | pages that slide over (yucca.co.za) with the photo list, the industry swipe row, and Company photo tiles (owner, 2026-10-15) | `accordion` the photo accordions (gigaenergy.com); `list` the plain lists | `src/components/NavPanel.tsx` (`PhoneServices`, `PhoneIndustries`) | `.ds-np-mobile` |
| Site-wide, card surface | `?cards=` (sticks for the session) | liquid: glass plus a rim that bends the light behind (Chromium only), the Record and Capability cards with their faint rust corner light (owner, 2026-10-15, after gladia.io) | `glass` (no liquid rim); `solid` (the lit-edge cards, the default until 2026-10-15) | `src/App.tsx` (`useCardStyle`), `src/dossier.css` ("Glass cards") | `.ds-values-list`, `.ds-primes-panel` |
| Home, patrol vehicles (Quality) | `/?vehicles=` | `wide` (chosen, owner 2026-10-16): the photo across the column, the facts in a row beneath | `side` the photo beside the facts, `portrait`, `glass` (design review, 2026-10-13) | `src/components/home/Quality.tsx` (`FORMS`) | `.ds-quality` |
| Home close (06 Contact) | `/?close=` | `routes` (chosen, owner 2026-10-16): two glass cards, Request a quote and Call us (Linear, Grok); its primes line removed | From Mobbin, each a whole version (desktop and phone): `current` the headline, the phone large, email and base, the button and the PDF link; `centered` one centered statement over the rust light, the button and the call link (Resend, Slash, Rox); `starter` headline left, a glass card right with the services as square chips that open the quote form with one chosen (Claude, Fiasco); `ledger` headline and button left, Call, Email, Capability statement, and Teaming as ruled rows right (Clay) | `src/components/home/Contact.tsx` (`FORMS`) | `.ds-contact[data-form]`, `.ds-cta-*` |
| Prime contractor panel light (Home, Government & Defense) | `?primeglow=` | `css` (owner, 2026-10-16): four soft radial shapes drifting on long CSS loops, crisp on phones | `webgl` the flowing shader (`PrimeGlow.tsx`), which looked poor on phones at half resolution | `src/components/home/PrimeGlow.tsx` | `.ds-pglow-css`, `.ds-pglow` |
| Services opening | `/services?hero=` | `plan` "Security officers, patrol, and access control." (copy audit) | `a`, `b`, `c`, `current` | `src/components/services/Opening.tsx` (`COPY`) | n/a, the opening is the top of the page |
| Capability Statement, Past performance | `/capability-statement?past=` | `record` selected current and completed contracts (owner, 2026-10-11) | `current` the three current only | `src/components/capability/Sections.tsx` (`Past`), `data.ts` (`PAST_PERFORMANCE`, `PAST_CURRENT`) | `.ds-cs-past` |
| Capability Statement, Certifications and codes | `/capability-statement?creds=` | `table` one grouped table, each identifier once (owner, 2026-10-11) | `marks` the marks, then the code listing | `Sections.tsx` (`CredTable`), `data.ts` (`CRED_GROUPS`) | `.ds-cs-creds` |
| Capability Statement, voice | `/capability-statement?voice=` | `third` formal third person (owner, 2026-10-11) | `first` "we" and "our" | `Sections.tsx` (`useCsOptions`), `data.ts` (`THIRD_PERSON`) | `.ds-cs-why` |
| Services opening form | `/services?open=` | `aperture` (owner, 2026-10-15): headline, then a plate that opens to the full width on scroll, a liquid glass card with the lead across its top edge | Headline and lead only; the services and industries stay in the page. `curtain` the photo through six frosted panes (three on phones), a pane clearing under the pointer; `sink` the headline huge over the photo, its last line resting in a liquid glass band that holds the lead (like the footer's letters); `lens` one tall liquid glass slab, headline at the top and lead at the foot, the photo drifting behind; all 2026-10-15; `current` the earlier glass that slides up over the held photo. The versions with the six services in the opening (incl. `index`) are tagged `services-open-roles-option`; `plate`, `split`, `overlap` were dropped as too basic | `src/components/services/OpeningForms.tsx` | `.ds-svx`, `.ds-cw-*`, `.ds-ap-*`, `.ds-sk-*`, `.ds-ln-*` |
| Services opening photo | `/services?photo=` | `tower` the copper-glass tower, moved from the Home hero (owner, 2026-10-15) | `capitol` Denver State Capitol at night (the default 2026-10-12 to 10-15); `pikes` downtown Colorado Springs, Pikes Peak; `skyline` Denver skyline at dusk | `src/components/services/Opening.tsx` (`PHOTOS`) | n/a, the opening is the top of the page |
| Services, four stages head (desktop) | `/services?stagehead=` | `head` (chosen, owner 2026-10-16): the site's section head, headline in 7 columns, lead in the last 5 at its foot | `current` headline across, lead under it in 5 columns; `column` the lead from column 5, over the stage bodies; `wide` the lead across about 8 columns. Phones the same in all | `src/components/services/Process.tsx` (`HEADS`) | `.ds-svc-process-head` |
| About, Why Ares exists | `/about?founder=` | `letter` (owner, 2026-10-10) | `note` | `src/components/about/Founder.tsx` | `.ds-founder` |

## Whole-page previews

| Route | What | Kept as | Notes |
|---|---|---|---|
| `/home-next` | Resend-style Home (black, dark frosted glass, seven beats) | tag `home-resend-option`; `src/pages/HomeNext.tsx`, `src/home-next.css` | `noindex`, not in the sitemap. The Dossier Home stays the default. |

## Tags of replaced sections

- `services-program-option`: the Services section "A security program, not a headcount." (three
  parts, the relief roster row, the systems tags) and the four stages' earlier copy, before the
  parts folded into the stages and the roster and systems became their own sections (owner,
  2026-10-15).
- `services-open-roles-option`: Services openings with the six services in the opening.

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
