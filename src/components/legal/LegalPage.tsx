import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../seo/Seo';

// The legal pages ("The Fine Print", docs/legal-concepts.md): privacy, terms, and
// accessibility read as documents in the file. A sticky side column switches between the
// three and tracks the section in view (Stripe and Framer on Mobbin); each opens with an
// at-a-glance ledger before the full text. Design authority: DESIGN.md.

export type LegalSection = { id: string; title: string; body: ReactNode };
export type GlanceRow = { label: string; value: ReactNode };

const DOCS = [
  { to: '/privacy', label: 'Privacy policy' },
  { to: '/terms', label: 'Terms of use' },
  { to: '/accessibility', label: 'Accessibility' },
];

// The current section is the last one whose top has passed 30% of the viewport, or the
// last section once the footer is in view.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Short closing sections never reach the line; at the page's end, the last one is current.
      const end = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const footer = document.querySelector('.ds-footer');
      const docEnd = footer ? footer.getBoundingClientRect().top <= window.innerHeight : false;
      if (end || docEnd) current = ids[ids.length - 1];
      setActive((a) => (a === current ? a : current));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);
  return active;
}

export default function LegalPage({
  path,
  title,
  effective,
  intro,
  glance,
  sections,
}: {
  path: string;
  title: string;
  effective: string;
  intro: ReactNode;
  glance: GlanceRow[];
  sections: LegalSection[];
}) {
  const [ids] = useState(() => sections.map((s) => s.id));
  const active = useActiveSection(ids);

  return (
    <main id="main" tabIndex={-1} className="ds ds-page ds-lg">
      <Seo path={path} />
      <div className="ds-container ds-lg-grid">
        <aside className="ds-lg-side">
          <nav aria-label="Policies">
            <ul className="ds-lg-docs">
              {DOCS.map((d) => (
                <li key={d.to}>
                  <Link to={d.to} aria-current={d.to === path ? 'page' : undefined}>
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="ds-lg-toc" aria-label="On this page">
            <p className="ds-lg-toc-title">On this page</p>
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={active === s.id ? 'location' : undefined}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="ds-lg-doc" aria-labelledby="lg-title">
          <header className="ds-lg-head">
            <h1 id="lg-title" className="ds-display-lg">{title}</h1>
            <p className="ds-data ds-lg-meta">
              <span>Effective {effective}</span>
              <span>Ares Security LLC</span>
            </p>
            <div className="ds-lg-intro">{intro}</div>
          </header>

          <dl className="ds-lg-glance" aria-label="At a glance">
            {glance.map((g) => (
              <div className="ds-ledger-row" key={g.label}>
                <dt>{g.label}</dt>
                <dd className="ds-note">{g.value}</dd>
              </div>
            ))}
          </dl>

          <div className="ds-lg-body">
            {sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
                <h2 id={`${s.id}-title`}>{s.title}</h2>
                {s.body}
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
