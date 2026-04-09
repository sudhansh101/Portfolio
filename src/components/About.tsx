import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="section-padding bg-brand-gray/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
            We believe in the power of <span className="italic">intentional</span> design.
          </h2>
          <div className="space-y-6 text-white/60 leading-relaxed text-lg">
            <p>
              Founded in 2020, Elevate was born from a simple observation: most business 
              portfolios look exactly the same. We set out to change that by bringing 
              editorial-grade design to the corporate world.
            </p>
            <p>
              Our team of multidisciplinary creators works at the intersection of 
              art and technology. We don't just build websites; we build digital 
              legacies that resonate with your audience on an emotional level.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <div className="text-3xl font-serif font-bold text-brand-primary mb-1">150+</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-brand-primary mb-1">12</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Industry Awards</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden relative z-10">
            <img 
              src="https://picsum.photos/seed/business-team/800/800" 
              alt="Our Team" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-6 -right-6 w-full h-full border border-brand-primary/30 rounded-3xl -z-0" />
          <div className="absolute -bottom-10 -left-10 p-8 glass-card z-20 hidden md:block">
            <p className="text-sm font-serif italic text-white/80 max-w-[200px]">
              "Design is not just what it looks like and feels like. Design is how it works."
            </p>
            <p className="text-[10px] uppercase tracking-widest text-brand-primary mt-4 font-bold">
              — Steve Jobs
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
