import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';
import { useScrollInViewObserver } from '../hooks/useScrollInViewObserver';

/**
 * Shared shell for the location and service landing pages.
 *
 * Mirrors the hero/section/CTA rhythm of the hand-built pages (Careers,
 * Services) so the new routes read as native rather than bolted on. Each
 * page supplies only its own copy, which keeps the COPY-REVIEW blocks in
 * one obvious place per file.
 */

export type Section = {
  kicker: string;
  heading: string;
  /** One or more paragraphs. */
  body: string[];
  /** Optional checklist rendered under the paragraphs. */
  bullets?: string[];
};

type Props = {
  /** Route key into src/seo/routes.json. */
  path: string;
  /** Breadcrumb trail between Home and this page. */
  crumb: { label: string; to: string };
  /** Breadcrumb label for the current page. */
  crumbCurrent: string;
  /** Hero H1, split so the second half takes the italic accent treatment. */
  h1: { lead: string; accent: string };
  lede: string;
  heroImage: string;
  sections: Section[];
  /** Renders the shared four-stage deployment strip. */
  showProcess?: boolean;
  ctaHeading: { lead: string; accent: string };
  ctaBody: string;
};

const STAGES = [
  { n: '01', t: 'Technical Audit', p: 'We walk the site and document what the post actually requires.' },
  { n: '02', t: 'Compliance Mapping', p: 'Licensing, qualifications, and post orders mapped before anyone is scheduled.' },
  { n: '03', t: 'Guard Training', p: 'Officers trained on your site, on your orders, before their first shift.' },
  { n: '04', t: 'Deployment', p: 'Leadership works the first shift, then hands off to a steady roster.' },
];

export default function LandingLayout({
  path, crumb, crumbCurrent, h1, lede, heroImage, sections, showProcess, ctaHeading, ctaBody,
}: Props) {
  useScrollInViewObserver();

  return (
    <main className="font-sans">
      <Seo path={path} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink pt-[280px] pb-[140px] text-paper max-[460px]:pt-[210px] max-[460px]:pb-[105px]">
        <div className="hero-gradient absolute inset-0 -z-10">
          <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(31,31,31,0.85)_0%,rgba(31,31,31,0.55)_45%,rgba(31,31,31,0.3)_100%),linear-gradient(180deg,rgba(31,31,31,0.4)_0%,rgba(31,31,31,0.15)_50%,rgba(31,31,31,0.55)_100%)]" />
        </div>
        <div className="container-ares">
          <ol className="reveal m-0 mb-6 flex list-none flex-wrap gap-2 p-0 text-[13px] uppercase tracking-[0.14em] text-paper/65">
            <li><Link to="/">Home</Link></li>
            <li className="text-paper/40">/</li>
            <li><Link to={crumb.to}>{crumb.label}</Link></li>
            <li className="text-paper/40">/</li>
            <li className="text-paper">{crumbCurrent}</li>
          </ol>
          <h1
            className="reveal-d1 m-0 font-normal text-paper"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 0.94, letterSpacing: '-0.06em' }}
          >
            {h1.lead} <span className="font-light italic text-light">{h1.accent}</span>
          </h1>
          {/* COPY-REVIEW */}
          <p className="reveal-d2 mt-6 max-w-[62ch] text-[20px] text-paper/75">{lede}</p>
        </div>
      </section>

      {/* Content sections */}
      {sections.map((s, i) => (
        <section key={s.heading} className={i % 2 === 1 ? 'bg-[#E5E4E1]' : 'bg-paper'}>
          <div className="container-ares py-[90px] max-[991px]:py-[64px]">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mid" data-reveal="up">
                  {s.kicker}
                </div>
                <h2
                  className="mt-4 text-ink"
                  style={{ fontSize: 'clamp(30px, 3.6vw, 44px)', fontWeight: 400, letterSpacing: '-0.05em', lineHeight: 1.02, textTransform: 'none' }}
                  data-reveal="up"
                >
                  {s.heading}
                </h2>
              </div>
              {/* COPY-REVIEW */}
              <div className="flex flex-col gap-5" data-reveal="up">
                {s.body.map((p) => (
                  <p key={p.slice(0, 32)} className="m-0 text-[16px] leading-relaxed text-ink-2">{p}</p>
                ))}
                {s.bullets && (
                  <ul className="m-0 mt-1 flex list-none flex-col gap-3 p-0">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                        <span aria-hidden="true" className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-mid" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Four-stage deployment process */}
      {showProcess && (
        <section className="bg-ink text-paper">
          <div className="container-ares py-[90px] max-[991px]:py-[64px]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/55">How we start</div>
            <h2
              className="mt-4 mb-12 text-paper"
              style={{ fontSize: 'clamp(30px, 3.6vw, 44px)', fontWeight: 400, letterSpacing: '-0.05em', lineHeight: 1.02, textTransform: 'none' }}
            >
              Four stages, <span className="font-light italic text-light">every time.</span>
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {STAGES.map((s) => (
                <div key={s.n} className="flex flex-col gap-3 rounded-2xl bg-white/[0.06] p-7">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/55">{s.n}</span>
                  <h3 className="m-0 text-[19px] font-semibold leading-tight text-paper">{s.t}</h3>
                  {/* COPY-REVIEW */}
                  <p className="m-0 text-[14px] leading-relaxed text-paper/70">{s.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-paper-2">
        <div className="container-ares py-[90px] max-[991px]:py-[64px]">
          <div className="flex flex-wrap items-center justify-between gap-8 rounded-3xl border border-line bg-paper p-[48px] max-[640px]:p-7">
            <div className="max-w-[52ch]">
              <h2
                className="m-0 text-ink"
                style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 400, letterSpacing: '-0.05em', lineHeight: 1.05, textTransform: 'none' }}
              >
                {ctaHeading.lead} <span className="font-light italic text-mid">{ctaHeading.accent}</span>
              </h2>
              {/* COPY-REVIEW */}
              <p className="mt-4 mb-0 text-[16px] leading-relaxed text-ink-2">{ctaBody}</p>
            </div>
            <div className="flex flex-wrap gap-3 max-[640px]:w-full">
              <Link to="/contact" className="btn btn-primary max-[640px]:w-full max-[640px]:justify-center">Request a Quote</Link>
              <a href="tel:+17196963966" className="btn btn-outline max-[640px]:w-full max-[640px]:justify-center">719-696-3966</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
