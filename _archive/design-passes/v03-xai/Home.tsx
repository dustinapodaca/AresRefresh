import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';

const GSA_ELIBRARY_URL =
  'https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES';

// Dark canvas system for Home, adapted from the xAI design analysis:
// one near-black canvas, weight-400 display type with tight tracking,
// uppercase tracked mono for labels, 8px hairline-bordered cards with no
// shadows, and pills as the only interactive shape. No accent color.
// Every link sets its own text color: the base `a:hover` rule paints ink,
// which would vanish on this canvas.
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';
const PILL_FILLED = `inline-flex h-11 items-center justify-center rounded-full border border-white bg-white px-5 text-[14px] text-canvas hover:bg-white/85 hover:text-canvas ${FOCUS}`;
const PILL_OUTLINE = `inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-5 text-[14px] text-white hover:border-white/60 hover:text-white ${FOCUS}`;
const MONO_LABEL = 'font-mono text-[12px] uppercase leading-4 tracking-[0.1em] text-mute';
const CARD = 'rounded-lg border border-hairline bg-card';

const DISPLAY_XL: React.CSSProperties = { fontSize: 'clamp(42px, 5.8vw, 84px)', lineHeight: 1, letterSpacing: '-0.035em' };
const DISPLAY_MD: React.CSSProperties = { fontSize: 'clamp(32px, 3.4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.03em' };

// Every value here already appears on the Capability Statement page or in
// the previous Home copy. Identifiers render in mono, as data.
type SpecRow = { k: string; v: string; sub?: string; mono?: boolean; href?: string };

const SPEC: { title: string; rows: SpecRow[] }[] = [
  {
    title: 'Contract vehicle',
    rows: [
      { k: 'GSA MAS contract', v: '47QSMS25D009Q', mono: true, href: GSA_ELIBRARY_URL },
      { k: 'SIN', v: '561612', mono: true, sub: 'Security Services' },
      { k: 'Ordering', v: 'Task orders at pre-negotiated pricing, no new competition' },
    ],
  },
  {
    title: 'Federal registration',
    rows: [
      { k: 'UEI', v: 'XQXDN6E33SF4', mono: true },
      { k: 'CAGE code', v: '9KL18', mono: true },
      { k: 'Primary NAICS', v: '561612', mono: true, sub: 'Security Guards & Patrol Services' },
    ],
  },
  {
    title: 'Ownership and certification',
    rows: [
      { k: 'Ownership', v: 'Minority woman-owned' },
      { k: 'WOSB', v: 'WOSB250470', mono: true, sub: 'Set-aside eligible' },
      { k: 'WBENC', v: 'WBE2303571', mono: true },
      { k: 'Founded', v: '2021', mono: true, sub: 'Colorado Springs, CO' },
    ],
  },
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
    <main className="bg-canvas text-body">
      <Seo path="/" />

      {/* Hero: type-only statement, centered, then one wide image band */}
      <section>
        <div className="container-ares pt-36 text-center lg:pt-48">
          <p className={MONO_LABEL}>GSA contract 47QSMS25D009Q</p>
          <h1 className="mx-auto mt-6 font-normal text-balance text-white" style={DISPLAY_XL}>
            Security guards for federal and commercial sites.
          </h1>
          <p className="mx-auto mt-7 max-w-[36rem] text-[18px] leading-7">
            Minority woman-owned, serving Colorado Springs, Denver, and Pueblo since 2021.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className={PILL_FILLED}>Request a Quote</Link>
            <Link to="/capability-statement" className={PILL_OUTLINE}>Capability Statement</Link>
          </div>
          <div className={`mt-20 aspect-[4/3] overflow-hidden sm:aspect-[21/8] ${CARD}`}>
            <img
              src="/images/hero-steel-wide.webp"
              alt=""
              width={1680}
              height={640}
              className="h-full w-full object-cover grayscale"
            />
          </div>
        </div>
      </section>

      {/* Spec sheet: three plates of label/value rows plus one metric card */}
      <section>
        <div className="container-ares py-24 lg:py-32">
          <h2 className="font-normal text-white" style={DISPLAY_MD}>Everything you need to verify us.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {SPEC.map((group) => (
              <SpecPlate key={group.title} title={group.title} rows={group.rows} />
            ))}
            <div className={`flex flex-col p-6 lg:p-8 ${CARD}`}>
              <h3 className="text-[20px] font-normal leading-7 text-white">Performance</h3>
              <div className="flex flex-1 flex-col justify-center py-10">
                <p className="font-normal text-white" style={{ fontSize: 'clamp(72px, 8vw, 112px)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                  &lt;1%
                </p>
                <p className={`mt-4 ${MONO_LABEL}`}>Missed shifts since 2021</p>
              </div>
              <dl className="m-0">
                <PlateRow row={{ k: 'On-call', v: 'Standard in every contract' }} />
                <PlateRow row={{ k: 'Veterans', v: 'Supervisors and NRA firearms instructor' }} />
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section>
        <div className="container-ares">
          <figure className="m-0 border-y border-hairline py-24 text-center lg:py-32">
            <blockquote
              className="m-0 mx-auto max-w-[30ch] font-normal text-white"
              style={{ fontSize: 'clamp(26px, 3vw, 40px)', lineHeight: 1.2, letterSpacing: '-0.02em' }}
            >
              <p>
                “Ares arrived prepared. Their documentation was cleaner than the incumbent’s from day one, and their team was inside the badge cycle before most contractors finish onboarding.”
              </p>
            </blockquote>
            <figcaption className="mt-10 flex flex-col items-center gap-1.5">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-white">Contracting Officer</span>
              <span className={MONO_LABEL}>USAF · Buckley Space Force Base</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* How we staff a post */}
      <section>
        <div className="container-ares py-24 lg:py-32">
          <h2 className="font-normal text-white" style={DISPLAY_MD}>How we staff a post</h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <div className={`aspect-[4/3] overflow-hidden lg:row-span-2 lg:aspect-auto ${CARD}`}>
              <img
                src="/images/backbone-officer.jpg"
                alt="Smiling Ares Security officer in a black Ares Security polo shirt, standing against a brick wall"
                width={733}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover object-[center_20%] grayscale"
              />
            </div>
            {PRACTICES.map((item) => (
              <div key={item.h} className={`p-6 lg:p-8 ${CARD}`}>
                <h3 className="text-[20px] font-normal leading-7 text-white">{item.h}</h3>
                <p className="mt-3 text-[16px] leading-6 text-mute">{item.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services and service areas */}
      <section>
        <div className="container-ares">
          <div className="border-t border-hairline py-24 lg:py-32">
            <h2 className="font-normal text-white" style={DISPLAY_MD}>Services and service areas</h2>
            <ul className="m-0 mt-12 grid list-none gap-px overflow-hidden rounded-lg border border-hairline bg-hairline p-0 sm:grid-cols-2 lg:grid-cols-3">
              {DIVISIONS.map((d) => (
                <li key={d} className="bg-card px-6 py-5 text-[16px] text-white">{d}</li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`mr-2 ${MONO_LABEL}`}>Where we work</span>
                {AREAS.map((a) => (
                  <Link key={a.to} to={a.to} className={PILL_OUTLINE}>
                    {a.label} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
              <Link to="/services" className={`self-start text-[14px] text-white underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white lg:self-auto ${FOCUS}`}>
                All services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section>
        <div className="container-ares pb-24 lg:pb-32">
          <div className={`grid overflow-hidden md:grid-cols-2 ${CARD}`}>
            <div className="aspect-[4/3] md:aspect-auto">
              <img
                src="/images/careers-team.jpg"
                alt="Officer in a Security shirt training at an indoor firing range"
                width={1184}
                height={880}
                loading="lazy"
                className="h-full w-full object-cover grayscale"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-14">
              <h2 className="font-normal text-white" style={DISPLAY_MD}>Now hiring officers</h2>
              <p className="mt-5 max-w-[34rem] text-[16px] leading-6 text-mute">
                Armed, unarmed, cleared, and office roles, with paid training and real room to grow. Veterans are encouraged to apply.
              </p>
              <div className="mt-8">
                <Link to="/careers" className={PILL_OUTLINE}>See Open Roles</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section>
        <div className="container-ares">
          <div className="border-t border-hairline py-24 text-center lg:py-32">
            <h2 className="font-normal text-balance text-white" style={DISPLAY_XL}>Tell us about your site.</h2>
            <a href="tel:+17196963966" className={`mt-10 inline-block font-mono text-[24px] tracking-[0.02em] text-white hover:text-white sm:text-[28px] ${FOCUS}`}>
              719-696-3966
            </a>
            <div className="mt-2">
              <a href="mailto:contact@aressecurity.co" className={`text-[16px] text-mute hover:text-white ${FOCUS}`}>
                contact@aressecurity.co
              </a>
            </div>
            <div className="mt-10 flex justify-center">
              <Link to="/contact" className={PILL_FILLED}>Request a Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SpecPlate({ title, rows }: { title: string; rows: SpecRow[] }) {
  return (
    <div className={`p-6 lg:p-8 ${CARD}`}>
      <h3 className="text-[20px] font-normal leading-7 text-white">{title}</h3>
      <dl className="m-0 mt-6">
        {rows.map((row) => (
          <PlateRow key={row.k} row={row} />
        ))}
      </dl>
    </div>
  );
}

// One label/value row: mono caps label left, value right, hairline above.
function PlateRow({ row }: { row: SpecRow }) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-hairline py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <dt className={`shrink-0 ${MONO_LABEL}`}>{row.k}</dt>
      <dd className="m-0 sm:text-right">
        <span className={row.mono ? 'font-mono text-[15px] tracking-[0.02em] text-white' : 'text-[15px] leading-6 text-white'}>
          {row.href ? (
            <a
              href={row.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white ${FOCUS}`}
            >
              {row.v}
              <span aria-hidden="true" className="ml-1 font-sans">↗</span>
              <span className="sr-only"> (opens GSA eLibrary in a new tab)</span>
            </a>
          ) : (
            row.v
          )}
        </span>
        {row.sub && <span className="mt-0.5 block text-[13px] leading-5 text-mute">{row.sub}</span>}
      </dd>
    </div>
  );
}
