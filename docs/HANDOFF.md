# Handoff: Ares site redesign ("The Dossier")

Last updated: 2026-10-05 (end of day). **Read this first when starting a new chat.**

## TL;DR

- **Repo:** `/Users/dustinapodaca/Code/git/AresClaude/ares-security/project/react`
  (origin `github.com/dustinapodaca/AresRefresh`). Open Claude Code **on this folder**, or
  the project skills (Impeccable, Emil) and the Playwright MCP won't load.
- **Branch:** `redesign-b-fresh`, pushed. Tag `home-v11-dossier` moves with every commit
  (force-pushed). Last pushed UI commit: `f49cfb6`. Netlify builds the branch.
- **Done in the Dossier system:** Home, Services, About, Capability Statement, Request a
  Quote (`/contact`), Careers, the three location pages ("The Local File", 2026-10-06:
  one component in `src/components/locations/`, one record per city in `data.ts`), plus
  the site-wide Header and Footer. Work after 2026-10-05 is committed locally, not pushed.
- **All pages are on the Dossier system** (the 404, "The Search Light", 2026-10-06, was the
  last). Next: the owner's copy review, then the SEO pass (routes.json) at the end.
- **Live site branches** (`main`, `seo`, `edit`) are untouched.

## How to resume

1. `git status` (should be clean on `redesign-b-fresh`), then `git log --oneline -8`.
2. `npm run dev`, then open http://localhost:5173/.
3. Before UI work, read `DESIGN.md` (the design authority; loaded via CLAUDE.md) and
   `PRODUCT.md` (product truth).
4. After every change:
   - Screenshot at 1440 and 390 (Playwright MCP `browser_run_code_unsafe`; save under
     `.playwright-mcp/`, which is gitignored). For full-page shots, scroll through first so
     lazy images load (see the script at the bottom).
   - `npm run build` (prerenders 10 pages) and `npm run check:seo` must pass.
   - Impeccable detector on the files you touched:
     `.claude/skills/impeccable/scripts/impeccable detect --json <paths>` (returns `[]`).
   - Commit, then `git tag -f home-v11-dossier`.
   - **Push only when the owner asks**, with full refspecs:
     - `git push origin refs/heads/redesign-b-fresh:refs/heads/redesign-b-fresh`
     - `git push --force origin refs/tags/home-v11-dossier:refs/tags/home-v11-dossier`
5. Commit messages end with
   `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`.

## How a page pass is done (the owner's process; repeat for the next page)

1. **Content inventory** → `docs/<page>-content.md` (every item on the old page and where
   it goes; all content carries over unless the owner says otherwise).
2. **Mobbin research** (the Mobbin MCP): look for patterns, not copies.
3. **Concept** → `docs/<page>-concepts.md` (name it; say how it differs from sibling pages).
4. **Build** with the Impeccable and Emil skills, using components in
   `src/components/<page>/` and a page block in `src/dossier.css`.
5. **Finish review** with the `impeccable-finish-reviewer` agent; give it valid full-page
   screenshots (lazy images loaded), then apply its material fixes.
6. **Copy log**: add every wording change to `docs/copy-changes.md`.
7. **DESIGN.md**: add a section for the page and keep it in sync with later tweaks.

Each page must feel **unique** to its content. The owner pushes back on reusing a Home
device (a big figure, photo after photo, the same close). Each redesigned page also has
its own desktop section navigator (see "Rails" below).

## Working style the owner expects

- Small, fast iterations: one tweak, a screenshot, a commit. Report briefly in plain
  language.
- Desktop and mobile are separate. Never change one when asked about the other.
- Ambiguous ask: make the most literal reasonable reading, then say what you did.
- Clean, modern, "Framer / Vercel" feel. **Nothing cheesy** (the owner rejected a giant
  hover wordmark in the footer, and large initials spelling ALERT down a list).
- Copy: plain and natural. **No em-dashes.** No slogans. Never invent stats, clients,
  quotes, or response times.
- Facts that must stay exact: GSA MAS 47QSMS25D009Q, SIN/NAICS 561612, UEI XQXDN6E33SF4,
  CAGE 9KL18, DUNS 10-244-9635, WOSB250470, WBE2303571, founded 2021 in Colorado Springs,
  719-696-3966, contact@aressecurity.co, careers@aressecurity.co, SAM active through
  March 26, 2027. Licenses: Denver 2021-BFN-0001984, Colorado Springs 0850744L, Pueblo
  26422 (all "certified training provider").
- **Owner facts (2026-10-05):**
  - Minority woman-owned. The owner is NOT a veteran: never write "veteran-led". Veteran
    facts: veteran supervisors, a veteran NRA firearms instructor, veterans encouraged to
    apply.
  - **Ares does not hire for office roles.**
  - **Licensed and bonded** (2026-10-06): Ares is an armed and unarmed security provider
    and an armed and unarmed training provider in all three cities (Colorado Springs,
    Denver, Pueblo). No Colorado Springs sites yet: location pages list sites we are
    ready to staff, never current clients.
  - **No FCL yet** (2026-10-06): Ares cannot sponsor clearances. Keep copy general (no
    "cleared officers/roles", no "clearance-eligible"). Lead with the restricted-area work
    (the RA on Buckley SFB, unnamed on the site), said succinctly for clients: access
    control alongside base security forces, on an SOP Ares wrote. Background duties (worker
    and vehicle checks in and out, escort, monitoring) are context, not a list to print.
  - **Ares does not do badging** (2026-10-06). Restricted-area experience is stated
    without naming the base ("federal facilities").
  - **"Growth beyond the post" / career growth paths are not true yet.** Don't claim them.
    ("As the company grows, we want our people to grow with it." is the approved aim.)
  - Ratings: 4.8/5 on Indeed from employees; clients rate Exceptional on 16 of 18 criteria.
- **Off limits** without the owner's OK: `src/seo/*` (incl. `routes.json`), `scripts/`,
  `netlify/`, `public/_redirects`, routing.
- `_archive/` is historical; never use it as a design reference.

## Waiting on the owner

- **SEO and final copy come last** (2026-10-06): `src/seo/routes.json` (off limits) is
  refined once everything else is done, so it fits the final content. The owner of Ares
  (she) will also go through the site and give her own copy changes before then. Known
  items for that pass: `/careers` says "real growth paths" (not true yet); `/contact`
  says "We respond within one business day" (never state response times); Services and
  Capability `preloadImage` lines point at old hero images.
- **SAM.gov date** in the footer (Through March 26, 2027) is fixed text. Proposed: fetch
  it at build time from the SAM.gov Entity API (needs a free SAM.gov API key as a Netlify
  env var, and a touch to `scripts/`, which needs a yes), falling back to the fixed date.
- **Google Business profile link** for the footer (the Google link opens a Maps search
  for now).
- **Capability statement PDF:** check it for "cleared", Buckley, and badging.
- Draft copy still to review (in `docs/copy-changes.md`): the included-service lines on
  the Services and Capability cards.
- Unused files that could be deleted if the owner agrees: `public/images/careers-apply.jpg`
  (stock) and old hero options.

Resolved 2026-10-06: Indeed rating now "employees" everywhere; "questionnaires on
request" removed; the round + / x discs replaced by corner ticks; `ares-text-pyramid.svg`
deleted; "DoW-vetted" removed (Capability proof says "Veteran staff"; Services says
"with veterans on our staff").

## Files that matter

- `DESIGN.md`: the design system and the record of every owner decision. Update it when a
  rule changes.
- `PRODUCT.md`: product truth. `CLAUDE.md` points at DESIGN.md.
- `docs/copy-changes.md`: every copy change, by page.
- `docs/<page>-content.md` and `docs/<page>-concepts.md` for services, about, capability,
  contact, careers. Home's are `docs/home-content.md`, `docs/inspiration.md`,
  `docs/concepts.md`.
- `src/dossier.css`: **all Dossier styles** (tokens `--ds-*`; blocks HEADER, FOOTER, HOME,
  SERVICES, ABOUT, CAPABILITY STATEMENT, REQUEST A QUOTE, CAREERS; then the scroll-driven
  motion block and the reduced-motion block at the end).
- Components:
  - `src/components/Header.tsx`, `Footer.tsx`, `Arrow.tsx`, `glideUnderHeads.ts` (shared
    "scroll an opened card to just under the nav and running head").
  - `src/components/home/` (incl. `DocRail.tsx`, the rails, and `CoverageMap.tsx`, reused on
    the quote page).
  - `src/components/services/`, `about/`, `capability/`, `careers/` (each with `data.ts`).
  - `src/pages/Contact.tsx` holds the whole quote page (Web3Forms submit logic inside).

## Current design highlights (see DESIGN.md for the full spec)

- **Canvas** `#0a0b0d`, ink `#eef0f2`, muted `#9aa0a8`, faint `#7d838c`, hairlines
  `#1d2025` / `#2c3037`, rust `#bc6f40` as light only. Status lights: green `#7cb85f`,
  amber `#f2b84b` (Capability Statement, quote form, footer SAM status).
- **Type:** Inter Tight (display), Inter (text), IBM Plex Mono (data only).
- **Corners:** buttons 2px (including the nav "Request a Quote", the pill is retired);
  photos and cards 4px.
- **Header:** transparent at the top, frosted black glass after scrolling (the only
  glass); nav links 15px on desktop.
- **Footer (redesigned 2026-10-05):** the Ares lockup (mark, 60px rule, ARES / SECURITY
  text logo) with the company line large; "Have a site to cover?" + Request a quote +
  phone and email; then Company / Service areas / Contracting (GSA, UEI, CAGE) /
  Registration (green "Active on SAM.gov" light + Verify); cert marks; legal row. Phones:
  an even 2x2 of columns.
- **Rails (desktop section navigators), one form per page** via `DocRail variant=`:
  Home `rail` (track + rust tick), Services `dock` (bottom-center bar, sections 1 to 3,
  hides at the close; Services drops the side column so sections are centered), About
  `counter` (big rolling number), Capability `ticks` (Linear-style dashes), Careers `list`
  (names with a moving dot). Request a Quote has none (short form page). Phones keep the
  shared running head.
- **Cards that open in place** (Services divisions, Capability competencies): FLIP motion
  that reads each card's real corner radius; the opened card glides to just under the nav
  (and running head) at every width, pixel exact.

## Recent page notes

- **Services:** Government card shows `matrix-government.jpg` closed and the sharper
  `matrix-government.webp` (zoomed out, panned) when opened on desktop.
- **About:** patrol vehicles photo is square, anchored to the bottom, no frame edge around
  its caption. Traits (word over line, no letter column): Approachable, Licensed,
  Experienced, Rooted, Tempered (initials spell ALERT; it reads quietly).
- **Capability Statement:** hero has no credential line and no 3D document; Colorado
  Verified marks have the gold circle cut out with an outer ring closing the C.
- **Request a Quote ("The Intake"):** Denver opening; form in three parts (What needs
  covering? as radio rows of the six divisions + Something else; About the site; How to
  reach you); inline status lights; contact column with phone, "What happens next", and
  the coverage map. On desktop the message box grows so the form ends level with the map.
  Same Web3Forms submit, honeypot, subject rewrite, reply-to.
- **Careers ("The Roster"):** Colorado Springs opening with the Indeed rating; open roles
  as a quiet table (Armed, Unarmed, TS Cleared Escort; each Apply opens an email with the
  role in the subject); "Why people stay" with one sticky photo that switches from the
  team to the officer at the third reason (no pan or zoom; on phones the reasons light in
  the open area below the photo); the resume close.

## Gotchas learned

- Sticky and view timelines need `overflow: clip`, never `hidden`, on ancestors.
- A stray `}` in `dossier.css` breaks the whole stylesheet (Tailwind reports "Missing
  opening {"). After cutting CSS blocks with scripts, run `npm run build` and grep the area.
- Vite hot reload sometimes serves stale CSS to Playwright right after an edit. If a
  screenshot doesn't reflect a change, check computed styles, then re-shoot.
- Full-page screenshots miss lazy images unless you scroll through first.
- React 18: spread `{...{ fetchpriority: 'high' }}`; `inert` the same way.
- Use `useMediaQuery` with a fallback (hydration must match the prerender).
- Exactly one `<h1>` per page (`check:seo` enforces it).
- Logos render as white silhouettes (`filter: grayscale(1) brightness(0) invert(1)`), so
  anything meant to read dark must be cut to transparency (canvas compositing in the
  Playwright page, then `cwebp`).
- Image tools: `cwebp -q 82–92 -m 6` (`-sharp_yuv` for gradients), `sips`. Image
  generation: `impeccable generate-image` with `OPENAI_API_KEY` in `~/.claude/settings.json`
  env (never commit it; suggest the owner rotate it).
- Netlify: `npm run build` installs Puppeteer's Chrome before prerendering.
- `git add` the exact paths you changed; a loose `git rm --cached` once staged an image
  deletion by accident (caught and fixed).

## Screenshot script (full page, lazy images loaded)

```js
async (page) => {
  for (const [w, h, tag] of [[1440, 900, 'desk'], [390, 844, 'phone']]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('http://localhost:5173/careers');
    await page.waitForTimeout(800);
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < total; y += h) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(250); }
    await page.evaluate(async () => { await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `.playwright-mcp/shot/${tag}-full.png`, fullPage: true });
  }
}
```

## Next steps

1. The owner's copy review (she will go through the site), then the SEO pass. Add the
   Denver M/WBE and SBE certifications if the owner confirms them.
2. Resolve the "Waiting on the owner" items above.
3. Older, still pending: `ASSET-OPTIMIZATION.md` not executed (`public/images` is large);
   `npm audit` shows 18 vulnerabilities; footer Privacy / Terms / Accessibility links are
   `href="#"`; the Figma connector needs re-auth (claude.ai connector settings or `/mcp`).
