import { Link } from 'react-router-dom';
import LegalPage, { type GlanceRow, type LegalSection } from '../components/legal/LegalPage';

// Accessibility statement (2026-10-06). Every measure listed is one the site was built and
// checked against (DESIGN.md: AA contrast measured at the brightest point behind text on
// photos and glass, keyboard focus rings, reduced motion, labeled form fields with announced
// errors, reflow to 320px). No third-party audit yet; say so plainly.

const MAIL = 'contact@aressecurity.co';

const GLANCE: GlanceRow[] = [
  { label: 'Standard', value: 'Web Content Accessibility Guidelines (WCAG) 2.2, Level AA.' },
  { label: 'Status', value: 'We build and test the site against it. It has not had a third-party audit yet.' },
  { label: 'Known gaps', value: 'The capability statement PDF, and websites we link to.' },
  { label: 'Help', value: <>Email <a href={`mailto:${MAIL}`} className="ds-link">{MAIL}</a> or call <a href="tel:+17196963966" className="ds-link ds-data">719-696-3966</a>.</> },
];

const SECTIONS: LegalSection[] = [
  {
    id: 'commitment',
    title: 'Our commitment',
    body: (
      <p>
        Ares Security wants everyone, including people with disabilities, to be able to check
        our credentials, request a quote, and apply for work on this site. We aim to meet the
        Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA.
      </p>
    ),
  },
  {
    id: 'measures',
    title: 'What we have done',
    body: (
      <ul>
        <li>
          <strong>Contrast.</strong> Text meets AA contrast. Where text sits over photographs or
          frosted panels, we measure it against the brightest point behind it.
        </li>
        <li>
          <strong>Keyboard.</strong> Every link, button, card, and form field works with a
          keyboard and shows a visible focus ring.
        </li>
        <li>
          <strong>Motion.</strong> If your device is set to reduce motion, scroll effects and
          ambient animations stop. Text is never hidden by an animation.
        </li>
        <li>
          <strong>Structure.</strong> Each page has one main heading and an ordered outline,
          landmarks for navigation, and text alternatives for meaningful images. Decorative
          images are hidden from screen readers.
        </li>
        <li>
          <strong>Forms.</strong> Every field on the quote form has a visible label. Errors are
          explained in text, and the form’s status is announced to screen readers.
        </li>
        <li>
          <strong>Layout.</strong> Pages reflow to a single column down to 320 pixels wide and
          remain usable when zoomed.
        </li>
      </ul>
    ),
  },
  {
    id: 'limitations',
    title: 'Known limitations',
    body: (
      <ul>
        <li>
          <strong>The capability statement PDF</strong> may not be fully accessible to screen
          readers. Everything in it is also on the{' '}
          <Link to="/capability-statement" className="ds-link">Capability Statement</Link> page,
          and we can send it in another format on request.
        </li>
        <li>
          <strong>Other websites</strong> we link to, such as SAM.gov, GSA eLibrary, city license
          records, LinkedIn, and Indeed, are outside our control.
        </li>
      </ul>
    ),
  },
  {
    id: 'compatibility',
    title: 'Compatibility',
    body: (
      <p>
        The site is built with standard HTML, CSS, and JavaScript to work in current versions of
        Chrome, Safari, Firefox, and Edge, on desktop and mobile, and with assistive technologies
        that follow web standards.
      </p>
    ),
  },
  {
    id: 'assessment',
    title: 'How we check',
    body: (
      <p>
        The team building the site evaluates it ourselves: measured contrast checks, keyboard
        walkthroughs, reduced-motion checks, and automated checks on every page. We review this
        statement whenever the site changes in a significant way.
      </p>
    ),
  },
  {
    id: 'feedback',
    title: 'Feedback and other formats',
    body: (
      <>
        <p>
          If anything on the site is hard to use, please tell us the page and what you were
          trying to do. We will get you the information another way, by email or by phone, and
          work to fix the problem.
        </p>
        <p>
          Email{' '}
          <a href={`mailto:${MAIL}?subject=${encodeURIComponent('Accessibility')}`} className="ds-link">{MAIL}</a>{' '}
          or call <a href="tel:+17196963966" className="ds-link ds-data">719-696-3966</a>.
        </p>
      </>
    ),
  },
];

export default function Accessibility() {
  return (
    <LegalPage
      path="/accessibility"
      title="Accessibility."
      effective="October 6, 2026"
      intro={<p>The standard we build this site to, what we have done to meet it, where it falls short, and how to reach us if something gets in your way.</p>}
      glance={GLANCE}
      sections={SECTIONS}
    />
  );
}
