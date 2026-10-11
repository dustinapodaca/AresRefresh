// "Why Ares exists." (copy audit: About had no founder section; owner, 2026-10-10: put it in,
// real words and a portrait come later). Mobbin: KÖPPEN and incident.io founder notes, Slack's
// leadership bio: a portrait plate beside a short note that ends on a signed line.
// PLACEHOLDER: the story is the audit's draft and every line still needs Deidre's sign-off;
// the plate shows the Ares mark until her photo arrives (set PORTRAIT to its image path,
// run through the WebP pipeline, and give it real alt text).
import { responsive } from '../../lib/responsive';

const PORTRAIT: string | null = null;

const FOUNDER = {
  name: 'Deidre Herrera-Ruiz',
  role: 'Founder and CEO',
  story: [
    'Our founder and CEO, Deidre Herrera-Ruiz, came up through operations at a Pueblo security company. She saw clients get blanket coverage that didn’t fit their sites, and officers sent to posts they had never seen.',
    'She built Ares to do the opposite. She still writes every post order and reviews every incident report.',
  ],
};

export default function Founder() {
  return (
    <section className="ds-founder" aria-labelledby="founder-title">
      <figure className="ds-founder-plate" data-empty={!PORTRAIT || undefined}>
        {PORTRAIT ? (
          <img {...responsive(PORTRAIT, '(min-width: 1024px) 40vw, 80vw')} alt={`${FOUNDER.name}, ${FOUNDER.role} of Ares Security`} loading="lazy" decoding="async" />
        ) : (
          <span className="ds-founder-mark" aria-hidden="true" />
        )}
      </figure>
      <div className="ds-founder-note">
        <h2 id="founder-title" className="ds-display-lg">
          Why Ares exists.
        </h2>
        {FOUNDER.story.map((p) => (
          <p key={p.slice(0, 24)} className="ds-lead">{p}</p>
        ))}
        <p className="ds-founder-sig">
          <span className="ds-founder-name">{FOUNDER.name}</span>
          <span className="ds-data ds-founder-role">{FOUNDER.role} · Founded 2021, Colorado Springs</span>
        </p>
      </div>
    </section>
  );
}
