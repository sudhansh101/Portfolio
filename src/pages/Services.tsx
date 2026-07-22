import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/content';
import Aurora from '../components/Aurora';
import TiltCard from '../components/TiltCard';

export default function Services() {
  return (
    <div className="relative overflow-hidden">
      <section className="section-padding relative border-b hairline pt-32">
        <Aurora variant="section" />
        <p className="eyebrow mb-4">Services</p>
        <h1 className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl">
          Everything you need to launch, and keep working.
        </h1>
        <p className="mt-6 max-w-xl text-white/60">
          We work end-to-end: design, build, deploy, and the unglamorous parts
          — security, SEO, and support — that keep a product alive.
        </p>
      </section>

      <section className="section-padding grid gap-6 border-b hairline md:grid-cols-2">
        {SERVICES_DATA.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <TiltCard className="flex h-full flex-col p-8">
              <span className="font-mono text-sm text-accent">{service.index}</span>
              <h2 className="mt-4 text-2xl font-medium md:text-3xl">{service.title}</h2>
              <p className="mt-3 flex-1 text-white/60">{service.fullDesc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span key={f} className="chip">{f}</span>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </section>

      <section className="section-padding flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-medium md:text-4xl">Not sure what you need?</h2>
        <p className="max-w-md text-white/60">Tell us where the business is stuck — we'll tell you what's worth building first.</p>
        <Link
          to="/contact"
          data-cursor-hover
          className="flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-ink glow"
        >
          Talk to us <ArrowUpRight size={16} />
        </Link>
      </section>
    </div>
  );
}
