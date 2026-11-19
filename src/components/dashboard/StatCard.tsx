import type { ReactNode } from 'react'

export default function StatCard({
  icon,
  label,
  value,
  sub,
  iconBg,
  iconFg,
}: {
  icon: ReactNode
  label: string
  value: ReactNode
  sub?: string
  iconBg: string
  iconFg: string
}) {
  return (
    <div className="flex items-center gap-4 rounded-card border border-line bg-card p-5">
      <span
        aria-hidden="true"
        className="grid h-14 w-14 shrink-0 place-items-center rounded-[16px]"
        style={{ background: iconBg, color: iconFg }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-base font-bold text-mut">{label}</p>
        <p className="text-4xl font-black leading-tight">{value}</p>
        {sub && <p className="truncate text-sm text-soft">{sub}</p>}
      </div>
    </div>
  )
}
