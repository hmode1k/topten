import { Link } from 'react-router-dom'
import { toAr } from '../../lib/arabic'
import Chip, { type ChipTone } from '../Chip'

export interface RecentRow {
  id: string
  title: string
  category: string
  found: number
  total: number
  won: boolean
  day: string
}

export default function RecentGames({ rows }: { rows: RecentRow[] }) {
  return (
    <section className="rounded-card border border-line bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">آخر ألعابك</h2>
        <Link to="/categories" className="text-base font-bold text-brand hover:underline">
          العب المزيد
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="mt-5 text-lg text-mut">ما لعبت أي جولة بعد. ابدأ من الفئات.</p>
      ) : (
        <ul className="mt-4 list-none divide-y divide-line p-0">
          {rows.map((r, i) => {
            const tone: ChipTone = r.won ? 'mint' : r.found >= r.total / 2 ? 'violet' : 'pink'
            return (
              <li key={`${r.id}-${i}`} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="truncate text-xl font-black">{r.title}</p>
                  <p className="text-sm text-soft">{r.category}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <Chip tone={tone}>
                    {toAr(r.found)} من {toAr(r.total)}
                  </Chip>
                  <span className="w-16 text-base font-bold text-mut">{r.day}</span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
