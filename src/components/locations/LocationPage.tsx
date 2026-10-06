import { Link } from 'react-router-dom';
import Seo from '../../seo/Seo';
import Arrow from '../Arrow';
import LocationMap from './LocationMap';
import { CITIES, type LocationFile } from './data';

// A location page: "The Local File" (docs/locations-concepts.md). It answers the search
// ("security guards in <city>"), shows the city's own license, lists the sites we are
// ready to staff there, then hands the reader on to the rest of the site. Design
// authority: DESIGN.md.
const ROUTES = [
  { to: '/services', title: 'Services', line: 'All six divisions and how we start a post' },
  { to: '/capability-statement', title: 'Capability Statement', line: 'GSA, UEI, CAGE, and the one-page PDF' },
  { to: '/about', title: 'About Ares', line: 'Who we are and how we work' },
];

export default function LocationPage({ file }: { file: LocationFile }) {
  const others = CITIES.filter((c) => c.slug !== file.city.slug);

  return (
    <main className="ds ds-page ds-loc">
      <Seo path={file.path} />

      <section className="ds-loc-open" aria-labelledby="loc-title">
        <div className="ds-container ds-loc-open-grid">
          <div className="ds-loc-open-copy">
            <h1 id="loc-title" className="ds-display-xl">{file.title}</h1>
            <p className="ds-lead">{file.lead}</p>
            {/* Below 1024px only: from there up the nav carries the quote button. */}
            <div className="ds-actions ds-loc-actions">
              <Link to="/contact" className="ds-btn ds-btn-primary">
                Request a quote
                <Arrow />
              </Link>
              <a href="tel:+17196963966" className="ds-link">
                Call <span className="ds-data">719-696-3966</span>
              </a>
            </div>
          </div>
          <LocationMap focus={file.city} landmarks={file.landmarks} focusSide={file.focusSide} />
        </div>
      </section>

      <div className="ds-container">
        <section className="ds-loc-license" aria-labelledby="loc-license-title">
          <div className="ds-loc-license-head">
            <h2 id="loc-license-title" className="ds-display-lg">{file.licenseTitle}</h2>
            <p className="ds-body">{file.licenseIntro}</p>
          </div>
          <dl className="ds-loc-ledger">
            {file.license.map((r) => (
              <div className="ds-ledger-row" key={r.label}>
                <dt>{r.label}</dt>
                <dd className={r.mono ? 'ds-data' : 'ds-note'}>{r.value}</dd>
                {r.route && (
                  <dd className="ds-ledger-route">
                    {'links' in r.route ? (
                      <span className="ds-loc-routes-inline">
                        {r.route.links.map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
                            className="ds-link"
                            {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            {l.label}
                            <Arrow external={l.external} size={14} />
                          </a>
                        ))}
                      </span>
                    ) : (
                      <span className="ds-small">{r.route.note}</span>
                    )}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </section>

        <section className="ds-loc-sectors" aria-labelledby="loc-sectors-title">
          <h2 id="loc-sectors-title" className="ds-display-md">{file.sectorsTitle}</h2>
          {/* Two columns read downward; the first column's last row closes with a rule. */}
          <ul className="ds-loc-sector-list" style={{ ['--rows' as string]: Math.ceil(file.sectors.length / 2) }}>
            {file.sectors.map((s, i) => (
              <li key={s.name} data-col-end={i === Math.ceil(file.sectors.length / 2) - 1 || undefined}>
                <Link to={`/services#${s.divisionId}`}>
                  <span className="ds-loc-sector">{s.name}</span>
                  <span className="ds-small">{s.division}</span>
                  <Arrow size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <nav className="ds-loc-next" aria-labelledby="loc-next-title">
          <h2 id="loc-next-title" className="sr-only">Where to next</h2>
          <ul className="ds-loc-routes">
            {ROUTES.map((r) => (
              <li key={r.to}>
                <Link to={r.to}>
                  <span className="ds-loc-route-title">{r.title}</span>
                  <span className="ds-small">{r.line}</span>
                  <Arrow size={20} />
                </Link>
              </li>
            ))}
          </ul>
          <p className="ds-loc-also">
            Also licensed in{' '}
            {others.map((c, i) => (
              <span key={c.slug}>
                {i > 0 && ' and '}
                <Link to={c.path} className="ds-link">{c.name}</Link>
              </span>
            ))}
            .
          </p>
        </nav>
      </div>
    </main>
  );
}
