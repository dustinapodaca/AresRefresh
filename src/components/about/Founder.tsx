import { Link, useSearchParams } from 'react-router-dom';
import Arrow from '../Arrow';
import { responsive } from '../../lib/responsive';

// "Why Ares exists." (copy audit: About had no founder section; owner, 2026-10-10: put it in,
// real words and a portrait come later). Second pass after Slash, Flora, and Resend on Mobbin;
// two forms at /about?founder=letter|note (owner chose letter, 2026-10-10):
//  letter  Slash's CEO note: the story set large in two tones (Flora), signed with a small
//          portrait, name, and role.
//  note    Resend's "Meet the team": the headline left; on the right a portrait, the name
//          and role, the story, and a route on to how we work, between hairlines.
// PLACEHOLDER: every line of the story still needs Deidre's sign-off. Her portrait arrived
// 2026-10-19 (owner); with PORTRAIT null the Ares mark shows instead.
const PORTRAIT: string | null = '/images/founder-deidre.jpg';

const FOUNDER = {
  name: 'Deidre Herrera-Ruiz',
  role: 'Founder & CEO',
  // Her story (owner, 2026-10-18); still waiting on Deidre's sign-off (PLACEHOLDER, above).
  lead: 'Before Ares, Deidre Herrera-Ruiz ran operations and HR for another Colorado security company.',
  rest: 'From her first weeks she was rebuilding the schedule, taking the calls from sites whose guard never showed, and putting structure where there was none. She stayed for years, through the pandemic, and learned the business from the inside. It showed her what clients and officers live with when a security company has no structure. She founded Ares in 2021 to fix it.',
};

function Portrait({ size }: { size: 'sm' | 'md' }) {
  return (
    <span className="ds-founder-face" data-size={size} data-empty={!PORTRAIT || undefined}>
      {PORTRAIT ? (
        <img {...responsive(PORTRAIT, '160px')} alt={`${FOUNDER.name}, ${FOUNDER.role} of Ares Security`} loading="lazy" decoding="async" />
      ) : (
        <span className="ds-founder-mark" aria-hidden="true" />
      )}
    </span>
  );
}

export default function Founder() {
  const [params] = useSearchParams();
  const form = params.get('founder') === 'note' ? 'note' : 'letter';

  if (form === 'note') {
    return (
      <section id="founder" className="ds-founder" data-form="note" aria-labelledby="founder-title">
        <div className="ds-founder-head">
          <h2 id="founder-title" className="ds-display-lg">Why Ares exists.</h2>
          <p className="ds-lead">Founded in Colorado Springs in 2021.</p>
        </div>
        <div className="ds-founder-card">
          <div className="ds-founder-who">
            <Portrait size="md" />
            <div>
              <span className="ds-founder-name">{FOUNDER.name}</span>
              <span className="ds-data ds-founder-role">{FOUNDER.role}</span>
            </div>
          </div>
          <p className="ds-founder-text">{FOUNDER.lead} {FOUNDER.rest}</p>
          <Link to="/about#heard" className="ds-link ds-founder-more">
            What clients told us
            <Arrow size={14} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="founder" className="ds-founder" data-form="letter" aria-labelledby="founder-title">
      <h2 id="founder-title" className="ds-display-lg">Why Ares exists.</h2>
      <div className="ds-founder-letter">
        <p className="ds-founder-story">
          <span>{FOUNDER.lead}</span> {FOUNDER.rest}
        </p>
        <p className="ds-founder-sig">
          <Portrait size="sm" />
          <span>
            <span className="ds-founder-name">{FOUNDER.name}</span>
            <span className="ds-data ds-founder-role">{FOUNDER.role} · Colorado Springs</span>
          </span>
        </p>
      </div>
    </section>
  );
}
