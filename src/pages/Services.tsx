import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageSlot from '../components/ImageSlot';
import { useScrollInViewObserver } from '../hooks/useScrollInViewObserver';

const CARDS = [
  {
    n: '01',
    title: 'Government Security Personnel',
    body: 'Lawful, immediate access to federal and state facilities. DoW-vetted officers — GSA Schedule #47QSMS25D009Q for streamlined procurement, no new competition required.',
    pills: ['Military Bases', 'Courthouses', 'Federal Buildings', 'State Agencies', 'TS/SCI Cleared'],
    src: '/images/matrix-government.jpg',
  },
  {
    n: '02',
    title: 'Airport & Transportation Security',
    body: 'Perimeter protection, passenger-area security, baggage, and cargo operations with professional 24/7 uniformed and plainclothes coverage.',
    pills: ['Airports', 'Transportation Hubs', 'Aviation Facilities'],
    src: '/images/matrix-airport.jpg',
  },
  {
    n: '03',
    title: 'Commercial & High-Traffic Security',
    body: 'Visible deterrence and loss-prevention that scales with foot traffic while protecting revenue and customer experience.',
    pills: ['Retail', 'Banks', 'Hotels', 'Malls', 'Grocery'],
    src: '/images/matrix-commercial.jpg',
  },
  {
    n: '04',
    title: 'Industrial, Logistics & Construction',
    body: '24/7 posted guards, mobile patrols, perimeter security, and auditable checkpoint logs.',
    pills: ['Industrial Sites', 'Warehouses', 'Construction', 'Critical Infrastructure'],
    src: '/images/matrix-industrial.jpg',
  },
  {
    n: '05',
    title: 'Specialized & Armed Protection',
    body: 'Licensed, firearms-compliant officers for cash-handling, regulated, or high-liability sites.',
    pills: ['Armed Asset Protection', 'High-Risk Environments', 'Data Centers'],
    src: '/images/matrix-specialized.jpg',
  },
  {
    n: '06',
    title: 'Institutional & Community Security',
    body: 'Tailored, trust-based security for sensitive and community environments where calm presence matters most.',
    pills: ['Hospitals', 'Schools', 'Museums', 'Places of Worship', 'Residential & Retirement'],
    src: '/images/matrix-community.jpg',
  },
];

const LIFECYCLE = [
  { n: 1, h: 'Technical Audit', micro: 'Scope · Risk · Site Walk', p: 'We walk the site, document risk, and brief command structure before paper changes hands.' },
  { n: 2, h: 'Compliance Mapping', micro: 'Regs · Clearances · SOPs', p: 'Regs, clearances, and SOPs mapped against the facility — federal, state, or commercial.' },
  { n: 3, h: 'Guard Training', micro: 'Post Orders · Firearms · Drills', p: 'Post orders, firearms qualification, drill cadence. Every officer current at time of post.' },
  { n: 4, h: 'Deployment', micro: 'Go-Live · QA · Reporting', p: 'Go-live with QA review and real-time reporting pipeline. Same-shift into client ops.' },
];

export default function Services() {
  useScrollInViewObserver();

  return (
    <main>
      <PageHeading title="Services & Process" slotId="cap-heading-bg" sub="Precise, reliable security solutions for any environment — built on superior detail, outstanding communication, and technical proposals that set the standard." />

      {/* Matrix cards */}
      <section>
        <Spacer />
        <div className="container-ares">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
            <div>
              <h3 className="brackets-title mb-4" data-reveal="up">SECTION 01 · MATRIX</h3>
              <h2 className="text-display-lg text-ink" data-reveal="up">
                THE ARES <span className="font-light italic text-mid">SERVICE</span> MATRIX
              </h2>
            </div>
            <p className="text-right text-[14px] uppercase tracking-[0.14em] text-mid" data-reveal="right">
              ↳ What we ship<br />&nbsp;&nbsp;&nbsp;What the client gets
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {CARDS.map((c, i) => (
              <article
                key={c.n}
                data-scroll-active
                data-in-view="false"
                className="group relative isolate flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[2rem] bg-ink p-9 text-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_64px_-24px_rgba(31,31,31,0.35)] max-[460px]:data-[in-view=true]:-translate-y-1 max-[460px]:data-[in-view=true]:shadow-[0_32px_64px_-24px_rgba(31,31,31,0.35)]"
              >
                <div className="absolute inset-0 -z-10 bg-ink">
                  {(c as any).src
                    ? <img src={(c as any).src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.65]" />
                    : <ImageSlot id={`matrix-${i + 1}`} placeholder={`Photo for ${c.title}`} fill />}
                </div>
                <div className="svc-card-fade absolute inset-0 -z-[5] bg-gradient-to-b from-ink/25 via-ink/55 to-ink/[0.92]" />

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex flex-1 flex-wrap gap-1.5 min-w-0">
                    {c.pills.map((p) => (
                      <span key={p} className="pill-glass pill-glass-dark">{p}</span>
                    ))}
                  </div>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/65">{c.n}</span>
                </div>

                <div className="mt-auto flex items-end gap-6 pt-8">
                  <div className="max-w-[36ch] flex-1">
                    <h3 className="m-0 mb-3 text-[clamp(24px,2.4vw,32px)] font-bold uppercase leading-[1.05] tracking-tight text-paper">{c.title}</h3>
                    <p className="text-[15px] leading-relaxed text-paper/80">{c.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <Spacer />
      </section>

      {/* Lifecycle */}
      <section className="bg-paper-2">
        <Spacer />
        <div className="container-ares">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
            <div>
              <h3 className="brackets-title mb-4" data-reveal="up">SECTION 02 · LIFECYCLE</h3>
              <h2 className="text-display-lg text-ink" data-reveal="up">
                FOUR <span className="font-light italic text-mid">STAGES</span> TO DEPLOYMENT
              </h2>
            </div>
            <p className="text-right text-[14px] uppercase tracking-[0.14em] text-mid" data-reveal="right">
              ↳ Every engagement<br />moves through these four stages
            </p>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-line bg-paper md:grid-cols-4">
            {LIFECYCLE.map((step, i) => {
              const hasArrow = i < LIFECYCLE.length - 1;
              return (
                <div
                  key={step.n}
                  data-scroll-active
                  data-scroll-group="lifecycle"
                  data-in-view="false"
                  className={`group relative flex items-start gap-5 p-8 text-left transition-[border-color,box-shadow] duration-200 ease-out md:hover:border-ink max-[460px]:data-[in-view=true]:border-ink md:flex-col md:items-center md:gap-4 md:text-center ${hasArrow ? 'border-b md:border-b-0 md:border-r border-line md:hover:shadow-[inset_-1px_0_0_var(--color-ink)]' : ''}`}
                >
                  {/* Number badge: pinned left of the content stack on
                      mobile (flex-row), back on top above the centered
                      content stack on md+ (flex-col). shrink-0 prevents
                      it from being squeezed by the flex-1 content next
                      to it on narrow viewports. */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-[18px] font-bold text-paper">{step.n}</div>
                  {/* Content stack — flex-1 on mobile so it takes the
                      remaining row width; reverts to natural width on
                      md+ so the centered column layout still works.
                      Tighter gap between heading/micro/body on mobile
                      to keep the row compact; restores gap-4 on md+
                      for parity with the original spacing. */}
                  <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-initial md:gap-4">
                    <h4 className="m-0 text-[18px] font-bold uppercase tracking-tight text-ink">{step.h}</h4>
                    <div className="text-[11px] uppercase tracking-[0.15em] text-mid">{step.micro}</div>
                    <p className="text-[14px] leading-snug text-ink-2">{step.p}</p>
                  </div>

                  {/* Connector arrows sitting on the divider between this
                      step and the next. Desktop: arrow points RIGHT and
                      sits on the right-border seam between this card and
                      the one to its right. Mobile: arrow points DOWN and
                      sits on the bottom-border seam, signalling the next
                      stage as the user scrolls the stacked column. Both
                      default to an outlined disc; the disc fills black
                      with a white arrow when the step is "active"
                      (hover on hover-capable devices, data-in-view at
                      ≤460px so touch users see the same affordance). */}
                  {hasArrow && (
                    <>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute right-0 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-ink bg-paper text-ink transition-colors duration-200 ease-out group-hover:bg-mid group-hover:text-paper md:flex"
                      >
                        <svg width="20" height="20" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h6" />
                          <path d="M6 3l3 3-3 3" />
                        </svg>
                      </span>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute bottom-0 right-6 z-10 flex h-8 w-8 translate-y-1/2 items-center justify-center rounded-full border border-ink bg-paper text-ink transition-colors duration-200 ease-out max-[460px]:group-data-[in-view=true]:bg-mid max-[460px]:group-data-[in-view=true]:text-paper md:hidden"
                      >
                        <svg width="20" height="20" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 3v6" />
                          <path d="M3 6l3 3 3-3" />
                        </svg>
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-between border-t border-dashed border-line pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-mid gap-3">
            <span className="flex-1 text-left">← Pre-Contract</span>
            <span className="flex-1 text-center">Contract Execution</span>
            <span className="flex-1 text-right">Operational →</span>
          </div>
        </div>
        <Spacer />
      </section>

      {/* Why Our Four-Stage Process Matters */}
      <WhyStages />

      {/* Personnel in Action banner — Services-only "docked CTA" treatment.
          The Footer below uses `is-extended` (see Footer.tsx + index.css)
          to grow ~290px of top headroom. This section slides its CTA
          card halfway into that headroom via -mb-[290px]; z-10 keeps
          the card stacked above the footer's image/gradient layers so
          the docked half reads as resting ON the footer. Section bg
          isn't painted — the real footer is what shows behind the
          docked half, not a duplicate. The match works on every
          viewport since -mb and +pt are equal and opposite, so the
          dock effect applies on mobile too. */}
      <section className="relative z-10 py-20 -mb-[290px]">
        <div className="container-ares relative z-10">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-ink shadow-[0_40px_80px_-32px_rgba(31,31,31,0.5),0_8px_24px_-8px_rgba(31,31,31,0.25)]" data-reveal="up">
            <img src="/images/about-banner.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/85" />
            <div className="absolute inset-x-12 bottom-12 text-paper">
              <h3 className="relative mb-3 inline-grid items-center gap-2.5 self-start text-[13px] font-medium uppercase tracking-[0.22em] text-paper grid-cols-[auto_max-content_auto] max-[460px]:grid max-[460px]:w-fit max-[460px]:mx-auto">
                <span aria-hidden className="opacity-50">[</span>
                <span>PERSONNEL IN ACTION</span>
                <span aria-hidden className="opacity-50">]</span>
              </h3>
              <h2 className="max-w-[24ch] text-display-md text-paper">Discipline · Vigilance · Professionalism in the Field</h2>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const STAGES = [
  {
    n: '01',
    title: 'Technical Audit',
    lead: 'We invest time upfront so you don’t pay for surprises later.',
    body: 'By walking the site and mapping risks with your team before any contract is signed, we identify vulnerabilities early and build a solution that fits your exact operational needs — preventing costly gaps or changes down the road.',
    defaultOpen: true,
  },
  {
    n: '02',
    title: 'Compliance Mapping',
    lead: 'Full regulatory alignment from day one.',
    body: 'We cross-reference every regulation, clearance, and SOP against your specific facility — federal, state, or commercial. This eliminates compliance risk and gives you complete audit confidence from the moment we go live.',
  },
  {
    n: '03',
    title: 'Guard Training',
    lead: 'Site-specific training by leadership — never a new guard without it.',
    body: 'No officer is ever sent to your site without hands-on training from a member of our leadership team who has personally worked that exact post. They learn the unique nuances, entry points, client expectations, and daily rhythms so your protection is consistent and professional from the very first shift.',
  },
  {
    n: '04',
    title: 'Deployment',
    lead: 'Seamless go-live with zero coverage gaps.',
    body: 'We deploy with full staffing levels and a robust on-call system so there are never lapses — not even for a single shift. Real-time quality assurance, daily reporting, and immediate leadership support ensure smooth operations and total peace of mind.',
  },
];

function WhyStages() {
  const [openIdx, setOpenIdx] = useState(2);
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 -z-[2] bg-ink">
        <img src="/images/why-stages-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover max-[460px]:object-[calc(50%+100px)_50%]" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-[1] bg-[linear-gradient(180deg,rgba(31,31,31,0.55)_0%,rgba(31,31,31,0.35)_50%,rgba(31,31,31,0.7)_100%),linear-gradient(90deg,rgba(31,31,31,0.55)_0%,rgba(31,31,31,0.2)_60%,rgba(31,31,31,0.4)_100%)]" />
      <Spacer />
      <div className="container-ares">
        {/* Top heading like LeafLife FAQ */}
        <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <h2 className="m-0 text-paper font-normal" style={{ fontSize: 'clamp(40px, 10vw, 72px)', lineHeight: 0.92, letterSpacing: '-0.06em' }}>
            Why Our Process <em className="font-light italic text-light">Matters.</em>
          </h2>
          <h3 className="brackets-title text-paper/60">HOW IT WORKS</h3>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* Left: translucent fog-glass panel over the section background */}
          <div className="glass-card relative flex flex-col justify-end overflow-hidden rounded-3xl p-12 text-paper">
            <div>
              <div className="mb-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-paper/60">Our Approach</div>
              <p className="m-0 text-paper font-normal" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.25, letterSpacing: '-0.015em' }}>
                Every site is different. Every shift pattern, threat profile, and compliance requirement is unique. Our four-stage process exists because protection that holds up under scrutiny can’t be{' '}<em className="font-light italic text-light">rushed,</em>{' '}copied from another contract, or trusted to a stranger on day one.
              </p>
            </div>
          </div>

          {/* Right: accordion list */}
          <div className="flex flex-col lg:min-h-[520px]">
            {STAGES.map((s, i) => (
              <Accordion key={s.n} {...s} isFirst={i === 0} isLast={i === STAGES.length - 1} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </div>
      <Spacer />
    </section>
  );
}

function Accordion({ n, title, lead, body, isFirst, isLast, open, onToggle }: { n: string; title: string; lead: string; body: string; isFirst: boolean; isLast: boolean; open: boolean; onToggle: () => void }) {
  // Highlight treatment applies whenever the accordion is open
  const topBorder = open ? 'border-white/30' : 'border-white/[0.12]';
  const bgStyle = open
    ? { backgroundImage: 'linear-gradient(to right, transparent 0%, rgba(250,250,249,0.05) 80px, rgba(250,250,249,0.05) calc(100% - 80px), transparent 100%)' }
    : undefined;

  // Animate height + vertical padding between open/closed.
  // Mirrors jQuery slideDown/slideUp(250) with "swing" (sine-in-out) easing —
  // the same feel as the LeafLife FAQ accordion.
  const bodyRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);
  const DURATION = 250;
  const EASING = 'cubic-bezier(0.45, 0, 0.55, 1)';

  useEffect(() => {
    const el = bodyRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    // On first paint, snap to the correct state with no animation.
    if (!didMount.current) {
      didMount.current = true;
      el.style.overflow = 'hidden';
      if (open) {
        el.style.height = 'auto';
        el.style.paddingTop = '';
        el.style.paddingBottom = '';
      } else {
        el.style.height = '0px';
        el.style.paddingTop = '0px';
        el.style.paddingBottom = '0px';
      }
      return;
    }

    const cs = getComputedStyle(inner);
    const naturalPT = cs.paddingTop;
    const naturalPB = cs.paddingBottom;
    const transition = `height ${DURATION}ms ${EASING}, padding-top ${DURATION}ms ${EASING}, padding-bottom ${DURATION}ms ${EASING}`;

    if (open) {
      // From whatever it is (likely 0) to natural height + padding.
      const target = inner.scrollHeight;
      el.style.overflow = 'hidden';
      el.style.height = '0px';
      el.style.paddingTop = '0px';
      el.style.paddingBottom = '0px';
      // Force reflow before transitioning.
      void el.offsetHeight;
      el.style.transition = transition;
      el.style.height = target + 'px';
      el.style.paddingTop = naturalPT;
      el.style.paddingBottom = naturalPB;
      const done = (e: TransitionEvent) => {
        if (e.target !== el || e.propertyName !== 'height') return;
        el.removeEventListener('transitionend', done);
        // Release height so content can reflow if it ever changes.
        el.style.transition = '';
        el.style.height = 'auto';
        el.style.paddingTop = '';
        el.style.paddingBottom = '';
      };
      el.addEventListener('transitionend', done);
      return () => el.removeEventListener('transitionend', done);
    } else {
      // Lock in current natural height + padding, then animate to 0.
      const current = inner.scrollHeight;
      el.style.overflow = 'hidden';
      el.style.height = current + 'px';
      el.style.paddingTop = naturalPT;
      el.style.paddingBottom = naturalPB;
      void el.offsetHeight;
      el.style.transition = transition;
      el.style.height = '0px';
      el.style.paddingTop = '0px';
      el.style.paddingBottom = '0px';
      const done = (e: TransitionEvent) => {
        if (e.target !== el || e.propertyName !== 'height') return;
        el.removeEventListener('transitionend', done);
        // Keep height:0 + padding:0 so the closed state is stable.
        el.style.transition = '';
      };
      el.addEventListener('transitionend', done);
      return () => el.removeEventListener('transitionend', done);
    }
  }, [open]);

  return (
    <div data-acc-group="why-stages" style={bgStyle} className={`border-t ${topBorder} ${isLast ? 'border-b ' + topBorder : ''} transition-colors`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center gap-5 px-2 py-6 text-left"
      >
        <span className="min-w-[36px] text-[13px] font-bold uppercase tracking-[0.2em] text-paper/55">{n}</span>
        <span className={`flex-1 text-[22px] font-semibold leading-tight tracking-tight transition-colors ${open ? 'text-paper' : 'text-paper/90 group-hover:text-paper'}`}>
          {title}
        </span>
        {/* Plus / X morph: two line spans that rotate independently —
            closed = horizontal + vertical (a +), open = two diagonals (an X).
            Open state highlights the whole disc in white with dark strokes. */}
        <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.45,0,0.55,1)] ${open ? 'bg-paper border-paper shadow-[0_4px_14px_-4px_rgba(250,250,249,0.45)]' : 'bg-transparent border-white/30'}`}>
          <span className="relative block h-3 w-3">
            <span className={`absolute left-0 right-0 top-1/2 h-[1.5px] -translate-y-1/2 transition-[transform,background-color] duration-[250ms] ease-[cubic-bezier(0.45,0,0.55,1)] ${open ? 'rotate-45 bg-ink' : 'bg-paper'}`} />
            <span className={`absolute left-0 right-0 top-1/2 h-[1.5px] -translate-y-1/2 transition-[transform,background-color] duration-[250ms] ease-[cubic-bezier(0.45,0,0.55,1)] ${open ? '-rotate-45 bg-ink' : 'rotate-90 bg-paper'}`} />
          </span>
        </span>
      </button>
      <div
        ref={bodyRef}
        aria-hidden={!open}
        style={{ overflow: 'hidden' }}
      >
        <div ref={innerRef} className="px-2 pb-7 pl-16 pr-8">
          <p className="m-0 mb-3 text-[17px] font-semibold leading-snug text-paper tracking-tight">{lead}</p>
          <p className="m-0 text-[15px] leading-relaxed text-paper/70">{body}</p>
        </div>
      </div>
    </div>
  );
}

function PageHeading({ title, sub, slotId }: { title: string; sub?: string; slotId: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-[370px] pb-[185px] text-paper max-[460px]:pt-[278px] max-[460px]:pb-[140px]">
      <div className="hero-gradient absolute inset-0 -z-10">
        <img src="/images/capabilities-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-bottom" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(31,31,31,0.85)_0%,rgba(31,31,31,0.6)_40%,rgba(31,31,31,0.2)_100%),linear-gradient(180deg,rgba(31,31,31,0.4)_0%,rgba(31,31,31,0.15)_50%,rgba(31,31,31,0.55)_100%)]" />
      </div>
      <div className="container-ares">
        <ol className="reveal m-0 mb-6 flex list-none gap-2 p-0 text-[13px] uppercase tracking-[0.14em] text-paper/65">
          <li><Link to="/">Home</Link></li>
          <li className="text-paper/40">/</li>
          <li className="text-paper">Services & Process</li>
        </ol>
        <h1 className="reveal-d1 m-0 font-normal text-paper" style={{ fontSize: 'clamp(48px, 7vw, 84px)', lineHeight: 0.92, letterSpacing: '-0.06em' }}>{title}</h1>
        {sub && <p className="reveal-d2 mt-6 max-w-[60ch] text-[20px] text-paper/75">{sub}</p>}
      </div>
    </section>
  );
}

function Spacer() {
  return <div className="h-25" />;
}
