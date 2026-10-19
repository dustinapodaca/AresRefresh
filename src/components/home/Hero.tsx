import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Arrow from '../Arrow';
import { GSA_ELIBRARY } from './links';
import { responsive } from '../../lib/responsive';
import { heroTitle } from '../../lib/heroTitle';
import { terrainMode } from '../../lib/terrainSupport';

// Hero options from the copy audit (round 2, 2026-10-10), for the owner to compare at
// /?hero=current|a|b|b1|b2|b3|b4|c|h1..h10. h1 is the default (owner, 2026-10-19; B2 before it,
// 2026-10-10; A was the audit's recommendation); the losing options and this switch come out when the client picks. No eyebrow above the headline
// (owner); the search phrase is carried by the title and description.
const LEAD = 'From restricted areas and critical sites to offices and campuses: officers trained on your post before the first shift.';
const OPTIONS = {
  current: {
    title: 'Security guards for federal and commercial sites.',
    lead: 'Ares is a minority woman-owned, employee-focused security firm in Colorado Springs, serving Denver and Pueblo. We bridge public-sector compliance and commercial reliability.',
    proof: false,
  },
  a: {
    title: 'Security for sites where every entry counts.',
    // Escorts no longer lead the line, and the sites are named broadly (owner, 2026-10-10:
    // not first, not twice, and not "military construction" up front).
    lead: 'Armed and unarmed officers, access control, and restricted-area escorts along Colorado\u2019s Front Range, for government and critical sites as well as offices, retail, and campuses.',
    proof: true,
  },
  b: {
    title: 'Security guards and escorts for Colorado\u2019s controlled sites.',
    lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.',
    proof: true,
  },
  // Shorter headlines over B's lead (owner, 2026-10-10: B is too long, keep its line).
  b1: { title: 'Security guards for Colorado sites.', lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.', proof: true },
  // The lead says "critical sites", not "data centers" (web audit, owner 2026-10-18: keep public copy broad).
  b2: { title: 'A prepared officer on every post.', lead: 'From restricted areas and critical sites to offices and campuses: officers trained on your post before the first shift.', proof: true },
  b3: { title: 'Armed and unarmed, across Colorado.', lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.', proof: true },
  b4: { title: 'Every entry counts.', lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.', proof: true },
  // Ten new headlines over B2's lead (owner, 2026-10-19: "A prepared officer on every post." moved
  // to the Services opening). /?hero=h1 to h10.
  h1: { title: 'Security officers for Colorado\u2019s Front Range.', lead: LEAD, proof: true },
  h2: { title: 'Officers who know your site before day one.', lead: LEAD, proof: true },
  h3: { title: 'Guard services for federal and commercial sites.', lead: LEAD, proof: true },
  h4: { title: 'Armed and unarmed officers, trained on your post.', lead: LEAD, proof: true },
  h5: { title: 'Security guards in Colorado Springs, Denver, and Pueblo.', lead: LEAD, proof: true },
  h6: { title: 'Minority woman-owned security for Colorado.', lead: LEAD, proof: true },
  h7: { title: 'One standard, from restricted areas to retail floors.', lead: LEAD, proof: true },
  h8: { title: 'Security that answers when you call.', lead: LEAD, proof: true },
  h9: { title: 'Officers your site can count on.', lead: LEAD, proof: true },
  h10: { title: 'Local officers, run by people who answer.', lead: LEAD, proof: true },
  c: {
    title: 'Escorts. Access control. Officers. One standard.',
    lead: 'Every Ares post runs on written post orders, on-site training, and on-call relief, whether it\u2019s a restricted area or a retail floor.',
    proof: true,
  },
} as const;
type OptionKey = keyof typeof OPTIONS;

// The terrain (WebGL2) loads on its own, only on Home and only once the page has mounted, so other
// pages and the first paint don't carry its code (web audit, 2026-10-18).
const Topography = lazy(() => import('./Topography'));

// The terrain's still frames (2026-10-18), captured from the live terrain at 1440 and 390.
const TOPO_STILL = responsive('/images/hero-topo/terrain-desktop.webp');

export default function Hero() {
  const [params] = useSearchParams();
  const asked = params.get('hero');
  // h1 is the default (owner, 2026-10-19: "Security officers for Colorado’s Front Range." over
  // B2's lead; B2's headline moved to the Services opening); the other options stay at /?hero=.
  const hero = OPTIONS[(asked && asked in OPTIONS ? asked : 'h1') as OptionKey];
  const bg = params.get('herobg') === 'photo' ? 'photo' : 'topo';
  // The terrain is drawn in the browser only, after mount, and never for automated browsers:
  // the build's prerender (headless Chrome on Netlify, no GPU) drew it in software and timed out
  // on Home (2026-10-15). The snapshot keeps the empty dark box; the terrain fills it on load.
  // Where it can't run (WebGL2 blocked or missing, a software renderer, no JavaScript, the
  // prerender, reduced motion) a still frame of it shows instead, from the first paint (owner,
  // 2026-10-18: no still-then-terrain swap). <html data-terrain> says which; the inline script in
  // index.html sets it before the first paint, and lib/terrainSupport.ts when Home is reached
  // from another page. If the terrain was expected but draws nothing within a few seconds, the
  // still comes in its place ('fallback'), the only time it fades.
  const [live, setLive] = useState(false);
  const drawn = useRef(false);
  const onDrawn = useCallback(() => {
    drawn.current = true;
  }, []);
  useLayoutEffect(() => {
    const html = document.documentElement;
    if (!html.dataset.terrain) html.dataset.terrain = terrainMode();
  }, []);
  useEffect(() => {
    const html = document.documentElement;
    if (bg !== 'topo' || html.dataset.terrain !== 'live') return;
    setLive(true);
    // Counted only while the tab is showing: a background tab draws nothing yet.
    let left = 4000;
    let started = 0;
    let timer = 0;
    const fail = () => {
      if (drawn.current) return;
      html.dataset.terrain = 'fallback';
      setLive(false);
    };
    const run = () => {
      if (document.hidden || timer) return;
      started = performance.now();
      timer = window.setTimeout(fail, left);
    };
    const pause = () => {
      if (!document.hidden || !timer) return;
      window.clearTimeout(timer);
      timer = 0;
      left -= performance.now() - started;
    };
    const onVisibility = () => (document.hidden ? pause() : run());
    run();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [bg]);
  // Desktop zooms out (owner, 2026-10-15): the component narrows its camera on wide screens, so
  // the land reads magnified there; smaller landforms from 900px. Phones keep the full size.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  // Phones and tablets (owner, 2026-10-16): the terrain reaches down to the end of the lead, just
  // above the quote button (it ended at the headline). How far the copy's top sits above the
  // lead's foot goes in --topo-reach; the CSS grows the box by that and pulls the copy up by the
  // same, so the copy stays put. Without JS the box keeps its old 7rem reach.
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const section = sectionRef.current, copy = copyRef.current, lead = leadRef.current;
    if (!section || !copy || !lead) return;
    const measure = () => {
      const reach = lead.offsetTop + lead.offsetHeight + 16;
      section.style.setProperty('--topo-reach', `${reach}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(copy);
    return () => ro.disconnect();
  }, []);
  return (
    <section ref={sectionRef} className="ds-hero" aria-labelledby="hero-title">
      {/* The background (owner, 2026-10-15): React Bits' Topography, contour lines of a terrain
          in the site's rust drifting under the copy, the cursor lifting the land and a click
          sending a ring out. The copper-glass tower photo (hero6.jpg) moved to the Services
          opening and stays here at /?herobg=photo. Same box as the photo: full bleed from
          900px, running down under 01 Record. */}
      {bg === 'photo' ? (
        <div className="ds-hero-photo" aria-hidden="true">
          <img {...responsive('/images/hero6.jpg')} alt="" decoding="sync" {...{ fetchpriority: 'high' }} />
        </div>
      ) : (
        <div className="ds-hero-photo ds-hero-topo" aria-hidden="true">
          <picture className="ds-hero-topo-still">
            <source media="(min-width: 900px)" srcSet={TOPO_STILL.srcSet} sizes="100vw" width={TOPO_STILL.width} height={TOPO_STILL.height} />
            {/* Lazy: hidden while the terrain runs, so it is only fetched where it shows. */}
            <img {...responsive('/images/hero-topo/terrain-phone.webp', '100vw')} alt="" loading="lazy" decoding="async" />
          </picture>
          {live && <Suspense fallback={null}><Topography
            onReady={onDrawn}
            color="#7a3c17"
            lineCount={22}
            lineWidth={1.2}
            // Elevation 0.5 (owner, 2026-10-15; was 1.15, then 0.65). Desktop's smaller landforms
            // scale the height down with them (0.5 x 0.55), or the hills keep their old steepness.
            // Desktop (owner, 2026-10-15): zoomed out a tad (0.65; was 0.55, then 0.75) with rounder,
            // lower hills (the height scaled with it) and less fine detail, like Colorado's rolling
            // high plains, not busy or pointy.
            elevation={wide ? 0.26 : 0.5}
            scale={wide ? 0.65 : 1}
            detail={wide ? 0.12 : 0.35}
            foreground={0.2}
            tilt={32}
            speed={0.25}
            direction="forward"
            glow={0.6}
            depthOfField={0.4}
            // Less distance fog (owner, 2026-10-15; was 0.35), so the far land reaches up behind the nav.
            fog={0.12}
            hoverEffect="lift"
            clickEffect="pulse"
          /></Suspense>}
        </div>
      )}

      <div className="ds-container">
        <div ref={copyRef} className="ds-hero-copy">
          <h1 id="hero-title" className="ds-display-xl">
            {heroTitle(hero.title)}
          </h1>
          <p ref={leadRef} className="ds-lead">{hero.lead}</p>
          {/* Below 1024px only: from there up the nav carries the quote button. */}
          <div className="ds-actions ds-hero-actions">
            <Link to="/contact" className="ds-btn ds-btn-primary">
              Request a Quote
              <Arrow />
            </Link>
            {/* No call link here (owner, 2026-10-13): the nav's handset and menu carry the phone. */}
          </div>
          {hero.proof ? (
            // The proof row (audit): one line each, every one checkable on the linked page.
            // The escort item came out (owner, 2026-10-10): the lead already names escorts.
            <ul className="ds-hero-proof" aria-label="Proof">
              <li>
                <span>GSA MAS</span>{' '}
                <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-data">
                  47QSMS25D009Q
                  <Arrow external size={12} />
                </a>
              </li>
              {/* Quiet facts, not links; GSA is the only route (copy audit round 3). */}
              <li>Minority woman-owned (WOSB, WBENC)</li>
              <li>Licensed in Colorado Springs, Denver, Pueblo</li>
            </ul>
          ) : (
            <div className="ds-hero-gsa">
              <img {...responsive('/images/gsa-contract-holder.png')} alt="GSA Contract Holder" width={125} height={30} />
              <div>
                <span className="ds-small">GSA Multiple Award Schedule</span>
                <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-link ds-data">
                  47QSMS25D009Q
                  <Arrow external size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
