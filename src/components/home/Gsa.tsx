import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { GSA_ELIBRARY, SAM_GOV } from './links';

// 05 GSA (owner, 2026-10-06): a short block for federal buyers near the close, in place of
// the full ledger that used to open Home. The Capability Statement carries every code.
const KEYS = [
  { value: '47QSMS25D009Q', label: 'GSA MAS contract' },
  { value: 'XQXDN6E33SF4', label: 'UEI (SAM.gov)' },
  { value: '9KL18', label: 'CAGE code' },
  { value: '561612', label: 'Primary NAICS' },
];

export default function Gsa() {
  return (
    <section id="gsa" className="ds-gsa" aria-labelledby="gsa-title">
      <div className="ds-gsa-head">
        <h2 id="gsa-title" className="ds-display-md">
          Buying through GSA?
        </h2>
        <p className="ds-body">
          Agencies can order through our Multiple Award Schedule at pre-negotiated pricing,
          without opening a new competition. Every identifier is public.
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
      <div className="ds-gsa-links">
        <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-link">
          View on GSA eLibrary
          <Arrow external size={14} />
        </a>
        <a href={SAM_GOV} target="_blank" rel="noopener noreferrer" className="ds-link">
          Search on SAM.gov
          <Arrow external size={14} />
        </a>
        <Link to="/capability-statement" className="ds-link">
          Every code on the Capability Statement
          <Arrow size={14} />
        </Link>
      </div>
    </section>
  );
}
