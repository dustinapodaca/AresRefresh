import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { INDUSTRY_PAGES, type IndustryPageData } from '../market/industries';
import { Brief, N, n2 } from './industryBrief';
import { responsive } from '../../lib/responsive';
import { readIn, useScene, words, SCRUB, scrollToY } from './engine';
import './nx-industries.css';

// Phones and tablets (owner, 2026-10-22: the stacked list ran too long): a swipe deck, loaded on
// its own below 1024px so desktop never fetches its motion library.
const IndustryDeck = lazy(() => import('./IndustryDeck'));

// 02 The sites we protect (home-flora, 2026-10-20): flora's category scene, made for Ares.
// Desktop with motion: the scene holds the screen while the six industries pass through it in the
// owner's order. The active industry's photo fills the window behind everything (each new one
// wipes up from the foot), the six names slide up a giant list so the active one sits at the
// optical center with a rust tick beside it, and a glass post brief on the right carries that
// industry's line, the roles we staff there, what to send us, and the way in.
// Phones and tablets with JavaScript: a swipe deck of short post briefs (IndustryDeck). Everywhere
// else (reduced motion on desktop, the prerender, no JavaScript): the same content as six stacked
// blocks, photo and brief, nothing pinned; the deck replaces them once it has drawn.

// Hold the first and last industry a little before and after the passes.
const HOLD = 0.35;

const framing = (ind: IndustryPageData): CSSProperties => ({ objectPosition: ind.image.position ?? '50% 60%' });

// How wide each photo is drawn (measured 2026-10-22), so the browser fetches a file to match. The
// photos are wider than their boxes and fill them (object-fit: cover), so the drawn width is the
// box's height times the photo's own aspect ratio wherever that is more than the box's width.
const aspect = (ind: IndustryPageData) => {
  const r = responsive(ind.image.src);
  return r.width && r.height ? r.width / r.height : 1.5;
};
const r2 = (n: number) => Math.round(n * 100) / 100;
// The scene: the window.
const sceneSizes = (ind: IndustryPageData) => `max(100vw, ${r2(aspect(ind) * 100)}vh)`;
// The list: from 1024px half the container (628px at most), 4:5 but no taller than the window
// under the nav; below, the full column at 16:10.
const listSizes = (ind: IndustryPageData) => {
  const a = aspect(ind);
  const col = 'min(628px, 50vw - 44px)';
  return `(min-width: 1024px) max(${col}, calc(min(${col} * 1.25, 100vh - 120px) * ${r2(a)})), calc((100vw - 40px) * ${r2(Math.max(1, a / 1.6))})`;
};

export default function Industries() {
  const ref = useRef<HTMLElement>(null);
  const [deck, setDeck] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const on = () => setDeck(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useScene(ref, (engine, root) => {
    const { gsap, ScrollTrigger } = engine;
    readIn(engine, root.querySelector('.nx-ind-title'));

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const scene = root.querySelector<HTMLElement>('.nx-ind-scene')!;
      const shots = gsap.utils.toArray<HTMLElement>('.nx-ind-shot', scene);
      const imgs = shots.map((s) => s.querySelector('img')!);
      const list = scene.querySelector<HTMLElement>('.nx-ind-list')!;
      const names = gsap.utils.toArray<HTMLElement>('.nx-ind-name', scene);
      const briefs = gsap.utils.toArray<HTMLElement>('.nx-ind-brief', scene);
      const segs = gsap.utils.toArray<HTMLElement>('.nx-ind-seg i', scene);
      const count = scene.querySelector<HTMLElement>('.nx-ind-count b')!;

      // The scene is shown only now, so start every photo loading (they were lazy and hidden).
      imgs.forEach((img) => img.setAttribute('loading', 'eager'));

      // Names can run to two lines, so each step slides the list by that name's own offset (its
      // middle lands where the first name's middle started).
      const mid = (i: number) => names[i].offsetTop + names[i].offsetHeight / 2;
      gsap.set(shots.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(imgs.slice(1), { scale: 1.12 });

      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      for (let i = 1; i < N; i += 1) {
        const at = HOLD + i - 1;
        tl.to(list, { y: () => mid(0) - mid(i), duration: 1, ease: 'power1.inOut' }, at);
        tl.to(shots[i], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power1.inOut' }, at + 0.2)
          .to(imgs[i], { scale: 1, duration: 0.9 }, at + 0.2)
          .to(imgs[i - 1], { scale: 1.06, duration: 0.6 }, at + 0.2);
      }
      tl.to({}, { duration: HOLD }, HOLD + N - 1);

      let active = -1;
      const paint = () => {
        const t = gsap.utils.clamp(0, N - 1, tl.time() - HOLD);
        names.forEach((el, i) => {
          const near = Math.max(0, 1 - Math.abs(t - i));
          el.style.opacity = String(0.3 + 0.7 * near);
        });
        segs.forEach((el, i) => {
          el.style.transform = `scaleX(${gsap.utils.clamp(0, 1, t - i + 1)})`;
        });
        const now = Math.round(t);
        if (now !== active) {
          active = now;
          briefs.forEach((b, i) => {
            b.dataset.on = String(i === now);
            b.setAttribute('aria-hidden', String(i !== now));
            b.inert = i !== now;
          });
          names.forEach((el, i) => el.classList.toggle('is-on', i === now));
          count.textContent = n2(now);
        }
      };

      const st = ScrollTrigger.create({
        trigger: scene,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 0.8 * (N - 1 + 2 * HOLD))}`,
        pin: true,
        scrub: SCRUB,
        animation: tl,
        invalidateOnRefresh: true,
      });
      // Paint from the timeline itself, so the names and brief follow the smoothed playhead.
      tl.eventCallback('onUpdate', paint);
      paint();

      // A name is a way to its step: the scroll glides to where that industry holds the scene.
      const onClick = (ev: Event) => {
        const a = (ev.target as HTMLElement).closest<HTMLElement>('.nx-ind-name');
        if (!a) return;
        ev.preventDefault();
        const i = Number(a.dataset.i);
        const total = N - 1 + 2 * HOLD;
        const y = st.start + ((HOLD + i) / total) * (st.end - st.start);
        scrollToY(y);
      };
      list.addEventListener('click', onClick);
      return () => list.removeEventListener('click', onClick);
    });
    return () => mm.revert();
  });

  return (
    <section ref={ref} id="industries" className="nx-ind" aria-labelledby="nx-ind-title">
      <header className="nx-ind-head nx-edge">
        <h2 id="nx-ind-title" className="nx-statement nx-ind-title">
          {words('The sites we protect.')}
        </h2>
        <p className="nx-ind-lead">
          Six industries, from government facilities and critical sites to offices and campuses. Each has
          its own page: what the post covers and what to send us.
        </p>
      </header>

      {/* The scene (desktop, with motion). */}
      <div className="nx-ind-scene">
        <div className="nx-ind-shots" aria-hidden="true">
          {INDUSTRY_PAGES.map((ind) => (
            <div key={ind.slug} className="nx-ind-shot">
              <img {...responsive(ind.image.src, sceneSizes(ind))} alt="" loading="lazy" decoding="async" style={framing(ind)} />
            </div>
          ))}
        </div>
        <div className="nx-ind-shade" aria-hidden="true" />
        <div className="nx-ind-stage nx-edge">
          <div className="nx-ind-names">
            <span className="nx-ind-tick" aria-hidden="true" />
            <ol className="nx-ind-list">
              {INDUSTRY_PAGES.map((ind, i) => (
                <li key={ind.slug}>
                  <a href={`/industries/${ind.slug}`} className="nx-ind-name" data-i={i}>
                    <span className="nx-ind-idx">{n2(i)}</span>
                    {ind.name}
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div className="nx-ind-briefs">
            {INDUSTRY_PAGES.map((ind, i) => (
              <article key={ind.slug} className="nx-ind-brief nx-node" data-live="true" data-on={i === 0}>
                <Brief ind={ind} i={i} scene />
              </article>
            ))}
          </div>
        </div>
        <div className="nx-ind-foot nx-edge" aria-hidden="true">
          <p className="nx-ind-count ds-data">
            <b>01</b> / {n2(N - 1)}
          </p>
          <div className="nx-ind-seg">
            {INDUSTRY_PAGES.map((ind) => (
              <span key={ind.slug}>
                <i />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* The resolved list (phones, tablets, reduced motion, prerender, no JavaScript). */}
      <ol className="nx-ind-static nx-edge">
        {INDUSTRY_PAGES.map((ind, i) => (
          <li key={ind.slug} className="nx-ind-item">
            <div className="nx-ind-photo">
              <img {...responsive(ind.image.src, listSizes(ind))} alt="" loading="lazy" decoding="async" style={framing(ind)} />
              <span className="nx-ind-photo-idx ds-data" aria-hidden="true">
                {n2(i)} / {n2(N - 1)}
              </span>
            </div>
            <div className="nx-ind-copy nx-node" data-live="true">
              <h3 className="nx-ind-item-name">
                <Link to={`/industries/${ind.slug}`}>{ind.name}</Link>
              </h3>
              <Brief ind={ind} i={i} />
            </div>
          </li>
        ))}
      </ol>

      {deck && (
        <Suspense fallback={null}>
          <IndustryDeck />
        </Suspense>
      )}
    </section>
  );
}
