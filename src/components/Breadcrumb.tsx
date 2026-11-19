import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface Crumb {
  label: string
  to?: string
}

/** Back button on the start (right) side, then the trail. The last crumb is the current page. */
export default function Breadcrumb({ back, items }: { back: Crumb & { to: string }; items: Crumb[] }) {
  return (
    <nav aria-label="مسار التنقل" className="flex flex-wrap items-center gap-3 text-base">
      <Link
        to={back.to}
        className="inline-flex h-10 items-center gap-2 rounded-[12px] border border-line bg-card px-4 font-bold hover:bg-card2"
      >
        <ChevronRight aria-hidden="true" className="h-4 w-4 text-mut" />
        {back.label}
      </Link>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.to && !last ? (
                <Link to={item.to} className="text-mut hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'font-bold' : 'text-mut'}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronLeft aria-hidden="true" className="h-4 w-4 text-soft" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
