# Ares Security — Vite + React + TypeScript + Tailwind v4

This is the React port of the static `hi-fi/` prototype, structured for a real codebase handoff. It uses **Tailwind CSS v4** (CSS-first config via `@theme`), React Router 6, and the same Moonstone palette + Inter typography as the prototype.

## Stack

- **Vite** — dev server + build
- **React 18** + **TypeScript** — strict mode
- **Tailwind v4** via `@tailwindcss/vite` (no `tailwind.config.js` — theme tokens live in `src/index.css` under `@theme`)
- **React Router 6** — file-based pages mounted in `src/App.tsx`

## Getting started

```bash
cd react
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Project layout

```
react/
├─ index.html                  ← entry, loads /image-slot.js + main.tsx
├─ public/
│  ├─ ares-logo.svg            ← brand mark (masked into the round glyph)
│  └─ image-slot.js            ← <image-slot> web component
├─ src/
│  ├─ main.tsx                 ← React root + <BrowserRouter>
│  ├─ App.tsx                  ← route map + persistent Header/Footer
│  ├─ index.css                ← Tailwind v4 import + @theme tokens + @layer components
│  ├─ types/image-slot.d.ts    ← JSX typing for <image-slot>
│  ├─ components/
│  │  ├─ Brand.tsx             ← circular logo glyph + wordmark
│  │  ├─ Header.tsx            ← sticky nav (Home · About · Capabilities · Careers)
│  │  ├─ Footer.tsx            ← 4-column footer + newsletter
│  │  ├─ ArrowBtn.tsx          ← frosted-glass circular link, supports to/href/onClick
│  │  └─ ImageSlot.tsx         ← React wrapper for the <image-slot> web component
│  └─ pages/
│     ├─ Home.tsx              ← hero, "we are different", woman-owned, services, testimonial
│     ├─ About.tsx             ← mission, differentiation, personnel, image banner
│     ├─ Capabilities.tsx      ← 6-card service matrix, lifecycle flow
│     ├─ Careers.tsx           ← hero w/ Indeed rating, philosophy, benefits, roles, apply CTA
│     └─ Contact.tsx           ← map + form, quick-contact tiles, feature card
```

## Design system reference

All design tokens are defined as Tailwind v4 `@theme` variables in `src/index.css`:

| Token | Value | Notes |
|---|---|---|
| `--color-ink` | `#1F1F1F` | primary dark / headings |
| `--color-ink-2` | `#545353` | body copy |
| `--color-mid` | `#7C7876` | warm gray accent |
| `--color-light` | `#A4A6A8` | secondary text |
| `--color-pale` | `#CBCDD0` | hairlines, hover bg |
| `--color-paper` | `#FAFAF9` | off-white background |
| `--color-paper-2` | `#F2F2F1` | subtle section bg |
| `--color-line` | `#D8D8D6` | fine borders |
| `--font-sans` | `Inter, system-ui, …` | single body+display family |

Tailwind utilities resolve these to classes like `bg-ink`, `text-paper`, `border-line`, `font-sans`, etc.

### Reusable component classes (in `@layer components`)

- **`.container-ares`** — max-w-1320 with horizontal padding
- **`.brackets-title`** — small all-caps section label wrapped in `[...]`
- **`.btn` + `.btn-primary` / `.btn-outline` / `.btn-white` / `.btn-outline-white`** — pill buttons
- **`.arrow-btn` / `.arrow-btn-lg` / `.arrow-btn-on-light`** — frosted-glass circular link (rotates on hover)
- **`.pill-glass` / `.pill-glass-dark` / `.pill-glass-armed`** — translucent tags
- **`.brand-glyph`** — circle with the Ares logo masked in
- **`.service-grid`** — hover-expand flex layout (used on Home service cards)
- **`.reveal` / `.reveal-d1…d4`** — fade-up entry animations with stagger

## Web component (image-slot)

`public/image-slot.js` ships unchanged from the prototype. It registers a custom element that:

- Persists dropped images to `localStorage` keyed by the slot's `id`
- Supports `shape="rect|rounded|circle|pill"` and arbitrary CSS `mask` clip-path
- Survives reload

`src/components/ImageSlot.tsx` is a thin React wrapper that accepts `id`, `placeholder`, `shape`, and `fill` (which sets `data-fill="true"` so the CSS `[data-fill]` rule positions it `absolute inset-0`).

JSX typing for `<image-slot>` lives in `src/types/image-slot.d.ts`.

## Migration notes from the static prototype

| Static file | React equivalent |
|---|---|
| `hi-fi/ares-style.css` | `react/src/index.css` (split into `@theme` tokens + `@layer components` + raw utilities) |
| `hi-fi/index.html` | `react/src/pages/Home.tsx` |
| `hi-fi/about.html` | `react/src/pages/About.tsx` |
| `hi-fi/capabilities.html` | `react/src/pages/Capabilities.tsx` |
| `hi-fi/careers.html` | `react/src/pages/Careers.tsx` |
| `hi-fi/contact.html` | `react/src/pages/Contact.tsx` |
| `hi-fi/ares-tweaks.js` | **not ported** — prototyping-only, removed from the real codebase |

The hero's `data-section` / Tweaks-panel scaffolding is intentionally absent from the React port — those were prototype-only controls. Re-introduce as React state + a dedicated `EditPanel` component if needed.

## Handoff checklist

- [ ] `npm install`
- [ ] Add real photography by either:
  - Replacing each `<ImageSlot id="…" />` with an `<img src="…" />` once final photography lands, OR
  - Letting site owners drag their own files into the slots and persist locally
- [ ] Wire the contact form to a real backend (currently just shows a status message)
- [ ] Replace the Indeed reviews link in `Careers.tsx` if it changes
- [ ] Add SEO meta tags / Open Graph / favicon variants
- [ ] Set up CI: `npm run build` should succeed without TypeScript errors
- [ ] Decide on hosting (Vercel, Netlify, or static export)
