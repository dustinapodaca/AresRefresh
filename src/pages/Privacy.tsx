import { Link } from 'react-router-dom';
import LegalPage, { type GlanceRow, type LegalSection } from '../components/legal/LegalPage';

// Privacy policy. Written from what the site actually does (2026-10-06): no analytics, no
// ad trackers, no cookies of its own; the quote form is delivered by Web3Forms; the site is
// hosted on Netlify; the typefaces load from Google Fonts. Owner to review with counsel.

const MAIL = 'contact@aressecurity.co';

const GLANCE: GlanceRow[] = [
  { label: 'What we collect', value: 'What you send us through the quote form, by email, or by phone, plus standard server logs.' },
  { label: 'Why', value: 'To reply, prepare quotes and proposals, review job applications, and keep the site running and secure.' },
  { label: 'Who handles it for us', value: 'Web3Forms delivers the quote form, Netlify hosts the site, and Google Fonts serves the typefaces.' },
  { label: 'Selling and advertising', value: 'We do not sell personal information or use it for advertising.' },
  { label: 'Cookies and tracking', value: 'The site sets no cookies of its own and runs no analytics or advertising trackers.' },
  { label: 'Your choices', value: <>Ask us to see, correct, or delete what you sent: <a href={`mailto:${MAIL}`} className="ds-link">{MAIL}</a></> },
];

const SECTIONS: LegalSection[] = [
  {
    id: 'scope',
    title: 'Who we are and what this covers',
    body: (
      <>
        <p>
          Ares Security LLC (“Ares,” “we,” “us”) provides armed and unarmed security officers
          from Colorado Springs, Colorado. This policy explains how we handle personal
          information you share with us through aressecurity.co, by email, or by phone.
        </p>
        <p>
          It does not cover information we handle while providing services under a contract,
          such as post orders, site logs, or visitor records. The contract with the client
          governs that information.
        </p>
      </>
    ),
  },
  {
    id: 'collect',
    title: 'Information we collect',
    body: (
      <>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Quote requests.</strong> The kind of coverage you need, details about your
            site, your message, your name and email address, and, if you choose to give them,
            your organization and phone number.
          </li>
          <li>
            <strong>Email and phone.</strong> Whatever you include when you write to us or call.
          </li>
          <li>
            <strong>Job applications.</strong> Your résumé and anything else you send to our
            careers address.
          </li>
        </ul>
        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Server logs.</strong> Our hosting provider records standard technical data
            when you visit, such as your IP address, browser type, the pages requested, and the
            date and time.
          </li>
          <li>
            <strong>Fonts.</strong> The site loads its typefaces from Google Fonts, so Google
            receives your IP address and browser details when a page loads.
          </li>
        </ul>
        <p>
          Please do not send sensitive information, such as Social Security numbers or medical
          details, through the quote form or by email.
        </p>
      </>
    ),
  },
  {
    id: 'use',
    title: 'How we use it',
    body: (
      <ul>
        <li>To answer your questions and prepare quotes, proposals, and site assessments.</li>
        <li>To provide and manage the services you contract with us for.</li>
        <li>To review job applications and contact applicants.</li>
        <li>To operate, secure, and fix the website.</li>
        <li>To meet legal, licensing, and contracting obligations.</li>
      </ul>
    ),
  },
  {
    id: 'share',
    title: 'How we share it',
    body: (
      <>
        <p>We share personal information only as described here:</p>
        <ul>
          <li>
            <strong>Service providers</strong> that work for us: Web3Forms, which delivers quote
            form submissions to our inbox; Netlify, which hosts the site; Google, which serves the
            fonts; and our email provider. They may use the information only to provide their
            service.
          </li>
          <li>
            <strong>Legal reasons</strong>, when the law requires it or to protect the rights,
            property, or safety of Ares, our clients, our officers, or others.
          </li>
          <li>
            <strong>Business transfers</strong>, if Ares is involved in a merger, acquisition,
            or sale of assets.
          </li>
        </ul>
        <p>We do not sell personal information or share it for targeted advertising.</p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and tracking',
    body: (
      <p>
        The site sets no cookies of its own and runs no analytics, advertising, or social media
        tracking. The service providers above process technical data as their own policies
        describe:{' '}
        <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer" className="ds-link">Web3Forms</a>,{' '}
        <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="ds-link">Netlify</a>, and{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="ds-link">Google</a>.
      </p>
    ),
  },
  {
    id: 'links',
    title: 'Other websites',
    body: (
      <p>
        The site links to other websites, such as SAM.gov, GSA eLibrary, city license records,
        LinkedIn, Indeed, and Google. Their own privacy policies apply when you visit them.
      </p>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    body: (
      <p>
        We keep personal information as long as we need it for the purpose you gave it to us
        for, such as answering a request, running a contract, or keeping business records the
        law requires. After that we delete it.
      </p>
    ),
  },
  {
    id: 'security',
    title: 'How we protect it',
    body: (
      <p>
        The site is served only over an encrypted connection (HTTPS), and we limit who at Ares
        can see what you send us. No method of transmission or storage is completely secure,
        so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: 'rights',
    title: 'Your choices and rights',
    body: (
      <>
        <p>
          You can ask us to tell you what personal information we hold about you, to correct
          it, or to delete it. Colorado residents may have further rights under the Colorado
          Privacy Act where it applies. We may need to confirm your identity before we act on a
          request, and we will not treat you differently for making one.
        </p>
        <p>
          To make a request, email{' '}
          <a href={`mailto:${MAIL}?subject=${encodeURIComponent('Privacy request')}`} className="ds-link">{MAIL}</a>{' '}
          with “Privacy request” in the subject line.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        The site is not meant for children under 13, and we do not knowingly collect their
        personal information. If you believe a child has sent us information, contact us and we
        will delete it.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <p>
        If we change this policy, we will post the new version here and update the effective
        date at the top of the page.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Ares Security LLC, Colorado Springs, CO 80906.{' '}
        <a href={`mailto:${MAIL}`} className="ds-link">{MAIL}</a> or{' '}
        <a href="tel:+17196963966" className="ds-link ds-data">719-696-3966</a>. See also our{' '}
        <Link to="/terms" className="ds-link">terms of use</Link>.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalPage
      path="/privacy"
      title="Privacy policy."
      effective="October 6, 2026"
      intro={<p>What we collect when you use this site or contact us, why, and what you can ask us to do with it.</p>}
      glance={GLANCE}
      sections={SECTIONS}
    />
  );
}
