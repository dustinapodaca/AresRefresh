import { useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { INDUSTRY_PAGES } from '../market/industries';
import { roleBySlug } from '../market/roles';
import { responsive } from '../../lib/responsive';
import { useMotion, useScene } from '../home/motion';
import { useMediaQuery } from '../home/useMediaQuery';
import { Statement } from './objects';

// 4.3 The sites we protect (owner, 2026-10-19; /home-next): flora's category scene, made for Ares,
// the centerpiece of the page. Desktop pins it for about 80% of a screen per industry: the active
// industry's photo fills the screen behind everything, graded down hard, the next one wiping up
// over it as it settles from 1.1; on the left all six names, very large, the list sliding up so the
// one under the scroll holds the optical center beside the page's line, its rust tick at the center;
// on the right that industry's post brief over dark glass (the only glass on Home: it sits on a
// photo): its line, the roles we staff there with their lines, what to send us, its page, and a
// quote with the industry already picked (/contact?industry=). The names are links; clicking one
// that isn't showing scrolls to it. Phones, tablets, reduced motion, the prerender: six full-width
// blocks, each its photo with the name over it and its brief beneath, under a sticky mini-index.

const N = INDUSTRY_PAGES.length;
const n2 = (i: number) => String(i + 1).padStart(2, '0');
const SCENE = '(min-width: 1024px) and (min-height: 640px)';

function Brief({ i, compact = false }: { i: number; compact?: boolean }) {
  const ind = INDUSTRY_PAGES[i];
  return (
    <div className="hn-brief-in" key={ind.slug}>
      <span className="hn-node-bar">
        <span className="hn-node-dot" aria-hidden="true" />
        <span className="hn-node-label">Post brief</span>
        <span className="hn-node-meta">
          {n2(i)} / {n2(N - 1)}
        </span>
      </span>
      <p className="hn-brief-short">{ind.short}</p>
      <ul className="hn-brief-roles">
        {ind.deliver.map((d) => (
          <li key={d.role}>
            <span className="ds-data">{roleBySlug(d.role)?.name ?? d.role}</span>
            {!compact && <span>{d.line}</span>}
          </li>
        ))}
      </ul>
      <p className="hn-brief-ask">{ind.ask}</p>
      <div className="hn-brief-actions">
        <Link to={`/industries/${ind.slug}`} className="ds-link hn-brief-link" data-cursor="OPEN PAGE">
          Open the {ind.name} page
          <Arrow />
        </Link>
        <Link to={`/contact?industry=${ind.slug}`} className="ds-btn ds-btn-primary hn-brief-quote">
          Request a Quote
          <Arrow />
        </Link>
      </div>
    </div>
  );
}

const framing = (ind: (typeof INDUSTRY_PAGES)[number]) => ({ objectPosition: ind.image.position ?? '50% 60%' }) as CSSProperties;

export default function SitesNext() {
  const engine = useMotion();
  const wide = useMediaQuery(SCENE, false);
  const scene = !!engine && wide;
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const goTo = useRef<((i: number) => void) | null>(null);

  useScene(
    ref,
    ({ gsap, ScrollTrigger, lenis }, root) => {
      if (!scene) {
        // The blocks: each photo opens upward from its foot with the scroll.
        root.querySelectorAll<HTMLElement>('.hn-site-photo').forEach((ph) => {
          gsap.fromTo(ph, { clipPath: 'inset(100% 0% 0% 0% round 4px)' }, { clipPath: 'inset(0% 0% 0% 0% round 4px)', ease: 'none', scrollTrigger: { trigger: ph, start: 'top 95%', end: 'top 50%', scrub: true } });
        });
        // The mini-index follows the block in view.
        root.querySelectorAll<HTMLElement>('.hn-site-block').forEach((b, i) => {
          ScrollTrigger.create({ trigger: b, start: 'top 55%', end: 'bottom 55%', onToggle: (self) => self.isActive && setActive(i) });
        });
        return;
      }
      const sceneEl = root.querySelector<HTMLElement>('.hn-sites-scene')!;
      const shots = Array.from(root.querySelectorAll<HTMLElement>('.hn-site-shot'));
      const list = root.querySelector<HTMLElement>('.hn-sites-list')!;
      const items = Array.from(list.querySelectorAll<HTMLElement>('li'));
      const center = () => {
        // Each item's offset from the list's top, so the list can bring item i to the center line.
        const box = list.parentElement!.getBoundingClientRect();
        return items.map((li) => li.offsetTop + li.offsetHeight / 2 - box.height / 2);
      };
      let offsets = center();

      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      // The list slides so the item under the scroll holds the center, all the way through.
      tl.fromTo(list, { y: () => -offsets[0] }, { y: () => -offsets[N - 1], duration: N - 1 }, 0);
      shots.forEach((shot, i) => {
        if (i === 0) return;
        const at = i - 0.5;
        tl.fromTo(shot, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5 }, at)
          .fromTo(shot.querySelector('img'), { scale: 1.1 }, { scale: 1, duration: 1 }, at);
      });
      tl.to({}, { duration: 0.6 }, N - 1);

      let current = 0;
      const st = ScrollTrigger.create({
        trigger: sceneEl,
        start: 'top top',
        end: () => `+=${N * 0.8 * window.innerHeight}`,
        pin: true,
        scrub: true,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: () => {
          offsets = center();
        },
        onUpdate: (self) => {
          const raw = self.progress * tl.duration() + 0.5;
          let next = Math.min(N - 1, Math.max(0, Math.floor(raw)));
          // A little give at each boundary, so the name never flickers between two.
          if (next !== current && Math.abs(raw - Math.max(next, current)) < 0.04) next = current;
          if (next !== current) {
            current = next;
            setActive(next);
            const after = shots[next + 1]?.querySelector('img');
            if (after) after.loading = 'eager';
          }
        },
      });
      goTo.current = (i: number) => lenis.scrollTo(st.start + ((i + 0.05) / tl.duration()) * (st.end - st.start), { duration: 1.1 });
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        goTo.current = null;
        setActive(0);
      };
    },
    [scene],
  );

  return (
    <section ref={ref} id="industries" className="hn-sites" data-scene={scene ? 'on' : undefined} aria-labelledby="sites-title">
      <div className="ds-container hn-sites-head">
        <Statement id="sites-title">The sites we protect.</Statement>
        <p className="ds-lead hn-sites-lead">
          Six industries, from government facilities and critical sites to offices and campuses. Each has its own page: what the post covers and what to send us.
        </p>
      </div>

      {scene ? (
        <div className="hn-sites-pinwrap">
          <div className="hn-sites-scene">
            <div className="hn-site-shots" aria-hidden="true">
              {INDUSTRY_PAGES.map((ind, i) => (
                <span key={ind.slug} className="hn-site-shot" style={{ zIndex: i }}>
                  <img {...responsive(ind.image.src, '100vw')} alt="" loading={i < 2 ? 'eager' : 'lazy'} decoding="async" style={framing(ind)} />
                </span>
              ))}
            </div>
            <div className="ds-container hn-sites-grid">
              <div className="hn-sites-listbox">
                <i className="hn-sites-tick" data-thread="x" aria-hidden="true" />
                <ol className="hn-sites-list">
                  {INDUSTRY_PAGES.map((ind, i) => (
                    <li key={ind.slug} data-active={i === active ? 'true' : undefined}>
                      <Link
                        to={`/industries/${ind.slug}`}
                        data-own-click
                        tabIndex={-1}
                        onClick={(e) => {
                          if (i === active || !goTo.current) return;
                          e.preventDefault();
                          goTo.current(i);
                        }}
                      >
                        {ind.name}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="hn-brief">
                <Brief i={active} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ol className="hn-sites-index ds-container" aria-hidden="true">
            {INDUSTRY_PAGES.map((ind, i) => (
              <li key={ind.slug} data-active={i === active ? 'true' : undefined}>
                <a href={`#site-${ind.slug}`} tabIndex={-1}>
                  {n2(i)}
                </a>
              </li>
            ))}
          </ol>
          <ol className="hn-sites-blocks ds-container">
            {INDUSTRY_PAGES.map((ind, i) => (
              <li key={ind.slug} id={`site-${ind.slug}`} className="hn-site-block">
                <Link to={`/industries/${ind.slug}`} className="hn-site-photo" data-cursor="OPEN PAGE">
                  <img {...responsive(ind.image.src, '(min-width: 768px) 50vw, 100vw')} alt="" loading="lazy" decoding="async" className="hn-grade" style={framing(ind)} />
                  <span className="hn-site-name">
                    <span className="ds-data">{n2(i)}</span>
                    {ind.name}
                  </span>
                </Link>
                <div className="hn-site-brief">
                  <Brief i={i} compact />
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
}
