import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { ROLE_PAGES, capabilityFor } from '../market/roles';
import { responsive } from '../../lib/responsive';
import { heroTitle } from '../../lib/heroTitle';

// Four openings for the Services page, each built on the copper-glass tower and each with glass
// doing a job (owner, 2026-10-15: "almost like another home page hero that needs to wow"; from
// Mobbin, Emil, and Impeccable). No scroll hold. The lead says "Pick a service", so every form
// puts the six services in the opening, in their fixed order, each a link to its page.
//   curtain   the photo seen through six frosted glass panes, one per service, like the tower's
//             own curtain wall; a pane clears to the crisp photo on hover or focus
//   aperture  the photo as a plate that opens to the full width on scroll, a liquid glass card
//             with the six services straddling its foot so the rim bends the photo's edge
//             (Glide, Titan, Vizcom)
//   index     the six services set large over the photo (A24's stacked titles); the current one
//             in ink, the photo reframing on it, and a small liquid glass card beside it with its
//             keys and line; it steps through the six on its own until the reader takes over
//   lens      one tall liquid glass slab like a face of the tower, the headline and the six as a
//             ledger in it, the photo drifting slowly behind so the rim's bend moves
export const FORMS = ['curtain', 'aperture', 'index', 'lens'] as const;
export type Form = (typeof FORMS)[number];
type Copy = { title: string; lead: string };

const SRC = '/images/hero6.jpg';
const SERVICES = ROLE_PAGES.map((r) => {
  const c = capabilityFor(r);
  return { slug: r.slug, id: r.capabilityId, name: r.name, line: c.line, keys: c.keys };
});

const Photo = ({ className = 'ds-svx-photo', style }: { className?: string; style?: CSSProperties }) => (
  <div className={className} aria-hidden="true">
    <img {...responsive(SRC)} alt="" decoding="sync" {...{ fetchpriority: 'high' }} style={style} />
  </div>
);

const Head = ({ copy, className = '' }: { copy: Copy; className?: string }) => (
  <div className={`ds-svx-head ${className}`.trim()}>
    <h1 id="services-title" className="ds-svx-title">
      {heroTitle(copy.title)}
    </h1>
    <p className="ds-lead">{copy.lead}</p>
  </div>
);

export default function OpeningForms({ form, copy }: { form: Form; copy: Copy }) {
  return (
    <section className="ds-svx" data-form={form} aria-labelledby="services-title">
      {form === 'curtain' && <Curtain copy={copy} />}
      {form === 'aperture' && <Aperture copy={copy} />}
      {form === 'index' && <Index copy={copy} />}
      {form === 'lens' && <Lens copy={copy} />}
    </section>
  );
}

/* ---------- curtain: six panes of frosted glass ---------- */

// Each pane holds its own blurred copy of the photo, laid exactly over the photo behind it (so a
// pane is frosted glass without a backdrop filter: cheap on phones), and fades it away to clear.
function Curtain({ copy }: { copy: Copy }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>('.ds-svx');
    if (!root) return;
    const place = () => {
      const r = root.getBoundingClientRect();
      root.querySelectorAll<HTMLElement>('.ds-cw-pane').forEach((p) => {
        const b = p.getBoundingClientRect();
        const img = p.querySelector<HTMLElement>('.ds-cw-frost img');
        if (!img) return;
        img.style.left = `${r.left - b.left}px`;
        img.style.top = `${r.top - b.top}px`;
        img.style.width = `${r.width}px`;
        img.style.height = `${r.height}px`;
      });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);
  return (
    <>
      <Photo />
      <div className="ds-container ds-cw-top">
        <Head copy={copy} />
      </div>
      <div ref={ref} className="ds-cw-wall">
        {SERVICES.map((s, i) => (
          <Link key={s.slug} to={`/services/${s.slug}`} className="ds-cw-pane" style={{ '--i': i } as CSSProperties}>
            <span className="ds-cw-frost" aria-hidden="true">
              <img {...responsive(SRC)} alt="" decoding="async" />
            </span>
            <span className="ds-cw-text">
              <b>{s.name}</b>
              <small className="ds-data">{s.keys.join(' · ')}</small>
            </span>
            <Arrow size={16} />
          </Link>
        ))}
      </div>
    </>
  );
}

/* ---------- aperture: the plate that opens ---------- */

function Aperture({ copy }: { copy: Copy }) {
  return (
    <>
      <div className="ds-container">
        <Head copy={copy} className="ds-ap-head" />
      </div>
      <div className="ds-ap-stage">
        <Photo className="ds-svx-photo ds-ap-photo" />
        <div className="ds-container ds-ap-wrap">
          <nav className="ds-ap-card" aria-label="Services">
            <h2 className="ds-ap-card-title">Six services.</h2>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>
                    <span>
                      <b>{s.name}</b>
                      <small className="ds-data">{s.keys.join(' · ')}</small>
                    </span>
                    <Arrow size={14} />
                  </Link>
                </li>
              ))}
            </ul>
            <a href="#divisions" className="ds-link ds-ap-more">
              Or find your industry
              <Arrow size={14} />
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}

/* ---------- index: the six, set large ---------- */

// The photo's framing for each service: scale, then a shift in percent of the frame, always
// inside what the scale leaves spare so no edge shows.
const FRAMES: Record<string, [number, number, number]> = {
  armed: [1, 0, 0],
  unarmed: [1.24, 8, 3],
  access: [1.34, 0, -10],
  escort: [1.28, -8, 2],
  relief: [1.2, 2, 7],
  vehicle: [1.16, -5, -6],
};

function Index({ copy }: { copy: Copy }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // Steps through the six on its own while the opening is in view and the reader isn't pointing
  // at or focused in the list. Never under reduced motion.
  useEffect(() => {
    if (held || !inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % SERVICES.length), 3400);
    return () => window.clearTimeout(t);
  }, [active, held, inView]);

  useEffect(() => {
    const el = listRef.current?.closest('.ds-svx');
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The card rides to the active row (desktop: beside it; phones keep it under the list).
  useEffect(() => {
    const list = listRef.current;
    const card = cardRef.current;
    if (!list || !card) return;
    const move = () => {
      const row = list.children[active] as HTMLElement | undefined;
      if (!row) return;
      card.style.setProperty('--ix-y', `${row.offsetTop + row.offsetHeight / 2}px`);
    };
    move();
    window.addEventListener('resize', move);
    return () => window.removeEventListener('resize', move);
  }, [active]);

  const s = SERVICES[active];
  const [scale, x, y] = FRAMES[s.id] ?? [1, 0, 0];
  return (
    <>
      <Photo className="ds-svx-photo ds-ix-photo" style={{ transform: `scale(${scale}) translate(${x / scale}%, ${y / scale}%)` }} />
      <div className="ds-ix-shade" aria-hidden="true" />
      <div className="ds-container ds-ix-grid">
        <Head copy={copy} className="ds-ix-head" />
        <div
          className="ds-ix-body"
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false);
          }}
        >
          <ol ref={listRef} className="ds-ix-list" aria-label="Services">
            {SERVICES.map((v, i) => (
              <li key={v.slug} data-on={i === active ? 'true' : undefined}>
                <Link to={`/services/${v.slug}`} onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                  {v.name}
                </Link>
              </li>
            ))}
          </ol>
          <div ref={cardRef} className="ds-ix-card" aria-hidden="true">
            <div key={s.slug} className="ds-ix-card-in">
              <span className="ds-data">{s.keys.join(' · ')}</span>
              <p>{s.line}</p>
              <Link to={`/services/${s.slug}`} className="ds-link" tabIndex={-1}>
                View the service
                <Arrow size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- lens: one slab of liquid glass ---------- */

function Lens({ copy }: { copy: Copy }) {
  return (
    <>
      <Photo className="ds-svx-photo ds-ln-photo" />
      <div className="ds-container ds-ln-frame">
        <div className="ds-ln-slab">
          <Head copy={copy} className="ds-ln-head" />
          <ul className="ds-ln-ledger" aria-label="Services">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>
                  <b>{s.name}</b>
                  <small className="ds-data">{s.keys.join(' · ')}</small>
                  <Arrow size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
