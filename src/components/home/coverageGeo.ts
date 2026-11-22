// The Home map's projection and places, shared by the two forms of 04 Coverage (route and regions).
// Colorado to scale: 37°N to 41°N, 102.05°W to 109.05°W on a 544 by 400 plate.

export type LatLon = [number, number];

export const W = 544;
export const H = 400;
export const px = (lon: number) => ((lon + 109.05) / 7) * W;
export const py = (lat: number) => ((41 - lat) / 4) * H;
export const path = (pts: LatLon[]) => pts.map(([lat, lon], i) => `${i ? 'L' : 'M'}${px(lon).toFixed(1)} ${py(lat).toFixed(1)}`).join(' ');

export const CS: LatLon = [38.8339, -104.8214];
export const DEN: LatLon = [39.7392, -104.9903];
export const GWS: LatLon = [39.5505, -107.3248];
export const GJT: LatLon = [39.0639, -108.5506];
export const MTJ: LatLon = [38.4783, -107.8762];
export const DRO: LatLon = [37.2753, -107.8801];
export const ALS: LatLon = [37.4695, -105.87];
export const PUB: LatLon = [38.2544, -104.6091];
export const WALSENBURG: LatLon = [37.6247, -104.7803];

export const STEP = 16;
export const DOTS: [number, number][] = [];
for (let cy = STEP / 2; cy < H; cy += STEP) for (let cx = STEP / 2; cx < W; cx += STEP) DOTS.push([cx, cy]);

export const REGION_ROWS = [
  { id: 'front-range', name: 'Front Range', cities: 'Colorado Springs · Denver · Pueblo' },
  { id: 'western-slope', name: 'Western Slope', cities: 'Grand Junction · Glenwood Springs · Montrose · Durango' },
  { id: 'san-luis-valley', name: 'San Luis Valley', cities: 'Alamosa' },
];
