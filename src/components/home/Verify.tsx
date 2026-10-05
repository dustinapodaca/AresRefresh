import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from './useMediaQuery';
import Arrow from '../Arrow';
import { GSA_ELIBRARY, SAM_GOV } from './links';

type Route = { href: string; label: string; external?: boolean } | { note: string };
type Row = { label: string; value: string; kind?: 'data' | 'note'; route?: Route };

const KEYS = [
  { value: '47QSMS25D009Q', label: 'GSA MAS contract' },
  { value: 'XQXDN6E33SF4', label: 'UEI (SAM.gov)' },
  { value: '9KL18', label: 'CAGE code' },
  { value: '561612', label: 'Primary NAICS' },
];

const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: 'Contract vehicle',
    rows: [
      {
        label: 'GSA Multiple Award Schedule',
        value: '47QSMS25D009Q',
        route: { href: GSA_ELIBRARY, label: 'View on GSA eLibrary', external: true },
      },
      { label: 'Special Item Number', value: '561612 Security Services' },
      {
        label: 'Ordering',
        value: 'Pre-negotiated federal pricing. Agencies can award task orders without opening a new competition.',
        kind: 'note',
      },
    ],
  },
  {
    title: 'Registration',
    rows: [
      {
        label: 'Unique Entity ID',
        value: 'XQXDN6E33SF4',
        route: { href: SAM_GOV, label: 'Search on SAM.gov', external: true },
      },
      {
        label: 'CAGE code',
        value: '9KL18',
        route: { href: SAM_GOV, label: 'Search on SAM.gov', external: true },
      },
      { label: 'Primary NAICS', value: '561612 Security Guards & Patrol Services' },
    ],
  },
  {
    title: 'Certification',
    rows: [
      {
        label: 'WOSB, SBA certified',
        value: 'WOSB250470',
        route: { note: 'Set-aside eligible under NAICS 561612' },
      },
      { label: 'WBENC certified', value: 'WBE2303571' },
      { label: 'Ownership', value: 'Minority woman-owned', kind: 'note' },
      { label: 'Founded', value: '2021, Colorado Springs, CO', kind: 'note' },
    ],
  },
];

// On mobile each ledger group folds behind a tappable row so the section isn't a wall of
// numbers; the four key identifiers above stay visible. On desktop groups are always open.
function LedgerGroup({
  title,
  count,
  desktop,
  children,
}: {
  title: string;
  count: number;
  desktop: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="ds-ledger-group"
      open={desktop || open}
      onToggle={(e) => !desktop && setOpen(e.currentTarget.open)}
    >
      <summary
        tabIndex={desktop ? -1 : undefined}
        onClick={desktop ? (e) => e.preventDefault() : undefined}
      >
        <h3 className="ds-title">{title}</h3>
        <span className="ds-ledger-count">
          {count} entries
          <svg className="ds-chevron" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </summary>
      {children}
    </details>
  );
}

export default function Verify() {
  const desktop = useMediaQuery('(min-width: 768px)');
  return (
    <section id="verify" className="ds-verify" aria-labelledby="verify-title">
      <div className="ds-verify-head">
        <h2 id="verify-title" className="ds-display-lg">
          Verify us before you call.
        </h2>
        <p className="ds-lead">
          Every number below is public. Check it on GSA eLibrary or SAM.gov, or download the
          capability statement that lists them all.
        </p>
      </div>

      <ul className="ds-keyrow" aria-label="Federal identifiers">
        {KEYS.map((k) => (
          <li key={k.label}>
            <span className="ds-data">{k.value}</span>
            <span className="ds-small">{k.label}</span>
          </li>
        ))}
      </ul>

      <div className="ds-ledger">
        {GROUPS.map((g) => (
          <LedgerGroup key={g.title} title={g.title} count={g.rows.length} desktop={desktop}>
            <dl>
              {g.rows.map((r) => (
                <div className="ds-ledger-row" key={r.label}>
                  <dt>{r.label}</dt>
                  <dd className={r.kind === 'note' ? 'ds-note' : 'ds-data'}>{r.value}</dd>
                  {r.route && (
                  <dd className="ds-ledger-route">
                    {'href' in r.route ? (
                      <a
                        href={r.route.href}
                        className="ds-link"
                        {...(r.route.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {r.route.label}
                        <Arrow external={r.route.external} size={14} />
                      </a>
                    ) : (
                      <span className="ds-small">{r.route.note}</span>
                    )}
                  </dd>
                  )}
                </div>
              ))}
            </dl>
          </LedgerGroup>
        ))}
        <p className="ds-ledger-foot">
          <Link to="/capability-statement" className="ds-link">
            Download the capability statement
            <Arrow />
          </Link>
        </p>
      </div>

      <div className="ds-proof-close">
        <p className="ds-figure-num" aria-describedby="figure-note">
          &lt;1%
        </p>
        <div className="ds-figure-note" id="figure-note">
          <p className="ds-title">Missed shifts since 2021.</p>
          <p className="ds-body">
            On-call scheduling is standard in every contract. That reliability supports clean
            audits and consistent performance on every engagement.
          </p>
        </div>
        <figure className="ds-quote">
          <blockquote>
            <p className="ds-display-md">
              “Ares arrived prepared. Their documentation was cleaner than the incumbent’s from
              day one.”
            </p>
          </blockquote>
          <figcaption className="ds-small">
            <span>Contracting Officer</span>
            <span>USAF · Buckley Space Force Base</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
