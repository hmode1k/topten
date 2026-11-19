import { Search } from 'lucide-react'

export default function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  return (
    <label className="relative block w-full md:w-[420px]">
      <span className="sr-only">{placeholder}</span>
      <Search aria-hidden="true" className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-soft" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-14 w-full rounded-[18px] border border-line bg-card ps-12 pe-4 text-base text-ink placeholder:text-soft focus:border-violet focus:outline-none"
      />
    </label>
  )
}
