
import Arrow from '../Arrow';
import { responsive } from '../../lib/responsive';

// "Why Ares exists." (copy audit: About had no founder section; owner, 2026-10-10: put it in,
// real words and a portrait come later). Second pass after Slash, Flora, and Resend on Mobbin:
// the letter (owner, 2026-10-10), Slash's CEO note, the story set large in two tones (Flora),
// signed with a small portrait, name, and role. The note form (/about?founder=note) was removed at
// launch (owner, 2026-10-19; tag options-archive-2026-10-19, docs/options-archive.md).
// PLACEHOLDER: every line of the story still needs Deidre's sign-off. Her portrait arrived
// 2026-10-19 (owner); with PORTRAIT null the Ares mark shows instead.
const PORTRAIT: string | null = '/images/founder-deidre.jpg';

const FOUNDER = {
  name: 'Deidre Herrera-Ruiz',
  // Her LinkedIn (owner, 2026-10-19); also the founder's sameAs in index.html's JSON-LD.
  linkedin: 'https://www.linkedin.com/in/deidre-herrera-ruiz/',
  role: 'Founder & CEO',
  // Her story (owner, 2026-10-18); still waiting on Deidre's sign-off (PLACEHOLDER, above).
  lead: 'Before Ares, Deidre Herrera-Ruiz ran operations and HR for another Colorado security company.',
  rest: 'From her first weeks she was rebuilding the schedule, taking the calls from sites whose guard never showed, and putting structure where there was none. She stayed for years, through the pandemic, and learned the business from the inside. It showed her what clients and officers live with when a security company has no structure.',
  // The one line in ink; the rest of the story is muted (owner, 2026-10-19).
  close: 'She founded Ares in 2021 to fix it.',
};

function Portrait({ size }: { size: 'sm' }) {
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

// Her name links to her LinkedIn, the site's quiet external link (owner, 2026-10-19).
function FounderLink() {
  return (
    <a href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer" className="ds-link" aria-label={`${FOUNDER.name} on LinkedIn (new tab)`}>
      {FOUNDER.name}
      <Arrow external size={12} />
    </a>
  );
}

export default function Founder() {
  return (
    <section id="founder" className="ds-founder" data-form="letter" aria-labelledby="founder-title">
      <h2 id="founder-title" className="ds-display-lg">Why Ares exists.</h2>
      <div className="ds-founder-letter">
        <p className="ds-founder-story">
          {FOUNDER.lead} {FOUNDER.rest} <span>{FOUNDER.close}</span>
        </p>
        <p className="ds-founder-sig">
          <Portrait size="sm" />
          <span>
            <span className="ds-founder-name"><FounderLink /></span>
            <span className="ds-data ds-founder-role">{FOUNDER.role} · Colorado Springs</span>
          </span>
        </p>
      </div>
    </section>
  );
}
