// Phones: scroll an opened card to just under the fixed nav and running head, one grid
// row gap below them, so the card before it ends exactly at the running head's bottom
// edge and none of it shows. Measured live rather than from scroll-margin, which is
// set for anchor jumps and leaves the card above peeking through.
export function glideUnderHeads(card: HTMLElement) {
  const head = document.querySelector<HTMLElement>('.ds-runhead');
  const nav = document.querySelector<HTMLElement>('header');
  const heads =
    head && getComputedStyle(head).display !== 'none'
      ? parseFloat(getComputedStyle(head).top) + head.offsetHeight
      : (nav?.offsetHeight ?? 0);
  const grid = card.parentElement;
  const gap = grid ? parseFloat(getComputedStyle(grid).rowGap) || 0 : 0;
  // Round up to the next device pixel: the card above then ends at or behind the head,
  // never a subpixel sliver below it.
  const dpr = window.devicePixelRatio || 1;
  const target = window.scrollY + card.getBoundingClientRect().top - heads - gap;
  window.scrollTo({ top: Math.ceil(target * dpr) / dpr, behavior: 'instant' as ScrollBehavior });
}
