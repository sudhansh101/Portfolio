import { motion } from 'motion/react';

/**
 * Soft, animated gradient-blob backdrop. Replaces the old flat grid-line
 * "boxes" background with a premium, motion-driven wash of color.
 */
export default function Aurora({ variant = 'hero' }: { variant?: 'hero' | 'section' }) {
  const size = variant === 'hero' ? 1 : 0.7;

  return (
    <div className="aurora">
      <motion.div
        className="aurora__blob bg-accent-2/40"
        style={{ width: 480 * size, height: 480 * size, top: '-10%', left: '-8%' }}
        animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="aurora__blob bg-accent/30"
        style={{ width: 420 * size, height: 420 * size, top: '5%', right: '-10%' }}
        animate={{ x: [0, -30, 20, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="aurora__blob bg-accent-3/20"
        style={{ width: 380 * size, height: 380 * size, bottom: '-15%', left: '30%' }}
        animate={{ x: [0, 20, -20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="noise-veil" />
    </div>
  );
}
