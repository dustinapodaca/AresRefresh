// The prime contractor panel's light (owner, 2026-10-16): four large, soft radial-gradient shapes
// drifting on long looping keyframes, animated only by transform so the phone's compositor does all
// the work, crisp at any pixel density, with a faint still grain against banding. The WebGL shader
// it replaced (?primeglow=webgl, PrimeGlowGL.tsx) was removed at launch (owner, 2026-10-19; tag
// options-archive-2026-10-19, docs/options-archive.md): on phones it ran at half the CSS size and
// a 3x screen showed it stretched and blotchy.
export default function PrimeGlow() {
  return (
    <div className="ds-pglow-css" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}
