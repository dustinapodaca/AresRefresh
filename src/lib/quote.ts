// One quote request, read once from the form and shaped for email (2026-10-09). Contact.tsx
// sends it to Web3Forms with toWeb3Forms(); every label and value is already readable, and
// empty answers are dropped.

export type Quote = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  officers: string;
  schedule: string;
  start: string;
  siteType: string;
  message: string;
  heardAbout: string;
};

/** US numbers as (719) 821-1389, a leading 1 dropped; anything else left as typed. */
export function formatPhone(raw: string): string {
  const trimmed = raw.trim();
  let d = trimmed.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  if (d.length !== 10) return trimmed;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function subjectFor(q: Quote): string {
  return `Quote request: ${q.service}${q.location ? ` · ${q.location}` : ''}`;
}

export function senderFor(q: Quote): string {
  return q.organization ? `${q.name} (${q.organization})` : q.name;
}

/** The rows of the email, in reading order, empty answers left out. */
export function rowsFor(q: Quote): [string, string][] {
  const rows: [string, string][] = [
    ['Name', q.name],
    ['Organization', q.organization],
    ['Email', q.email],
    ['Phone', q.phone],
    ['Service', q.service],
    ['Site location', q.location],
    ['Officers on post', q.officers],
    ['Schedule', q.schedule],
    ['Start', q.start],
    ['Site type', q.siteType],
    ['Message', q.message],
    ['Heard about us', q.heardAbout],
  ];
  return rows.filter(([, v]) => v !== '');
}

/**
 * Web3Forms shows each key as a label, in the order added. `email` also sets the reply-to,
 * so no replyTo field is sent. The honeypot is checked in Contact.tsx before this is called;
 * an empty `botcheck` is not sent, so Web3Forms' own check can never misread it.
 */
export function toWeb3Forms(q: Quote, accessKey: string): FormData {
  const fd = new FormData();
  fd.append('access_key', accessKey);
  fd.append('subject', subjectFor(q));
  fd.append('from_name', senderFor(q));
  for (const [label, value] of rowsFor(q)) fd.append(label === 'Email' ? 'email' : label, value);
  return fd;
}
