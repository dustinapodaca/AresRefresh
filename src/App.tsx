import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { attachLiquid, liquidSupported, type LiquidOptions } from './lib/liquidGlass';
import ScrollToTop from './components/ScrollToTop';
import NavPanel from './components/NavPanel';
import Footer from './components/Footer';
import SmoothAnchors from './components/SmoothAnchors';
import Analytics from './components/Analytics';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import CapabilityStatement from './pages/CapabilityStatement';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Accessibility from './pages/Accessibility';
import RolePage from './pages/RolePage';
import IndustryPage from './pages/IndustryPage';
import Insights from './pages/Insights';
import InsightPage from './pages/InsightPage';
import CityJobsPage from './pages/CityJobsPage';
import ColoradoSprings from './pages/locations/ColoradoSprings';
import Denver from './pages/locations/Denver';
import Pueblo from './pages/locations/Pueblo';
import Teaming from './pages/Teaming';
// Executive Protection division mock (2026-10-30): a test page on the local dev server only. Not in
// routes.json, so it is never prerendered or in the sitemap, and the route is left out of builds.
const ExecutiveProtectionNext = import.meta.env.DEV
  ? lazy(() => import('./pages/ExecutiveProtectionNext'))
  : null;

// The card surface (owner, 2026-10-15): liquid glass, the glass cards plus the liquid rim. Sets
// <html data-cards="glass" data-liquid="true">; the styles are in dossier.css ("Glass cards"). The
// earlier ?cards=glass and ?cards=solid switches were removed at launch (owner, 2026-10-19; tag
// options-archive-2026-10-19, docs/options-archive.md).
function useCardStyle() {
  useEffect(() => {
    document.documentElement.dataset.cards = 'glass';
    document.documentElement.dataset.liquid = 'true';
  }, []);
  useLiquidCards(true);
}

// The liquid rim (lib/liquidGlass.ts), in Chromium browsers only, on every glass surface, each at
// the blur of its CSS frost (owner, 2026-10-15). Not the nav (on its thin bar the filter didn't
// take, like any fixed or sticky glass in Chrome; it keeps its CSS frost) and not the prime
// pipeline's cards (solid, owner 2026-10-15).
// Pseudo-element glass takes its filter through --ds-liquid. Finds them on whatever page is
// showing and keeps up as pages change.
const LIQUID: { sel: string; opts?: LiquidOptions; media?: string }[] = [
  // The frost is lighter than the CSS frost these surfaces had (22 to 26px), as on Gladia, or the
  // blur smears the bend away; the dark tints keep the copy readable.
  // About's "What clients told us" cards (owner, 2026-10-18), at 18px.
  // CSS frost below 768px: Android Chrome tiles the filter and drew a seam across the card (owner, 2026-10-19).
  { sel: '.ds-heard-card', opts: { blur: 18, saturate: 1.1 }, media: '(min-width: 768px)' },
  // About's credential card (owner, 2026-10-18); phones keep the CSS frost (the Android seam).
  { sel: '.ds-ab-cred-card', opts: { blur: 12 }, media: '(min-width: 768px)' },
  // Not the Capability cards: they sit on plain black, so a backdrop filter showed nothing and cost
  // a phone dearly (owner, 2026-10-15, after a performance audit).
  // Full-width bands bend and light only the edges that read as glass, never their sides (they sit
  // on the screen's edges) and never an edge that only shows when a phone's address bar slides away
  // (owner, 2026-10-15).
  // More frost on the Services opening and the footer (owner, 2026-10-15; was 10). Not the
  // Capability hero's frost band since 2026-10-22: a full-width liquid filter re-ran on every scroll
  // frame and dropped the top of that page to about 92fps on a 120Hz Mac (owner: not smooth until
  // past Core competencies); its CSS frost holds 120.
  // Not the quote toast: it floats fixed, and the filter doesn't run on fixed or sticky glass.
  // The footer only: a lighter frost along its rim (14px easing into its 18px) so the bend shows
  // a little (owner, 2026-10-15; was 3px).
  { sel: '.ds-ft-glass', opts: { blur: 18, edges: { top: true }, rimBlur: 14 } },
  { sel: '.ds-nf-card', opts: { blur: 10 } },
  // Not the Services card panels (owner, 2026-10-15): the live filter on six panels glitched on fast
  // scrolls; each panel now carries its own blurred copy of its photo (.ds-svc-glass).
  // The Services opening's aperture card (owner, 2026-10-15), at 12px.
  // Not on phones (owner, 2026-10-15): Android Chrome drew a seam down the card where it tiles the
  // filter (a laptop's phone view never shows it); phones keep the CSS frost.
  { sel: '.ds-ap-card', opts: { blur: 12 }, media: '(min-width: 768px)' },
];
function useLiquidCards(on: boolean) {
  useEffect(() => {
    if (!on || !liquidSupported()) return;
    const done = new Map<HTMLElement, () => void>();
    const scan = () => {
      for (const { sel, opts, media } of LIQUID) {
        const fits = !media || window.matchMedia(media).matches;
        document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
          if (fits && !done.has(el)) done.set(el, attachLiquid(el, opts));
          else if (!fits && done.has(el)) {
            done.get(el)!();
            done.delete(el);
          }
        });
      }
      done.forEach((off, el) => {
        if (!el.isConnected) {
          off();
          done.delete(el);
        }
      });
    };
    let t = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(scan, 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    // Surfaces limited to a width come and go as the window crosses it.
    const mqs = LIQUID.filter((l) => l.media).map((l) => window.matchMedia(l.media!));
    mqs.forEach((mq) => mq.addEventListener('change', scan));
    scan();
    return () => {
      mqs.forEach((mq) => mq.removeEventListener('change', scan));
      mo.disconnect();
      window.clearTimeout(t);
      done.forEach((off) => off());
    };
  }, [on]);
}

export default function App() {
  useCardStyle();
  // The panel nav, edge to edge (owner, 2026-10-13); ?nav=float and ?nav=classic to compare.
  return (
    <>
      <ScrollToTop />
      <SmoothAnchors />
      <Analytics />
      <NavPanel />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/capability-statement" element={<CapabilityStatement />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />

        {/* Services by role, industries, insights, and jobs by city (2026-10-08) */}
        <Route path="/services/:slug" element={<RolePage />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        <Route path="/teaming" element={<Teaming />} />
        {ExecutiveProtectionNext && (
          <Route
            path="/executive-protection-next"
            element={
              <Suspense fallback={null}>
                <ExecutiveProtectionNext />
              </Suspense>
            }
          />
        )}
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightPage />} />
        <Route path="/careers/:city" element={<CityJobsPage />} />

        {/* Service areas */}
        <Route path="/locations/colorado-springs" element={<ColoradoSprings />} />
        <Route path="/locations/denver" element={<Denver />} />
        <Route path="/locations/pueblo" element={<Pueblo />} />

        {/* Policies */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/accessibility" element={<Accessibility />} />

        {/* Catch-all: renders the 404 page for any unmatched path. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
