export const BRAND = {
  name: 'MAV&CO',
  full: 'Elevate Digital Agency',
  email: 'maverricdev@gmail.com',
  phone: ['+91 72491 30838', '+91 90227 60216'],
  whatsapp: '917249130838',
  location: 'India',
  socials: {
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com/sudhansh101',
  },
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES_DATA = [
  {
    id: 'web',
    index: '01',
    title: 'Industry Web Platforms',
    shortDesc: 'Custom architectures for hotels, hospitals, cafés and industrial scale.',
    fullDesc:
      'We do not use bloated templates. Whether you run a busy café, a hospital network, or a factory floor, we engineer bespoke web platforms built for speed and conversion.',
    features: ['Hospital Portals', 'Restaurant Booking', 'B2B Dashboards', 'React / Next.js', 'Sub-second Loads'],
  },
  {
    id: 'apps',
    index: '02',
    title: 'iOS & Android Apps',
    shortDesc: 'Native applications deployed to the App Store & Play Store.',
    fullDesc:
      'We engineer native and cross-platform mobile applications that hold up under real traffic — seamless UI, deep hardware integration, crash-free scaling.',
    features: ['App Store', 'Play Store', 'React Native', 'Swift / Kotlin', 'Push Notifications'],
  },
  {
    id: 'growth',
    index: '03',
    title: 'SEO, Security & Scaling',
    shortDesc: 'SSL certs, algorithmic SEO, and post-launch domination.',
    fullDesc:
      'Deployment is day one. We lock down infrastructure with SSL and DDoS protection, then architect technical SEO so search engines index the site correctly from the start.',
    features: ['Technical SEO', 'SSL Certificates', 'DDoS Protection', 'Analytics', 'Conversion Tracking'],
  },
  {
    id: 'automation',
    index: '04',
    title: 'AI Chatbots & Automation',
    shortDesc: 'Always-on assistants and workflow automation for lean teams.',
    fullDesc:
      'We build AI chatbots trained on your business, and automate the repetitive parts of running one — lead follow-ups, bookings, and internal ops.',
    features: ['AI Chat Assistants', 'WhatsApp Automation', 'Lead Routing', 'Internal Tools'],
  },
];

export const PROJECTS_DATA = [
  {
    id: 'jarvis-2',
    title: 'Jarvis 2.0',
    category: 'AI Voice & Gesture Assistant',
    tech: ['Python', 'Computer Vision', 'LLM Voice Pipeline', 'Real-Time Gesture Tracking'],
    shortDesc: 'A voice-driven AI assistant that sees, listens, and acts — with real hand-gesture control.',
    fullDesc:
      'Our in-house flagship build: an assistant that talks and responds in real time, then goes further — using computer-vision hand tracking to control and manipulate on-screen elements with gestures. Demoed live by virtually dismantling and reassembling a car engine, part by part, using nothing but hand signs. Built end-to-end by our own team as proof of what we bring to client work.',
    flagship: true,
  },
  {
    id: 'nexus-solar',
    title: 'Nexus Solar Energy',
    category: 'Lead Gen Platform',
    tech: ['Next.js', 'Vercel', 'SEO'],
    shortDesc: 'A high-conversion portal for a solar energy provider.',
    fullDesc:
      'Architected a fast, education-first lead-generation portal for a solar company — full stack, from domain to deployment.',
  },
  {
    id: 'aura-hospitality',
    title: 'Aura Hospitality',
    category: 'Web & Mobile App',
    tech: ['React Native', 'iOS / Android', 'Stripe'],
    shortDesc: 'Luxury dining reservations and hotel booking app.',
    fullDesc:
      'A cross-platform app letting guests book rooms, reserve tables, and order room service — with real-time inventory and secure payments.',
  },
  {
    id: 'medsync',
    title: 'MedSync Health',
    category: 'Secure Portal',
    tech: ['React', 'Node.js', 'Encryption'],
    shortDesc: 'A secure patient and doctor data portal for regional hospitals.',
    fullDesc:
      'End-to-end encrypted patient portal built for reliability under real hospital workloads, with an interface simple enough for elderly patients.',
  },
];

export const REVIEWS_DATA = [
  {
    text: 'They engineered a revenue engine, not just a website. Our lead conversions went up sharply in the first month.',
    author: 'David M.',
    role: 'Founder, Nexus Solar',
  },
  {
    text: 'Getting our app approved was a nightmare until MAV&CO stepped in and rebuilt the architecture from scratch.',
    author: 'Sarah J.',
    role: 'Product Lead, Aura Hospitality',
  },
  {
    text: 'Security and speed were non-negotiable for our clinic portal. They delivered both, with zero downtime since launch.',
    author: 'Dr. Aris T.',
    role: 'Chief of Operations, MedSync',
  },
];
