export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-foreground-soft">This module hasn't been built yet.</p>
    </div>
  )
}
