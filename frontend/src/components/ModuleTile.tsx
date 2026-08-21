import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import type { ModuleDef } from "../app/modules"

export function ModuleTile({ mod, index }: { mod: ModuleDef; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 22, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={mod.path}
        className="group block rounded-2xl bg-parchment-soft p-6 shadow-md shadow-black/5 transition-shadow hover:shadow-lg hover:shadow-starlight/30"
      >
        <div className="mb-3 text-3xl transition-transform group-hover:scale-110">{mod.emoji}</div>
        <h3 className="text-lg font-semibold text-ink">{mod.label}</h3>
        <p className="mt-1 text-sm text-ink-soft">{mod.description}</p>
      </Link>
    </motion.div>
  )
}
