"""Add a fixed tracking to every glyph of a font (half each side) and rename its family. Used for the
headline cut, "Die Grotesk D Ares Display": +45 units (0.045em) so the site's display tracking, tuned
for Inter Tight (-0.05em on most headlines), lands on the -0.005em the owner picked for Die Grotesk D
(2026-11-22), with no script and no shift after load.

usage: track.py <in.woff2> <out.woff2> <units> <family name>
"""
import sys
from fontTools.ttLib import TTFont

src, out, track, family = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]
f = TTFont(src)
glyf, hmtx = f['glyf'], f['hmtx']
half = round(track / 2)
for name in f.getGlyphOrder():
    adv, lsb = hmtx[name]
    if adv == 0: continue
    g = glyf[name]
    if g.numberOfContours > 0:
        g.coordinates.translate((half, 0)); g.recalcBounds(glyf)
        hmtx[name] = (round(adv + track), lsb + half)
    else:
        hmtx[name] = (round(adv + track), lsb)
for name in f.getGlyphOrder():
    g = glyf[name]
    if g.isComposite():
        g.recalcBounds(glyf)
        hmtx[name] = (hmtx[name][0], getattr(g, 'xMin', 0))
n = f['name']
sub = n.getDebugName(17) or n.getDebugName(2)
for nid in (1, 4, 6, 16):
    n.removeNames(nameID=nid)
for nid, val in ((1, f'{family} {sub}'), (4, f'{family} {sub}'), (6, family.replace(' ', '') + '-' + sub), (16, family)):
    n.setName(val, nid, 3, 1, 0x409)
f.flavor = 'woff2'
f.save(out)
print(out, 'tracking', track)
