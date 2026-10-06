import type { Mark } from '../home/DocRail';

// Services content. Source: docs/services-content.md; copy changes: docs/copy-changes.md.

export const SERVICE_MARKS: readonly Mark[] = [
  { id: 'divisions', n: '01', label: 'Divisions' },
  { id: 'process', n: '02', label: 'Process' },
  { id: 'areas', n: '03', label: 'Areas' },
  { id: 'contact', n: '04', label: 'Contact' },
];

// `sharp`: a tighter, higher-resolution crop of the same photo, shown only in the tall
// panel of an opened card on desktop; the closed card keeps the wider framing.
type Photo = { src: string; width: number; height: number; position?: string };

export type Division = {
  id: string;
  n: string;
  title: string;
  body: string;
  // Each site type with one plain line. DRAFT copy (2026-10-05), built only from facts
  // already on the site; owner to review (docs/copy-changes.md).
  covers: { name: string; detail: string }[];
  photo: { src: string; width: number; height: number; position?: string; sharp?: Photo };
};

export const DIVISIONS: Division[] = [
  {
    id: 'government',
    n: '01',
    title: 'Government Security Personnel',
    body: 'Lawful, immediate access to federal and state facilities, with DoW\u2011vetted officers. Agencies can order through our GSA Schedule without opening a new competition.',
    covers: [
      { name: 'Military bases', detail: 'DoW\u2011vetted officers, each trained on the post by a member of our leadership who has worked it.' },
      { name: 'Courthouses', detail: 'Uniformed officers for entrances and public areas, working to the court\u2019s post orders.' },
      { name: 'Federal buildings', detail: 'Agencies can order through our GSA Schedule without opening a new competition.' },
      { name: 'State agencies', detail: 'The same staffing, training, and on-call standard as our federal posts.' },
      { name: 'TS/SCI cleared', detail: 'Cleared officers for posts that require a clearance, matched during compliance mapping.' },
    ],
    photo: {
      src: '/images/matrix-government.jpg', width: 640, height: 427, position: '50% 40%',
      sharp: { src: '/images/matrix-government.webp', width: 862, height: 862 },
    },
  },
  {
    id: 'airport',
    n: '02',
    title: 'Airport & Transportation Security',
    body: 'Perimeter protection, passenger-area security, baggage, and cargo operations, with uniformed and plainclothes coverage around the clock.',
    covers: [
      { name: 'Airports', detail: 'Perimeter, passenger-area, baggage, and cargo coverage around the clock.' },
      { name: 'Transportation hubs', detail: 'Uniformed or plainclothes officers, depending on what the site needs.' },
      { name: 'Aviation facilities', detail: 'Perimeter protection and cargo-area coverage, staffed on every shift.' },
    ],
    photo: { src: '/images/matrix-airport-denver.jpg', width: 1600, height: 1143, position: '50% 45%' },
  },
  {
    id: 'commercial',
    n: '03',
    title: 'Commercial & High‑Traffic Security',
    body: 'Visible deterrence and loss prevention that scales with foot traffic while protecting revenue and the customer experience.',
    covers: [
      { name: 'Retail', detail: 'Visible deterrence and loss prevention on the sales floor.' },
      { name: 'Banks', detail: 'Officers for cash-handling and high-liability settings.' },
      { name: 'Hotels', detail: 'A presence that protects guests without getting in the way of their stay.' },
      { name: 'Malls', detail: 'Coverage that scales with foot traffic across shared spaces.' },
      { name: 'Grocery', detail: 'Loss prevention that protects revenue and the customer experience.' },
    ],
    photo: { src: '/images/matrix-commercial.jpg', width: 1000, height: 667 },
  },
  {
    id: 'industrial',
    n: '04',
    title: 'Industrial, Logistics & Construction',
    body: 'Posted guards around the clock, mobile patrols, perimeter security, and checkpoint logs you can audit.',
    covers: [
      { name: 'Industrial sites', detail: 'Posted guards around the clock, with checkpoint logs you can audit.' },
      { name: 'Warehouses', detail: 'Mobile patrols and perimeter security for buildings and yards.' },
      { name: 'Construction', detail: 'Perimeter security and mobile patrols while the site is being built.' },
      { name: 'Critical infrastructure', detail: 'Posted guards and auditable checkpoint logs where access must be documented.' },
    ],
    photo: { src: '/images/matrix-industrial.jpg', width: 640, height: 360 },
  },
  {
    id: 'specialized',
    n: '05',
    title: 'Specialized & Armed Protection',
    body: 'Licensed, firearms-compliant officers for cash-handling, regulated, or high-liability sites.',
    covers: [
      { name: 'Armed asset protection', detail: 'Licensed, firearms-compliant officers, qualified by our veteran NRA firearms instructor.' },
      { name: 'High-risk environments', detail: 'Armed officers for regulated or high-liability sites.' },
      { name: 'Data centers', detail: 'Access control and checkpoint logs for controlled areas.' },
    ],
    photo: { src: '/images/matrix-specialized.jpg', width: 640, height: 384 },
  },
  {
    id: 'community',
    n: '06',
    title: 'Institutional & Community Security',
    body: 'Trust-based security for sensitive and community settings, where a calm presence matters most.',
    covers: [
      { name: 'Hospitals', detail: 'A calm presence at entrances and in public areas.' },
      { name: 'Schools', detail: 'Officers trained on the campus, its entry points, and its daily rhythm.' },
      { name: 'Museums', detail: 'Officers for galleries and public areas, briefed on the building and its entry points.' },
      { name: 'Places of worship', detail: 'A calm, respectful presence during services and events.' },
      { name: 'Residential & retirement', detail: 'Consistent officers residents can get to know.' },
    ],
    photo: { src: '/images/matrix-community.jpg', width: 640, height: 427, position: '50% 30%' },
  },
];

export type Stage = { n: string; title: string; covers: string; body: string };

export const STAGES: Stage[] = [
  {
    n: '01',
    title: 'Technical audit',
    covers: 'Scope · Risk · Site walk',
    body: 'We walk the site and map risks with your team before any contract is signed. That finds vulnerabilities early and gives you a plan that fits how your site actually runs, without costly gaps or changes down the road.',
  },
  {
    n: '02',
    title: 'Compliance mapping',
    covers: 'Regulations · Clearances · SOPs',
    body: 'We check every regulation, clearance, and SOP against your facility, whether it is federal, state, or commercial. That removes compliance risk and gives you audit confidence from the moment we go live.',
  },
  {
    n: '03',
    title: 'Guard training',
    covers: 'Post orders · Firearms · Drills',
    body: 'No officer is sent to your site without hands-on training from a member of our leadership team who has personally worked that exact post. They learn the entry points, client expectations, and daily rhythm of the site, so your coverage is consistent from the first shift.',
  },
  {
    n: '04',
    title: 'Deployment',
    covers: 'Go-live · QA · Reporting',
    body: 'We deploy at full staffing with an on-call system behind every post, so a shift is never left open. Real-time quality checks, daily reporting, and immediate support from leadership keep operations running smoothly.',
  },
];
