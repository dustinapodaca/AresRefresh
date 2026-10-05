import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';

// Home, dark only. Built from the content, not the old layout: a large
// hero with the proof anchored in it (the contractor record), measured figures,
// then how a post is staffed, coverage, one testimonial, hiring, contact.
// Visual system blends three references: xAI's near-black canvas and mono
// labels, Vercel's hairline grids and Geist type with a single glow kept to
// the hero, and Framer's white pills plus one blue spotlight card.
// Every link sets its own text color: the base `a:hover` rule paints ink,
// which would vanish on this canvas.

const GSA_ELIBRARY_URL =
  'https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES';

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal';
const PILL_PRIMARY = `inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-[15px] font-medium text-canvas hover:bg-white/85 hover:text-canvas ${FOCUS}`;
const PILL_SECONDARY = `inline-flex h-11 items-center justify-center gap-2 rounded-full border border-hairline bg-card px-5 text-[15px] font-medium text-white hover:border-white/30 hover:text-white ${FOCUS}`;
const MONO_LABEL = 'font-mono text-[12px] uppercase leading-4 tracking-[0.08em] text-mute';
const PANEL = 'rounded-[12px] border border-hairline bg-card';

const H1_STYLE: React.CSSProperties = { fontSize: 'clamp(38px, 3.7vw, 54px)', lineHeight: 1.04, letterSpacing: '-0.045em' };
const H2_STYLE: React.CSSProperties = { fontSize: 'clamp(30px, 3.1vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.035em' };

// The contractor record. Every value already appears on the Capability
// Statement page or in the approved Home copy.
type RecordRow = { k: string; v: string; mono?: boolean; href?: string };
const RECORD: RecordRow[] = [
  { k: 'GSA MAS', v: '47QSMS25D009Q', mono: true, href: GSA_ELIBRARY_URL },
  { k: 'UEI', v: 'XQXDN6E33SF4', mono: true },
  { k: 'CAGE', v: '9KL18', mono: true },
  { k: 'NAICS', v: '561612', mono: true },
  { k: 'WOSB', v: 'WOSB250470', mono: true },
  { k: 'WBENC', v: 'WBE2303571', mono: true },
  { k: 'Ownership', v: 'Minority woman-owned' },
  { k: 'Founded', v: '2021, Colorado Springs' },
];

// Measured figures only. Each one is a fact the site already states.
const FIGURES = [
  { v: '<1%', label: 'Missed shifts since 2021' },
  { v: '2021', label: 'Founded in Colorado Springs' },
  { v: '6', label: 'Service divisions' },
  { v: '3', label: 'Metro areas served' },
];

const PRACTICES = [
  {
    h: 'Planned before the contract',
    p: 'We learn your site, operations, and risks before anything is signed, so the plan fits how your facility runs.',
  },
  {
    h: 'Clean documentation',
    p: 'Proposals, post orders, and reports are written to the standard of a technical submittal.',
  },
  {
    h: 'A direct line',
    p: 'Regular updates and direct access to the people managing your account.',
  },
  {
    h: 'Veterans in leadership',
    p: 'Veteran supervisors on staff, and our NRA firearms instructor is a veteran.',
  },
];

// Division names match the Services page exactly.
const DIVISIONS = [
  'Government Security Personnel',
  'Airport & Transportation Security',
  'Commercial & High-Traffic Security',
  'Industrial, Logistics & Construction',
  'Specialized & Armed Protection',
  'Institutional & Community Security',
];

const AREAS = [
  { to: '/locations/colorado-springs', label: 'Colorado Springs' },
  { to: '/locations/denver', label: 'Denver' },
  { to: '/locations/pueblo', label: 'Pueblo' },
];

export default function Home() {
  return (
    <main className="bg-canvas font-geist text-body">
      <Seo path="/" />

      {/* Hero: full-viewport statement, the contractor record anchored below */}
      <section className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <img
            src="/images/hero6.webp"
            alt=""
            width={1920}
            height={1280}
            className="h-full w-full object-cover object-[center_60%] opacity-35"
          />
          {/* The page's one decorative glow, kept to the hero */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(45% 60% at 80% 30%, rgba(0,124,240,0.24) 0%, rgba(0,124,240,0) 70%), linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.7) 55%, #0a0a0a 100%)',
            }}
          />
        </div>
        <div className="container-ares flex flex-1 flex-col justify-end pt-36 pb-14 lg:pt-44 lg:pb-16">
          <h1
            className="font-semibold text-balance text-white"
            style={{ fontSize: 'clamp(44px, 6.2vw, 88px)', lineHeight: 0.98, letterSpacing: '-0.05em' }}
          >
            Security guards for federal and commercial sites.
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <p className="max-w-[34rem] text-[18px] leading-7 text-body">
              A minority woman-owned, employee-focused firm serving Colorado Springs, Denver, and Pueblo since 2021.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className={PILL_PRIMARY}>Request a Quote</Link>
              <Link to="/capability-statement" className={PILL_SECONDARY}>Capability Statement</Link>
            </div>
          </div>

          {/* Contractor record */}
          <div className={`mt-14 overflow-hidden ${PANEL}`}>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-3.5">
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-white">Ares Security LLC</span>
              <span className={MONO_LABEL}>Contractor record</span>
            </div>
            <dl className="m-0 grid grid-cols-2 gap-px border-y border-hairline bg-hairline lg:grid-cols-4">
              {RECORD.map((row) => (
                <div key={row.k} className="bg-card px-5 py-4">
                  <dt className={MONO_LABEL}>{row.k}</dt>
                  <dd className={`m-0 mt-1.5 ${row.mono ? 'font-mono text-[15px] tracking-[0.02em]' : 'text-[15px]'} text-white`}>
                    {row.href ? (
                      <a href={row.href} target="_blank" rel="noopener noreferrer" className={`text-signal hover:text-white ${FOCUS}`}>
                        {row.v}
                        <span aria-hidden="true" className="ml-1 font-geist">↗</span>
                        <span className="sr-only"> (opens GSA eLibrary in a new tab)</span>
                      </a>
                    ) : (
                      row.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="px-5 py-3.5 text-[13px] leading-5 text-mute">
              Pre-negotiated federal pricing. Agencies can award task orders without opening a new competition.
            </p>
          </div>
        </div>
      </section>

      {/* Measured figures */}
      <section className="container-ares">
        <dl className="m-0 grid grid-cols-2 gap-px border-y border-hairline bg-hairline lg:grid-cols-4">
          {FIGURES.map((f) => (
            <div key={f.label} className="flex flex-col-reverse gap-4 bg-canvas px-2 py-10 sm:px-6 lg:py-14">
              <dt className={MONO_LABEL}>{f.label}</dt>
              <dd
                className="m-0 font-medium text-white"
                style={{ fontSize: 'clamp(40px, 4.4vw, 64px)', lineHeight: 1, letterSpacing: '-0.045em' }}
              >
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* How a post is staffed */}
      <section>
        <div className="container-ares grid gap-12 py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-20 lg:py-32">
          <div className={`aspect-[4/3] overflow-hidden lg:aspect-[4/5] ${PANEL}`}>
            <img
              src="/images/officer-portrait.jpg"
              alt="Ares Security officer in a black Ares polo with a badge on a lanyard, arms crossed, smiling"
              width={992}
              height={1040}
              loading="lazy"
              className="h-full w-full object-cover object-[center_25%]"
            />
          </div>
          <div>
            <h2 className="font-semibold text-balance text-white" style={H2_STYLE}>
              Every officer is trained on your post by a leader who has worked it.
            </h2>
            <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {PRACTICES.map((item) => (
                <div key={item.h} className="border-t border-hairline pt-5">
                  <h3 className="text-[16px] font-medium tracking-[-0.01em] text-white">{item.h}</h3>
                  <p className="mt-2 text-[15px] leading-6 text-mute">{item.p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services and service areas */}
      <section className="border-t border-hairline">
        <div className="container-ares py-24 lg:py-32">
          <h2 className="font-semibold text-white" style={H2_STYLE}>Services and service areas</h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
            <div className="flex flex-col">
              <ul className="m-0 grid flex-1 list-none gap-px overflow-hidden rounded-[12px] border border-hairline bg-hairline p-0 sm:grid-cols-2">
                {DIVISIONS.map((d) => (
                  <li key={d} className="flex items-end bg-card p-6 text-[17px] font-medium tracking-[-0.01em] text-white sm:min-h-[132px]">
                    {d}
                  </li>
                ))}
              </ul>
              <Link to="/services" className={`mt-5 inline-flex items-center gap-1.5 self-start text-[15px] font-medium text-signal hover:text-white ${FOCUS}`}>
                All services <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className={`flex flex-col overflow-hidden ${PANEL}`}>
              <div className="aspect-[16/10] overflow-hidden border-b border-hairline">
                <img
                  src="/images/mission-vehicle.jpg"
                  alt="Two Ares Security patrol vehicles parked on a residential street"
                  width={750}
                  height={842}
                  loading="lazy"
                  className="h-full w-full object-cover object-[center_75%]"
                />
              </div>
              <p className={`px-6 pt-5 ${MONO_LABEL}`}>Where we work</p>
              <ul className="m-0 mt-3 list-none p-0">
                {AREAS.map((a) => (
                  <li key={a.to} className="border-t border-hairline">
                    <Link
                      to={a.to}
                      className={`group flex items-center justify-between px-6 py-4 text-[16px] text-white hover:bg-white/[0.03] hover:text-white ${FOCUS}`}
                    >
                      {a.label}
                      <span aria-hidden="true" className="text-mute group-hover:text-white">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial (placeholder quote, shortened) */}
      <section className="border-t border-hairline">
        <figure className="container-ares my-0 py-24 lg:py-32">
          <blockquote
            className="m-0 max-w-[22ch] font-medium text-white"
            style={{ fontSize: 'clamp(30px, 3.6vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.035em' }}
          >
            <p>“Ares arrived prepared. Their documentation was cleaner than the incumbent’s from day one.”</p>
          </blockquote>
          <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-white">Contracting Officer</span>
            <span className={MONO_LABEL}>USAF · Buckley Space Force Base</span>
          </figcaption>
        </figure>
      </section>

      {/* Careers: the page's one spotlight card */}
      <section>
        <div className="container-ares pb-24 lg:pb-32">
          <div
            className="grid overflow-hidden rounded-[20px] border border-hairline lg:grid-cols-2"
            style={{
              background:
                'radial-gradient(90% 120% at 0% 0%, rgba(0,153,255,0.32) 0%, rgba(0,153,255,0) 60%), linear-gradient(160deg, #0d1b2a 0%, #0a0f15 100%)',
            }}
          >
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <h2 className="font-semibold text-white" style={H2_STYLE}>Now hiring officers</h2>
              <p className="mt-5 max-w-[30rem] text-[17px] leading-7 text-body">
                Armed, unarmed, cleared, and office roles, with paid training and real room to grow. Veterans are encouraged to apply.
              </p>
              <div className="mt-8">
                <Link to="/careers" className={PILL_PRIMARY}>See Open Roles</Link>
              </div>
            </div>
            <div className="aspect-[4/3] lg:aspect-auto">
              <img
                src="/images/careers-philosophy.jpg"
                alt="The Ares Security team in uniform at an indoor firing range"
                width={1184}
                height={880}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-hairline">
        <div className="container-ares py-24 text-center lg:py-32">
          <h2
            className="font-semibold text-balance text-white"
            style={{ fontSize: 'clamp(36px, 4.6vw, 64px)', lineHeight: 1.02, letterSpacing: '-0.045em' }}
          >
            Tell us about your site.
          </h2>
          <div className="mt-9 flex flex-col items-center gap-2">
            <a href="tel:+17196963966" className={`font-mono text-[26px] tracking-[0.01em] text-white hover:text-white sm:text-[30px] ${FOCUS}`}>
              719-696-3966
            </a>
            <a href="mailto:contact@aressecurity.co" className={`text-[16px] text-mute hover:text-white ${FOCUS}`}>
              contact@aressecurity.co
            </a>
          </div>
          <div className="mt-10 flex justify-center">
            <Link to="/contact" className={PILL_PRIMARY}>Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
