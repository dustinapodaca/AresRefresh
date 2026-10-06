import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { GSA_ELIBRARY } from '../home/links';
import { DownloadIcon } from './Hero';
import { CAPABILITIES, CERTS, CODES, DIFFERENTIATORS, GSA_SPECS, PATHS, PDF_URL } from './data';

const n2 = (i: number) => String(i + 1).padStart(2, '0');
const PHONE = '(max-width: 767px)';

// True on phones. Starts false so the first render matches the prerendered page (every
// list open, all content in the HTML); corrected before paint, and kept in step if the
// screen changes size or orientation.
function usePhone() {
  const [phone, setPhone] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia(PHONE);
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return phone;
}

function Chevron() {
  return (
    <svg className="ds-chevron" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

// 01 Capabilities: six ruled entries, three columns on desktop. Phones: each folds to its
// name and keys; the heading's button opens the description (a heading containing a
// disclosure button, so screen readers keep the headings).
export function Capabilities() {
  const phone = usePhone();
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set());
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="capabilities" className="ds-cs-caps" aria-labelledby="caps-title">
      <div className="ds-cs-head">
        <h2 id="caps-title" className="ds-display-lg">
          Core competencies.
        </h2>
        <p className="ds-lead">Six services, each staffed by officers trained on your post before their first shift.</p>
      </div>
      <ol className="ds-cs-caps-list">
        {CAPABILITIES.map((c, i) => {
          const shown = !phone || open.has(i);
          const bodyId = `cap-body-${i}`;
          const inner = (
            <>
              <span className="ds-data ds-cs-n">{n2(i)}</span>
              <span className="ds-cs-cap-title">{c.title}</span>
              {phone && <Chevron />}
            </>
          );
          return (
            <li key={c.title} className="ds-cs-cap" data-open={shown}>
              <h3 className="ds-cs-cap-head">
                {phone ? (
                  <button type="button" aria-expanded={shown} aria-controls={bodyId} onClick={() => toggle(i)}>
                    {inner}
                  </button>
                ) : (
                  <span>{inner}</span>
                )}
              </h3>
              <p id={bodyId} className="ds-cs-cap-body" hidden={!shown}>
                {c.body}
              </p>
              <p className="ds-data ds-cs-keys">{c.keys.join(' · ')}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

// 02 Why Ares: three differentiators. Phones: a swipe row with the Home meter.
export function Why() {
  return (
    <section id="why" className="ds-cs-why" aria-labelledby="why-title">
      <h2 id="why-title" className="ds-display-lg">
        Why Ares.
      </h2>
      <ol className="ds-cs-why-row">
        {DIFFERENTIATORS.map((d, i) => (
          <li key={d.title}>
            <h3 className="ds-cs-why-title">
              <span className="ds-data ds-cs-n">{n2(i)}</span>
              <span>{d.title}</span>
            </h3>
            <p className="ds-body">{d.body}</p>
            <p className="ds-data ds-cs-why-area">{d.area}</p>
          </li>
        ))}
      </ol>
      <div className="ds-steps-meta ds-cs-why-meta" aria-hidden="true">
        <span className="ds-steps-bar"><span /></span>
        <span className="ds-data">Swipe</span>
      </div>
    </section>
  );
}

// 03 How to buy: the GSA MAS as a spec block with its status, beside the other paths.
export function Buy() {
  // The status lights pulse once, the first time the section is seen.
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        el.dataset.lit = 'true';
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="buy" className="ds-cs-buy" aria-labelledby="buy-title">
      <div className="ds-cs-head">
        <h2 id="buy-title" className="ds-display-lg">
          How to buy from us.
        </h2>
        <p className="ds-lead">Pre-negotiated pricing, and award without a re-compete.</p>
      </div>
      <div className="ds-cs-buy-grid">
        <div className="ds-cs-vehicle">
          <div className="ds-cs-vehicle-head">
            <h3 className="ds-title">GSA Multiple Award Schedule</h3>
            <span className="ds-data ds-cs-status" data-state="active">
              <i aria-hidden="true" />
              Active
            </span>
          </div>
          <p className="ds-small ds-cs-vehicle-kind">Primary vehicle</p>
          <dl className="ds-cs-specs">
            {GSA_SPECS.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd className={s.mono ? 'ds-data' : undefined}>{s.value}</dd>
              </div>
            ))}
          </dl>
          <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-link">
            View on GSA eLibrary
            <Arrow external size={14} />
          </a>
        </div>
        <div className="ds-cs-paths">
          <h3 className="ds-title">Additional procurement paths</h3>
          <ul>
            {PATHS.map((p) => (
              <li key={p.name}>
                <span>{p.name}</span>
                <span className="ds-data ds-cs-status" data-state={p.status === 'Available' ? 'available' : 'request'}>
                  <i aria-hidden="true" />
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
          <p className="ds-cs-note">
            <strong>Set-aside eligible: WOSB.</strong> Contact us to confirm scope and pricing for
            any vehicle above.
          </p>
        </div>
      </div>
    </section>
  );
}

// 04 Credentials: the marks with their numbers, then the full code listing as a ledger.
export function Credentials() {
  const phone = usePhone();
  const [open, setOpen] = useState(false);
  const shown = !phone || open;
  return (
    <section id="credentials" className="ds-cs-creds" aria-labelledby="creds-title">
      <div className="ds-cs-head">
        <h2 id="creds-title" className="ds-display-lg">
          Credentials on the record.
        </h2>
        <p className="ds-lead">All data matches our SAM.gov registration.</p>
      </div>
      <ul className="ds-cs-marks">
        {CERTS.map((c) => (
          <li key={c.name}>
            <img src={c.src} alt={c.alt} loading="lazy" data-color={c.color || undefined} data-tall={c.tall || undefined} />
            <span className="ds-cs-mark-name">{c.name}</span>
            {c.id && <span className="ds-data ds-cs-mark-id">{c.id}</span>}
          </li>
        ))}
      </ul>
      <div className="ds-cs-codes" data-open={shown}>
        <div className="ds-cs-codes-head">
          <h3 className="ds-title">
            {phone ? (
              <button type="button" aria-expanded={shown} aria-controls="code-list" onClick={() => setOpen((v) => !v)}>
                <span>Full code listing</span>
                <span className="ds-ledger-count">
                  {CODES.length} entries
                  <Chevron />
                </span>
              </button>
            ) : (
              'Full code listing'
            )}
          </h3>
          <span className="ds-small ds-cs-codes-note">Confirmed against SAM.gov</span>
        </div>
        <dl id="code-list" className="ds-cs-code-list" hidden={!shown}>
          {CODES.map((c) => (
            <div key={c.label}>
              <dt>{c.label}</dt>
              <dd>
                <span className={c.mono ? 'ds-data' : 'ds-cs-code-v'}>{c.value}</span>
                <span className="ds-cs-code-note">{c.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// 05 Download, the close: the statement's thumbnail beside every way to take it with you.
export function Download() {
  return (
    <section id="download" className="ds-cs-close" aria-labelledby="dl-title">
      <a href={PDF_URL} className="ds-cs-thumb" target="_blank" rel="noopener noreferrer" aria-label="Open the capability statement PDF (new tab)">
        <img src="/images/capability-page1.webp" alt="" width={1000} height={1295} loading="lazy" decoding="async" />
      </a>
      <div className="ds-cs-close-copy">
        <h2 id="dl-title" className="ds-display-lg">
          Take this capability statement with you.
        </h2>
        <div className="ds-actions">
          <a href={PDF_URL} className="ds-btn ds-btn-primary" download>
            <DownloadIcon />
            Download the PDF
          </a>
          <a href={PDF_URL} className="ds-link" target="_blank" rel="noopener noreferrer">
            Open the PDF (new tab)
            <Arrow external size={14} />
          </a>
        </div>
        <p className="ds-cs-close-contact">
          <Link to="/contact" className="ds-link">
            Request a quote
            <Arrow />
          </Link>
          <a href="tel:+17196963966" className="ds-link">
            Call <span className="ds-data">719-696-3966</span>
          </a>
        </p>
      </div>
    </section>
  );
}
