import { useRef, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useMotion, useScene } from '../home/motion';

// The object system (owner, 2026-10-19; /home-next): in place of cards, three objects from Ares's
// own world. The Node (a post label above an object), the ledger chip (a fact set on a photo), and
// the Statement (one very large line per section). Nothing here draws a box around text.

/**
 * The Statement: Inter Tight 600 at clamp(56px, 9vw, 168px). Each word reads itself in with the
 * scroll (0.15 to 1, rising 0.35em) once the engine runs; until then, and for readers, the plain
 * line (the heading carries it in aria-label while the words are split).
 */
export function Statement({
  as: Tag = 'h2',
  id,
  className = '',
  children,
  start = 'top 85%',
  end = 'top 50%',
  style,
}: {
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
  children: string;
  start?: string;
  end?: string;
  style?: CSSProperties;
}) {
  const engine = useMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  useScene(ref, ({ gsap }, root) => {
    gsap.fromTo(
      root.querySelectorAll('.hn-w'),
      { opacity: 0.15, y: '0.35em' },
      { opacity: 1, y: 0, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: root, start, end, scrub: true } },
    );
  });
  const cls = `hn-statement ${className}`.trim();
  if (!engine) {
    return (
      <Tag id={id} className={cls} style={style}>
        {children}
      </Tag>
    );
  }
  const words = children.split(' ');
  return (
    <Tag ref={ref} id={id} className={cls} style={style} aria-label={children}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <span className="hn-w">{w}</span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </Tag>
  );
}

type NodeProps = {
  /** What it is (left of the label bar) and its ID or status (right). */
  label: string;
  meta?: ReactNode;
  /** Rust dot for active, faint for idle. */
  status?: 'active' | 'idle';
  /** An internal route or an external URL makes the whole Node a link. */
  to?: string;
  href?: string;
  /** The cursor label shown over it (desktop). */
  cursor?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Plain text objects get no photo frame. */
  kind?: 'photo' | 'text';
};

/**
 * The Node, after flora's nodes in Ares's language: a field tag above the object, outside it (mono
 * 12px, a 6px status dot, what it is on the left and its ID on the right), then the object itself:
 * a photo (4px corners, hairline edge), a figure, a small diagram, or a line of text, never boxed.
 * Pointer hover: the dot turns rust, the object lifts 4px, and two rust crop marks draw in at its
 * corners.
 */
export function Node({ label, meta, status = 'idle', to, href, cursor, className = '', style, children, kind = 'text' }: NodeProps) {
  const inner = (
    <>
      <span className="hn-node-bar">
        <span className="hn-node-dot" aria-hidden="true" />
        <span className="hn-node-label">{label}</span>
        {meta != null && <span className="hn-node-meta">{meta}</span>}
      </span>
      <span className="hn-node-body" data-kind={kind}>
        {children}
        <i className="hn-crop hn-crop-tl" aria-hidden="true" />
        <i className="hn-crop hn-crop-br" aria-hidden="true" />
      </span>
    </>
  );
  const cls = `hn-node ${className}`.trim();
  const common = { className: cls, style, 'data-status': status, 'data-cursor': cursor };
  if (to) return <Link to={to} {...common}>{inner}</Link>;
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <a href={href} {...common} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  }
  return <div {...common}>{inner}</div>;
}

/** A ledger row set on a photo: mono label over value, in a small dark frosted chip. */
export function Chip({ label, value, mono = false, className = '', style }: { label: string; value: string; mono?: boolean; className?: string; style?: CSSProperties }) {
  return (
    <div className={`hn-chip ${className}`.trim()} style={style}>
      <span className="hn-chip-label">{label}</span>
      <span className={mono ? 'hn-chip-value ds-data' : 'hn-chip-value'}>{value}</span>
    </div>
  );
}
