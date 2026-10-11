import { Link, useSearchParams } from 'react-router-dom';
import { SEO } from '../../seo/routes';

// Visible breadcrumbs (copy audit group 2, an option for the owner at ?crumbs=1): the same
// trail the BreadcrumbList JSON-LD already gives search engines (routes.json), shown small
// above the headline on service, industry, city, and article pages. Off by default: DESIGN.md
// bans eyebrows above headlines, so the owner decides whether a trail reads like one.
export default function Crumbs({ path, current }: { path: string; current: string }) {
  const [params] = useSearchParams();
  const trail = SEO[path]?.breadcrumbs;
  if (params.get('crumbs') !== '1' || !trail?.length) return null;
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
