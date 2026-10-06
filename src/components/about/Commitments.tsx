import { useRef, useState, type KeyboardEvent } from 'react';
import { FOR_CLIENTS, FOR_PEOPLE, type Commitment } from './data';

const GROUPS = [
  { id: 'clients', label: 'For our clients', items: FOR_CLIENTS },
  { id: 'people', label: 'For our people', items: FOR_PEOPLE },
] as const;

// 02 Commitments: four to clients, four to our people. Desktop shows both lists side by
// side; phones switch between them with two tabs, so only four short rows show at once.
export default function Commitments() {
  const [tab, setTab] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = tab === 0 ? 1 : 0;
    setTab(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="commitments" className="ds-ab-commit" aria-labelledby="commitments-title">
      <div className="ds-ab-commit-head">
        <h2 id="commitments-title" className="ds-display-lg">
          What we commit to.
        </h2>
        <p className="ds-lead">
          Two failures run through this industry: clients dropped once the contract is signed,
          and officers treated as interchangeable. We commit to the opposite on both sides.
        </p>
      </div>

      {/* Phones: the tab switch. Hidden from 768px, where both lists show. */}
      <div className="ds-ab-tabs" role="tablist" aria-label="Commitments" style={{ ['--tab' as string]: tab }}>
        {GROUPS.map((g, i) => (
          <button
            key={g.id}
            ref={(el) => (tabs.current[i] = el)}
            type="button"
            role="tab"
            id={`commit-tab-${g.id}`}
            aria-selected={tab === i}
            aria-controls={`commit-${g.id}`}
            tabIndex={tab === i ? 0 : -1}
            onClick={() => setTab(i)}
            onKeyDown={onKey}
          >
            {g.label}
          </button>
        ))}
        <span className="ds-ab-tabs-bar" aria-hidden="true" />
      </div>

      <div className="ds-ab-commit-lists">
        {GROUPS.map((g, i) => (
          <div
            key={g.id}
            id={`commit-${g.id}`}
            className="ds-ab-commit-group"
            role="tabpanel"
            aria-labelledby={`commit-tab-${g.id}`}
            data-active={tab === i}
          >
            <h3 className="ds-title">{g.label}</h3>
            <List items={g.items} />
          </div>
        ))}
      </div>
    </section>
  );
}

function List({ items }: { items: readonly Commitment[] }) {
  return (
    <ul className="ds-ab-list">
      {items.map((c) => (
        <li key={c.name}>
          <span className="ds-ab-list-name">{c.name}</span>
          <span className="ds-ab-list-line">{c.line}</span>
        </li>
      ))}
    </ul>
  );
}
