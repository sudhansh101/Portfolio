import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2, MessageCircle, Mail, Phone } from 'lucide-react';
import { BRAND } from '../data/content';
import Aurora from '../components/Aurora';

const APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL ?? '';

type Status = 'idle' | 'loading' | 'success' | 'error';

const BUDGETS = ['Under ₹15k', '₹15k – ₹50k', '₹50k – ₹1.5L', '₹1.5L+'];

const whatsappHref = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
  `Hi ${BRAND.name} — I'd like to talk about a project.`,
)}`;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', budget: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setError('Name, email, and a short message are required.');
      return;
    }

    if (!APPS_SCRIPT_URL) {
      setStatus('error');
      setError('Form is not connected yet — please email or WhatsApp us directly for now.');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      // Google Apps Script web apps don't reliably support CORS preflight,
      // so we send as a simple (no-preflight) request and treat the
      // response as opaque. The script itself confirms receipt server-side.
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          budget: form.budget,
          message: form.message,
          page: 'contact',
          submittedAt: new Date().toISOString(),
        }),
      });

      setStatus('success');
      setForm({ name: '', email: '', phone: '', budget: '', message: '' });
    } catch (err) {
      console.error('Apps Script submit error:', err);
      setStatus('error');
      setError('Something went wrong sending that. Try WhatsApp or email instead.');
    }
  };

  return (
    <div className="relative overflow-hidden">
      <Aurora variant="section" />
      <div className="section-padding relative grid gap-16 pt-32 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-4">
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl font-medium leading-tight md:text-5xl"
          >
            Tell us what you're building.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-sm text-white/60"
          >
            We reply within a business day. For anything urgent, WhatsApp is fastest.
          </motion.p>

          {/* Fastest path — WhatsApp */}
          <motion.a
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="glass-card mt-8 flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent-3/40 bg-accent-3/10">
              <MessageCircle size={20} className="text-accent-3" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Chat on WhatsApp</p>
              <p className="text-xs text-white/50">Usually replies in minutes, not days.</p>
            </div>
            <ArrowUpRight size={16} className="text-white/40" />
          </motion.a>

          <div className="mt-10 space-y-5 border-t hairline pt-8">
            <div className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="eyebrow mb-1">Email</p>
                <a href={`mailto:${BRAND.email}`} className="text-white/80 hover:text-accent" data-cursor-hover>
                  {BRAND.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="eyebrow mb-1">Phone</p>
                {BRAND.phone.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-white/80 hover:text-accent" data-cursor-hover>
                    {p}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-1">Based in</p>
              <p className="text-white/80">{BRAND.location}</p>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="glass-card p-6 md:p-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(v) => update('name', v)} required />
            <Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} required />
            <Field label="Phone (optional)" value={form.phone} onChange={(v) => update('phone', v)} />
            <div>
              <label className="eyebrow mb-2 block">Budget</label>
              <select
                value={form.budget}
                onChange={(e) => update('budget', e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              >
                <option value="" className="bg-ink">Select a range</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b} className="bg-ink">{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="eyebrow mb-2 block">What are you building?</label>
            <textarea
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              required
              rows={5}
              className="w-full resize-none rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              placeholder="A website for my café, a booking app, a rebuild of our old site..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            data-cursor-hover
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-medium text-ink transition-opacity glow disabled:opacity-60 sm:w-auto sm:px-8"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send message <ArrowUpRight size={16} />
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="mt-4 flex items-center gap-2 text-sm text-green-400">
              <CheckCircle2 size={16} /> Got it — we'll be in touch soon.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
              <AlertCircle size={16} /> {error}
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
