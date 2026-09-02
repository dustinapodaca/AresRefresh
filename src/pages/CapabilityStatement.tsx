import { Link } from 'react-router-dom';
import { useScrollInViewObserver } from '../hooks/useScrollInViewObserver';

// ---- Data ----
const CAPS = [
  { t: 'Armed Physical Security', p: 'Licensed, firearms-qualified officers for fixed posts in cash-handling, regulated, and high-liability environments — insurable risk reduction.', keys: ['Armed', 'Cash-Handling', 'Regulated'] },
  { t: 'Unarmed Physical Security', p: 'Uniformed and plainclothes officers providing visible deterrence, lobby coverage, and access oversight for facilities and campuses, 24/7.', keys: ['Uniformed', 'Lobby / Campus', '24/7'] },
  { t: 'Patrol Services', p: 'Foot and mobile patrol with documented checkpoints and auditable logs across single sites and multi-property portfolios.', keys: ['Foot Patrol', 'Mobile Patrol', 'Checkpoint Logs'] },
  { t: 'Access Control', p: 'Entry screening, credential verification, visitor management, and perimeter control for facilities, sites, and critical infrastructure.', keys: ['Screening', 'Credentialing', 'Perimeter'] },
  { t: 'Patrol Vehicle Security', p: 'Marked-vehicle patrol, alarm response, and after-hours property checks with GPS-verified routes and time-stamped reporting.', keys: ['Marked Vehicle', 'Alarm Response', 'GPS-Verified'] },
  { t: 'Event & Emergency Response', p: 'Crowd management, incident response, and emergency coordination for events, institutions, and community venues — a calm, trained presence.', keys: ['Crowd Management', 'Incident Response', 'Events'] },
];

const DIFFS = [
  { l: '01 · METHODOLOGY', t: 'Four-Stage Deployment Process', p: 'Technical Audit → Compliance Mapping → Guard Training → Deployment. Repeatable, documented, and audit-ready on day one. Every officer trained on-post by leadership before their first shift.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg> },
  { l: '02 · TEAM', t: 'Cleared, Licensed, Veteran-Led', p: 'DoW-vetted personnel including TS/SCI-cleared escort officers at Buckley SFB. State licensing and firearms qualifications current at time of post — no liability gaps. Leadership cadence drawn from military discipline.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { l: '03 · DOCUMENTATION', t: 'Technical Submittals to Federal Standard', p: 'Proposals, post orders, briefings, and reporting built for contracting officers — not boilerplate. WOSB & WBE certified, GSA Schedule holder, SAM-registered through March 2027. Audit-ready records on request.',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 10h18M8 14h4"/></svg> },
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

const PDF_URL ='/files/Ares-Security-Capability-Statement-2026.pdf';
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
@media (max-width:900px){.qf_bar{grid-template-columns:repeat(2,1fr)}.qf_item{padding:22px 20px}.qf_item:first-child,.qf_item:nth-child(odd){border-left:0}.qf_item:nth-child(3),.qf_item:nth-child(4){border-top:1px solid var(--color-line)}.qf_item.qf_emphasis{border-right:0}}

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

.cv_section{background:var(--color-ink);color:var(--color-paper);position:relative;overflow:hidden;isolation:isolate}
.cv_section::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:-1;background:radial-gradient(ellipse at 90% 10%,rgba(124,120,118,.22),transparent 60%)}
.cv_grid{display:grid;grid-template-columns:1.4fr 1fr;gap:32px;align-items:stretch}
@media (max-width:900px){.cv_grid{grid-template-columns:1fr}}
.cv_card{position:relative;background:rgba(255,255,255,.06);border-radius:20px;padding:36px;-webkit-backdrop-filter:blur(20px) saturate(140%);backdrop-filter:blur(20px) saturate(140%);display:flex;flex-direction:column;gap:20px;min-width:0;overflow:hidden}
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
.cv_secondary{position:relative;background:rgba(255,255,255,.04);border-radius:20px;padding:28px;display:flex;flex-direction:column;gap:14px;justify-content:center;min-height:100%}
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

.cs_footcta{position:relative;padding:0 0 100px;background:var(--color-paper-2)}
.cs_footcta_card{position:relative;border-radius:24px;overflow:hidden;background:var(--color-paper);border:1px solid var(--color-line);padding:40px 56px;display:flex;align-items:center;justify-content:space-between;gap:48px;flex-wrap:wrap}
.cs_footcta_card .fct_head{font-size:clamp(26px,3vw,38px);font-weight:400;letter-spacing:-.05em;line-height:1.05;color:var(--color-ink);margin:0;text-transform:none}
.cs_footcta_card .fct_head em{font-style:italic;font-weight:300;color:var(--color-mid)}
.cs_footcta_card .actions{display:flex;flex-wrap:wrap;gap:14px;align-items:center;flex-shrink:0}
@media (max-width:768px){.cs_footcta_card{padding:32px;gap:20px}}
@media (max-width:640px){.cs_footcta_card{padding:24px 20px;gap:16px}.cs_footcta_card .actions{width:100%}.cs_footcta_card .actions .btn{width:100%;justify-content:center;padding:14px 18px;font-size:11px;letter-spacing:.06em}}

.cs_spacer_lg{height:100px}
.cs_spacer_md{height:70px}
.cs_spacer_sm{height:64px}
@media (max-width:991px){.cs_spacer_lg{height:70px}.cs_spacer_md{height:50px}.cs_spacer_sm{height:50px}}

/* Section 04 status-dot pulse — fires once when each subcard scrolls
   into view. .cv_card and .cv_secondary carry their OWN data-reveal
   markers (instead of one on cv_grid) so mobile, where the secondary
   list stacks below the primary card, doesn't fire its pulses early
   while it's still off-screen. The observer flips data-revealed="true"
   on each card independently when that card reaches the viewport.
   Three keyframes: a plain green pulse for the .pill_active dot which
   has no resting ring, and ring-preserving variants for the
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
.cv_card[data-revealed="true"] .pill_active::before { animation: cs_pulse_green 1.4s ease-out; }
.cv_secondary[data-revealed="true"] .v_dot.green { animation: cs_pulse_vdot_green 1.4s ease-out; }
.cv_secondary[data-revealed="true"] .v_dot.amber { animation: cs_pulse_vdot_amber 1.4s ease-out; }
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
            Colorado-based security guard and patrol services for commercial clients, agencies, and prime contractors.<br /><b className="cs_hero_creds">GSA Schedule holder · SAM-registered · WOSB &amp; WBE certified.</b>
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
              <h2
                className="text-ink"
                style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: 400, letterSpacing: '-0.06em', lineHeight: 0.92, textTransform: 'none' }}
                data-reveal="up"
              >
                Core <span className="font-light italic text-mid">Competencies</span>
              </h2>
            </div>
          </div>
          <div className="cs_cap_grid">
            {CAPS.map((c) => (
              <article key={c.t} data-scroll-active data-in-view="false" className="cs_cap_item">
                <h3 className="cs_cap_title">{c.t}</h3>
                <p className="cs_cap_body">{c.p}</p>
                <div className="cs_cap_keys">{c.keys.map((k) => <span key={k}>{k}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
        <div className="cs_spacer_lg" />
      </section>

      {/* 4. DIFFERENTIATORS */}
      <section className="bg-[#E5E4E1]" data-section="differentiators">
        <div className="cs_spacer_lg" />
        <div className="container-ares">
          <div className="mb-12">
            <h2
              className="text-ink"
              style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: 400, letterSpacing: '-0.06em', lineHeight: 0.92, textTransform: 'none' }}
              data-reveal="up"
            >
              Why <span className="font-light italic text-mid">Ares</span>
            </h2>
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

      {/* 5. CONTRACT VEHICLES */}
      <section className="cv_section" data-section="vehicles">
        <div className="cs_spacer_lg" />
        <div className="container-ares">
          <div className="mb-12 grid items-end gap-8 md:grid-cols-2">
            <div>
              <h2 className="m-0 text-paper" style={{ fontSize: 'clamp(40px,4.6vw,64px)', fontWeight: 400, letterSpacing: '-0.05em', lineHeight: 0.95, textTransform: 'none' }}>
                How{' '}
                <em
                  className="font-light italic text-light"
                  style={{ marginLeft: '-0.06em' }}
                >
                  To Buy<br className="md:hidden" /> From Us
                </em>
              </h2>
            </div>
            <p className="text-right text-[14px] uppercase tracking-[0.14em] text-paper/60">↓ Pre-negotiated pricing<br />award without re-compete</p>
          </div>
          <div className="cv_grid">
            <div className="cv_card" data-reveal="none">
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

            <div className="cv_secondary" data-reveal="none">
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

      {/* 6. CERTIFICATIONS & CODES */}
      <section className="cc_section" data-section="certifications">
        <div className="cs_spacer_lg" />
        <div className="container-ares">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
            <div>
              <h2
                className="text-ink"
                style={{ fontSize: 'clamp(40px, 6vw, 60px)', fontWeight: 400, letterSpacing: '-0.06em', lineHeight: 0.92, textTransform: 'none' }}
                data-reveal="up"
              >
                Credentials <span className="font-light italic text-mid">On The Record</span>
              </h2>
            </div>
            <p className="text-right text-[14px] uppercase tracking-[0.14em] text-mid" data-reveal="right">↓ All data matches<br />SAM.gov registration</p>
          </div>

          <div className="cc_logos" data-scroll-active data-scroll-once data-in-view="false">
            <div className="cc_logo">
              <img src="/images/cert-gsa-blue.png" alt="GSA Contract Holder" />
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

      {/* 7. FOOTER CTA */}
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
