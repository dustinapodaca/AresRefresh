import { lazy, Suspense, useEffect, useState } from 'react';

// ReactDrops' Topographic Flow (src/components/topographic-*, the registry's 3.1.2, installed
// unchanged) behind a role page's hero (owner, 2026-10-26: trying it on Armed first). Faint grey
// contour and survey lines with deep rust accents drift on the black (opacity 0.38, owner: was 1), and the pointer pushes rings
// through them. It loads on its own after the page, and only in a real browser: the prerender and
// automated checks (unless ?motion) keep the plain black hero, so the static page never changes.
// It pauses off screen and holds still under reduced motion (the component's own handling).
const TopographicFlow = lazy(() =>
  import('../topographic-flow').then((m) => ({ default: m.TopographicFlow })),
);

export default function RoleTerrain() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has('motion');
    if (!navigator.webdriver || forced) setOn(true);
  }, []);
  return (
    <div className="ds-mk-terrain" aria-hidden="true">
      {on && (
        <Suspense fallback={null}>
          <TopographicFlow
            animateEntrance
            scale={470}
            density={7}
            speed={1.5}
            distortion={3}
            lineWidth={1}
            opacity={0.38}
            dashLength={7}
            dashGap={8}
            seed={237}
            gradientDiffusion={0}
            hover={0.6}
            hoverRadius={200}
            hoverFollow={0.16}
            hoverFade={0.8}
            hoverEffect="rings"
            backgroundColor="#000000"
            backgroundImage="none"
            gradientColors={[]}
            grain={0}
            lineColor="#484848"
            accentColor="#8b4920"
            lineStyle="solid"
          />
        </Suspense>
      )}
    </div>
  );
}
