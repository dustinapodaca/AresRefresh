import { useEffect, useState } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { attachLiquid, liquidSupported, type LiquidOptions } from './lib/liquidGlass';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import NavPanel, { useNavLayout } from './components/NavPanel';
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
import HomeNext from './pages/HomeNext';

// The card surface (owner, 2026-10-15): liquid glass is the default (the glass cards plus the
// liquid rim); plain glass is ?cards=glass and the earlier solid lit-edge cards ?cards=solid. The
// choice sticks for the session, like the nav.
// Sets <html data-cards="glass">; the styles are in dossier.css ("Glass cards").
function useCardStyle() {
  const [params] = useSearchParams();
  const asked = params.get('cards');
  useEffect(() => {
    let form: string | null = asked;
    try {
      if (asked) sessionStorage.setItem('ares-cards', asked);
      else form = sessionStorage.getItem('ares-cards');
    } catch {
      // Storage blocked: the URL alone decides.
    }
    if (form === 'solid') delete document.documentElement.dataset.cards;
    else document.documentElement.dataset.cards = 'glass';
    // Liquid (the default, owner 2026-10-15, after gladia.io): the glass cards plus the liquid rim.
    const liquid = form !== 'solid' && form !== 'glass';
    if (liquid) document.documentElement.dataset.liquid = 'true';
    else delete document.documentElement.dataset.liquid;
    setLiquid(liquid);
  }, [asked]);
  const [liquid, setLiquid] = useState(false);
  useLiquidCards(liquid);
}

// The liquid rim (lib/liquidGlass.ts), in Chromium browsers only, on every glass surface, each at
// the blur of its CSS frost (owner, 2026-10-15). Not the nav (on its thin bar the filter didn't
// take, like any fixed or sticky glass in Chrome; it keeps its CSS frost) and not the prime
// pipeline's cards (solid, owner 2026-10-15).
// Pseudo-element glass takes its filter through --ds-liquid. Finds them on whatever page is
// showing and keeps up as pages change.
const LIQUID: { sel: string; opts?: LiquidOptions; media?: string }[] = [
  // The frost is lighter than the CSS frost these surfaces had (22 to 26px), as on Gladia, or the
  // blur smears the bend away; the dark tints keep the copy readable. The Home Record cards stay a
  // little denser (owner, 2026-10-15: too see-through on phones; the phone pile uses the CSS frost).
  { sel: '.ds-value', opts: { blur: 12 } },
  // Not the Capability cards: they sit on plain black, so a backdrop filter showed nothing and cost
  // a phone dearly (owner, 2026-10-15, after a performance audit).
  // Full-width bands bend and light only the edges that read as glass, never their sides (they sit
  // on the screen's edges) and never an edge that only shows when a phone's address bar slides away
  // (owner, 2026-10-15).
  { sel: '.ds-hero-copy', opts: { pseudo: '::before', blur: 10, edges: { top: true, bottom: true } } },
  // More frost on the Services opening, the footer, and the Capability hero (owner, 2026-10-15; was 10).
  { sel: '.ds-cs-facts', opts: { pseudo: '::before', blur: 18, edges: { top: true } } },
  // Not the quote toast: it floats fixed, and the filter doesn't run on fixed or sticky glass.
  { sel: '.ds-svc-open-glass', opts: { blur: 18, edges: { bottom: true } } },
  // The footer only: a lighter frost along its rim (14px easing into its 18px) so the bend shows
  // a little (owner, 2026-10-15; was 3px).
  { sel: '.ds-ft-glass', opts: { blur: 18, edges: { top: true }, rimBlur: 14 } },
  { sel: '.ds-nf-card', opts: { blur: 10 } },
  { sel: '.ds-svc-card-text', opts: { blur: 10, edges: { top: true } } },
  // The Services opening forms (owner, 2026-10-15, /services?open=): the aperture card (at the Home
  // Record cards' 12px, matching their recipe), the sink
  // band (its top edge only, like the footer), and the lens slab (lighter frost and a wider rim,
  // so the towers bend through).
  // Not on phones (owner, 2026-10-15): Android Chrome drew a seam down the card where it tiles the
  // filter (a laptop's phone view never shows it); phones keep the CSS frost.
  { sel: '.ds-ap-card', opts: { blur: 12 }, media: '(min-width: 768px)' },
  { sel: '.ds-sk-band', opts: { blur: 18, edges: { top: true } } },
  { sel: '.ds-ln-slab', opts: { blur: 7, bezel: 32 } },
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
  const navLayout = useNavLayout();
  return (
    <>
      <ScrollToTop />
      <SmoothAnchors />
      <Analytics />
      {navLayout === 'classic' ? <Header /> : <NavPanel layout={navLayout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Fresh Home pass, a preview beside the current one (owner, 2026-10-10). */}
        <Route path="/home-next" element={<HomeNext />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/capability-statement" element={<CapabilityStatement />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />

        {/* Services by role, industries, insights, and jobs by city (2026-10-08) */}
        <Route path="/services/:slug" element={<RolePage />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        <Route path="/teaming" element={<Teaming />} />
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
