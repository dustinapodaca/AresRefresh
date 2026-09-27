import { Helmet } from 'react-helmet-async';
import { SEO, HOST, OG_IMAGE, OG_IMAGE_ALT, urlFor } from './routes';

type Props = {
  /** Route key into src/seo/routes.json. */
  path: string;
  /** Force noindex (the 404 route sets this via routes.json too). */
  noindex?: boolean;
};

/**
 * Renders the full head block for one route. Drop it once at the top of
 * each page component. `prioritizeSeoTags` keeps title/canonical/OG ahead
 * of other tags so link-preview bots that only read the first few KB of
 * <head> still see them.
 */
export function Seo({ path, noindex = false }: Props) {
  const meta = SEO[path];
  if (!meta) {
    if (import.meta.env.DEV) console.warn(`[Seo] no metadata for route "${path}"`);
    return null;
  }

  const url = urlFor(path);
  const isNoindex = noindex || Boolean(meta.noindex);

  // BreadcrumbList: Home > [trail] > current page. Improves how the URL
  // renders in search results and reinforces site structure for crawlers.
  const breadcrumbLd =
    meta.breadcrumbs && meta.breadcrumbs.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { name: 'Home', path: '/' },
            ...meta.breadcrumbs,
            { name: stripSuffix(meta.title), path },
          ].map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: crumb.name,
            item: urlFor(crumb.path),
          })),
        }
      : null;

  // Page-level Service schema for the service/location pages, tied back
  // to the site-wide LocalBusiness node declared in index.html.
  const serviceLd =
    meta.serviceType
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: stripSuffix(meta.title),
          serviceType: meta.serviceType,
          description: meta.description,
          url,
          provider: { '@id': `${HOST}/#localbusiness` },
          ...(meta.areaServed && meta.areaServed.length
            ? {
                areaServed: meta.areaServed.map((city) => ({
                  '@type': 'City',
                  name: city,
                  containedInPlace: { '@type': 'State', name: 'Colorado' },
                })),
              }
            : {}),
        }
      : null;

  return (
    <Helmet prioritizeSeoTags>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.preloadImage && (
        <link rel="preload" as="image" href={meta.preloadImage} fetchPriority="high" />
      )}
      {isNoindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={url} />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ares Security LLC" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={OG_IMAGE_ALT} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {breadcrumbLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      )}
      {serviceLd && (
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
      )}
    </Helmet>
  );
}

/** "Armed Security Officers in Colorado | Ares Security" -> the part before the pipe. */
function stripSuffix(title: string): string {
  return title.split('|')[0].trim();
}

export default Seo;
