import { useEffect, useState } from 'react';

// The current section is the last one whose top has passed 30% of the viewport, or the
// last section once the footer is in view.
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Short closing sections never reach the line; at the page's end, the last one is current.
      const end = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const footer = document.querySelector('.ds-footer');
      const docEnd = footer ? footer.getBoundingClientRect().top <= window.innerHeight : false;
      if (end || docEnd) current = ids[ids.length - 1];
      setActive((a) => (a === current ? a : current));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);
  return active;
}
