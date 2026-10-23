import { memo, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import { EffectCreative } from 'swiper/modules';
// Swiper's core styles without its icon font (a data: URL the site's CSP blocks): swiper-core.css.
import './swiper-core.css';
import 'swiper/css/effect-creative';
import Arrow from '../Arrow';
import { INDUSTRY_PAGES, type IndustryPageData } from '../market/industries';
import { responsive } from '../../lib/responsive';
import { N, n2 } from './industryBrief';
import { loadEngine, motionAllowed, refreshWhenSettled } from './engine';
import './nx-ind-deck.css';

// 02 on phones and tablets (owner, 2026-10-22): the six industries as swipeable cards; swipe (or tap
// the arrows) for the next. Since 2026-10-23 (owner, after
// skiper-ui's card carousel) the stack runs on Swiper's touch handling, with its momentum and
// snap-back. The motion is Swiper's creative effect after skiper-ui's creative carousel (owner,
// 2026-10-23; the cards effect felt like "1, 2", and the deck after it was replaced by this): the
// card in front, its neighbours folding back at its edges. It rewinds to the first card from the last. Each card is a short post brief:
// the industry, its one line, and the way to the industry page, which holds the roles, what to send
// us, and the rest (owner: streamline the text on phones; the full briefs stay on desktop). The
// active photo, blurred, is the section's backdrop.

const framing = (ind: IndustryPageData): CSSProperties => ({ objectPosition: ind.image.position ?? '50% 60%' });

function Card({ ind, i }: { ind: IndustryPageData; i: number }) {
  return (
    <article className="nx-sk-card">
      {/* The photo on its own, nothing over it (owner, 2026-10-22: the text and its shade hid most
          of it); the brief sits under it on the card. */}
      <div className="nx-sk-photo">
        <img
          {...responsive(ind.image.src, '(min-width: 600px) 400px, 86vw')}
          alt=""
          draggable={false}
          loading={i < 3 ? 'eager' : 'lazy'}
          decoding="async"
          style={framing(ind)}
        />
      </div>
      <div className="nx-sk-body">
        <p className="nx-sk-bar">
          <span>Post brief</span>
          <span>
            {n2(i)} / {n2(N - 1)}
          </span>
        </p>
        <h3 className="nx-sk-name">{ind.name}</h3>
        <p className="nx-sk-short">{ind.short}</p>
        <Link to={`/industries/${ind.slug}`} className="nx-sk-link" draggable={false}>
          Open the page
          <Arrow size={16} />
        </Link>
      </div>
    </article>
  );
}

// The slides render once and are never re-rendered; Swiper owns them after mount (their size is
// set on the element, not through props).
const Slides = memo(function Slides() {
  return (
    <div className="swiper-wrapper">
      {INDUSTRY_PAGES.map((ind, i) => (
        <div key={ind.slug} className="swiper-slide nx-sw-slide" data-i={i}>
          <Card ind={ind} i={i} />
        </div>
      ))}
    </div>
  );
});

// The intro's stack (owner, 2026-10-23: show there are more cards behind): copies of the next two
// cards peek out above the first as it deals in, hold a beat, then tuck in behind it and go.
// Decoration only (not slides): hidden from everyone, and still where the deal-in does not run.
const Ghosts = memo(function Ghosts() {
  return (
    <div className="nx-sk-ghosts" aria-hidden="true" {...{ inert: "" }}>
      {/* The furthest first, so the nearer one lies over it. */}
      {[2, 1].map((k) => (
        <div key={k} className="nx-sk-ghost" style={{ '--k': k } as CSSProperties}>
          <Card ind={INDUSTRY_PAGES[k]} i={k} />
        </div>
      ))}
    </div>
  );
});

export default function IndustryDeck() {
  const rootRef = useRef<HTMLDivElement>(null);
  const swRef = useRef<HTMLDivElement>(null);
  const swiper = useRef<Swiper | null>(null);
  const [active, setActive] = useState(0);

  // The stack, and its size: the card fills the phone's width less room for the pile to fan out to
  // the right; every card the same height (the 3:2 photo, then room for the longest brief).
  useEffect(() => {
    const el = swRef.current;
    if (!el) return;
    const sw = new Swiper(el, {
      modules: [EffectCreative],
      effect: 'creative',
      // After skiper-ui's creative carousel (skiper50; owner, 2026-10-23): the card in front, its
      // neighbours folding away at its edges like doors swinging back. No pile beside it, so the
      // card takes the full column.
      centeredSlides: true,
      creativeEffect: {
        prev: { shadow: true, origin: 'left center', translate: ['-5%', 0, -200], rotate: [0, 100, 0] },
        next: { origin: 'right center', translate: ['5%', 0, -200], rotate: [0, -100, 0] },
      },
      // Rewind, not loop: Swiper's loop re-shuffles the cards mid-drag, so a swipe skipped a card or
      // snapped back. Past the last card the arrows and a swipe come back to the first.
      rewind: true,
      // Slower and eased out (the curve is set on the slides in CSS): a glide, not a snap.
      speed: 650,
      grabCursor: true,
      // Sideways only, so a finger moving up or down still scrolls the page.
      touchAngle: 40,
      threshold: 6,
    });
    swiper.current = sw;
    // The counter, the meter, and the backdrop's color move with the card (owner, 2026-10-23: the
    // backdrop waited for the card to settle and lagged); focus waits for the card to settle.
    const sync = () => setActive(sw.activeIndex);
    const settle = () => {
      // Only the front card takes focus and the screen reader's attention.
      sw.slides.forEach((s) => {
        const front = s.classList.contains('swiper-slide-active');
        s.toggleAttribute('inert', !front);
        s.setAttribute('aria-hidden', String(!front));
      });
    };
    const fit = () => {
      // The full column on phones, up to 480px on tablets.
      const width = Math.round(Math.min(window.innerWidth - 40, 480));
      const bodies = Array.from(el.querySelectorAll<HTMLElement>('.nx-sk-body'));
      el.style.width = `${width}px`;
      // Each brief at its own height, out of the card's flow for the moment it is measured.
      const tallest = Math.max(
        ...bodies.map((b) => {
          b.style.cssText = 'position:absolute;left:0;right:0;top:0;height:auto';
          const h = b.offsetHeight;
          b.style.cssText = '';
          return h;
        }),
      );
      el.style.height = `${Math.round(width / 1.5 + 1 + tallest)}px`;
      sw.update();
    };
    fit();
    sync();
    settle();
    sw.on('slideChange', sync);
    sw.on('slideChangeTransitionEnd', settle);
    window.addEventListener('resize', fit);
    document.fonts?.ready.then(fit);
    return () => {
      window.removeEventListener('resize', fit);
      sw.destroy(true, true);
      swiper.current = null;
    };
  }, []);

  // The deck replaces the long stacked list after the scroll engine has measured the page, so every
  // scene below it would start in the wrong place (headlines stuck faint, I-25 never drawn;
  // 2026-10-22). Measure again once it has drawn, and whenever its height changes.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let t = 0;
    let last = -1;
    const ro = new ResizeObserver(() => {
      const h = Math.round(root.getBoundingClientRect().height);
      if (h === last) return;
      last = h;
      window.clearTimeout(t);
      t = window.setTimeout(() => loadEngine().then((e) => e && refreshWhenSettled(e.ScrollTrigger)), 120);
    });
    ro.observe(root);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  // The pile deals itself in, once, when it first comes into view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !motionAllowed()) return;
    root.dataset.arm = 'true';
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        requestAnimationFrame(() => requestAnimationFrame(() => (root.dataset.in = 'true')));
      },
      { threshold: 0.3 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="nx-dk nx-sk">
      <div className="nx-dk-ambient" aria-hidden="true">
        {INDUSTRY_PAGES.map((ind, i) => (
          <img
            key={ind.slug}
            {...responsive(ind.image.src, '40vw')}
            alt=""
            loading="lazy"
            decoding="async"
            data-on={i === active}
            style={framing(ind)}
          />
        ))}
      </div>

      <div className="nx-sk-stage" role="group" aria-roledescription="carousel" aria-label="Industries">
        <div ref={swRef} className="swiper nx-sw">
          <Slides />
          <Ghosts />
        </div>
      </div>

      <div className="nx-dk-controls nx-edge">
        <p className="nx-dk-count ds-data" aria-live="polite">
          <b>{n2(active)}</b> / {n2(N - 1)}
        </p>
        <div className="nx-dk-meter" aria-hidden="true">
          {INDUSTRY_PAGES.map((ind, i) => (
            <button
              key={ind.slug}
              type="button"
              tabIndex={-1}
              className="nx-dk-seg"
              data-on={i === active}
              data-past={i < active}
              onClick={() => swiper.current?.slideTo(i)}
            >
              <i />
            </button>
          ))}
        </div>
        <div className="nx-dk-arrows">
          <button type="button" className="nx-dk-arrow" aria-label="Previous industry" onClick={() => swiper.current?.slidePrev()}>
            <Arrow size={18} />
          </button>
          <button type="button" className="nx-dk-arrow" aria-label="Next industry" onClick={() => swiper.current?.slideNext()}>
            <Arrow size={18} />
          </button>
        </div>
      </div>
      <p className="nx-sk-hint ds-data nx-edge" aria-hidden="true">
        Swipe the card for the next industry
      </p>
    </div>
  );
}
