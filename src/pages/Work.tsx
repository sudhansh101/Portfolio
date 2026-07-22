import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '../data/content';
import Aurora from '../components/Aurora';
import TiltCard from '../components/TiltCard';

export default function Work() {
  return (
    <div className="relative overflow-hidden">
      <section className="section-padding relative border-b hairline pt-32">
        <Aurora variant="section" />
        <p className="eyebrow mb-4">Work</p>
        <h1 className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl">
          A few things we've shipped.
        </h1>
        <p className="mt-6 max-w-xl text-white/60">
          Client platforms built to convert, and one project we built purely to push what we're capable of.
        </p>
      </section>

      <section className="section-padding grid gap-6 border-b hairline sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS_DATA.map((project, i) => {
          const isFlagship = 'flagship' in project && project.flagship;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={isFlagship ? 'sm:col-span-2 lg:col-span-3' : ''}
            >
              <TiltCard
                className={`flex min-h-[320px] flex-col justify-between p-8 ${
                  isFlagship ? 'lg:flex-row lg:items-center lg:gap-12' : ''
                }`}
              >
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <p className="eyebrow">{project.category}</p>
                    {isFlagship && (
                      <span className="flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                        <Sparkles size={10} /> In-house build
                      </span>
                    )}
                  </div>
                  <h2 className={isFlagship ? 'text-3xl font-medium md:text-4xl' : 'text-2xl font-medium'}>
                    {project.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">{project.fullDesc}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2 lg:mt-0 lg:shrink-0 lg:flex-col lg:items-end">
                  {project.tech.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
