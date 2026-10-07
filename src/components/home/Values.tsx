import Arrow from '../Arrow';
import { INDEED_REVIEWS } from '../careers/data';

// What we stand for (owner, 2026-10-06: the live site's Integrity, Reliability, Personnel,
// redone; Mobbin: Koto's values, each a panel with its own light). Three dark glass cards:
// a rust light rises in each card's upper half and blurs through the glass panel that holds
// the word, the line, and one checkable proof. Desktop: three across, rising into place as
// they scroll in. Phones: the cards stack and pile up under the running head as you scroll.
const VALUES: { name: string; light: 'sun' | 'horizon' | 'three'; line: string; proof: string; href?: string }[] = [
  {
    name: 'Integrity',
    light: 'sun',
    line: 'Communication is part of the job. We are open and direct with clients about the post, the people on it, and anything that goes wrong.',
    proof: 'Rated Exceptional on 16 of 18 client criteria',
  },
  {
    name: 'Reliability',
    light: 'horizon',
    line: 'On-call coverage is written into every contract, and leadership works the first shift on every new post. An unstaffed site is an exposure, not a saving.',
    proof: 'On-call coverage in every contract',
  },
  {
    name: 'Personnel',
    light: 'three',
    line: 'Our officers are the backbone of the business. Well-trained, healthy employees give every client better service.',
    proof: 'Rated 4.8 / 5 by our employees on Indeed',
    href: INDEED_REVIEWS,
  },
];

export default function Values() {
  return (
    <section id="values" className="ds-values" aria-labelledby="values-title">
      <div className="ds-values-head">
        <h2 id="values-title" className="ds-display-lg">
          What we stand for.
        </h2>
        <p className="ds-lead">Three things we hold to on every post, and how to check them.</p>
      </div>
      <ul className="ds-values-list">
        {VALUES.map((v) => (
          <li key={v.name} className="ds-value" data-light={v.light}>
            <div className="ds-value-light" aria-hidden="true" />
            <div className="ds-value-glass">
              <h3>{v.name}</h3>
              <p>{v.line}</p>
              {v.href ? (
                <a href={v.href} target="_blank" rel="noopener noreferrer" className="ds-data ds-value-proof">
                  {v.proof}
                  <Arrow external size={12} />
                </a>
              ) : (
                <p className="ds-data ds-value-proof">{v.proof}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
