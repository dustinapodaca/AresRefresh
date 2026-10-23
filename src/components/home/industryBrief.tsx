import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { INDUSTRY_PAGES, type IndustryPageData } from '../market/industries';
import { roleBySlug } from '../market/roles';

// The post brief for one industry (home-flora, 2026-10-20), shared by the desktop scene, the
// desktop list, and the phone deck (2026-10-22).

export const N = INDUSTRY_PAGES.length;
export const n2 = (i: number) => String(i + 1).padStart(2, '0');

export function Roles({ ind }: { ind: IndustryPageData }) {
  return (
    <ul className="nx-ind-roles">
      {ind.deliver.map((d) => {
        const r = roleBySlug(d.role);
        return (
          <li key={d.role}>
            <Link to={`/services/${d.role}`} className="nx-ind-role">
              {r?.name ?? d.role}
            </Link>
            <span>{d.line}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function Brief({ ind, i, scene }: { ind: IndustryPageData; i: number; scene?: boolean }) {
  return (
    <>
      <p className="nx-node-bar">
        <span>Post brief</span>
        <span>
          {n2(i)} / {n2(N - 1)}
        </span>
      </p>
      {scene && <h3 className="nx-ind-brief-name">{ind.name}</h3>}
      <p className="nx-ind-short">{ind.short}</p>
      <p className="nx-ind-label">What we staff</p>
      <Roles ind={ind} />
      <p className="nx-ind-label">What to send us</p>
      <p className="nx-ind-ask">{ind.ask}</p>
      <div className="nx-ind-actions">
        {/* Each brief ends on its industry page (owner, 2026-10-22: no quote button per industry). */}
        <Link to={`/industries/${ind.slug}`} className="ds-link">
          Open the {ind.name} page
          <Arrow />
        </Link>
      </div>
    </>
  );
}

