import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

const stats = [
  { value: '150+', label: 'Projects Completed' },
  { value: '12', label: 'Industry Awards' },
  { value: '5★', label: 'Client Rating' },
  { value: '4yrs', label: 'Experience' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
            We believe in the power of{' '}
            <motion.span
              className="italic text-brand-primary"
              whileHover={{ letterSpacing: '0.05em' }}
              transition={{ duration: 0.3 }}
            >
              intentional
            </motion.span>{' '}
            design.
          </h2>

          <div className="space-y-6 text-white/60 leading-relaxed text-lg">
            <p>
              Founded in 2020, Elevate was born from a simple observation: most
              business portfolios look exactly the same. We set out to change
              that by bringing editorial-grade design to the corporate world.
            </p>
            <p>
              Our team of multidisciplinary creators works at the intersection
              of art and technology. We don't just build websites — we build
              digital legacies that resonate on an emotional level.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 mt-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.4 }}
                whileHover={{ y: -4 }}
                className="p-4 rounded-2xl border border-white/5 cursor-default transition-colors hover:border-brand-primary/30"
              >
                <div className="text-3xl font-serif font-bold text-brand-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/40 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - 3D Tilt Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden relative z-10">
              <img
                src="https://picsum.photos/seed/business-team/800/800"
                alt="Our Team"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 to-transparent" />
            </div>

            <motion.div
              className="absolute -top-6 -right-6 w-full h-full border border-brand-primary/30 rounded-3xl -z-10"
              animate={{ rotate: [0, 2, 0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            <motion.div
              className="absolute -bottom-10 -left-10 p-8 glass-card z-20 hidden md:block"
              style={{ transform: 'translateZ(40px)' }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-sm font-serif italic text-white/80 max-w-[200px]">
                "Design is not just what it looks like. Design is how it works."
              </p>
              <p className="text-[10px] uppercase tracking-widest text-brand-primary mt-4 font-bold">
                — Steve Jobs
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}