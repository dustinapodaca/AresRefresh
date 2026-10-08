import { Link, useParams } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import NotFound from './NotFound';
import { CAREERS_EMAIL, INDEED_REVIEWS, REASONS, ROLES, applyHref } from '../components/careers/data';
import { CITY_JOBS, cityJobsBySlug } from '../components/market/cityJobs';

// City job pages (/careers/<city>): the roles open in that city, how licensing works there,
// why people stay, and how to apply. Recruiting beside the city service pages.
export default function CityJobsPage() {
  const { city } = useParams();
  const c = cityJobsBySlug(city);
  if (!c) return <NotFound />;
  const roles = ROLES.filter((r) => r.where.includes(c.city));
  const others = CITY_JOBS.filter((o) => o.slug !== c.slug);

  return (
    <main className="ds ds-page ds-mk">
      <Seo path={`/careers/${c.slug}`} />
      <section className="ds-container ds-mk-open ds-mk-open-solo" aria-labelledby="mk-title">
        <div className="ds-mk-open-copy">
          <h1 id="mk-title" className="ds-display-xl">{c.title}</h1>
          <p className="ds-lead">{c.lead}</p>
          <div className="ds-actions">
            <a href="#roles" className="ds-btn ds-btn-primary">
              See open roles
              <Arrow />
            </a>
            <a href={applyHref()} className="ds-link ds-data">{CAREERS_EMAIL}</a>
          </div>
        </div>
      </section>

      <div className="ds-container">
        <section id="roles" className="ds-mk-sec" aria-labelledby="mk-roles">
          <h2 id="mk-roles" className="ds-display-lg">Open roles in {c.city}.</h2>
          <ul className="ds-mk-jobs">
            {roles.map((r) => (
              <li key={r.title}>
                <div>
                  <h3>{r.title}</h3>
                  <p className="ds-small">{r.line}</p>
                </div>
                <a href={applyHref(`${r.title}, ${c.city}`)} className="ds-link">
                  Apply
                  <Arrow size={14} />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="ds-mk-sec ds-mk-split" aria-labelledby="mk-license">
          <h2 id="mk-license" className="ds-display-md">Licensing, handled.</h2>
          <div className="ds-mk-prose">
            <p>{c.licensing}</p>
          </div>
        </section>

        <section className="ds-mk-sec ds-mk-split" aria-labelledby="mk-why">
          <h2 id="mk-why" className="ds-display-md">Why people stay.</h2>
          <div>
            <ul className="ds-mk-reasons">
              {REASONS.map((r) => (
                <li key={r.name}>
                  <h3>{r.name}</h3>
                  <p>{r.line}</p>
                </li>
              ))}
            </ul>
            <a href={INDEED_REVIEWS} target="_blank" rel="noopener noreferrer" className="ds-link ds-mk-indeed">
              Rated 4.8 / 5 by our employees on Indeed
              <Arrow external size={12} />
            </a>
          </div>
        </section>

        <nav className="ds-mk-sec" aria-labelledby="mk-more">
          <h2 id="mk-more" className="ds-display-md">Jobs in other cities.</h2>
          <ul className="ds-mk-routes" aria-label="Other cities">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={`/careers/${o.slug}`}>
                  <span className="ds-mk-route-title">{o.city}</span>
                  <span className="ds-small">Security jobs in {o.city}</span>
                  <Arrow size={18} />
                </Link>
              </li>
            ))}
            <li>
              <Link to="/careers">
                <span className="ds-mk-route-title">All careers</span>
                <span className="ds-small">Every open role and how to apply</span>
                <Arrow size={18} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
