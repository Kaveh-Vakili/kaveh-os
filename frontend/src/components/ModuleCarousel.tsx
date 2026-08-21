import { useState } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import { MODULES } from "../app/modules"
import { CarouselCard } from "./CarouselCard"

const CARD_WIDTH = 260
const GAP = 20
const STEP = CARD_WIDTH + GAP

export function ModuleCarousel() {
  const [active, setActive] = useState(0)
  const x = useMotionValue(0)
  const trackWidth = MODULES.length * STEP - GAP

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(MODULES.length - 1, index))
    setActive(clamped)
    animate(x, -clamped * STEP, { type: "spring", stiffness: 300, damping: 32 })
  }

  const handleDragEnd = () => {
    const nearest = Math.round(-x.get() / STEP)
    goTo(nearest)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-5"
          style={{ x, width: trackWidth }}
          drag="x"
          dragConstraints={{ left: -STEP * (MODULES.length - 1), right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
        >
          {MODULES.map((mod, i) => (
            <CarouselCard key={mod.id} mod={mod} active={i === active} />
          ))}
        </motion.div>
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {MODULES.map((mod, i) => (
          <button
            key={mod.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${mod.label}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-starlight" : "w-1.5 bg-ink-soft/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
