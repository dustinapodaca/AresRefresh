import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { HEARD } from './data';

const n2 = (i: number) => String(i + 1).padStart(2, '0');

// 02 What clients told us (owner, 2026-10-18): the page's signature section. What clients said
// about their last guard company, and what Ares does instead, as liquid glass cards.
// Desktop: the headline, intro, and a counter hold still on the left while the cards pass the
// center on the right, one at a time. As a card reaches the center, a rust line draws through
// the complaint, the complaint dims, and the answer rises into place; passed cards stay that way.
// Phones and tablets: one column, the same moment.
// The resolved state is the default (prerendered HTML, no JavaScript, reduced motion); the
// motion is armed only after mount: data-anim="ready" sets the waiting state on cards not yet
// reached, then "on" (a frame later) turns the transitions on, so nothing animates backwards.
export default function Heard() {
  const ref = useRef<HTMLElement>(null);
  const [anim, setAnim] = useState<'ready' | 'on' | null>(null);
  const [current, setCurrent] = useState(0);

  // A card resolves once its top passes 42% of the way down the screen, a little above the middle
  // (owner, 2026-10-19: the strike came too early at the center band), and stays resolved. Cards
  // already past that line on mount (a reload mid-page) start resolved; a fast jump past the line
  // resolves too.
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const LINE = 0.42;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.ds-heard-card'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting || e.boundingClientRect.top < window.innerHeight * LINE) {
            e.target.setAttribute('data-in-view', 'true');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: `0px 0px -${Math.round((1 - LINE) * 100)}% 0px`, threshold: 0 },
    );
    cards.forEach((card) => {
      if (card.getBoundingClientRect().top < window.innerHeight * LINE) card.setAttribute('data-in-view', 'true');
      else io.observe(card);
    });
    setAnim('ready');
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnim('on')));
    return () => {
      cancelAnimationFrame(id);
      io.disconnect();
    };
  }, []);

  // The desktop counter follows the card nearest the center of the screen.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.ds-heard-card'));
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestD = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setCurrent(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} id="heard" className="ds-heard" data-anim={anim ?? undefined} aria-labelledby="heard-title">
      <div className="ds-heard-grid">
        <div className="ds-heard-head">
          <h2 id="heard-title" className="ds-display-lg">
            What clients told us.
          </h2>
          <p className="ds-lead">
            When we started bidding, skeptical clients asked how we’d be any different. Then they
            told us about their last guard company. The stories were always the same, so we built
            Ares around them.
          </p>
        </div>

        <div className="ds-heard-cards">
          {/* A very soft rust light behind the cards, held at the middle of the screen, so the
              glass has something to bend (the prime panel's CSS light, quieter). */}
          <div className="ds-heard-glow" aria-hidden="true">
            <div className="ds-heard-glow-in">
              <i />
              <i />
              <i />
            </div>
          </div>
          <ol className="ds-heard-list">
            {HEARD.map((h) => (
              <li key={h.heard} className="ds-heard-card">
                <p className="ds-data ds-heard-label">What we heard</p>
                {/* The strike is a background line, decorative: readers get the words. */}
                <p className="ds-heard-complaint">
                  <span>{h.heard}</span>
                </p>
                <p className="ds-data ds-heard-label ds-heard-label-do">What we do</p>
                <p className="ds-heard-answer">{h.answer}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="ds-heard-close">
        <p className="ds-handoff">Those details are what clients thank us for most.</p>
        <Link to="/contact" className="ds-link ds-heard-cta">
          Tell us about your site
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
