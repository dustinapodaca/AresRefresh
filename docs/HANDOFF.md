# Handoff: Ares site redesign ("The Dossier")

Last updated: 2026-10-08 (late). **Read this first when starting a new chat.**

## TL;DR

- **Repo:** `/Users/dustinapodaca/Code/git/AresClaude/ares-security/project/react`
  (origin `github.com/dustinapodaca/AresRefresh`). Open Claude Code **on this folder**, or
  the project skills (Impeccable, Emil) and the Playwright MCP won't load.
- **Two working branches, both pushed (2026-10-08):**
  - `redesign-b-fresh`: the redesign (13 prerendered pages). Every change is made here
    first. Tag `home-v11-dossier` moves with every commit (force-pushed).
  - `test/marketing-gaps`: `redesign-b-fresh` plus the marketing-gap pages from the
    CenCore review (32 pages): role pages (`/services/<role>`), industry pages, Insights,
    jobs by city, a richer quote form, the Services browse and program sections, and
    "Report a concern" in the footer's legal links. **After every commit on
    `redesign-b-fresh`, merge it into `test/marketing-gaps`** (`git merge --no-edit
    redesign-b-fresh`) and resolve conflicts keeping the test extras.
  - Live site branches (`main`, `seo`, `edit`) are untouched.
- **The dev server shows `test/marketing-gaps`** (the owner reviews there). Keep the main
  working copy on that branch; see "Working without switching branches" below.
- **Every page is on the Dossier system:** Home, Services, About, Capability Statement,
  Request a Quote, Careers, the three location pages, the 404, and the policies.
- **Next:** the owner's copy review, then the SEO pass (`src/seo/routes.json`) at the end.

## How to resume

1. `git status` (should be clean on `test/marketing-gaps`), `git log --oneline -8`,
   `git worktree list`.
2. `npm run dev`, then open http://localhost:5173/.
3. Before UI work, read `DESIGN.md` (the design authority; loaded via CLAUDE.md) and
   `PRODUCT.md`.
4. After every change:
   - Screenshot at 1440 and 390 (puppeteer scripts in `.playwright-mcp/`, gitignored; see
     "Verification scripts").
   - `npm run build` (13 pages on `redesign-b-fresh`, 32 on the test branch) and
     `npm run check:seo` must pass.
   - Text on photos: measure contrast (scripts below); AA (4.5:1) unless the owner
     overrides (they did for the Services caption: "it's just a subtitle").
   - Update `DESIGN.md` (and `docs/copy-changes.md` for any wording change).
   - Commit on `redesign-b-fresh`, `git tag -f home-v11-dossier`, merge into the test
     branch.
   - **Push only when the owner asks**, with full refspecs:
     - `git push origin refs/heads/redesign-b-fresh:refs/heads/redesign-b-fresh refs/heads/test/marketing-gaps:refs/heads/test/marketing-gaps`
     - `git push -f origin refs/tags/home-v11-dossier`
5. Commit messages end with
   `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`.

## Working without switching branches

Switching the main working copy between branches hot-swaps files under the owner's open
page and breaks things until a hard reload (it brought back the Services hero "jitter"
once). Instead, edit `redesign-b-fresh` in a **separate git worktree**:

```sh
git worktree add ../rbf redesign-b-fresh   # once; any path outside the repo
# edit, commit, tag there; then in the main copy (on test/marketing-gaps):
git merge --no-edit redesign-b-fresh
```

Only the changed files reload. The worktree has no `node_modules`, so build and screenshot
from the main copy after merging. On 2026-10-08 the worktree lived in a temporary session
folder; if `git worktree list` shows a missing path, run `git worktree prune`. While a
worktree holds `redesign-b-fresh`, the main copy cannot check that branch out.

## How a page pass is done (the owner's process)

1. **Content inventory** → `docs/<page>-content.md`.
2. **Mobbin research** (Mobbin MCP): patterns, not copies.
3. **Concept** → `docs/<page>-concepts.md` (name it; say how it differs from siblings).
4. **Build** with the Impeccable and Emil skills, components in `src/components/<page>/`,
   a page block in `src/dossier.css`.
5. **Finish review** with the `impeccable-finish-reviewer` agent, then apply its fixes.
6. **Copy log** in `docs/copy-changes.md`. 7. **DESIGN.md** section, kept in sync.

Each page must feel unique to its content; the owner pushes back on reusing Home devices.

## Working style the owner expects

- Small, fast iterations: one tweak, a check, a commit. Report briefly in plain language.
- Desktop and mobile are separate. Never change one when asked about the other. When an
  ask doesn't say which, make the most literal reading, say which you chose, and expect a
  correction (the owner often adds "on desktop" a moment later).
- The owner often sends follow-ups mid-task; fold them in.
- **Don't overdo fixes.** When asked for something small, do the small thing (2026-10-08:
  a caption got a fade band and layered shadows; the owner wanted just the slight shadow).
- Clean, modern, "Framer / Vercel" feel. Nothing cheesy.
- Copy: plain and natural. No em-dashes. No slogans. Never invent stats, clients, quotes,
  or response times.
- Facts that must stay exact: GSA MAS 47QSMS25D009Q, SIN/NAICS 561612, UEI XQXDN6E33SF4,
  CAGE 9KL18, DUNS 10-244-9635, WOSB250470, WBE2303571, founded 2021 in Colorado Springs,
  719-696-3966, contact@aressecurity.co, careers@aressecurity.co, SAM active through
  March 26, 2027 (`SAM_ACTIVE_THROUGH` in `src/components/capability/data.ts`). City
  licenses: Denver 2021-BFN-0001984, Colorado Springs 0850744L, Pueblo 26422.
- **Owner facts:**
  - Minority woman-owned. The owner is NOT a veteran: never "veteran-led". Veteran
    supervisors, a veteran NRA firearms instructor, veterans encouraged to apply.
  - Ares does not hire for office roles. Career growth paths are not true yet.
  - Licensed and bonded, armed and unarmed, in all three cities; location pages list sites
    Ares is ready to staff, never current clients.
  - No FCL; cannot sponsor clearances. Lead with restricted-area experience on military
    installations (plural, unnamed). Ares does not do badging.
  - Ratings: 4.8/5 on Indeed (employees); clients rate Exceptional on 16 of 18 criteria.
- **Off limits** without the owner's OK: `src/seo/*` (incl. `routes.json`), `scripts/`,
  `netlify/`, `public/_redirects`, routing. `_archive/` is never a design reference.

## State of each area (2026-10-08; DESIGN.md has the full spec)

- **Nav:** 84px desktop / 68px phones (was 92 / 76); mark 46px / 38px; glass as dark as
  the Home hero strip (canvas 72% to 48% left to right over a 24px blur); desktop links
  sit 2px above center. Frosts on first scroll everywhere.
- **Footer:** the 2026-10-06 footer, restored after trying Ada's and Pally's (both in git
  history): lockup and company line, phone, email, profiles; Company / Service areas /
  Contracting / Registration (green SAM light); cert marks; then the giant ARES letters
  (white warming to amber) over the rust aurora, sinking into the dark glass legal band.
  A black-to-rust letter version was tried and dropped. Test branch: Insights under
  Company, "Report a concern" in the legal links, no Services column.
- **Home:** hero is the copper tower `hero6.jpg` with a soft vignette and a glass strip
  that rises faster than the page (40svh); 01 Record has black frosted proof cards; on
  phones the four cards (quote included) are one height, stack 16px apart, hold, then
  leave as one pile.
- **Services:** opening photo is the Denver sunset (mirrored above so the glass frosts to
  the top), a tad brighter (brightness 0.78, contrast 1.12). On scroll only the glass
  slides up first (a compositor "hold" of `--svc-cap`), then the page scrolls. The caption
  "Downtown Denver, Colorado" sits just under the glass's edge on the right and rides up
  with it (slight dark shadow only). View-timeline ranges on the page are offset by
  `--svc-cap`, and the dock hides when the footer's first line of text appears.
- **Capability Statement:** hero is the generated copper fins (`capability-hero/cs-fins.webp`,
  from the Services option `s4-fins`), shown whole (no crop) on wide screens, never shorter
  than the window less 96px; the photo 24px higher and the copy, glass, and codes 40px
  higher on desktop; the facts' glass tint 10%; phones get a taller frame (photo at 60%,
  an evenly eased left shade, lead in #c4c8ce). Other options are saved in
  `assets/generated/capability/` (round 1: dossier, facade, perimeter, sheets; round 2:
  spec, folio, access, vellum); masters in `.impeccable/gen/capability/`.
- **Location pages:** the map's I-25 draw and ring pulse wait until the map is in view
  (an inline script in `index.html` adds `html.js`; without JS it plays on load). On
  phones "Verify" / "Request a copy" sits on the license number's line. Office note:
  "Headquarters" then the distance. Denver map: "DEN AIRPORT" on one line, lifted off the
  city name.

## Waiting on the owner

- **SEO pass last** (`routes.json`): stale preloads for `/contact` (`contact-hero.jpg`)
  and `/services`; `/careers` says "real growth paths"; `/contact` says "We respond within
  one business day" (never state response times).
- The owner's own copy review of the whole site.
- Google Business profile link (the footer's Google link opens a Maps search).
- Capability statement PDF: check for "cleared", Buckley, badging; file-size shrink.
- Whether the test-branch pages go to the redesign (and later to `main`).
- The Gemini API key was pasted in chat on 2026-10-08: suggest rotating it. Pass it inline
  only (`GEMINI_API_KEY='…' python3 -I assets/generated/gemini-image.py …`); never commit
  or store it.

## Files that matter

- `DESIGN.md` (design system and every owner decision), `PRODUCT.md`, `CLAUDE.md`.
- `docs/copy-changes.md`, `docs/<page>-content.md`, `docs/<page>-concepts.md`,
  `docs/market-concepts.md` (test-branch pages).
- `src/dossier.css`: all Dossier styles (tokens `--ds-*`, `--ds-header` drives every
  offset under the nav).
- Components: `src/components/Header.tsx`, `Footer.tsx`, `home/DocRail.tsx` (all rails and
  the dock), `services/Opening.tsx` (the hold), `capability/Hero.tsx`,
  `locations/LocationMap.tsx`, `home/Record.tsx`.
- `assets/generated/README.md`: the generated-image catalog (prompts, which is live).
- Local review pages (gitignored): `.playwright-mcp/gallery/*.html` (hero options, nav
  before and after).

## Verification scripts (`.playwright-mcp/`, gitignored; dev server on 5173)

- `shot.mjs <path> <tag> <selector> <widths>`: element screenshots.
- `csc.mjs`, `csc-m.mjs`, `csfacts.mjs`: Capability hero and facts contrast (text made
  transparent, brightest pixel behind it).
- `svccapg.mjs`: contrast only within 2px of the letters (fairer for small captions).
- `svcanim.mjs`, `svcdock.mjs`: Services bar timing and dock hide point.
- `jitter.mjs`: frame-by-frame photo stability (`HEADFUL=1` for a real Chrome window).
- `navshot.mjs`: nav before/after crops, run headful.
- `locmap.mjs`: location map waits for view.

## Gotchas learned

- Sticky and view timelines need `overflow: clip`, never `hidden`, on ancestors.
- **View timelines and parent boxes ignore transforms.** The Services hold translates the
  page, so `view()` ranges and `.ds-doc` measurements fire early; offset ranges by
  `--svc-cap` and measure the transformed element itself.
- **Headless screenshots don't draw the nav's backdrop glass**, and `captureBeyondViewport`
  can shift captures; use a headful browser (`headless: false`) for nav shots.
- `sips` crop offsets are unreliable; crop in a browser canvas instead.
- Programmatic `scrollTo` works for scroll state; puppeteer `mouse.wheel` can hang.
- `git checkout --theirs` on `dossier.css` during a merge drops the test branch's own
  styles; rebuild from the test branch's file and swap only the conflicting block.
- `git stash` with a clean tree stashes nothing; to A/B old code, `git checkout <rev> --
  <file>` and restore after.
- A stray `}` in `dossier.css` breaks the whole stylesheet; build after scripted edits.
- React 18: spread `{...{ fetchpriority: 'high' }}`; one `<h1>` per page (`check:seo`).
- Image tools: `cwebp -q 82–92 -m 6 -sharp_yuv`, `dwebp`, `sips`. Image generation:
  Nano Banana 2 by default (`assets/generated/gemini-image.py`); OpenAI only if asked.

## Renewals

- SAM renewal: change `SAM_ACTIVE_THROUGH` in `src/components/capability/data.ts`, then
  rebuild. The footer copyright year is automatic.
