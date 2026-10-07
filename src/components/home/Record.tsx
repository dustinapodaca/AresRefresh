import Arrow from '../Arrow';
import { INDEED_REVIEWS } from '../careers/data';

// 01 Record (owner, 2026-10-06; Mobbin: Lightdash and Ramp, proof cards over a wide quote).
// One grid: the three things we stand for, each led by its proof as a figure in its own
// light, then a client's words as a wide card. Dark glass over rust light, as in the
// footer. Desktop: the cards rise into place as they scroll in. Phones: they pile up.
const VALUES: {
  name: string;
  light: 'sun' | 'horizon' | 'three';
  figure: string;
  caption: string;
  href?: string;
  line: string;
}[] = [
  {
    name: 'Reliability',
    light: 'horizon',
    figure: '<1%',
    caption: 'Missed shifts since 2021',
    line: 'On-call coverage is written into every contract, and leadership works the first shift on every new post.',
  },
  {
    name: 'Integrity',
    light: 'sun',
    figure: '16/18',
    caption: 'Client criteria rated Exceptional',
    line: 'Communication is part of the job. We are open and direct about the post, the people on it, and anything that goes wrong.',
  },
  {
    name: 'Personnel',
    light: 'three',
    figure: '4.8/5',
    caption: 'Employee rating on Indeed',
    href: INDEED_REVIEWS,
    line: 'Our officers are the backbone of the business. Well-trained, healthy employees give every client better service.',
  },
];

export default function Record() {
  return (
    <section id="record" className="ds-record" aria-labelledby="record-title">
      <div className="ds-sec-head">
        <h2 id="record-title" className="ds-display-lg">
          The record so far.
        </h2>
        <p className="ds-lead">
          Federal agencies and commercial clients hire us for the same thing: a prepared officer
          on post, every shift.
        </p>
      </div>

      <ul className="ds-values-list">
        {VALUES.map((v) => (
          <li key={v.name} className="ds-value" data-light={v.light}>
            <div className="ds-value-light">
              <p className="ds-data ds-value-figure">{v.figure}</p>
              {v.href ? (
                <a href={v.href} target="_blank" rel="noopener noreferrer" className="ds-value-caption">
                  {v.caption}
                  <Arrow external size={12} />
                </a>
              ) : (
                <p className="ds-value-caption">{v.caption}</p>
              )}
            </div>
            <div className="ds-value-glass">
              <h3>{v.name}</h3>
              <p>{v.line}</p>
            </div>
          </li>
        ))}
        <li className="ds-value ds-value-quote" data-light="wide">
          <div className="ds-value-light" aria-hidden="true" />
          <figure className="ds-value-glass">
            <blockquote>
              <p>“Ares arrived prepared. Their documentation was cleaner than the incumbent’s from day one.”</p>
            </blockquote>
            <figcaption>
              <span>Contracting Officer</span>
              <span>USAF · Buckley Space Force Base</span>
            </figcaption>
          </figure>
        </li>
      </ul>
    </section>
  );
}
