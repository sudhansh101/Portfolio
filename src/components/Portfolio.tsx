import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    title: 'Lumina Wellness',
    category: 'E-commerce',
    tag: 'all',
    image: 'https://picsum.photos/seed/wellness/800/600',
    link: '#',
    tech: ['React', 'Node.js', 'Stripe'],
    description: 'A premium wellness e-commerce platform with seamless UX.',
  },
  {
    title: 'Aether Architecture',
    category: 'Portfolio',
    tag: 'design',
    image: 'https://picsum.photos/seed/architecture/800/600',
    link: '#',
    tech: ['Next.js', 'GSAP', 'Tailwind'],
    description: 'Editorial-grade portfolio for a top architecture firm.',
  },
  {
    title: 'Vanguard Finance',
    category: 'Fintech',
    tag: 'dev',
    image: 'https://picsum.photos/seed/finance/800/600',
    link: '#',
    tech: ['React', 'D3.js', 'Python'],
    description: 'Real-time financial dashboard with advanced analytics.',
  },
  {
    title: 'Nebula Creative',
    category: 'Agency',
    tag: 'design',
    image: 'https://picsum.photos/seed/creative/800/600',
    link: '#',
    tech: ['Vue.js', 'Three.js', 'GSAP'],
    description: 'Immersive 3D agency website with WebGL effects.',
  },
];

const filters = ['All', 'Design', 'Dev'];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filtered = projects.filter((p) =>
    activeFilter === 'All' ? true : p.tag === activeFilter.toLowerCase()
  );

  return (
    <section id="portfolio" className="section-padding bg-brand-gray/30">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block"
            >
              Our Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold"
            >
              Selected Projects
            </motion.h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-4 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-colors cursor-pointer"
          >
            Start a Project
          </motion.button>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-3 mb-16"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-brand-primary text-white'
                  : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === i ? 1.1 : 1,
                      filter:
                        hoveredIndex === i ? 'grayscale(0%)' : 'grayscale(100%)',
                    }}
                    transition={{ duration: 0.6 }}
                    referrerPolicy="no-referrer"
                  />

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-brand-dark/70 flex flex-col items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white/80 text-sm text-center px-8 max-w-xs">
                      {project.description}
                    </p>

                    <div className="flex gap-2 flex-wrap justify-center">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <motion.div
                      className="flex gap-3 mt-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{
                        y: hoveredIndex === i ? 0 : 20,
                        opacity: hoveredIndex === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <motion.a
                        href={project.link}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center"
                      >
                        <ExternalLink size={18} />
                      </motion.a>
                      <motion.a
                        href={project.link}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center"
                      >
                        <Github size={18} />
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="flex justify-between items-center px-2">
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-1 group-hover:text-brand-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">
                      {project.category}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-primary transition-all duration-300"
                  >
                    <ExternalLink size={14} className="text-white/40 group-hover:text-white" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}