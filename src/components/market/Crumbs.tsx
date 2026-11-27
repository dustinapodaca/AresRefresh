import { Link } from 'react-router-dom';
import { SEO } from '../../seo/routes';

// Visible breadcrumbs (copy audit group 2; owner chose them, 2026-10-10): the same trail the
// BreadcrumbList JSON-LD gives search engines (routes.json), shown small above the headline
// on service, industry, city, and article pages. The one owner-approved exception to "no
// eyebrows above headlines": it is navigation, not a label.
// `section` ends the visible trail on a link instead of the current page's name (Insights articles:
// the topic, owner 2026-11-27; the headline right under it already names the page). The JSON-LD
// trail is unchanged.
export default function Crumbs({ path, current, section }: { path: string; current: string; section?: { name: string; to: string } }) {
  const trail = SEO[path]?.breadcrumbs;
  if (!trail?.length) return null;
  return (
    <nav className="ds-crumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Home</Link></li>
        {trail.map((c) => (
          <li key={c.path}><Link to={c.path}>{c.name}</Link></li>
        ))}
        {section ? <li><Link to={section.to}>{section.name}</Link></li> : <li aria-current="page">{current}</li>}
      </ol>
    </nav>
  );
}
