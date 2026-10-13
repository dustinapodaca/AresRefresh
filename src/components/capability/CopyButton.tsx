import { useEffect, useRef, useState } from 'react';

// A quiet copy icon beside an identifier (design review, owner 2026-10-13): contracting officers
// paste the UEI, CAGE code, and GSA contract number into forms all day. Two overlapping sheets,
// drawn like the arrows (1.5px stroke, round caps, no fill; the owner's icon exception, like
// the handset); it turns to a check for a moment, and the copy is announced.
function CopyIcon({ done }: { done: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {done ? (
        <path d="M3 8.5l3.2 3L13 4.5" />
      ) : (
        <>
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 3.2V3a.5.5 0 0 0-.5-.5H3a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h.2" />
        </>
      )}
    </svg>
  );
}
export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Older browsers: select a temporary field and copy it.
      const t = document.createElement('textarea');
      t.value = value;
      t.setAttribute('readonly', '');
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button type="button" className="ds-copy" onClick={copy} aria-label={copied ? `${label} copied` : `Copy ${label} ${value}`} data-copied={copied || undefined}>
      <CopyIcon done={copied} />
      <span className="ds-sr" aria-live="polite">{copied ? `${label} copied` : ''}</span>
    </button>
  );
}
