import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import type { ModuleDef } from "../app/modules"

export function CarouselCard({ mod, active }: { mod: ModuleDef; active: boolean }) {
  return (
    <motion.div
      animate={{ scale: active ? 1 : 0.9, opacity: active ? 1 : 0.55 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      style={{ width: 260 }}
      className="shrink-0"
    >
      <Link
        to={mod.path}
        draggable={false}
        className="group relative block overflow-hidden rounded-2xl border border-starlight/15 bg-linear-to-br from-surface to-background p-6 shadow-xl shadow-black/20"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-starlight/30 to-transparent"
          animate={active ? { x: ["-100%", "420%"] } : { x: "-100%" }}
          transition={{ duration: 1.8, repeat: active ? Infinity : 0, repeatDelay: 2.2, ease: "easeInOut" }}
        />

        <motion.div
          className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-nightsky text-2xl shadow-inner"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {mod.emoji}
        </motion.div>

        <h3 className="relative text-lg font-semibold text-foreground">{mod.label}</h3>
        <p className="relative mt-1 text-sm text-foreground-soft">{mod.description}</p>

        <span
          className={`relative mt-4 inline-flex items-center gap-1.5 text-xs ${
            mod.status === "online" ? "text-emerald-400" : "text-foreground-soft/60"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              mod.status === "online" ? "bg-emerald-400" : "bg-foreground-soft/40"
            }`}
          />
          {mod.status === "online" ? "Online" : "Not connected"}
        </span>
      </Link>
    </motion.div>
  )
}
