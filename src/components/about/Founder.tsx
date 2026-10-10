import { useSearchParams } from 'react-router-dom';

// "Why Ares exists." (copy audit: About had no founder section). A TEMPLATE until Deidre
// approves the wording and a photo (owner, 2026-10-10: "the founder story will have to come
// later"). The draft below is the audit's, built from what the owner has shared about
// Deidre; every line still needs her sign-off. Hidden on the live page until APPROVED is
// true; preview it at /about?founder=preview.
const APPROVED = false;

const FOUNDER = {
  name: 'Deidre Herrera-Ruiz',
  role: 'Founder and CEO',
  story: [
    'Our founder and CEO, Deidre Herrera-Ruiz, came up through operations at a Pueblo security company. She saw clients get blanket coverage that didn’t fit their sites, and officers sent to posts they had never seen.',
    'She built Ares to do the opposite. She still writes every post order and reviews every incident report.',
  ],
};

export default function Founder() {
  const [params] = useSearchParams();
  if (!APPROVED && params.get('founder') !== 'preview') return null;

  return (
    <section className="ds-founder" aria-labelledby="founder-title">
      <h2 id="founder-title" className="ds-display-lg">
        Why Ares exists.
      </h2>
      <div className="ds-founder-body">
        {FOUNDER.story.map((p) => (
          <p key={p.slice(0, 24)} className="ds-lead">{p}</p>
        ))}
        {/* A portrait of Deidre goes here once she supplies one (4px corners, hairline edge). */}
        <p className="ds-founder-sig">
          <span>{FOUNDER.name}</span>
          <span className="ds-small">{FOUNDER.role}</span>
        </p>
      </div>
    </section>
  );
}
