import { Zap } from 'lucide-react'
import { allQuestions, findQuestion } from '../data/categories'
import { pickDaily } from '../lib/daily'
import { ButtonLink } from './Button'

/** Daily-challenge banner. Shows today's pick (one question per day, same for everyone). */
export default function DailyBanner() {
  const daily = pickDaily(allQuestions)
  const located = daily ? findQuestion(daily.id) : undefined
  if (!daily || !located) return null

  return (
    <section
      className="flex flex-wrap items-center justify-between gap-5 rounded-card border border-[#6D45E0] p-6"
      style={{ background: 'linear-gradient(110deg,#3B2290,#5B34D6)' }}
    >
      <div className="flex items-center gap-5">
        <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-[16px] bg-brand text-brand-ink">
          <Zap className="h-7 w-7" />
        </span>
        <div>
          <p className="text-base font-bold text-mut">تحدي اليوم</p>
          <h2 className="mt-1 text-2xl font-black sm:text-[32px]">
            {daily.title} في {located.topic.name}
          </h2>
        </div>
      </div>
      <ButtonLink to={`/play/${daily.id}`}>العب الآن</ButtonLink>
    </section>
  )
}
