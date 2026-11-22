import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../seo/Seo';
import Arrow from '../../components/Arrow';
import ColoradoMap from '../../components/locations/ColoradoMap';
import { CITIES, REGIONS } from '../../components/locations/data';
import { AskStrip, FaqSection } from '../../components/market/parts';
import { heroTitle } from '../../lib/heroTitle';
import '../../components/locations/areas.css';

// Service Areas, the hub over the city pages (owner, 2026-11-22: Ares goes Colorado-wide, from the
// Front Range to the Western Slope and the San Luis Valley). It answers "security company in
// Colorado" and hands each reader to their city. Three parts: the opening with Colorado drawn to
// scale (ColoradoMap, after Cloudflare's "Where we work"); the cities by region in three ruled
// columns (after Shopify's "Where we hire" and Slack's "Explore by region" on Mobbin), each row
// lighting its dot on the map; then licensing city by city, since Colorado has no statewide license
// and every city sets its own rule. Then the questions and the ask. Class prefix `ds-sa-`.

const COUNT_WORDS: Record<number, string> = { 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve' };

const FAQ = [
  {
    q: 'Does Colorado have a statewide security guard license?',
    a: 'No. Colorado has no statewide license for security companies or officers; a 2025 bill to create one was postponed indefinitely. Each city decides for itself, and the rules differ a great deal: Denver, Colorado Springs, Pueblo, and Alamosa license security companies, Durango, Glenwood Springs, and Trinidad require a general business license, and Grand Junction and Montrose require none. Ares holds what each city requires.',
  },
  {
    q: `Do you staff sites outside these ${COUNT_WORDS[CITIES.length] ?? CITIES.length} cities?`,
    a: 'Often, yes. We staff the counties around each city, and we take posts elsewhere in Colorado when we can license and supervise them properly. Some towns and counties set their own rules, so we check what the place requires before we quote. Tell us the address and the hours, and we will tell you plainly whether we can staff it and when.',
  },
  {
    q: 'How do you run posts far from Colorado Springs?',
    a: 'The same way we run them at home. A member of our leadership walks every new site before anything is signed and writes the post orders with you, each officer is trained on the post before the first shift, and on-call coverage is built into every contract, so a missed shift is covered from the same schedule. You get one point of contact for the post, wherever it is.',
  },
];

export default function ServiceAreas() {
  const [active, setActive] = useState<string | null>(null);
  const on = (slug: string) => ({
    onMouseEnter: () => setActive(slug),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(slug),
    onBlur: () => setActive(null),
  });

  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-loc ds-sa">
      <Seo path="/locations" />

      <section className="ds-sa-open" aria-labelledby="sa-title">
        <div className="ds-container ds-sa-open-grid">
          <div className="ds-sa-open-copy">
            <h1 id="sa-title" className="ds-display-xl">{heroTitle('Security officers across Colorado')}</h1>
            <p className="ds-lead">
              Armed and unarmed officers in {COUNT_WORDS[CITIES.length] ?? CITIES.length} Colorado cities, from the Front Range to the Western Slope and the San
              Luis Valley. Headquartered in Colorado Springs since 2021, and licensed the way each city requires.
            </p>
            {/* Below 1024px only: from there up the nav carries the quote button. */}
            <div className="ds-actions ds-loc-actions">
              <Link to="/contact" className="ds-btn ds-btn-primary">
                Request a Quote
                <Arrow />
              </Link>
              <a href="tel:+17196963966" className="ds-link">
                Call <span className="ds-data">719-696-3966</span>
              </a>
            </div>
          </div>
          <ColoradoMap active={active} />
        </div>
      </section>

      <div className="ds-container">
        <section className="ds-sa-regions" aria-labelledby="sa-regions-title">
          <h2 id="sa-regions-title" className="ds-display-lg">Where we staff.</h2>
          <div className="ds-sa-region-grid">
            {REGIONS.map((r) => {
              const cities = CITIES.filter((c) => c.region === r.id);
              return (
                <div key={r.id} id={r.id} className="ds-sa-region">
                  <h3 className="ds-sa-region-name">{r.name}</h3>
                  <p className="ds-sa-region-line">{r.line}</p>
                  <ul className="ds-sa-city-list">
                    {cities.map((c) => (
                      <li key={c.slug}>
                        <Link to={c.path} {...on(c.slug)}>
                          <span className="ds-sa-city">
                            {c.name}
                            {c.slug === 'colorado-springs' && <span className="ds-sa-hq ds-data">HQ</span>}
                          </span>
                          <span className="ds-sa-county">{c.counties}</span>
                          <Arrow size={16} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="ds-sa-rules" aria-labelledby="sa-rules-title">
          <div className="ds-sa-rules-head">
            <h2 id="sa-rules-title" className="ds-display-lg">Licensing, city by city.</h2>
            <p className="ds-body">
              Colorado has no statewide security license, so each city decides what a security company needs. Here is what each one
              requires, and what Ares holds there.
            </p>
          </div>
          <table className="ds-sa-table">
            <thead>
              <tr>
                <th scope="col">City</th>
                <th scope="col">What the city requires</th>
                <th scope="col">What Ares holds</th>
              </tr>
            </thead>
            <tbody>
              {CITIES.map((c) => (
                <tr key={c.slug}>
                  <th scope="row">
                    <Link to={c.path} className="ds-link" {...on(c.slug)}>
                      {c.name}
                    </Link>
                  </th>
                  <td>{c.rule}</td>
                  <td className={/\d/.test(c.held) ? 'ds-data' : undefined}>{c.held}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <FaqSection items={FAQ} />
        <AskStrip line="Have a post anywhere in Colorado? Tell us where." quote="/contact" />
      </div>
    </main>
  );
}
