import { Link } from 'react-router-dom'
import type { Tint, Topic } from '../types'
import { toAr } from '../lib/arabic'
import Chip from './Chip'
import ProgressBar from './ProgressBar'
import { tintStyles } from './CategoryIcon'
import { Check } from 'lucide-react'

export default function TopicCard({
  categoryId,
  topic,
  tint,
  started,
  solved,
}: {
  categoryId: string
  topic: Topic
  tint: Tint
  started: boolean
  solved: number
}) {
  const total = topic.questions.length
  const { bg, fg } = tintStyles[tint]
  return (
    <Link
      to={`/categories/${categoryId}/${topic.id}`}
      className="block rounded-card border border-line bg-card p-6 transition-colors hover:bg-card2"
    >
      <div className="flex items-start justify-between">
        <span
          aria-hidden="true"
          className="grid h-14 w-14 place-items-center rounded-[16px] text-3xl font-black"
          style={{ background: bg, color: fg }}
        >
          {topic.name[0]}
        </span>
        {started ? (
          <Chip tone="mint">
            <Check aria-hidden="true" className="h-3.5 w-3.5" />
            بدأت
          </Chip>
        ) : (
          <Chip>جديد</Chip>
        )}
      </div>
      <h3 className="mt-5 text-2xl font-black">{topic.name}</h3>
      <ProgressBar value={total ? (solved / total) * 100 : 0} label={`تقدمك في ${topic.name}`} className="mt-4" />
      <p className="mt-3 flex items-center justify-between text-base font-bold text-mut">
        <span>{toAr(total)} أسئلة</span>
        <span>
          حللت {toAr(solved)} من {toAr(total)}
        </span>
      </p>
    </Link>
  )
}
