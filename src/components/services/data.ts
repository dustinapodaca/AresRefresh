import type { Mark } from '../home/DocRail';

// Services content. Source: docs/services-content.md; copy changes: docs/copy-changes.md.

export const SERVICE_MARKS: readonly Mark[] = [
  { id: 'divisions', n: '01', label: 'Industries' },
  { id: 'browse', n: '02', label: 'By role' },
  { id: 'process', n: '03', label: 'Process' },
  { id: 'program', n: '04', label: 'Program' },
  { id: 'areas', n: '05', label: 'Areas' },
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
  /** The industry's full page (owner, 2026-10-10). */
  page?: { to: string; label: string };
};

// The six industries, one set (owner, 2026-10-10: the divisions and the industries were the
// same list shown twice). The owner's fixed order (2026-10-10): Government, Critical,
// Construction, Airport, Commercial, Institutional, everywhere the six appear. Each
// opens to its sites and links to the industry's own page.
export const DIVISIONS: Division[] = [
  {
    id: 'government',
    n: '01',
    title: 'Government & Military',
    // Was "Lawful, immediate access to federal and state facilities, with veterans on our
    // staff" (copy audit: unclear, read as an overclaim; 2026-10-10).
    body: 'Officers for federal, state, and municipal facilities and military installations, including restricted-area escort and access control. Agencies can order through our GSA Schedule without opening a new competition.',
    covers: [
      { name: 'Military bases', detail: 'Officers trained on the post by a member of our leadership who has worked it.' },
      { name: 'Courthouses', detail: 'Uniformed officers for entrances and public areas, working to the court\u2019s post orders.' },
      { name: 'Federal buildings', detail: 'Agencies can order through our GSA Schedule without opening a new competition.' },
      { name: 'Restricted areas', detail: 'Experienced in access control, escort, and vehicle inspection on military installations, alongside base security forces.' },
    ],
    photo: {
      src: '/images/matrix-government.jpg', width: 640, height: 427, position: '50% 40%',
      sharp: { src: '/images/matrix-government.webp', width: 862, height: 862 },
    },
    page: { to: '/industries/government-military', label: 'government and military' },
  },
  {
    id: 'critical',
    n: '02',
    title: 'Critical & High-Liability Sites',
    body: 'Officers for data centers, utilities, cash-handling, and other regulated or high-liability sites, where every entry is documented, unarmed or armed as each post requires. Armed officers are licensed and firearms-qualified by Ares.',
    covers: [
      { name: 'Data centers', detail: 'Access control and checkpoint logs for controlled areas, from construction through operations.' },
      { name: 'Critical infrastructure', detail: 'Posted guards and auditable checkpoint logs where access must be documented.' },
      { name: 'Cash-handling and regulated sites', detail: 'Armed officers where the post requires them, qualified by our veteran NRA firearms instructor.' },
      { name: 'High-liability sites', detail: 'Officers who follow the access list exactly and write everything down.' },
    ],
    photo: { src: '/images/matrix-specialized.jpg', width: 640, height: 384 },
    page: { to: '/industries/critical-infrastructure', label: 'critical and high-liability site' },
  },
  {
    id: 'industrial',
    n: '03',
    title: 'Construction, Industrial & Logistics',
    // Two sentences and three or four site types per card (copy audit card summaries, 2026-10-10).
    body: 'Gate control, perimeter rounds, and after-hours patrol for builds, yards, and warehouses, with checkpoint logs you can audit. Coverage changes as a build moves from phase to phase, including escorts on military construction.',
    covers: [
      { name: 'Industrial sites', detail: 'Posted guards around the clock, with checkpoint logs you can audit.' },
      { name: 'Warehouses', detail: 'Mobile patrols and perimeter security for buildings and yards.' },
      { name: 'Construction', detail: 'Perimeter security and mobile patrols while the site is being built.' },
      { name: 'Military construction', detail: 'Escort and gate control for crews and deliveries on a restricted build.' },
    ],
    photo: { src: '/images/matrix-industrial.jpg', width: 640, height: 360 },
    page: { to: '/industries/construction-industrial', label: 'construction, industrial, and logistics' },
  },
  {
    id: 'airport',
    n: '04',
    title: 'Airport & Transportation',
    // Ready to staff, as the industry page says (copy audit, 2026-10-10: "around the clock"
    // and "staffed on every shift" read as current posts).
    body: 'Officers we are ready to staff for perimeters, passenger areas, baggage, and cargo operations, uniformed or plainclothes. The same documented access control we run in restricted areas applies to cargo and other controlled zones.',
    covers: [
      { name: 'Airports', detail: 'Perimeter, passenger-area, baggage, and cargo coverage, on the shifts the site needs.' },
      { name: 'Transportation hubs', detail: 'Uniformed or plainclothes officers, depending on what the site needs.' },
      { name: 'Aviation facilities', detail: 'Perimeter protection and cargo-area coverage.' },
    ],
    photo: { src: '/images/matrix-airport-denver.jpg', width: 1600, height: 1143, position: '50% 45%' },
    page: { to: '/industries/airport-transportation', label: 'airport and transportation' },
  },
  {
    id: 'commercial',
    n: '05',
    title: 'Commercial & Retail',
    body: 'Visible deterrence and loss prevention for offices, retail, banks, and hotels, scaled to foot traffic. Patrol can cover a whole portfolio, with one report per property.',
    covers: [
      { name: 'Retail', detail: 'Visible deterrence and loss prevention on the sales floor.' },
      { name: 'Banks', detail: 'Officers for cash-handling and high-liability settings.' },
      { name: 'Hotels', detail: 'A presence that protects guests without getting in the way of their stay.' },
      { name: 'Offices and portfolios', detail: 'Lobby officers, and patrol across several properties with a report for each.' },
    ],
    photo: { src: '/images/matrix-commercial.jpg', width: 1000, height: 667 },
    page: { to: '/industries/commercial-property', label: 'commercial and retail' },
  },
  {
    id: 'community',
    n: '06',
    title: 'Institutional & Community',
    body: 'A calm, trained presence for hospitals, schools, campuses, and residential communities. Consistent officers people get to know, trained on each building\u2019s entry points and daily rhythm.',
    covers: [
      { name: 'Hospitals', detail: 'A calm presence at entrances and in public areas.' },
      { name: 'Schools', detail: 'Officers trained on the campus, its entry points, and its daily rhythm.' },
      { name: 'Places of worship', detail: 'A calm, respectful presence during services and events.' },
      { name: 'Residential & retirement', detail: 'Consistent officers residents can get to know.' },
    ],
    photo: { src: '/images/matrix-community.jpg', width: 640, height: 427, position: '50% 30%' },
    page: { to: '/industries/institutional-community', label: 'institutional and community' },
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
    covers: 'Regulations · Access rules · SOPs',
    body: 'We check every regulation, access requirement, and SOP against your facility, whether it is federal, state, or commercial. That removes compliance risk and gives you audit confidence from the moment we go live.',
  },
  {
    n: '03',
    title: 'Guard training',
    covers: 'Post orders · Firearms · Drills',
    // Shortened to what is new here (copy audit, 2026-10-10); the training line is told elsewhere.
    body: 'Officers learn your entry points, your expectations, and the daily rhythm of the site before their first shift.',
  },
  {
    n: '04',
    title: 'Deployment',
    covers: 'Go-live · QA · Reporting',
    body: 'We deploy at full staffing with an on-call system behind every post, so a shift is never left open. Real-time quality checks, daily reporting, and immediate support from leadership start with the first shift.',
  },
];
