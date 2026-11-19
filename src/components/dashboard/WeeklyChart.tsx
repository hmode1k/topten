import { toAr } from '../../lib/arabic'
import Chip from '../Chip'

export const weekdayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']

/** Last 7 days, oldest first (so the newest day ends on the left in RTL). Today is mint. */
export default function WeeklyChart({ days }: { days: { date: string; weekday: number; count: number }[] }) {
  const max = Math.max(1, ...days.map((d) => d.count))
  const total = days.reduce((n, d) => n + d.count, 0)

  return (
    <section className="rounded-card border border-line bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">نشاطك هذا الأسبوع</h2>
        <Chip tone="mint">{toAr(total)} أسئلة</Chip>
      </div>

      <ul className="mt-6 flex h-52 list-none items-end gap-3 p-0">
        {days.map((d, i) => {
          const today = i === days.length - 1
          const height = d.count === 0 ? 6 : 14 + (d.count / max) * 86
          return (
            <li key={d.date} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div
                role="img"
                aria-label={`${weekdayNames[d.weekday]}: ${toAr(d.count)} أسئلة`}
                className={`w-full max-w-[56px] rounded-[10px] border ${
                  today ? 'border-brand bg-brand' : 'border-violet bg-violet-tint'
                }`}
                style={{ height: `${height}%` }}
              />
              <span className="text-sm font-bold text-mut">{weekdayNames[d.weekday]}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
