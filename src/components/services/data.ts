import type { Mark } from '../home/DocRail';

// Services content. Source: docs/services-content.md; copy changes: docs/copy-changes.md.

export const SERVICE_MARKS: readonly Mark[] = [
  { id: 'divisions', n: '01', label: 'Divisions' },
  { id: 'process', n: '02', label: 'Process' },
  { id: 'areas', n: '03', label: 'Areas' },
  { id: 'contact', n: '04', label: 'Contact' },
];

export type Division = {
  id: string;
  n: string;
  title: string;
  body: string;
  covers: string[];
  photo: { src: string; width: number; height: number; position?: string };
};

export const DIVISIONS: Division[] = [
  {
    id: 'government',
    n: '01',
    title: 'Government Security Personnel',
    body: 'Lawful, immediate access to federal and state facilities, with DoW\u2011vetted officers. Agencies can order through our GSA Schedule without opening a new competition.',
    covers: ['Military bases', 'Courthouses', 'Federal buildings', 'State agencies', 'TS/SCI cleared'],
    photo: { src: '/images/matrix-government.jpg', width: 640, height: 427, position: '50% 40%' },
  },
  {
    id: 'airport',
    n: '02',
    title: 'Airport & Transportation Security',
    body: 'Perimeter protection, passenger-area security, baggage, and cargo operations, with uniformed and plainclothes coverage around the clock.',
    covers: ['Airports', 'Transportation hubs', 'Aviation facilities'],
    photo: { src: '/images/matrix-airport.jpg', width: 1200, height: 627 },
  },
  {
    id: 'commercial',
    n: '03',
    title: 'Commercial & High‑Traffic Security',
    body: 'Visible deterrence and loss prevention that scales with foot traffic while protecting revenue and the customer experience.',
    covers: ['Retail', 'Banks', 'Hotels', 'Malls', 'Grocery'],
    photo: { src: '/images/matrix-commercial.jpg', width: 1000, height: 667 },
  },
  {
    id: 'industrial',
    n: '04',
    title: 'Industrial, Logistics & Construction',
    body: 'Posted guards around the clock, mobile patrols, perimeter security, and checkpoint logs you can audit.',
    covers: ['Industrial sites', 'Warehouses', 'Construction', 'Critical infrastructure'],
    photo: { src: '/images/matrix-industrial.jpg', width: 640, height: 360 },
  },
  {
    id: 'specialized',
    n: '05',
    title: 'Specialized & Armed Protection',
    body: 'Licensed, firearms-compliant officers for cash-handling, regulated, or high-liability sites.',
    covers: ['Armed asset protection', 'High-risk environments', 'Data centers'],
    photo: { src: '/images/matrix-specialized.jpg', width: 640, height: 384 },
  },
  {
    id: 'community',
    n: '06',
    title: 'Institutional & Community Security',
    body: 'Trust-based security for sensitive and community settings, where a calm presence matters most.',
    covers: ['Hospitals', 'Schools', 'Museums', 'Places of worship', 'Residential & retirement'],
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
