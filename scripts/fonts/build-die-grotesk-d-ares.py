"""Build "Die Grotesk D Ares": Klim's test Die Grotesk VF instanced at style D (opsz 42) and a fixed
weight, plus every glyph the specimen PDF's subsets hold that the test file lacks.

The four styles share outlines and step evenly in spacing A -> B -> C -> D, so a glyph is carried to D
as C + (C - A)/2 (or C + (C - B)) where another style has it. Weight comes from whatever style holds the
glyph at both a reference weight and the target. Accented letters use D's own base letter from the
variable font at the exact weight, with the accent placed as in C.

usage: build-die-grotesk-d-ares.py <scratch> <outdir> [style A|B|C|D, default D]
<scratch> holds spec/spec.pdf (the Klim specimen) and die/roman.woff2 (the test VF). The site's builds
are in scripts/fonts/built/; see scripts/fonts/README.md.
"""
import io, sys, re
from collections import defaultdict
from fontTools.cffLib import CFFFontSet
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.recordingPen import RecordingPen, DecomposingRecordingPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools import agl
from pypdf import PdfReader

S, OUT = sys.argv[1], sys.argv[2]
T = sys.argv[3] if len(sys.argv) > 3 else 'D'
OPSZ = {'A': 6, 'B': 18, 'C': 30, 'D': 42}[T]
WEIGHTS = {'Hairline': 100, 'Thin': 200, 'Light': 300, 'Regular': 400, 'Medium': 500, 'Bold': 700, 'Black': 800, 'Heavy': 900}
STYLE_I = {'A': 0, 'B': 1, 'C': 2, 'D': 3}

# ---- load every upright Die Grotesk subset in the PDF: subs[(style, weight)] = CharStrings
subs = {}
r = PdfReader(f"{S}/spec/spec.pdf")
for pg in r.pages:
    res = pg.get('/Resources')
    if not res: continue
    fonts = res.get_object().get('/Font')
    if not fonts: continue
    for _, f in fonts.get_object().items():
        f = f.get_object(); name = str(f.get('/BaseFont')).split('+')[-1]
        m = re.match(r'DieGrotesk-([ABCD])-(\w+?)$', name)
        if not m or 'Italic' in m.group(2): continue
        key = (m.group(1), WEIGHTS[m.group(2)])
        if key in subs: continue
        data = f['/FontDescriptor'].get_object()['/FontFile3'].get_object().get_data()
        cff = CFFFontSet(); cff.decompile(io.BytesIO(data), None)
        subs[key] = cff[cff.fontNames[0]].CharStrings

_rec_cache = {}
def rec(style, w, g):
    k = (style, w, g)
    if k in _rec_cache: return _rec_cache[k]
    cs = subs.get((style, w)); v = None
    if cs is not None and g in cs:
        c = cs[g]; p = RecordingPen(); c.draw(p); c.decompile()
        v = (c.width, p.value)
    _rec_cache[k] = v
    return v

def sig(o): return [(op, len(a)) for op, a in o[1]]

def combine(terms):
    terms = [(c, t) for c, t in terms if c != 0]
    base = terms[0][1]; s0 = sig(base)
    for _, t in terms[1:]:
        if sig(t) != s0: return None
    w = sum(c * t[0] for c, t in terms)
    ops = []
    for i, (op, args) in enumerate(base[1]):
        ops.append((op, [(sum(c * t[1][i][1][j][0] for c, t in terms), sum(c * t[1][i][1][j][1] for c, t in terms)) for j in range(len(args))]))
    return (w, ops)

def at(style, w, g):
    """style's glyph at weight w: exact, or interpolated between the nearest weights it has."""
    v = rec(style, w, g)
    if v: return [(1, v)]
    have = sorted(ww for (s, ww) in subs if s == style and rec(s, ww, g))
    lo = [x for x in have if x < w]; hi = [x for x in have if x > w]
    if lo and hi:
        a, b = lo[-1], hi[0]; t = (w - a) / (b - a)
        return [(1 - t, rec(style, a, g)), (t, rec(style, b, g))]
    return None

def lin(terms):
    """flatten nested [(coef, [(coef, outline)])] lists into one combination"""
    out = []
    for c, t in terms:
        for c2, o in t: out.append((c * c2, o))
    return out

stats = defaultdict(int)
NOW = []
EMB = [0]

def d_general(g, W):
    """D at weight W from the PDF subsets alone. Returns (outline, how) or (None, why)."""
    EMB[0] = 0
    # reference: the style closest to D that has the glyph, at the weight nearest W
    for ref_style in sorted('ABCD', key=lambda s: (abs(STYLE_I[s] - STYLE_I[T]), -STYLE_I[s])):
        ws = sorted((abs(w - W), w) for (s, w) in subs if s == ref_style and rec(s, w, g))
        if ws: break
    else:
        return None, 'none'
    wref = ws[0][1]
    terms = [(1, [(1, rec(ref_style, wref, g))])]
    how = [f'{ref_style}{wref}']
    # weight: S_W - S_wref from any style holding both
    if wref != W:
        got = False
        for s in (ref_style, 'C', 'B', 'A', 'D'):
            sw, sr = at(s, W, g), at(s, wref, g)
            if sw and sr:
                cand = lin(terms + [(1, sw), (-1, sr)])
                if combine(cand):
                    terms += [(1, sw), (-1, sr)]; how.append(f'w:{s}'); got = True; break
        if not got: how.append('w:none'); stats[f'noweight{W}'] += 1; NOW.append(agl.toUnicode(g)); EMB[0] = (stem_at(W) - stem_at(wref)) / 2
    # spacing: step toward D, (C - A)/2 per step, from any pair of styles at a shared weight
    steps = STYLE_I[T] - STYLE_I[ref_style]
    if steps:
        got = False
        for (s1, s2) in (('C', 'A'), ('C', 'B'), ('B', 'A'), ('D', 'C'), ('D', 'A'), ('D', 'B')):
            n = STYLE_I[s1] - STYLE_I[s2]
            for w in sorted({w for (s, w) in subs}, key=lambda w: abs(w - W)):
                a, b = rec(s1, w, g), rec(s2, w, g)
                if a and b:
                    k = steps / n
                    cand = lin(terms + [(k, [(1, a)]), (-k, [(1, b)])])
                    if combine(cand):
                        terms += [(k, [(1, a)]), (-k, [(1, b)])]; how.append(f's:{s1}{s2}{w}'); got = True; break
            if got: break
        if not got:
            how.append('s:shift'); stats['shift'] += 1
            o = combine(lin(terms))
            if o is None: return None, 'incompatible'
            # no second style to measure: tighten the sidebearings like the measured glyphs do
            k = (13 if agl.toUnicode(g).isalpha() else 5) * steps / 1
            return embolden(shift_sb(o, -k), EMB[0]), ' '.join(how)
    o = combine(lin(terms))
    return (embolden(o, EMB[0]), ' '.join(how)) if o else (None, 'incompatible')

import math
STEM = {}
def stem_at(W):
    if W not in STEM:
        t = instancer.instantiateVariableFont(TTFont(f"{S}/die/roman.woff2"), {'opsz': OPSZ, 'wght': W})
        gs = t.getGlyphSet(); bp = BoundsPen(gs); gs[t.getBestCmap()[ord('l')]].draw(bp)
        STEM[W] = bp.bounds[2] - bp.bounds[0]
    return STEM[W]

def embolden(o, d):
    """grow (d > 0) or shrink the ink by d units on every side, keeping the sidebearings"""
    if abs(d) < 0.01: return o
    w, ops = o
    out = []
    for con in contours(ops):
        pts = [pt for _, a in con for pt in a]
        n = len(pts)
        if n < 3: out += con; continue
        newpts = []
        for i, (x, y) in enumerate(pts):
            px, py = pts[i - 1]; nx, ny = pts[(i + 1) % n]
            # normals of the incoming and outgoing edges (outward for PostScript winding)
            def nrm(ax, ay, bx, by):
                dx, dy = bx - ax, by - ay; L = math.hypot(dx, dy) or 1
                return dy / L, -dx / L
            n1 = nrm(px, py, x, y); n2 = nrm(x, y, nx, ny)
            if (px, py) == (x, y): n1 = n2
            if (nx, ny) == (x, y): n2 = n1
            mx, my = n1[0] + n2[0], n1[1] + n2[1]; L = math.hypot(mx, my)
            if L < 1e-6: mx, my = n1
            else: mx, my = mx / L, my / L
            c = max(0.5, mx * n1[0] + my * n1[1])
            newpts.append((x + mx * d / c + d, y + my * d / c))
        k = 0
        for op, a in con:
            out.append((op, newpts[k:k + len(a)])); k += len(a)
    return (w + 2 * d, out)

def shift_sb(o, d):
    """change each sidebearing by d units (d < 0 tightens)"""
    w, ops = o
    return (w + 2 * d, [(op, [(x + d, y) for x, y in pts]) for op, pts in ops])

def contours(ops):
    cons, cur = [], []
    for op, pts in ops:
        cur.append((op, pts))
        if op in ('closePath', 'endPath'): cons.append(cur); cur = []
    return cons

def bbox_ops(ops):
    xs = [x for _, pts in ops for x, _ in pts]
    return (min(xs), max(xs)) if xs else (0, 0)

# names of accent marks AGL composes with: try the longest base-letter prefix that exists
def split_accented(g):
    for n in range(len(g) - 1, 0, -1):
        base, rest = g[:n], g[n:]
        if rest and rest[0].islower() and len(rest) > 2 and base in ('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','dotlessi','dotlessj','AE','ae','Oslash','oslash'):
            return base, rest
    return None, None

def d_accented(g, W, trial_gs, trial_cmap, trial_hmtx):
    base, _ = split_accented(g)
    if not base: return None
    dotless = base in ('i', 'dotlessi', 'j', 'dotlessj')
    cbase = {'i': 'dotlessi', 'j': 'dotlessj'}.get(base, base)
    bu = {'dotlessi': 'i', 'dotlessj': 'j'}.get(base, agl.toUnicode(base))
    if len(bu) != 1 or ord(bu) not in trial_cmap: return None
    cg, cb = rec('C', 500, g), rec('C', 500, cbase)
    if not cg or not cb: return None
    gc, bc = contours(cg[1]), contours(cb[1])
    if len(gc) <= len(bc): return None
    bset = [str(c) for c in bc]
    used, acc = set(), []
    for c in gc:
        sc = str(c)
        if sc in bset and bset.index(sc) not in used: used.add(bset.index(sc))
        else: acc.append(c)
    if len(used) != len(bc): return None  # base merged with the mark (cedilla, ogonek, stroke)
    # the accent at weight W where any style has the same accented glyph at W and 500
    acc_ops = [op for c in acc for op in c]
    tb = trial_cmap[ord(bu)]
    p = DecomposingRecordingPen(trial_gs); trial_gs[tb].draw(p)
    base_ops = p.value
    if dotless:  # D's i or j without its dot: drop the contour that sits wholly above the x-height
        base_ops = [op for c in contours(p.value) if not all(y > 560 for _, pts in c for _, y in pts) for op in c]
    # centre the mark over D's base as it sits over C's
    cx_c = sum(bbox_ops(cb[1])) / 2
    xs = [x for _, pts in base_ops for x, _ in pts]
    cx_d = (min(xs) + max(xs)) / 2 if xs else cx_c
    dx = cx_d - cx_c
    acc_ops = [(op, [(x + dx, y) for x, y in pts]) for op, pts in acc_ops]
    return (trial_hmtx[tb][0], base_ops, acc_ops)

def add_glyph(font, name, ops_list, width, cubic_flags):
    glyf = font['glyf']
    tp = TTGlyphPen(font.getGlyphSet())
    for ops, cubic in zip(ops_list, cubic_flags):
        pen = Cu2QuPen(tp, max_err=0.5, reverse_direction=True) if cubic else tp
        for op, pts in ops: getattr(pen, op)(*pts)
    glyph = tp.glyph()
    order = list(font.getGlyphOrder()) + [name]
    font.setGlyphOrder(order)
    glyf.glyphs[name] = glyph; glyf.glyphOrder = order
    glyph.recalcBounds(glyf)
    font['hmtx'][name] = (max(0, round(width)), getattr(glyph, 'xMin', 0))

# every glyph name any upright subset holds, mapped to Unicode, without suffixes
all_names = set()
for cs in subs.values(): all_names |= set(cs.keys())
want = sorted(n for n in all_names if '.' not in n and n not in ('.notdef',) and agl.toUnicode(n) and len(agl.toUnicode(n)) == 1)

SUBNAMES = {300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold'}
for W, sub in SUBNAMES.items():
    stats.clear(); NOW.clear()
    f = instancer.instantiateVariableFont(TTFont(f"{S}/die/roman.woff2"), {'opsz': OPSZ, 'wght': W})
    f.flavor = None
    gs = f.getGlyphSet(); cmap = dict(f.getBestCmap()); hmtx = f['hmtx']
    have = set(f.getGlyphOrder())
    added = {}; fb = []
    for g in want:
        u = ord(agl.toUnicode(g))
        if u in cmap: continue
        name = g if g not in have else g + '.ares'
        acc = d_accented(g, W, gs, cmap, hmtx)
        if acc:
            width, base_ops, acc_ops = acc
            add_glyph(f, name, [base_ops, acc_ops], width, [False, True]); stats['accented'] += 1
        else:
            o, how = d_general(g, W)
            if split_accented(g)[0]: stats['acc-fallback'] += 1; fb.append(agl.toUnicode(g))
            if o is None: stats['skipped'] += 1; continue
            add_glyph(f, name, [o[1]], o[0], [True]); stats['general'] += 1
        added[u] = name; have.add(name)
    for t in f['cmap'].tables:
        if t.isUnicode(): t.cmap.update(added)
    # nbsp shares the space
    if 0xA0 not in cmap and 0x20 in cmap:
        for t in f['cmap'].tables:
            if t.isUnicode(): t.cmap[0xA0] = cmap[0x20]
    fam = f'Die Grotesk {T} Ares'; ps = f'DieGrotesk{T}Ares-{sub}'
    n = f['name']
    for nid in (1, 2, 3, 4, 6, 16, 17, 25): n.removeNames(nameID=nid)
    for nid, val in ((1, fam if sub == 'Regular' else f'{fam} {sub}'), (2, 'Regular'), (3, f'{ps};2026-11-22'), (4, f'{fam} {sub}'), (6, ps), (16, fam), (17, sub)):
        n.setName(val, nid, 3, 1, 0x409)
    f['OS/2'].usWeightClass = W
    if 'STAT' in f: del f['STAT']
    f.flavor = 'woff2'
    out = f"{OUT}/die-grotesk-{T.lower()}-ares-{W}.woff2"; f.save(out)
    print(W, sub, 'chars', len(f.getBestCmap()), dict(stats)); print('  weight by outline offset (stem', round(stem_at(W)), 'vs 500', round(stem_at(500)), '):', len(NOW))
