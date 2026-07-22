import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import Groq from 'groq-sdk';
import { BRAND, SERVICES_DATA, PROJECTS_DATA} from '../data/content';

const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true }) : null;

const serviceLines = SERVICES_DATA.map((s) => `- ${s.title}: ${s.shortDesc}`).join('\n');
const projectLines = PROJECTS_DATA.map((p) => `- ${p.title} (${p.category}): ${p.shortDesc}`).join('\n');

const SYSTEM_PROMPT = `
You are the AI assistant embedded on the ${BRAND.name} (${BRAND.full}) portfolio site.
You only discuss ${BRAND.name}'s work, services, projects, and how to get in touch — you are
not a general-purpose assistant, and you politely steer unrelated questions back to what
${BRAND.name} can help with.

Company facts you know cold:

Services:
${serviceLines}

Selected work:
${projectLines}

Jarvis 2.0 is the team's own flagship build (not a client project) — a voice assistant that
listens and responds in real time, plus tracks hand gestures to control on-screen elements.
It was demoed by virtually dismantling and reassembling a car engine using only hand signs.
Bring it up when relevant as proof of technical depth, especially for AI/automation questions.

Contact: ${BRAND.email} · WhatsApp available from the Contact page · Based in ${BRAND.location}.

Tone: sharp, confident, concise, plain-spoken — no corporate filler, no over-explaining.
Keep replies short (2-5 sentences typically) unless the visitor asks for detail.
When a visitor seems ready to start a project, point them to the Contact page or WhatsApp.
`;

const GREETING = `Hey — I'm the ${BRAND.name} assistant, built by the same team behind Jarvis 2.0. What are you looking to build?`;

const SUGGESTIONS = ['What is Jarvis 2.0?', 'What services do you offer?', 'Who founded this?'];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const send = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userText = text.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    if (!groq) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: `Chat isn't configured yet — email us at ${BRAND.email} or use WhatsApp on the Contact page.` },
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const history = messages
        .filter((_, i) => i !== 0)
        .map((m) => ({ role: m.role === 'user' ? ('user' as const) : ('assistant' as const), content: m.text }));

      const completion = await groq.chat.completions.create({
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: userText }],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 400,
      });

      const responseText = completion.choices[0]?.message?.content || "Didn't quite catch that — try again?";
      setMessages((prev) => [...prev, { role: 'bot', text: responseText }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: `Connection issue — email us at ${BRAND.email} instead.` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e?: FormEvent) => {
    if (e) e.preventDefault();
    send(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="glass-card mb-4 flex w-[calc(100vw-3rem)] flex-col overflow-hidden sm:w-96"
          >
            <div className="relative flex items-center justify-between border-b hairline p-4">
              <div className="absolute inset-0 -z-10 bg-linear-to-r from-accent/10 via-accent-2/10 to-transparent" />
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-accent/40 bg-accent/10">
                  <Sparkles size={16} className="text-accent" />
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-panel bg-accent-3" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{BRAND.name} Assistant</h3>
                  <p className="eyebrow">Online · Ask about our work</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white" data-cursor-hover>
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="h-96 space-y-4 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'rounded-br-sm bg-linear-to-br from-accent to-accent-2 text-ink'
                        : 'rounded-bl-sm border border-white/10 bg-white/[0.03] text-white/80'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.03] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      data-cursor-hover
                      className="chip transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form className="flex items-center gap-2 border-t hairline p-4" onSubmit={handleSend}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Jarvis 2.0, services..."
                className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-3 text-xs text-white outline-none transition-colors focus:border-accent/60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-full bg-accent p-3 text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
                data-cursor-hover
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-2 text-ink glow"
        data-cursor-hover
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
}
