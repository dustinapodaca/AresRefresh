import { useEffect, useState } from 'react';

// The running document marks. These are the only section numbers on the page.
export const MARKS = [
  { id: 'verify', n: '01', label: 'Verify' },
  { id: 'staffing', n: '02', label: 'Staffing' },
  { id: 'coverage', n: '03', label: 'Coverage' },
  { id: 'careers', n: '04', label: 'Careers' },
  { id: 'contact', n: '05', label: 'Contact' },
] as const;

// The current section is the last one whose top has passed 35% of the viewport.
// Null while the reader is still in the hero.
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const m of MARKS) {
        const el = document.getElementById(m.id);
        if (el && el.getBoundingClientRect().top <= line) current = m.id;
      }
      setActive(current);
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
  }, []);
  return active;
}

export default function DocRail() {
  const active = useActiveSection();
  const current = MARKS.find((m) => m.id === active);

  return (
    <>
      <aside className="ds-rail" aria-label="On this page">
        <nav className="ds-rail-nav">
          <div className="ds-rail-inner">
            <span className="ds-rail-fill" aria-hidden="true" />
            <ol>
              {MARKS.map((m) => (
                <li key={m.id}>
                  <a href={`#${m.id}`} aria-current={active === m.id ? 'location' : undefined}>
                    <span>{m.n}</span>
                    <span>{m.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </aside>

      {/* Below 1200px the rail collapses into a running head under the header. */}
      <div className="ds-runhead" data-visible={Boolean(current)} aria-hidden="true">
        <div className="ds-container">
          <span>{current ? current.label : ''}</span>
          <span>{current ? `${current.n} / 05` : ''}</span>
        </div>
        <span className="ds-runhead-fill" />
      </div>
    </>
  );
}
