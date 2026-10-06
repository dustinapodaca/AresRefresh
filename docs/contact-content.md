# Request a Quote content inventory

Every item on the pre-redesign page (`src/pages/Contact.tsx` at `e2d364e`), and where it
goes. Wording changes are logged in `docs/copy-changes.md`.

## Hero
- Breadcrumb Home / Request a Quote. *Dropped (no breadcrumbs in the Dossier; the nav marks the page).*
- H1 "Request a Quote". *Kept as "Request a quote."*
- Lead: "Send a site, a shift pattern, and a deadline. We'll respond within one business
  day with a scoped proposal — federal, commercial, or specialized." *Kept without the
  response time (PRODUCT.md: response times are never stated) and the em-dash.*
- Background `contact-hero.jpg` (Denver at sunset; the route's SEO preload). *Kept.*

## Map card
- Google Maps embed centered on the Front Range, controls cropped. *Replaced by the
  authored Colorado coverage map from Home (no third-party embed).*
- "Ares Security LLC ★★★★ 4.0 (4)". *Dropped: an unsourced rating (PRODUCT.md).*
- Service areas Colorado Springs, Denver, Pueblo; email; phone. *Kept, in the contact column.*

## Form (Web3Forms; behavior unchanged)
- Kicker "[ CONTACT US ]", H2 "How Can We *Help You?*". *Dropped (bracketed kicker, italic
  accent word).*
- "Fill out the form and we'll get back to you within one business day. For urgent
  procurement timelines, call us directly." *Kept without the response time.*
- Fields: Name*, Email*, Organization, Phone (optional), Subject* (select), Message*.
  *All kept. Subject becomes "What needs covering?": the six Services divisions, the
  capability statement, and other, as selectable rows.*
- Message placeholder "Site, shift pattern, deadline, and any compliance considerations." *Kept.*
- Honeypot `botcheck`; subject slug rewritten to a readable email subject; replyTo;
  from_name; `VITE_WEB3FORMS_KEY`. *All kept.*
- "Discretion guaranteed. Inquiries reviewed by leadership only." *Kept.*
- Submit "Send Inquiry" / "Sending…". *Kept as "Send request" / "Sending…".*
- Toast (top right, emerald/red/orange, 6s). *Replaced by an inline status line under the
  button (aria-live), with the green and amber status lights from the Capability Statement.*
- Messages: success, failure, and not configured. *Kept without the response time.*

## Quick contact tiles
- Email (inbox monitored business hours), Phone (urgent procurement timelines, active
  contracts), Headquarters (Colorado Springs; service across the three metros). *Kept as
  rows in the contact column; icon circles dropped.*
