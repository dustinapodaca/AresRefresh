import { IMAGES } from './images.generated';

// How wide each hero is drawn (2026-10-09, measured): the full-bleed heroes fill tall
// boxes with object-fit: cover, so on phones the photo is drawn well past the screen's
// width. Without these the browser would pick a file too small and the hero would go soft.
// The page's <img> and its preload in <Seo> both read this, so they fetch the same file.
const SIZES: Record<string, string> = {
  '/images/hero6.jpg': '(max-width: 767px) 240vw, (max-width: 1023px) 145vw, (max-width: 1439px) 128vw, 106vw',
  '/images/services-hero/denver-sunset.webp': '(max-width: 767px) 371vw, (max-width: 1023px) 182vw, (max-width: 1439px) 117vw, 101vw',
  '/images/about-hero.jpg': '(max-width: 767px) 195vw, (max-width: 1023px) 117vw, 106vw',
  '/images/careers-hero.jpg': '(max-width: 767px) 142vw, 100vw',
  '/images/capability-hero/cs-fins.webp': '(max-width: 767px) 256vw, (max-width: 1023px) 142vw, (max-width: 1439px) 118vw, 100vw',
  '/images/services-hero/nb-s1-towers.webp': '(max-width: 767px) 148vw, 100vw',
};
const MARKET_HERO = '(max-width: 767px) 170vw, (max-width: 1023px) 105vw, 100vw';

// Heroes use decoding="sync" (2026-10-09): when the file is already in the cache the page
// paints with the photo in it, instead of a dark frame and then the photo.
//
// Responsive WebP for an image the code names by its original path: the srcSet, sizes,
// and intrinsic width and height from the manifest that assets/tools/optimize-images.py
// writes. Logos come back as one small WebP with their size. Anything not in the manifest
// falls back to the path as given.
export function responsive(path: string, sizes?: string) {
  const e = IMAGES[path];
  if (!e) return { src: path };
  if (!e.srcSet) return { src: e.src, width: e.width, height: e.height };
  const s = sizes ?? SIZES[path] ?? (path.startsWith('/images/market/') ? MARKET_HERO : '100vw');
  return { src: e.src, srcSet: e.srcSet, sizes: s, width: e.width, height: e.height };
}
