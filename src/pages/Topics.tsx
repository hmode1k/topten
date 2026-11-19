import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Page from '../components/Page'
import Breadcrumb from '../components/Breadcrumb'
import SearchBox from '../components/SearchBox'
import Tabs, { type TabItem } from '../components/Tabs'
import TopicCard from '../components/TopicCard'
import CategoryIcon from '../components/CategoryIcon'
import { categoryQuestions, findCategory } from '../data/categories'
import { normalizeArabic, toAr } from '../lib/arabic'
import { solvedIn, startedIn } from '../lib/stats'
import { useProgressStore } from '../store/progressStore'
import type { Tint } from '../types'

const tintCycle: Tint[] = ['mint', 'violet', 'pink', 'blue']

type Filter = 'all' | 'started' | 'new'

const tabs: TabItem<Filter>[] = [
  { id: 'all', label: 'الكل' },
  { id: 'started', label: 'ألعاب بدأتها' },
  { id: 'new', label: 'ألعاب جديدة' },
]

export default function Topics() {
  const { cat = '' } = useParams()
  const category = findCategory(cat)
  const progress = useProgressStore((s) => s.progress)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const rows = useMemo(() => {
    if (!category) return []
    const q = normalizeArabic(query)
    return category.topics
      .map((topic) => ({
        topic,
        solved: solvedIn(progress, topic.questions),
        started: startedIn(progress, topic.questions) > 0,
      }))
      .filter(({ topic }) => !q || normalizeArabic(topic.name).includes(q))
      .filter((r) => (filter === 'started' ? r.started : filter === 'new' ? !r.started : true))
  }, [category, progress, query, filter])

  if (!category) {
    return (
      <Page>
        <h1 className="text-3xl font-black">ما لقينا هذه الفئة</h1>
        <Link to="/categories" className="mt-4 inline-block font-bold text-brand hover:underline">
          ارجع للفئات
        </Link>
      </Page>
    )
  }

  const questions = categoryQuestions(category)

  return (
    <Page>
      <Breadcrumb
        back={{ label: 'الفئات', to: '/categories' }}
        items={[{ label: 'الفئات', to: '/categories' }, { label: category.name }]}
      />

      <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
        <div className="flex items-center gap-5">
          <CategoryIcon icon={category.icon} tint={category.tint} size={80} />
          <div>
            <h1 className="text-4xl font-black sm:text-5xl">{category.name}</h1>
            <p className="mt-2 text-lg text-mut">
              اختر لعبة وابدأ بأسئلتها. حللت {toAr(solvedIn(progress, questions))} من {toAr(questions.length)} سؤالًا
              في هذه الفئة.
            </p>
          </div>
        </div>
        <SearchBox value={query} onChange={setQuery} placeholder="ابحث عن لعبة" />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <Tabs items={tabs} value={filter} onChange={setFilter} label="تصفية المواضيع" />
        <span className="text-base font-bold text-mut">{toAr(rows.length)} مواضيع</span>
      </div>

      {category.topics.length === 0 ? (
        <p className="mt-10 text-lg text-mut">لا توجد مواضيع في هذه الفئة بعد.</p>
      ) : rows.length === 0 ? (
        <p className="mt-10 text-lg text-mut">ما لقينا نتائج. جرّب تصفية ثانية.</p>
      ) : (
        <div className="mt-6 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {rows.map(({ topic, solved, started }) => (
            <TopicCard
              key={topic.id}
              categoryId={category.id}
              topic={topic}
              tint={tintCycle[category.topics.indexOf(topic) % tintCycle.length]}
              started={started}
              solved={solved}
            />
          ))}
        </div>
      )}
    </Page>
  )
}
