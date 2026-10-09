import { SEO } from '../seo/routes';
import { responsive } from './responsive';

// Start a page's hero download as soon as the reader shows intent to go there: a pointer
// over its link, keyboard focus on it, or the first touch (2026-10-09). The browser keeps
// the file, so the page opens with its photo in place instead of a dark frame while it
// loads. The same srcset and sizes as the page's <img>, so it is the same file.
const started = new Set<string>();

function warm(path: string) {
  const key = SEO[path]?.preloadImage;
  if (!key || started.has(key)) return;
  started.add(key);
  const img = new Image();
  const r = responsive(key);
  if ('srcSet' in r && r.srcSet) {
    img.sizes = r.sizes;
    img.srcset = r.srcSet;
  }
  img.src = r.src;
  img.decode?.().catch(() => {});
}

function onIntent(e: Event) {
  const a = (e.target as Element | null)?.closest?.('a[href^="/"]');
  if (!a) return;
  const url = new URL((a as HTMLAnchorElement).href);
  if (url.origin !== location.origin || url.pathname === location.pathname) return;
  warm(url.pathname.replace(/\/$/, '') || '/');
}

export function prefetchHeroesOnIntent() {
  if (typeof window === 'undefined') return;
  // Respect a reader who has asked to save data.
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return;
  document.addEventListener('pointerover', onIntent, { passive: true });
  document.addEventListener('focusin', onIntent);
  document.addEventListener('touchstart', onIntent, { passive: true });
}
