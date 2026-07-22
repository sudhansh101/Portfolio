import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import Cursor from './Cursor';
import Chatbot from './Chatbot';
import ScrollProgress from './ScrollProgress';

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex-1 pt-[68px]"
      >
        {children}
      </motion.main>
      <Footer />
      <Chatbot />
    </div>
  );
}
