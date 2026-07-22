import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const LINES = [
  { text: "const build = await mavco.ship('idea');", color: 'text-accent-3' },
  { text: 'listen(voice) -> respond(action)', color: 'text-accent-2' },
  { text: 'gesture.track(hand) // dismantle engine', color: 'text-white/70' },
  { text: 'deploy({ speed: true, downtime: 0 });', color: 'text-accent' },
];

/**
 * A small "terminal" that types itself out, line by line, looping.
 * Purely decorative — signals real engineering, not stock imagery.
 */
export default function CodeTerminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    if (lineIdx >= LINES.length) {
      const reset = setTimeout(() => {
        setDone([]);
        setLineIdx(0);
        setCharIdx(0);
      }, 1800);
      return () => clearTimeout(reset);
    }

    const current = LINES[lineIdx].text;
    if (charIdx <= current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 28 + Math.random() * 30);
      return () => clearTimeout(t);
    }

    const next = setTimeout(() => {
      setDone((d) => [...d, current]);
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 500);
    return () => clearTimeout(next);
  }, [charIdx, lineIdx]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass-card w-full max-w-md p-5"
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-white/30">jarvis-2.0 — zsh</span>
      </div>
      <div className="min-h-[120px] space-y-2 font-mono text-[13px] leading-relaxed">
        {done.map((line, i) => (
          <p key={i} className="text-white/40">
            <span className="text-accent/70">$</span> {line}
          </p>
        ))}
        {lineIdx < LINES.length && (
          <p className={LINES[lineIdx].color}>
            <span className="text-accent/70">$</span>{' '}
            <span className="type-cursor">{LINES[lineIdx].text.slice(0, charIdx)}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}
