import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Lumina Wellness',
    category: 'E-commerce',
    image: 'https://picsum.photos/seed/wellness/800/600',
    link: '#'
  },
  {
    title: 'Aether Architecture',
    category: 'Portfolio',
    image: 'https://picsum.photos/seed/architecture/800/600',
    link: '#'
  },
  {
    title: 'Vanguard Finance',
    category: 'Fintech',
    image: 'https://picsum.photos/seed/finance/800/600',
    link: '#'
  },
  {
    title: 'Nebula Creative',
    category: 'Agency',
    image: 'https://picsum.photos/seed/creative/800/600',
    link: '#'
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding bg-brand-gray/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block">
              Our Work
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Selected Projects
            </h2>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-colors cursor-pointer"
          >
            Start a Project
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-brand-primary text-white flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                    <ExternalLink size={24} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-1">{project.title}</h3>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
