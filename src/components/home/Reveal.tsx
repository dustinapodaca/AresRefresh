import { useRef, type ReactNode } from 'react';
import { useMotion, useScene } from './motion';

// Headlines read themselves in (owner, 2026-10-19, after flora.ai): each Home headline's words come
// up from faint as the headline travels from 85% to 55% of the screen, tied to the scroll; its lead
// follows a beat behind, a line at a time. The words are split only while the scroll engine runs,
// after mount: the prerendered HTML, reduced motion, and no JavaScript keep the plain text. Readers
// get the whole line: the headline carries it in aria-label (its word spans are hidden), the lead in
// a visually hidden copy.

const split = (text: string) =>
  text.split(' ').map((w, i, all) => (
    <span key={i}>
      <span className="ds-w">{w}</span>
      {i < all.length - 1 ? ' ' : ''}
    </span>
  ));

export function RevealHeading({
  as: Tag = 'h2',
  id,
  className,
  children,
}: {
  as?: 'h2' | 'h3';
  id?: string;
  className?: string;
  children: string;
}) {
  const engine = useMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  useScene(ref, ({ gsap }, root) => {
    gsap.fromTo(
      root.querySelectorAll('.ds-w'),
      { opacity: 0.18, y: '0.4em' },
      { opacity: 1, y: 0, ease: 'none', stagger: 0.12, scrollTrigger: { trigger: root, start: 'top 85%', end: 'top 55%', scrub: true } },
    );
  });
  if (!engine) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }
  return (
    <Tag ref={ref} id={id} className={className} aria-label={children}>
      <span aria-hidden="true">{split(children)}</span>
    </Tag>
  );
}

export function RevealLead({ className, children, after }: { className?: string; children: string; after?: ReactNode }) {
  const engine = useMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  useScene(ref, ({ gsap }, root) => {
    const words = Array.from(root.querySelectorAll<HTMLElement>('.ds-w'));
    // Which line each word sits on, so the lines come up in turn (measured once, at setup).
    const tops = words.map((w) => w.offsetTop);
    const lines = [...new Set(tops)];
    gsap.fromTo(
      words,
      { opacity: 0.18, y: '0.5em' },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        stagger: (i: number) => lines.indexOf(tops[i]) * 0.18,
        scrollTrigger: { trigger: root, start: 'top 82%', end: 'top 48%', scrub: true },
      },
    );
  });
  if (!engine) {
    return (
      <p className={className}>
        {children}
        {after}
      </p>
    );
  }
  return (
    <p ref={ref} className={className}>
      <span className="ds-sr">{children}</span>
      <span aria-hidden="true">{split(children)}</span>
      {after}
    </p>
  );
}
