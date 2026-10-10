# Careers hero options (owner, 2026-10-09)

Eight photos the owner supplied for the Careers opening, mocked on the live page in
`.playwright-mcp/gallery/careers-heroes.html` (local). **7 is live** (2026-10-09, until the client
weighs in; 1 was live briefly before it). To switch: copy the chosen file to `assets/images-src/careers-hero.jpg`, set
the caption in `src/components/careers/Opening.tsx`, run
`python3 -I assets/tools/optimize-images.py`, and set the desktop framing in
`src/dossier.css` (`.ds-cr-hero img` object-position).

| # | File | Caption | Desktop framing tried |
|---|---|---|---|
| 1 | 1-denver-foothills.jpg | Denver from the foothills | 50% 62% (the default) |
| 2 | 2-horsetooth-sunset.jpg | Horsetooth Reservoir, Fort Collins (outside the service area) | default |
| 3 | 3-speer-bridge-denver.jpg | Downtown Denver | 50% 52% |
| 4 | 4-denver-capitol-night.jpg | Denver and the State Capitol at night | 50% 10% |
| 5 | 5-downtown-denver-aerial.jpg | Downtown Denver | 50% 0% |
| 6 | 6-colorado-springs-pikes-peak.jpg | Downtown Colorado Springs and Pikes Peak | default |
| 7 | 7-air-force-academy-chapel.jpg | Cadet Chapel, U.S. Air Force Academy | 50% 40% |
| 8 | 8-colorado-springs-sunset.jpg | Downtown Colorado Springs (source only 1600px wide) | default |
