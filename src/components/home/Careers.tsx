import { Link } from 'react-router-dom';
import Arrow from '../Arrow';

export default function Careers() {
  return (
    <section id="careers" className="ds-careers" aria-labelledby="careers-title">
      <div className="ds-careers-grid">
        <div className="ds-careers-copy">
          {/* Copy audit (2026-10-10): was "Join the people who staff them." */}
          <h2 id="careers-title" className="ds-display-lg">
            Now hiring armed and unarmed officers.
          </h2>
          <p className="ds-body">
            Paid training, schedules posted ahead, and a supervisor who answers. Veterans
            encouraged to apply.
          </p>
          <Link to="/careers" className="ds-link">
            See open roles
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
