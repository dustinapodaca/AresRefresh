import { motion, MotionConfig, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';

// Swipe card stack (owner, 2026-10-22), adapted from the 21st.dev "image-stack-carousel" for this
// Vite + React site: no next/image (cards carry their own content, so pages can use responsive()
// images and real copy), a controllable order so outside buttons can step the stack, a click
// guard so a drag never fires the link it started on, and horizontal-only dragging on touch so a
// finger on the card can still scroll the page up and down. Reduced motion follows the reader's
// setting (MotionConfig reducedMotion="user").

export const defaultSettings = {
  width: 320, // card width in px
  height: 320, // card height in px
  radius: 4, // corner roundness in px (the site's photo corners)
  swipeThreshold: 90, // how far a drag must go before the card goes to the back
  stackRotation: 4, // degrees each card behind the front tilts
  stackScale: 0.04, // how much smaller each card behind the front gets
  tiltStrength: 18, // how far the card turns while dragging (3D)
  springStiffness: 300,
  springDamping: 30,
  visible: 4, // how many cards show in the pile
};

export type SwipeCardsSettings = typeof defaultSettings;

export interface SwipeCardItem {
  id: string | number;
  content: ReactNode;
}

interface SwipeCardProps {
  children: ReactNode;
  isFront: boolean;
  zIndex: number;
  onSendToBack: () => void;
  settings: SwipeCardsSettings;
}

function SwipeCard({ children, isFront, zIndex, onSendToBack, settings }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 200], [-settings.tiltStrength, settings.tiltStrength]);
  const rotateZ = useTransform(x, [-200, 200], [-6, 6]);
  const dragged = useRef(false);

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    // A fast flick counts as a swipe even if it is short.
    if (Math.abs(info.offset.x) > settings.swipeThreshold || Math.abs(info.velocity.x) > 600) onSendToBack();
    else x.set(0);
    requestAnimationFrame(() => (dragged.current = false));
  }

  return (
    <motion.div
      className="absolute inset-0 select-none"
      style={{
        x: isFront ? x : 0,
        rotateY: isFront ? rotateY : 0,
        rotateZ: isFront ? rotateZ : 0,
        zIndex,
        cursor: isFront ? 'grab' : 'default',
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragStart={() => (dragged.current = true)}
      onDragEnd={handleDragEnd}
      onClickCapture={(e) => {
        if (dragged.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      whileTap={isFront ? { cursor: 'grabbing' } : undefined}
      transition={{ type: 'spring', stiffness: settings.springStiffness, damping: settings.springDamping }}
      aria-hidden={!isFront}
      {...(!isFront ? { inert: '' } : {})}
    >
      {children}
    </motion.div>
  );
}

interface SwipeCardsProps {
  cards: SwipeCardItem[];
  settings?: Partial<SwipeCardsSettings>;
  className?: string;
  /** Controlled order of card ids, front first. Leave out to let the stack keep its own. */
  order?: (string | number)[];
  onOrderChange?: (order: (string | number)[]) => void;
}

export function SwipeCards({ cards, settings, className = '', order, onOrderChange }: SwipeCardsProps) {
  const config = { ...defaultSettings, ...settings };
  const [own, setOwn] = useState(() => cards.map((c) => c.id));
  const ids = order ?? own;
  const setIds = (next: (string | number)[]) => {
    if (!order) setOwn(next);
    onOrderChange?.(next);
  };
  const byId = new Map(cards.map((c) => [c.id, c]));

  const moveToBack = (id: string | number) => setIds([...ids.filter((x) => x !== id), id]);

  return (
    <MotionConfig reducedMotion="user">
      <div className={`flex items-center justify-center select-none ${className}`}>
        <div className="relative mx-auto" style={{ width: config.width, height: config.height, perspective: 1200 }}>
          {ids.map((id, index) => {
            const card = byId.get(id);
            if (!card) return null;
            const isFront = index === 0;
            const hidden = index >= config.visible;
            return (
              <SwipeCard
                key={id}
                isFront={isFront}
                zIndex={ids.length - index}
                settings={config}
                onSendToBack={() => moveToBack(id)}
              >
                <motion.div
                  className="relative h-full w-full overflow-hidden"
                  style={{ borderRadius: config.radius, transformOrigin: '85% 85%' }}
                  animate={{
                    rotateZ: Math.min(index, config.visible - 1) * config.stackRotation,
                    scale: 1 - Math.min(index, config.visible - 1) * config.stackScale,
                    opacity: hidden ? 0 : 1,
                  }}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                >
                  {card.content}
                </motion.div>
              </SwipeCard>
            );
          })}
        </div>
      </div>
    </MotionConfig>
  );
}

export default SwipeCards;
