const STEPS = [
  {
    title: 'Plan the site before anything is signed.',
    body: 'We take the time to fully understand your site, operations, and risks before anything is signed. This upfront work prevents surprises and delivers a solution that actually fits the way your facility runs.',
  },
  {
    title: 'Write it down precisely.',
    body: 'Our proposals, post orders, and documentation are consistently praised for their clarity and detail. We treat every deliverable with the same care our clients expect from top-tier technical submittals.',
  },
  {
    title: 'Keep you informed.',
    body: 'You’ll always know what’s happening. We provide timely updates, direct access to the team managing your account, and professional reporting that keeps everyone aligned.',
  },
  {
    title: 'Train every officer on the post itself.',
    body: 'Every guard receives hands-on, site-specific training from a member of our leadership team who has personally worked that exact post. Your protection is prepared from the very first shift.',
  },
];

export default function Staffing() {
  return (
    <section id="staffing" className="ds-staffing" aria-labelledby="staffing-title">
      <div className="ds-staffing-intro">
        <h2 id="staffing-title" className="ds-display-lg">
          How we staff a post.
        </h2>
        <p className="ds-lead">
          Preparation like that is a routine, not a one-off. It runs the same way on every site
          we staff.
        </p>
      </div>

      <div className="ds-staffing-body">
        {/* Pinned on desktop while the four steps scroll past. */}
        <div className="ds-staffing-media">
          <figure className="ds-plate">
            <img
              src="/images/backbone-officer.jpg"
              alt="Smiling Ares Security officer in a black Ares Security polo shirt, standing against a brick wall"
              width={733}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        {/* Below 1024px the steps become a swipe row; the bar fills as it scrolls. */}
        <div className="ds-steps-wrap">
        <ol className="ds-steps" tabIndex={0} aria-label="Four habits">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="ds-data ds-step-n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="ds-title">{s.title}</h3>
              <p className="ds-body">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="ds-steps-meta" aria-hidden="true">
          <span className="ds-steps-bar"><span /></span>
          <span className="ds-data">Swipe</span>
        </div>
        </div>
      </div>
    </section>
  );
}
