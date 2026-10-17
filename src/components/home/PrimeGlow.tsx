import { useEffect, useRef, useState } from 'react';

// The prime contractor panel's light, a flowing mesh gradient (owner, 2026-10-16, after a ColorFlow
// embed: large soft shapes with smooth, wavy edges, always drifting), kept mostly black and in the
// site's clay and rust family: umber, deep rust, rust, copper, and a little pale clay at the hottest
// point. The flow lives low on the right behind the diagram and fades to black over the copy.
// WebGL1, drawn at half resolution (it is all soft), paused off screen, one still frame under
// reduced motion. Not drawn for automated browsers (the prerender has no GPU) or where WebGL is
// missing; the CSS wedge on the panel's ::before shows instead (Industries.tsx, IndustryPage.tsx).

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uWide;

// Value noise and fbm: low frequencies only, so the shapes stay large and soft.
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  // Two octaves only: broad, clean shapes, never cloud texture.
  return 0.65 * noise(p) + 0.35 * noise(p * 1.9 + vec2(1.7, 9.2));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;          // 0..1, origin bottom left
  vec2 p = vec2(uv.x * uRes.x / uRes.y, uv.y) * 0.62;
  float t = uTime * 0.03;

  // Domain warp at low frequency: large shapes that fold slowly, with smooth wavy edges.
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t * 0.8));
  float f = fbm(p + 1.7 * q + vec2(t * 0.5, -t * 0.3));
  // A second field shifts the hue between deeper and warmer rust across the shapes.
  float hue = fbm(p * 0.8 + 2.3 * q + vec2(3.1, 7.4) - t * 0.4);

  // Where the light may sit: the lower right, black toward the upper left (the copy).
  // Phones and tablets (uWide 0): the lower part of the panel only.
  float reachWide = smoothstep(0.62, 1.22, uv.x * 0.9 + (1.0 - uv.y) * 0.62);
  float reachNarrow = smoothstep(0.5, 1.0, 1.0 - uv.y);
  float reach = mix(reachNarrow, reachWide, uWide);
  float heat = clamp(smoothstep(0.26, 0.7, f) * reach * 1.12, 0.0, 1.0);

  // The ramp, mostly black and umber: each step a smooth band, pale clay only at the hottest point.
  vec3 deep = mix(vec3(0.360, 0.130, 0.060), vec3(0.478, 0.220, 0.102), hue);
  vec3 mid = mix(vec3(0.640, 0.300, 0.150), vec3(0.737, 0.408, 0.227), hue);
  vec3 c = vec3(0.0);
  c = mix(c, vec3(0.140, 0.058, 0.026), smoothstep(0.06, 0.30, heat));
  c = mix(c, deep, smoothstep(0.26, 0.52, heat));
  c = mix(c, mid, smoothstep(0.50, 0.74, heat));
  c = mix(c, vec3(0.910, 0.588, 0.384), smoothstep(0.74, 0.92, heat));
  c = mix(c, vec3(0.980, 0.839, 0.714), smoothstep(0.93, 1.0, heat));

  // A fine dither so the dark steps never band.
  c += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;
  gl_FragColor = vec4(c, 1.0);
}
`;

export default function PrimeGlow() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (navigator.webdriver) return;
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: false });
    if (!gl) return;

    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = shader(gl.VERTEX_SHADER, VERT);
    const fs = shader(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uWide = gl.getUniformLocation(prog, 'uWide');

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = window.matchMedia('(min-width: 1024px)');
    // Half resolution: the image is all soft gradient, so the browser's upscale is invisible.
    const SCALE = 0.5;
    const size = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    // A fixed start, so the still frame and the first frame are the same, and well settled.
    const T0 = 40;
    const draw = (seconds: number) => {
      size();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, T0 + seconds);
      gl.uniform1f(uWide, wide.matches ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let frame = 0;
    let visible = false;
    let start = 0;
    let elapsed = 0;
    const loop = (now: number) => {
      if (!start) start = now - elapsed * 1000;
      elapsed = (now - start) / 1000;
      draw(elapsed);
      frame = requestAnimationFrame(loop);
    };
    const play = () => { if (!frame && !still) { start = 0; frame = requestAnimationFrame(loop); } };
    const pause = () => { cancelAnimationFrame(frame); frame = 0; };

    draw(0);
    setOn(true);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play(); else pause();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => { if (!frame) draw(elapsed); });
    ro.observe(canvas);
    const onWide = () => { if (!frame) draw(elapsed); };
    wide.addEventListener('change', onWide);

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      wide.removeEventListener('change', onWide);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={ref} className="ds-pglow" data-on={on || undefined} aria-hidden="true" />;
}
