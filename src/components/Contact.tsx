import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Send, Loader2 } from 'lucide-react';
import { useToast } from './Toast';

// ✅ Fallback to empty string to avoid undefined TypeScript errors
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_AUTO_REPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

// ✅ Reusable send function
const sendEmail = async (
  templateId: string,
  templateParams: Record<string, string>
): Promise<void> => {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: templateParams
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('EmailJS error:', errorText);
    throw new Error(errorText);
  }
};

export default function Contact() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // ✅ Issue 2 Fix - Guard against missing ENV variables
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      showToast(
        'Email service not configured. Please contact us directly at maverricdev@gmail.com',
        'error'
      );
      setIsLoading(false);
      return;
    }

    try {
      // ✅ Step 1: Send contact email TO YOU
      await sendEmail(EMAILJS_TEMPLATE_ID, {
        from_name: formData.from_name,
        from_email: formData.from_email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'maverricdev@gmail.com'
      });

      // ✅ Issue 3 Fix - Auto-reply in separate try/catch
      // So if auto-reply fails, user still sees success
      try {
        await sendEmail(EMAILJS_AUTO_REPLY_TEMPLATE_ID, {
          from_name: formData.from_name,
          from_email: formData.from_email,
          subject: formData.subject,
          message: formData.message,
          to_email: formData.from_email
        });
      } catch (autoReplyError) {
        // Auto-reply failed but main email was sent
        // Don't show error to user - just log it
        console.error('Auto-reply failed (non-critical):', autoReplyError);
      }

      // ✅ Show success - main email was sent
      showToast("Message sent! We'll get back to you soon.", 'success');
      setFormData({ from_name: '', from_email: '', subject: '', message: '' });

    } catch (error) {
      // ✅ This only triggers if MAIN email failed
      console.error('Email send error:', error);
      showToast(
        'Failed to send. Please email us directly at maverricdev@gmail.com',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-primary font-bold tracking-widest uppercase text-xs mb-4 block">
              Contact Us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Let's build something{' '}
              <span className="italic">extraordinary</span> together.
            </h2>
            <p className="text-white/60 text-lg mb-12 leading-relaxed">
              Ready to elevate your digital presence? We're here to help you
              navigate the complexities of the digital world with style and
              precision.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">
                    Email Us
                  </p>
                  <p className="text-lg font-medium">maverricdev@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">
                    Call Us
                  </p>
                  <p className="text-lg font-medium">7249130838 / 9022760216</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 md:p-12"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-hidden focus:border-brand-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-hidden focus:border-brand-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-hidden focus:border-brand-primary/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                  Message
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-hidden focus:border-brand-primary/50 transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-brand-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}