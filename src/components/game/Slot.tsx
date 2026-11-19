import type { Answer } from '../../types'
import { toAr } from '../../lib/arabic'

/** One of the 10 ranked slots: empty, filled, or (after a loss) revealed as missed. */
export default function Slot({
  rank,
  answer,
  newest = false,
  missed,
  tag,
}: {
  rank: number
  answer?: Answer // set when the player found it
  newest?: boolean
  missed?: Answer // set after the round is lost, for answers the player did not find
  tag?: string
}) {
  const filled = Boolean(answer)
  const revealed = Boolean(missed)

  const box = filled
    ? `border-2 border-violet bg-violet-tint ${newest ? 'ring-4 ring-brand/30 anim-fill' : ''}`
    : revealed
      ? 'border border-line bg-card'
      : 'border-2 border-dashed border-line bg-card/50'

  const tile = filled ? 'bg-brand text-brand-ink' : 'bg-track text-soft'

  return (
    <li className={`flex h-[72px] items-center gap-4 rounded-[16px] px-4 sm:h-20 ${box}`}>
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-[12px] text-2xl font-black ${tile}`}
        aria-hidden="true"
      >
        {toAr(rank)}
      </span>

      {filled && <span className="truncate text-[22px] font-extrabold sm:text-[25px]">{answer!.label}</span>}
      {revealed && <span className="truncate text-[22px] font-bold text-soft sm:text-[25px]">{missed!.label}</span>}
      {!filled && !revealed && <span aria-hidden="true" className="h-1 w-8 rounded-full bg-track" />}

      {rank === 1 && tag && (filled || revealed) && (
        <span className="ms-auto text-sm font-bold text-brand">{tag}</span>
      )}

      <span className="sr-only">
        {filled ? `المركز ${toAr(rank)}: ${answer!.label}` : revealed ? `لم تجدها، المركز ${toAr(rank)}: ${missed!.label}` : `المركز ${toAr(rank)}: فارغ`}
      </span>
    </li>
  )
}
