import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useSearchParams } from 'react-router-dom';
import PrimePipeline from './PrimePipeline';

// The prime contractor diagram, reworked (owner, 2026-10-16: the boxed cards, green tags, and rust
// dots read as AI-made). Four whole versions, desktop and phone, to compare at
// /?pdiag=chain|fork|contract|sentence; `pipeline` (the boxed cards) stays the default until the
// owner picks. None of them uses a box, a tag, or a decorative dot: type, hairlines, and drawn lines
// carry it, with one rust mark where it means something (Ares) and mono only for the identifiers.
// Each has one authored moment, played once when it is well in view; the text is visible before,
// during, and after it, and reduced motion shows the finished state. Every fact is already on the
// panel. After Mobbin: Titan Intake and V7 (fork lines), the AI in Design Report credits (ruled role
// list), Analogue Agency (bracketed lists).
const FORMS = ['pipeline', 'chain', 'fork', 'contract', 'sentence'] as const;
type Form = (typeof FORMS)[number];

const POSTS = ['Restricted-Area Escort', 'Access Control', 'Relief & Surge'];
const LABEL =
  'The prime holds the contract; Ares, a woman-owned subcontractor, staffs restricted-area escort, access control, and relief posts under it';

export default function PrimeDiagram() {
  const [params] = useSearchParams();
  const asked = params.get('pdiag');
  const form: Form = FORMS.includes(asked as Form) ? (asked as Form) : 'pipeline';
  if (form === 'pipeline') return <PrimePipeline />;
  if (form === 'chain') return <Chain />;
  if (form === 'fork') return <Fork />;
  if (form === 'contract') return <Contract />;
  return <Sentence />;
}

// Plays the one moment once the figure is well in view. `armed` (set on mount, never in the
// prerender) is what allows the start state, so without JS everything is simply drawn.
function useMoment<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<'' | 'armed' | 'in'>('');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('in');
      return;
    }
    setState('armed');
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setState('in');
        io.disconnect();
      },
      { threshold: 0.45, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, attrs: { 'data-armed': state === 'armed' || undefined, 'data-in': state === 'in' || undefined } };
}

// 1. chain: the three parties as a ruled ledger on a 1px track, the rail's rust tick on Ares.
function Chain() {
  const { ref, attrs } = useMoment<HTMLElement>();
  return (
    <figure ref={ref} className="ds-pdiag ds-pd-chain" aria-label={LABEL} {...attrs}>
      <span className="ds-pd-track" aria-hidden="true">
        <span />
      </span>
      <ol>
        <li>
          <span className="ds-pd-role">Holds the contract</span>
          <span className="ds-pd-name">Prime contractor</span>
          <span className="ds-pd-note">Needs posts covered under its contract</span>
        </li>
        <li data-ares>
          <span className="ds-pd-role">Subcontractor</span>
          <span className="ds-pd-name">Ares Security</span>
          <span className="ds-pd-note">
            Subcontracting credit as a woman-owned small business
            <span className="ds-data ds-pd-codes">WOSB250470 · WBE2303571</span>
          </span>
        </li>
        <li>
          <span className="ds-pd-role">On post</span>
          <ul className="ds-pd-posts">
            {POSTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </li>
      </ol>
    </figure>
  );
}

// 2. fork: no boxes. The names in type, joined by thin lines that fork from Ares to the posts and
// draw in once, in order.
function Fork() {
  const { ref, attrs } = useMoment<HTMLElement>();
  const prime = useRef<HTMLDivElement>(null);
  const ares = useRef<HTMLDivElement>(null);
  const posts = useRef<(HTMLLIElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const draw = () => {
      const r = root.getBoundingClientRect();
      const a = prime.current!.getBoundingClientRect();
      const b = ares.current!.getBoundingClientRect();
      const cx = (el: DOMRect) => el.left + el.width / 2 - r.left;
      const out: string[] = [];
      // Prime to Ares: straight down.
      out.push(`M${cx(a)} ${a.bottom - r.top + 10} L${cx(b)} ${b.top - r.top - 10}`);
      // Ares to each post: down, then a soft turn toward the post, then down to it.
      const fromY = b.bottom - r.top + 10;
      posts.current.forEach((p) => {
        if (!p) return;
        const t = p.getBoundingClientRect();
        const x = cx(t);
        const toY = t.top - r.top - 10;
        const midY = fromY + (toY - fromY) * 0.5;
        out.push(`M${cx(b)} ${fromY} C${cx(b)} ${midY} ${x} ${midY} ${x} ${toY}`);
      });
      setPaths(out);
      setBox({ w: r.width, h: r.height });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(root);
    return () => ro.disconnect();
  }, [ref]);
  return (
    <figure ref={ref} className="ds-pdiag ds-pd-fork" aria-label={LABEL} {...attrs}>
      <svg className="ds-pd-lines" width={box.w} height={box.h} viewBox={`0 0 ${box.w || 1} ${box.h || 1}`} aria-hidden="true">
        {paths.map((d, i) => (
          <path key={i} d={d} pathLength={1} style={{ '--i': i } as CSSProperties} data-trunk={i === 0 || undefined} />
        ))}
      </svg>
      <div ref={prime} className="ds-pd-node">
        <span className="ds-pd-name">Prime contractor</span>
        <span className="ds-pd-role">Holds the contract</span>
      </div>
      <div ref={ares} className="ds-pd-node" data-ares>
        <span className="ds-pd-name">Ares Security</span>
        <span className="ds-pd-role">Subcontractor, woman-owned small business</span>
        <span className="ds-data ds-pd-codes">WOSB250470 · WBE2303571</span>
      </div>
      <ul className="ds-pd-posts">
        {POSTS.map((p, i) => (
          <li key={p} ref={(el) => (posts.current[i] = el)} style={{ '--i': i } as CSSProperties}>
            {p}
          </li>
        ))}
      </ul>
    </figure>
  );
}

// 3. contract: the relationship as the outline of a contract, numbered by its place in the
// hierarchy (the numbers carry the nesting), with drawn elbows.
function Contract() {
  const { ref, attrs } = useMoment<HTMLElement>();
  return (
    <figure ref={ref} className="ds-pdiag ds-pd-contract" aria-label={LABEL} {...attrs}>
      <ol>
        <li>
          <span className="ds-data ds-pd-num">1</span>
          <span className="ds-pd-name">Prime contract</span>
          <span className="ds-pd-note">Held by the prime, who needs the posts covered</span>
          <ol>
            <li data-ares>
              <span className="ds-data ds-pd-num">1.1</span>
              <span className="ds-pd-name">Subcontract, Ares Security</span>
              <span className="ds-pd-note">
                Woman-owned small business, for subcontracting credit
                <span className="ds-data ds-pd-codes">SBA WOSB250470 · WBENC WBE2303571</span>
              </span>
              <ol className="ds-pd-posts">
                {POSTS.map((p, i) => (
                  <li key={p} style={{ '--i': i } as CSSProperties}>
                    <span className="ds-data ds-pd-num">1.1.{i + 1}</span>
                    {p}
                  </li>
                ))}
              </ol>
            </li>
          </ol>
        </li>
      </ol>
    </figure>
  );
}

// 4. sentence: one editorial line, the relationship read left to right, the identifiers beneath as
// a footnote.
function Arrow() {
  return (
    <svg className="ds-pd-arrow" width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 8h23M19 2.5 25 8l-6 5.5" />
    </svg>
  );
}
function Sentence() {
  const { ref, attrs } = useMoment<HTMLElement>();
  return (
    <figure ref={ref} className="ds-pdiag ds-pd-sentence" aria-label={LABEL} {...attrs}>
      <p className="ds-pd-line">
        <span className="ds-pd-keep" style={{ '--i': 0 } as CSSProperties}>
          Prime contractor
          <Arrow />
        </span>{' '}
        <span className="ds-pd-keep" data-ares style={{ '--i': 1 } as CSSProperties}>
          Ares Security
          <Arrow />
        </span>{' '}
        <span style={{ '--i': 2 } as CSSProperties}>Restricted-Area Escort, Access Control, and Relief &amp; Surge</span>
      </p>
      <dl className="ds-pd-foot">
        <div>
          <dt>The prime</dt>
          <dd>Holds the contract and needs the posts covered</dd>
        </div>
        <div>
          <dt>Ares</dt>
          <dd>
            Woman-owned subcontractor, for subcontracting credit{' '}
            <span className="ds-data ds-pd-codes">WOSB250470 · WBE2303571</span>
          </dd>
        </div>
      </dl>
    </figure>
  );
}
