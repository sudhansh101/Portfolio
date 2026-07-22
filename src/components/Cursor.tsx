import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [data-cursor-hover]'));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [isVisible, x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: springX, y: springY, opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
        animate={{
          width: isHovering ? 48 : 16,
          height: isHovering ? 48 : 16,
          backgroundColor: isHovering ? 'rgba(242,125,38,0.12)' : 'rgba(242,125,38,1)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </motion.div>
  );
}
