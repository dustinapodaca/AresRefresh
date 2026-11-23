import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../fonts-ares.css';

// Font trial (owner, 2026-11-22), for the owner to compare at ?font=inter|ares|ares-dtext|ares-btext
// on any page. Inter is the default (what the site ships). `ares` swaps every Inter and Inter Tight for
// Die Grotesk D Ares; `ares-dtext` and `ares-btext` keep D for headlines and set body text in cuts of D
// or B matched to Inter's size and spacing (fonts-ares.css). The choice sticks for the session, and
// once a ?font= link has been opened a small switch at the bottom left flips between them. Nothing
// shows without it, and the prerender always has Inter.
const FONTS = { inter: 'Inter', ares: 'D', 'ares-dtext': 'D, Inter spacing', 'ares-btext': 'D + B text' } as const;
type Font = keyof typeof FONTS;
const KEY = 'ares-font-trial';

const read = (): string | null => {
  try { return sessionStorage.getItem(KEY); } catch { return null; }
};
const write = (v: Font) => {
  try { sessionStorage.setItem(KEY, v); } catch { /* private mode: the URL still works */ }
};

// Mark text by the face it is set in: headlines (the display family) take the owner's tracking, body
// text never runs tighter than Die Grotesk's own spacing (Inter's negative tracking would cramp it).
function mark() {
  const els = document.body.querySelectorAll<HTMLElement | SVGElement>('*:not([data-ares-t])');
  for (const el of els) {
    if (!(el instanceof HTMLElement || el instanceof SVGElement)) continue;
    let text = false;
    for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent && n.textContent.trim()) { text = true; break; }
    if (!text) continue;
    const cs = getComputedStyle(el);
    if (cs.fontFamily.includes('Ares Display')) el.setAttribute('data-ares-t', 'd');
    else if (cs.fontFamily.includes('Die Grotesk') && parseFloat(cs.letterSpacing) < 0) el.setAttribute('data-ares-t', 't');
  }
}

export default function FontSwitch() {
  const { search } = useLocation();
  const [font, setFont] = useState<Font>('inter');
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
    if (font === 'inter') { root.removeAttribute('data-font'); return; }
    root.setAttribute('data-font', font);
    let t = 0;
    const run = () => { window.clearTimeout(t); t = window.setTimeout(mark, 120); };
    run();
    // New pages and anything a page adds later (split headlines, decks) get marked as they arrive.
    const mo = new MutationObserver(run);
    mo.observe(document.body, { childList: true, subtree: true });
    document.fonts?.ready.then(run);
    return () => { mo.disconnect(); window.clearTimeout(t); root.removeAttribute('data-font'); };
  }, [font]);

  if (!shown) return null;
  return (
    <div className="ares-fontswitch" role="group" aria-label="Font trial">
      {(Object.keys(FONTS) as Font[]).map((k) => (
        <button key={k} type="button" aria-pressed={font === k} onClick={() => { write(k); setFont(k); }}>
          {FONTS[k]}
        </button>
      ))}
    </div>
  );
}
