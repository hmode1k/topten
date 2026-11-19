import { Link } from 'react-router-dom'
import type { Category } from '../types'
import { toAr } from '../lib/arabic'
import CategoryIcon from './CategoryIcon'
import ProgressBar from './ProgressBar'

export default function CategoryCard({
  category,
  total,
  solved,
}: {
  category: Category
  total: number
  solved: number
}) {
  return (
    <Link
      to={`/categories/${category.id}`}
      className="block rounded-card border border-line bg-card p-6 transition-colors hover:bg-card2"
    >
      <CategoryIcon icon={category.icon} tint={category.tint} />
      <h3 className="mt-6 text-2xl font-black">{category.name}</h3>
      <ProgressBar value={total ? (solved / total) * 100 : 0} label={`تقدمك في ${category.name}`} className="mt-5" />
      <p className="mt-3 flex items-center justify-between text-base font-bold text-mut">
        <span>{toAr(total)} سؤالًا</span>
        <span>حللت {toAr(solved)}</span>
      </p>
    </Link>
  )
}
