import { useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { moveFold, reducedMotion, stopFold } from '../lib/disclosure';

// A panel that opens and shuts like every fold on the site (src/lib/disclosure.ts), for open
// state that lives in React rather than in a native <details>. Shut, it carries data-fold="closed"
// (height 0, hidden, out of the tab order; dossier.css). The first render, a change of `enabled`,
// and reduced motion set it at once; a change of `open` after that moves it.
type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  open: boolean;
  /** Off: the panel is plain content (no data-fold), as on wider screens. */
  enabled?: boolean;
  /** Selector, inside the panel, for the groups that follow the opening one after another. */
  items?: string;
  /** The element with the fold's rule (class ds-fold-line), for the line of light. */
  line?: () => Element | null;
  /** The row that was tapped, for the nudge up when it opens low on the screen. */
  nudge?: () => Element | null;
  children: ReactNode;
};

export default function Fold({ open, enabled = true, items, line, nudge, children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const prev = useRef<{ open: boolean; enabled: boolean } | null>(null);
  useLayoutEffect(() => {
    const box = ref.current;
    if (!box) return;
    const was = prev.current;
    prev.current = { open, enabled };
    if (!enabled) {
      stopFold(box);
      box.removeAttribute('data-fold');
      return;
    }
    if (!was || !was.enabled || was.open === open || reducedMotion()) {
      stopFold(box);
      box.dataset.fold = open ? 'open' : 'closed';
      return;
    }
    box.dataset.fold = 'open';
    moveFold(box, open, { items, line: line?.(), nudge: nudge?.() }, () => {
      box.dataset.fold = 'closed';
    });
    // Only a change of state moves the panel; the selectors and getters are read when it does.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, enabled]);
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
