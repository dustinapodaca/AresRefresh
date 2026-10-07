import { Link } from 'react-router-dom';
import Arrow from '../Arrow';

export default function Careers() {
  return (
    <section id="careers" className="ds-careers" aria-labelledby="careers-title">
      <div className="ds-careers-grid">
        <div className="ds-careers-copy">
          <h2 id="careers-title" className="ds-display-lg">
            Join the people who staff them.
          </h2>
          <p className="ds-body">
            We hire armed and unarmed officers, with paid training. Our supervisors include veterans, and our NRA firearms instructor is a
            veteran. Veterans are encouraged to apply.
          </p>
          <Link to="/careers" className="ds-link">
            See open roles
            <Arrow />
          </Link>
        </div>
      </div>
      <p className="ds-lead ds-handoff">For federal buyers, the contract vehicle is already in place.</p>
    </section>
  );
}
