---
name: preship-check
description: Pre-ship check for the Ares site. Builds, runs check:seo, then serves dist/ with Netlify's headers and CSP and opens every route at 1440 and 390 for script errors, CSP violations, broken images, sideways overflow, H1 count, and broken links or #anchors; then checks identifiers, phone, emails, the SAM date, the AI catalogs, and wording the owner ruled out. Use before merging a branch (audit, test/marketing-gaps) toward main, before sending the owner or Deidre a preview, before any push or deploy, on launch day, or when asked "is it ready", "run the checks", "anything broken".
---

# Pre-ship check

One command does the mechanical checks. Run it from the repo root (`project/react`):

```bash
node .claude/skills/preship-check/scripts/preship.mjs              # full: build + everything (~3 min)
node .claude/skills/preship-check/scripts/preship.mjs --no-build   # reuse dist/ (only if nothing changed since the last build)
node .claude/skills/preship-check/scripts/preship.mjs --no-build --pages /,/services --desktop-only   # quick spot check
```

It serves `dist/` itself on :4175 (pretty URLs, `public/_headers` with the CSP, the 301s in
`public/_redirects`, `404.html`), so it never collides with the dev servers on 5173/5174.
Exit code 1 means errors. On 2026-10-11 the `audit` branch passed with 0 errors and 0
warnings across 37 routes; treat any new line as real until shown otherwise.

## Reading the report

**Errors** must be fixed or explained before shipping:

| Area | Usually means | Where to look |
|---|---|---|
| `seo` | `npm run check:seo` failed: duplicate head tags, wrong canonical, a route that did not prerender | its output above the report; `src/seo/routes.json` is off limits without the owner's OK, so report rather than edit |
| `csp` | a new third-party origin (analytics, map, embed, font) | add the origin to the CSP in `public/_headers` only with the owner's OK |
| `errors` | script error, console error, or a same-origin file returning 4xx | the page's component |
| `images` | a broken `<img>` | run the `site-images` skill's audit |
| `overflow` | something wider than the screen, usually at 390 | the listed elements; sticky and scroll-timeline ancestors need `overflow: clip`, never `hidden` |
| `h1` | zero or two `<h1>` on a page | one per page; hero H1s carry no closing period (`heroTitle()`) |
| `links` / `anchors` | a link to a route that does not exist, or to an `#id` the target page lacks | the linking component; same-page `#` links must match a real `id` |
| `facts` | an identifier, phone, or date that differs from the real one, or `ard.json` and `ai-catalog.json` differ | fix the text; the real values are in `DESIGN.md` "Do's" and `docs/HANDOFF.md` |

**Warnings** need a person's read. A redirected link (works, but should point at the new
URL), an email that isn't contact@ or careers@, or wording the owner ruled out: em dashes,
"veteran-led", "cleared" officers, clearance lines outside Careers, AASC, reply or response
times, growth paths, badging, a named installation, the retired "Emergency response" or
"Event security" names. Lines that state a rule ("never state a response time") are skipped
on purpose. If a warning is a legitimate use, say so in the report; don't contort the copy.

## What the script cannot see (do these by hand when they apply)

- **Nav glass on a real iPhone or Safari.** Headless captures skip `backdrop-filter`. Ask
  the owner to check on their phone, or use the Playwright MCP headful.
- **WebKit and Firefox.** Spot-check the changed pages with the Playwright MCP (its WebKit
  and Firefox builds are installed). Firefox has no scroll-driven animations and gets the
  static fallbacks by design.
- **Contrast of text on photos.** Use the measuring scripts in `.playwright-mcp/`
  (`csc.mjs`, `csfacts.mjs`, `svccapg.mjs`; see `docs/HANDOFF.md`). AA 4.5:1 unless the owner
  overrides.
- **Lighthouse**, only when asked: `npm run build && npx vite preview` (4173), never the dev
  server. Baseline 2026-10-09 (mobile): most pages 93 to 96, Home 83, Services 78;
  accessibility, best practices, SEO 100. The netlify.app preview scores SEO 69 on purpose
  (noindex).
- **Option switches** (`?hero=`, `?prime=` ...): the script checks only the defaults. If an
  option is about to become the default, run the `client-options` skill's gallery first.
- **The quote form for real**: `.playwright-mcp/csptest.mjs` fakes Web3Forms; never send a
  real submission without the owner's OK.

## Reporting

Keep it short and in plain language, the way the owner works: PASS or FAIL, the count, then
each real problem as one line with the page and a proposed fix. Don't fix files the handoff
marks off limits (`src/seo/*`, `scripts/`, `netlify/`, `public/_redirects`, routing) without
asking. Never push or deploy as part of this check.

## Launch day additions

From `docs/HANDOFF.md` "Launch day": attach aressecurity.co in Netlify and wait for SSL,
uncomment the cutover block in `public/_redirects`, add aressecurity.co and www to the
Web3Forms allowed sites (or the form stops), then run this check against the live domain's
pages by hand (the script only serves the local build).
