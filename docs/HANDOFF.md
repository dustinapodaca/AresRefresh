# Handoff: Ares site redesign ("The Dossier")

Last updated: 2026-10-09. **Read this first when starting a new chat.**

## TL;DR

- **Repo:** `/Users/dustinapodaca/Code/git/AresClaude/ares-security/project/react`
  (origin `github.com/dustinapodaca/AresRefresh`). Open Claude Code **on this folder**, or
  the project skills (Impeccable, Emil) and the Playwright MCP won't load.
- **One working branch from 2026-10-09: `test/marketing-gaps`** (owner: "we are going to
  use the test tree with the extra pages from now on"). It holds the redesign plus the
  marketing-gap pages from the CenCore review (32 pages): role pages, industry pages,
  Insights, jobs by city, the richer quote form. Commit there directly; no more merging
  from `redesign-b-fresh` (frozen at 61a8c50, still pushed) and no worktree needed.
  Live site branches (`main`, `seo`, `edit`) are untouched.
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

## Images and performance (2026-10-09)

- **Originals** live in `assets/images-src/` (not deployed). **Never** point code at a
  file in `public/images/` directly.
- **Pipeline:** `python3 -I assets/tools/optimize-images.py` encodes WebP at 480 to 2400px
  (never above the source; quality 80 to 84, six lower at 2000px and up; logos as one
  128px-tall WebP) into `public/images/opt/` and writes `src/lib/images.generated.ts`.
- **Components** use `<img {...responsive('/images/<old path>', sizes?)} />` from
  `src/lib/responsive.ts`; the old paths are manifest keys. Full-bleed heroes carry measured
  `sizes` there (they draw up to 3.7x the screen width on phones). `<Seo>` preloads the
  same responsive hero (`preloadImage` in routes.json is a manifest key).
- **To add an image:** put the original in `assets/images-src/`, add an entry to the
  script, run it, use `responsive()`.
- **Caching and page changes** (2026-10-09): generated images carry a content hash in their
  names (`hero6-1600.<hash>.webp`), and `public/_headers` caches `/assets/*`,
  `/images/opt/*`, and `/fonts/*` for a year (`immutable`); Netlify's default
  (max-age=0, must-revalidate) made every page change re-check its hero. Heroes use
  `decoding="sync"` so a cached hero paints with the page. `src/lib/prefetchHeroes.ts`
  starts a page's hero (its routes.json `preloadImage`) on hover, focus, or touch of a link
  to it. Replacing a font: give the file a new name.
- **Fonts** are self-hosted (`src/fonts.css`, `public/fonts/`, Latin subsets; Inter and
  Inter Tight preloaded in `index.html`). No Google Fonts request.
- `assets/images-unused/` holds images nothing references (old heroes, client logos).
- **`public/llms.txt`** (2026-10-09): a Markdown summary for AI assistants (llmstxt.org
  format): who Ares is, the verified facts and identifiers, and links to every public page
  on aressecurity.co. **Keep it in sync** when facts, pages, or the SAM date change. Avoid
  claims the owner has ruled out (growth paths, response times, "cleared", "veteran-led").
- **AI agent catalog** (2026-10-09): `public/.well-known/ard.json` (Agentic Resource
  Discovery spec, agenticresourcediscovery.org) and an identical `ai-catalog.json` (the
  predecessor name Lighthouse 13.5 reads), linked from `index.html` with `rel="ard"` and
  `rel="ai-catalog"`. Two entries, each an Agent Skill in Markdown: `public/skills/
  request-a-security-quote/SKILL.md` (how an assistant gathers a site's needs and sends the
  person to the quote form, with `?service=` / `?industry=` prefill slugs from
  `src/pages/Contact.tsx`) and `public/skills/verify-ares-security/SKILL.md` (every
  identifier with its issuing source). Keep both files identical and in sync with facts,
  the form's slugs, and the SAM date. Validate with Lighthouse's `third-party/ard/ard.js`.
  Do **not** add an `Agentmap:` line to robots.txt: Lighthouse's robots audit rejects
  unknown directives and would cost SEO points.
- **Lighthouse (production build, mobile, 2026-10-09):** most pages 93 to 96, Home 83,
  Services 78 (their big crisp heroes on a slow simulated 4G); accessibility, best
  practices, SEO 100. Run it on `npm run build && npx vite preview` (port 4173), never on
  the dev server. The netlify.app preview scores SEO 69 on purpose (its noindex header).

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

## Backlog (decisions and todos, updated 2026-10-09)

### To build when the owner says go
- **Open roles from one source, free** (owner, 2026-10-09). Indeed has no API to read an
  employer's jobs (its Publisher API closed in 2023; every current Indeed API only pushes
  jobs in), and scraping breaks its terms. Plan: the site becomes the source and Indeed and
  Google read from it.
  1. Roles kept in a **Google Sheet** the owner edits (option A; alternatives: a Decap CMS
     page at /admin, or edits by request). The site reads it at build time; add a Netlify
     build hook or a daily scheduled rebuild.
  2. The roles list on /careers and the city job pages, in the site's design.
  3. An **Indeed XML job feed** (free organic listings; Indeed polls every 12 to 48 hours;
     may want 3+ live jobs). Then stop posting these roles directly on Indeed (duplicates).
  4. **JobPosting structured data** for Google Jobs (saved for later, owner 2026-10-09).
  Needs per role: title, city, employment type, pay range (optional), how to apply.
- **Branded quote emails, Phase 2** (parked 2026-10-09): a Netlify Function plus Resend
  from quotes@aressecurity.co, Turnstile, Web3Forms as fallback. Needs the owner's Resend
  account and DNS records. Skip the visitor confirmation email (abuse risk).

### Waiting on the owner or client
- **Careers hero:** the client may pick another of the eight in
  `assets/careers-hero-options/` (photo 7, the Cadet Chapel, is live).
- **Copy review** of the whole site, including the DRAFT Services program copy
  (`src/components/services/Program.tsx`) and the test-branch industry images marked as
  placeholders.
- **SEO pass** (`src/seo/routes.json`, last): `/careers` description says "real growth
  paths" (not true yet); `/contact` says "We respond within one business day" (never state
  response times).
- **Google Business profile link** (the footer's Google link opens a Maps search). Add it
  to the footer and the structured data's sameAs.
- **Capability statement PDF content:** check for "cleared", Buckley, badging.
- **Analytics:** none today (the privacy policy says no trackers). If wanted, a
  privacy-friendly one (Plausible, Netlify Analytics); add its origin to the CSP.
- **Check the nav glass on a real iPhone or Safari** (automated captures skip the blur).

### Launch day (domain cutover)
- Attach aressecurity.co (and www) as the Netlify site's primary domain; wait for SSL; then
  uncomment the cutover block in `public/_redirects`.
- Add aressecurity.co and www to the Web3Forms form's allowed websites, or the form stops.
- Decide when `test/marketing-gaps` merges to `main`.

### After launch
- Verify in Google Search Console and Bing Webmaster Tools; submit the sitemap (Bing also
  feeds ChatGPT search). IndexNow pings run from the Netlify plugin on production deploys.

### Housekeeping
- Rotate the Gemini API key (pasted in chat 2026-10-08; pass it inline only, never commit
  or store it) and the OpenAI key in `~/.claude/settings.json`.
- Performance: render-blocking CSS (about 0.3 to 0.45s on mobile); Home and Services trade
  mobile speed for sharp heroes (smaller hero files would add 10+ points).
- SAM renewal: active through March 26, 2027 (`SAM_ACTIVE_THROUGH`).

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

- **The prerender bakes the DOM as it is after scripts run**, classes on `<html>` included.
  A "JavaScript is on" class set by script ships in the static HTML, so it can't detect
  no-JS. Use a `<noscript><style>` override instead (as the location maps do, 2026-10-09).
- **Security headers** live in `public/_headers` (`/*`): nosniff, referrer policy,
  SAMEORIGIN framing, permissions policy, and a Content-Security-Policy (2026-10-09:
  scripts, images, fonts from the site only; styles allow inline for React style
  attributes; `connect-src` adds `https://api.web3forms.com`). **Adding any third party**
  (analytics, maps, embeds, a new form service) means adding its origin to the CSP, or it
  will be blocked. Test with `.playwright-mcp/csptest.mjs` against a server that sends the
  header. Netlify adds HSTS itself. Keep comments outside the `/*` block.
- **Cross-browser** (2026-10-09): WebKit and Firefox (Playwright) show no overflow, broken
  images, or script errors on any page type. Firefox has no scroll-driven animations, so it
  gets the static fallbacks (by design). Headless and Playwright captures of every engine
  skip the fixed nav's backdrop blur; check the nav glass on a real device.

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
