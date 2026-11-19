import { useMemo, useState } from 'react'
import Page from '../components/Page'
import SearchBox from '../components/SearchBox'
import Tabs, { type TabItem } from '../components/Tabs'
import CategoryCard from '../components/CategoryCard'
import DailyBanner from '../components/DailyBanner'
import { categories, categoryQuestions } from '../data/categories'
import { toAr, normalizeArabic } from '../lib/arabic'
import { solvedIn, startedIn } from '../lib/stats'
import { useProgressStore } from '../store/progressStore'

type Filter = 'all' | 'popular' | 'new' | 'done'

const tabs: TabItem<Filter>[] = [
  { id: 'all', label: 'الكل' },
  { id: 'popular', label: 'الأكثر لعبًا' },
  { id: 'new', label: 'جديد' },
  { id: 'done', label: 'أكملتها' },
]

export default function Categories() {
  const progress = useProgressStore((s) => s.progress)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const rows = useMemo(() => {
    const q = normalizeArabic(query)
    return categories
      .map((c) => {
        const questions = categoryQuestions(c)
        return {
          category: c,
          total: questions.length,
          solved: solvedIn(progress, questions),
          started: startedIn(progress, questions),
        }
      })
      .filter(({ category }) => {
        if (!q) return true
        return (
          normalizeArabic(category.name).includes(q) ||
          category.topics.some((t) => normalizeArabic(t.name).includes(q))
        )
      })
      .filter((r) => {
        if (filter === 'popular') return r.started > 0
        if (filter === 'new') return r.started === 0
        if (filter === 'done') return r.total > 0 && r.solved === r.total
        return true
      })
      .sort((a, b) => (filter === 'popular' ? b.started - a.started : 0))
  }, [progress, query, filter])

  return (
    <Page>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-black sm:text-5xl">اختر فئة</h1>
          <p className="mt-3 text-lg text-mut">كل فئة فيها مواضيع، وكل موضوع فيه أسئلة. ابدأ من أي مكان.</p>
        </div>
        <SearchBox value={query} onChange={setQuery} placeholder="ابحث عن فئة أو لعبة" />
      </div>

      <div className="mt-8">
        <DailyBanner />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <Tabs items={tabs} value={filter} onChange={setFilter} label="تصفية الفئات" />
        <span className="text-base font-bold text-mut">{toAr(rows.length)} فئات</span>
      </div>

      {rows.length === 0 ? (
        <p className="mt-10 text-lg text-mut">ما لقينا فئة بهذا الاسم. جرّب كلمة ثانية.</p>
      ) : (
        <div className="mt-6 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {rows.map(({ category, total, solved }) => (
            <CategoryCard key={category.id} category={category} total={total} solved={solved} />
          ))}
        </div>
      )}
    </Page>
  )
}
