import type { Insight } from '../market/insights';

// Small facts derived from an article (2026-11-19): reading time, heading anchors, and the
// articles to read next.

/** Minutes to read at about 230 words a minute, counting the body and the questions. */
export function readingMinutes(a: Insight): number {
  const text = [
    ...a.body.map((b) => ('p' in b ? b.p : 'h' in b ? b.h : 'list' in b ? b.list.join(' ') : '')),
    ...(a.faq ?? []).map((f) => `${f.q} ${f.a}`),
  ].join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 230));
}

/** A stable anchor for a heading: "Who writes it" -> "who-writes-it". */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[’'"“”]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** The article's sections, for its table of contents. */
export function headings(a: Insight): { id: string; title: string }[] {
  return a.body.flatMap((b) => ('h' in b ? [{ id: headingId(b.h), title: b.h }] : []));
}

/** What to read next: the same topic first, then the newest others. */
export function readNext(a: Insight, all: Insight[], n = 3): Insight[] {
  const rest = all.filter((i) => i.slug !== a.slug);
  return [...rest.filter((i) => i.category === a.category), ...rest.filter((i) => i.category !== a.category)].slice(0, n);
}
