import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Arrow from '../Arrow';
import { GSA_ELIBRARY } from './links';
import { responsive } from '../../lib/responsive';
import { heroTitle } from '../../lib/heroTitle';
import Topography from './Topography';

// Hero options from the copy audit (round 2, 2026-10-10), for the owner to compare at
// /?hero=current|a|b|b1|b2|b3|b4|c. B2 is the default (owner, 2026-10-10; A was the audit's
// recommendation); the losing options and this switch come out when the client picks. No eyebrow above the headline
// (owner); the search phrase is carried by the title and description.
const OPTIONS = {
  current: {
    title: 'Security guards for federal and commercial sites.',
    lead: 'Ares is a minority woman-owned, employee-focused security firm in Colorado Springs, serving Denver and Pueblo. We bridge public-sector compliance and commercial reliability.',
    proof: false,
  },
  a: {
    title: 'Security for sites where every entry counts.',
    // Escorts no longer lead the line, and the sites are named broadly (owner, 2026-10-10:
    // not first, not twice, and not "military construction" up front).
    lead: 'Armed and unarmed officers, access control, and restricted-area escorts along Colorado\u2019s Front Range, for government and critical sites as well as offices, retail, and campuses.',
    proof: true,
  },
  b: {
    title: 'Security guards and escorts for Colorado\u2019s controlled sites.',
    lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.',
    proof: true,
  },
  // Shorter headlines over B's lead (owner, 2026-10-10: B is too long, keep its line).
  b1: { title: 'Security guards for Colorado sites.', lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.', proof: true },
  b2: { title: 'A prepared officer on every post.', lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.', proof: true },
  b3: { title: 'Armed and unarmed, across Colorado.', lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.', proof: true },
  b4: { title: 'Every entry counts.', lead: 'From restricted areas and data centers to offices and campuses: officers trained on your post before the first shift.', proof: true },
  c: {
    title: 'Escorts. Access control. Officers. One standard.',
    lead: 'Every Ares post runs on written post orders, on-site training, and on-call relief, whether it\u2019s a restricted area or a retail floor.',
    proof: true,
  },
} as const;
type OptionKey = keyof typeof OPTIONS;

export default function Hero() {
  const [params] = useSearchParams();
  const asked = params.get('hero');
  // B2 is the default for now (owner, 2026-10-10: "A prepared officer on every post." over
  // B's line); the other options stay at /?hero=.
  const hero = OPTIONS[(asked && asked in OPTIONS ? asked : 'b2') as OptionKey];
  const bg = params.get('herobg') === 'photo' ? 'photo' : 'topo';
  // The terrain is drawn in the browser only, after mount, and never for automated browsers:
  // the build's prerender (headless Chrome on Netlify, no GPU) drew it in software and timed out
  // on Home (2026-10-15). The snapshot keeps the empty dark box; the terrain fills it on load.
  const [live, setLive] = useState(false);
  // Desktop zooms out (owner, 2026-10-15): the component narrows its camera on wide screens, so
  // the land reads magnified there; smaller landforms from 900px. Phones keep the full size.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    if (!navigator.webdriver) setLive(true);
    const mq = window.matchMedia('(min-width: 900px)');
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return (
    <section className="ds-hero" aria-labelledby="hero-title">
      {/* The background (owner, 2026-10-15): React Bits' Topography, contour lines of a terrain
          in the site's rust drifting under the copy, the cursor lifting the land and a click
          sending a ring out. The copper-glass tower photo (hero6.jpg) moved to the Services
          opening and stays here at /?herobg=photo. Same box as the photo: full bleed from
          900px, running down under 01 Record. */}
      {bg === 'photo' ? (
        <div className="ds-hero-photo" aria-hidden="true">
          <img {...responsive('/images/hero6.jpg')} alt="" decoding="sync" {...{ fetchpriority: 'high' }} />
        </div>
      ) : (
        <div className="ds-hero-photo ds-hero-topo" aria-hidden="true">
          {live && <Topography
            color="#7a3c17"
            lineCount={22}
            lineWidth={1.2}
            // Elevation 0.5 (owner, 2026-10-15; was 1.15, then 0.65). Desktop's smaller landforms
            // scale the height down with them (0.5 x 0.55), or the hills keep their old steepness.
            elevation={wide ? 0.28 : 0.5}
            scale={wide ? 0.55 : 1}
            foreground={0.2}
            tilt={32}
            speed={0.25}
            direction="forward"
            glow={0.6}
            depthOfField={0.4}
            // Less distance fog (owner, 2026-10-15; was 0.35), so the far land reaches up behind the nav.
            fog={0.12}
            hoverEffect="lift"
            clickEffect="pulse"
          />}
        </div>
      )}

      <div className="ds-container">
        <div className="ds-hero-copy">
          <h1 id="hero-title" className="ds-display-xl">
            {heroTitle(hero.title)}
          </h1>
          <p className="ds-lead">{hero.lead}</p>
          {/* Below 1024px only: from there up the nav carries the quote button. */}
          <div className="ds-actions ds-hero-actions">
            <Link to="/contact" className="ds-btn ds-btn-primary">
              Request a Quote
              <Arrow />
            </Link>
            {/* No call link here (owner, 2026-10-13): the nav's handset and menu carry the phone. */}
          </div>
          {hero.proof ? (
            // The proof row (audit): one line each, every one checkable on the linked page.
            // The escort item came out (owner, 2026-10-10): the lead already names escorts.
            <ul className="ds-hero-proof" aria-label="Proof">
              <li>
                <span>GSA MAS</span>{' '}
                <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-data">
                  47QSMS25D009Q
                  <Arrow external size={12} />
                </a>
              </li>
              {/* Quiet facts, not links; GSA is the only route (copy audit round 3). */}
              <li>Minority woman-owned (WOSB, WBENC)</li>
              <li>Licensed in Colorado Springs, Denver, Pueblo</li>
            </ul>
          ) : (
            <div className="ds-hero-gsa">
              <img {...responsive('/images/gsa-contract-holder.png')} alt="GSA Contract Holder" width={125} height={30} />
              <div>
                <span className="ds-small">GSA Multiple Award Schedule</span>
                <a href={GSA_ELIBRARY} target="_blank" rel="noopener noreferrer" className="ds-link ds-data">
                  47QSMS25D009Q
                  <Arrow external size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
