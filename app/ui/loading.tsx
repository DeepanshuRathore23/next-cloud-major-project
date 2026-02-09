export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-muted opacity-25" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
        </div>

        {/* Text */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading, please wait…
        </p>
      </div>
    </div>
  )
}
