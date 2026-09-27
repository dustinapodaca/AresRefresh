import type { Config, Context } from '@netlify/edge-functions';

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
 */
export default async (request: Request, context: Context) => {
  const response = await context.next();
  const { hostname } = new URL(request.url);

  if (hostname.endsWith('.netlify.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
};

// Hashed JS/CSS bundles don't need the header, so skip them to keep edge
// invocations down. Images and /files/*.pdf stay covered, so the preview
// copy of the capability statement PDF isn't indexed either.
export const config: Config = {
  path: '/*',
  excludedPath: ['/assets/*'],
};
