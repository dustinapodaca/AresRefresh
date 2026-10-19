// Google Analytics 4 (owner, 2026-10-11). Off unless VITE_GA_ID (the G-... Measurement ID) is set,
// as .env.production does for every build (G-V4GCEJYB3L, 2026-10-19), and only on the live domain, so local dev, deploy previews, and the
// prerender never report. Setup and the GA4 settings it expects: docs/analytics.md.
//
// Page views are sent here on every route change (the GA4 setting "Page changes based on
// browser history events" must be off, or each page counts twice). Conversions:
//   generate_lead  the quote form was sent (Contact.tsx calls track)
//   phone_call     a tel: link was tapped
//   email_click    a mailto: link was clicked
//   apply_click    a careers Apply link (a mailto with "Application:" in its subject)
//   file_download  the capability statement PDF (GA4's enhanced measurement sends it)
// No form contents, names, emails, or phone numbers are ever sent.

const ID = import.meta.env.VITE_GA_ID;
const HOSTS = ['aressecurity.co', 'www.aressecurity.co'];

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let started = false;

export function startAnalytics() {
  if (started || !ID || !HOSTS.includes(window.location.hostname)) return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the arguments object itself, not an array.
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', ID, { send_page_view: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(s);
  document.addEventListener('click', onClick, true);
}

export function track(name: string, params: Record<string, string> = {}) {
  window.gtag?.('event', name, params);
}

// One view per address: React's development mode runs effects twice, and a repeat of the
// same address is never a new visit.
let lastPage = '';

export function trackPage(title = document.title) {
  const href = window.location.href;
  if (href === lastPage) return;
  lastPage = href;
  track('page_view', { page_location: href, page_title: title });
}

function onClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!a) return;
  const href = a.getAttribute('href') || '';
  const page = window.location.pathname;
  if (href.startsWith('tel:')) {
    track('phone_call', { page });
  } else if (href.startsWith('mailto:')) {
    const subject = decodeURIComponent(href.split('subject=')[1] || '');
    if (subject.startsWith('Application:')) track('apply_click', { page, role: subject.replace('Application:', '').trim() });
    else track('email_click', { page });
  }
}
