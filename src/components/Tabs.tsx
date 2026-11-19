export interface TabItem<T extends string> {
  id: T
  label: string
}

export default function Tabs<T extends string>({
  items,
  value,
  onChange,
  label,
}: {
  items: TabItem<T>[]
  value: T
  onChange: (id: T) => void
  label: string
}) {
  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = item.id === value
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={`h-11 whitespace-nowrap rounded-btn px-5 text-base font-bold transition-colors ${
              active ? 'bg-violet text-white' : 'border border-line text-mut hover:bg-card'
            }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
