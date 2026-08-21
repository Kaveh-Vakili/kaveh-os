import { motion } from "framer-motion"

const ORBS = [
  { size: 420, top: "-8%", left: "-6%", color: "var(--color-starlight)", duration: 16 },
  { size: 340, top: "35%", left: "82%", color: "var(--color-rose)", duration: 20 },
  { size: 300, top: "78%", left: "8%", color: "var(--color-starlight-soft)", duration: 18 },
]

export function AmbientAura() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: orb.color,
            opacity: 0.2,
          }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
        />
      ))}
    </div>
  )
}
