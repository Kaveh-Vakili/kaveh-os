import { motion } from "framer-motion"
import type { CSSProperties } from "react"

const beamStyle = (flip: boolean): CSSProperties => ({
  position: "absolute",
  bottom: 0,
  left: flip ? "auto" : "-10%",
  right: flip ? "-10%" : "auto",
  width: "60vw",
  height: "140vh",
  transformOrigin: "bottom center",
  clipPath: "polygon(46% 100%, 54% 100%, 100% 0%, 0% 0%)",
  background: "linear-gradient(to top, rgba(244,201,120,0.28), rgba(244,201,120,0) 75%)",
  mixBlendMode: "screen",
})

export function Spotlights() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={beamStyle(false)}
        animate={{ rotate: [-14, 10, -14] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={beamStyle(true)}
        animate={{ rotate: [14, -10, 14] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(244,201,120,0.20), rgba(244,201,120,0) 60%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
