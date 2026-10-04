# Flow-pass brief (handoff from the 2026-10-04 setup session)

Read this first. Next job: restore **Pass 2** (the Framer DESIGN.md dark version) on
Home, then run an autonomous, flow-focused redesign pass with Impeccable, Emil's
animation skills, and the Playwright MCP.

## Repo and branch

- Repo: AresRefresh, Vite + React 18 + Tailwind v4, at
  `/Users/dustinapodaca/Code/git/AresClaude/ares-security/project/react`.
- Branch: **`home-redesign`** (branched from `seo`).
- Safety snapshot: **`b7d0af5` "pre-impeccable snapshot"** (2026-10-04 17:29). It holds
  every change up to that point. **Home at that commit is Pass 5 (Vercel dark), not Pass 2.**
- Gates after any change: `npm run build` (prerenders 10 pages) and `npm run check:seo`
  must pass. Dev server: `npm run dev` on http://localhost:5173/.

## Where Pass 2 is (important: it is NOT in git history)

The design passes were never committed one by one. `git log --all` has no DESIGN.md, no
design-candidates path, and no per-pass commits; the only redesign commit is `b7d0af5`.
Each pass was archived locally instead, and the Framer DESIGN.md was pasted into chat and
never saved to disk.

| Order | Pass | Saved (local time) | Reference | Location |
|---|---|---|---|---|
| 1 | pass-1 | 2026-10-04 13:54 | Apple/taste light rebuild | `.claude/design-passes/pass-1/` |
| 2 | **pass-2 ← Pass 2** | 2026-10-04 14:27 | **Framer DESIGN.md, dark** | `.claude/design-passes/pass-2/` |
| 3 | pass-3-old | 2026-10-04 14:29 | xAI, rebuilt layout | `.claude/design-passes/pass-3-old/` |
| 4 | pass-3-final | 2026-10-04 14:49 | xAI over the original Home structure | `.claude/design-passes/pass-3-final/` |
| 5 | pass-4 | 2026-10-04 14:52 | own blend (Framer/xAI/Vercel), steel hero | `.claude/design-passes/pass-4/` |
| 6 | pass-4b | 2026-10-04 14:59 | pass-4 with the seo-branch hero6 photo | `.claude/design-passes/pass-4b/` |
| 7 | pass-5 | 2026-10-04 15:11 | Vercel only, dark (the code in b7d0af5) | `.claude/design-passes/pass-5/` |

`.claude/design-passes/` holds copies of each pass's `Home.tsx` plus hero screenshots.
Originals with full screenshot sets live in `.playwright-mcp/<pass>/`, which is
gitignored and exists only on this machine.

Pass 2 identity check: the `Home.tsx` header comment reads "adapted from the Framer
design analysis". Pass 2 screenshots: `.claude/design-passes/pass-2/1440-full.png` and
`390-full.png`.

## Restoring Pass 2 exactly

1. `cp .claude/design-passes/pass-2/Home.tsx src/pages/Home.tsx`
2. In `src/index.css` `@theme`, Pass 2 needs these tokens. Three are missing today and
   three have different values now:

   | Token | Pass 2 value | Now |
   |---|---|---|
   | `--color-canvas` | `#090909` | `#0a0a0a` |
   | `--color-surface-1` | `#141414` | missing |
   | `--color-surface-2` | `#1c1c1c` | missing |
   | `--color-hairline` | `#262626` | `#262626` (same) |
   | `--color-ink-muted` | `#999999` | missing |
   | `--color-signal` | `#0099ff` | `#52a8ff` |

   Pass 2 also used `--color-pale` (exists) and set its mono to IBM Plex Mono.
   `--font-mono` is now Geist Mono, and `index.html` loads Inter, Geist and Geist Mono
   (Plex was dropped). For an exact restore, add `IBM+Plex+Mono:wght@400;500` back to the
   Google Fonts link and point `--font-mono` at it.
3. Hero image: Pass 2 uses `/images/hero-steel-wide.webp` (committed). Set
   `src/seo/routes.json` → `"/"` → `"preloadImage": "/images/hero-steel-wide.webp"`
   (it currently points at `/images/hero6.webp`).
4. Shared chrome is newer than Pass 2. Header and Footer were restyled after Pass 2 (solid
   canvas bar with hairline, sentence-case nav, white pill CTA; footer on canvas with no
   photo and a hairline certifications card, new blurb). Pass 2 screenshots show the older
   header. Those Header/Footer changes were user-approved, so keep them unless told
   otherwise.
5. Pass 2 text also includes the "Contact" and "Services and service areas" sections,
   written before later copy tweaks. The approved copy is listed below.

### Framer spec, condensed (the full DESIGN-framer.md was not saved; ask the user to paste it for full fidelity)

Near-black canvas `#090909`; surfaces `#141414` / `#1c1c1c`; hairline `#262626`; ink white,
muted `#999999` (binary hierarchy); single blue `#0099ff` only for links, focus and
selection. Display type is GT Walsheim Medium (substitute: Inter 600) with hard negative
tracking (≈ -5% at display sizes: 110/85/62px tiers), body is Inter with
`cv01 cv05 cv09 cv11 ss03`, line-height around 1.3. Every CTA is a pill: white primary,
charcoal secondary. Cards are 15–20px radius, gradient "spotlight" cards 30px. One or two
gradient spotlight cards per page maximum; gradients are cards, never section
backgrounds. No light mode.

## Installed this session

- **Impeccable** CLI 4.1.0 (skill v4.5.0, engine v0.1.11), installed with
  `npx impeccable@latest install -y --providers=claude --scope=project`.
  - Skill: `.claude/skills/impeccable/SKILL.md` (+ `reference/`, `scripts/`, a
    darwin-arm64 binary; 16 MB total).
  - Agents: `.claude/agents/impeccable-{asset-producer,documenter,finish-reviewer,manual-edit-applier}.md`.
  - Hooks in `.claude/settings.local.json`: SessionStart, PostToolUse on Edit|Write
    ("Checking UI changes"), and Stop ("Design deep pass", 30s). All run
    `.claude/skills/impeccable/scripts/impeccable hook`.
  - Setup per its SKILL.md: run `.claude/skills/impeccable/scripts/impeccable context`
    once per session. It reads PRODUCT.md and DESIGN.md; **neither exists in this repo
    yet**. `/impeccable init` runs a multi-round discovery interview, so it is
    interactive.
- Already present: `design-taste-frontend`, `emil-design-eng`, `apple-design`,
  `find-animation-opportunities`, `review-animations` (its `disable-model-invocation` was
  set to `false` so Claude can invoke it; a `npx skills` update may revert that).
- Playwright MCP: `claude mcp list` shows `playwright: npx @playwright/mcp@latest -
  Connected`. It can only write files inside the project root, so save screenshots to
  `.playwright-mcp/` (gitignored). Figma plugin MCP needs re-auth; the local Figma MCP is
  connected.

Not committed yet (created after the snapshot): `.claude/skills/impeccable/`,
`.claude/agents/`, `.claude/settings.local.json`, `.claude/design-passes/`, and this file.

## Standing decisions and constraints (from the user)

- **Dark only.** Photos may be full color. No glass on Home.
- Don't touch `scripts/`, `netlify/`, `public/_redirects`, or routing. `src/seo/routes.json`
  edits for the Home `preloadImage` have been allowed.
- Keep every fact exactly: GSA MAS 47QSMS25D009Q (eLibrary link), SIN/NAICS 561612,
  UEI XQXDN6E33SF4, CAGE 9KL18, WOSB250470, WBE2303571, founded 2021 in Colorado Springs,
  719-696-3966, contact@aressecurity.co, Colorado Springs / Denver / Pueblo,
  <1% missed shifts since 2021, on-call scheduling standard in every contract.
- Owner is **minority woman-owned, not a veteran**. Veteran facts: veteran supervisors, a
  veteran NRA firearms instructor, and they like to hire veterans. Never write "veteran-led".
- Testimonial is a placeholder; the approved short form is: "Ares arrived prepared. Their
  documentation was cleaner than the incumbent's from day one." Attribution: Contracting
  Officer, USAF · Buckley Space Force Base.
- **No client logos.** The owner removed the Past Performance logo grid on 2026-09-01
  (commit c7709ca).
- Approved copy: H1 "Security guards for federal and commercial sites."; subtext "A
  minority woman-owned, employee-focused firm serving Colorado Springs, Denver, and Pueblo
  since 2021."; practices "Trained on site by leadership / Planned before the contract /
  Clean documentation / A direct line"; "Now hiring officers" + "Armed, unarmed, cleared,
  and office roles, with paid training and real room to grow. Veterans are encouraged to
  apply."; CTAs "Request a Quote", "Capability Statement", "See Open Roles".
- Wording must be plain and natural, never AI-sounding, with zero em-dashes. Propose copy
  changes as before/after for approval.
- The user wants the taste skill's full pre-flight run and reported every pass, and a
  large hero.
- Motion: subtle, fast, purposeful. Content must never be invisible while scrolling.
  Respect `prefers-reduced-motion`. Run `review-animations` after implementing.
