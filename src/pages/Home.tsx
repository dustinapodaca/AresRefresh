import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/FlowArrow';

// Home as one continuous dark document (DESIGN.md). Pass 2's Framer world,
// re-flowed: no background bands or card grids; sections hand off through
// their closing lines; a document rail tracks the reader; the hero photo
// runs under the nav and into the ledger; Contact closes on a monochrome
// light field with one glass panel; scroll-driven motion lives in index.css
// under "HOME FLOW" and is static by default.
// Every link sets its own text color: the base `a:hover` rule paints ink,
// which would vanish on this canvas.

const GSA_ELIBRARY_URL =
  'https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES';

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal';
const PILL_PRIMARY = `pill pill-lg pill-primary ${FOCUS}`;
const PILL_SECONDARY = `pill pill-lg pill-secondary ${FOCUS}`;
const CONTENT = 'container-ares lg:[&>*]:ml-[220px]';

const DISPLAY_XL: React.CSSProperties = { fontSize: 'clamp(40px, 6.4vw, 92px)', lineHeight: 0.98, letterSpacing: '-0.045em' };
const DISPLAY_LG: React.CSSProperties = { fontSize: 'clamp(34px, 4.2vw, 60px)', lineHeight: 1.02, letterSpacing: '-0.04em' };
const DISPLAY_MD: React.CSSProperties = { fontSize: 'clamp(26px, 2.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.03em' };

const SECTIONS = [
  { id: 'verify', n: '01', label: 'Verify' },
  { id: 'staffing', n: '02', label: 'Staffing' },
  { id: 'coverage', n: '03', label: 'Coverage' },
  { id: 'careers', n: '04', label: 'Company' },
  { id: 'contact', n: '05', label: 'Contact' },
];

// The ledger, grouped the way a contracting officer checks a vendor. Every
// value already appears on the Capability Statement page or in the approved
// Home copy. The last group puts the capability statement inside the proof.
type LedgerRow = { k: string; v: string; note?: string; href?: string; internal?: boolean; mono?: boolean };
const LEDGER_GROUPS: { title: string; rows: LedgerRow[] }[] = [
  {
    title: 'Contract vehicle',
    rows: [
      { k: 'GSA MAS contract', v: '47QSMS25D009Q', note: 'Pre-negotiated pricing. Task orders without a new competition.', href: GSA_ELIBRARY_URL, mono: true },
      { k: 'SIN', v: '561612', note: 'Security Services', mono: true },
    ],
  },
  {
    title: 'Federal registration',
    rows: [
      { k: 'UEI', v: 'XQXDN6E33SF4', note: 'Unique Entity Identifier, SAM.gov', mono: true },
      { k: 'CAGE code', v: '9KL18', note: 'Commercial and Government Entity', mono: true },
      { k: 'Primary NAICS', v: '561612', note: 'Security Guards & Patrol Services', mono: true },
    ],
  },
  {
    title: 'Ownership and certification',
    rows: [
      { k: 'Ownership', v: 'Minority woman-owned', note: 'WOSB and WBENC certified' },
      { k: 'WOSB certification', v: 'WOSB250470', note: 'Set-aside eligible', mono: true },
      { k: 'WBENC certification', v: 'WBE2303571', note: "Women's Business Enterprise", mono: true },
      { k: 'Founded', v: '2021', note: 'Colorado Springs, CO', mono: true },
    ],
  },
  {
    title: 'Documents',
    rows: [
      { k: 'Capability statement', v: 'Read the statement', note: 'Every number above, on one page', href: '/capability-statement', internal: true },
    ],
  },
];

const STEPS = [
  {
    h: 'Planned before the contract',
    p: 'We learn your site, operations, and risks before anything is signed, so the plan fits how your facility runs.',
  },
  {
    h: 'Trained on site by leadership',
    p: 'Before their first shift, every officer is trained on your post by a leader who has worked that exact post.',
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

const AREAS = [
  { to: '/locations/colorado-springs', label: 'Colorado Springs' },
  { to: '/locations/denver', label: 'Denver' },
  { to: '/locations/pueblo', label: 'Pueblo' },
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

// "Get to know Ares" (rail: 04 Company): Pass 3-final's three photo panels, in its order and
// wording (About Us, Services, Careers; wide lead first), opened up for the
// flow: no card fills, image edge plus type only.
const PANELS = [
  {
    to: '/about',
    title: 'About Us',
    body: 'Our story, our principles, and the people behind every post.',
    cta: 'About Ares',
    src: '/images/about-sunset.jpg',
    alt: 'Denver skyline at sunset with the Front Range behind it',
    w: 1400,
    h: 805,
    lead: true,
  },
  {
    to: '/services',
    title: 'Services',
    body: 'Six service divisions across federal, commercial, industrial, and specialized sites.',
    cta: 'View Services',
    src: '/images/about-security.jpg',
    alt: 'Two Ares Security officers seen from behind, Security printed across their shirts',
    w: 1408,
    h: 736,
    lead: false,
  },
  {
    to: '/careers',
    title: 'Careers',
    body: 'Armed, unarmed, cleared, and office roles with paid training. Veterans are encouraged to apply.',
    cta: 'See Open Roles',
    src: '/images/careers-team.jpg',
    alt: 'Officer in a Security shirt training at an indoor firing range',
    w: 1184,
    h: 880,
    lead: false,
  },
];

export default function Home() {
  const docRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>('verify');
  const [docVisible, setDocVisible] = useState(false);

  // Theme the browser surfaces (scrollbar, selection, overscroll) while Home
  // is mounted.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.surface = 'dark';
    return () => {
      delete root.dataset.surface;
    };
  }, []);

  // Rail state: the active section is the last one (in page order) whose
  // top has crossed 40% of the viewport. Observer callbacks only trigger the
  // check; positions are read fresh each time, so fast scrolls and jumps
  // cannot leave the rail on a stale section.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const sync = () => {
      const line = window.innerHeight * 0.4;
      let current = SECTIONS[0].id;
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      });
      setActive(current);
    };
    const sectionIo = new IntersectionObserver(sync, {
      rootMargin: '0px 0px -60% 0px',
      threshold: [0, 1],
    });
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) sectionIo.observe(el);
    });
    const docIo = new IntersectionObserver(([e]) => {
      setDocVisible(e.isIntersecting);
    }, {
      rootMargin: '-40% 0px -40% 0px',
    });
    if (docRef.current) docIo.observe(docRef.current);
    return () => {
      sectionIo.disconnect();
      docIo.disconnect();
    };
  }, []);

  const activeIndex = Math.max(0, SECTIONS.findIndex((s) => s.id === active));

  return (
    <main
      className="bg-canvas text-ink-muted"
      style={{ fontFeatureSettings: '"cv01", "cv05", "cv09", "cv11", "ss03"' }}
    >
      <Seo path="/" />

      {/* Hero: the photograph runs to the top of the page under the nav,
          with a black gradient coming down from the bar; the GSA contract
          mark balances the headline. */}
      <section className="relative isolate overflow-clip">
        <img
          src="/images/hero6.webp"
          alt=""
          width={1920}
          height={1280}
          className="flow-hero-photo absolute inset-0 -z-10 h-full w-full object-cover object-[center_60%] [filter:brightness(0.6)] [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.06)_14%,rgba(0,0,0,0.28)_34%,rgba(0,0,0,0.7)_54%,#000_68%,rgba(0,0,0,0.7)_84%,transparent_100%)]"
        />
        <div className="container-ares pt-36 pb-[38vh] lg:pt-44 lg:pb-[52vh]">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
            <div>
              <h1 className="max-w-[17ch] font-semibold text-balance text-white" style={DISPLAY_XL}>
                Security guards for federal and commercial sites.
              </h1>
              <p className="mt-8 max-w-[34rem] text-[18px] leading-[1.5] tracking-[-0.01em] text-white">
                A minority woman-owned, employee-focused firm serving Colorado Springs, Denver, and Pueblo since 2021.
              </p>
            </div>
            <a
              href={GSA_ELIBRARY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`flow-link group flex w-fit flex-col items-start gap-3 self-start justify-self-center rounded-[15px] border border-white/10 bg-canvas/75 px-6 py-5 text-white hover:border-white/25 hover:text-white lg:mt-3 lg:justify-self-end ${FOCUS}`}
            >
              <img
                src="/images/gsa-contract-holder.png"
                alt="GSA Contract Holder"
                width={576}
                height={138}
                className="block h-auto w-[220px]"
              />
              <span className="inline-flex items-center gap-1.5 border-t border-white/10 pt-3 font-mono text-[14px] tracking-[0.01em] tabular-nums">
                <span className="text-white/70">GSA MAS</span> 47QSMS25D009Q
                <Arrow diag className="h-3.5 w-3.5" />
              </span>
              <span className="sr-only">(opens GSA eLibrary in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      {/* The document: everything the rail tracks */}
      <div ref={docRef} className="flow-doc relative">
        {/* Desktop rail */}
        <nav
          aria-label="Page sections"
          className={`pointer-events-none absolute inset-0 z-20 hidden transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] lg:block ${docVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="container-ares relative h-full">
            {/* The frame line: one hairline through the whole document, with
                the reading progress drawn along it */}
            <span aria-hidden="true" className="absolute top-0 bottom-0 left-7 w-px bg-hairline" />
            <span aria-hidden="true" className="flow-rail-fill absolute top-0 bottom-0 left-7 w-px bg-white/70" />
            <div className="pointer-events-auto sticky top-32 w-[160px]">
              <div className="relative pl-5">
                <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        aria-current={active === s.id ? 'location' : undefined}
                        className={`flex gap-3 font-mono text-[12px] leading-4 tracking-[0.02em] transition-colors duration-200 ${active === s.id ? 'text-white hover:text-white' : 'text-ink-muted hover:text-white'} ${FOCUS}`}
                      >
                        <span>{s.n}</span>
                        <span>{s.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile rail: current section and progress under the header */}
        <div
          aria-hidden="true"
          className={`fixed inset-x-0 top-[92px] z-40 border-b border-hairline bg-canvas transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden ${docVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <div className="container-ares flex h-9 items-center justify-between font-mono text-[12px]">
            <span className="text-white">
              {SECTIONS[activeIndex].n} {SECTIONS[activeIndex].label}
            </span>
            <span>{activeIndex + 1} of {SECTIONS.length}</span>
          </div>
          <div className="relative h-px">
            <span className="flow-progress-fill absolute inset-0 bg-white" />
          </div>
        </div>

        {/* 01 Verify: the ledger rises over the hero photograph */}
        <section id="verify" className="relative z-10 -mt-[16vh] scroll-mt-32 lg:-mt-[24vh]">
          <div className={CONTENT}>
            <div>
              <h2 className="max-w-[18ch] font-semibold text-white" style={DISPLAY_LG}>
                Everything you need to verify us.
              </h2>
              <p className="mt-5 max-w-[46ch] text-[18px] leading-[1.5]">
                Contract, registration, and certification numbers in one place. The GSA contract number links to the government’s own listing.
              </p>

              <table className="mt-12 w-full border-collapse text-left max-sm:block">
                <caption className="sr-only">Ares Security contract, registration, and certification record</caption>
                <thead className="max-lg:sr-only">
                  <tr>
                    <th scope="col" className="w-[22%] pb-3 pr-6 font-mono text-[12px] font-normal text-ink-muted">Group</th>
                    <th scope="col" className="w-[20%] pb-3 pr-6 font-mono text-[12px] font-normal text-ink-muted">Item</th>
                    <th scope="col" className="w-[24%] pb-3 pr-6 font-mono text-[12px] font-normal text-ink-muted">Number</th>
                    <th scope="col" className="pb-3 font-mono text-[12px] font-normal text-ink-muted">Detail</th>
                  </tr>
                </thead>
                {LEDGER_GROUPS.map((group) => (
                  <tbody key={group.title} className="border-t border-white/20 max-sm:block">
                    {group.rows.map((row, i) => (
                      <tr key={row.k} className="flow-ledger-row max-sm:grid max-sm:gap-1 max-sm:py-4">
                        {i === 0 && (
                          <th
                            scope="rowgroup"
                            rowSpan={group.rows.length}
                            className="py-4 pr-6 align-top text-[15px] font-medium text-white max-lg:hidden"
                          >
                            {group.title}
                          </th>
                        )}
                        <th scope="row" className="py-4 pr-6 align-baseline text-[15px] font-normal text-ink-muted max-sm:p-0">
                          {i === 0 && (
                            <span className="mb-2 block text-[13px] font-medium text-white lg:hidden">{group.title}</span>
                          )}
                          {row.k}
                        </th>
                        <td className={`py-4 pr-6 align-baseline text-white max-sm:p-0 ${row.mono ? 'font-mono text-[16px] tracking-[0.01em] tabular-nums' : 'text-[16px]'}`}>
                          {row.href && row.internal ? (
                            <Link to={row.href} className={`flow-link inline-flex items-center gap-1.5 text-signal hover:text-white ${FOCUS}`}>
                              {row.v}
                              <Arrow className="h-3.5 w-3.5" />
                            </Link>
                          ) : row.href ? (
                            <a
                              href={row.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flow-link inline-flex items-center gap-1.5 text-signal hover:text-white ${FOCUS}`}
                            >
                              {row.v}
                              <Arrow diag className="h-3.5 w-3.5" />
                              <span className="sr-only"> (opens GSA eLibrary in a new tab)</span>
                            </a>
                          ) : (
                            row.v
                          )}
                        </td>
                        <td className="py-4 align-baseline text-[14px] leading-[1.45] text-ink-muted max-md:hidden max-sm:block max-sm:p-0">
                          {row.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>

              {/* The measured figure with its caption on the same baseline */}
              <div className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-12 lg:items-end">
                <p
                  className="font-mono font-normal text-white tabular-nums lg:col-span-6"
                  style={{ fontSize: 'clamp(96px, 15vw, 220px)', lineHeight: 0.85, letterSpacing: '-0.06em' }}
                >
                  &lt;1%
                </p>
                <div className="lg:col-span-6 lg:pb-2">
                  <p className="text-[18px] leading-[1.45] text-white">Missed shifts since 2021.</p>
                  <p className="mt-1 text-[16px] leading-[1.5]">On-call scheduling is standard in every contract.</p>
                  <p className="mt-8 max-w-[26ch] text-[22px] leading-[1.3] font-semibold tracking-[-0.02em] text-white">
                    That record comes down to how each post is staffed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 Staffing: open quote, then the pinned photo and advancing steps */}
        <section id="staffing" className="relative scroll-mt-32 pt-28 lg:pt-40">
          <div className={CONTENT}>
            <div>
              <figure className="m-0 grid gap-6 lg:grid-cols-12 lg:gap-10">
                <blockquote className="m-0 lg:order-2 lg:col-span-9">
                  <p className="font-medium text-white lg:-indent-[0.4em]" style={DISPLAY_MD}>
                    “Ares arrived prepared. Their documentation was cleaner than the incumbent’s from day one.”
                  </p>
                </blockquote>
                <figcaption className="border-t border-hairline pt-4 text-[14px] leading-5 lg:order-1 lg:col-span-3">
                  <span className="font-medium text-white">Contracting Officer</span>
                  <span className="block">USAF · Buckley Space Force Base</span>
                </figcaption>
              </figure>

              <h2 className="mt-24 max-w-[20ch] font-semibold text-balance text-white lg:mt-32" style={DISPLAY_LG}>
                Every officer is trained on your post by a leader who has worked it.
              </h2>

              <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <div className="aspect-[4/3] overflow-hidden rounded-[15px] border border-hairline lg:aspect-[4/5]">
                    <img
                      src="/images/backbone-officer.jpg"
                      alt="Smiling Ares Security officer in a black Ares Security polo shirt, standing against a brick wall"
                      width={733}
                      height={900}
                      loading="lazy"
                      className="h-full w-full object-cover object-[center_20%]"
                    />
                  </div>
                </div>
                <div>
                  {/* Steps on one line: the line fills as the reader moves
                      through them (CSS scroll timeline, static when off) */}
                  <ol className="flow-steps relative m-0 list-none p-0 pl-8 lg:pl-10">
                    <span aria-hidden="true" className="absolute top-3 bottom-3 left-[3px] w-px bg-hairline" />
                    <span aria-hidden="true" className="flow-steps-fill absolute top-3 bottom-3 left-[3px] w-px bg-white" />
                    {STEPS.map((step, i) => (
                      <li
                        key={step.h}
                        className="flow-step py-7 lg:flex lg:min-h-[22vh] lg:flex-col lg:justify-center lg:py-8"
                      >
                        <h3 className="relative text-[24px] leading-[1.25] font-semibold tracking-[-0.02em] text-white lg:text-[28px]">
                          <span
                            aria-hidden="true"
                            className="absolute top-[0.5em] left-[-33px] h-[7px] w-[7px] -translate-y-1/2 rounded-full border border-white/50 bg-canvas lg:left-[-41px]"
                          />
                          <span className="mr-3 font-mono text-[14px] font-normal tracking-normal text-ink-muted tabular-nums lg:text-[15px]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {step.h}
                        </h3>
                        <p className="mt-3 max-w-[40ch] text-[17px] leading-[1.55]">{step.p}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="border-t border-hairline pt-6 text-[15px] leading-[1.5]">
                    Veteran supervisors on staff, and our NRA firearms instructor is a veteran.
                  </p>
                </div>
              </div>

              <p className="mt-20 max-w-[24ch] font-medium text-white lg:mt-28 lg:ml-auto lg:mr-[8%]" style={DISPLAY_MD}>
                We staff posts like this in three metro areas, across six kinds of sites.
              </p>
            </div>
          </div>
        </section>

        {/* 03 Coverage: tight typographic lists */}
        <section id="coverage" className="relative scroll-mt-32 pt-20 lg:pt-24">
          <div className={CONTENT}>
            <div>
              <h2 className="font-medium text-white" style={DISPLAY_MD}>Where we work</h2>
              <ul className="m-0 mt-6 list-none border-t border-hairline p-0">
                {AREAS.map((a) => (
                  <li key={a.to} className="border-b border-hairline">
                    <Link
                      to={a.to}
                      className={`flow-link group flex items-center justify-between gap-6 py-5 text-white hover:text-white lg:py-6 ${FOCUS}`}
                    >
                      <span className="font-semibold" style={DISPLAY_LG}>{a.label}</span>
                      <Arrow className="h-7 w-7 text-ink-muted group-hover:text-white lg:h-9 lg:w-9" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
                <div>
                  <h3 className="text-[22px] leading-[1.25] font-semibold tracking-[-0.02em] text-white">Six service divisions</h3>
                  <Link
                    to="/services"
                    className={`flow-link mt-3 inline-flex items-center gap-1.5 text-[15px] font-medium text-signal hover:text-white ${FOCUS}`}
                  >
                    All services <Arrow className="h-4 w-4" />
                  </Link>
                </div>
                <ul className="m-0 grid list-none gap-x-10 p-0 sm:grid-cols-2">
                  {DIVISIONS.map((d) => (
                    <li key={d} className="border-t border-hairline py-3.5 text-[16px] leading-[1.4] text-white">{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Full-bleed photograph closing Coverage (inside the section so the
              rail never loses its place); the next headline crosses its lower edge */}
          <div aria-hidden="true" className="relative mt-24 h-[46vh] min-h-[300px] overflow-clip lg:mt-32 lg:h-[64vh]">
            <img
              src="/images/about-hero.jpg"
              alt=""
              width={2400}
              height={1600}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[center_55%] [filter:brightness(0.6)_saturate(0.85)] [mask-image:linear-gradient(180deg,transparent_0%,#000_28%,rgba(0,0,0,0.75)_70%,transparent_100%)]"
            />
          </div>
        </section>

        {/* 04 Company: "Get to know Ares" panels */}
        <section id="careers" className="relative z-10 -mt-[12vh] scroll-mt-32 lg:-mt-[18vh]">
          <div className={CONTENT}>
            <div>
              <h2 className="font-semibold text-white" style={DISPLAY_LG}>Get to know Ares</h2>
              <div className="mt-12 grid gap-x-8 gap-y-14 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]">
                {PANELS.map((p) => (
                  <Link key={p.to} to={p.to} className={`flow-link group flex flex-col text-white hover:text-white ${FOCUS}`}>
                    <div className="h-60 overflow-hidden rounded-[15px] border border-hairline lg:h-80">
                      <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <h3
                      className="mt-6 font-semibold text-white"
                      style={p.lead ? DISPLAY_MD : { fontSize: 22, lineHeight: 1.25, letterSpacing: '-0.02em' }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-[44ch] text-[16px] leading-[1.55] text-ink-muted">{p.body}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-signal group-hover:text-white">
                      {p.cta} <Arrow className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>

              <p className="mt-20 max-w-[30ch] border-l border-white/20 pl-5 text-[20px] leading-[1.35] font-medium tracking-[-0.015em] text-white lg:mt-24">
                Every quote starts with a conversation about your site.
              </p>
            </div>
          </div>
        </section>

        {/* 05 Contact: monochrome light field with a glass panel; the
            headline rises out of the field's top edge */}
        <section id="contact" className="relative isolate scroll-mt-32 pt-28 pb-28 lg:pt-40 lg:pb-40">
          <div aria-hidden="true" className="flow-field pointer-events-none absolute inset-x-0 top-0 bottom-0 -z-10" />
          <div className={CONTENT}>
            <div>
              <h2 className="max-w-[14ch] font-semibold text-balance text-white" style={DISPLAY_XL}>
                Tell us about your site.
              </h2>
              <div className="flow-glass mt-12 grid gap-8 rounded-[20px] p-7 sm:p-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:p-12">
                <div>
                  <a
                    href="tel:+17196963966"
                    className={`block font-mono text-[30px] tracking-[-0.01em] text-white tabular-nums hover:text-white sm:text-[44px] ${FOCUS}`}
                  >
                    719-696-3966
                  </a>
                  <a href="mailto:contact@aressecurity.co" className={`mt-2 inline-block text-[17px] text-white/70 hover:text-white ${FOCUS}`}>
                    contact@aressecurity.co
                  </a>
                </div>
                <div className="grid gap-2.5 sm:flex sm:flex-wrap">
                  <Link to="/contact" className={PILL_PRIMARY}>
                    Request a Quote <Arrow className="h-4 w-4" />
                  </Link>
                  <Link to="/capability-statement" className={PILL_SECONDARY}>Capability Statement</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
