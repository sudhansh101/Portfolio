import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../data/content';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ${
          scrolled || open ? 'border-b hairline bg-ink/70 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-5 md:px-12 lg:px-24">
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
            data-cursor-hover
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-accent to-accent-2">
              <Sparkles size={14} className="text-ink" />
            </span>
            {BRAND.name}
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  data-cursor-hover
                  className={`relative px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                    active ? 'text-ink' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-accent to-accent-2"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Link
            to="/contact"
            data-cursor-hover
            className="hidden items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] transition-colors hover:border-accent hover:text-accent md:flex"
          >
            Start a project
            <ArrowUpRight size={14} />
          </Link>

          <button
            className="text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            data-cursor-hover
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[68px] z-30 w-full overflow-hidden border-b hairline bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-3 font-display text-2xl ${
                      location.pathname === link.path ? 'text-gradient-accent' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
              >
                <Link
                  to="/contact"
                  data-cursor-hover
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink"
                >
                  Start a project <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
