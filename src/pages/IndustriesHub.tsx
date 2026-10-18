import { Link } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import { INDUSTRY_PAGES } from '../components/market/industries';

// The industries hub (web audit, 2026-10-18): /industries returned 404 though every industry
// page's breadcrumb pointed there. The six in the owner's order, as ruled rows like Insights,
// with Home's headline and lead.
export default function IndustriesHub() {
  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-mk">
      <Seo path="/industries" />
      <section className="ds-container ds-mk-open ds-mk-open-solo" aria-labelledby="mk-title">
        <div className="ds-mk-open-copy">
          <h1 id="mk-title" className="ds-display-xl">The sites we protect</h1>
          <p className="ds-lead">
            Six industries, from government facilities and critical sites to offices and
            campuses. Each has its own page: what the post covers and what to send us.
          </p>
        </div>
      </section>
      <div className="ds-container">
        <ul className="ds-mk-posts">
          {INDUSTRY_PAGES.map((ind) => (
            <li key={ind.slug}>
              <Link to={`/industries/${ind.slug}`}>
                <span className="ds-mk-post-title">{ind.name}</span>
                <span className="ds-mk-post-sum">{ind.short}</span>
                <Arrow size={18} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
