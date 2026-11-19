import { toAr } from '../../lib/arabic'
import ProgressBar from '../ProgressBar'

export default function FoundCard({ found, total }: { found: number; total: number }) {
  return (
    <section className="rounded-card border border-line bg-card p-5">
      <p className="flex items-center justify-between text-lg font-bold">
        <span className="text-mut">تم العثور على</span>
        <span>
          {toAr(found)} من {toAr(total)}
        </span>
      </p>
      <ProgressBar value={(found / total) * 100} label="التقدم في القائمة" className="mt-3" />
    </section>
  )
}
