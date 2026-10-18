import { useEffect, useRef, useState } from 'react';

// The prime contractor panel's light, a flowing mesh gradient (owner, 2026-10-16, after a ColorFlow
// embed: large soft shapes with smooth, wavy edges, always drifting), kept mostly black and in the
// site's clay and rust family: mostly black and umber, deep rust, and rust and copper only in the
// hottest folds (darker, owner 2026-10-16). The motion is a seamless 90-second loop. The flow lives low on the right behind the diagram and fades to black over the copy.
// WebGL1, drawn at half resolution (it is all soft), paused off screen, one still frame under
// reduced motion. Not drawn for automated browsers (the prerender has no GPU) or where WebGL is
// missing; the CSS wedge on the panel's ::before shows instead (Industries.tsx, IndustryPage.tsx).

// Split from PrimeGlow.tsx (web audit, 2026-10-18) so it loads only for ?primeglow=webgl.

export const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

export const FRAG = `
precision highp float;
#define LOOP 90.0
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

  // A seamless loop (owner, 2026-10-16: it drifted until the light all but vanished): every offset
  // travels around a circle, so the flow repeats exactly every LOOP seconds and the light keeps
  // coming back instead of wandering out of the corner.
  float a = uTime * 6.2831853 / LOOP;
  vec2 o1 = vec2(cos(a), sin(a)) * 0.55;
  vec2 o2 = vec2(cos(a + 2.1), sin(a + 2.1)) * 0.45;
  vec2 o3 = vec2(cos(a + 4.2), sin(a + 4.2)) * 0.35;

  // Domain warp at low frequency: large shapes that fold slowly, with smooth wavy edges.
  vec2 q = vec2(fbm(p + o1), fbm(p + vec2(5.2, 1.3) + o2));
  float f = fbm(p + 1.7 * q + o3);
  // A second field shifts the hue between deeper and warmer rust across the shapes.
  float hue = fbm(p * 0.8 + 2.3 * q + vec2(3.1, 7.4) - o1 * 0.6);

  // Where the light may sit: the lower right, black toward the upper left (the copy).
  // Phones and tablets (uWide 0): the lower part of the panel only.
  float reachWide = smoothstep(0.62, 1.22, uv.x * 0.9 + (1.0 - uv.y) * 0.62);
  float reachNarrow = smoothstep(0.5, 1.0, 1.0 - uv.y);
  float reach = mix(reachNarrow, reachWide, uWide);
  // The shapes, with black folds between them (the higher threshold), and a dim floor so the
  // corner never goes fully dark at any point in the loop.
  float shape = smoothstep(0.36, 0.8, f);
  float heat = max(shape * reach * 0.92, reach * reach * 0.2);

  // The ramp, darker (owner, 2026-10-16): mostly black and umber, deep rust through the middle,
  // rust and copper only in the hottest folds, no pale clay.
  vec3 deep = mix(vec3(0.300, 0.105, 0.048), vec3(0.420, 0.190, 0.088), hue);
  vec3 mid = mix(vec3(0.560, 0.255, 0.125), vec3(0.660, 0.360, 0.200), hue);
  vec3 c = vec3(0.0);
  c = mix(c, vec3(0.110, 0.044, 0.020), smoothstep(0.08, 0.34, heat));
  c = mix(c, deep, smoothstep(0.32, 0.6, heat));
  c = mix(c, mid, smoothstep(0.58, 0.82, heat));
  c = mix(c, vec3(0.820, 0.520, 0.330), smoothstep(0.84, 1.0, heat));

  // A fine dither so the dark steps never band.
  c += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;
  gl_FragColor = vec4(c, 1.0);
}
`;

export default function PrimeGlowGL() {
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
    // A fixed start in the 90s loop (LOOP in the shader), so the still frame and the first frame
    // are the same. Time wraps at the loop, so the float never grows.
    const T0 = 12;
    const LOOP = 90;
    const draw = (seconds: number) => {
      size();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (T0 + seconds) % LOOP);
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
