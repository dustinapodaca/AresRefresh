import { Link, useSearchParams } from 'react-router-dom';
import Arrow from '../Arrow';
import { responsive } from '../../lib/responsive';

// "Why Ares exists." (copy audit: About had no founder section; owner, 2026-10-10: put it in,
// real words and a portrait come later). Second pass after Slash, Flora, and Resend on Mobbin;
// two forms at /about?founder=letter|note (letter is the default for now):
//  letter  Slash's CEO note: the story set large in two tones (Flora), signed with a small
//          portrait, name, and role.
//  note    Resend's "Meet the team": the headline left; on the right a portrait, the name
//          and role, the story, and a route on to how we work, between hairlines.
// PLACEHOLDER: the story is the audit's draft and every line still needs Deidre's sign-off;
// the portrait shows the Ares mark until her photo arrives (set PORTRAIT to its image path,
// run it through the WebP pipeline).
const PORTRAIT: string | null = null;

const FOUNDER = {
  name: 'Deidre Herrera-Ruiz',
  role: 'Founder and CEO',
  lead: 'Our founder and CEO, Deidre Herrera-Ruiz, came up through operations at a Pueblo security company.',
  rest: 'She saw clients get blanket coverage that didn’t fit their sites, and officers sent to posts they had never seen. She built Ares to do the opposite, and she still writes every post order and reviews every incident report.',
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
      <section className="ds-founder" data-form="note" aria-labelledby="founder-title">
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
          <Link to="/about#staffing" className="ds-link ds-founder-more">
            How we work
            <Arrow size={14} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="ds-founder" data-form="letter" aria-labelledby="founder-title">
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
