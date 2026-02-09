export default function FileGridLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
        >
          <div className="mb-3 h-40 w-full rounded-lg bg-slate-200" />
          <div className="mb-2 h-4 w-3/4 rounded bg-slate-200" />
          <div className="mb-1 h-3 w-1/3 rounded bg-slate-200" />
          <div className="h-3 w-1/2 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  )
}
