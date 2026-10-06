import { Link } from 'react-router-dom';
import LegalPage, { type GlanceRow, type LegalSection } from '../components/legal/LegalPage';

// Terms of use for the website (2026-10-06). Services themselves are governed by signed
// agreements, not by these terms. Owner to review with counsel.

const MAIL = 'contact@aressecurity.co';

const GLANCE: GlanceRow[] = [
  { label: 'What these cover', value: 'Your use of aressecurity.co and the information on it.' },
  { label: 'Quotes and services', value: 'A quote request is not a contract. Services are provided only under a signed agreement.' },
  { label: 'Our content', value: 'Owned by Ares or used with permission. Share our capability statement freely for procurement.' },
  { label: 'Governing law', value: 'Colorado.' },
];

const SECTIONS: LegalSection[] = [
  {
    id: 'agreement',
    title: 'Using this site',
    body: (
      <p>
        These terms apply to aressecurity.co, run by Ares Security LLC (“Ares,” “we,” “us”). By
        using the site, you agree to them. If you do not agree, please do not use the site.
      </p>
    ),
  },
  {
    id: 'information',
    title: 'The information on this site',
    body: (
      <>
        <p>
          The site gives general information about Ares and our services. We work to keep it
          accurate and current, including our licenses, registrations, and certifications, and
          we link to public records where you can check them. It is not an offer, a guarantee,
          or a contract, and it is not legal or professional advice.
        </p>
        <p>If something looks out of date, please tell us.</p>
      </>
    ),
  },
  {
    id: 'services',
    title: 'Quotes, proposals, and services',
    body: (
      <>
        <p>
          Requesting a quote or calling us does not create a contract or an obligation for
          either side. We provide security services only under a written agreement signed by
          both parties, and that agreement governs the work, pricing, and responsibilities.
        </p>
        <p>
          Orders placed under our GSA Multiple Award Schedule contract (47QSMS25D009Q) follow the
          terms of that contract.
        </p>
      </>
    ),
  },
  {
    id: 'careers',
    title: 'Job listings and applications',
    body: (
      <p>
        Job listings describe roles we are hiring for and may change or close at any time.
        Applying does not guarantee an interview or a job. Employment depends on the licensing,
        background checks, and other requirements of the role and the law.
      </p>
    ),
  },
  {
    id: 'use',
    title: 'Acceptable use',
    body: (
      <>
        <p>When you use the site, please do not:</p>
        <ul>
          <li>use it for anything unlawful, or to harass or deceive anyone;</li>
          <li>send false information, or someone else’s information without their permission;</li>
          <li>try to break, overload, or get around the site’s security;</li>
          <li>send malware, spam, or automated form submissions;</li>
          <li>copy the site’s content in bulk or present it as your own.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'content',
    title: 'Our content and marks',
    body: (
      <>
        <p>
          The site’s text, design, photographs, logo, and capability statement belong to Ares or
          are used with permission. You may view and share them for personal use or to evaluate
          Ares as a vendor. Sharing our capability statement with your procurement team is
          welcome. Any other use needs our written permission.
        </p>
        <p>
          Certification and agency marks, such as those of GSA, the SBA, and WBENC, belong to
          their owners. We show them to indicate our status, not to suggest endorsement.
        </p>
      </>
    ),
  },
  {
    id: 'links',
    title: 'Links to other sites',
    body: (
      <p>
        We link to other websites, such as SAM.gov, GSA eLibrary, city license records,
        LinkedIn, and Indeed, so you can verify or learn more. We do not control those sites
        and are not responsible for their content or practices.
      </p>
    ),
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    body: (
      <p>
        The site is provided “as is” and “as available.” To the fullest extent the law allows,
        we disclaim all warranties about the site, including that it will always be available,
        error free, or free of harmful components.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <p>
        To the fullest extent the law allows, Ares is not liable for any indirect, incidental,
        or consequential damages arising from your use of the site. This does not limit any
        rights or obligations under a signed services agreement.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of the State of Colorado, without regard to its
        conflict of law rules. Any dispute about the site will be heard in the state or federal
        courts located in Colorado.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    body: (
      <p>
        We may update these terms. The new version takes effect when we post it here with a new
        effective date.
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
        <Link to="/privacy" className="ds-link">privacy policy</Link>.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <LegalPage
      path="/terms"
      title="Terms of use."
      effective="October 6, 2026"
      intro={<p>The terms for using this website. Our security services are covered by their own signed agreements.</p>}
      glance={GLANCE}
      sections={SECTIONS}
    />
  );
}
