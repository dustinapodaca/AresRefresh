import { lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';

// The prime contractor panel's light. The CSS version is the default; the WebGL shader
// (PrimeGlowGL.tsx) is an option at ?primeglow=webgl, loaded only when asked for, so its code
// isn't in every page's download (web audit, 2026-10-18).
const PrimeGlowGL = lazy(() => import('./PrimeGlowGL'));

// Two ways to draw it, for the owner to compare on a phone at ?primeglow= (2026-10-16): `css` (the
// default since 2026-10-16) is four large, soft radial-gradient shapes drifting on long looping
// keyframes, animated only by transform so the phone's compositor does all the work, crisp at any
// pixel density, with a faint still grain against banding; `webgl` is the shader in PrimeGlowGL.tsx. On phones
// the shader ran at half the CSS size, so a 3x screen showed it stretched about 6x and blotchy.
export default function PrimeGlow() {
  const [params] = useSearchParams();
  if (params.get('primeglow') === 'webgl') {
    return (
      <Suspense fallback={null}>
        <PrimeGlowGL />
      </Suspense>
    );
  }
  return (
    <div className="ds-pglow-css" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}
