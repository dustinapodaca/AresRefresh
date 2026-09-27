/**
 * Typed accessors over src/seo/routes.json — the single source of truth
 * for route metadata.
 *
 * Three consumers read that JSON so they can never drift:
 *   1. <Seo>                  (src/seo/Seo.tsx)   — runtime <head> tags
 *   2. scripts/sitemap.mjs                        — sitemap.xml
 *   3. scripts/prerender.mjs                      — which routes get HTML
 *
 * `host` is the PRODUCTION domain and is used deliberately before the
 * domain is cut over to Netlify: canonicals and og:url must point at the
 * content's final home from day one. The preview host is kept out of the
 * index by an edge function instead (netlify/edge-functions), not by
 * pointing canonicals at netlify.app.
 */
import data from './routes.json';

export type Breadcrumb = { name: string; path: string };

export type RouteMeta = {
  title: string;
  description: string;
  /** Excluded from the sitemap and rendered with <meta name="robots" content="noindex">. */
  noindex?: boolean;
  /** Trail (between Home and the current page) for BreadcrumbList JSON-LD. */
  breadcrumbs?: Breadcrumb[];
  /** Emits page-level Service JSON-LD when present. */
  serviceType?: string;
  areaServed?: string[];
  /** LCP hero for this route; emitted as <link rel="preload" as="image">. */
  preloadImage?: string;
};

export const HOST: string = data.host;
export const OG_IMAGE: string = HOST + data.ogImage;
export const OG_IMAGE_ALT: string = data.ogImageAlt;

export const SEO = data.routes as Record<string, RouteMeta>;

/** Paths that belong in the sitemap (indexable only). */
export const INDEXABLE_PATHS: string[] = Object.keys(SEO).filter((p) => !SEO[p].noindex);

/** Every path the prerenderer emits (includes /404). */
export const ALL_PATHS: string[] = Object.keys(SEO);

/** Absolute URL for a route. No trailing slash except root. */
export function urlFor(path: string): string {
  return path === '/' ? `${HOST}/` : HOST + path;
}
