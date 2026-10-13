import { useEffect, useRef, useState } from 'react';
import Arrow from './Arrow';
import { PDF_URL } from './capability/data';

// The quote form's result, front and center (owner, 2026-10-09; Mobbin: GetYourGuide and
// Perplexity's centered confirmations). A dark glass card over the page, like the 404's:
// the status light, one line of what happens next, and the request's subject as filed.
// Not a modal: the page stays usable behind it and nothing traps focus. A sent request
// closes itself after DURATION (the hairline along its foot drains to show it, and pauses
// while the pointer or focus is on the card); a failed one stays until closed.
// Since 2026-10-13 (design review, owner) a sent request also shows what happens next, in three
// short steps on hairlines, and the two ways to keep going: call, or take the PDF. No reply time
// (owner rule).
export type ToastData =
  | { kind: 'sent'; email: string; subject: string }
  | { kind: 'failed' };

const DURATION = 14000; // longer since the card carries next steps (2026-10-13)

const NEXT = ['We read your request', 'We walk your site, before anything is signed', 'You get a scoped proposal'];

export default function QuoteToast({ data, onClose }: { data: ToastData | null; onClose: () => void }) {
  // Keep the last data while the card plays its exit, then unmount.
  const [shown, setShown] = useState<ToastData | null>(data);
  const [leaving, setLeaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setShown(data);
      setLeaving(false);
    } else if (shown) {
      setLeaving(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!shown || leaving) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shown, leaving, onClose]);

  if (!shown) return null;
  const sent = shown.kind === 'sent';

  return (
    <div className="ds-toast-layer">
      <div
        ref={cardRef}
        className="ds-toast"
        data-kind={shown.kind}
        data-state={leaving ? 'closing' : 'open'}
        role={sent ? 'status' : 'alert'}
        aria-live={sent ? 'polite' : 'assertive'}
        style={{ ['--toast-life' as string]: `${DURATION}ms` }}
        onAnimationEnd={(e) => {
          if (e.target === cardRef.current && leaving) {
            setShown(null);
            setLeaving(false);
          }
        }}
      >
        <div className="ds-toast-head">
          <span className="ds-toast-light" aria-hidden="true" />
          <p className="ds-toast-title">{sent ? 'Request sent.' : 'That did not send.'}</p>
          <button type="button" className="ds-toast-close" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        </div>
        {sent ? (
          <>
            <p className="ds-toast-line">
              Leadership reads every request and will reply to <span className="ds-toast-email">{shown.email}</span>.
            </p>
            <ol className="ds-toast-steps" aria-label="What happens next">
              {NEXT.map((s, i) => (
                <li key={s}>
                  <span className="ds-data" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="ds-toast-actions">
              <a href="tel:+17196963966" className="ds-link">
                Call <span className="ds-data">719-696-3966</span>
              </a>
              <a href={PDF_URL} className="ds-link" target="_blank" rel="noopener noreferrer">
                Capability statement
                <Arrow external size={12} />
              </a>
            </p>
            <p className="ds-data ds-toast-ref">{shown.subject}</p>
            {/* Time left before it closes itself; it pauses on hover and focus. */}
            <span className="ds-toast-life" aria-hidden="true" onAnimationEnd={(e) => { e.stopPropagation(); onClose(); }} />
          </>
        ) : (
          <p className="ds-toast-line">
            Please try again, or email <a href="mailto:contact@aressecurity.co" className="ds-link">contact@aressecurity.co</a>.
          </p>
        )}
      </div>
    </div>
  );
}
