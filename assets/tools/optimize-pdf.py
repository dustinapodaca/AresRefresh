"""Shrink the capability statement PDF without visible change (2026-10-09).

The PDF's text is vector outlines written with six-decimal coordinates. This rounds
coordinates (not colors or graphics state) to three decimals, 0.001pt, far below what any
screen or printer resolves; re-packs JPEGs losslessly with jpegtran; recompresses streams;
and drops the XMP metadata. 2.0MB to 1.35MB, with 9 of 15 million pixels differing by at most
13 levels at 300 DPI. Needs pikepdf (pip) and jpegtran (brew install jpeg-turbo).

    python -I assets/tools/optimize-pdf.py assets/files-src/<name>.pdf public/files/<name>.pdf 3
"""
import pikepdf,re,sys
src,dst=sys.argv[1],sys.argv[2]
PREC=int(sys.argv[3]) if len(sys.argv)>3 else 3
pdf=pikepdf.open(src)
num=re.compile(rb'(?<![\w.])(-?\d+\.\d{3,})(?![\w.])')
def tidy(m):
    v=round(float(m.group(1)),PREC)
    s=(('%.'+str(PREC)+'f')%v).rstrip('0').rstrip('.')
    if s in ('-0',''): s='0'
    return s.encode()
changed=0
def fix_stream(st):
    global changed
    try: data=st.read_bytes()
    except Exception: return
    # Round coordinates only; lines that set colors, gray levels, or the graphics state keep
    # their exact values (a rounded color shifts shades).
    keep=(b' scn',b' SCN',b' sc',b' SC',b' rg',b' RG',b' g',b' G',b' k',b' K',b' gs',b' cs',b' CS',b' d',b' w',b' i',b' ri')
    out=[]
    for line in data.split(b'\n'):
        out.append(line if line.rstrip().endswith(keep) else num.sub(tidy,line))
    new=b'\n'.join(out)
    if new!=data:
        st.write(new); changed+=1
for obj in pdf.objects:
    if isinstance(obj,pikepdf.Stream) and obj.get('/Subtype') in (None,'/Form') and obj.get('/Type') not in ('/XRef','/ObjStm','/Metadata'):
        if obj.get('/Subtype') is None and ('/Length1' in obj or '/FontFile' in str(obj.get('/Type'))):
            continue  # skip font programs
        # only content-like streams: no image/font dictionaries
        if '/Width' in obj or '/Length1' in obj or '/Length2' in obj: continue
        fix_stream(obj)
# JPEG photos: lossless Huffman re-optimization with jpegtran (identical pixels).
import subprocess,tempfile,os
saved=0
for obj in pdf.objects:
    flt=obj.get('/Filter') if isinstance(obj,pikepdf.Stream) else None
    names=[str(x) for x in flt] if isinstance(flt,pikepdf.Array) else ([str(flt)] if flt is not None else [])
    if isinstance(obj,pikepdf.Stream) and obj.get('/Subtype')=='/Image' and names==['/DCTDecode']:
        raw=obj.read_raw_bytes()
        with tempfile.NamedTemporaryFile(suffix='.jpg',delete=False) as t: t.write(raw); tn=t.name
        out=subprocess.run(['jpegtran','-copy','none','-optimize',tn],capture_output=True).stdout
        os.unlink(tn)
        if out and len(out)<len(raw):
            obj.write(out, filter=pikepdf.Name('/DCTDecode')); saved+=len(raw)-len(out)
print('jpeg bytes saved',saved)
if '/Metadata' in pdf.Root: del pdf.Root['/Metadata']
pdf.remove_unreferenced_resources()
pdf.save(dst, compress_streams=True, recompress_flate=True, object_stream_mode=pikepdf.ObjectStreamMode.generate, linearize=True)
print('content streams tidied:',changed)
