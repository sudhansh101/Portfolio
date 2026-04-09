import { motion } from 'motion/react';
import { Layout, Smartphone, BarChart, Globe, Shield, Zap } from 'lucide-react';

const services = [
  {
    icon: <Layout className="text-brand-primary" size={32} />,
    title: 'Web Design',
    description: 'Bespoke, high-conversion websites tailored to your brand identity and business goals.'
  },
  {
    icon: <Smartphone className="text-brand-primary" size={32} />,
    title: 'App Development',
    description: 'Seamless mobile experiences for iOS and Android that engage users and drive loyalty.'
  },
  {
    icon: <BarChart className="text-brand-primary" size={32} />,
    title: 'Digital Strategy',
    description: 'Data-driven roadmaps to navigate the digital landscape and outperform your competition.'
  },
  {
    icon: <Globe className="text-brand-primary" size={32} />,
    title: 'SEO Optimization',
    description: 'Strategic search engine optimization to increase visibility and organic traffic.'
  },
  {
    icon: <Shield className="text-brand-primary" size={32} />,
    title: 'Cyber Security',
    description: 'Robust security protocols to protect your digital assets and customer data.'
  },
  {
    icon: <Zap className="text-brand-primary" size={32} />,
    title: 'Performance',
    description: 'Lightning-fast load times and optimized performance for the best user experience.'
  }
];

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block"
          >
            What We Do
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold"
          >
            Comprehensive Digital Solutions
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">{service.title}</h3>
              <p className="text-white/50 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
