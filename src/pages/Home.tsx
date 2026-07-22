import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, Plus, Minus, Mic, Hand, Wrench, Sparkles } from 'lucide-react';
import { SERVICES_DATA, PROJECTS_DATA, REVIEWS_DATA, BRAND } from '../data/content';
import Aurora from '../components/Aurora';
import FloatingTech from '../components/FloatingTech';
import CodeTerminal from '../components/CodeTerminal';
import TiltCard from '../components/TiltCard';

const AUDIENCES = ['Cafés & Restaurants', 'Hospitals & Clinics', 'Startups', 'Industrial Businesses'];
const STACK = ['React', 'Next.js', 'React Native', 'Node.js', 'Python', 'Swift', 'Kotlin', 'Computer Vision', 'LLMs', 'AWS', 'Vercel', 'Stripe'];

export default function Home() {
  const [activeService, setActiveService] = useState<string | null>(SERVICES_DATA[0].id);
  const [audienceIdx, setAudienceIdx] = useState(0);

  const jarvis = PROJECTS_DATA.find((p) => p.id === 'jarvis-2');
  const otherProjects = PROJECTS_DATA.filter((p) => p.id !== 'jarvis-2');

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-24">
        <Aurora variant="hero" />
        <FloatingTech />

        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-6 flex items-center gap-2"
            >
              <Sparkles size={12} className="text-accent" /> {BRAND.full} — {BRAND.location}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-4xl text-5xl font-medium leading-[1.03] tracking-tight sm:text-6xl md:text-7xl"
            >
              We build digital
              <br />
              things that <span className="text-gradient-accent">work.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 max-w-lg text-base text-white/60 md:text-lg"
            >
              Websites, apps, and AI-driven automation for businesses who'd rather
              their tech just quietly worked — no bloat, no templates, no guesswork.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/contact"
                data-cursor-hover
                className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 glow"
              >
                Start a project
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/work"
                data-cursor-hover
                className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                See our work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-16 flex flex-wrap items-center gap-3"
            >
              <span className="eyebrow">Built for:</span>
              {AUDIENCES.map((a, i) => (
                <button
                  key={a}
                  onClick={() => setAudienceIdx(i)}
                  data-cursor-hover
                  className={`rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                    audienceIdx === i
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white/80'
                  }`}
                >
                  {a}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="hidden justify-self-end lg:block">
            <CodeTerminal />
          </div>
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section className="relative border-t hairline py-8">
        <div className="overflow-hidden">
          <div className="marquee-track">
            {[...STACK, ...STACK].map((t, i) => (
              <span key={i} className="mx-6 shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* JARVIS 2.0 SPOTLIGHT */}
      {jarvis && (
        <section className="section-padding relative border-t hairline">
          <Aurora variant="section" />
          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow mb-4">Built in-house</p>
              <h2 className="text-3xl font-medium md:text-5xl">
                Meet <span className="text-gradient-accent">{jarvis.title}</span>
              </h2>
              <p className="mt-6 max-w-xl text-white/60">{jarvis.fullDesc}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {jarvis.tech.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <Link
                to="/work"
                data-cursor-hover
                className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-accent hover:text-white"
              >
                See it in action <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TiltCard className="col-span-2 flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10">
                  <Mic size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Voice, in real time</p>
                  <p className="mt-1 text-xs text-white/50">Speaks and responds like a real conversation — no lag, no scripts.</p>
                </div>
              </TiltCard>
              <TiltCard className="flex flex-col items-start gap-3 p-6 float-slow">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-2/40 bg-accent-2/10">
                  <Hand size={20} className="text-accent-2" />
                </div>
                <p className="text-sm font-medium">Gesture control</p>
                <p className="text-xs text-white/50">Tracks hand signs to move, grab, and control on-screen elements.</p>
              </TiltCard>
              <TiltCard className="flex flex-col items-start gap-3 p-6 float-med">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-3/40 bg-accent-3/10">
                  <Wrench size={20} className="text-accent-3" />
                </div>
                <p className="text-sm font-medium">Real demo: engine teardown</p>
                <p className="text-xs text-white/50">Dismantles &amp; reassembles a car engine on screen, hand sign by hand sign.</p>
              </TiltCard>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES — click to expand */}
      <section className="section-padding border-t hairline">
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">What we do</p>
            <h2 className="text-3xl font-medium md:text-5xl">Four disciplines. One team.</h2>
          </div>
          <p className="max-w-sm text-sm text-white/50">
            Click a service to see exactly what's included — no vague packages, no surprise scope.
          </p>
        </div>

        <div className="space-y-3">
          {SERVICES_DATA.map((service) => {
            const isOpen = activeService === service.id;
            return (
              <div key={service.id} className="glass-card overflow-hidden">
                <button
                  onClick={() => setActiveService(isOpen ? null : service.id)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-7 text-left"
                  data-cursor-hover
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-sm text-accent">{service.index}</span>
                    <span className="text-xl font-medium md:text-2xl">{service.title}</span>
                  </div>
                  <span className="shrink-0 text-white/50">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-8 px-6 pb-8 md:grid-cols-[1fr_auto] md:pl-24">
                    <p className="max-w-xl text-white/60">{service.fullDesc}</p>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {service.features.map((f) => (
                        <span key={f} className="chip">{f}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section className="section-padding border-t hairline">
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">Selected work</p>
            <h2 className="text-3xl font-medium md:text-5xl">Recent builds.</h2>
          </div>
          <Link
            to="/work"
            data-cursor-hover
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-accent"
          >
            View all work <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {otherProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltCard className="flex min-h-[260px] flex-col justify-between p-8" >
                <div>
                  <p className="eyebrow mb-3">{project.category}</p>
                  <h3 className="text-xl font-medium">{project.title}</h3>
                  <p className="mt-3 text-sm text-white/50">{project.shortDesc}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] uppercase tracking-wider text-white/35">
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>


      {/* REVIEWS */}
      <section className="section-padding border-t hairline">
        <p className="eyebrow mb-14">What clients say</p>
        <div className="grid gap-10 md:grid-cols-3">
          {REVIEWS_DATA.map((review, i) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col justify-between"
            >
              <p className="text-lg leading-relaxed text-white/80">&ldquo;{review.text}&rdquo;</p>
              <div className="mt-6 border-t hairline pt-4">
                <p className="text-sm font-medium">{review.author}</p>
                <p className="font-mono text-xs text-white/40">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
