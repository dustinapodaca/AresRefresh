# Handoff: Ares Home redesign (v11 "The Dossier")

Last updated: 2026-10-04 (end of day). Read this first when starting a new chat.

## TL;DR

- **Repo:** `/Users/dustinapodaca/Code/git/AresClaude/ares-security/project/react`
  (origin `github.com/dustinapodaca/AresRefresh`). Open Claude Code **on this folder**
  (not on AresClaude/), or the project skills and Playwright MCP won't load.
- **Branch:** `redesign-b-fresh`. HEAD is `724efba`, pushed. Tag `home-v11-dossier` points
  at the same commit (pushed with `--force` because it moves with each refinement).
- **What's done:** a clean-slate Home, plus a restyled Header and Footer (both site-wide),
  built from a new DESIGN.md. The owner has been refining it item by item and is happy with
  the direction.
- **Not done yet:** rolling this style out to the other pages (About, Services, Careers,
  Contact, Capability Statement, the three location pages, 404). They still use the old
  light "Moonstone" styles under the new dark header and footer.
- **Live site branches** (`main`, `seo`, `edit`) are untouched.

## How to resume

1. `git status` (should be clean, on `redesign-b-fresh`), then `git log --oneline -5`.
2. Start the dev server: `npm run dev`, then open http://localhost:5173/.
3. Before changing UI, read `DESIGN.md` (the design authority, loaded via CLAUDE.md) and
   `PRODUCT.md`.
4. After every change:
   - Take screenshots at 1440 and 390 (script below).
   - `npm run build` (10 pages prerender) and `npm run check:seo` must pass.
   - Commit, then move the tag with `git tag -f home-v11-dossier`.
   - Push only when the owner asks. Use full refspecs:
     - `git push origin refs/heads/redesign-b-fresh:refs/heads/redesign-b-fresh`
     - `git push --force origin refs/tags/home-v11-dossier:refs/tags/home-v11-dossier`
5. Commit messages end with
   `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`.

## Working style the owner expects

- Small, fast iterations. The owner asks for a tweak, you make it, screenshot it, show it,
  and commit each change on its own.
- **Mobile vs desktop matters.** Most recent asks were mobile-only. Never change desktop
  when asked about mobile, and the reverse.
- When a request is ambiguous ("centered but right aligned"), make the most literal
  reasonable reading, then say what you did and offer the other reading.
- Plain, natural copy. **No em-dashes.** No slogans. Never invent stats, clients,
  quotes, or response times.
- Facts that must stay exact:
  - GSA MAS 47QSMS25D009Q, SIN/NAICS 561612
  - UEI XQXDN6E33SF4, CAGE 9KL18
  - WOSB250470, WBE2303571
  - Founded 2021 in Colorado Springs
  - 719-696-3966, contact@aressecurity.co
- **Owner facts:**
  - Minority woman-owned. The owner is NOT a veteran: never write "veteran-led".
  - Veteran facts: veteran supervisors, a veteran NRA firearms instructor, and veterans
    encouraged to apply.
  - No client logos. No patrol-vehicle photos on Home.
  - The Buckley testimonial is an approved placeholder. Keep it.
- **Off limits:** `src/seo/*`, `scripts/`, `netlify/`, `public/_redirects`, routing.
- `_archive/` is historical. Never use it as a design reference unless the owner names a
  specific old version (they did for v08's nav and v10's typography; see below).

## Version map (all tags pushed)

| Tag / branch | What |
|---|---|
| `home-v00-original` | Original Home (seo cd45a18) |
| `home-v05` … `home-v10` | Earlier passes (v08 = Option A, also branch `redesign-a-framer`; v09/v10 rejected Mobbin passes) |
| `home-v11-dossier` / `redesign-b-fresh` | **Current work** |

README.md has a "Home redesign versions" table, and `_archive/design-passes/VERSIONS.md`
has the details.

## Files that matter

- `DESIGN.md`: the design system (Impeccable format with YAML frontmatter). It is kept in
  sync with every change, so update it when you change a rule.
- `PRODUCT.md`: product truth (users, positioning, facts).
- `CLAUDE.md`: points to `@DESIGN.md`, and says `_archive/` is not a design reference.
- `docs/home-content.md`: content inventory, the only content source for Home.
- `docs/inspiration.md`: the Mobbin board (15 references from round 1, 4 from the round 2
  mobile pass).
- `docs/concepts.md`: Concept A "The Dossier" (picked) vs Concept B "Field Log".
- `docs/copy-changes.md`: a log of every copy change. Add to it when copy changes.
- `src/dossier.css`: **all styles for the new system** (tokens as `--ds-*`, header,
  footer, Home sections, and scroll-driven motion). It is imported by `src/index.css`.
  Legacy Moonstone styles in index.css still serve the other pages.
- `src/index.css`: also has `@theme` tokens (`--color-canvas`, `--font-display`, and so
  on) for Tailwind utilities.
- `index.html`: Google Fonts: Inter (300 to 800), Inter Tight (500, 600), IBM Plex Mono
  (400, 500).
- `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/Arrow.tsx`
  (authored SVG arrows, internal and external).
- `src/components/home/` (Home sections):

  | File | What it holds |
  |---|---|
  | `Hero.tsx` | Hero |
  | `CredentialStrip.tsx` | Scrolling cert-logo strip, phones only |
  | `DocRail.tsx` | 01 to 05 rail on desktop, plus the mobile running head; the active-section hook |
  | `Verify.tsx` | Key row, folding ledger, "<1%" figure, quote |
  | `Staffing.tsx` | Pinned photo and steps on desktop, swipe row on mobile |
  | `Coverage.tsx` | Heading, cities, divisions, full-bleed photo |
  | `CoverageMap.tsx` | Authored SVG map of Colorado |
  | `Careers.tsx` | Careers section |
  | `Contact.tsx` | Contact section |
  | `links.ts` | GSA eLibrary and SAM.gov URLs |
  | `useMediaQuery.ts` | Starts at a fallback so hydration matches, then corrects after mount |

- `src/pages/Home.tsx`: assembles the sections.

## Current design (as built)

**Colors:**

| Token | Value | Use |
|---|---|---|
| Canvas | `#0a0b0d` | Page background |
| fg | `#eef0f2` | Primary text |
| fg-muted | `#9aa0a8` | Secondary text |
| fg-faint | `#7d838c` | Faint text (min 12px) |
| rule | `#1d2025` | Hairlines |
| rule-strong | `#2c3037` | Stronger hairlines |
| rust / rust-deep | `#bc6f40` / `#8b4920` | Light only: Contact glow, active rail tick, focus rings, HQ dot on the map |

No link blue.

**Type (adopted from v10 at the owner's request):**

| Role | Spec |
|---|---|
| Display | Inter Tight 600 with very tight tracking |
| display-xl | `clamp(44px, 6vw, 88px)`, -0.05em. Hero h1 and the Contact h2 (reduced on desktop at owner request) |
| display-lg | `clamp(34px, 4.2vw, 60px)`, -0.04em. Verify, Staffing and Careers h2s |
| display-md | `clamp(26px, 2.6vw, 38px)`, weight 500. The "Where we work." h2 and the quote size |
| City names | `clamp(36px, 6vw, 88px)`, -0.05em |
| Text | Inter with `cv01 cv05 cv09 cv11 ss03`: lead 18px, body 16px, steps 17px, sub-heads 22 to 28px / 600 |
| Data | IBM Plex Mono 400, tabular. "<1%" is `clamp(96px, 11vw, 160px)` on desktop, **22vw on phones**. Rail marks 14px. Footer column titles are mono uppercase 12px |

**Buttons:** rectangles with 2px corners on the page. The white **pill** is used only in
the nav and mobile menu (from v08).

**Header (v08-style):**
- Transparent at the top; the hero photo runs up behind it.
- On scroll, a **frosted black glass** bar fades in: `rgb(10 11 13 / .55)` plus
  `blur(20px) saturate(150%)`, with a white/8% hairline.
- It goes solid when the mobile menu is open.
- Heights: 92px desktop, 76px mobile (`--ds-header`).
- Logo mark only: 52px desktop, 44px mobile.
- Desktop: links centered (Home, About, Services, Careers, Capability Statement; 14px
  white, with an underline that draws in), and the white pill "Request a Quote" on the
  right.
- Mobile: a three-line icon that turns into an X, and a solid sheet with 20px links,
  phone, email, and the pill.

**Mobile running head** (under the header, phones and tablets): flat black (owner asked
that it NOT be glass). It shows the current section and "0N / 05", with a scroll progress
line.

**Footer:**
- Columns: brand plus one sentence, Company (About Us, Services, Careers), Service areas,
  Contracting (mono GSA link), Contact (mono).
- Cert marks in a row with thin vertical lines between them. On mobile they form a
  centered 2x2 with a hairline cross. The WBENC mark is slightly larger and brighter.
- Then the legal line.
- The big "Get to know Ares" index was removed by the owner.
- `/services` and `/careers` get extra top padding (`data-extended`) because those pages
  dock a card into the footer.

**Home, top to bottom:**
1. **Hero:**
   - The h1 "Security guards for federal and commercial sites." is two lines on desktop
     over the faded left edge of the copper-glass tower photo (`hero6.jpg`, masked into the
     canvas, with a slight parallax).
   - Lead copy, the "Request a quote" button, and "Call 719-696-3966".
   - The GSA Contract Holder logo plus the contract number linking to eLibrary. On mobile
     this pair is **centered** with its text left-aligned.
2. **Credential strip** (phones only, hidden from 768px): the four cert logos only,
   scrolling slowly (60s loop), with wide gaps.
3. **01 Verify:**
   - Headline and intro, then a key row of four mono identifiers.
   - A grouped ledger (Contract vehicle / Registration / Certification). Each row has its
     verify link (GSA eLibrary, "Search on SAM.gov", which points at the sam.gov homepage
     because there is no stable deep link). On phones the groups **fold** behind tappable
     rows with an entry count and a chevron.
   - Then "Download the capability statement".
   - The "<1%" figure, top-aligned with "Missed shifts since 2021." and its note.
   - The Buckley quote (Inter 500). On mobile it's right-aligned, flush right, at 95% width.
4. **02 Staffing:**
   - Desktop: the officer photo is pinned while four steps scroll past (steps brighten
     from 0.8 to 1 opacity).
   - Mobile (below 1024px): a **swipe row** with big mono 01 to 04 numerals and a progress
     bar that fills as you swipe.
5. **03 Coverage:**
   - "Where we work." plus a lead line, and the **Colorado map** (authored SVG to scale,
     with cities on I-25 and Colorado Springs as HQ in rust with a pulse ring; I-25 draws
     in as you scroll). The map sits beside the heading on desktop and below it on mobile.
   - Three huge city rows linking to the location pages.
   - Six service divisions in **two columns at every width** (15px on phones;
     "High‑Traffic" uses a non-breaking hyphen).
   - A hand-off line, then a full-bleed photo (`about-security.jpg`, crossing into
     Careers). On mobile its object-position is 59% 35%.
6. **04 Careers:** headline, a paragraph with the exact veteran facts, a "See open roles"
   link, and a hand-off line.
7. **05 Contact:**
   - The headline "Request a quote, or call us." at display-xl.
   - The phone in mono (30px, 44px from 640px), and Email / Based in pairs.
   - The button plus a capability statement link, over a soft rust glow.
8. **Rail (desktop, 1200px and up):** a sticky right column with 01 Verify to 05 Contact
   (14px mono), an active rust tick, and a scroll-fill track.

**Motion** (all CSS; scroll-driven effects sit in `@supports (animation-timeline: view())`):
- Scroll-driven:
  - hero parallax
  - ledger hairlines drawing in
  - the figure settling
  - Staffing steps brightening (desktop)
  - the full-bleed photo scaling in
  - I-25 drawing in
  - the progress bars
- Ambient loops: the credential strip and the HQ ring.
- Feedback: button press, arrow nudge, menu clip reveal.
- Reduced motion turns off everything except the position bars; the strip becomes static
  and swipeable.
- Text never drops below 0.8 opacity.

## Gotchas learned

- Sticky positioning and view timelines need `overflow-x: clip` (not `hidden`) on
  html/body. This is set in `dossier.css` under `@supports`.
- `overflow-hidden` ancestors break sticky; use `overflow: clip`.
- Mobile CSS rules placed before a later base rule with equal specificity lose. That
  happened with `.ds-quote` margins; the fix was raising specificity
  (`.ds-proof-close .ds-quote`).
- React 18 wants a lowercase `fetchpriority` attribute (spread `{...{ fetchpriority: 'high' }}`).
  `inert` is spread the same way.
- Use `useMediaQuery` with a fallback. Hydration does not patch attribute mismatches, so
  the first client render must match the prerender.
- Playwright MCP can only write inside the project or `.playwright-mcp/` (gitignored).
  Vite hot reload can briefly serve stale CSS; re-shoot if a screenshot doesn't reflect an
  edit.
- Exactly one `<h1>` per page (`check:seo` enforces this). Header and footer use no h1.
- The Impeccable detector:
  `.claude/skills/impeccable/scripts/impeccable detect --json src/pages/Home.tsx src/components/home src/components/Header.tsx src/components/Footer.tsx`
  (returns `[]` when clean).

## Screenshot script (lives in gitignored `.playwright-mcp/shoot.js`; recreate if missing)

Run it with the Playwright MCP tool `browser_run_code_unsafe` and `filename: .playwright-mcp/shoot.js`:

```js
async (page) => {
  const dir = '.playwright-mcp/v11';
  const out = [];
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += h * 0.8) { await page.evaluate((yy) => scrollTo(0, yy), y); await page.waitForTimeout(120); }
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(400);
    await page.screenshot({ path: `${dir}/${w}-full.png`, fullPage: true });
    let n = 0;
    for (let y = 0; y < total; y += h) {
      await page.evaluate((yy) => scrollTo(0, yy), y); await page.waitForTimeout(250);
      await page.screenshot({ path: `${dir}/${w}-v${String(n++).padStart(2, '0')}.png` });
    }
    out.push({ w, total, frames: n });
  }
  return out;
}
```

## Open ideas and next steps (none started)

1. **Roll the style out site-wide** (the owner's stated goal: "Home first, then the whole
   site"). Restyle About, Services, Careers, Contact, Capability Statement, the location
   pages, and 404 with the Dossier system. Ask which page goes first.
2. **Careers on mobile** is still mostly text. The idea was a swipeable photo row (we have
   `careers-philosophy.jpg`, `careers-team.jpg`, `careers-hero.jpg`).
3. **Divisions:** optionally make each division a tappable row linking to its spot on
   Services.
4. **The testimonial:** a critique noted that unnamed federal endorsements can be
   discounted (5 CFR 2635.702). A past-performance reference would be stronger when the
   owner has one.
5. **Small known items:**
   - The footer "Accessibility", "Privacy" and "Terms" links are `href="#"`.
   - A copy-to-clipboard on mono identifiers would help buyers.
   - The WBENC logo file is low-res (a sharper asset would fix the muddiness for good).
6. **Older pending items:**
   - `ASSET-OPTIMIZATION.md` is not executed (`public/images` is about 18 MB).
   - The Lighthouse report from an earlier chat was lost; ask the owner to re-paste it.
   - `npm audit` shows 18 vulnerabilities, untouched.
