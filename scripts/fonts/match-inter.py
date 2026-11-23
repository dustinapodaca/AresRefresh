"""Make a "Text" cut of a Die Grotesk Ares font that sets like Inter: outlines scaled so the x-height
matches Inter's (0.5459 em), Inter's vertical metrics (so line boxes and baselines sit where Inter's
did), and a fixed tracking added to every glyph's advance (half each side) so running text is as wide
as Inter's at the same weight. Kerning scales with the outlines.

Digits take Inter's widths at the same weight (centred), so the `ch` unit, which the site uses for
text measures, is Inter's and columns wrap where they did.

usage: match-inter.py <in.woff2> <out.woff2> <tracking units> <family name> <inter var.woff2> <weight>
"""
import sys
from fontTools.ttLib import TTFont

def decompose_all(f):
    """Flatten composite glyphs (Die Grotesk builds i and j from dotlessi plus a zero-width dot) into
    plain outlines, so moving outlines for tracking moves the dot with its stem."""
    from fontTools.pens.recordingPen import DecomposingRecordingPen
    from fontTools.pens.ttGlyphPen import TTGlyphPen
    glyf = f['glyf']; gs = f.getGlyphSet()
    flat = {}
    for name in f.getGlyphOrder():
        if glyf[name].isComposite():
            rp = DecomposingRecordingPen(gs); gs[name].draw(rp)
            tp = TTGlyphPen(None); rp.replay(tp); flat[name] = tp.glyph()
    for name, g in flat.items():
        glyf[name] = g; g.recalcBounds(glyf)
from fontTools.ttLib.scaleUpem import scale_upem

src, out, track, family = sys.argv[1], sys.argv[2], float(sys.argv[3]), sys.argv[4]
inter_path, weight = sys.argv[5], int(sys.argv[6])
from fontTools.varLib import instancer
INTER_XH, INTER_ASC, INTER_DESC = 0.5459, 0.969, 0.241

f = TTFont(src)
upem = f['head'].unitsPerEm
s = INTER_XH / (f['OS/2'].sxHeight / upem)
# scale every coordinate, advance, and kern by s, then keep the em at the old size: glyphs grow by s
scale_upem(f, round(upem * s))
f['head'].unitsPerEm = upem
decompose_all(f)

glyf, hmtx = f['glyf'], f['hmtx']
half = track / 2
for name in f.getGlyphOrder():
    adv, lsb = hmtx[name]
    if adv == 0: continue
    g = glyf[name]
    if g.numberOfContours > 0:  # simple glyph: move the outline right by half the tracking
        g.coordinates.translate((round(half), 0))
        g.recalcBounds(glyf)
    hmtx[name] = (round(adv + track), lsb + round(half) if g.numberOfContours > 0 else lsb)
for name in f.getGlyphOrder():  # composites follow their components; just refresh bounds and lsb
    g = glyf[name]
    if g.isComposite():
        g.recalcBounds(glyf)
        adv, _ = hmtx[name]
        hmtx[name] = (adv, getattr(g, 'xMin', 0))

# digits at Inter's widths
it = instancer.instantiateVariableFont(TTFont(inter_path), {'wght': weight})
icm, iupm = it.getBestCmap(), it['head'].unitsPerEm
cm = f.getBestCmap()
for d in '0123456789':
    name = cm[ord(d)]; g = glyf[name]
    adv, lsb = hmtx[name]
    new = round(it['hmtx'][icm[ord(d)]][0] / iupm * upem)
    dx = round((new - adv) / 2)
    if g.numberOfContours > 0:
        g.coordinates.translate((dx, 0)); g.recalcBounds(glyf)
        hmtx[name] = (new, lsb + dx)
    else:
        hmtx[name] = (new, lsb)

o, h = f['OS/2'], f['hhea']
asc, desc = round(INTER_ASC * upem), round(INTER_DESC * upem)
o.sTypoAscender, o.sTypoDescender, o.sTypoLineGap = asc, -desc, 0
h.ascent, h.descent, h.lineGap = asc, -desc, 0
o.usWinAscent, o.usWinDescent = max(o.usWinAscent, asc), max(o.usWinDescent, desc)
o.sxHeight = round(INTER_XH * upem)
o.sCapHeight = round(o.sCapHeight * 1)  # already scaled by scale_upem

n = f['name']
sub = n.getDebugName(17) or n.getDebugName(2)
for nid in (1, 4, 6, 16):
    n.removeNames(nameID=nid)
ps = family.replace(' ', '') + '-' + sub
for nid, val in ((1, f'{family} {sub}'), (4, f'{family} {sub}'), (6, ps), (16, family)):
    n.setName(val, nid, 3, 1, 0x409)
f.flavor = 'woff2'
f.save(out)
print(out, 'scale %.4f' % s, 'tracking', track)
