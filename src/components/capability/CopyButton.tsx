import { useEffect, useRef, useState } from 'react';

// A quiet "Copy" beside an identifier (design review, owner 2026-10-13): contracting officers
// paste the UEI, CAGE code, and GSA contract number into forms all day. Text only (the site's
// icons are arrows); the label turns to "Copied" for a moment and is announced.
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
      <span aria-hidden="true">{copied ? 'Copied' : 'Copy'}</span>
      <span className="ds-sr" aria-live="polite">{copied ? `${label} copied` : ''}</span>
    </button>
  );
}
