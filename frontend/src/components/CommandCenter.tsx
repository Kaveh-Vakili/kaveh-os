import { motion } from "framer-motion"
import { MODULES } from "../app/modules"

export function CommandCenter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">📡</span>
        <div>
          <h2 className="font-display text-lg font-semibold text-parchment">Command Center</h2>
          <p className="text-xs text-parchment-soft">Latest updates across your modules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {MODULES.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
            className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm"
          >
            <span className="flex items-center gap-2 text-parchment-soft">
              <span>{mod.emoji}</span>
              {mod.label}
            </span>
            <span className="flex items-center gap-1.5 text-xs">
              <motion.span
                className={`h-1.5 w-1.5 rounded-full ${
                  mod.status === "online" ? "bg-emerald-400" : "bg-starlight/70"
                }`}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className={mod.status === "online" ? "text-emerald-300" : "text-parchment-soft/70"}>
                {mod.status === "online" ? "Online" : "Not connected"}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
