/** Wrong guesses, struck through, in the pink tokens. */
export default function WrongChips({ wrong }: { wrong: string[] }) {
  if (wrong.length === 0) return null
  return (
    <ul aria-label="تخمينات خاطئة" className="mt-4 flex list-none flex-wrap gap-2 p-0">
      {wrong.map((w, i) => (
        <li
          key={`${w}-${i}`}
          className="rounded-full bg-pink-tint px-4 py-1.5 text-base font-bold text-pink line-through"
        >
          {w}
        </li>
      ))}
    </ul>
  )
}
