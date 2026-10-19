# Analytics and Search Console

Google Analytics 4 (owner's choice, 2026-10-11). The code is in `src/lib/analytics.ts` and
`src/components/Analytics.tsx`. It does nothing until the Measurement ID is set, and it only
reports from aressecurity.co (never local dev, deploy previews, or the prerender).

## One-time setup (owner, in Google and Netlify)

1. **Create the property.** analytics.google.com > Admin > Create > Property: "Ares Security
   website", time zone Mountain, currency USD. Add a **Web** data stream for
   `https://aressecurity.co`. Copy its Measurement ID (`G-...`).
2. **Give the site the ID.** Done (2026-10-19): `.env.production` holds `VITE_GA_ID=G-V4GCEJYB3L`
   (property "Ares Security website"), so every build carries it, on DreamHost or Netlify. Use
   the snippet Google offers only for its ID: the site loads gtag.js itself, and an inline
   script would break the Content-Security-Policy.
3. **Enhanced measurement** (Admin > Data streams > the stream > Enhanced measurement > gear):
   - Keep on: Scrolls, Outbound clicks, File downloads (this is what counts the capability
     statement PDF).
   - **Turn off "Page changes based on browser history events"** (under Page views,
     Advanced). The site sends its own page views; leaving this on counts every page twice.
   - Turn off Form interactions (the quote form sends its own event).
4. **Mark the conversions** (Admin > Events, after the first visits arrive, or create them
   ahead under Admin > Key events): `generate_lead`, `phone_call`, `email_click`,
   `apply_click`, `file_download`. Mark each as a key event.
5. **Keep it advertising-free**, as the privacy policy promises: Admin > Data collection >
   leave **Google signals off**; don't link Google Ads unless the policy is updated first.
6. **Data retention:** Admin > Data retention > 14 months (the default is 2).

## What the site sends

| Event | When | Details sent |
|---|---|---|
| `page_view` | Every page, including in-site navigation | Page address and title |
| `generate_lead` | The quote form was sent successfully | The service picked (e.g. "Armed Security Officers") |
| `phone_call` | Any `tel:` link tapped | The page it was tapped on |
| `email_click` | Any `mailto:` link clicked (except Apply) | The page |
| `apply_click` | A careers Apply link | The page and the role |
| `file_download` | The capability statement PDF | Sent by GA4 itself (enhanced measurement) |

Never sent: names, emails, phone numbers, organizations, or anything typed in the form.

The privacy policy (`/privacy`, effective October 11, 2026) describes this, the `_ga`
cookies, and Google's opt-out add-on. No consent banner: the site serves a US audience and
uses no advertising features. Revisit with counsel if Google Ads or remarketing is added.

## Search Console (after launch)

1. search.google.com/search-console > Add property > **Domain** `aressecurity.co`. Verify with
   the DNS TXT record it gives you, at the domain registrar.
2. Sitemaps > submit `https://aressecurity.co/sitemap.xml`.
3. Link it to GA4: GA Admin > Product links > Search Console links.
4. Bing Webmaster Tools: import from Search Console (one click), so Bing and the AI answer
   engines that use it see the sitemap too.

## Monthly review (first week of each month, about 20 minutes)

In GA4 (Reports) and Search Console (Performance, last 28 days vs the previous period):

- **Leads:** `generate_lead` count, and which pages led to them (Explore > path to the
  event). Calls (`phone_call`) and PDF downloads, by page.
- **Search:** total clicks and impressions; the top 10 queries; any query with many
  impressions but few clicks (its page title or description may need work).
- **Pages:** the city pages, industry pages, and service pages: which gain search traffic,
  which get none.
- **Coverage:** Search Console > Pages: anything "Not indexed" that should be.
- **Note it:** one line per month in a running log (what moved, one change to try).
