import { Link } from 'react-router-dom';
import ArrowBtn from '../components/ArrowBtn';
import ImageSlot from '../components/ImageSlot';

const SERVICE_CARDS = [
  {
    to: '/about',
    title: 'About Us',
    body: 'Our journey, our principles, the capability statement that backs us, and the people who bring reliable security to every environment we serve.',
    tags: ['Mission', 'WOSB', 'Veteran-Led'],
    slot: { id: 'svc-1', src: '/images/about-sunset.jpg', placeholder: '' },
  },
  {
    to: '/services',
    title: 'Services',
    body: 'Six service divisions across federal, commercial, industrial, and specialized sectors. Documented, audit-ready, and ready for procurement.',
    tags: ['Federal', 'Commercial', 'Specialized'],
    slot: { id: 'svc-2', src: '/images/capabilities-card.jpg', placeholder: '' },
  },
  {
    to: '/careers',
    title: 'Careers',
    body: 'Join the team. Five open positions across armed, unarmed, cleared, and office roles — paid training, veteran-friendly leadership, real growth paths.',
    tags: ['Armed', 'Unarmed', 'Cleared'],
    slot: { id: 'svc-3', src: '/images/careers-team.jpg', placeholder: '' },
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-paper lg:min-h-[920px]">
        <div className="hero-gradient absolute inset-0 -z-10">
          <img src="/images/hero6.jpg" alt="" className="absolute inset-0 z-[1] h-full w-full object-cover" style={{ objectPosition: 'center 60%' }} />
          <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(31,31,31,0.85)_0%,rgba(31,31,31,0.6)_40%,rgba(31,31,31,0.25)_100%),linear-gradient(180deg,rgba(31,31,31,0.35)_0%,rgba(31,31,31,0.25)_50%,rgba(31,31,31,0.6)_100%)] pointer-events-none" />
        </div>
        <div className="container-ares w-full">
          <div className="relative grid gap-0 pt-[220px] pb-28 lg:gap-12 lg:pb-64">
            <div className="max-w-[980px]">
              <img
                src="/images/ares-text.svg"
                alt="Ares Security"
                className="reveal mb-8 block w-full max-w-[264px] opacity-95 lg:max-w-[330px]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <h1
                className="reveal-d1 mb-7 text-paper font-normal"
                style={{ fontSize: 'clamp(48px, 7vw, 84px)', lineHeight: 0.92, letterSpacing: '-0.06em' }}
              >
                Protection Built<br />On{' '}
                <span className="font-light italic text-light">Principle.</span>
              </h1>
              <p className="reveal-d2 mb-9 max-w-[570px] text-[20px] leading-snug text-paper/75">
                Bridging the gap between public-sector compliance and commercial reliability — a woman-owned, employee-focused firm delivering consistent results across every environment.
              </p>
            </div>

            {/* GSA contract card (frosted glass) — matches .hero_box recipe.
                On mobile: sits in flow below the buttons (full width).
                On lg+: floats absolute in the bottom-right corner. */}
            <div className="reveal-d4 relative mt-[92px] w-full rounded-3xl border border-white/[0.20] bg-white/[0.04] px-[52px] py-10 text-paper shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[26px] backdrop-saturate-[160%] lg:absolute lg:bottom-[60px] lg:right-7 lg:mt-0 lg:w-[460px] lg:max-w-[calc(100vw-3rem)]">
              <a href="https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES" target="_blank" rel="noopener noreferrer" className="arrow-btn absolute right-6 top-6" aria-label="View on GSA eLibrary">
                <svg viewBox="0 0 16 16" fill="none"><path d="M15.3846 0H0.615385C0.275692 0 0 0.275692 0 0.615385C0 0.955077 0.275692 1.23077 0.615385 1.23077H13.8988L0.180308 14.9495C-0.06 15.1898 -0.06 15.5794 0.180308 15.8197C0.300615 15.94 0.457846 16 0.615385 16C0.772923 16 0.930461 15.94 1.05046 15.8197L14.7692 2.10092V15.3846C14.7692 15.7243 15.0449 16 15.3846 16C15.7243 16 16 15.7243 16 15.3846V0.615385C16 0.275692 15.7243 0 15.3846 0Z" fill="currentColor" /></svg>
              </a>
              <img src="/images/gsa-contract-holder.png" alt="GSA Contract Holder" className="mb-[18px] block h-auto w-auto max-w-[240px]" />
              <p className="text-[14px] leading-relaxed text-paper/70">
                Contract #47QSMS25D009Q. Pre-negotiated federal pricing — agencies can award task orders without opening a new competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* We Are Different */}
      <Section>
        <SectionHeading
          title={<>We Are <span className="font-light italic text-light">Reliable</span> In Every Way</>}
          right={<Link to="/about" className="btn btn-primary">About Ares</Link>}
          titleSize="clamp(44px, 8vw, 60px)"
          titleStyle={{ fontWeight: 400, letterSpacing: '-0.06em', lineHeight: 0.92 }}
        />
        <Spacer />
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-pale">
            <img src="/images/backbone-officer.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-top" />
          </div>
          <div className="grid gap-y-12 gap-x-10 sm:grid-cols-2">
            {[
              {
                h: 'Thorough Planning',
                p: 'We take the time to fully understand your site, operations, and risks before anything is signed. This upfront work prevents surprises and delivers a solution that actually fits the way your facility runs.',
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="4" width="14" height="17" rx="2" />
                    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
                    <path d="M8.5 12l2 2 4-4.5" />
                    <path d="M9 17.5h6" />
                  </svg>
                ),
              },
              {
                h: 'Technical Excellence & Precision',
                p: 'Our proposals, post orders, and documentation are consistently praised for their clarity and detail. We treat every deliverable with the same care our clients expect from top-tier technical submittals.',
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="4.5" />
                    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                  </svg>
                ),
              },
              {
                h: 'Responsive Communication',
                p: 'You’ll always know what’s happening. We provide timely updates, direct access to the team managing your account, and professional reporting that keeps everyone aligned.',
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a8 8 0 0 1-12 6.9L3.5 20.5 5 15.5A8 8 0 1 1 21 12z" />
                    <path d="M8.5 10.5h7" />
                    <path d="M8.5 13.8h4.5" />
                  </svg>
                ),
              },
              {
                h: 'Leadership Site Training',
                p: 'Every guard receives hands-on, site-specific training from a member of our leadership team who has personally worked that exact post — so your protection is prepared from the very first shift.',
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 9.5l10-5 10 5-10 5-10-5z" />
                    <path d="M6.5 11.7v4.6c0 1.6 2.7 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-4.6" />
                    <path d="M20.5 10.2v5.3" />
                  </svg>
                ),
              },
            ].map((b, i) => (
              <div key={i} className="group flex flex-col gap-4 reveal-d1">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-paper transition-colors duration-300 group-hover:bg-mid">
                  {b.svg}
                </div>
                <h3 className="m-0 text-[22px] font-semibold text-ink">{b.h}</h3>
                <p className="text-[17px] leading-relaxed text-ink-2">{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Woman-Owned showcase */}
      <section className="relative isolate flex items-center overflow-hidden bg-ink pt-[105px] pb-[75px] text-paper min-h-[585px]">
        <div className="absolute inset-0 -z-10">
          <img src="/images/woman-owned-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(31,31,31,.9) 0%, rgba(31,31,31,.55) 60%, rgba(31,31,31,.85) 100%)' }} />
        </div>
        <div className="container-ares">
          <div className="grid items-start gap-20 lg:grid-cols-[1.2fr_1fr]">
            <h2 className="m-0 text-paper font-normal woman_owned_title" style={{ fontSize: 'clamp(46px, 5vw, 76px)', lineHeight: 0.92, letterSpacing: '-0.06em' }}>
              Woman-<br />
              <em className="font-light italic text-light">Owned.</em><br />
              Reliability-<br />
              <em className="font-light italic text-light">Driven.</em>
            </h2>
            <div>
              <Block label="Why It Matters">
                <p className="max-w-[46ch] text-[18px] font-medium leading-snug text-paper">
                  A WOSB- and WBENC-certified firm. On-call scheduling is standard in every contract, and we have maintained less than 1% missed shifts since our inception. This level of reliability supports clean audits and consistent performance on every engagement.
                </p>
              </Block>
              <Block label="Recognitions">
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {['WOSB Certified Small Business', "WBENC Women's Business Enterprise", 'Veteran-Focused Leadership & Training', 'WOSB Set-Aside Eligible · GSA #47QSMS25D009Q'].map((s) => (
                    <li key={s} className="relative pl-5 text-[18px] font-medium text-paper before:absolute before:left-0 before:top-[0.65em] before:h-[1.5px] before:w-2 before:bg-paper">{s}</li>
                  ))}
                </ul>
              </Block>
              <div className="mt-12 flex flex-wrap gap-12 border-t border-white/[0.18] pt-8">
                <Meta label="WOSB" value="#WOSB250470" />
                <Meta label="WBENC" value="#WBE2303571" />
                <Meta label="Founded" value="2022 · Colorado Springs, CO" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services (3 hover-expand cards) */}
      <Section>
        <SectionHeading
          kicker="Explore"
          title={<>Protection Built On <span className="font-light italic text-light">Trust</span>.</>}
          titleSize="60px"
          titleStyle={{ fontWeight: 400, letterSpacing: '-0.06em', lineHeight: 0.92 }}
        />
        <Spacer />
        <div className="service-grid">
          {SERVICE_CARDS.map((c, i) => (
            <article
              key={c.to}
              data-active={i === 0 ? 'true' : 'false'}
              className="group relative isolate overflow-hidden rounded-2xl border border-line bg-ink p-8 text-paper min-h-[580px] flex flex-col justify-between"
            >
              <div className="absolute inset-0 -z-10">
                {c.slot.src
                  ? <img src={c.slot.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  : <ImageSlot id={c.slot.id} placeholder={c.slot.placeholder} fill />}
              </div>
              <div className="absolute inset-0 -z-[5] bg-gradient-to-b from-ink/0 via-ink/30 to-ink/85" />

              <div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span key={t} className="pill-glass pill-glass-dark">{t}</span>
                  ))}
                </div>
              </div>
              <div className="relative z-[2] pr-16 text-paper">
                <h2 className="mb-3.5 text-[28px] font-bold uppercase leading-[1.05] tracking-tight text-paper">
                  {c.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-paper/85">
                  {c.body}
                </p>
              </div>
              <ArrowBtn to={c.to} className="absolute bottom-6 right-6" ariaLabel={`Open ${c.title}`} />
            </article>
          ))}
        </div>
      </Section>

      {/* Testimonial */}
      <Section className="bg-paper-2">
        <div className="text-center"><h3 className="brackets-title">TESTIMONIAL</h3></div>
        <Spacer />
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="m-0 mb-10 text-ink font-semibold" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.3, letterSpacing: '-0.005em' }}>
            "Ares arrived <span style={{ background: 'linear-gradient(180deg, transparent 60%, var(--color-pale) 60%)' }}>prepared</span>. Their documentation was cleaner than the incumbent's from day one, and their team was inside the <span style={{ background: 'linear-gradient(180deg, transparent 60%, var(--color-pale) 60%)' }}>badge cycle</span> before most contractors finish onboarding."
          </blockquote>
          <div>
            <h4 className="mb-1 text-[14px] font-bold uppercase tracking-[0.14em] text-ink">Contracting Officer</h4>
            <p className="text-[14px] tracking-[0.04em] text-mid">USAF · Buckley Space Force Base</p>
          </div>
        </div>
      </Section>
    </main>
  );
}

// ============ Local helpers ============

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`${className} relative`}>
      <Spacer h="100" />
      <div className="container-ares">{children}</div>
      <Spacer h="100" />
    </section>
  );
}

function Spacer({ h = '64' }: { h?: '100' | '70' | '64' | '50' | '32' }) {
  const map = { '100': 'h-25', '70': 'h-[70px]', '64': 'h-16', '50': 'h-[50px]', '32': 'h-8' } as const;
  return <div className={map[h]} />;
}

function SectionHeading({
  kicker,
  title,
  right,
  titleSize,
  titleStyle,
}: {
  kicker?: string;
  title: React.ReactNode;
  right?: React.ReactNode;
  titleSize?: string;
  titleStyle?: React.CSSProperties;
}) {
  return (
    <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
      <div>
        {kicker && <h3 className="brackets-title mb-3">{kicker}</h3>}
        <h2
          className="m-0 text-ink"
          style={titleSize ? { fontSize: titleSize, lineHeight: 1, ...(titleStyle || {}) } : titleStyle}
        >
          {title}
        </h2>
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-paper/55">{label}</div>
      {children}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/50">{label}</span>
      <span className="text-[18px] font-bold text-paper tracking-tight">{value}</span>
    </div>
  );
}
