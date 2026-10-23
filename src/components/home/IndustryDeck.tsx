import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { INDUSTRY_PAGES, type IndustryPageData } from '../market/industries';
import { responsive } from '../../lib/responsive';
import { SwipeCards, type SwipeCardItem } from '../ui/image-stack-carousel';
import { N, n2 } from './industryBrief';
import { loadEngine, motionAllowed } from './engine';
import './nx-ind-deck.css';

// 02 on phones and tablets (owner, 2026-10-22, second form): the six industries as a swipe
// stack, after the 21st.dev image stack carousel. One card at a time on top of a fanned pile;
// drag it sideways (it turns as it goes) or tap the arrows, and it goes to the back of the pile.
// Each card is a short post brief: the industry, its one line, and the way to the industry page,
// which holds the roles, what to send us, and the rest (owner: streamline the text on phones; the
// full briefs stay on desktop). The active photo, blurred, is the section's backdrop.

const framing = (ind: IndustryPageData): CSSProperties => ({ objectPosition: ind.image.position ?? '50% 60%' });
const INDEX = new Map(INDUSTRY_PAGES.map((ind, i) => [ind.slug, i]));

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

export default function IndustryDeck() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<(string | number)[]>(() => INDUSTRY_PAGES.map((ind) => ind.slug));
  const [size, setSize] = useState({ width: 320, height: 416 });
  const active = INDEX.get(String(order[0])) ?? 0;

  // The card fills the phone's width, less room for the pile to fan out to the right.
  useEffect(() => {
    const fit = () => {
      const width = Math.round(Math.min(window.innerWidth - 40 - 28, 400));
      setSize((s) => (s.width === width ? s : { width, height: s.height }));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  // Every card the same height (2026-10-22): the 3:2 photo, then room for the longest brief, so the
  // photos match from card to card and no brief is cut off.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const bodies = Array.from(root.querySelectorAll<HTMLElement>('.nx-sk-body'));
    if (!bodies.length) return;
    // Each brief at its own height, out of the card's flow for the moment it is measured (inside
    // the card it fills the space left, which would read the card's own height back).
    const natural = (b: HTMLElement) => {
      b.style.cssText = 'position:absolute;left:0;right:0;top:0;height:auto';
      const h = b.offsetHeight;
      b.style.cssText = '';
      return h;
    };
    const tallest = Math.max(...bodies.map(natural));
    const height = Math.round(size.width / 1.5 + 1 + tallest);
    if (height !== size.height) setSize({ width: size.width, height });
  }, [size]);

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
      t = window.setTimeout(() => loadEngine().then((e) => e?.ScrollTrigger.refresh()), 120);
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

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const back = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  const goTo = (i: number) => {
    const slug = INDUSTRY_PAGES[i].slug;
    setOrder((o) => {
      const at = o.indexOf(slug);
      return [...o.slice(at), ...o.slice(0, at)];
    });
  };

  const cards: SwipeCardItem[] = INDUSTRY_PAGES.map((ind, i) => ({ id: ind.slug, content: <Card ind={ind} i={i} /> }));

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
        <SwipeCards cards={cards} order={order} onOrderChange={setOrder} settings={size} />
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
              onClick={() => goTo(i)}
            >
              <i />
            </button>
          ))}
        </div>
        <div className="nx-dk-arrows">
          <button type="button" className="nx-dk-arrow" aria-label="Previous industry" onClick={back}>
            <Arrow size={18} />
          </button>
          <button type="button" className="nx-dk-arrow" aria-label="Next industry" onClick={next}>
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
