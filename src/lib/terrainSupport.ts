// Can this browser run the Home hero's terrain (2026-10-18)? 'live' runs it; 'still' shows the
// captured frame instead, from the first paint, with no swap. The answer goes on
// <html data-terrain>; the CSS shows the still unless it says 'live'. A first visit to Home gets
// it from the inline script in index.html, before anything paints; that script is this same
// check, minified, so keep the two in step (and update the script's sha256 in public/_headers).
// Arriving at Home from another page, the hero runs this before its first paint.
//
// It opens a real WebGL2 context rather than looking for the API: locked-down government laptops
// and VDI sessions often have the API but block the context. A software renderer (no GPU) counts
// as unable, as in Topography.tsx: it would stall the page. The prerender (an automated browser)
// and reduced motion get the still.
export type TerrainMode = 'live' | 'still' | 'fallback';

export function terrainMode(): 'live' | 'still' {
  try {
    if (navigator.webdriver) return 'still';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'still';
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return 'still';
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /swiftshader|llvmpipe|software/i.test(renderer) ? 'still' : 'live';
  } catch {
    return 'still';
  }
}
