import { useEffect, useState } from 'react';

// Tracks a media query. It starts at `fallback` on both the prerender and the first
// client render (so hydration matches), then corrects itself after mount.
export function useMediaQuery(query: string, fallback = true) {
  const [matches, setMatches] = useState(fallback);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}
