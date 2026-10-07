// 02 Quality (owner, 2026-10-06: moved from About and set for Home): the principle as a
// large statement, then what it shapes, in the paragraph's own three parts. Every line is a
// fact already on the site.
const PARTS = [
  {
    title: 'Who we hire',
    line: 'Licensed, background-checked officers, with veteran supervisors and a veteran NRA firearms instructor.',
  },
  {
    title: 'How we train',
    line: 'On the post itself, by a member of our leadership who has worked it, before the first shift.',
  },
  {
    title: 'What they carry',
    line: 'Written post orders, checkpoint logs you can audit, and on-call coverage in every contract.',
  },
];

export default function Quality() {
  return (
    <section id="quality" className="ds-quality" aria-labelledby="quality-title">
      <div className="ds-quality-head">
        <h2 id="quality-title" className="ds-display-xl">
          Quality over quantity.
        </h2>
        <p className="ds-lead">
          We would rather staff fewer posts well than many posts thinly. That choice shapes
          everyone we hire, the training they get, and the standards they carry onto every site.
        </p>
      </div>
      <ul className="ds-quality-parts">
        {PARTS.map((p) => (
          <li key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
