import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../fonts-ares.css';

// The site's type (owner, 2026-11-22), for the owner to compare at
// ?font=ares-btext|inter|ares|ares-dtext on any page. `ares-btext` is the default (owner, 2026-11-22:
// Die Grotesk D headlines, Die Grotesk B text matched to Inter's size and spacing; set in fonts.css and
// the tokens, so the first paint is already in it). `inter` is the site's type before (Inter Tight and
// Inter), `ares` plain D text, `ares-dtext` D text cut to set like Inter (fonts-ares.css). The choice
// sticks for the session, and once a ?font= link has been opened a small switch at the bottom left
// flips between them. Nothing shows without it.
const FONTS = { 'ares-btext': 'D + B text', inter: 'Inter', ares: 'D', 'ares-dtext': 'D, Inter spacing' } as const;
type Font = keyof typeof FONTS;
const DEFAULT: Font = 'ares-btext';
const KEY = 'ares-font-trial';

const read = (): string | null => {
  try { return sessionStorage.getItem(KEY); } catch { return null; }
};
const write = (v: Font) => {
  try { sessionStorage.setItem(KEY, v); } catch { /* private mode: the URL still works */ }
};

export default function FontSwitch() {
  const { search } = useLocation();
  const [font, setFont] = useState<Font>(DEFAULT);
  const [shown, setShown] = useState(false);

  // ?font= sets the choice for the session; without it the stored one holds.
  useEffect(() => {
    const asked = new URLSearchParams(search).get('font');
    if (asked && asked in FONTS) { write(asked as Font); setFont(asked as Font); setShown(true); return; }
    const kept = read();
    if (kept && kept in FONTS) { setFont(kept as Font); setShown(true); }
  }, [search]);

  useEffect(() => {
    const root = document.documentElement;
    if (font === DEFAULT) root.removeAttribute('data-font');
    else root.setAttribute('data-font', font);
  }, [font]);

  if (!shown) return null;
  return (
    <div className="ares-fontswitch" role="group" aria-label="Font">
      {(Object.keys(FONTS) as Font[]).map((k) => (
        <button key={k} type="button" aria-pressed={font === k} onClick={() => { write(k); setFont(k); }}>
          {FONTS[k]}
        </button>
      ))}
    </div>
  );
}
