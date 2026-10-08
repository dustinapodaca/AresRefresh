#!/usr/bin/env python3
"""Generate an image with Google's Nano Banana 2 (Gemini API) and keep its prompt beside it.

Usage:
  GEMINI_API_KEY=... python3 -I assets/generated/gemini-image.py \
      --prompt-file assets/generated/hero-b2-nb.prompt.txt \
      --out assets/generated/hero-b2-nb.png [--ref path.png ...] [--aspect 16:9] [--size 4K]

Writes <out> plus <out stem>.prompt.json (prompt, model, settings, refs, date), the same
record the OpenAI images carry. Standard library only; the key is read from the
environment and never written anywhere.
"""
import argparse
import base64
import datetime
import json
import mimetypes
import os
import ssl
import sys
import urllib.error
import urllib.request

ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt-file", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--ref", action="append", default=[], help="style reference image (repeatable)")
    ap.add_argument("--model", default="gemini-3.1-flash-image-preview")
    ap.add_argument("--aspect", default="16:9")
    ap.add_argument("--size", default="4K", choices=["512", "1K", "2K", "4K"])
    a = ap.parse_args()

    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not key:
        sys.exit("Set GEMINI_API_KEY (Google AI Studio key).")

    prompt = open(a.prompt_file, encoding="utf-8").read().strip()
    parts = []
    for ref in a.ref:
        mime = mimetypes.guess_type(ref)[0] or "image/png"
        with open(ref, "rb") as f:
            parts.append({"inlineData": {"mimeType": mime, "data": base64.b64encode(f.read()).decode()}})
    parts.append({"text": prompt})

    body = {
        "contents": [{"role": "user", "parts": parts}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": a.aspect, "imageSize": a.size},
        },
    }
    req = urllib.request.Request(
        ENDPOINT.format(model=a.model),
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json", "x-goog-api-key": key},
    )
    ca = os.environ.get("SSL_CERT_FILE") or ("/root/.ccr/ca-bundle.crt" if os.path.exists("/root/.ccr/ca-bundle.crt") else None)
    ctx = ssl.create_default_context(cafile=ca)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=300) as r:
            res = json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code}: {e.read().decode()[:2000]}")

    images = [
        p["inlineData"]
        for c in res.get("candidates", [])
        for p in c.get("content", {}).get("parts", [])
        if "inlineData" in p
    ]
    if not images:
        sys.exit("No image returned:\n" + json.dumps(res, indent=2)[:2000])

    # The API picks the format (4K came back as JPEG); name the file to match.
    ext = mimetypes.guess_extension(images[0].get("mimeType") or "") or ""
    ext = {".jpe": ".jpg", ".jpeg": ".jpg"}.get(ext, ext)
    if ext and not a.out.lower().endswith(ext):
        a.out = os.path.splitext(a.out)[0] + ext
    os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
    with open(a.out, "wb") as f:
        f.write(base64.b64decode(images[0]["data"]))

    record = {
        "prompt": prompt,
        "createdAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "tool": "assets/generated/gemini-image.py",
        "model": a.model,
        "aspectRatio": a.aspect,
        "imageSize": a.size,
        "mimeType": images[0].get("mimeType"),
        "refs": a.ref,
        "usage": res.get("usageMetadata"),
    }
    stem = os.path.splitext(a.out)[0]
    with open(stem + ".prompt.json", "w", encoding="utf-8") as f:
        json.dump(record, f, indent=2)
    print(a.out)


if __name__ == "__main__":
    main()
