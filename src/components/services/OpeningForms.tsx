import { useEffect, useRef, type CSSProperties } from 'react';
import { responsive } from '../../lib/responsive';
import { heroTitle } from '../../lib/heroTitle';

// The Services opening (aperture, the default since 2026-10-15, owner) and three other forms kept
// for comparison. Four openings for the Services page, each built on the copper-glass tower and each with glass
// doing a job (owner, 2026-10-15: "another home page hero that needs to wow"; from Mobbin, Emil,
// and Impeccable). No scroll hold. Only the headline and the lead: the services and industries
// stay in the page below, so the opening sends the reader down to them (owner, 2026-10-15; the
// forms with the six services in the opening are tagged `services-open-roles-option`).
//   curtain   the photo seen through tall panes of frosted glass, like the tower's own curtain
//             wall; a pane clears to the crisp photo under the pointer
//   aperture  the photo as a plate that opens to the full width on scroll, a liquid glass card with
//             the lead straddling its foot so the rim bends the photo's edge (Glide, Titan, Vizcom)
//   sink      the headline set huge over the photo, its last line sinking into a band of liquid
//             glass that holds the lead, like the ARES letters in the footer
//   lens      one tall liquid glass slab like a face of the tower, the headline at its top and the
//             lead at its foot, clear glass between, the photo drifting slowly behind so the bend moves
export const FORMS = ['curtain', 'aperture', 'sink', 'lens'] as const;
export type Form = (typeof FORMS)[number];
type Copy = { title: string; lead: string };

const SRC = '/images/hero6.jpg';
const PANES = 6;

const Photo = ({ className = 'ds-svx-photo' }: { className?: string }) => (
  <div className={className} aria-hidden="true">
    <img {...responsive(SRC)} alt="" decoding="sync" {...{ fetchpriority: 'high' }} />
  </div>
);

const Title = ({ copy, className = 'ds-svx-title' }: { copy: Copy; className?: string }) => (
  <h1 id="services-title" className={className}>
    {heroTitle(copy.title)}
  </h1>
);

// Down to the first section of the page, the industries.
const Down = () => (
  <a href="#divisions" className="ds-link ds-svx-down">
    Who we protect
    <svg className="ds-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
    </svg>
  </a>
);

export default function OpeningForms({ form, copy }: { form: Form; copy: Copy }) {
  return (
    <section className="ds-svx" data-form={form} aria-labelledby="services-title">
      {form === 'curtain' && <Curtain copy={copy} />}
      {form === 'aperture' && <Aperture copy={copy} />}
      {form === 'sink' && <Sink copy={copy} />}
      {form === 'lens' && <Lens copy={copy} />}
    </section>
  );
}

/* ---------- curtain: panes of frosted glass ---------- */

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
        const img = p.querySelector<HTMLElement>('img');
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
      <div ref={ref} className="ds-cw-wall" aria-hidden="true">
        {Array.from({ length: PANES }, (_, i) => (
          <span key={i} className="ds-cw-pane" style={{ '--i': i } as CSSProperties}>
            <img {...responsive(SRC)} alt="" decoding="async" />
          </span>
        ))}
      </div>
      <div className="ds-container ds-cw-copy">
        <Title copy={copy} />
        <div className="ds-cw-side">
          <p className="ds-lead">{copy.lead}</p>
          <Down />
        </div>
      </div>
    </>
  );
}

/* ---------- aperture: the plate that opens ---------- */

function Aperture({ copy }: { copy: Copy }) {
  return (
    <>
      <div className="ds-container ds-ap-head">
        {/* The site's hero headline size, as on every other page (owner, 2026-10-15). */}
        <Title copy={copy} className="ds-display-xl" />
      </div>
      <div className="ds-ap-stage">
        <Photo className="ds-svx-photo ds-ap-photo" />
        <div className="ds-container ds-ap-wrap">
          <div className="ds-ap-card">
            <p className="ds-lead">{copy.lead}</p>
            <Down />
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- sink: the headline sinking into glass ---------- */

function Sink({ copy }: { copy: Copy }) {
  return (
    <>
      <Photo className="ds-svx-photo ds-sk-photo" />
      <div className="ds-sk-stack">
        <div className="ds-container">
          <Title copy={copy} />
        </div>
        <div className="ds-sk-band">
          <div className="ds-container ds-sk-row">
            <p className="ds-lead">{copy.lead}</p>
            <Down />
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
          <Title copy={copy} />
          <div className="ds-ln-foot">
            <p className="ds-lead">{copy.lead}</p>
            <Down />
          </div>
        </div>
      </div>
    </>
  );
}

