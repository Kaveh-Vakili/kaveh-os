import { MODULES } from "./modules"
import { ModuleTile } from "../components/ModuleTile"

export function OverviewPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold text-ink">Overview</h1>
      <p className="mb-8 text-sm text-ink-soft">Your day at a glance.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((mod, i) => (
          <ModuleTile key={mod.id} mod={mod} index={i} />
        ))}
      </div>
    </div>
  )
}
