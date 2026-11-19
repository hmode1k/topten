import { Check } from 'lucide-react'
import type { Question } from '../types'
import { toAr } from '../lib/arabic'
import type { QuestionStatus } from '../lib/stats'
import { ButtonLink } from './Button'
import Chip, { DifficultyChip } from './Chip'

const action: Record<QuestionStatus, { label: string; variant: 'primary' | 'secondary' }> = {
  new: { label: 'ابدأ', variant: 'primary' },
  playing: { label: 'كمّل', variant: 'primary' },
  won: { label: 'العب مرة ثانية', variant: 'secondary' },
}

export default function QuestionRow({
  index,
  question,
  status,
  best,
}: {
  index: number
  question: Question
  status: QuestionStatus
  best: number | null
}) {
  const act = action[status]
  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4">
      <span
        aria-hidden="true"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-track text-xl font-black text-mut"
      >
        {toAr(index)}
      </span>

      <h3 className="min-w-[160px] flex-1 text-xl font-black sm:text-2xl">{question.title}</h3>

      <DifficultyChip difficulty={question.difficulty} />

      {status === 'won' ? (
        <Chip tone="mint">
          <Check aria-hidden="true" className="h-3.5 w-3.5" />
          حللتها
        </Chip>
      ) : status === 'playing' ? (
        <Chip tone="violet">قيد اللعب</Chip>
      ) : (
        <Chip>جديد</Chip>
      )}

      <div className="w-24 text-center leading-tight">
        {best === null ? (
          <span className="text-soft">—</span>
        ) : (
          <>
            <p className="text-lg font-black">
              {toAr(best)} من {toAr(question.answers.length)}
            </p>
            <p className="text-xs text-soft">أفضل نتيجة</p>
          </>
        )}
      </div>

      <ButtonLink to={`/play/${question.id}`} variant={act.variant} size="sm" className="min-w-[110px]">
        {act.label}
      </ButtonLink>
    </li>
  )
}
