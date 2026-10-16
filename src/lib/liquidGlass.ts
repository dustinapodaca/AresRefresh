// Liquid glass (owner, 2026-10-15, after gladia.io's cards; the ?cards=liquid option). A card's
// backdrop is run through an SVG filter made for its exact size: near the rim the page behind is
// bent like light through the edge of a lens (a displacement map), then frosted (blur, color
// lifted), with a thin highlight along the rim lit from the top left (a specular map). Chromium
// only: other browsers can't use an SVG filter as a backdrop, so they keep the CSS frost.

const NS = 'http://www.w3.org/2000/svg';
// Matched to gladia.io's own filter (owner, 2026-10-15): the bend is strongest right at the rim and
// dies off within about 20px (their map: full at the edge, about 57% at 2px, 14% at 8px, gone by
// 24px), it reaches 100px, and the frost is light (7px) so the bend stays visible. The filter
// region runs 12% past the element on every side, as theirs does, so the rim has real page to
// bend and the frost doesn't fade out toward the edges.
const BEZEL = 24; // px of rim that bends the light
const SCALE = 100; // the strongest bend, in px
const FALLOFF = 4; // px: the bend at d px in from the rim is e^(-d / FALLOFF)
const BLUR = 7; // the frost (a CSS blur(Npx) is the same as N here)

export type LiquidOptions = {
  /** Put the filter on this pseudo-element (via the --ds-liquid custom property on the host). */
  pseudo?: '::before' | '::after';
  blur?: number;
  scale?: number;
  bezel?: number;
};

let defs: SVGDefsElement | null = null;
let counter = 0;

export const liquidSupported = () =>
  typeof window !== 'undefined' && 'chrome' in window && !/Firefox/.test(navigator.userAgent);

function ensureDefs() {
  if (defs) return defs;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  defs = document.createElementNS(NS, 'defs');
  svg.appendChild(defs);
  document.body.appendChild(svg);
  return defs;
}

// Signed distance to a rounded rectangle (negative inside) and its outward normal.
function sdf(x: number, y: number, w: number, h: number, r: number) {
  const px = x - w / 2;
  const py = y - h / 2;
  const qx = Math.abs(px) - (w / 2 - r);
  const qy = Math.abs(py) - (h / 2 - r);
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  const d = Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r;
  let nx: number;
  let ny: number;
  if (qx > 0 && qy > 0) {
    const l = Math.hypot(ox, oy) || 1;
    nx = (ox / l) * Math.sign(px);
    ny = (oy / l) * Math.sign(py);
  } else if (qx > qy) {
    nx = Math.sign(px);
    ny = 0;
  } else {
    nx = 0;
    ny = Math.sign(py);
  }
  return { d, nx, ny };
}

function maps(w: number, h: number, r: number, bezel: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const x = c.getContext('2d')!;
  const disp = x.createImageData(w, h);
  const spec = x.createImageData(w, h);
  const lx = -0.6;
  const ly = -0.8; // light from the top left
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const k = (j * w + i) * 4;
      const { d, nx, ny } = sdf(i + 0.5, j + 0.5, w, h, r);
      const inside = -d; // px from the rim
      let dx = 0;
      let dy = 0;
      if (inside >= 0 && inside < bezel) {
        // Strongest at the edge, dying off quickly inward (and to exactly 0 at the bezel).
        const m = Math.exp(-inside / FALLOFF) * (1 - inside / bezel);
        dx = -nx * m;
        dy = -ny * m;
      }
      disp.data[k] = 128 + dx * 127;
      disp.data[k + 1] = 128 + dy * 127;
      disp.data[k + 2] = 128;
      disp.data[k + 3] = 255;
      if (inside >= 0 && inside < 2.5) {
        const facing = Math.max(0, -(nx * lx + ny * ly)); // rims facing the light
        const back = Math.max(0, nx * lx + ny * ly) * 0.35; // a fainter glint opposite
        const a = (facing * facing + back) * (1 - inside / 2.5);
        spec.data[k] = spec.data[k + 1] = spec.data[k + 2] = 255;
        spec.data[k + 3] = Math.min(255, a * 255);
      }
    }
  }
  x.putImageData(disp, 0, 0);
  const dispUrl = c.toDataURL();
  x.clearRect(0, 0, w, h);
  x.putImageData(spec, 0, 0);
  const specUrl = c.toDataURL();
  return { dispUrl, specUrl };
}

function build(id: string, w: number, h: number, r: number, o: Required<Omit<LiquidOptions, 'pseudo'>>) {
  const { dispUrl, specUrl } = maps(w, h, r, o.bezel);
  const f = document.createElementNS(NS, 'filter');
  f.setAttribute('id', id);
  f.setAttribute('x', '-12%');
  f.setAttribute('y', '-12%');
  f.setAttribute('width', '124%');
  f.setAttribute('height', '124%');
  f.setAttribute('color-interpolation-filters', 'sRGB');
  f.innerHTML = `
    <feImage href="${dispUrl}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="map"/>
    <feDisplacementMap in="SourceGraphic" in2="map" scale="${o.scale}" xChannelSelector="R" yChannelSelector="G" result="bent"/>
    <feGaussianBlur in="bent" stdDeviation="${o.blur}" result="frost"/>
    <feColorMatrix in="frost" type="saturate" values="1.45" result="lifted"/>
    <feImage href="${specUrl}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="rim"/>
    <feComponentTransfer in="rim" result="rimSoft"><feFuncA type="linear" slope="0.55"/></feComponentTransfer>
    <feBlend in="rimSoft" in2="lifted" mode="screen"/>`;
  return f;
}

/** Gives one element (or its pseudo-element) the liquid backdrop; returns a cleanup. Rebuilds the
 *  filter when the size settles after a resize. */
export function attachLiquid(el: HTMLElement, opts: LiquidOptions = {}): () => void {
  const d = ensureDefs();
  const id = `ares-liquid-${++counter}`;
  const o = { blur: opts.blur ?? BLUR, scale: opts.scale ?? SCALE, bezel: opts.bezel ?? BEZEL };
  let current: SVGFilterElement | null = null;
  let last = '';
  const apply = () => {
    const cs = getComputedStyle(el, opts.pseudo ?? null);
    const w = Math.round(opts.pseudo ? parseFloat(cs.width) : el.offsetWidth);
    const h = Math.round(opts.pseudo ? parseFloat(cs.height) : el.offsetHeight);
    if (!w || !h) return;
    const r = parseFloat(cs.borderTopLeftRadius) || 0;
    const key = `${w}x${h}@${r}`;
    if (key === last) return;
    last = key;
    const next = build(id, w, h, r, o);
    if (current) d.replaceChild(next, current);
    else d.appendChild(next);
    current = next;
    if (opts.pseudo) el.style.setProperty('--ds-liquid', `url(#${id})`);
    else {
      el.style.setProperty('backdrop-filter', `url(#${id})`);
      el.style.setProperty('-webkit-backdrop-filter', `url(#${id})`);
    }
  };
  apply();
  // Rebuild once the size settles (a menu opening resizes the nav every frame).
  let t = 0;
  const ro = new ResizeObserver(() => {
    window.clearTimeout(t);
    t = window.setTimeout(apply, 140);
  });
  ro.observe(el);
  return () => {
    ro.disconnect();
    window.clearTimeout(t);
    current?.remove();
    el.style.removeProperty('--ds-liquid');
    el.style.removeProperty('backdrop-filter');
    el.style.removeProperty('-webkit-backdrop-filter');
  };
}
