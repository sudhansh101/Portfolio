import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import { useToast } from './Toast';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { showToast } = useToast();

  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="text-2xl font-serif font-bold tracking-tighter mb-6">
              ELEVATE<span className="text-brand-primary">.</span>
            </div>
            <p className="text-white/40 leading-relaxed mb-8">
              Crafting digital legacies through intentional design and sophisticated technology.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, color: '#f27d26' }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-brand-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li><a href="#about" className="hover:text-brand-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-brand-primary transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-brand-primary transition-colors">Portfolio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Web Design</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">App Development</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Digital Strategy</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">SEO Optimization</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-white/40 text-sm mb-6">Subscribe to receive our latest design insights.</p>
            <form 
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                showToast('Thank you for subscribing!', 'success');
              }}
            >
              <input 
                type="email" 
                required
                placeholder="Your email"
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm focus:outline-hidden focus:border-brand-primary/50"
              />
              <button 
                type="submit"
                className="absolute right-1.5 top-1.5 bg-brand-primary text-white px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer hover:bg-brand-primary/90 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-4">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
            © {currentYear} Elevate Digital Agency. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
