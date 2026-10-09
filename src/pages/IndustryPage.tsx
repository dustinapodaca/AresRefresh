import { Link, useParams } from 'react-router-dom';
import Seo from '../seo/Seo';
import Arrow from '../components/Arrow';
import NotFound from './NotFound';
import { INDUSTRY_PAGES, industryBySlug } from '../components/market/industries';
import { roleBySlug } from '../components/market/roles';
import { AskStrip, FaqSection, RouteRow, Sheet } from '../components/market/parts';
import { responsive } from '../lib/responsive';

// An industry page ("The Sector File", docs/market-concepts.md): what is at stake in this
// environment, what we deliver there, why Ares, a specific ask, and questions.
export default function IndustryPage() {
  const { slug } = useParams();
  const ind = industryBySlug(slug);
  if (!ind) return <NotFound />;
  const quote = `/contact?industry=${ind.slug}`;
  const others = INDUSTRY_PAGES.filter((i) => i.slug !== ind.slug);

  return (
    <main className="ds ds-page ds-mk">
      <Seo path={`/industries/${ind.slug}`} />

      <section className="ds-mk-ind-open" aria-labelledby="mk-title">
        <div className="ds-container">
          <h1 id="mk-title" className="ds-display-xl ds-mk-ind-title">{ind.title}</h1>
          <div className="ds-mk-ind-lead">
            <p className="ds-lead">{ind.lead}</p>
            <div className="ds-actions">
              <Link to={quote} className="ds-btn ds-btn-primary">
                Request a quote
                <Arrow />
              </Link>
              <a href="tel:+17196963966" className="ds-link">
                Call <span className="ds-data">719-696-3966</span>
              </a>
            </div>
          </div>
        </div>
        <div className="ds-mk-ind-band" aria-hidden="true">
          <img {...responsive(ind.image.src)} alt="" decoding="async" {...{ fetchpriority: 'high' }} />
        </div>
      </section>

      <div className="ds-container">
        <section className="ds-mk-sec ds-mk-split" aria-labelledby="mk-stake">
          <h2 id="mk-stake" className="ds-display-lg">What is at stake.</h2>
          <div className="ds-mk-prose">
            {ind.stake.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </section>

        <section className="ds-mk-sec ds-mk-sec-tight" aria-labelledby="mk-deliver">
          <h2 id="mk-deliver" className="ds-display-md">What we deliver.</h2>
          <RouteRow
            label="Services"
            items={ind.deliver.map((d) => {
              const r = roleBySlug(d.role)!;
              return { to: `/services/${r.slug}`, title: r.name, line: d.line };
            })}
          />
        </section>

        <section className="ds-mk-sec ds-mk-split" aria-labelledby="mk-why">
          <h2 id="mk-why" className="ds-display-md">Why Ares here.</h2>
          <Sheet rows={ind.why} label={`Why Ares for ${ind.name.toLowerCase()}`} />
        </section>

        <AskStrip line={ind.ask} quote={quote} />

        <FaqSection items={ind.faq} />

        <nav className="ds-mk-sec" aria-labelledby="mk-more">
          <h2 id="mk-more" className="ds-display-md">Other industries.</h2>
          <RouteRow label="Other industries" items={others.map((i) => ({ to: `/industries/${i.slug}`, title: i.name, line: i.short }))} />
        </nav>
      </div>
    </main>
  );
}
