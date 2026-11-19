import type { ReactNode } from 'react'
import { Lock } from 'lucide-react'

export interface Achievement {
  id: string
  title: string
  detail: string
  unlocked: boolean
  icon: ReactNode
}

/** Locked achievements are dimmed and show a lock. */
export default function Achievements({ items }: { items: Achievement[] }) {
  return (
    <section className="rounded-card border border-line bg-card p-6">
      <h2 className="text-2xl font-black">إنجازاتك</h2>
      <ul className="mt-5 list-none space-y-3 p-0">
        {items.map((a) => (
          <li key={a.id} className={`flex items-center gap-4 ${a.unlocked ? '' : 'opacity-50'}`}>
            <span
              aria-hidden="true"
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-[14px] ${
                a.unlocked ? 'bg-brand-tint text-brand' : 'bg-track text-soft'
              }`}
            >
              {a.unlocked ? a.icon : <Lock className="h-5 w-5" />}
            </span>
            <div>
              <p className="text-lg font-black">{a.title}</p>
              <p className="text-sm text-mut">{a.detail}</p>
            </div>
            {!a.unlocked && <span className="sr-only">مقفلة</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}
