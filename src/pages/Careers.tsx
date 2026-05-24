import { Link } from 'react-router-dom';
import ArrowBtn from '../components/ArrowBtn';
import ImageSlot from '../components/ImageSlot';
import { useScrollInViewObserver } from '../hooks/useScrollInViewObserver';

const ROLES = [
  {
    n: "01",
    title: "Armed Security Officer",
    body: "Licensed armed posts at high-value commercial and public-sector sites. Range training provided for licensing.",
    pill: "Armed",
    armed: true,
    loc: "Colo. Springs | Denver | Pueblo",
  },
  {
    n: "02",
    title: "Unarmed Security Officer",
    body: "Posted and patrol coverage for retail, industrial, and institutional sites. Customer-facing standard.",
    pill: "Unarmed",
    loc: "Colo. Springs | Denver | Pueblo",
  },
  {
    n: "03",
    title: "TS Cleared Security Escort",
    body: "Restricted-access escort coverage for federal facilities. Active clearance or ability to obtain one required.",
    pill: "Cleared",
    armed: true,
    loc: "Denver",
  },
];

const BENEFITS: { h: string; p: string; icon: React.ReactNode }[] = [
  { h: 'Real Voice on Site', p: 'Officers brief leadership directly. Concerns about a post are heard the same day, not bottled up in a chain that ends nowhere.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg> },
  { h: 'Growth Beyond the Post', p: 'Pathways into ops, scheduling, training, account management, and marketing. We promote from inside before we hire outside.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg> },
  { h: 'Veteran-Friendly', p: "Military discipline carries weight here. Briefings, hand-offs, and after-action reports run to a standard you'll recognize.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/></svg> },
  { h: 'Paid Training & Cert Renewals', p: 'State certifications and firearms qualifications kept current on company time. No out-of-pocket renewals.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg> },
];

export default function Careers() {
  useScrollInViewObserver();

  return (
    <main className="font-sans">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink pt-[280px] pb-[140px] text-paper max-[460px]:pt-[210px] max-[460px]:pb-[105px]">
        <div className="hero-gradient absolute inset-0 -z-10">
          <img src="/images/careers-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(31,31,31,0.85)_0%,rgba(31,31,31,0.55)_45%,rgba(31,31,31,0.3)_100%),linear-gradient(180deg,rgba(31,31,31,0.4)_0%,rgba(31,31,31,0.15)_50%,rgba(31,31,31,0.55)_100%)]" />
        </div>
        <div className="container-ares">
          <ol className="reveal m-0 mb-6 flex list-none gap-2 p-0 text-[13px] uppercase tracking-[0.14em] text-paper/65">
            <li><Link to="/">Home</Link></li>
            <li className="text-paper/40">/</li>
            <li className="text-paper">Careers</li>
          </ol>
          <h1 className="reveal-d1 m-0 font-normal text-paper" style={{ fontSize: 'clamp(48px, 7vw, 84px)', lineHeight: 0.92, letterSpacing: '-0.06em' }}>
            Join Our <span className="font-light italic text-light">Team.</span>
          </h1>
          <p className="reveal-d2 mt-6 max-w-[62ch] text-[20px] text-paper/75">
            Disciplined work, fair pay, real career growth. At Ares, you're more than a security guard — you're part of a team that runs to a federal standard and treats its people that way.
          </p>

          <div className="reveal-d3 mt-12 flex flex-wrap items-end gap-9 border-t border-white/15 pt-8">
            <a href="https://www.indeed.com/cmp/Ares-Security-1/reviews" target="_blank" rel="noopener noreferrer" className="flex flex-col text-paper transition-transform hover:-translate-y-0.5">
              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-[36px] font-bold leading-none text-paper tracking-tight">4.8</span>
                <span className="inline-flex items-center gap-0.5 text-paper">
                  {[0, 1, 2, 3].map((i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  {/* 5th star: filled to ~80% via a gradient with a hard stop at 80% —
                      left 80% is full white, right 20% drops to a dim "empty" tone so
                      the row reads as 4.8 / 5 rather than 4 / 5. */}
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                    <defs>
                      <linearGradient id="indeed-star-08" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="80%" stopColor="currentColor" />
                        <stop offset="80%" stopColor="currentColor" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#indeed-star-08)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/60">
                Indeed Rating <span className="opacity-70">↗</span>
              </span>
            </a>
            <Stat big="100%" lbl="Licensed Officers" />
            <Stat big="VET" lbl="Veteran-Friendly" />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section>
        <Spacer />
        <div className="container-ares">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-[2rem] bg-paper-2 lg:aspect-auto lg:min-h-[520px]">
              <img src="/images/careers-philosophy.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="brackets-title mb-4">SECTION 01 · PHILOSOPHY</h3>
              <h2 className="mb-6 max-w-[14ch] text-display-lg text-ink">
                YOU GROW <span className="font-light italic text-mid">with us.</span>
              </h2>
              <p className="mb-6 max-w-[54ch] text-[18px] text-ink-2">
                Our philosophy is simple — the well-being of our employees is most important to us. We believe that happy and healthy employees are the foundation of a great company, and that balance between work, play, and rest is a must.
              </p>
              <p className="mb-6 max-w-[54ch] text-[18px] text-ink-2">
                At Ares, you are more than just a security guard. You’ll have real opportunities to explore a variety of security roles that match your skills and interests — whether customer-service oriented, technical, overnight, or other operational assignments. As the company grows, we’re committed to helping you grow too.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#apply" className="btn btn-primary">Apply Now</a>
              </div>
            </div>
          </div>
        </div>
        <Spacer />
      </section>

      {/* Why Ares */}
      <section className="bg-paper-2">
        <Spacer />
        <div className="container-ares">
          <h3 className="brackets-title mb-4">SECTION 02 · WHY ARES</h3>
          <h2 className="mb-12 text-display-lg text-ink">
            FOUR REASONS PEOPLE <span className="font-light italic text-mid">STAY.</span>
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <article key={b.h} data-scroll-active data-in-view="false" className="flex flex-col gap-4 rounded-2xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)] max-[460px]:data-[in-view=true]:-translate-y-1 max-[460px]:data-[in-view=true]:border-ink max-[460px]:data-[in-view=true]:shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
                  {b.icon}
                </div>
                <h3 className="m-0 text-[19px] font-bold leading-tight text-ink">{b.h}</h3>
                <p className="text-[14px] leading-relaxed text-ink-2">{b.p}</p>
              </article>
            ))}
          </div>
        </div>
        <Spacer />
      </section>

      {/* Open Roles */}
      <section id="roles">
        <Spacer />
        <div className="container-ares">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
            <div>
              <h3 className="brackets-title mb-4">SECTION 03 · ARES ROLES</h3>
              <h2 className="text-display-lg text-ink">
                WHO WE <span className="font-light italic text-mid">HIRE.</span>
              </h2>
            </div>
            <p className="text-right text-[14px] uppercase tracking-[0.14em] text-mid">
              ↳ Colorado Springs<br />Denver · Pueblo
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {ROLES.map((r) => (
              <article key={r.n} data-scroll-active data-in-view="false" className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 rounded-2xl border border-line bg-paper p-8 transition-all duration-300 hover:translate-x-1 hover:border-ink hover:shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)] max-[460px]:data-[in-view=true]:translate-x-1 max-[460px]:data-[in-view=true]:border-ink max-[460px]:data-[in-view=true]:shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)] lg:grid-cols-[80px_1fr_auto] lg:gap-x-6 lg:gap-y-2">
                {/* Number — top-left on mobile, col 1 row 1 on desktop */}
                <div className="text-[36px] font-bold leading-none tracking-tight text-ink lg:col-start-1 lg:row-start-1">{r.n}</div>

                {/* Pill — top-right on mobile (across from number), col 3 row 1 on desktop */}
                <span className={`justify-self-end whitespace-nowrap lg:col-start-3 lg:row-start-1 ${r.armed ? 'pill-glass pill-glass-armed' : 'pill-glass'}`}>{r.pill}</span>

                {/* Title + (mobile-only) location + body — spans both mobile cols, col 2 spanning both rows on desktop */}
                <div className="col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:row-span-2">
                  <h3 className="m-0 mb-1.5 text-[22px] font-bold uppercase leading-tight tracking-tight text-ink">{r.title}</h3>
                  <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-mid lg:hidden">{r.loc}</span>
                  <p className="m-0 max-w-[54ch] text-[14px] leading-relaxed text-ink-2">{r.body}</p>
                </div>

                {/* Location — desktop only, col 3 row 2 directly under the pill (right-aligned) */}
                <span className="hidden whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-mid lg:col-start-3 lg:row-start-2 lg:block lg:justify-self-end lg:text-right">{r.loc}</span>
              </article>
            ))}
          </div>
        </div>
        <Spacer />
      </section>

      {/* Apply CTA card */}
      <section id="apply" className="relative pt-10 pb-[120px]">
        <div className="absolute inset-x-0 bottom-0 z-0 h-1/2 bg-paper-2" />
        <div className="container-ares">
          <div className="relative z-10 min-h-[480px] overflow-hidden rounded-[2rem] bg-ink shadow-[0_40px_80px_-32px_rgba(31,31,31,0.45),0_16px_32px_-16px_rgba(31,31,31,0.25)] lg:aspect-[16/8]">
            <div className="absolute inset-0 -z-10">
              <img src="/images/careers-apply.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(31,31,31,0.15)_0%,rgba(31,31,31,0.4)_40%,rgba(31,31,31,0.85)_100%)]" />

            {/* Pills strip — reserves right padding for the absolutely-positioned arrow */}
            <div className="absolute inset-x-6 top-6 flex flex-wrap gap-2 pr-[88px] sm:inset-x-8 sm:top-8">
              {['Armed', 'Unarmed', 'Cleared', 'Office & Field'].map((t) => (
                <a key={t} href="#roles" className="inline-flex items-center rounded-full border-[1.5px] border-white/50 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium tracking-wide text-paper backdrop-blur-md transition-all hover:bg-paper hover:text-ink hover:border-paper sm:px-5 sm:py-2.5 sm:text-[13px]">{t}</a>
              ))}
            </div>

            {/* Arrow — fixed in the top-right corner of the card on every viewport */}
            <ArrowBtn variant="lg" href="mailto:careers@aressecurity.co" ariaLabel="Email careers" className="absolute right-6 top-6 sm:right-8 sm:top-8" />

            <div className="absolute inset-x-6 bottom-6 flex flex-col items-start gap-4 sm:inset-x-12 sm:bottom-12 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
              <h2 className="m-0 font-normal text-paper" style={{ fontSize: 'clamp(24px, 7vw, 80px)', lineHeight: 0.92, letterSpacing: '-0.06em' }}>
                We Grow <em className="italic font-light text-pale">Together.</em><br />Apply Now.
              </h2>
              <a href="mailto:careers@aressecurity.co" className="btn btn-glass max-w-full px-5 py-3 text-[12px] normal-case tracking-normal sm:px-8 sm:py-[18px] sm:text-[14px]">careers@aressecurity.co</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ big, lbl }: { big: string; lbl: string }) {
  return (
    <div>
      <div className="mb-1 text-[36px] font-bold leading-none text-paper">{big}</div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/60">{lbl}</div>
    </div>
  );
}

function Spacer() { return <div className="h-25" />; }
