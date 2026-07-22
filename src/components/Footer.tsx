import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative border-t hairline px-6 py-16 md:px-12 lg:px-24">
      <div className="glow-line absolute inset-x-0 top-0" />

      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="eyebrow mb-4">{BRAND.full}</p>
          <h3 className="max-w-md font-display text-3xl leading-tight md:text-4xl">
            Have a project worth building right?
          </h3>
          <Link
            to="/contact"
            data-cursor-hover
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-ink"
          >
            Start a project
            <ArrowUpRight size={14} />
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <SocialLink href={BRAND.socials.github} label="GitHub"><Github size={16} /></SocialLink>
            <SocialLink href={BRAND.socials.linkedin} label="LinkedIn"><Linkedin size={16} /></SocialLink>
            <SocialLink href={BRAND.socials.instagram} label="Instagram"><Instagram size={16} /></SocialLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          <div>
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-white/70 hover:text-white" data-cursor-hover>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href={`mailto:${BRAND.email}`} className="hover:text-white" data-cursor-hover>
                  {BRAND.email}
                </a>
              </li>
              {BRAND.phone.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-white" data-cursor-hover>
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Based in</p>
            <p className="text-sm text-white/70">{BRAND.location}</p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t hairline pt-6 text-xs text-white/40 md:flex-row md:items-center">
        <p>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        <p className="font-mono">BUILT IN INDIA.01</p>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      data-cursor-hover
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-colors hover:border-accent/50 hover:text-accent"
    >
      {children}
    </a>
  );
}
