// Hero headlines carry no closing period (owner, 2026-10-10: tried with the Capability
// Statement, so every H1 drops it). Data keeps its sentences; this trims at the H1 only.
export const heroTitle = (s: string) => s.replace(/\.\s*$/, '');
