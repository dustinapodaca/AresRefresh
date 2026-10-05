import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';

const GSA_ELIBRARY_URL =
  'https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES';

// Dark canvas system for Home, adapted from the Framer design analysis:
// near-black canvas, charcoal surface lifts, white display type with hard
// negative tracking, white pill CTAs, and one blue signal for links/focus.
// Every link sets its own text color: the base `a:hover` rule paints ink,
// which would vanish on this canvas.
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal';
const BTN_PRIMARY = `inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-[14px] font-medium tracking-[-0.01em] text-canvas hover:bg-pale hover:text-canvas ${FOCUS}`;
const BTN_SECONDARY = `inline-flex h-11 items-center justify-center rounded-full bg-surface-2 px-5 text-[14px] font-medium tracking-[-0.01em] text-white hover:bg-hairline hover:text-white ${FOCUS}`;

const DISPLAY_XL: React.CSSProperties = { fontSize: 'clamp(38px, 6vw, 88px)', lineHeight: 0.96, letterSpacing: '-0.05em' };
const DISPLAY_LG: React.CSSProperties = { fontSize: 'clamp(36px, 4.3vw, 62px)', lineHeight: 1, letterSpacing: '-0.045em' };

// Every value here already appears on the Capability Statement page or in
// the previous Home copy. Mono = an identifier, set as data, not prose.
type SpecRow = { k: string; v: string; sub?: string; mono?: boolean; href?: string };

const CONTRACT: SpecRow[] = [
  { k: 'GSA MAS contract', v: '47QSMS25D009Q', mono: true, href: GSA_ELIBRARY_URL },
  { k: 'SIN', v: '561612', mono: true, sub: 'Security Services' },
  { k: 'Ordering', v: 'Pre-negotiated pricing. Agencies can award task orders without a new competition.' },
];

const REGISTRATION: SpecRow[] = [
  { k: 'UEI', v: 'XQXDN6E33SF4', mono: true },
  { k: 'CAGE code', v: '9KL18', mono: true },
  { k: 'Primary NAICS', v: '561612', mono: true, sub: 'Security Guards & Patrol Services' },
];

const OWNERSHIP: SpecRow[] = [
  { k: 'Ownership', v: 'Minority woman-owned' },
  { k: 'WOSB certification', v: 'WOSB250470', mono: true, sub: 'Set-aside eligible' },
  { k: 'WBENC certification', v: 'WBE2303571', mono: true },
  { k: 'Founded', v: '2021', mono: true, sub: 'Colorado Springs, CO' },
];

const PRACTICES = [
  {
    h: 'Trained on site by leadership',
    p: 'Before their first shift, every officer is trained on your post by a leader who has worked that exact post.',
  },
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
    <main
      className="bg-canvas text-ink-muted"
      style={{ fontFeatureSettings: '"cv01", "cv05", "cv09", "cv11", "ss03"' }}
    >
      <Seo path="/" />

      {/* Hero */}
      <section>
        <div className="container-ares pt-36 lg:pt-44">
          <h1 className="font-semibold text-balance text-white" style={DISPLAY_XL}>
            Security guards for federal and commercial sites.
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <p className="max-w-[34rem] text-[19px] leading-[1.45] tracking-[-0.01em]">
              A minority woman-owned GSA schedule holder serving Colorado Springs, Denver, and Pueblo since 2021.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link to="/contact" className={BTN_PRIMARY}>Request a Quote</Link>
              <Link to="/capability-statement" className={BTN_SECONDARY}>Capability Statement</Link>
            </div>
          </div>
          <div className="mt-14 aspect-[4/3] overflow-hidden rounded-[20px] bg-surface-1 sm:aspect-[21/8]">
            <img
              src="/images/hero-steel-wide.webp"
              alt=""
              width={1680}
              height={640}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Spec sheet: bento of four cards, Performance as the one spotlight */}
      <section>
        <div className="container-ares py-24 lg:py-32">
          <h2 className="max-w-[18ch] font-semibold text-white" style={DISPLAY_LG}>Everything you need to verify us.</h2>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            <SpecCard title="Contract vehicle" rows={CONTRACT} />
            <SpecCard title="Federal registration" rows={REGISTRATION} />

            <div
              className="relative flex flex-col justify-between overflow-hidden rounded-[20px] p-7 lg:row-span-2 lg:p-8"
              style={{
                background:
                  'radial-gradient(120% 85% at 90% 0%, rgba(0,153,255,0.5) 0%, rgba(0,153,255,0) 58%), linear-gradient(180deg, #0f2236 0%, #0b1119 100%)',
              }}
            >
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-white">Performance</h3>
              <dl className="m-0 mt-10 lg:mt-0">
                <dt className="text-[13px] text-white/70">Missed shifts</dt>
                <dd className="m-0 mt-2 font-mono text-[96px] leading-[0.9] tracking-[-0.06em] text-white lg:text-[120px]">&lt;1%</dd>
                <dd className="m-0 mt-3 text-[15px] text-white/70">Since founding in 2021</dd>
              </dl>
              <dl className="m-0 mt-10 grid gap-5 border-t border-white/15 pt-6">
                <div>
                  <dt className="text-[13px] text-white/70">On-call coverage</dt>
                  <dd className="m-0 mt-1 text-[16px] text-white">Standard in every contract</dd>
                </div>
                <div>
                  <dt className="text-[13px] text-white/70">Veterans</dt>
                  <dd className="m-0 mt-1 text-[16px] text-white">Supervisors and NRA firearms instructor</dd>
                </div>
              </dl>
            </div>

            <SpecCard title="Ownership and certification" rows={OWNERSHIP} wide />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section>
        <div className="container-ares">
          <figure className="m-0 border-t border-hairline py-24 lg:py-32">
            <blockquote
              className="m-0 max-w-[34ch] font-medium text-white lg:-indent-[0.4em]"
              style={{ fontSize: 'clamp(28px, 3.6vw, 52px)', lineHeight: 1.12, letterSpacing: '-0.035em' }}
            >
              <p>
                “Ares arrived prepared. Their documentation was cleaner than the incumbent’s from day one, and their team was inside the badge cycle before most contractors finish onboarding.”
              </p>
            </blockquote>
            <figcaption className="mt-10 flex flex-wrap gap-x-3 gap-y-1 text-[15px]">
              <span className="font-semibold text-white">Contracting Officer</span>
              <span>USAF · Buckley Space Force Base</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* How we staff a post */}
      <section>
        <div className="container-ares pb-24 lg:pb-32">
          <h2 className="font-semibold text-white" style={DISPLAY_LG}>How we staff a post</h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div className="aspect-[4/3] overflow-hidden rounded-[20px] bg-surface-1 lg:aspect-[5/6]">
              <img
                src="/images/backbone-officer.jpg"
                alt="Smiling Ares Security officer in a black Ares Security polo shirt, standing against a brick wall"
                width={733}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover object-[center_20%]"
              />
            </div>
            <ul className="m-0 list-none p-0">
            {PRACTICES.map((item) => (
                <li key={item.h} className="border-t border-hairline py-8 last:pb-0">
                  <h3 className="text-[22px] font-semibold tracking-[-0.025em] text-white">{item.h}</h3>
                  <p className="mt-2 max-w-[44ch] text-[16px] leading-[1.5]">{item.p}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services and service areas */}
      <section className="bg-surface-1">
        <div className="container-ares py-24 lg:py-32">
          <h2 className="font-semibold text-white" style={DISPLAY_LG}>Services and service areas</h2>

          <h3 className="mt-14 text-[15px] font-semibold tracking-[-0.01em] text-white">Service divisions</h3>
          <ul className="m-0 mt-5 flex list-none flex-wrap gap-2.5 p-0">
            {DIVISIONS.map((d) => (
              <li key={d} className="rounded-full bg-surface-2 px-4 py-2.5 text-[15px] tracking-[-0.01em] text-white">{d}</li>
            ))}
          </ul>
          <Link to="/services" className={`mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-signal hover:text-white ${FOCUS}`}>
            All services <span aria-hidden="true">→</span>
          </Link>

          <h3 className="mt-16 text-[15px] font-semibold tracking-[-0.01em] text-white">Where we work</h3>
          <ul className="m-0 mt-5 grid list-none gap-4 p-0 sm:grid-cols-3">
            {AREAS.map((a) => (
              <li key={a.to}>
                <Link
                  to={a.to}
                  className={`group flex items-center justify-between rounded-[20px] bg-surface-2 p-6 text-white hover:bg-hairline hover:text-white sm:min-h-[168px] sm:flex-col sm:items-stretch sm:p-7 ${FOCUS}`}
                >
                  <span className="text-[26px] font-semibold tracking-[-0.03em]">{a.label}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-canvas text-[16px] text-white sm:self-end"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Careers */}
      <section>
        <div className="container-ares py-24 lg:py-32">
          <div className="grid overflow-hidden rounded-[30px] bg-surface-1 lg:grid-cols-2">
            <div className="aspect-[4/3] lg:aspect-auto">
              <img
                src="/images/careers-team.jpg"
                alt="Officer in a Security shirt training at an indoor firing range"
                width={1184}
                height={880}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <h2 className="font-semibold text-white" style={DISPLAY_LG}>Now hiring officers</h2>
              <p className="mt-5 max-w-[34rem] text-[17px] leading-[1.5]">
                Armed, unarmed, cleared, and office roles, with paid training and real room to grow. Veterans are encouraged to apply.
              </p>
              <div className="mt-8">
                <Link to="/careers" className={BTN_PRIMARY}>See Open Roles</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section>
        <div className="container-ares">
          <div className="border-t border-hairline py-24 lg:py-32">
            <h2 className="font-semibold text-balance text-white" style={DISPLAY_XL}>Tell us about your site.</h2>
            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
              <a href="tel:+17196963966" className={`font-mono text-[28px] tracking-[-0.02em] text-white hover:text-white sm:text-[34px] ${FOCUS}`}>
                719-696-3966
              </a>
              <a href="mailto:contact@aressecurity.co" className={`text-[17px] text-ink-muted hover:text-white ${FOCUS}`}>
                contact@aressecurity.co
              </a>
              <Link to="/contact" className={BTN_PRIMARY}>Request a Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SpecCard({ title, rows, wide = false }: { title: string; rows: SpecRow[]; wide?: boolean }) {
  return (
    <div className={`rounded-[20px] bg-surface-1 p-7 lg:p-8 ${wide ? 'lg:col-span-2' : ''}`}>
      <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-white">{title}</h3>
      <dl className={`m-0 mt-7 grid gap-6 ${wide ? 'sm:grid-cols-2 lg:grid-cols-4' : ''}`}>
        {rows.map((row) => (
          <div key={row.k}>
            <dt className="text-[13px]">{row.k}</dt>
            <dd
              className={`m-0 mt-1.5 ${row.mono ? 'font-mono text-[17px] tracking-[0.01em]' : 'text-[16px] leading-snug tracking-[-0.01em]'} text-white`}
            >
              {row.href ? (
                <a
                  href={row.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-signal hover:text-white ${FOCUS}`}
                >
                  {row.v}
                  <span aria-hidden="true" className="ml-1.5 font-sans">↗</span>
                  <span className="sr-only"> (opens GSA eLibrary in a new tab)</span>
                </a>
              ) : (
                row.v
              )}
            </dd>
            {row.sub && <dd className="m-0 mt-1 text-[13px]">{row.sub}</dd>}
          </div>
        ))}
      </dl>
    </div>
  );
}
