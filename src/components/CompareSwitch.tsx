import { useLocation } from 'react-router-dom';

// Before / Now (owner, 2026-10-25), dev server only, never ships: jumps to the same page on the copy
// of the site as it was before the AI-tells pass (commit a382ed4, a worktree at ../react-before served
// on :5175) and back. The Before copy carries this same file, with side="before".
const PORTS = { now: 5173, before: 5175 } as const;

export default function CompareSwitch({ side = 'now' }: { side?: keyof typeof PORTS }) {
  const { pathname, search, hash } = useLocation();
  if (!import.meta.env.DEV) return null;
  const at = (s: keyof typeof PORTS) => `${window.location.protocol}//${window.location.hostname}:${PORTS[s]}${pathname}${search}${hash}`;
  const box: React.CSSProperties = {
    position: 'fixed',
    left: 12,
    bottom: 12,
    zIndex: 9999,
    display: 'flex',
    padding: 3,
    gap: 3,
    borderRadius: 4,
    background: 'rgb(12 13 15 / 0.94)',
    boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.16), 0 12px 32px rgb(0 0 0 / 0.5)',
    font: '500 13px/1 Inter, system-ui, sans-serif',
  };
  const tab = (s: keyof typeof PORTS, label: string): React.CSSProperties & { label: string } => ({
    label,
    padding: '8px 12px',
    borderRadius: 2,
    textDecoration: 'none',
    color: s === side ? '#000' : 'rgb(255 255 255 / 0.72)',
    background: s === side ? '#fff' : 'transparent',
  });
  return (
    <nav aria-label="Compare versions" style={box}>
      {(
        [
          ['before', 'Before'],
          ['now', 'Now'],
        ] as const
      ).map(([s, label]) => {
        const { label: text, ...style } = tab(s, label);
        return (
          <a key={s} href={at(s)} style={style} aria-current={s === side ? 'page' : undefined}>
            {text}
          </a>
        );
      })}
    </nav>
  );
}
