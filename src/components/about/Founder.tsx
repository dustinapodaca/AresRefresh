
// "Why Ares exists." (copy audit: About had no founder section; owner, 2026-10-10). Second pass
// after Slash, Flora, and Resend on Mobbin: the letter (owner, 2026-10-10), the story set large in
// two tones (Flora). The note form (/about?founder=note) was removed at launch (owner, 2026-10-19;
// tag options-archive-2026-10-19, docs/options-archive.md). Since 2026-10-23 (owner) it speaks in
// company voice, not as Deidre's own story, and carries no signature (portrait, name, role).
const STORY = {
  story: 'Ares was built from inside the guard business. Before 2021, our leadership ran operations, HR and scheduling at another Colorado security company, and worked alongside several more. The same things were missing at every one: structure, oversight, and the human element. Officers were sent to posts they had never seen, schedules were patched day to day, and managers went from one fire to the next. Clients and officers paid for it.',
  // The one line in ink; the rest of the story is muted (owner, 2026-10-19).
  close: 'Ares was founded to fix it from the top down.',
};

export default function Founder() {
  return (
    <section id="founder" className="ds-founder" data-form="letter" aria-labelledby="founder-title">
      <h2 id="founder-title" className="ds-display-lg">Why Ares exists.</h2>
      <div className="ds-founder-letter">
        <p className="ds-founder-story">
          {STORY.story} <span>{STORY.close}</span>
        </p>
      </div>
    </section>
  );
}
