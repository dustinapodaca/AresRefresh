# Generated images

AI-generated image options, kept for later. Nothing here is on the site: `assets/` is not
served. To use one, copy it into `public/images/` and reference it from the page.

- **Default model (owner, 2026-10-08): Nano Banana 2** (see its section below). The owner
  prefers it: it reads as a real photograph, where the OpenAI images look fake.
- **Earlier tool:** `impeccable generate-image` (OpenAI `gpt-image-2.5-flare`). The key lives in
  the user's Claude Code settings (`~/.claude/settings.json`, `env.OPENAI_API_KEY`), never
  in this repo.
- **Masters:** lossless PNGs stay local in `.impeccable/gen/` (gitignored). The files
  here are JPEG copies at quality 82 plus each image's exact prompt (`.prompt.txt`) and
  generation record (`.prompt.json`).
- **Cost guide:** about 25 cents per high-quality 2400x1600 image (an estimate).

### Nano Banana 2 (Google), trial from 2026-10-07

- **Tool:** `gemini-image.py` here (standard-library Python, model
  `gemini-3.1-flash-image-preview`, 16:9 at 4K by default). The key is read from the
  `GEMINI_API_KEY` environment variable (Google AI Studio), never stored in this repo.
- **Run:** `python3 -I assets/generated/gemini-image.py --prompt-file <prompt.txt> --out <image.png> [--ref <style.png>]`.
  It writes the image and a `.prompt.json` record beside it.
- **First test:** `hero-b2-nb.prompt.txt`, the hero-b2 prompt reworded for 16:9 with no
  reference image, to compare against `hero-b2.jpg`.
- **Cost guide:** about 15 cents per 4K image (published rates; check Google's pricing).
  Image models have no free tier (quota 0); the Google project needs billing.
- **Result (2026-10-08):** `hero-b2-nb.jpg` (`gemini-3.1-flash-image`, returned as a
  5504x3072 JPEG; master in `.impeccable/gen/`, copy here at 2880px). The summit reads
  more like Pikes Peak and the detail holds at full size, but the model painted the
  "quiet left" as a flat dark overlay with a visible soft edge, and the copper band is
  thin. Next try: drop the left/bottom darkness from the prompt (the page's CSS shade
  and mask already do that) and ask for a stronger copper horizon.

## Rules for generating

- **Use AI images for:** places, architecture, Colorado landscape, light and texture.
- **Never generate:**
  - people presented as Ares staff
  - officers or uniforms
  - branded vehicles
  - client sites
  - anything a buyer could read as a real Ares photo
  
  PRODUCT.md and DESIGN.md require real Ares photography and no invented claims.
- **Never caption a generated scene as a real place.**
- **Anchor the style:** pass a screenshot of the target page with `--ref` so the
  palette matches: blue-black canvas, cool tones, one copper light.
- **Leave room for type:** keep the side the text sits on quiet and dark, and let the
  bottom fall to near-black so the image can fade into the page.

## Catalog

| File | Made for | What it shows | Status |
|---|---|---|---|
| `hero-a.jpg` | Home hero | Copper-glass tower at blue hour, mountains far right | Option; strongest tie to the copper-glass origin of the rust accent |
| `hero-b.jpg` | Home hero | Pikes Peak-like massif at dusk with city lights below | Superseded by b2: the city is invented (it has a dome that isn't in Colorado Springs) |
| `hero-b2.jpg` | Home hero, or the Services strip | The same massif with no city, buildings, or lights; copper horizon over dark forest | Favorite (2026-10-05). Previewed in both heroes; not yet placed |
| `hero-c.jpg` | Section background (Contact, Careers) | Glass-and-steel facade at night, a few warm-lit floors | Spare |

### Round 2: aurora and architecture (the Framer/Vercel look)

The same prompt base, plus soft aurora gradient light in the site's own colors: copper
and amber with deep steel-teal. No purple, no neon, no bright blue.

| File | What it shows | Notes |
|---|---|---|
| `hero-d.jpg` | Dark glass tower corner from below, copper and teal aurora ribbons across the sky | Strongest "corporate". The tower's edge sits right of the headline |
| `hero-e.jpg` | Steel facade fins in perspective, backlit by a copper glow fading to teal | Most abstract and architectural; reads as precision. Good for Services |
| `hero-f.jpg` | Mountain massif under a copper and teal aurora, wilderness only | Colorado plus modern; the most dramatic |
| `hero-g.jpg` | Translucent frosted glass panels in layered depth, lit copper and teal | Most "tech product"; reads as a shield or vault. Strong on mobile |

All files: 2400x1600, generated 2026-10-05 with a screenshot of the Home hero as the
style reference. Round 2 previews used `saturate(1) brightness(0.95)` and
`object-position: 50% 40%` (phones `76% 40%`).

**Design note:** decorative gradients are outside DESIGN.md today ("no gradients for
decoration"). Placing a round 2 image means recording it there as an owner-approved
exception, as was done for the division cards.

## Placing one

- **Grade:** these images are already dark, so ease the page's darkening filter (the
  previews used `saturate(0.95) brightness(0.92)` instead of the hero's `0.62`
  brightness).
- **Crop:** previews used `object-position: 50% 45%` on desktop and `74% 50%` on phones
  (Home hero), and `60% 42%` for the Services strip.
