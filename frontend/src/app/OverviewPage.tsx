import { motion } from "framer-motion"
import { MODULES } from "./modules"
import { ModuleTile } from "../components/ModuleTile"

export function OverviewPage() {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-1 font-display text-2xl font-semibold text-ink"
      >
        Overview
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-8 text-sm text-ink-soft"
      >
        Your day at a glance.
      </motion.p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((mod, i) => (
          <ModuleTile key={mod.id} mod={mod} index={i} />
        ))}
      </div>
    </div>
  )
}
