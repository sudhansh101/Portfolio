import { type ReactNode, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function TiltCard({
  children,
  className = '',
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  glare?: boolean;
}) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(sy, [0, 1], [8, -8]);
  const rotateY = useTransform(sx, [0, 1], [-8, 8]);
  const glareX = useTransform(sx, [0, 1], ['0%', '100%']);
  const glareY = useTransform(sy, [0, 1], ['0%', '100%']);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`glass-card group relative ${className}`}
    >
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(280px circle at ${glareX} ${glareY}, rgba(255,255,255,0.10), transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
