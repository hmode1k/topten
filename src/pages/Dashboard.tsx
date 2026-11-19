import { Check, Clock, Flame, Star, Target, Trophy } from 'lucide-react'
import Page from '../components/Page'
import ProgressBar from '../components/ProgressBar'
import { ButtonLink } from '../components/Button'
import StatCard from '../components/dashboard/StatCard'
import WeeklyChart, { weekdayNames } from '../components/dashboard/WeeklyChart'
import CategoryProgress from '../components/dashboard/CategoryProgress'
import RecentGames from '../components/dashboard/RecentGames'
import Achievements, { type Achievement } from '../components/dashboard/Achievements'
import { allQuestions, categories, categoryQuestions, findQuestion } from '../data/categories'
import { formatTime, toAr } from '../lib/arabic'
import { MOCK_GLOBAL_RANK, MOCK_PLAYER_NAME } from '../lib/mock'
import { dateKey, yesterdayKey } from '../lib/storage'
import { overview, solvedIn, weeklyActivity } from '../lib/stats'
import { useProgressStore } from '../store/progressStore'

function dayLabel(iso: string): string {
  const key = dateKey(new Date(iso))
  if (key === dateKey()) return 'اليوم'
  if (key === yesterdayKey()) return 'أمس'
  return weekdayNames[new Date(iso).getDay()]
}

export default function Dashboard() {
  const progress = useProgressStore((s) => s.progress)
  const stats = overview(progress)
  const total = allQuestions.length
  const remaining = total - stats.solved
  const percent = total ? Math.round((stats.solved / total) * 100) : 0

  // "كمّل اللعب": a round in progress first, otherwise the first unsolved question
  const resumeId =
    allQuestions.find((q) => progress.saved[q.id])?.id ??
    allQuestions.find((q) => !progress.results[q.id]?.won)?.id ??
    allQuestions[0]?.id

  const bestWin = Object.values(progress.results)
    .filter((r) => r.won)
    .sort((a, b) => a.seconds - b.seconds)[0]
  const bestWinTitle = bestWin ? findQuestion(bestWin.questionId)?.question.title : undefined

  const categoryRows = categories.map((c) => {
    const qs = categoryQuestions(c)
    return { id: c.id, name: c.name, solved: solvedIn(progress, qs), total: qs.length }
  })

  const recent = [...progress.history]
    .reverse()
    .slice(0, 4)
    .flatMap((r) => {
      const located = findQuestion(r.questionId)
      if (!located) return []
      return [
        {
          id: r.questionId,
          title: `${located.question.title} في ${located.topic.name}`,
          category: located.category.name,
          found: r.found,
          total: located.question.answers.length,
          won: r.won,
          day: dayLabel(r.solvedAt),
        },
      ]
    })

  const minecraft = categories[0]?.topics[0]
  const topicDone = Boolean(minecraft && minecraft.questions.length > 0 && solvedIn(progress, minecraft.questions) === minecraft.questions.length)
  const flawless = progress.history.some((r) => r.won && r.mistakes === 0)

  const achievements: Achievement[] = [
    { id: 'first', title: 'بداية قوية', detail: 'أول سؤال محلول', unlocked: stats.solved >= 1, icon: <Star className="h-5 w-5" /> },
    { id: 'streak', title: 'سلسلة ٧ أيام', detail: 'لعبت ٧ أيام متتالية', unlocked: stats.streak >= 7, icon: <Flame className="h-5 w-5" /> },
    { id: 'flawless', title: 'بدون أخطاء', detail: 'حل سؤال بلا خطأ', unlocked: flawless, icon: <Target className="h-5 w-5" /> },
    {
      id: 'topic',
      title: `خبير ${minecraft?.name ?? ''}`,
      detail: `حل كل أسئلة ${minecraft?.name ?? 'اللعبة'}`,
      unlocked: topicDone,
      icon: <Trophy className="h-5 w-5" />,
    },
  ]

  return (
    <Page>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-black sm:text-5xl">أهلًا {MOCK_PLAYER_NAME}</h1>
          <p className="mt-3 text-lg text-mut">
            حللت {toAr(stats.solved)} سؤالًا من أصل {toAr(total)}. باقي {toAr(remaining)} سؤالًا بانتظارك.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 rounded-card border border-line bg-card px-5 py-3">
            <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-[12px] bg-violet-tint text-[#B79DFF]">
              <Trophy className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm text-soft">ترتيبك</p>
              <p className="text-lg font-black">
                المركز {toAr(MOCK_GLOBAL_RANK.position)} من {MOCK_GLOBAL_RANK.total.toLocaleString('ar-EG')}
              </p>
            </div>
          </div>
          {resumeId && <ButtonLink to={`/play/${resumeId}`}>كمّل اللعب</ButtonLink>}
        </div>
      </div>

      <div className="mt-8 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Check className="h-6 w-6" />}
          label="أسئلة محلولة"
          value={toAr(stats.solved)}
          sub={`من ${toAr(total)} سؤالًا`}
          iconBg="#1F2D3A"
          iconFg="#4ADE80"
        />
        <StatCard
          icon={<Target className="h-6 w-6" />}
          label="الدقة"
          value={stats.accuracy === null ? '—' : `${toAr(stats.accuracy)}٪`}
          sub="من كل تخميناتك"
          iconBg="#2E1B63"
          iconFg="#B79DFF"
        />
        <StatCard
          icon={<Clock className="h-6 w-6" />}
          label="أفضل وقت"
          value={<span dir="ltr">{stats.bestSeconds === null ? '—' : formatTime(stats.bestSeconds)}</span>}
          sub={bestWinTitle}
          iconBg="#1D2150"
          iconFg="#8EA2FF"
        />
        <StatCard
          icon={<Flame className="h-6 w-6" />}
          label="أيام متتالية"
          value={toAr(stats.streak)}
          sub="العب كل يوم لتزيد السلسلة"
          iconBg="#3B1635"
          iconFg="#FF6B93"
        />
      </div>

      <section className="mt-[18px] rounded-card border border-line bg-card p-6">
        <p className="mb-3 flex items-center justify-between text-lg font-black">
          <span>تقدمك الكلي في الموقع</span>
          <span className="text-brand">{toAr(percent)}٪</span>
        </p>
        <ProgressBar value={percent} label="التقدم الكلي" />
      </section>

      <div className="mt-[18px] grid gap-[18px] lg:grid-cols-[1.4fr_1fr]">
        <WeeklyChart days={weeklyActivity(progress)} />
        <CategoryProgress rows={categoryRows} />
      </div>

      <div className="mt-[18px] grid gap-[18px] lg:grid-cols-[1.4fr_1fr]">
        <RecentGames rows={recent} />
        <Achievements items={achievements} />
      </div>
    </Page>
  )
}
