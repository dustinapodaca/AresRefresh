"""Every character the built site shows, checked against the two Die Grotesk files that set it.

Reads the visible text of every prerendered page in dist/ (run `npm run build` first) and reports any
character the text face (Die Grotesk B Ares Text) or the headline face (Die Grotesk D Ares Display)
lacks; those would fall back to the system font. Characters the data face sets (PP Fraktion Mono) are
included too, so a character listed may be one only the mono labels use.

usage: python3 scripts/fonts/check-coverage.py   (needs fonttools and brotli)
"""
import glob, html, re, sys
from collections import Counter
from fontTools.ttLib import TTFont

text = Counter()
for p in glob.glob('dist/**/*.html', recursive=True):
    s = open(p, encoding='utf-8').read()
    s = re.sub(r'<!--.*?-->', ' ', s, flags=re.S)
    s = re.sub(r'<(script|style|svg)\b.*?</\1>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<[^>]+>', ' ', s)
    for ch in html.unescape(s):
        if not ch.isspace():
            text[ch] += 1

bad = False
for name in ('die-grotesk-b-ares-text-400', 'die-grotesk-d-ares-display-600'):
    cmap = TTFont(f'public/fonts/{name}.woff2').getBestCmap()
    missing = {c: n for c, n in text.items() if ord(c) not in cmap}
    print(f'{name}: {len(text)} characters on the site, missing {len(missing)}', ''.join(sorted(missing)) or '')
    for c, n in sorted(missing.items(), key=lambda kv: -kv[1]):
        print(f'   U+{ord(c):04X} {c!r} x{n}')
    bad |= bool(missing)
sys.exit(1 if bad else 0)
