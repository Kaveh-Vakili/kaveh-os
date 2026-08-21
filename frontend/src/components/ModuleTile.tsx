import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import type { ModuleDef } from "../app/modules"

export function ModuleTile({ mod, index }: { mod: ModuleDef; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 22, delay: index * 0.06 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative"
    >
      <motion.div
        aria-hidden
        className="absolute -inset-1 rounded-2xl bg-starlight/40 blur-xl"
        animate={{ opacity: [0.1, 0.32, 0.1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
      />

      <Link
        to={mod.path}
        className="relative block overflow-hidden rounded-2xl bg-parchment-soft p-6 shadow-md shadow-black/5 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-starlight/40"
      >
        <motion.div
          className="mb-3 w-fit text-3xl"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.6 + index * 0.15, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.25, rotate: -8 }}
        >
          {mod.emoji}
        </motion.div>
        <h3 className="text-lg font-semibold text-ink">{mod.label}</h3>
        <p className="mt-1 text-sm text-ink-soft">{mod.description}</p>
      </Link>
    </motion.div>
  )
}
