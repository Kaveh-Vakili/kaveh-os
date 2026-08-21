import { NavLink, Outlet } from "react-router-dom"
import { MODULES } from "./modules"
import { useAuth } from "./AuthContext"

export function AppShell() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-parchment">
      <nav className="sticky top-0 z-10 bg-nightsky text-parchment shadow-lg shadow-black/20">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
          <NavLink to="/" className="text-lg font-semibold tracking-wide text-starlight">
            Kaveh OS
          </NavLink>

          <div className="flex flex-1 flex-wrap gap-1">
            {MODULES.map((mod) => (
              <NavLink
                key={mod.id}
                to={mod.path}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-nightsky-light text-starlight"
                      : "text-parchment-soft hover:bg-nightsky-light hover:text-starlight"
                  }`
                }
              >
                {mod.emoji} {mod.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3 text-sm text-parchment-soft">
            <span className="hidden sm:inline">{user?.email}</span>
            <button
              type="button"
              onClick={signOut}
              className="rounded-full border border-parchment-soft/30 px-3 py-1.5 transition-colors hover:border-starlight hover:text-starlight"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
