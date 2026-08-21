import { motion } from "framer-motion"
import { Starfield } from "../components/Starfield"
import { CommandCenter } from "../components/CommandCenter"
import { ModuleCarousel } from "../components/ModuleCarousel"

export function OverviewPage() {
  return (
    <div>
      <div className="relative -mx-6 -mt-10 overflow-hidden rounded-b-3xl bg-linear-to-b from-nightsky to-nightsky-light px-6 pb-10 pt-10 text-parchment">
        <Starfield count={60} />

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-1 font-display text-2xl font-semibold text-parchment"
          >
            Overview
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6 text-sm text-parchment-soft"
          >
            Your day at a glance.
          </motion.p>

          <CommandCenter />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">Modules</h2>
        <ModuleCarousel />
      </div>
    </div>
  )
}
