import { Link } from 'react-router-dom';
import { useScrollInViewObserver } from '../hooks/useScrollInViewObserver';

// ---- Data ----
const CAPS = [
  { n: '01', t: 'Government & Cleared Operations', p: 'Federal facilities, military bases, courthouses, and state agencies. Cleared security escorts at Buckley Space Force Base.', keys: ['TS/SCI Cleared', 'DoW Vetted', 'Escort Services'] },
  { n: '02', t: 'Airport & Transportation Security', p: 'Perimeter, passenger-area, baggage, and cargo coverage for aviation and transportation hubs — uniformed and plainclothes, 24/7.', keys: ['Aviation', 'Cargo', '24/7'] },
  { n: '03', t: 'Commercial & High-Traffic Security', p: 'Retail, banks, hotels, malls, and grocery. Visible deterrence and loss-prevention without disrupting the customer experience.', keys: ['Loss Prevention', 'Banking', 'Hospitality'] },
  { n: '04', t: 'Industrial, Logistics & Construction', p: 'Posted guards, mobile patrol, perimeter and yard security, and auditable checkpoint logs for warehouses, sites, and critical infrastructure.', keys: ['Mobile Patrol', 'Perimeter', 'Critical Infrastructure'] },
  { n: '05', t: 'Specialized & Armed Protection', p: 'Licensed, firearms-compliant officers for cash-handling, regulated, and high-liability environments — insurable risk reduction.', keys: ['Armed', 'Cash-Handling', 'Data Centers'] },
  { n: '06', t: 'Institutional & Community Security', p: 'Hospitals, schools, museums, places of worship, residential and retirement communities — trust-based, calm presence.', keys: ['Healthcare', 'Education', 'Residential'] },
];

const DIFFS = [
  { l: '01 · METHODOLOGY', t: 'Four-Stage Deployment Process', p: 'Technical Audit → Compliance Mapping → Guard Training → Deployment. Repeatable, documented, and audit-ready on day one. Every officer trained on-post by leadership before their first shift.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg> },
  { l: '02 · TEAM', t: 'Cleared, Licensed, Veteran-Led', p: 'DoW-vetted personnel including TS/SCI-cleared escort officers at Buckley SFB. State licensing and firearms qualifications current at time of post — no liability gaps. Leadership cadence drawn from military discipline.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { l: '03 · DOCUMENTATION', t: 'Technical Submittals to Federal Standard', p: 'Proposals, post orders, briefings, and reporting built for contracting officers — not boilerplate. WOSB & WBE certified, GSA Schedule holder, SAM-registered through March 2027. Audit-ready records on request.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 10h18M8 14h4"/></svg> },
];

const PERF = [
  { n: '01', agency: 'U.S. Space Force · Buckley SFB', t: 'Unarmed Security Escort Services', ct: 'Federal Service Contract', val: 'Available on request', period: 'Ongoing · Multi-Year', metric: 'Zero compliance findings', rest: ' and zero security incidents on cleared escort post — DoW vetting and documentation maintained current at all times.' },
  { n: '02', agency: 'Regulated Industry · Confidential', t: 'High-Stakes Compliance Operations', ct: 'Armed Coverage', val: 'Available on request', period: 'Multi-Year · Ongoing', metric: '99% staffing reliability', rest: ' over multiple years in a high-cash, high-liability environment — zero incidents and no compliance issues to date.' },
  { n: '03', agency: 'Multi-Sector · Retail · Commercial', t: 'Concurrent Multi-Site Engagements', ct: 'Multiple Concurrent', val: 'Available on request', period: '2022 — Present', metric: 'Zero unfilled shifts', rest: ' across all posts in the last 12 months — on-call coverage and proactive staffing prevent lapses.' },
];

const CODES: Array<{ k: React.ReactNode; v: string; sub?: string }> = [
  { k: 'UEI', v: 'XQXDN6E33SF4', sub: 'Unique Entity Identifier (SAM.gov)' },
  { k: 'CAGE Code', v: '9KL18', sub: 'Commercial & Government Entity' },
  { k: 'DUNS Number', v: '10-244-9635', sub: 'Legacy — UEI is the SAM identifier going forward' },
  { k: 'SAM Status', v: 'Active', sub: 'Through March 26, 2027' },
  { k: 'Primary NAICS', v: '561612', sub: 'Security Guards & Patrol Services' },
  { k: 'PSC Code', v: 'S206', sub: 'Guard Services' },
  // <br> is hidden by default and re-enabled only at <=460px so the label
  // breaks as "SOCIO" / "ECONOMIC" on small phones but stays one line above.
  { k: <>Socio<br className="hidden max-[460px]:inline" />economic</>, v: 'Small Business · WOSB', sub: 'Small Business · Woman-Owned Small Business' },
  { k: 'GSA Schedule', v: '#47QSMS25D009Q', sub: 'SIN 561612 · Security Services' },
  { k: 'SBA Set-Asides', v: 'WOSB Set-Aside Eligible', sub: 'Eligible for WOSB set-aside awards under NAICS 561612' },
  { k: 'Service Area', v: 'Greater Colorado Area', sub: 'Nationwide on request.' },
  { k: 'Local License — Denver', v: '#2021-BFN-0001984', sub: 'Certified training provider · City of Denver' },
  { k: 'Local License — Colorado Springs', v: '#0850744L', sub: 'Certified training provider · City of Colorado Springs' },
];

const POC: Array<{ k: string; v: React.ReactNode }> = [
  { k: 'Direct Phone', v: <a href="tel:+17196963966">719-696-3966</a> },
  { k: 'Email', v: <a href="mailto:contact@aressecurity.co" style={{ textTransform: 'none' }}>contact@aressecurity.co</a> },
  { k: 'Office', v: 'Colorado Springs, CO 80906' },
  { k: 'Service Area', v: 'Greater Colorado Area' },
  { k: 'Hours', v: '24/7 Operations · M–F Office' },
];

const PDF_URL = '/files/Ares-Security-Capability-Statement-2026.pdf';
const GSA_ELIB = 'https://www.gsaelibrary.gsa.gov/ElibMain/contractorInfo.do?contractNumber=47QSMS25D009Q&contractorName=ARES+SECURITY+LLC&executeQuery=YES';
const SAM_VERIFY = 'https://sam.gov/workspace/contract/opp/acdccc2e5c1f4416aee823f55dc5fa09/view';

// ---- Scoped page styles (kept in lockstep with hi-fi/capability-statement.html) ----
const CS_STYLES = `
.cs_hero{padding:300px 0 160px;position:relative;isolation:isolate;overflow:hidden;background:var(--color-ink);color:var(--color-paper)}
@media (max-width:460px){.cs_hero{padding:225px 0 120px}}
.cs_hero .bg{position:absolute;inset:0;z-index:-2}
.cs_hero .bg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
.cs_hero::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(180deg,rgba(31,31,31,.35) 0%,rgba(31,31,31,.15) 35%,rgba(31,31,31,.75) 100%),linear-gradient(90deg,rgba(31,31,31,.55) 0%,rgba(31,31,31,.2) 55%,rgba(31,31,31,0) 80%)}
.cs_hero_kicker{display:inline-flex;gap:14px;align-items:center;font-size:12px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(250,250,249,.7);margin-bottom:28px}
.cs_hero_kicker .dot{width:6px;height:6px;border-radius:999px;background:rgba(250,250,249,.4)}
.cs_hero h1{font-size:clamp(48px,7vw,84px);font-weight:400;letter-spacing:-.06em;line-height:.92;color:var(--color-paper);margin:0 0 28px;text-transform:none}
.cs_hero_value{font-size:clamp(20px,1.8vw,24px);font-weight:400;line-height:1.4;color:rgba(250,250,249,.82);max-width:62ch;margin:0 0 40px;letter-spacing:-.005em}
.cs_hero_value b{color:var(--color-paper);font-weight:600}
.cs_hero_value .cs_hero_creds{display:inline-block;margin-top:12px}
.cs_hero_ctas{display:flex;flex-wrap:wrap;gap:14px;align-items:center}
/* Hero glass CTA inherits the shared .btn-glass recipe from index.css */
.cs_hero_meta{margin-top:48px;padding-top:24px;border-top:1px solid rgba(250,250,249,.15);display:flex;flex-wrap:wrap;gap:48px}
.cs_hero_meta_item .k{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(250,250,249,.5);margin-bottom:6px}
.cs_hero_meta_item .v{font-size:15px;color:var(--color-paper);font-weight:500;letter-spacing:-.005em;font-variant-numeric:tabular-nums}

.qf_section{background:var(--color-paper);position:relative}
.qf_bar{position:relative;z-index:2;background:var(--color-paper);border:1px solid var(--color-line);border-radius:24px;box-shadow:0 32px 64px -32px rgba(31,31,31,.2);overflow:hidden;display:grid;grid-template-columns:repeat(4,1fr)}
.qf_item{padding:32px 28px;border-left:1px solid var(--color-line);display:flex;flex-direction:column;gap:6px;justify-content:center;min-height:128px;background:var(--color-paper);transition:background .25s ease}
.qf_item:first-child{border-left:0}
.qf_item.qf_emphasis{background:var(--color-paper-2);border-left:1.5px solid var(--color-line);border-right:1.5px solid var(--color-line)}
.qf_item.qf_emphasis + .qf_item{border-left:0}
.qf_sam_link{display:inline-flex;align-items:center;gap:6px;margin-top:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--color-ink);text-decoration:none;border-bottom:1px solid var(--color-ink);padding-bottom:2px;align-self:flex-start;transition:color .2s ease,border-bottom-color .2s ease}
.qf_sam_link:hover{color:var(--color-mid);border-bottom-color:var(--color-mid)}
.qf_item .k{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--color-mid)}
.qf_item .v{font-size:clamp(18px,1.8vw,24px);font-weight:600;color:var(--color-ink);letter-spacing:-.015em;line-height:1.05;font-variant-numeric:tabular-nums;word-break:break-word}
.qf_item .sub{font-size:12px;color:var(--color-mid);margin-top:2px;line-height:1.35}
@media (max-width:900px){.qf_bar{grid-template-columns:repeat(2,1fr)}.qf_item{padding:22px 20px}.qf_item:first-child,.qf_item:nth-child(odd){border-left:0}.qf_item:nth-child(3),.qf_item:nth-child(4){border-top:1px solid var(--color-line)}}

.cs_cap_grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media (max-width:900px){.cs_cap_grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:560px){.cs_cap_grid{grid-template-columns:1fr}}
.cs_cap_item{background:var(--color-paper);border:1px solid var(--color-line);border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:14px;transition:border-color .3s ease,transform .3s ease,box-shadow .3s ease}
.cs_cap_item:hover{border-color:var(--color-ink);transform:translateY(-3px);box-shadow:0 24px 48px -24px rgba(31,31,31,.2)}
@media (max-width:460px){.cs_cap_item[data-in-view="true"]{border-color:var(--color-ink);transform:translateY(-3px);box-shadow:0 24px 48px -24px rgba(31,31,31,.2)}}
.cs_cap_num{font-size:12px;font-weight:600;letter-spacing:.22em;color:var(--color-mid)}
.cs_cap_title{font-size:20px;font-weight:600;color:var(--color-ink);letter-spacing:-.01em;line-height:1.2;margin:0}
.cs_cap_body{font-size:14px;color:var(--color-ink-2);line-height:1.55;margin:0}
.cs_cap_keys{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:8px}
.cs_cap_keys span{font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--color-mid);background:var(--color-paper-2);border:1px solid var(--color-line);border-radius:999px;padding:4px 10px;white-space:nowrap}

.pp_section{background:#E5E4E1}
.pp_grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media (max-width:1100px){.pp_grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:680px){.pp_grid{grid-template-columns:1fr}}
.pp_card{background:var(--color-paper);border:1px solid var(--color-line);border-radius:20px;padding:32px;display:flex;flex-direction:column;gap:18px;transition:border-color .3s ease,transform .3s ease,box-shadow .3s ease}
.pp_card:hover{border-color:var(--color-ink);transform:translateY(-3px);box-shadow:0 24px 48px -24px rgba(31,31,31,.18)}
@media (max-width:460px){.pp_card[data-in-view="true"]{border-color:var(--color-ink);transform:translateY(-3px);box-shadow:0 24px 48px -24px rgba(31,31,31,.18)}}
.pp_card_top{display:flex;justify-content:space-between;align-items:center;gap:12px;padding-bottom:14px;border-bottom:1px solid var(--color-line)}
.pp_card_n{font-size:12px;font-weight:700;letter-spacing:.22em;color:var(--color-mid)}
.pp_card_status{font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--color-ink);padding:5px 12px;border:1px solid var(--color-line);border-radius:999px;background:var(--color-paper-2);white-space:nowrap}
.pp_card_status.active{background:var(--color-ink);color:var(--color-paper);border-color:var(--color-ink)}
.pp_card_status.active::before{content:"";display:inline-block;width:6px;height:6px;border-radius:999px;background:#7CB85F;margin-right:8px;vertical-align:1px;box-shadow:0 0 0 2px rgba(124,184,95,.25)}
.pp_card h4{font-size:22px;font-weight:600;color:var(--color-ink);letter-spacing:-.01em;line-height:1.2;margin:0}
.pp_card .pp_agency{font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--color-mid)}
.pp_meta_grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:18px 0;border-top:1px solid var(--color-line);border-bottom:1px solid var(--color-line)}
.pp_meta_grid > div{display:flex;flex-direction:column;justify-content:space-between}
.pp_meta_grid .k{font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--color-mid);margin-bottom:4px}
.pp_meta_grid .v{font-size:13px;font-weight:600;color:var(--color-ink);line-height:1.3;font-variant-numeric:tabular-nums}
.pp_outcome{display:flex;gap:12px;align-items:flex-start;background:var(--color-paper-2);border-radius:12px;padding:14px 16px}
.pp_outcome svg{flex-shrink:0;margin-top:2px;color:var(--color-ink)}
.pp_outcome p{font-size:14px;color:var(--color-ink);line-height:1.45;margin:0}
.pp_outcome p b{font-weight:700}

.cv_section{background:var(--color-ink);color:var(--color-paper);position:relative;overflow:hidden;isolation:isolate}
.cv_section::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:-1;background:radial-gradient(ellipse at 90% 10%,rgba(124,120,118,.22),transparent 60%)}
.cv_grid{display:grid;grid-template-columns:1.4fr 1fr;gap:32px;align-items:stretch}
@media (max-width:900px){.cv_grid{grid-template-columns:1fr}}
.cv_card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.18);border-radius:20px;padding:36px;-webkit-backdrop-filter:blur(20px) saturate(140%);backdrop-filter:blur(20px) saturate(140%);display:flex;flex-direction:column;gap:20px;min-width:0;overflow:hidden}
.cv_card_head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;flex-wrap:wrap;padding-bottom:18px;border-bottom:1px solid rgba(250,250,249,.16)}
@media (max-width:640px){
  .cv_card_head{display:grid;grid-template-columns:1fr auto;align-items:center;column-gap:12px;row-gap:6px}
  .cv_card_head > div{display:contents}
  .cv_card_head .cv_card_kicker{grid-column:1;grid-row:1}
  .cv_card_head > .pill_active{grid-column:2;grid-row:1;margin-left:0;align-self:center}
  .cv_card_head h3{grid-column:1 / -1;grid-row:2;margin-top:0}
  .cv_actions{justify-content:center}
  .cv_actions .btn{width:100%;justify-content:center}
}
.cv_card_kicker{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(250,250,249,.6)}
.cv_card h3{font-size:clamp(24px,2.4vw,32px);font-weight:400;letter-spacing:-.03em;line-height:1.05;color:var(--color-paper);margin:8px 0 0;text-transform:none}
.cv_card .pill_active{font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;padding:6px 12px;border-radius:999px;color:var(--color-paper);background:rgba(124,184,95,.18);border:1px solid rgba(124,184,95,.45);white-space:nowrap}
.cv_card .pill_active::before{content:"";display:inline-block;width:6px;height:6px;border-radius:999px;background:#7CB85F;margin-right:8px;vertical-align:1px}
.cv_meta{display:grid;grid-template-columns:repeat(2,1fr);gap:16px 24px}
.cv_meta > div{min-width:0}
.cv_meta .k{font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(250,250,249,.55);margin-bottom:4px}
.cv_meta .v{font-size:15px;font-weight:500;color:var(--color-paper);line-height:1.35;font-variant-numeric:tabular-nums;letter-spacing:-.005em;overflow-wrap:anywhere}
.cv_actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto;padding-top:8px}
.cv_secondary{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.14);border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:14px;justify-content:center;min-height:100%}
.cv_secondary h4{font-size:12px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(250,250,249,.6);margin:0}
.cv_secondary ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.cv_secondary li{font-size:14px;color:var(--color-paper);font-weight:500;display:grid;grid-template-columns:1fr auto auto;gap:12px;align-items:center;padding:8px 0;border-top:1px solid rgba(250,250,249,.1)}
.cv_secondary li:first-child{border-top:0;padding-top:0}
.cv_secondary li span + span{color:rgba(250,250,249,.7);font-weight:400;font-size:13px}
.cv_secondary .v_dot{width:7px;height:7px;border-radius:999px;display:inline-block;flex-shrink:0;justify-self:end}
.cv_secondary .v_dot.green{background:#7CB85F;box-shadow:0 0 0 3px rgba(124,184,95,.18)}
.cv_secondary .v_dot.amber{background:#F2B84B;box-shadow:0 0 0 3px rgba(242,184,75,.18)}
.cv_secondary .footnote{font-size:15px;color:rgba(250,250,249,.78);margin:auto 0 0;padding-top:14px;border-top:1px solid rgba(250,250,249,.12);line-height:1.5}
.cv_secondary .footnote b{color:var(--color-paper);font-weight:600}

.cc_section{background:var(--color-paper-2)}
.cc_logos{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:48px}
@media (max-width:768px){.cc_logos{grid-template-columns:repeat(2,1fr)}}
@media (max-width:460px){.cc_logos{gap:12px}}
/* Stagger reveal: each .cc_logo starts hidden + offset; when the parent
   .cc_logos passes the viewport-center the observer flips its
   data-in-view attribute to "true", and the cards transition in with
   200ms delays cascading left→right (GSA → WOSB → WBENC → SBA). */
.cc_logo{background:var(--color-paper);border:1px solid var(--color-line);border-radius:20px;padding:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;min-height:160px;min-width:0;opacity:0;transform:translateY(16px);transition:opacity 600ms ease-out,transform 600ms ease-out,border-color .25s ease}
.cc_logos[data-in-view="true"] .cc_logo{opacity:1;transform:translateY(0)}
.cc_logos .cc_logo:nth-child(1){transition-delay:0ms,0ms,0s}
.cc_logos .cc_logo:nth-child(2){transition-delay:200ms,200ms,0s}
.cc_logos .cc_logo:nth-child(3){transition-delay:400ms,400ms,0s}
.cc_logos .cc_logo:nth-child(4){transition-delay:600ms,600ms,0s}
@media (max-width:460px){.cc_logo{padding:18px 12px;gap:12px;min-height:140px}}
.cc_logo:hover{border-color:var(--color-ink);transform:translateY(-2px)}
.cc_logo img{max-width:120px;max-height:64px;width:100%;height:auto;object-fit:contain;flex-shrink:0}
.cc_logo_name{font-size:12px;font-weight:600;letter-spacing:.06em;color:var(--color-ink);text-align:center;line-height:1.3;overflow-wrap:anywhere}
.cc_logo_id{font-size:11px;font-weight:500;letter-spacing:.08em;color:var(--color-mid);text-align:center;font-variant-numeric:tabular-nums;overflow-wrap:anywhere}
.cc_codes{background:var(--color-paper);border:1px solid var(--color-line);border-radius:24px;overflow:hidden}
.cc_codes_head{padding:24px 32px;border-bottom:1px solid var(--color-line);background:#E5E4E1;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.cc_codes_head h3{font-size:18px;font-weight:600;color:var(--color-ink);letter-spacing:-.01em;margin:0}
.cc_codes_head .lbl{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--color-ink-2)}
.cc_table{display:grid;grid-template-columns:1fr 1fr}
@media (max-width:768px){.cc_table{grid-template-columns:1fr}}
.cc_row{display:grid;grid-template-columns:1fr 1.4fr;gap:16px;align-items:baseline;padding:18px 32px;border-top:1px solid var(--color-line)}
.cc_row .k{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--color-mid)}
.cc_row .v{font-size:15px;font-weight:600;color:var(--color-ink);letter-spacing:-.005em;font-variant-numeric:tabular-nums;line-height:1.35}
.cc_row .v small{display:block;font-size:12px;font-weight:400;color:var(--color-mid);letter-spacing:0;margin-top:3px;text-transform:none;font-variant-numeric:normal}
@media (min-width:769px){.cc_row:nth-child(1),.cc_row:nth-child(2){border-top:0}.cc_row:nth-child(odd){border-right:1px solid var(--color-line)}}

.poc_section{position:relative;padding:80px 0;background:var(--color-paper)}
.poc_card{position:relative;border-radius:24px;overflow:hidden;isolation:isolate;background:var(--color-ink);color:var(--color-paper);padding:64px;box-shadow:0 40px 80px -32px rgba(31,31,31,.5),0 8px 24px -8px rgba(31,31,31,.25)}
.poc_card::before{content:"";position:absolute;inset:0;z-index:-2;pointer-events:none;background:url('/images/cap-cta-bg.jpg') center/cover no-repeat}
.poc_card::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:linear-gradient(180deg,rgba(31,31,31,.55) 0%,rgba(31,31,31,.35) 50%,rgba(31,31,31,.7) 100%),linear-gradient(90deg,rgba(31,31,31,.55) 0%,rgba(31,31,31,.2) 60%,rgba(31,31,31,.4) 100%)}
.poc_grid{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.poc_lead h3.poc_head{font-size:clamp(32px,4vw,52px);font-weight:400;letter-spacing:-.06em;line-height:1.02;color:var(--color-paper);margin:0 0 16px;text-transform:none}
.poc_lead h3.poc_head em{font-style:italic;font-weight:300;color:var(--color-light)}
.poc_lead p{font-size:17px;color:rgba(250,250,249,.72);line-height:1.5;margin:0;max-width:48ch}
.poc_person{display:flex;align-items:center;gap:18px}
.poc_avatar{width:56px;height:56px;border-radius:999px;background:linear-gradient(135deg,rgba(255,255,255,.18),rgba(255,255,255,.04));-webkit-backdrop-filter:blur(14px) saturate(140%);backdrop-filter:blur(14px) saturate(140%);border:1px solid rgba(255,255,255,.2);box-shadow:inset 0 1px 0 rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;color:var(--color-paper);flex-shrink:0;position:relative}
.poc_avatar::before{content:"";position:absolute;inset:0;background-color:currentColor;-webkit-mask:url('/ares-logo.svg') no-repeat calc(50% - 1px) calc(50% - 1px) / 54% 54%;mask:url('/ares-logo.svg') no-repeat calc(50% - 1px) calc(50% - 1px) / 54% 54%}
.poc_person .name{font-size:18px;font-weight:600;color:var(--color-paper);line-height:1.2}
.poc_person .title{font-size:13px;color:rgba(250,250,249,.65);letter-spacing:.06em;text-transform:uppercase;margin-top:4px}
.poc_details{display:flex;flex-direction:column;margin-top:28px}
.poc_detail{display:flex;justify-content:space-between;gap:24px;padding:16px 0;border-top:1px solid rgba(250,250,249,.16)}
.poc_detail:first-child{border-top:0;padding-top:0}
.poc_detail .k{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(250,250,249,.55)}
.poc_detail .v{font-size:16px;font-weight:500;color:var(--color-paper);letter-spacing:-.005em;text-align:right}
.poc_detail .v a{color:var(--color-paper);text-decoration:none;border-bottom:1px solid rgba(250,250,249,.3)}
.poc_detail .v a:hover{border-bottom-color:var(--color-paper)}
.poc_ctas{position:relative;margin-top:24px;padding-top:20px;border-top:1px solid rgba(250,250,249,.16);display:flex;gap:14px;flex-wrap:wrap;align-items:center}
@media (max-width:900px){.poc_card{padding:40px 32px}.poc_grid{grid-template-columns:1fr;gap:32px}.poc_detail .v{text-align:right}}
@media (max-width:640px){.poc_card{padding:32px 24px}.poc_ctas{gap:10px;flex-wrap:nowrap}.poc_ctas .btn{flex:1 1 0;min-width:0;padding:14px 12px;font-size:11px;letter-spacing:.06em;justify-content:center;text-align:center;white-space:nowrap}}

.cs_footcta{position:relative;padding:0 0 100px;background:var(--color-paper)}
.cs_footcta_card{position:relative;border-radius:24px;overflow:hidden;background:var(--color-paper-2);border:1px solid var(--color-line);padding:40px 56px;display:flex;align-items:center;justify-content:space-between;gap:48px;flex-wrap:wrap}
.cs_footcta_card .fct_head{font-size:clamp(26px,3vw,38px);font-weight:400;letter-spacing:-.05em;line-height:1.05;color:var(--color-ink);margin:0;text-transform:none}
.cs_footcta_card .fct_head em{font-style:italic;font-weight:300;color:var(--color-mid)}
.cs_footcta_card .actions{display:flex;flex-wrap:wrap;gap:14px;align-items:center;flex-shrink:0}
@media (max-width:768px){.cs_footcta_card{padding:32px;gap:20px}}
@media (max-width:640px){.cs_footcta_card{padding:24px 20px;gap:16px}.cs_footcta_card .actions{width:100%}.cs_footcta_card .actions .btn{width:100%;justify-content:center;padding:14px 18px;font-size:11px;letter-spacing:.06em}}

.cs_spacer_lg{height:100px}
.cs_spacer_md{height:70px}
.cs_spacer_sm{height:64px}
@media (max-width:991px){.cs_spacer_lg{height:70px}.cs_spacer_md{height:50px}.cs_spacer_sm{height:50px}}

/* Section 04 status-dot pulse — fires once when the Contract Vehicles
   grid scrolls into view (cv_grid carries data-reveal="none", which the
   observer flips to data-revealed="true" without animating the grid
   itself). Three keyframes: a plain green pulse for the .pill_active
   dot which has no resting ring, and ring-preserving variants for the
   .v_dot.green / .v_dot.amber lights which already carry a 3px
   resting halo. */
@keyframes cs_pulse_green {
  0% { box-shadow: 0 0 0 0 rgba(124,184,95,.55); }
  100% { box-shadow: 0 0 0 14px rgba(124,184,95,0); }
}
@keyframes cs_pulse_vdot_green {
  0% { box-shadow: 0 0 0 3px rgba(124,184,95,.18), 0 0 0 0 rgba(124,184,95,.55); }
  100% { box-shadow: 0 0 0 3px rgba(124,184,95,.18), 0 0 0 14px rgba(124,184,95,0); }
}
@keyframes cs_pulse_vdot_amber {
  0% { box-shadow: 0 0 0 3px rgba(242,184,75,.18), 0 0 0 0 rgba(242,184,75,.55); }
  100% { box-shadow: 0 0 0 3px rgba(242,184,75,.18), 0 0 0 14px rgba(242,184,75,0); }
}
.cv_grid[data-revealed="true"] .pill_active::before { animation: cs_pulse_green 1.4s ease-out; }
.cv_grid[data-revealed="true"] .v_dot.green { animation: cs_pulse_vdot_green 1.4s ease-out; }
.cv_grid[data-revealed="true"] .v_dot.amber { animation: cs_pulse_vdot_amber 1.4s ease-out; }
`;

export default function CapabilityStatement() {
  useScrollInViewObserver();

  return (
    <main className="overflow-x-hidden font-sans">
      <style>{CS_STYLES}</style>

      {/* 1. HERO */}
      <section className="cs_hero" data-section="hero">
        <div className="bg">
          <img src="/images/capability-hero.jpg" alt="" />
        </div>
        <div className="container-ares">
          <ol className="reveal m-0 mb-6 flex list-none gap-2 p-0 text-[13px] uppercase tracking-[0.14em] text-paper/65">
            <li><Link to="/">Home</Link></li>
            <li className="text-paper/40">/</li>
            <li className="text-paper">Capability Statement</li>
          </ol>
          <div className="cs_hero_kicker reveal-d1">
            <span>Ares Security LLC</span>
            <span className="dot" />
            <span>NAICS 561612</span>
            <span className="dot" />
            <span>Security Guard &amp; Patrol Services</span>
          </div>
          <h1 className="reveal-d2">Capability Statement</h1>
          <p className="cs_hero_value reveal-d3">
            Federal-ready security guard and patrol services for commercial clients, agencies, and prime contractors.<br /><b className="cs_hero_creds">GSA Schedule holder · SAM-registered · WOSB &amp; WBE certified.</b>
          </p>
          <div className="cs_hero_ctas">
            <a href={PDF_URL} className="btn btn-glass max-w-full max-[460px]:px-5 max-[460px]:py-3 max-[460px]:text-[12px]" download>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8, verticalAlign: -3 }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {/* Long label on >460px, compact "Download PDF" on small mobile so the
                  button doesn't blow out of the hero. */}
              <span className="max-[460px]:hidden">Download Capability Statement (PDF)</span>
              <span className="hidden max-[460px]:inline">Download PDF</span>
            </a>
          </div>
          <div className="cs_hero_meta reveal-d4">
            <div className="cs_hero_meta_item"><div className="k">Issued</div><div className="v">April 2026</div></div>
            <div className="cs_hero_meta_item"><div className="k">Entity Registered</div><div className="v">May 17, 2023</div></div>
            <div className="cs_hero_meta_item"><div className="k">SAM Status</div><div className="v">Active · Through Mar 26, 2027</div></div>
            <div className="cs_hero_meta_item"><div className="k">Service Area</div><div className="v">Based in Colorado</div></div>
          </div>
        </div>
      </section>

      {/* 2. QUICK FACTS */}
      <section className="qf_section" data-section="quickfacts" aria-label="Quick facts">
        <div className="cs_spacer_md" />
        <div className="container-ares">
          <div className="qf_bar" role="list">
            <div className="qf_item" role="listitem">
              <span className="k">Primary NAICS</span>
              <span className="v">561612</span>
              <span className="sub">Security Guards &amp; Patrol Services</span>
            </div>
            <div className="qf_item qf_emphasis" role="listitem">
              <span className="k">Business Size / Set-Aside</span>
              <span className="v">WOSB Set-Aside Eligible</span>
              <span className="sub">Woman-Owned Small Business · WBE Certified</span>
            </div>
            <div className="qf_item" role="listitem">
              <span className="k">UEI</span>
              <span className="v">XQXDN6E33SF4</span>
              <span className="sub">Unique Entity ID (SAM.gov)</span>
              <a className="qf_sam_link" href={SAM_VERIFY} target="_blank" rel="noopener noreferrer">Verify on SAM.gov ↗</a>
            </div>
            <div className="qf_item" role="listitem">
              <span className="k">CAGE Code</span>
              <span className="v">9KL18</span>
              <span className="sub">Commercial &amp; Govt Entity</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE COMPETENCIES */}
      <section data-section="competencies">
        <div className="cs_spacer_md" />
        <div className="container-ares">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
            <div>
              <h3 className="relative mb-4 inline-grid items-center gap-2.5 self-start text-[13px] font-medium uppercase tracking-[0.22em] grid-cols-[auto_max-content_auto]" data-reveal="up">
                <span aria-hidden className="opacity-50">[</span>
                {/* <br> shows only on <=460px so "CORE COMPETENCIES" stays whole on
                    a single second line instead of wrapping mid-phrase. */}
                <span>SECTION 01 ·<br className="hidden max-[460px]:inline" /> CORE COMPETENCIES</span>
                <span aria-hidden className="opacity-50">]</span>
              </h3>
              <h2 className="text-display-lg text-ink" data-reveal="up">WHAT <span className="font-light italic text-mid">WE DO</span></h2>
            </div>
            <p className="text-right text-[14px] uppercase tracking-[0.14em] text-mid" data-reveal="right">↓ Six divisions<br />under one GSA vehicle</p>
          </div>
          <div className="cs_cap_grid">
            {CAPS.map((c) => (
              <article key={c.n} data-scroll-active data-in-view="false" className="cs_cap_item">
                <span className="cs_cap_num">{c.n}</span>
                <h3 className="cs_cap_title">{c.t}</h3>
                <p className="cs_cap_body">{c.p}</p>
                <div className="cs_cap_keys">{c.keys.map((k) => <span key={k}>{k}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
        <div className="cs_spacer_lg" />
      </section>

      {/* 4. PAST PERFORMANCE */}
      <section className="pp_section" data-section="performance">
        <div className="cs_spacer_lg" />
        <div className="container-ares">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
            <div>
              <h3 className="relative mb-4 inline-grid items-center gap-2.5 self-start text-[13px] font-medium uppercase tracking-[0.22em] grid-cols-[auto_max-content_auto]" data-reveal="up">
                <span aria-hidden className="opacity-50">[</span>
                <span>SECTION 02 ·<br className="hidden max-[460px]:inline" /> PAST PERFORMANCE</span>
                <span aria-hidden className="opacity-50">]</span>
              </h3>
              <h2 className="text-display-lg text-ink" data-reveal="up">PROVEN <span className="font-light italic text-mid">RECORD</span></h2>
            </div>
            <p className="text-right text-[14px] uppercase tracking-[0.14em] text-ink-2" data-reveal="right">↓ Detailed references<br />available on request</p>
          </div>
          <div className="pp_grid">
            {PERF.map((p) => (
              <article key={p.n} data-scroll-active data-in-view="false" className="pp_card">
                <div className="pp_card_top">
                  <span className="pp_card_n">{p.n}</span>
                  <span className="pp_card_status active">Active</span>
                </div>
                <div>
                  <div className="pp_agency">{p.agency}</div>
                  <h4 style={{ marginTop: 6 }}>{p.t}</h4>
                </div>
                <div className="pp_meta_grid">
                  <div><div className="k">Contract Type</div><div className="v">{p.ct}</div></div>
                  <div><div className="k">Value</div><div className="v">{p.val}</div></div>
                  <div><div className="k">Period</div><div className="v">{p.period}</div></div>
                </div>
                <div className="pp_outcome">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <p><b>{p.metric}</b>{p.rest}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="cs_spacer_lg" />
      </section>

      {/* 5. DIFFERENTIATORS */}
      <section data-section="differentiators">
        <div className="cs_spacer_lg" />
        <div className="container-ares">
          <div className="mb-12">
            <h3 className="brackets-title mb-4" data-reveal="up">SECTION 03 · DIFFERENTIATION</h3>
            <h2 className="text-display-lg text-ink" data-reveal="up">WHY <span className="font-light italic text-mid">ARES</span></h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {DIFFS.map((d) => (
              <article key={d.l} data-scroll-active data-in-view="false" className="relative flex flex-col gap-4 rounded-2xl border border-line bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)] max-[460px]:data-[in-view=true]:-translate-y-1 max-[460px]:data-[in-view=true]:border-ink max-[460px]:data-[in-view=true]:shadow-[0_24px_60px_-28px_rgba(31,31,31,0.18)]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mid max-[460px]:pr-12">{d.l}</div>
                {/* Icon disc: default flex-flow at >460px (stacks under the kicker),
                    absolute top-right + slightly smaller at <=460px. */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper max-[460px]:absolute max-[460px]:right-6 max-[460px]:top-6 max-[460px]:h-10 max-[460px]:w-10">{d.icon}</div>
                <h3 className="m-0 text-[22px] font-semibold leading-tight text-ink">{d.t}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-ink-2">{d.p}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="cs_spacer_lg" />
      </section>

      {/* 6. CONTRACT VEHICLES */}
      <section className="cv_section" data-section="vehicles">
        <div className="cs_spacer_lg" />
        <div className="container-ares">
          <div className="mb-12 grid items-end gap-8 md:grid-cols-2">
            <div>
              <h3 className="relative mb-4 inline-grid items-center gap-2.5 self-start text-[13px] font-medium uppercase tracking-[0.22em] text-paper/60 grid-cols-[auto_max-content_auto]">
                <span aria-hidden className="opacity-50">[</span>
                <span>SECTION 04 ·<br className="hidden max-[460px]:inline" /> CONTRACT VEHICLES</span>
                <span aria-hidden className="opacity-50">]</span>
              </h3>
              <h2 className="m-0 text-paper" style={{ fontSize: 'clamp(40px,4.6vw,64px)', fontWeight: 400, letterSpacing: '-0.05em', lineHeight: 0.95, textTransform: 'none' }}>
                How <em className="font-light italic text-light">to buy from us.</em>
              </h2>
            </div>
            <p className="text-right text-[14px] uppercase tracking-[0.14em] text-paper/60">↓ Pre-negotiated pricing<br />award without re-compete</p>
          </div>
          <div className="cv_grid" data-reveal="none">
            <div className="cv_card">
              <div className="cv_card_head">
                <div>
                  <span className="cv_card_kicker">Primary Vehicle</span>
                  <h3>GSA Multiple Award Schedule</h3>
                </div>
                <span className="pill_active">Active</span>
              </div>
              <div className="cv_meta">
                <div><div className="k">Contract Number</div><div className="v">47QSMS25D009Q</div></div>
                <div><div className="k">SIN</div><div className="v">561612 · Security Services</div></div>
                <div><div className="k">Schedule</div><div className="v">Multiple Award Schedule (MAS)</div></div>
                <div><div className="k">Period of Performance</div><div className="v">5-Year · Optional Extensions</div></div>
              </div>
              <div className="cv_actions">
                <a href={GSA_ELIB} target="_blank" rel="noopener noreferrer" className="btn btn-white">
                  View on GSA eLibrary
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8, verticalAlign: -2 }}><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
              </div>
            </div>

            <div className="cv_secondary">
              <h4>Additional Procurement Paths</h4>
              <ul>
                <li><span>Open Market · FAR 13</span><span>Available</span><i className="v_dot green" /></li>
                <li><span>BPAs &amp; IDIQs</span><span>On request</span><i className="v_dot amber" /></li>
                <li><span>State of Colorado Contracts</span><span>Available</span><i className="v_dot green" /></li>
                <li><span>Subcontracting to Primes</span><span>Available</span><i className="v_dot green" /></li>
              </ul>
              <p className="footnote"><b>Set-aside eligible: WOSB.</b> Contact us to confirm scope and pricing for any vehicle above.</p>
            </div>
          </div>
        </div>
        <div className="cs_spacer_lg" />
      </section>

      {/* 7. CERTIFICATIONS & CODES */}
      <section className="cc_section" data-section="certifications">
        <div className="cs_spacer_lg" />
        <div className="container-ares">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
            <div>
              <h3 className="relative mb-4 inline-grid items-center gap-2.5 self-start text-[13px] font-medium uppercase tracking-[0.22em] grid-cols-[auto_max-content_auto]" data-reveal="up">
                <span aria-hidden className="opacity-50">[</span>
                <span>SECTION 05 ·<br className="hidden max-[460px]:inline" /> CERTIFICATIONS &amp; CODES</span>
                <span aria-hidden className="opacity-50">]</span>
              </h3>
              <h2 className="text-display-lg text-ink" data-reveal="up">CREDENTIALS <span className="font-light italic text-mid">ON THE RECORD</span></h2>
            </div>
            <p className="text-right text-[14px] uppercase tracking-[0.14em] text-mid" data-reveal="right">↓ All data matches<br />SAM.gov registration</p>
          </div>

          <div className="cc_logos" data-scroll-active data-scroll-once data-in-view="false">
            <div className="cc_logo">
              <img src="/images/cert-gsa.png" alt="GSA Contract Holder" />
              <div>
                <div className="cc_logo_name">GSA Schedule Holder</div>
                <div className="cc_logo_id">#47QSMS25D009Q</div>
              </div>
            </div>
            <div className="cc_logo">
              <img src="/images/cert-wosb.png" alt="WOSB" style={{ maxHeight: 88 }} />
              <div>
                <div className="cc_logo_name">Woman-Owned Small Business</div>
                <div className="cc_logo_id">SBA · #WOSB250470</div>
              </div>
            </div>
            <div className="cc_logo">
              <img src="/images/cert-wbenc.png" alt="WBENC" />
              <div>
                <div className="cc_logo_name">WBENC Women's Business Enterprise</div>
                <div className="cc_logo_id">#WBE2303571</div>
              </div>
            </div>
            <div className="cc_logo">
              <img src="/images/cert-sba-footer.png" alt="SBA" style={{ maxHeight: 84, maxWidth: 160 }} />
              <div>
                <div className="cc_logo_name">SBA Small Business</div>
                <div className="cc_logo_id">SAM-Registered</div>
              </div>
            </div>
          </div>

          <div className="cc_codes">
            <div className="cc_codes_head">
              <h3>Full Code Listing</h3>
              <span className="lbl">Confirmed against SAM.gov</span>
            </div>
            <div className="cc_table">
              {CODES.map((c, i) => (
                <div key={i} className="cc_row">
                  <div className="k">{c.k}</div>
                  <div className="v">{c.v}{c.sub && <small>{c.sub}</small>}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="cs_spacer_lg" />
      </section>

      {/* 8. POINT OF CONTACT */}
      <section className="poc_section" data-section="poc">
        <div className="container-ares">
          <div className="poc_card" data-reveal="up">
            <div className="poc_grid">
              <div className="poc_lead">
                <h3 className="brackets-title mb-4 text-paper/65">POINT OF CONTACT</h3>
                <h3 className="poc_head">Schedule a briefing.<br /><em>We look forward to doing business with you.</em></h3>
                <p>For procurement timelines, capability statement copies, or scoped proposals — reach Ares leadership directly.</p>
              </div>
              <div>
                <div className="poc_person">
                  <div className="poc_avatar" aria-hidden="true" />
                  <div>
                    <div className="name">Ares Leadership Team</div>
                    <div className="title">Contract Administrator</div>
                  </div>
                </div>
                <div className="poc_details">
                  {POC.map((d) => (
                    <div key={d.k} className="poc_detail">
                      <span className="k">{d.k}</span>
                      <span className="v">{d.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER CTA */}
      <section className="cs_footcta" data-section="footcta">
        <div className="container-ares">
          <div className="cs_footcta_card" data-reveal="up">
            <div>
              <h3 className="brackets-title mb-3" style={{ fontSize: 11, letterSpacing: '0.22em', fontWeight: 600 }}>DOWNLOAD</h3>
              <h3 className="fct_head">Take this <em>capability statement</em> with you.</h3>
            </div>
            <div className="actions">
              <a href={PDF_URL} className="btn btn-primary max-w-full max-[460px]:px-5 max-[460px]:py-3 max-[460px]:text-[12px]" download>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8, verticalAlign: -3 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                {/* Long label on >460px, compact "Download PDF" on small mobile. */}
                <span className="max-[460px]:hidden">Download Capability Statement (PDF)</span>
                <span className="hidden max-[460px]:inline">Download PDF</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
