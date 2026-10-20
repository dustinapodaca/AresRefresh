import { Link } from 'react-router-dom';
import Arrow from '../Arrow';
import { RevealHeading, RevealLead } from './Reveal';

export default function Careers() {
  return (
    <section id="careers" className="ds-careers" aria-labelledby="careers-title">
      <div className="ds-careers-grid">
        <div className="ds-careers-copy">
          {/* Copy audit (2026-10-10): was "Join the people who staff them." */}
          <RevealHeading id="careers-title" className="ds-display-lg">
            Now hiring armed and unarmed officers.
          </RevealHeading>
          <RevealLead className="ds-body">
            {'Training for your city license, schedules posted ahead, and a supervisor who answers. Veterans encouraged to apply.'}
          </RevealLead>
          <Link to="/careers" className="ds-link">
            See open roles
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
