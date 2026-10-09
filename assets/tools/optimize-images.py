#!/usr/bin/env python3
"""Responsive WebP variants for every photo and logo the pages show (2026-10-09).

The originals live in assets/images-src/ (not deployed). For each entry below, encode
WebP copies at a set of widths (never above the source) into public/images/opt/, from the
best original available (a full-size master when one exists), and write
src/lib/images.generated.ts, the manifest that `responsive()` in src/lib/responsive.ts
reads. The code keeps naming images by their old /images/... paths; those are keys into the
manifest, not files. To add or replace an image: put the original in assets/images-src/,
add an entry here, and run:

    python3 -I assets/tools/optimize-images.py            # from the repo root
    MASTERS=/path/to/.impeccable/gen python3 -I ...       # masters elsewhere

Needs cwebp and sips (macOS). A missing source stops the script.
"""
import hashlib
import json
import os
import shutil
import subprocess
import sys

ROOT = os.getcwd()
MASTERS = os.environ.get('MASTERS', os.path.join(ROOT, '.impeccable', 'gen'))
OUT_DIR = os.path.join(ROOT, 'public', 'images', 'opt')
MANIFEST = os.path.join(ROOT, 'src', 'lib', 'images.generated.ts')

PHOTO_WIDTHS = [480, 800, 1200, 1600, 2000, 2400]

# key: the path the code uses; source: the best original; q: WebP quality.
# Full-bleed photos with smooth skies get sharp YUV (it keeps gradients from banding).
PHOTOS = [
    {'key': '/images/hero6.jpg', 'source': 'assets/images-src/hero6.jpg', 'q': 80},
    {'key': '/images/about-hero.jpg', 'source': 'assets/images-src/about-hero.jpg', 'q': 80},
    {'key': '/images/careers-hero.jpg', 'source': 'assets/images-src/careers-hero.jpg', 'q': 80},
    {'key': '/images/about-security.jpg', 'source': 'assets/images-src/about-security.jpg', 'q': 80},
    {'key': '/images/about-banner.jpg', 'source': 'assets/images-src/about-banner.jpg', 'q': 80},
    # A noisy sunset under glass: q76 looks the same as q82 at a third less.
    {'key': '/images/services-hero/denver-sunset.webp', 'source': 'assets/images-src/hero1.jpg', 'q': 76},
    {'key': '/images/services-hero/nb-s1-towers.webp', 'source': 'MASTERS/services-hero/s1-towers.jpg', 'q': 82, 'fallback': 'assets/images-src/services-hero/nb-s1-towers.webp'},
    {'key': '/images/capability-hero/cs-fins.webp', 'source': 'MASTERS/services-hero/s4-fins.jpg', 'q': 82, 'fallback': 'assets/images-src/capability-hero/cs-fins.webp'},
    # Careers, Why people stay, first photo: the team at the range, replaced 2026-10-09 (owner).
    {'key': '/images/careers-philosophy.jpg', 'source': 'assets/images-src/careers-philosophy.png', 'q': 82},
    {'key': '/images/careers-team.jpg', 'source': 'assets/images-src/careers-team.jpg', 'q': 80},
    {'key': '/images/mission-vehicle.jpg', 'source': 'assets/images-src/mission-vehicle.jpg', 'q': 80},
    # The About portrait, replaced 2026-10-09 (owner): a PNG original, so encode a touch higher.
    {'key': '/images/officer-portrait.jpg', 'source': 'assets/images-src/officer-portrait.png', 'q': 82},
    {'key': '/images/backbone-officer.jpg', 'source': 'assets/images-src/backbone-officer.jpg', 'q': 80},
    {'key': '/images/matrix-government.jpg', 'source': 'assets/images-src/matrix-government.jpg', 'q': 80},
    {'key': '/images/matrix-government.webp', 'source': 'assets/images-src/matrix-government.webp', 'q': 82},
    {'key': '/images/matrix-specialized.jpg', 'source': 'assets/images-src/matrix-specialized.jpg', 'q': 80},
    {'key': '/images/matrix-industrial.jpg', 'source': 'assets/images-src/matrix-industrial.jpg', 'q': 80},
    {'key': '/images/matrix-airport-denver.jpg', 'source': 'assets/images-src/matrix-airport-denver.jpg', 'q': 80},
    {'key': '/images/matrix-commercial.jpg', 'source': 'assets/images-src/matrix-commercial.jpg', 'q': 80},
    {'key': '/images/matrix-community.jpg', 'source': 'assets/images-src/matrix-community.jpg', 'q': 80},
    {'key': '/images/capability-page1.webp', 'source': 'assets/images-src/capability-page1.webp', 'q': 84},
    # Test branch only (skipped where missing).
    {'key': '/images/market/data-centers.webp', 'source': 'assets/images-src/market/data-centers.webp', 'q': 82},
    {'key': '/images/market/government-military.webp', 'source': 'assets/images-src/market/government-military.webp', 'q': 82},
    {'key': '/images/market/construction-industrial.webp', 'source': 'assets/images-src/market/construction-industrial.webp', 'q': 82},
    {'key': '/images/market/commercial-property.webp', 'source': 'assets/images-src/market/commercial-property.webp', 'q': 82},
]

# Logos show 30 to 48px tall; 128px covers 2.5x screens. Lossless keeps their edges and
# alpha exact (they are recolored to white silhouettes in CSS).
LOGO_HEIGHT = 128
LOGOS = [
    'cert-gsa-footer.png', 'cert-sba-footer.png', 'cert-women-owned.png', 'cert-wbenc.png',
    'gsa-contract-holder.png', 'cert-denver-edo.webp', 'cert-sba-wosb.webp',
    'cert-co-diverse.webp', 'cert-co-small.webp',
]


def size_of(path):
    out = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', path], capture_output=True, text=True).stdout
    vals = [int(line.split()[-1]) for line in out.splitlines() if 'pixel' in line]
    return vals[0], vals[1]


def resolve(entry):
    for p in (entry['source'], entry.get('fallback')):
        if not p:
            continue
        p = p.replace('MASTERS', MASTERS) if p.startswith('MASTERS') else os.path.join(ROOT, p)
        if os.path.exists(p):
            return p
    return None


def slug(key):
    base = key.removeprefix('/images/').rsplit('.', 1)[0]
    return base.replace('/', '-')


def encode(src, out, width=None, height=None, q=80, lossless=False):
    args = ['cwebp', '-quiet', '-m', '6', '-mt', '-metadata', 'none']
    args += ['-lossless', '-z', '9'] if lossless else ['-q', str(q), '-sharp_yuv', '-af']
    if width or height:
        args += ['-resize', str(width or 0), str(height or 0)]
    subprocess.run(args + [src, '-o', out], check=True)


def hashed(path):
    """Rename a written file to name.<hash8>.webp, so it can be cached forever (public/_headers)."""
    digest = hashlib.sha256(open(path, 'rb').read()).hexdigest()[:8]
    base, ext = path.rsplit('.', 1)
    out = f'{base}.{digest}.{ext}'
    os.replace(path, out)
    return os.path.basename(out)


def main():
    # Start clean: every name carries its content hash, so old files would only pile up.
    shutil.rmtree(OUT_DIR, ignore_errors=True)
    os.makedirs(OUT_DIR, exist_ok=True)
    manifest = {}
    for e in PHOTOS:
        src = resolve(e)
        if not src:
            sys.exit(f'missing source for {e["key"]}')
        sw, sh = size_of(src)
        # The code's aspect wins (a master may be larger than the shipped file).
        widths = [w for w in PHOTO_WIDTHS if w < sw] + [min(sw, PHOTO_WIDTHS[-1] if sw <= PHOTO_WIDTHS[-1] else sw)]
        widths = sorted(set(widths))
        variants = []
        for w in widths:
            name = f'{slug(e["key"])}-{w}.webp'
            out = os.path.join(OUT_DIR, name)
            # 2000px and up only reach high-density screens, which hide compression; 6 points
            # lower there is indistinguishable and about 20% smaller (checked at 1:1).
            encode(src, out, width=w, q=e['q'] - 6 if w >= 2000 else e['q'])
            kb = round(os.path.getsize(out) / 1024)
            variants.append({'w': w, 'src': f'/images/opt/{hashed(out)}', 'kb': kb})
        h = round(sh * widths[-1] / sw)
        fallback = next((v for v in variants if v['w'] >= 1200), variants[-1])
        manifest[e['key']] = {
            'src': fallback['src'],
            'srcSet': ', '.join(f'{v["src"]} {v["w"]}w' for v in variants),
            'width': widths[-1],
            'height': h,
        }
        print(f'{e["key"]}: ' + ', '.join(f'{v["w"]}w {v["kb"]}KB' for v in variants))
    for name in LOGOS:
        src = os.path.join(ROOT, 'assets', 'images-src', name)
        if not os.path.exists(src):
            sys.exit(f'missing source: {src}')
        sw, sh = size_of(src)
        h = min(LOGO_HEIGHT, sh)
        w = round(sw * h / sh)
        out_name = name.rsplit('.', 1)[0] + '.webp'
        out = os.path.join(OUT_DIR, out_name)
        # Keep whichever is smaller: lossless, or near-transparent-exact lossy at q90.
        encode(src, out, height=h, lossless=True)
        alt = out + '.lossy.webp'
        subprocess.run(['cwebp', '-quiet', '-m', '6', '-q', '90', '-alpha_q', '100', '-exact', '-metadata', 'none',
                        '-resize', '0', str(h), src, '-o', alt], check=True)
        if os.path.getsize(alt) < os.path.getsize(out):
            os.replace(alt, out)
        else:
            os.remove(alt)
        key = '/images/' + name
        kb = round(os.path.getsize(out) / 1024)
        manifest[key] = {'src': f'/images/opt/{hashed(out)}', 'width': w, 'height': h}
        print(f'{key}: {w}x{h} {kb}KB')
    os.makedirs(os.path.dirname(MANIFEST), exist_ok=True)
    with open(MANIFEST, 'w') as f:
        f.write('// Generated by assets/tools/optimize-images.py. Do not edit by hand.\n')
        f.write('export type ImageEntry = { src: string; srcSet?: string; width: number; height: number };\n\n')
        f.write('export const IMAGES: Record<string, ImageEntry> = ')
        f.write(json.dumps(manifest, indent=2))
        f.write(';\n')


if __name__ == '__main__':
    sys.exit(main())
