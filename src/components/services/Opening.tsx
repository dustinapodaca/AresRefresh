import { useEffect, useState } from 'react';

// The cover of the file (owner, 2026-10-06): the street photograph fills the opening from
// the top of the page, like the other heroes. The top part, behind the nav, the headline,
// and the lead, sits under a band of dark glass (the footer's glass) whose edge falls where
// the crisp photo begins. The divisions follow directly below.
// Hero options (owner, 2026-10-08: the tower went back to Home). `PICK` is what ships; in
// dev, `?hero=<key>` previews any option in place. Generated images (nb-*, hero-a, hero-e)
// are light and architecture only; their prompts are in assets/generated/.
type Option = { src: string; label: string; position?: string };
export const HERO_OPTIONS: Record<string, Option> = {
  fold: { src: '/images/hero-fold.webp', label: 'Glass fold (owner-supplied, the old Home hero)', position: '50% 60%' },
  'nb-towers': { src: '/images/services-hero/nb-s1-towers.webp', label: 'Denver towers at blue hour (Nano Banana)' },
  'nb-entrance': { src: '/images/services-hero/nb-s2-entrance.webp', label: 'Secure lobby entrance at night (Nano Banana)' },
  'nb-springs': { src: '/images/services-hero/nb-s3-springs.webp', label: 'Colorado Springs and Pikes Peak at dusk (Nano Banana)' },
  'nb-fins': { src: '/images/services-hero/nb-s4-fins.webp', label: 'Metal fins catching copper light (Nano Banana)' },
  'tower-a': { src: '/images/services-hero/hero-a.webp', label: 'Tower at dusk (earlier generated set)', position: '70% 100%' },
  'fins-e': { src: '/images/services-hero/hero-e.webp', label: 'Steel fins in copper light (earlier generated set)' },
  abstract: { src: '/images/cap-cta-bg.jpg', label: 'Abstract architecture (existing site image)' },
};
const PICK = 'nb-towers';

function useHero(): Option {
  const [key, setKey] = useState(PICK);
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const k = new URLSearchParams(window.location.search).get('hero');
    if (k && HERO_OPTIONS[k]) setKey(k);
  }, []);
  return HERO_OPTIONS[key];
}

export default function Opening() {
  const hero = useHero();
  return (
    <section className="ds-svc-open" aria-labelledby="services-title">
      <div className="ds-svc-open-photo" aria-hidden="true">
        <img src={hero.src} alt="" width={2400} height={1350} decoding="async" style={hero.position ? { objectPosition: hero.position } : undefined} {...{ fetchpriority: 'high' }} />
      </div>
      <div className="ds-svc-open-glass" aria-hidden="true" />

      <div className="ds-container ds-svc-open-head">
        <h1 id="services-title" className="ds-display-xl">
          Security officers for six kinds of sites.
        </h1>
        <div className="ds-svc-open-side">
          <p className="ds-lead">
            Armed and unarmed officers for federal, commercial, industrial, and
            institutional sites in Colorado Springs, Denver, and Pueblo. Find the division
            closest to your site.
          </p>
        </div>
      </div>

      {/* Holds the open, crisp part of the photograph below the glass. */}
      <div className="ds-svc-band" aria-hidden="true" />
    </section>
  );
}
