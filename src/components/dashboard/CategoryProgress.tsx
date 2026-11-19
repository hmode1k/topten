import { toAr } from '../../lib/arabic'
import ProgressBar from '../ProgressBar'

export interface CategoryRow {
  id: string
  name: string
  solved: number
  total: number
}

export default function CategoryProgress({ rows }: { rows: CategoryRow[] }) {
  return (
    <section className="rounded-card border border-line bg-card p-6">
      <h2 className="text-2xl font-black">التقدم حسب الفئة</h2>
      <ul className="mt-5 list-none space-y-4 p-0">
        {rows.map((r) => (
          <li key={r.id}>
            <p className="mb-2 flex items-center justify-between text-base font-bold">
              <span>{r.name}</span>
              <span className="text-mut">
                {toAr(r.solved)} من {toAr(r.total)}
              </span>
            </p>
            <ProgressBar value={r.total ? (r.solved / r.total) * 100 : 0} label={`تقدمك في ${r.name}`} />
          </li>
        ))}
      </ul>
    </section>
  )
}
