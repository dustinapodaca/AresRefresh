import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { responsive } from '../../lib/responsive';
import { heroTitle } from '../../lib/heroTitle';
import OpeningForms, { FORMS, type Form } from './OpeningForms';

// The opening photograph (owner, 2026-10-08): downtown Denver at sunset with the Front Range
// (a real place, swapped with the Request a Quote page, which now has the generated towers).
// The 2400px original of contact-hero.jpg (hero1.jpg), as WebP, graded down to match.
// The opening photo. Default since 2026-10-12 (owner): the Colorado State Capitol and downtown
// Denver at night. The other options stay for comparison at /services?photo=pikes|skyline
// (pikes, downtown Colorado Springs with Pikes Peak, was the default earlier that day; the
// Denver sunset moved to the Capability Statement hero). Each sets its
// framing (dossier.css reads the vars): `pos` the object-position, `drop` how far the photo sits
// below its box on phones and tablets, `dropD` and `ratio` (height / width) from 1024px, and
// optionally `tint`, the black in the glass (default 0.55, 0.68 below 1024px; the blur stays).
const PHOTOS = {
  pikes: { src: '/images/services-hero/colorado-springs.webp', caption: 'Downtown Colorado Springs, Colorado', pos: '50% 100%', drop: '-200px', dropD: '-110px', ratio: 0.5231 },
  // Measured so each subject (the skyline over the bridges; the dome and towers) centers in the
  // clear area under the glass; from 1024px the drop scales with the width, like the photo.
  skyline: { src: '/images/services-hero/denver-skyline-dusk.webp', caption: 'Downtown Denver, Colorado', pos: '50% 66%', drop: '-152px', dropD: 'calc(133px - 58.4vw)', ratio: 1.5 },
  // The copper-glass tower (owner, 2026-10-15: moved from the Home hero). Not a named place, so
  // no caption.
  tower: { src: '/images/hero6.jpg', caption: '', pos: '50% 100%', drop: '0px', dropD: '0px', ratio: 0.6667 },
  capitol: { src: '/images/services-hero/denver-capitol-night.webp', caption: 'Colorado State Capitol, Denver', pos: '22% 62%', drop: '-255px', dropD: 'calc(132px - 36.5vw)', ratio: 0.7496, tint: 0.12 },
} as const;

// Opening copy (copy audit round 2, 2026-10-10). The default is the audit's content plan;
// the audit's other options stay switchable for the client at /services?hero=a|b|c|current.
const COPY = {
  plan: {
    title: 'Security officers, patrol, and access control.',
    lead: 'Armed and unarmed coverage for federal, commercial, and industrial sites in Colorado Springs, Denver, and Pueblo. Pick a service, or find your industry.',
  },
  a: {
    title: 'Security officers for every kind of post.',
    lead: 'Armed and unarmed officers, patrol, and access control for federal, commercial, and industrial sites. Find the service or industry closest to yours.',
  },
  b: {
    title: 'Armed, unarmed, patrol, and access control.',
    lead: 'One standard of training and supervision behind every post, from federal installations to retail floors.',
  },
  c: {
    title: 'What we staff, and how.',
    lead: 'Six services, one process: every officer is trained on your post before the first shift.',
  },
  current: {
    title: 'Security officers for six kinds of sites.',
    lead: 'Armed and unarmed officers for federal, commercial, industrial, and institutional sites in Colorado Springs, Denver, and Pueblo. Find the division closest to your site.',
  },
} as const;

// /services?open=curtain|aperture|index|lens: the four openings in OpeningForms.tsx (owner,
// 2026-10-15). The glass opening below stays the default until the owner picks.
export default function Opening() {
  const [params] = useSearchParams();
  const askedForm = params.get('open');
  if (askedForm && (FORMS as readonly string[]).includes(askedForm)) {
    const asked = params.get('hero');
    const copy = COPY[(asked && asked in COPY ? asked : 'plan') as keyof typeof COPY];
    return <OpeningForms form={askedForm as Form} copy={copy} />;
  }
  return <OpeningGlass />;
}

function OpeningGlass() {
  const ref = useRef<HTMLElement>(null);
  const [params] = useSearchParams();
  const asked = params.get('hero');
  const copy = COPY[(asked && asked in COPY ? asked : 'plan') as keyof typeof COPY];
  const askedPhoto = params.get('photo');
  const HERO = PHOTOS[(askedPhoto && askedPhoto in PHOTOS ? askedPhoto : 'tower') as keyof typeof PHOTOS];

  // Owner, 2026-10-08: on scroll, only the glass slides up at first; the photo and the page
  // below hold still until the glass's foot has cleared the nav, then everything scrolls as
  // usual. Where scroll-driven animations exist, the hold is a compositor transform tied to
  // the scroll (smooth: dossier.css, `html.svc-hold`); this effect only measures the distance
  // (--svc-cap). Elsewhere a spacer under the glass grows with the scroll (--svc-hold).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const glass = el.querySelector<HTMLElement>('.ds-svc-open-glass');
    const header = document.querySelector<HTMLElement>('[data-site-header]');
    const smooth = CSS.supports('animation-timeline: scroll()');
    const anchor = root.style.overflowAnchor;
    root.style.overflowAnchor = 'none';
    root.classList.add(smooth ? 'svc-hold' : 'svc-hold-js');
    let cap = 0;
    let frame = 0;
    const measure = () => {
      cap = Math.max(0, (glass?.offsetHeight ?? 0) - (header?.offsetHeight ?? 0));
      root.style.setProperty('--svc-cap', `${cap}px`);
    };
    const update = () => {
      frame = 0;
      el.style.setProperty('--svc-hold', `${Math.min(Math.max(window.scrollY, 0), cap)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      if (!smooth) onScroll();
    };
    measure();
    if (!smooth) {
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove('svc-hold', 'svc-hold-js');
      root.style.removeProperty('--svc-cap');
      root.style.overflowAnchor = anchor;
    };
  }, []);

  return (
    <section
      ref={ref}
      className="ds-svc-open"
      aria-labelledby="services-title"
      style={'tint' in HERO ? ({ '--svc-tint': HERO.tint } as React.CSSProperties) : undefined}
    >
      {/* The photo, anchored at its foot, with a mirror of it (flipped vertically) above so the
          glass frosts real image to the top. It holds still while the glass slides away. */}
      <div className="ds-svc-open-photo" aria-hidden="true">
        <div
          className="ds-svc-open-stack"
          style={
            {
              '--svc-pos': HERO.pos,
              '--svc-drop': HERO.drop,
              '--svc-drop-d': HERO.dropD,
              '--svc-ratio': HERO.ratio || undefined,
            } as React.CSSProperties
          }
        >
          <div className="ds-svc-open-mirror">
            <img {...responsive(HERO.src)} alt="" decoding="sync" />
          </div>
          <img {...responsive(HERO.src)} alt="" decoding="sync" {...{ fetchpriority: 'high' }} />
        </div>
      </div>

      <div className="ds-svc-open-glass">
        <div className="ds-container ds-svc-open-head">
          <h1 id="services-title" className="ds-display-xl">
            {heroTitle(copy.title)}
          </h1>
          <div className="ds-svc-open-side">
            <p className="ds-lead">{copy.lead}</p>
          </div>
        </div>
        {/* The place, like the other photo heroes (owner, 2026-10-08): just under the glass's
            edge on the right, riding up with the glass over the photo and out of view. */}
        {HERO.caption && <p className="ds-caption ds-svc-open-cap">{HERO.caption}</p>}
      </div>

      {/* Grows with the first scroll (--svc-hold) so the photo and the page below hold still. */}
      <div className="ds-svc-open-spacer" aria-hidden="true" />
      {/* The open, crisp part of the photograph below the glass. */}
      <div className="ds-svc-band" aria-hidden="true" />
    </section>
  );
}
