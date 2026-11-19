import { formatTime, toAr } from '../../lib/arabic'
import { MAX_MISTAKES } from '../../lib/gameLogic'
import WrongChips from './WrongChips'

export default function MistakesCard({
  mistakes,
  seconds,
  wrong,
}: {
  mistakes: number
  seconds: number
  wrong: string[]
}) {
  return (
    <section className="rounded-card border border-line bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-base font-bold text-mut">الأخطاء</p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="text-5xl font-black">{toAr(mistakes)}</span>
            <span className="text-lg font-bold text-soft">من {toAr(MAX_MISTAKES)}</span>
          </p>
        </div>
        <div className="text-start">
          <p className="text-base font-bold text-mut">الوقت</p>
          <p className="mt-2 text-4xl font-black tabular-nums" dir="ltr">
            {formatTime(seconds)}
          </p>
        </div>
      </div>

      {/* The first pip is on the right in RTL */}
      <div className="mt-4 flex gap-2" aria-hidden="true">
        {Array.from({ length: MAX_MISTAKES }, (_, i) => (
          <span key={i} className={`h-2.5 flex-1 rounded-full ${i < mistakes ? 'bg-pink' : 'bg-track'}`} />
        ))}
      </div>

      <WrongChips wrong={wrong} />
    </section>
  )
}
