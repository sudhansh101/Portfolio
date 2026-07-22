import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Laptop, Smartphone, MousePointer2, Code2, Cpu, Terminal, type LucideIcon } from 'lucide-react';

type IconSpec = {
  Icon: LucideIcon;
  top: string;
  left: string;
  size: number;
  depth: number;
  floatClass: string;
  delay: number;
};

const ICONS: IconSpec[] = [
  { Icon: Laptop, top: '10%', left: '58%', size: 46, depth: 26, floatClass: 'float-slow', delay: 0 },
  { Icon: Smartphone, top: '52%', left: '80%', size: 34, depth: 40, floatClass: 'float-med', delay: 0.2 },
  { Icon: MousePointer2, top: '70%', left: '52%', size: 26, depth: 55, floatClass: 'float-fast', delay: 0.35 },
  { Icon: Code2, top: '22%', left: '84%', size: 30, depth: 34, floatClass: 'float-med', delay: 0.1 },
  { Icon: Cpu, top: '78%', left: '72%', size: 28, depth: 20, floatClass: 'float-slow', delay: 0.4 },
  { Icon: Terminal, top: '2%', left: '76%', size: 26, depth: 48, floatClass: 'float-fast', delay: 0.5 },
];

/**
 * A field of floating device / coding icons that gently parallax with the
 * cursor — a lightweight, dependency-free stand-in for a 3D scene that
 * signals "we build software across web, mobile, and hardware-adjacent AI."
 */
export default function FloatingTech() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {ICONS.map((item, i) => (
        <FloatIcon
          key={i}
          Icon={item.Icon}
          top={item.top}
          left={item.left}
          size={item.size}
          depth={item.depth}
          floatClass={item.floatClass}
          delay={item.delay}
          smx={smx}
          smy={smy}
        />
      ))}
    </div>
  );
}

interface FloatIconProps extends IconSpec {
  smx: ReturnType<typeof useSpring>;
  smy: ReturnType<typeof useSpring>;
}

function FloatIcon({ Icon, top, left, size, depth, floatClass, delay, smx, smy }: FloatIconProps) {
  const x = useTransform(smx, (v) => v * depth);
  const y = useTransform(smy, (v) => v * depth);

  return (
    <motion.div
      style={{ top, left, x, y }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6 + delay }}
      className={`absolute ${floatClass}`}
    >
      <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm glow">
        <Icon size={size} strokeWidth={1.4} className="text-white/70" />
      </div>
    </motion.div>
  );
}
