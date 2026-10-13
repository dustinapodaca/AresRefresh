import { useLayoutEffect, useRef } from 'react';
import { responsive } from '../../lib/responsive';

// A slow strip of certification marks between the hero and 01 Verify. The marks repeat
// so one track is wider than any screen, and a second copy makes the loop seamless.
// Only the first set carries alt text; every repeat is decorative.
const MARKS = [
  { src: '/images/cert-gsa-footer.png', alt: 'GSA Contract Holder' },
  { src: '/images/cert-sba-footer.png', alt: 'U.S. Small Business Administration' },
  { src: '/images/cert-women-owned.png', alt: 'Women Owned' },
  { src: '/images/cert-wbenc.png', alt: "Certified WBENC Women's Business Enterprise" },
  { src: '/images/cert-denver-edo.webp', alt: 'Denver Economic Development & Opportunity' },
  { src: '/images/cert-co-diverse.webp', alt: 'Colorado Verified Diverse Business' },
  { src: '/images/cert-co-small.webp', alt: 'Colorado Verified Small Business' },
];
const REPEAT = 3;

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="ds-strip-track" aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEAT }).flatMap((_, r) =>
        MARKS.map((m, i) => (
          <li key={`${r}-${i}`}>
            <img {...responsive(m.src)} alt={!hidden && r === 0 ? m.alt : ''} loading="lazy" decoding="async" />
          </li>
        )),
      )}
    </ul>
  );
}

// The loop starts with Colorado Verified Diverse Business in the middle of the screen, then
// Colorado Verified Small Business, GSA, and SBA come in (owner, 2026-10-13; was Small Business): the belt's animation is started part way
// through (a negative delay); under reduced motion the swipeable strip is scrolled there.
const START = '/images/cert-co-diverse.webp';
const LOOP_S = 60;

export default function CredentialStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const beltRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const strip = ref.current;
    const belt = beltRef.current;
    if (!strip || !belt) return;
    const place = () => {
      const track = belt.firstElementChild as HTMLElement | null;
      const start = track?.querySelector<HTMLImageElement>(`img[src*="${START.split('/').pop()!.replace('.webp', '')}"]`)?.parentElement;
      if (!track || !start) return;
      const offset = start.offsetLeft + start.offsetWidth / 2 - strip.clientWidth / 2;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        strip.scrollLeft = Math.max(0, offset);
        return;
      }
      const fraction = Math.max(0, offset) / track.offsetWidth;
      belt.style.animationDelay = `${-(fraction * LOOP_S).toFixed(2)}s`;
    };
    place();
    const imgs = Array.from(belt.querySelectorAll('img'));
    imgs.forEach((i) => i.addEventListener('load', place, { once: true }));
    window.addEventListener('resize', place);
    return () => {
      imgs.forEach((i) => i.removeEventListener('load', place));
      window.removeEventListener('resize', place);
    };
  }, []);
  return (
    <div ref={ref} className="ds-strip" role="region" aria-label="Certifications">
      <div ref={beltRef} className="ds-strip-belt">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
