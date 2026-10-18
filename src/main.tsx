import { StrictMode, useLayoutEffect, type ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { prefetchHeroesOnIntent } from './lib/prefetchHeroes';
import './fonts.css';
import './index.css';

// The prerender (scripts/prerender.mjs, a headless Chrome) saves the page as React first draws it,
// before any effect has measured or changed it, so the saved markup is exactly what hydration
// expects (2026-10-18; it saved the finished page, and the rail's measured ticks, the 404's
// address, and the like made React redraw). The outermost layout effect runs once the first
// commit is in, after every child's. Adjacent text nodes (`© {year} Ares`) get an empty comment
// between them, as React's own server render does, or the HTML parser would merge them.
function FirstRender({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const w = window as unknown as { __ARES_FIRST_RENDER__?: string };
    if (!navigator.webdriver || w.__ARES_FIRST_RENDER__ !== undefined) return;
    const copy = document.getElementById('root')!.cloneNode(true) as HTMLElement;
    const walker = document.createTreeWalker(copy, NodeFilter.SHOW_TEXT);
    const texts: Text[] = [];
    while (walker.nextNode()) texts.push(walker.currentNode as Text);
    for (const t of texts) {
      if (t.nextSibling?.nodeType === Node.TEXT_NODE) t.after(document.createComment(' '));
    }
    w.__ARES_FIRST_RENDER__ = copy.innerHTML;
  }, []);
  return <>{children}</>;
}

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <FirstRender>
          <App />
        </FirstRender>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Hydrate the prerendered page (2026-10-18) instead of drawing over it: React keeps the markup
// scripts/prerender.mjs wrote, so the headline painted from the HTML stays the same element and
// the page's largest paint is not pushed back to when the JavaScript arrives (Lighthouse timed
// Home's headline at about 6s on a slow phone, though it painted at about 2s). Where the markup and
// the first render disagree, React quietly redraws on its own; the [hydrate] line says where.
// The dev server's empty shell, and any page with nothing prerendered, are drawn fresh as before.
// To go back: createRoot only (tag before-hydrate).
const root = document.getElementById('root')!;
if (root.hasChildNodes()) {
  hydrateRoot(root, app, {
    onRecoverableError: (error, info) => {
      console.error('[hydrate]', error, (info as { componentStack?: string })?.componentStack ?? '');
    },
  });
} else {
  createRoot(root).render(app);
}

prefetchHeroesOnIntent();
