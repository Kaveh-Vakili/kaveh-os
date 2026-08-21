import { useState, type FormEvent } from "react"
import { Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useAuth } from "./AuthContext"
import { Starfield } from "../components/Starfield"

export function LoginPage() {
  const { session, signIn, signUp } = useAuth()
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (session) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    const { error } = mode === "signin" ? await signIn(email, password) : await signUp(email, password)

    setSubmitting(false)
    if (error) setError(error)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-nightsky px-4">
      <Starfield />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative w-full max-w-lg rounded-lg bg-parchment p-10 shadow-2xl shadow-starlight/10"
      >
        <h1 className="mb-1 font-display text-3xl font-semibold text-ink">Kaveh OS</h1>
        <p className="mb-6 text-sm text-ink-soft">
          {mode === "signin" ? "Welcome back." : "Create your account."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-starlight focus:ring-2 focus:ring-starlight/30"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-starlight focus:ring-2 focus:ring-starlight/30"
          />

          {error && <p className="text-sm text-rose">{error}</p>}

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-md bg-nightsky px-3 py-2 font-display text-sm font-medium tracking-wide text-starlight transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
          </motion.button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 text-sm text-ink-soft underline decoration-dotted underline-offset-2"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </motion.div>
    </div>
  )
}
