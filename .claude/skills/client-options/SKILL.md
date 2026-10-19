---
name: client-options
description: How the Ares site keeps design and copy alternatives side by side for the owner and the client (Deidre) to compare. Covers URL switches like /?hero=b, /?prime=split, /services?hero=a, whole-page previews like /home-next, the screenshot gallery, switching the default, and retiring the losers. Use when asked for options, variants, alternatives, "try a few versions", "show me A vs B", "let Deidre compare", "make X the default", "she picked B", "remove the other options", or before changing any option's default.
---

# Client options

> **State as of 2026-10-19 (launch): no switches are live.** The owner had every `?…` option
> removed; the alternatives are archived in tag `options-archive-2026-10-19` and
> `docs/options-archive.md`. The pattern below still applies if the owner asks for options again.

The owner often wants several versions of a piece live at once, so they and the client can
compare them on the real site before choosing. This is the pattern already in use. Follow
it so every option is discoverable, the default is always clear, and nothing is lost when
a choice is made.

**The list of what's live: `docs/options-archive.md`.** Read it first and update it with every
change. If the code and the list disagree, the code wins. Fix the list and say so.

## Three kinds of option

1. **A query switch** (most options): one component, a map of versions, and a URL parameter.
   Use it for copy, a section's form, or a hero.
2. **A whole-page preview**: a separate route (`/home-next` -> `src/pages/HomeNext.tsx`,
   its own CSS file), `noindex` in `src/seo/routes.json` (ask before editing) so it stays out
   of the sitemap, plus a git tag (`home-resend-option`) so it survives later cleanups. Use it
   when the alternative changes the layout of the whole page.
3. **A tag only**: when an option is dropped but might come back, tag the commit before
   removing it (`git tag <area>-<name>-option`). Note the tag in `docs/options-archive.md`.

## Adding a query switch

Match the existing ones (`src/components/home/Hero.tsx`, `services/Opening.tsx`,
`home/Industries.tsx`, `about/Founder.tsx`):

```tsx
// <What this is> (<source, e.g. copy audit round 3>, <date>), for the owner to compare at
// /<page>?<param>=<a>|<b>|<c>. <Default> is the default (<who chose it>, <date>).
const OPTIONS = {
  a: { title: '…', lead: '…' },
  b: { title: '…', lead: '…' },
} as const;

const [params] = useSearchParams();
const asked = params.get('<param>');
const opt = OPTIONS[(asked && asked in OPTIONS ? asked : '<default>') as keyof typeof OPTIONS];
```

- **The default is always a real, shippable version.** An unknown or missing value falls
  back to it, so a stray link can't break the page.
- **Parameter names say what they switch**, not "v" or "variant". Option keys are short
  and stable (`a`, `b2`, `split`), because the owner quotes them back ("go with b2").
  Keep `current` for what was live before the round started.
- **The comment above the map names the default, who chose it, and when.** Update it
  whenever the default changes. A stale comment here has misled sessions before.
- The site uses `createRoot`, not hydration, so the prerendered HTML always shows the
  default and the switch applies once the script runs. That's fine for review links; it
  also means search engines only ever see the default.
- One component owns one parameter. If two sections need the same name on one page,
  prefix it (`?svc-hero=`).
- All copy rules still apply to every option: no em dashes, no invented facts, no H1
  period, the owner's fixed order of the six services and six industries.

## The gallery (what the owner looks at)

**One running gallery: `docs/options-gallery.json` -> `.playwright-mcp/gallery/all-options.html`.**
The owner keeps adding to it and shows it to Deidre locally, so every live option belongs
in it (owner, 2026-10-11). The spec is tracked in git; the HTML and screenshots are not.
With the dev server up (`npm run dev`, :5173):

```bash
node .claude/skills/client-options/scripts/options-gallery.mjs docs/options-gallery.json
open .playwright-mcp/gallery/all-options.html
```

Keep the spec in step with `docs/options-archive.md`, in the same commit as the code change:
- **New option or new switch:** add its entry (or a new group) with its copy and a
  one-line note. A whole-page preview is a group with its route as `page` and any unused
  `param` (see the `/home-next` group).
- **Default changes:** move `"tag": "default"` and update the note (who, date).
- **Options removed:** delete their entries. Re-run the script after every change.

The spec format is in the script's header. Each option gets a 1440 and a 390 capture with
reduced motion (scroll effects at rest), its copy, a one-line note on how it differs, and an
"Open live" link. Use `selector` to frame one section (e.g. `.ds-primes-panel`). A selector
that isn't on the page stops the run, so check class names in the component first. Hero
copy in the spec has no closing period, like the page. Older round galleries
(`hero-options.html`, `round3-options.html` ...) stay as the record; don't overwrite them.

## When a choice is made

"Make X the default" or "she picked X":
1. Change the fallback key in the component and update the comment (who, date).
2. Update `DESIGN.md` (the section that describes the piece) and `docs/options-archive.md`.
3. Log any wording change in `docs/copy-changes.md`.
4. **Don't delete the other options** unless asked. The owner has switched back before
   (A, then B, then B2 in one day).
5. Build, screenshot the default at 1440 and 390, and commit (one change, one commit).

"Remove the other options" (only when asked):
1. Tag the commit first if any of them might come back.
2. Delete the losing entries and the switch itself if only one is left. Keep the chosen
   copy where it was.
3. Remove its lines from `docs/options-archive.md`, `DESIGN.md`, and `docs/HANDOFF.md`.
4. Run the `preship-check` skill: removed options often leave dead CSS or an unused image
   (the `site-images` audit finds those).

## Branch and handoff rules

Option work happens on the current working branch (`audit` as of 2026-10-11; check
`docs/HANDOFF.md`). The baseline worktree (`../react-baseline`, :5174) is for comparison
only; never commit there. Commit messages end with the co-author line from the handoff.
Push only when the owner asks.
