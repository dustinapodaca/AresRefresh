import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { GSA_ELIBRARY } from '../home/links';
import { DownloadIcon } from './Hero';
import { CAPABILITIES, CERTS, CODES, DIFFERENTIATORS, GSA_SPECS, PATHS, PDF_URL } from './data';
import { glideUnderHeads } from '../glideUnderHeads';

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

// 01 Capabilities: six cards (the Services card language, without photos). The + opens
// a card in place: it takes its row's full width, keeps its row (row-mates move after
// it), and lists what the service includes. One open at a time; a FLIP glides the rest.
// At every width the opened card glides to just under the nav (and running head).
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';

function useCols() {
  const [cols, setCols] = useState(1);
  useLayoutEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)');
    const mid = window.matchMedia('(min-width: 768px)');
    const sync = () => setCols(wide.matches ? 3 : mid.matches ? 2 : 1);
    sync();
    wide.addEventListener('change', sync);
    mid.addEventListener('change', sync);
    return () => {
      wide.removeEventListener('change', sync);
      mid.removeEventListener('change', sync);
    };
  }, []);
  return cols;
}

export function Capabilities() {
  const [openId, setOpenId] = useState<string | null>(null);
  const cols = useCols();
  const gridRef = useRef<HTMLOListElement>(null);
  // The open card moves (in the DOM, so tab order matches) to the start of its row; the
  // closed cards after it widen as needed so the last row has no hole.
  const openAt = openId ? CAPABILITIES.findIndex((c) => c.id === openId) : -1;
  const list = CAPABILITIES.map((c, i) => ({ c, i }));
  if (openAt >= 0) {
    const rowStart = openAt - (openAt % cols);
    const [opened] = list.splice(openAt, 1);
    list.splice(rowStart, 0, opened);
  }
  const span = new Map<string, number>();
  if (openAt >= 0 && cols > 1) {
    const after = list.slice(list.findIndex((x) => x.c.id === openId) + 1);
    const left = after.length % cols;
    if (left) {
      const tail = after.slice(after.length - left);
      // 3 columns run on a 6-track grid (closed cards span 2): 2 left over span 3 each,
      // 1 spans the row. 2 columns: 1 left over spans the row.
      tail.forEach((x) => span.set(x.c.id, cols === 3 ? 6 / left : 2));
    }
  }

  const toggle = (id: string) => {
    const next = openId === id ? null : id;
    const cards = gridRef.current ? (Array.from(gridRef.current.children) as HTMLElement[]) : [];
    const first = new Map(cards.map((c) => [c, c.getBoundingClientRect()]));
    flushSync(() => setOpenId(next));
    // React may have moved the card in the DOM; keep focus on its button.
    document.querySelector<HTMLButtonElement>(`#cap-${id} .ds-cs-card-head button`)?.focus({ preventScroll: true });
    const opened = next ? document.getElementById(`cap-${next}`) : null;
    if (opened) {
      glideUnderHeads(opened);
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (const card of cards) {
      const a = first.get(card);
      const b = card.getBoundingClientRect();
      if (!a) continue;
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      const grows = b.width > a.width + 1 || b.height > a.height + 1;
      if (!grows && Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
      const from: Keyframe = { transform: `translate(${dx}px, ${dy}px)` };
      const to: Keyframe = { transform: 'translate(0, 0)' };
      if (grows) {
        from.clipPath = `inset(0 ${Math.max(0, b.width - a.width)}px ${Math.max(0, b.height - a.height)}px 0 round 14px)`;
        to.clipPath = 'inset(0 0 0 0 round 14px)';
      }
      const anim = card.animate([from, to], { duration: 320, easing: EASE });
      if (card === opened) {
        card.style.zIndex = '1';
        const reset = () => card.style.removeProperty('z-index');
        anim.finished.then(reset, reset);
      }
    }
  };

  return (
    <section id="capabilities" className="ds-cs-caps" aria-labelledby="caps-title">
      <div className="ds-cs-head">
        <h2 id="caps-title" className="ds-display-lg">
          Core competencies.
        </h2>
        <p className="ds-lead">Six services, each staffed by officers trained on your post before their first shift. Open one to see what it includes.</p>
      </div>
      <ol className="ds-cs-cards" ref={gridRef}>
        {list.map(({ c, i }) => {
          const open = openId === c.id;
          const panel = `cap-${c.id}-includes`;
          const w = span.get(c.id);
          return (
            <li key={c.id} id={`cap-${c.id}`} className="ds-cs-card" data-open={open} style={w ? { gridColumn: `span ${w}` } : undefined}>
              <h3 className="ds-cs-card-head">
                <button type="button" aria-expanded={open} aria-controls={panel} onClick={() => toggle(c.id)}>
                  <span className="ds-data ds-cs-n" aria-hidden="true">{n2(i)}</span>
                  <span className="ds-cs-card-title">{c.title}</span>
                  <span className="ds-svc-plus" aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </button>
              </h3>
              <p className="ds-cs-card-line">{c.line}</p>
              <p className="ds-data ds-cs-keys">{c.keys.join(' · ')}</p>
              <ul id={panel} className="ds-cs-includes" hidden={!open}>
                {c.includes.map((x) => (
                  <li key={x.name}>
                    <span className="ds-cs-inc-name">{x.name}</span>
                    <span className="ds-cs-inc-detail">{x.detail}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

// 02 Why Ares: four differentiators, each with its proof line. Desktop: a 2x2 grid on
// hairlines. Phones: a swipe row with the Home meter.
export function Why() {
  return (
    <section id="why" className="ds-cs-why" aria-labelledby="why-title">
      <div className="ds-cs-head">
        <h2 id="why-title" className="ds-display-lg">
          Why Ares.
        </h2>
        <p className="ds-lead">Four reasons, each with its source.</p>
      </div>
      <ol className="ds-cs-why-row">
        {DIFFERENTIATORS.map((d, i) => (
          <li key={d.title}>
            <h3 className="ds-cs-why-title">
              <span className="ds-data ds-cs-n">{n2(i)}</span>
              <span>{d.title}</span>
            </h3>
            <p className="ds-body">{d.body}</p>
            <p className="ds-data ds-cs-why-proof">
              {d.href ? (
                <a href={d.href} target="_blank" rel="noopener noreferrer" className="ds-link ds-data">
                  {d.proof}
                  <Arrow external size={12} />
                </a>
              ) : (
                d.proof
              )}
            </p>
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
          Certifications and codes.
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
