import { toAr } from '../../lib/arabic'
import { Button } from '../Button'

export default function GameActions({
  hintsLeft,
  hintText,
  onHint,
  onSkip,
  onGiveUp,
  canSkip,
}: {
  hintsLeft: number
  hintText: string | null
  onHint: () => void
  onSkip: () => void
  onGiveUp: () => void
  canSkip: boolean
}) {
  return (
    <div className="space-y-3">
      <Button
        variant="secondary"
        onClick={onHint}
        disabled={hintsLeft === 0}
        className="h-14 w-full rounded-[18px] bg-card disabled:opacity-50"
      >
        كشف تلميح
        <span className="rounded-full bg-violet-tint px-2.5 py-0.5 text-sm text-brand">
          متبقي {toAr(hintsLeft)}
        </span>
      </Button>

      {hintText && (
        <p role="note" className="rounded-[14px] border border-line bg-card2 px-4 py-3 text-base text-mut">
          {hintText}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={onSkip} disabled={!canSkip} className="h-14 rounded-[18px] bg-card disabled:opacity-50">
          تخطي
        </Button>
        <Button variant="secondary" onClick={onGiveUp} className="h-14 rounded-[18px] bg-card">
          استسلام
        </Button>
      </div>
    </div>
  )
}
