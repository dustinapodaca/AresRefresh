import { useRef, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { responsive } from '../../lib/responsive';
import { useMotion, useScene } from '../home/motion';
import { useMediaQuery } from '../home/useMediaQuery';
import { Node, Statement } from './objects';
import GroundStill from './GroundStill';

// 4.4 For prime contractors (owner, 2026-10-19; /home-next): a real node canvas, no panel. The
// ground flattens into a dot-grid plane (Ground.tsx) and the section is the canvas, edge to edge:
// the prime, a wire tagged TEAMING and SUBCONTRACTING CREDIT down to Ares, and a fork of three
// wires to the three posts, each with its photo; the three proof points sit on the canvas beside
// the node each one proves. Desktop pins it while it builds with the scroll (prime, its wire, Ares,
// the fork, the posts in turn, then the proofs; scrolling back un-builds it); once built a rust
// pulse runs prime to Ares to the posts every 4s, and the canvas drifts a few px with the cursor.
// The page's line is the wires. Phones and the static page: prime, Ares, and the posts stacked,
// the wires straight down, building once.

type P = { key: string; label: string; meta?: string; x: number; y: number; w: number; status?: 'active' | 'idle'; photo?: { src: string; pos?: string }; text?: string; sub?: string; mono?: boolean; kind?: 'node' | 'proof' };

// Positions are % of the canvas (desktop). The proofs sit beside the node they prove.
const NODES: P[] = [
  { key: 'prime', label: 'Prime contractor', meta: 'Holds the contract', x: 36, y: 2, w: 300, text: 'Posts covered under its contract' },
  { key: 'ares', label: 'Subcontractor', meta: 'WOSB250470', x: 42, y: 34, w: 300, status: 'active', text: 'Ares Security', sub: 'WBENC · WBE2303571' },
  { key: 'escort', label: 'Restricted-Area Escort', x: 6, y: 68, w: 210, photo: { src: '/images/market/government-military.webp', pos: '22% 80%' } },
  { key: 'access', label: 'Access Control', x: 38, y: 74, w: 210, photo: { src: '/images/backbone-officer.jpg', pos: '50% 30%' } },
  { key: 'relief', label: 'Relief & Surge', x: 70, y: 68, w: 210, photo: { src: '/images/careers-team.jpg', pos: '50% 40%' } },
  { key: 'p-ares', kind: 'proof', label: 'Subcontracting credit', meta: 'SBA WOSB', x: 77, y: 48, w: 210, text: 'Woman-owned small business' },
  { key: 'p-escort', kind: 'proof', label: 'Restricted areas', meta: '2025 to 2027', x: -2, y: 44, w: 250, text: 'Escort and access control on a Space Force base in Colorado' },
  { key: 'p-relief', kind: 'proof', label: 'Reliability', meta: 'Since 2021', x: 66, y: 104, w: 260, text: 'Fewer than 1% of shifts missed since 2021' },
];
const POSTS = ['escort', 'access', 'relief'];

export default function PrimesNext() {
  const engine = useMotion();
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 640px)', false);
  const scene = !!engine && wide;
  const ref = useRef<HTMLElement>(null);

  useScene(
    ref,
    ({ gsap, ScrollTrigger }, root) => {
      const node = (k: string) => root.querySelector<HTMLElement>(`[data-node="${k}"]`)!;
      if (!scene) {
        // Stacked: each node and its connector come in once.
        root.querySelectorAll<HTMLElement>('.hn-pn').forEach((n) => {
          gsap.fromTo(n, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: n, start: 'top 85%', toggleActions: 'play none none none' } });
        });
        return;
      }
      const canvas = root.querySelector<HTMLElement>('.hn-canvas')!;
      const svg = root.querySelector<SVGSVGElement>('.hn-wires')!;
      const wires = Array.from(svg.querySelectorAll<SVGPathElement>('.hn-wire'));
      const pulses = Array.from(svg.querySelectorAll<SVGPathElement>('.hn-pulse'));
      const ends = Array.from(svg.querySelectorAll<SVGRectElement>('.hn-wire-end'));
      const tags = Array.from(root.querySelectorAll<HTMLElement>('.hn-wire-tag'));

      // Wires from the foot of one node to the head of the next, as smooth S-curves. Measured from
      // the layout (offsets), so a node part way through its entrance doesn't bend them.
      const place = () => {
        svg.setAttribute('viewBox', `0 0 ${canvas.offsetWidth} ${canvas.offsetHeight}`);
        const foot = (k: string) => {
          const n = node(k);
          const body = n.querySelector<HTMLElement>('.hn-node-body')!;
          return [n.offsetLeft + n.offsetWidth / 2, n.offsetTop + body.offsetTop + body.offsetHeight + 4];
        };
        const head = (k: string) => {
          const n = node(k);
          return [n.offsetLeft + n.offsetWidth / 2, n.offsetTop - 8];
        };
        const pairs: [string, string][] = [['prime', 'ares'], ...POSTS.map((p) => ['ares', p] as [string, string])];
        pairs.forEach(([a, b], i) => {
          const [x0, y0] = foot(a);
          const [x1, y1] = head(b);
          const my = (y0 + y1) / 2;
          const d = `M${x0} ${y0} C${x0} ${my} ${x1} ${my} ${x1} ${y1}`;
          wires[i].setAttribute('d', d);
          pulses[i].setAttribute('d', d);
          ends[i * 2].setAttribute('x', String(x0 - 2.5));
          ends[i * 2].setAttribute('y', String(y0 - 2.5));
          ends[i * 2 + 1].setAttribute('x', String(x1 - 2.5));
          ends[i * 2 + 1].setAttribute('y', String(y1 - 2.5));
          if (i === 0) {
            // The two tags ride the prime-to-Ares wire.
            tags[0].style.transform = `translate(${(x0 + x1) / 2 + 14}px, ${y0 + (y1 - y0) * 0.3}px)`;
            tags[1].style.transform = `translate(${(x0 + x1) / 2 + 14}px, ${y0 + (y1 - y0) * 0.62}px)`;
          }
        });
      };
      place();

      const items = (keys: string[]) => keys.map(node);
      gsap.set([...items(['prime', 'ares', ...POSTS]), ...items(['p-ares', 'p-escort', 'p-relief'])], { autoAlpha: 0, y: 20 });
      gsap.set(wires, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set([...ends, ...tags], { autoAlpha: 0 });
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.to(node('prime'), { autoAlpha: 1, y: 0, duration: 0.5 }, 0)
        .to(ends[0], { autoAlpha: 1, duration: 0.1 }, 0.5)
        .to(wires[0], { strokeDashoffset: 0, duration: 0.8 }, 0.5)
        .to(tags, { autoAlpha: 1, duration: 0.3, stagger: 0.2 }, 0.8)
        .to(ends[1], { autoAlpha: 1, duration: 0.1 }, 1.25)
        .to(node('ares'), { autoAlpha: 1, y: 0, duration: 0.5 }, 1.3)
        .to([ends[2], ends[4], ends[6]], { autoAlpha: 1, duration: 0.1 }, 1.9)
        .to(wires.slice(1), { strokeDashoffset: 0, duration: 0.8, stagger: 0.15 }, 1.9);
      POSTS.forEach((p, i) => {
        tl.to(ends[3 + i * 2], { autoAlpha: 1, duration: 0.1 }, 2.6 + i * 0.25).to(node(p), { autoAlpha: 1, y: 0, duration: 0.5 }, 2.65 + i * 0.25);
      });
      tl.to(items(['p-ares', 'p-escort', 'p-relief']), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.25 }, 3.6).to({}, { duration: 0.6 }, 4.4);

      ScrollTrigger.create({
        trigger: root.querySelector('.hn-primes-scene'),
        start: 'top top',
        end: () => `+=${window.innerHeight * 1.6}`,
        pin: true,
        scrub: true,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: place,
        // The ambient pulse runs only once it is built.
        onUpdate: (self) => root.toggleAttribute('data-built', self.progress > 0.92),
      });

      // The canvas drifts a few px with the cursor, like a canvas you could pan.
      let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
      const tick = () => {
        raf = 0;
        cx += (tx - cx) * 0.06;
        cy += (ty - cy) * 0.06;
        canvas.style.translate = `${cx.toFixed(2)}px ${cy.toFixed(2)}px`;
        if (Math.abs(tx - cx) > 0.02 || Math.abs(ty - cy) > 0.02) raf = requestAnimationFrame(tick);
      };
      const onMove = (e: PointerEvent) => {
        tx = (e.clientX / window.innerWidth - 0.5) * -12;
        ty = (e.clientY / window.innerHeight - 0.5) * -8;
        if (!raf) raf = requestAnimationFrame(tick);
      };
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) window.addEventListener('pointermove', onMove, { passive: true });
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        window.removeEventListener('pointermove', onMove);
        cancelAnimationFrame(raf);
        canvas.style.translate = '';
      };
    },
    [scene],
  );

  return (
    <section ref={ref} id="primes" className="hn-primes" data-scene={scene ? 'on' : undefined} aria-labelledby="primes-title">
      <GroundStill name="plane" />
      <div className="hn-primes-scene">
        <div className="ds-container hn-primes-grid">
          <div className="hn-primes-copy">
            <Statement id="primes-title" className="hn-primes-title">
              For prime contractors.
            </Statement>
            <p className="hn-primes-line">
              <span>A woman-owned subcontractor for Front Range work.</span> Restricted-area escorts, access control officers, and relief, overflow, and surge coverage under your contract.
            </p>
            <Link to="/teaming" className="ds-btn ds-btn-primary">
              Teaming & subcontracting
              <Arrow />
            </Link>
          </div>

          <div className="hn-canvas" role="group" aria-label="The prime holds the contract; Ares, a woman-owned subcontractor, staffs restricted-area escort, access control, and relief and surge posts under it">
            {scene && (
              <svg className="hn-wires" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <path key={`w${i}`} className="hn-wire" pathLength={1} fill="none" />
                ))}
                {[0, 1, 2, 3].map((i) => (
                  <path key={`p${i}`} className="hn-pulse" pathLength={1} fill="none" style={{ '--i': i } as CSSProperties} />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect key={`e${i}`} className="hn-wire-end" width="5" height="5" rx="1" />
                ))}
              </svg>
            )}
            {scene && (
              <>
                <span className="hn-wire-tag ds-data" aria-hidden="true">Teaming</span>
                <span className="hn-wire-tag ds-data" aria-hidden="true">Subcontracting credit</span>
              </>
            )}
            {NODES.map((n) => (
              <div
                key={n.key}
                data-node={n.key}
                className={`hn-pn hn-pn-${n.kind ?? 'node'}`}
                style={{ '--x': `${n.x}%`, '--y': `${n.y}%`, '--w': `${n.w}px` } as CSSProperties}
              >
                <Node label={n.label} meta={n.meta} status={n.status ?? 'idle'} kind={n.photo ? 'photo' : 'text'}>
                  {n.photo ? (
                    <span className="hn-pn-photo">
                      <img {...responsive(n.photo.src, `${n.w}px`)} alt="" loading="lazy" decoding="async" className="hn-grade" style={{ objectPosition: n.photo.pos }} />
                    </span>
                  ) : (
                    <span className={n.kind === 'proof' ? 'hn-pn-proof' : 'hn-pn-text'}>
                      {n.text}
                      {n.sub && <span className="ds-data hn-pn-sub">{n.sub}</span>}
                    </span>
                  )}
                </Node>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
