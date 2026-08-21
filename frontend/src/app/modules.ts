export type ModuleDef = {
  id: string
  label: string
  path: string
  emoji: string
  description: string
  status: "online" | "pending"
}

export const MODULES: ModuleDef[] = [
  { id: "health", label: "Health", path: "/health", emoji: "\u{1FAC0}", description: "Sleep, steps, heart rate, workouts", status: "pending" },
  { id: "finance", label: "Finance", path: "/finance", emoji: "\u{1F4B0}", description: "Spending, balances, net worth", status: "pending" },
  { id: "leetcode", label: "Leetcode", path: "/leetcode", emoji: "\u{1F9E9}", description: "Streaks, difficulty, weak spots", status: "pending" },
  { id: "assistant", label: "Assistant", path: "/assistant", emoji: "✨", description: "Insights from your local model", status: "pending" },
  { id: "calendar", label: "Calendar", path: "/calendar", emoji: "\u{1F5D3}️", description: "Events and notifications", status: "pending" },
  { id: "news", label: "News", path: "/news", emoji: "\u{1F4F0}", description: "Reading list and headlines", status: "pending" },
]
