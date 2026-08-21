import { motion } from "framer-motion"

const SPARKLES = [
  { left: "68%", top: "8%", delay: 0.15, distance: 14 },
  { left: "80%", top: "22%", delay: 0.3, distance: 18 },
  { left: "58%", top: "26%", delay: 0.45, distance: 12 },
  { left: "74%", top: "4%", delay: 0.6, distance: 20 },
]

const CYCLE = { duration: 1.6, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" as const }

export function MagicWand() {
  return (
    <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16">
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="absolute inset-0"
        animate={{ rotate: [0, -22, 8, -22, 0] }}
        transition={CYCLE}
        style={{ transformOrigin: "78% 82%" }}
      >
        <line x1="10" y1="38" x2="34" y2="14" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
        <path d="M34 5l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" fill="var(--color-starlight)" />
      </motion.svg>

      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-starlight-soft"
          style={{ left: s.left, top: s.top }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0.3],
            x: [0, s.distance],
            y: [0, -s.distance * 0.6],
          }}
          transition={{ ...CYCLE, delay: s.delay }}
        />
      ))}
    </div>
  )
}
