import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { CAPABILITIES } from '../capability/data';
import { motionAllowed, useScene, SCRUB } from '../home/engine';
import { responsive } from '../../lib/responsive';

// Phones only: the glass Ares mark in the window (WebGL, so it loads on its own and never on desktop).
const SvGlassMark = lazy(() => import('./SvGlassMark'));

// Services hero, second form (owner, 2026-10-23: keep our image, animate it, as impactful on open as
// Home). "The establishing shot": the copper-glass towers (the live Services photo, hero6.jpg) open
// out of a slit of light in the middle of the black, while the camera looks up at them (the photo
// settles from a close, low framing to the full view); the headline rises line by line over it; then
// the six services come in as glass nodes around it, wired to the post. The photo keeps breathing
// (a slow drift) and leans away from the cursor. Scrolling (desktop) closes the aperture: the photo
// draws in to a framed window and the nodes spread out, handing off to "What we staff."
//
// First form (2026-10-22), kept below: "The post canvas", after FLORA's hero: the headline in
// the middle of a dot-grid canvas, with labeled nodes around it joined by wires. Here the nodes are
// the six services, and every wire runs into one node under the headline, your post: whatever the
// site needs is wired to the same post. A rust light runs down each wire into it. On desktop the
// nodes drift a little with the cursor (each at its own depth) and the wires follow; as the hero
// leaves, the nodes spread out and fade. Phones: the headline, then the six as a compact grid,
// no wires. The default (no JavaScript, prerender, reduced motion) is the built, still canvas.


// The six nodes take the reader down to that service's card in "What we staff." on this page
// (owner, 2026-10-23), not to its own page; the card links on to the full page. The page glides
// the "#" link down (SmoothAnchors); on phones, where the cards are a sideways swipe row, the row
// also swipes to the card.
function showPanel(id: string) {
  const panel = document.getElementById(`svc-${id}`);
  const row = panel?.parentElement;
  if (!panel || !row || row.scrollWidth <= row.clientWidth) return;
  const left = row.scrollLeft + panel.getBoundingClientRect().left - row.getBoundingClientRect().left - parseFloat(getComputedStyle(row).paddingLeft);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  row.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
}

// Where each node sits on the desktop canvas (percent of the stage) and how deep it is.
const SPOTS = [
  { x: 4, y: 16, depth: 1 },
  { x: 9, y: 46, depth: 0.55 },
  { x: 3, y: 74, depth: 0.8 },
  { x: 79, y: 14, depth: 0.7 },
  { x: 74, y: 44, depth: 1 },
  { x: 80, y: 73, depth: 0.5 },
];

export default function SvHero() {
  const ref = useRef<HTMLElement>(null);
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setPhone(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // The wires: from the inner edge of each node to the post node, a horizontal-tangent curve.
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>('.sv-hero-stage')!;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.sv-hero-node'));
    const post = root.querySelector<HTMLElement>('.sv-hero-post')!;
    const paths = Array.from(root.querySelectorAll<SVGPathElement>('.sv-hero-wires path[data-w]'));
    const lights = Array.from(root.querySelectorAll<SVGPathElement>('.sv-hero-wires path[data-l]'));
    const wide = window.matchMedia('(min-width: 1024px)');
    let raf = 0;
    const draw = () => {
      raf = 0;
      if (!wide.matches) return;
      const s = stage.getBoundingClientRect();
      const p = post.getBoundingClientRect();
      nodes.forEach((n, i) => {
        // From the middle of each node's foot (owner, 2026-10-23): the wire leaves straight down,
        // then bends into the post's side. A node that sits below the post wires from the middle of
        // its top edge instead, straight up, so the wire never hooks back behind it.
        const r = n.getBoundingClientRect();
        const left = r.left + r.width / 2 < s.left + s.width / 2;
        const x2 = (left ? p.left + 18 : p.right - 18) - s.left;
        const y2 = p.top + p.height / 2 - s.top;
        const below = r.bottom - s.top > y2;
        const x1 = r.left + r.width / 2 - s.left;
        const y1 = (below ? r.top : r.bottom) - s.top;
        const turn = Math.max(48, Math.abs(y2 - y1) * 0.6) * (below ? -1 : 1);
        const k = Math.abs(x2 - x1) * 0.5;
        const d = `M${x1.toFixed(1)} ${y1.toFixed(1)} C${x1.toFixed(1)} ${(y1 + turn).toFixed(1)} ${(x2 + (left ? -k : k)).toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
        paths[i].setAttribute('d', d);
        lights[i].setAttribute('d', d);
        // The length goes straight onto the paths with the shape, in the same frame: through React
        // state it landed a frame late, so a growing wire lost its end and the light skipped while
        // the cursor moved (owner, 2026-10-25).
        const len = paths[i].getTotalLength().toFixed(1);
        paths[i].style.setProperty('--len', len);
        lights[i].style.setProperty('--len', len);
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    draw();
    document.fonts?.ready.then(schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(stage);
    // Through the opener, follow every frame: the post rises 16px into place (1.7s to 2.6s) after the
    // wires were first measured, so they ended 16px low and snapped up on the first cursor move
    // (owner, 2026-10-25). Once more when its rise ends, in case a frame was missed.
    const until = performance.now() + 3200;
    let follow = requestAnimationFrame(function step(t) {
      draw();
      follow = t < until ? requestAnimationFrame(step) : 0;
    });
    const onRise = (e: TransitionEvent) => {
      if (e.target === post && e.propertyName === 'transform') schedule();
    };
    post.addEventListener('transitionend', onRise);
    // __draw redraws now, for callers that just moved the nodes (the cursor drift, the scroll scene);
    // __redraw waits for the next frame.
    Object.assign(root, { __redraw: schedule, __draw: draw });
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(follow);
      post.removeEventListener('transitionend', onRise);
      ro.disconnect();
    };
  }, []);

  // Cursor depth (desktop, pointer only): each node leans toward the cursor by its depth, and the
  // wires are redrawn to follow.
  useEffect(() => {
    const root = ref.current;
    if (!root || !motionAllowed() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.sv-hero-node'));
    const photo = root.querySelector<HTMLElement>('.sv-photo-drift');
    const target = { x: 0, y: 0 };
    const now = { x: 0, y: 0 };
    let raf = 0;
    const tick = () => {
      now.x += (target.x - now.x) * 0.08;
      now.y += (target.y - now.y) * 0.08;
      nodes.forEach((n, i) => {
        const d = SPOTS[i].depth;
        n.style.translate = `${(now.x * 22 * d).toFixed(2)}px ${(now.y * 16 * d).toFixed(2)}px`;
      });
      photo?.style.setProperty('translate', `${(-now.x * 18).toFixed(2)}px ${(-now.y * 12).toFixed(2)}px`);
      // Redrawn in the same frame the nodes moved, so the wires never trail them.
      (root as HTMLElement & { __draw?: () => void }).__draw?.();
      raf = Math.abs(target.x - now.x) + Math.abs(target.y - now.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Load-in (motion only): the photo opens, the headline rises, the nodes settle in, then the wires
  // draw and the lights start (svc.css). Once the last node has settled (1.75s + 5 x 90ms + 0.9s),
  // data-settled drops the opener's delays, so a node's hover answers at once.
  useLayoutEffect(() => {
    if (motionAllowed()) ref.current?.setAttribute('data-arm', 'true');
    const id = requestAnimationFrame(() => requestAnimationFrame(() => ref.current?.setAttribute('data-in', 'true')));
    const done = window.setTimeout(() => ref.current?.setAttribute('data-settled', 'true'), 3300);
    // Once the reader scrolls, the window's outline and light follow the scroll, not the opener's
    // delayed fades (owner, 2026-10-25: scrolling right away, the outline lingered).
    const onScroll = () => {
      const on = window.scrollY > 2;
      if (ref.current && ref.current.hasAttribute('data-scrolled') !== on) ref.current.toggleAttribute('data-scrolled', on);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(done);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Phones: the window runs from just under the headline to just above the lead (--wt, --wb).
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>('.sv-hero-stage')!;
    const title = root.querySelector<HTMLElement>('.sv-hero-title')!;
    const panel = root.querySelector<HTMLElement>('.sv-hero-panel')!;
    const copy = root.querySelector<HTMLElement>('.sv-hero-copy')!;
    const phone = window.matchMedia('(max-width: 767px)');
    const measure = () => {
      if (!phone.matches) return;
      // Layout boxes, not the transformed ones: the headline lines rise and the scroll lifts it.
      const top = copy.offsetTop + title.offsetTop + title.offsetHeight + 22;
      const foot = stage.offsetHeight - (copy.offsetTop + panel.offsetTop) + 26;
      root.style.setProperty('--wt', `${Math.round(top)}px`);
      root.style.setProperty('--wb', `${Math.round(foot)}px`);
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    phone.addEventListener('change', measure);
    return () => {
      ro.disconnect();
      phone.removeEventListener('change', measure);
    };
  }, []);

  // Leaving: the nodes spread out and fade; the headline lifts a little. Every tween names its
  // start, so scrolling back always returns to the built hero: a plain .to() reads the start the
  // first time it renders, which on a reload mid-page (or a quick scroll away) caught the nodes
  // mid load-in at opacity 0, and they never came back (2026-10-23).
  useScene(ref, ({ gsap }, root) => {
    const mm = gsap.matchMedia();
    // Phones (2026-10-25, "the window"): the stage holds (CSS sticky) while the window opens out to
    // the whole screen; the headline lifts away and the shade comes up under the lead.
    mm.add('(max-width: 767px)', () => {
      const photo = root.querySelector<HTMLElement>('.sv-photo')!;
      const edge = root.querySelector<HTMLElement>('.sv-hero-stage')!;
      const title = root.querySelector<HTMLElement>('.sv-hero-title')!;
      const shade = root.querySelector<HTMLElement>('.sv-photo-shade')!;
      const img = root.querySelector<HTMLElement>('.sv-photo img')!;
      const from = { immediateRender: false };
      // GSAP can't tween through var(), so the window's start is read as numbers (and read again on
      // every refresh, after the headline or the lead reflow).
      const px = (name: string) => parseFloat(getComputedStyle(root).getPropertyValue(name)) || 0;
      const shut = () => {
        const g = parseFloat(getComputedStyle(edge).paddingLeft) || 16;
        return `inset(${px('--wt')}px ${g}px ${px('--wb')}px ${g}px round 4px)`;
      };
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: SCRUB, invalidateOnRefresh: true },
      });
      tl.fromTo(
        photo,
        { clipPath: shut },
        { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 1, ease: 'power1.inOut', ...from },
        0,
      )
        // The window's outline goes almost at once (owner, 2026-10-25: was over the first 20%).
        .fromTo(edge, { '--edge-o': 1 }, { '--edge-o': 0, duration: 0.05, ...from }, 0)
        .fromTo(img, { scale: 1 }, { scale: 1.1, duration: 1, ...from }, 0)
        .fromTo(title, { y: 0, opacity: 1 }, { y: -60, opacity: 0, duration: 0.55, ...from }, 0.05)
        .fromTo(shade, { opacity: 0 }, { opacity: 1, duration: 0.7, ...from }, 0.3);
        // The glass mark stays over the photo as the window opens (owner, 2026-10-25; SvGlassMark).
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([photo, title, shade, img], { clearProps: 'all' });
        edge.style.removeProperty('--edge-o');
      };
    });
    mm.add('(min-width: 1024px)', () => {
      const photo = root.querySelector<HTMLElement>('.sv-photo')!;
      const nodes = gsap.utils.toArray<HTMLElement>('.sv-hero-node', root);
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        // The stage holds with CSS sticky (svc.css), not a GSAP pin: a pin wraps the stage in a
        // spacer, and moving it in the DOM cancels the opener's transitions mid-flight.
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: SCRUB },
        // The wires are measured from the nodes, which this timeline moves: redraw them as it
        // runs while they still show, so on the way back up they meet the nodes again without
        // waiting for the cursor to move (owner, 2026-10-23).
        onUpdate: () => {
          if (tl.progress() < 0.4) (root as HTMLElement & { __draw?: () => void }).__draw?.();
        },
      });
      const from = { immediateRender: false };
      // The aperture closes: the full-bleed photo draws in to a framed window and dims.
      tl.fromTo(
        photo,
        { clipPath: 'inset(0% 0% 0% 0% round 0px)' },
        // Not rendered until the scroll starts, so the opener's slit reveal plays untouched.
        { clipPath: 'inset(9% 6% 11% 6% round 14px)', duration: 1, ...from },
        0,
      );
      nodes.forEach((n, i) => {
        const left = SPOTS[i].x < 50;
        // The node spreads out; its glass panel fades. Fading the node itself made it a backdrop root,
        // so the panel's blur saw nothing behind it and went see-through mid-fade, showing the wire
        // through it (owner, 2026-10-25). The panel's own opacity keeps the frost to the end.
        tl.fromTo(n, { x: 0, y: 0 }, { x: (left ? -1 : 1) * (90 + 70 * SPOTS[i].depth), y: -30 * SPOTS[i].depth, duration: 0.6, ...from }, 0.05);
        // From 0, not 0.05 (owner, 2026-10-26): a tween the playhead backs out of puts back the
        // opacity it found when it first ran, which mid-opener was 0, so the links never came back.
        // One that starts at 0 is never backed out of; at the top it renders its own start, 1.
        tl.fromTo(n.querySelector('a'), { opacity: 1 }, { opacity: 0, duration: 0.65, ...from }, 0);
      });
      tl.fromTo(root.querySelector('.sv-hero-wires'), { opacity: 1 }, { opacity: 0, duration: 0.25, ...from }, 0)
        .fromTo(root.querySelector('.sv-hero-copy'), { y: 0, scale: 1, opacity: 1 }, { y: -50, scale: 0.94, opacity: 0, duration: 0.8, ...from }, 0.2);
    });
    return () => mm.revert();
  });

  return (
    <section ref={ref} className="sv-hero" aria-labelledby="sv-hero-title">
      <div className="sv-hero-stage">
        {/* Three layers so nothing fights: the outer one closes with the scroll (GSAP), the middle
            one opens on load (CSS), the inner one breathes and leans from the cursor. */}
        <div className="sv-photo" aria-hidden="true">
          <div className="sv-photo-open">
            <div className="sv-photo-drift">
              <img {...responsive('/images/hero6.jpg')} alt="" decoding="sync" {...{ fetchpriority: 'high' }} />
            </div>
            <div className="sv-photo-shade" />
          </div>
        </div>
        <div className="sv-glass" aria-hidden="true">
          {phone && (
            <Suspense fallback={null}>
              <SvGlassMark />
            </Suspense>
          )}
        </div>
        <div className="sv-hero-grid" aria-hidden="true" />
        <svg className="sv-hero-wires" aria-hidden="true">
          {CAPABILITIES.map((c, i) => (
            <path
              key={`w-${c.id}`}
              data-w={i}
              style={{ ['--i' as string]: i } as React.CSSProperties}
            />
          ))}
          {CAPABILITIES.map((c, i) => (
            <path
              key={`l-${c.id}`}
              data-l={i}
              style={{ ['--i' as string]: i } as React.CSSProperties}
            />
          ))}
        </svg>

        <div className="sv-hero-copy">
          <h1 id="sv-hero-title" className="sv-hero-title">
            {/* Three lines at every width (owner, 2026-10-23): "officer on" is the middle beat. */}
            <span className="sv-line">
              <span>A prepared</span>
            </span>{' '}
            <span className="sv-line">
              <span>officer on</span>
            </span>{' '}
            <span className="sv-line">
              <span>every post</span>
            </span>
          </h1>
          {/* Phones: this pair sits on a card of the site's black glass. */}
          <div className="sv-hero-panel">
            <p className="sv-hero-lead">
              Armed and unarmed coverage for federal, commercial, and industrial sites in Colorado Springs,
              Denver, and Pueblo. Pick a service, or find your industry.
            </p>
            <div className="sv-hero-actions">
              <Link to="/contact" className="ds-btn ds-btn-primary">
                Request a Quote
                <Arrow />
              </Link>
              <a href="#divisions" className="ds-link sv-link-wide">
                See the six industries
                <Arrow />
              </a>
              {/* Phones: the earlier hero's wording and down arrow (owner, 2026-10-23). */}
              <a href="#divisions" className="ds-link sv-link-phone">
                Who we protect
                <svg className="ds-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
                </svg>
              </a>
            </div>
          </div>
          <p className="sv-hero-post" aria-hidden="true">
            <span className="sv-hero-post-bar">
              <span>Your post</span>
              <span>Colorado Springs · Denver · Pueblo</span>
            </span>
          </p>
        </div>

        <ul className="sv-hero-nodes">
          {CAPABILITIES.map((c, i) => {
            return (
              <li
                key={c.id}
                className="sv-hero-node"
                style={{ ['--x' as string]: `${SPOTS[i].x}%`, ['--y' as string]: `${SPOTS[i].y}%`, ['--i' as string]: i } as React.CSSProperties}
              >
                <a href={`#svc-${c.id}`} onClick={() => showPanel(c.id)}>
                  <span className="sv-node-name">{c.title}</span>
                  <span className="sv-node-keys">
                    {c.keys.map((k, j) => (
                      <span key={k}>
                        {j > 0 && ' · '}
                        <span className="sv-node-key">{k}</span>
                      </span>
                    ))}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Scroll room for the sticky stage while the aperture closes (desktop, motion on). */}
      <div className="sv-hero-hold" aria-hidden="true" />
    </section>
  );
}
