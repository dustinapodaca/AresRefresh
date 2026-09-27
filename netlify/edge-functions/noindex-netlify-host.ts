/**
 * Sends `X-Robots-Tag: noindex, nofollow` for any request served from a
 * *.netlify.app hostname, so the preview, deploy previews and branch
 * deploys stay out of search results while the real domain still points
 * at the old server.
 *
 * Why an edge function rather than _headers / netlify.toml [[headers]]:
 * those match on PATH ONLY. Both aressecurity.netlify.app and
 * aressecurity.co serve the same deploy, so a path-based rule cannot tell
 * them apart and would noindex production too.
 *
 * This is self-scoping: after cutover, requests to aressecurity.co never
 * match and get no header, with no code change and nothing to remember to
 * remove. The .netlify.app host keeps the header, which is harmless once
 * that host 301s to the domain.
 *
 * Types are declared inline rather than imported from
 * "@netlify/edge-functions" on purpose: the bare specifier resolves only
 * through Netlify's injected import map, which makes the function
 * unloadable in local tooling. Only `context.next()` is used, so a
 * structural type costs nothing and keeps this runnable everywhere.
 */
type EdgeContext = { next: () => Promise<Response> };

export default async (request: Request, context: EdgeContext): Promise<Response> => {
  const response = await context.next();
  const { hostname } = new URL(request.url);

  if (hostname.endsWith('.netlify.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
};

// Declarative routing, current Netlify API. Hashed JS/CSS bundles don't need
// the header, so they're excluded to keep edge invocations down; images and
// /files/*.pdf stay covered so the preview PDF isn't indexed either.
//
// NOTE: netlify-cli 12.x (installed locally) predates both this config-export
// form and `excludedPath` in netlify.toml, so `netlify dev` cannot load this
// function. That is a stale-CLI limitation, not a defect — verify the header
// on the deploy preview with:
//   curl -sI https://aressecurity.netlify.app/ | grep -i x-robots-tag
export const config = {
  path: '/*',
  excludedPath: ['/assets/*'],
};
