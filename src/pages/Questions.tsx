import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Star, Trophy } from 'lucide-react'
import Page from '../components/Page'
import Breadcrumb from '../components/Breadcrumb'
import Tabs, { type TabItem } from '../components/Tabs'
import QuestionRow from '../components/QuestionRow'
import ProgressRing from '../components/ProgressRing'
import { ButtonLink } from '../components/Button'
import { tintStyles } from '../components/CategoryIcon'
import { findCategory, findTopic } from '../data/categories'
import { formatTime, toAr } from '../lib/arabic'
import { bestScore, questionStatus, solvedIn } from '../lib/stats'
import { MOCK_TOPIC_RANK } from '../lib/mock'
import { useProgressStore } from '../store/progressStore'
import type { Difficulty } from '../types'

type Filter = 'all' | 'unsolved' | 'solved'

const tabs: TabItem<Filter>[] = [
  { id: 'all', label: 'كل الأسئلة' },
  { id: 'unsolved', label: 'لم أحلها' },
  { id: 'solved', label: 'حللتها' },
]

export default function Questions() {
  const { cat = '', topic: topicId = '' } = useParams()
  const category = findCategory(cat)
  const topic = findTopic(cat, topicId)
  const progress = useProgressStore((s) => s.progress)
  const [filter, setFilter] = useState<Filter>('all')
  const [difficulty, setDifficulty] = useState<'all' | Difficulty>('all')

  const rows = useMemo(() => {
    if (!topic) return []
    return topic.questions
      .map((question, i) => ({ question, index: i + 1, status: questionStatus(progress, question.id) }))
      .filter((r) => (filter === 'solved' ? r.status === 'won' : filter === 'unsolved' ? r.status !== 'won' : true))
      .filter((r) => difficulty === 'all' || r.question.difficulty === difficulty)
  }, [topic, progress, filter, difficulty])

  if (!category || !topic) {
    return (
      <Page>
        <h1 className="text-3xl font-black">ما لقينا هذه اللعبة</h1>
        <Link to="/categories" className="mt-4 inline-block font-bold text-brand hover:underline">
          ارجع للفئات
        </Link>
      </Page>
    )
  }

  // Side card numbers, all derived from saved progress
  const total = topic.questions.length
  const solved = solvedIn(progress, topic.questions)
  const ids = new Set(topic.questions.map((q) => q.id))
  const rounds = progress.history.filter((r) => ids.has(r.questionId))
  const guesses = rounds.reduce((n, r) => n + r.found + r.mistakes, 0)
  const accuracy = guesses ? Math.round((rounds.reduce((n, r) => n + r.found, 0) / guesses) * 100) : null
  const wins = Object.values(progress.results).filter((r) => ids.has(r.questionId) && r.won)
  const bestTime = wins.length ? Math.min(...wins.map((r) => r.seconds)) : null
  const { bg, fg } = tintStyles[category.tint]

  return (
    <Page>
      <Breadcrumb
        back={{ label: category.name, to: `/categories/${category.id}` }}
        items={[
          { label: 'الفئات', to: '/categories' },
          { label: category.name, to: `/categories/${category.id}` },
          { label: topic.name },
        ]}
      />

      <div className="mt-8 flex items-center gap-5">
        <span
          aria-hidden="true"
          className="grid h-20 w-20 place-items-center rounded-[20px] text-4xl font-black"
          style={{ background: bg, color: fg }}
        >
          {topic.name[0]}
        </span>
        <div>
          <h1 className="text-4xl font-black sm:text-5xl">{topic.name}</h1>
          <p className="mt-2 text-lg text-mut">{toAr(total)} سؤالًا. اختر سؤالًا وابدأ الجولة.</p>
        </div>
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
        {/* Main column: first in the DOM, so it is on the right in RTL */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Tabs items={tabs} value={filter} onChange={setFilter} label="تصفية الأسئلة" />
            <label className="relative inline-flex items-center">
              <span className="sr-only">الصعوبة</span>
              <Star aria-hidden="true" className="pointer-events-none absolute start-4 h-4 w-4 text-mut" />
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'all' | Difficulty)}
                className="h-11 appearance-none rounded-btn border border-line bg-transparent ps-10 pe-5 text-base font-bold text-mut focus:border-violet focus:outline-none"
              >
                <option value="all">الصعوبة: الكل</option>
                <option value="easy">سهل</option>
                <option value="medium">متوسط</option>
                <option value="hard">صعب</option>
              </select>
            </label>
          </div>

          {rows.length === 0 ? (
            <p className="mt-8 text-lg text-mut">
              {total === 0 ? 'لا توجد أسئلة في هذه اللعبة بعد.' : 'ما لقينا أسئلة بهذه التصفية.'}
            </p>
          ) : (
            <ul className="mt-4 list-none divide-y divide-line overflow-hidden rounded-card border border-line bg-card p-0">
              {rows.map(({ question, index, status }) => (
                <QuestionRow
                  key={question.id}
                  index={index}
                  question={question}
                  status={status}
                  best={bestScore(progress, question.id)}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Side card: second in the DOM, so it is on the left in RTL */}
        <aside className="rounded-card border border-line bg-card p-6" aria-label={`تقدمك في ${topic.name}`}>
          <h2 className="text-xl font-black">تقدمك في {topic.name}</h2>
          <div className="mt-5 flex items-center gap-5">
            <ProgressRing percent={total ? (solved / total) * 100 : 0} />
            <div className="space-y-2 text-base font-bold text-mut">
              <p>
                حللت {toAr(solved)} من {toAr(total)} سؤالًا
              </p>
              <p>الدقة {accuracy === null ? '—' : `${toAr(accuracy)}٪`}</p>
            </div>
          </div>
          <dl className="mt-5 space-y-3 border-t border-line pt-5 text-base">
            <div className="flex items-center justify-between">
              <dt className="font-bold text-mut">أفضل وقت</dt>
              <dd className="font-black" dir="ltr">
                {bestTime === null ? '—' : formatTime(bestTime)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-bold text-mut">ترتيبك في {topic.name}</dt>
              <dd className="font-black">المركز {toAr(MOCK_TOPIC_RANK)}</dd>
            </div>
          </dl>
          <ButtonLink to="/leaderboard" variant="secondary" className="mt-5 w-full">
            <Trophy aria-hidden="true" className="h-4 w-4" />
            متصدرو {topic.name}
          </ButtonLink>
        </aside>
      </div>
    </Page>
  )
}
