import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import PhoneIcon from '../components/PhoneIcon';
import CoverageMap from '../components/home/CoverageMap';
import { VALUES } from '../components/home/Record';
import { FACTS } from '../components/home/Quality';
import { GSA_ELIBRARY } from '../components/home/links';
import { INDUSTRY_PAGES } from '../components/market/industries';
import { responsive } from '../lib/responsive';
import '../home-next.css';

// Home, fresh pass (owner, 2026-10-10): a preview at /home-next beside the current Home.
// Owner-pinned direction: Resend's minimal black with dark frosted glass (Mobbin), our three
// faces, the same facts in a new order, photos as a hybrid (one strong hero image and a few
// of ours), rust only as a faint light. Strategy lives in the surface brief.

const STEPS = ['Site walked before anything is signed', 'Post orders written for this site', 'Officer trained on the post by leadership', 'Relief on call, written into the contract'];

const CITIES = [
  { to: '/locations/colorado-springs', name: 'Colorado Springs', note: 'Headquarters, El Paso County' },
  { to: '/locations/denver', name: 'Denver', note: 'Greater Denver, Aurora to the DIA corridor' },
  { to: '/locations/pueblo', name: 'Pueblo', note: 'Pueblo and Pueblo County' },
];

const PRIME_PROOF = [
  { label: 'Subcontracting credit', value: 'Woman-owned small business', id: 'WOSB250470 · WBE2303571' },
  { label: 'Restricted areas', value: 'Escort and access control on a Space Force base in Colorado', id: '2025 to 2027' },
  { label: 'Coverage', value: 'Relief, overflow, and surge shifts, staffed to your post orders', id: '' },
];

export default function HomeNext() {
  return (
    <main id="main" tabIndex={-1} className="ds hn">
      <Seo path="/home-next" />

      {/* 1. The offer, with the example post order as the proof beside it. */}
      <section className="hn-hero" aria-labelledby="hn-title">
        <div className="hn-hero-photo" aria-hidden="true">
          <img {...responsive('/images/hero6.jpg')} alt="" decoding="sync" {...{ fetchpriority: 'high' }} />
        </div>
        <div className="hn-wrap hn-hero-grid">
          <div className="hn-hero-copy">
            <h1 id="hn-title" className="hn-display hn-rise" style={{ ['--d' as string]: '0ms' }}>
              A prepared officer <span>on every post</span>
            </h1>
            <p className="hn-lead hn-rise" style={{ ['--d' as string]: '80ms' }}>
              Armed and unarmed officers, access control, and restricted-area escorts for
              government and critical sites, offices, retail, and campuses along Colorado&rsquo;s
              Front Range.
            </p>
            <div className="hn-actions hn-rise" style={{ ['--d' as string]: '160ms' }}>
              <Link to="/contact" className="hn-btn hn-btn-primary">
                Request a quote
                <Arrow size={14} />
              </Link>
              <a href="tel:+17196963966" className="hn-btn hn-btn-glass">
                <PhoneIcon size={16} />
                719-696-3966
              </a>
            </div>
            <p className="hn-proof hn-rise" style={{ ['--d' as string]: '240ms' }}>
              <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer">
                GSA MAS <span className="ds-data">47QSMS25D009Q</span>
                <Arrow external size={12} />
              </a>
              <span>Minority woman-owned (WOSB, WBENC)</span>
              <span>Licensed in Colorado Springs, Denver, and Pueblo</span>
            </p>
          </div>

          {/* The signature: how every post is prepared, as a glass sheet over the photo. */}
          <figure className="hn-sheet hn-glass hn-rise" style={{ ['--d' as string]: '200ms' }} aria-label="How every Ares post is prepared">
            <figcaption className="hn-sheet-head">
              <span className="hn-sheet-title">Post order</span>
              <span className="hn-sheet-tag">Example</span>
            </figcaption>
            <ol className="hn-sheet-steps">
              {STEPS.map((s, i) => (
                <li key={s} style={{ ['--i' as string]: i }}>
                  <svg className="hn-tick" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <circle cx="9" cy="9" r="8" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
                    <path d="M5.5 9.2 8 11.6 12.6 6.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
                  </svg>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </section>

      {/* 2. The record: three proofs in glass over one faint light. */}
      <section className="hn-sec hn-record hn-pool" aria-labelledby="hn-record">
        <div className="hn-wrap">
          <header className="hn-head hn-head-center">
            <h2 id="hn-record" className="hn-h2">The record <span>so far</span></h2>
            <p className="hn-sub">Federal agencies and commercial clients hire us for the same thing.</p>
          </header>
          <ul className="hn-cards3">
            {VALUES.map((v) => (
              <li key={v.name} className="hn-glass hn-card hn-scroll-rise">
                <p className="ds-data hn-figure">{v.figure}</p>
                {v.href ? (
                  <a href={v.href} target="_blank" rel="noopener noreferrer" className="hn-caption">
                    {v.caption}
                    <Arrow external size={12} />
                  </a>
                ) : (
                  <p className="hn-caption">{v.caption}</p>
                )}
                <h3>{v.name}</h3>
                <p>{v.line}</p>
              </li>
            ))}
          </ul>
          <dl className="hn-facts">
            {FACTS.filter((f) => f.label !== 'Licensed').map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd className={f.mono ? 'ds-data' : undefined}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3. The six industries, each with its picture, in the owner's fixed order. */}
      <section className="hn-sec hn-pool" aria-labelledby="hn-sites">
        <div className="hn-wrap">
          <header className="hn-head hn-head-split">
            <h2 id="hn-sites" className="hn-h2">The sites <span>we protect</span></h2>
            <div>
              <p className="hn-sub">Six industries, from government facilities and critical sites to offices and campuses.</p>
              <Link to="/services" className="hn-link">
                All services
                <Arrow size={14} />
              </Link>
            </div>
          </header>
          <ul className="hn-glass hn-sites hn-scroll-rise">
            {INDUSTRY_PAGES.map((ind) => (
              <li key={ind.slug}>
                <Link to={`/industries/${ind.slug}`} className="hn-site">
                  <span className="hn-site-name">{ind.name}</span>
                  <span className="hn-site-line">{ind.short}</span>
                  <Arrow size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. For prime contractors: the teaming diagram in a large glass panel. */}
      <section className="hn-sec hn-prime" aria-labelledby="hn-prime">
        <div className="hn-wrap">
          <header className="hn-head hn-head-center">
            <h2 id="hn-prime" className="hn-h2">For prime <span>contractors</span></h2>
            <p className="hn-sub">A woman-owned subcontractor for Front Range work: restricted-area escorts, access control officers, and relief, overflow, and surge coverage under your contract.</p>
            <Link to="/teaming" className="hn-btn hn-btn-glass">
              Teaming and subcontracting
              <Arrow size={14} />
            </Link>
          </header>
          <div className="hn-glass hn-prime-panel hn-scroll-rise">
            <figure className="ds-primes-flow hn-flow" aria-label="The prime holds the contract; Ares staffs restricted-area escort, access control, and relief posts under it">
              <div className="ds-flow-node ds-flow-prime" aria-hidden="true">
                <span className="ds-data">Prime contractor</span>
                <span>Holds the contract</span>
              </div>
              <span className="ds-flow-line" aria-hidden="true" />
              <div className="ds-flow-node ds-flow-ares" aria-hidden="true">
                <span className="ds-data">Ares Security</span>
                <span>WOSB subcontractor · post orders, training, relief</span>
              </div>
              <span className="ds-flow-line ds-flow-fork" aria-hidden="true" />
              <div className="ds-flow-posts" aria-hidden="true">
                <span>Restricted-area escort</span>
                <span>Access control</span>
                <span>Relief and surge</span>
              </div>
            </figure>
            <dl className="hn-prime-proof">
              {PRIME_PROOF.map((p) => (
                <div key={p.label}>
                  <dt>{p.label}</dt>
                  <dd>{p.value}</dd>
                  {p.id && <dd className={/\d{5}/.test(p.id) ? 'ds-data hn-id' : 'hn-id'}>{p.id}</dd>}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 5. Quality over quantity: our own people, framed, with the hiring line. */}
      <section className="hn-sec hn-pool" aria-labelledby="hn-quality">
        <div className="hn-wrap">
          <header className="hn-head hn-head-center">
            <h2 id="hn-quality" className="hn-h2">Quality <span>over quantity</span></h2>
            <p className="hn-sub">We would rather staff fewer posts well than many posts thinly. That choice shapes everyone we hire, the training they get, and the standards they carry onto every site.</p>
          </header>
          <figure className="hn-frame hn-scroll-rise">
            <span className="hn-frame-img">
              <img {...responsive('/images/careers-philosophy.jpg', '(min-width: 1280px) 1100px, 100vw')} alt="The Ares Security team at the range" loading="lazy" decoding="async" />
            </span>
            <figcaption>The Ares team at the range</figcaption>
          </figure>
          <div className="hn-hiring">
            <p><strong>Now hiring armed and unarmed officers.</strong> Paid training, schedules posted ahead, and a supervisor who answers. Veterans encouraged to apply.</p>
            <Link to="/careers" className="hn-link">
              See open roles
              <Arrow size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Where we work: the cities beside the map in glass. */}
      <section className="hn-sec hn-pool" aria-labelledby="hn-where">
        <div className="hn-wrap hn-where">
          <div>
            <h2 id="hn-where" className="hn-h2">Where <span>we work</span></h2>
            <p className="hn-sub">Licensed and bonded in all three cities along I-25, managed from Colorado Springs.</p>
            <ul className="hn-cities">
              {CITIES.map((c) => (
                <li key={c.to}>
                  <Link to={c.to}>
                    <span className="hn-city">{c.name}</span>
                    <span className="hn-city-note">{c.note}</span>
                    <Arrow size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hn-map hn-scroll-rise">
            <CoverageMap />
          </div>
        </div>
      </section>

      {/* 7. The close, over the second faint rust light. */}
      <section className="hn-close" aria-labelledby="hn-close">
        <div className="hn-wrap hn-head-center">
          <h2 id="hn-close" className="hn-display hn-display-close">Request a quote, <span>or call us</span></h2>
          <a href="tel:+17196963966" className="ds-data hn-phone">719-696-3966</a>
          <div className="hn-actions hn-actions-center">
            <Link to="/contact" className="hn-btn hn-btn-primary">
              Request a quote
              <Arrow size={14} />
            </Link>
            <Link to="/capability-statement" className="hn-btn hn-btn-glass">
              Capability statement
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
