import { motion } from "framer-motion"

export function RocketFlyby() {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0"
      initial={{ x: "-10vw", y: "90vh", rotate: -40, opacity: 0 }}
      animate={{ x: "110vw", y: "-10vh", rotate: -40, opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 7,
        repeat: Infinity,
        repeatDelay: 5,
        ease: "easeInOut",
        opacity: { times: [0, 0.08, 0.92, 1], duration: 7 },
      }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <ellipse cx="14" cy="34" rx="5" ry="9" fill="var(--color-starlight)" opacity="0.5" transform="rotate(45 14 34)" />
        <path
          d="M24 4c6 5 8 13 8 20 0 4-2 8-8 12-6-4-8-8-8-12 0-7 2-15 8-20Z"
          fill="var(--color-parchment)"
        />
        <circle cx="24" cy="18" r="3.5" fill="var(--color-nightsky)" />
        <path d="M16 24c-4 1-6 5-6 9 4-1 7-3 8-6l-2-3Z" fill="var(--color-rose)" />
        <path d="M32 24c4 1 6 5 6 9-4-1-7-3-8-6l2-3Z" fill="var(--color-rose)" />
        <path d="M20 34h8l-2 6a2 2 0 0 1-4 0l-2-6Z" fill="var(--color-starlight)" />
      </svg>
    </motion.div>
  )
}
