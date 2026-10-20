import { useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { INDUSTRY_PAGES } from '../market/industries';
import { responsive } from '../../lib/responsive';
import PrimePipeline from './PrimePipeline';
import PrimeGlow from './PrimeGlow';
import { useMotion, useScene } from './motion';
import { useMediaQuery } from './useMediaQuery';
import { RevealHeading, RevealLead } from './Reveal';

// 02 Industries (copy audit round 2, 2026-10-10): the six industries in the owner's fixed order,
// then the prime-contractor block linking to /teaming.
// One scroll (owner, 2026-10-19; REVERSES the plates, owner 2026-10-10, three photos in a row and a
// ruled strip): on desktop, while the scroll engine runs, the section pins under the nav as a scene,
// a sibling of About's "What clients told us": the headline, its lead, and all six names on the left,
// the one under the scroll in ink with the rail's rust tick and its line and "Open the page" beneath;
// on the right one photo frame where each industry's photo wipes up over the last as the scroll
// reaches it. Clicking or tabbing to a name scrolls to its step; clicking the one showing opens its
// page. Phones and tablets, reduced motion, the prerender, and no JavaScript get all six as a list,
// each with its photo, number, name, line, and arrow (on phones too, so all six are equal).

// The pinned scene needs the width for two columns and the height for the list beside the frame.
const SCENE = '(min-width: 1024px) and (min-height: 640px)';
const N = INDUSTRY_PAGES.length;
const n2 = (i: number) => String(i + 1).padStart(2, '0');

// Per-image framing for the tall frame (industries.ts `card`); `scale` composes with the motion's.
const framing = (ind: (typeof INDUSTRY_PAGES)[number]) =>
  ind.image.card
    ? ({
        '--card-pos': ind.image.card.position,
        '--card-pos-desktop': ind.image.card.desktopPosition ?? ind.image.card.position,
        scale: ind.image.card.zoom ? String(ind.image.card.zoom) : undefined,
        transformOrigin: ind.image.card.origin,
      } as CSSProperties)
    : undefined;

export default function Industries() {
  const engine = useMotion();
  const wide = useMediaQuery(SCENE, false);
  const scene = !!engine && wide;
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  // Scrolls the page to industry i's step in the pinned scene (set while the scene runs).
  const goTo = useRef<((i: number) => void) | null>(null);

  useScene(
    sectionRef,
    ({ gsap, ScrollTrigger, lenis }, root) => {
      if (!scene) {
        // The list: each photo opens upward from its foot as it comes in, tied to the scroll.
        root.querySelectorAll<HTMLElement>('.ds-ind-row .ds-ind-photo').forEach((photo) => {
          gsap.fromTo(
            photo,
            { clipPath: 'inset(100% 0% 0% 0% round 4px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 4px)', ease: 'none', scrollTrigger: { trigger: photo, start: 'top 95%', end: 'top 55%', scrub: true } },
          );
        });
        return;
      }
      const pinEl = root.querySelector<HTMLElement>('.ds-ind-scene')!;
      const shots = Array.from(root.querySelectorAll<HTMLElement>('.ds-ind-shot'));
      // The scene pins under the nav and, below 1200px, the running head.
      const header = () => {
        const nav = document.querySelector<HTMLElement>('[data-site-header]')?.offsetHeight ?? 72;
        const runhead = window.innerWidth < 1200 ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ds-runhead')) || 0 : 0;
        return nav + runhead;
      };

      // One step per industry on a timeline the pin scrubs: the next photo wipes up from the frame's
      // foot (settling from 1.12) and is whole at the step's boundary, while the one beneath eases
      // back to 0.96 and darkens.
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      shots.forEach((shot, i) => {
        if (i === 0) return;
        const prev = shots[i - 1];
        const at = i - 0.45;
        tl.fromTo(shot, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.45 }, at)
          .fromTo(shot.querySelector('img'), { scale: 1.12 }, { scale: 1, duration: 0.45 }, at)
          .fromTo(prev.querySelector('img'), { scale: 1 }, { scale: 0.96, duration: 0.45 }, at)
          .fromTo(prev.querySelector('.ds-ind-shade'), { opacity: 0 }, { opacity: 0.6, duration: 0.45 }, at);
      });
      tl.to({}, { duration: 1 }, N - 1);

      // The name under the scroll changes midway through its photo's wipe, with a little give at
      // each boundary so it never flickers between two.
      let current = 0;
      const st = ScrollTrigger.create({
        trigger: pinEl,
        start: () => `top ${header()}px`,
        end: () => `+=${N * 0.75 * window.innerHeight}`,
        pin: true,
        scrub: true,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const raw = self.progress * N + 0.22;
          let next = Math.min(N - 1, Math.max(0, Math.floor(raw)));
          if (next > current && raw - next < 0.06 && next - current === 1) next = current;
          if (next < current && current - raw < 0.06 && current - next === 1) next = current;
          if (next !== current) {
            current = next;
            setActive(next);
            // Have the photo after it ready before its wipe begins.
            const after = shots[next + 1]?.querySelector('img');
            if (after) after.loading = 'eager';
          }
        },
      });
      goTo.current = (i: number) => {
        const y = st.start + ((i + 0.3) / N) * (st.end - st.start);
        lenis.scrollTo(y, { duration: 1.1 });
      };
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        goTo.current = null;
        setActive(0);
      };
    },
    [scene],
  );

  const ind = INDUSTRY_PAGES[active];
  return (
    <section ref={sectionRef} id="industries" className="ds-industries" data-scene={scene ? 'on' : undefined} aria-labelledby="industries-title">
      {/* The pin wraps .ds-ind-scene in a spacer of its own; this wrapper keeps React's own
          children of the section where React put them. */}
      <div className="ds-ind-pinwrap">
        <div className="ds-ind-scene">
          <div className="ds-ind-left">
            <div className="ds-sec-head">
              <RevealHeading id="industries-title" className="ds-display-lg">
                The sites we protect.
              </RevealHeading>
              <RevealLead className="ds-lead">
                {'Six industries, from government facilities and critical sites to offices and campuses. Each has its own page: what the post covers and what to send us.'}
              </RevealLead>
            </div>

            <ol className="ds-ind-list">
              {INDUSTRY_PAGES.map((item, i) => {
                const on = scene && i === active;
                return (
                  <li key={item.slug} data-active={on ? 'true' : undefined}>
                    {scene ? (
                      <>
                        <Link
                          to={`/industries/${item.slug}`}
                          className="ds-ind-step"
                          data-own-click
                          aria-current={on ? 'step' : undefined}
                          onClick={(e) => {
                            if (i === active || !goTo.current) return;
                            e.preventDefault();
                            goTo.current(i);
                          }}
                          onFocus={(e) => {
                            if (i !== active && e.currentTarget.matches(':focus-visible')) goTo.current?.(i);
                          }}
                        >
                          <span className="ds-data ds-ind-n">{n2(i)}</span>
                          <span className="ds-ind-name">{item.name}</span>
                        </Link>
                        <div className="ds-ind-more" aria-hidden={on ? undefined : true}>
                          <div>
                            <p className="ds-ind-line">{item.short}</p>
                            <Link to={`/industries/${item.slug}`} className="ds-link ds-ind-open" tabIndex={on ? undefined : -1}>
                              Open the page
                              <Arrow />
                            </Link>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link to={`/industries/${item.slug}`} className="ds-ind-row">
                        <span className="ds-ind-photo" aria-hidden="true">
                          <img {...responsive(item.image.src, '(min-width: 768px) 40vw, 100vw')} alt="" loading="lazy" decoding="async" style={framing(item)} />
                        </span>
                        <span className="ds-ind-text">
                          <span className="ds-data ds-ind-n">{n2(i)}</span>
                          <span className="ds-ind-name">
                            {item.name.split(' ').slice(0, -1).join(' ')}{' '}
                            {/* The last word and the arrow never part. */}
                            <span className="ds-nowrap">
                              {item.name.split(' ').slice(-1)[0]}
                              <Arrow size={18} />
                            </span>
                          </span>
                          <span className="ds-ind-line">{item.short}</span>
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {scene && (
            <figure className="ds-ind-frame" aria-hidden="true">
              <span className="ds-ind-shots">
                {INDUSTRY_PAGES.map((item, i) => (
                  <span key={item.slug} className="ds-ind-shot" style={{ zIndex: i }}>
                    <img {...responsive(item.image.src, '(min-width: 1024px) 40vw, 100vw')} alt="" loading={i < 2 ? 'eager' : 'lazy'} decoding="async" style={framing(item)} />
                    <i className="ds-ind-shade" />
                  </span>
                ))}
              </span>
              <figcaption className="ds-data ds-ind-caption">
                <span>
                  {n2(active)} / {n2(N - 1)}
                </span>
                <span>{ind.name}</span>
              </figcaption>
            </figure>
          )}
        </div>
      </div>

      <PrimesPanel />
    </section>
  );
}

// "For prime contractors." (copy audit round 3; second pass 2026-10-10 after Slash, Flora, and
// Resend on Mobbin): a contained panel with three proof points and a solid button to /teaming, beside
// gladia.io's scroll pipeline (owner, 2026-10-15). The diagram, split, and vignettes forms (/?prime=)
// were removed at launch (owner, 2026-10-19; tag options-archive-2026-10-19). The one card container
// on Home besides the Record cards (owner exception).
const PRIME_PROOF = [
  { label: 'Subcontracting credit', value: 'Woman-owned small business', id: 'WOSB250470 · WBE2303571' },
  { label: 'Restricted areas', value: 'Escort and access control on a Space Force base in Colorado', id: 'Subcontractor · 2025 to 2027' },
  { label: 'Reliability', value: 'Fewer than 1% of shifts missed since 2021', id: 'On-call relief in every contract' },
];

function PrimesPanel() {
  // The panel settles 24px as it comes in (on the shared scroll since 2026-10-19; it was a CSS
  // scroll timeline, which Firefox never ran).
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, ({ gsap }, root) => {
    gsap.fromTo(root, { y: 24 }, { y: 0, ease: 'none', scrollTrigger: { trigger: root, start: 'top bottom', end: 'top 45%', scrub: true } });
  });
  const button = (
    <Link to="/teaming" className="ds-btn ds-btn-primary ds-primes-btn">
      Teaming & subcontracting
      <Arrow />
    </Link>
  );
  // Flora's two-tone sentence: the claim in ink, the detail muted.
  const line = (
    <p className="ds-primes-line">
      <span>A woman-owned subcontractor for Front Range work.</span> Restricted-area escorts,
      access control officers, and relief, overflow, and surge coverage under your contract.
    </p>
  );
  return (
    <div ref={ref} className="ds-primes-panel" data-form="pipeline">
      <PrimeGlow />
      {/* The copy holds still on desktop while the line grows down the cards beside it. */}
      <div className="ds-primes-copy">
        <h3 className="ds-display-md">For prime contractors.</h3>
        {line}
        <ul className="ds-primes-list">
          {PRIME_PROOF.map((p) => (
            <li key={p.label}>
              <span className="ds-primes-label">{p.label}</span>
              <span className="ds-primes-value">{p.value}</span>
            </li>
          ))}
        </ul>
        {button}
      </div>
      <PrimePipeline />
    </div>
  );
}
