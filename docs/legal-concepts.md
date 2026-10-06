# Policies: concept

## "The Fine Print" (owner, 2026-10-06: genuine privacy, terms, and accessibility pages,
for SEO and to legitimize the site, best practices, in the site's style)

Routes: `/privacy`, `/terms`, `/accessibility` (added to `src/seo/routes.json` with the
owner's request; indexable). The footer's Privacy, Terms, and Accessibility links point
to them (they were `#`).

Mobbin (2026-10-06), patterns not copies: Stripe and Framer (a side column that lists the
policies and switches between them), Craft (a short summary before the full text),
Slack and Skillshare (an effective date and a table of contents).

- One layout (`src/components/legal/LegalPage.tsx`), three documents.
- A sticky side column on desktop: the three documents on a 1px track (the current one in
  ink with the rail's rust tick), then "On this page", whose current section turns ink as
  you read. On phones the documents become a row of links under the header.
- The document: the title (display-lg), "Effective <date> · Ares Security LLC" in mono, a
  one-line intro, an at-a-glance ledger (Home's ledger row), then the sections at a 68ch
  reading measure, sub-heads in Inter 600, lists with hairline markers.
- Read mode: no motion beyond link colors.

## What the text is based on (verified in the code, 2026-10-06)

- No analytics, advertising, or social tracking scripts; no cookies set by the site; the
  only localStorage use is an unused design-tool component.
- The quote form posts to Web3Forms (fields: need, site details, message, name, email,
  organization and phone optional), with a honeypot.
- Hosted on Netlify (server logs); typefaces from Google Fonts.
- Job applications arrive by email (careers@).
- Accessibility measures listed are the ones DESIGN.md requires and that were checked:
  measured AA contrast (including on photos and glass), focus rings, reduced motion, one
  h1 per page, labeled form fields with announced status, reflow to 320px.

The documents are plain-language drafts, not legal advice: the owner should have counsel
review them (especially governing law and venue, retention, and the Colorado Privacy Act
wording).
