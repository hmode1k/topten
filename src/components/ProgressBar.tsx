export default function ProgressBar({
  value,
  label,
  className = '',
}: {
  value: number // 0..100
  label?: string
  className?: string
}) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className={`h-2.5 w-full overflow-hidden rounded-full bg-track ${className}`}
    >
      {/* In RTL the fill starts from the right (inline-start) on its own */}
      <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
    </div>
  )
}
