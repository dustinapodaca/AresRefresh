import { Link } from 'react-router-dom';
import { SEO } from '../../seo/routes';

// Visible breadcrumbs (copy audit group 2; owner chose them, 2026-10-10): the same trail the
// BreadcrumbList JSON-LD gives search engines (routes.json), shown small above the headline
// on service, industry, city, and article pages. The one owner-approved exception to "no
// eyebrows above headlines": it is navigation, not a label.
export default function Crumbs({ path, current }: { path: string; current: string }) {
  const trail = SEO[path]?.breadcrumbs;
  if (!trail?.length) return null;
  return (
    <nav className="ds-crumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Home</Link></li>
        {trail.map((c) => (
          <li key={c.path}><Link to={c.path}>{c.name}</Link></li>
        ))}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
