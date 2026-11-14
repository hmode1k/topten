/**
 * Row under the status chip:
 *   "found X of 10"  |  progress bar  |  mistake dots
 *
 * Mistake dots: one per allowed mistake. Empty ring = still available,
 * filled red = used.
 *
 * Props: found, total, mistakes, maxMistakes
 */
import { t } from '../../content/strings.js';

export default function ProgressRow({ found, total, mistakes, maxMistakes }) {
  const percent = total > 0 ? (found / total) * 100 : 0;

  return (
    <div className="mt-1 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
      <span className="whitespace-nowrap text-sm font-bold text-ink">{t.game.foundCount(found, total)}</span>

      {/* Progress bar (decorative; the text above carries the value) */}
      <div className="h-1.5 min-w-[80px] flex-1 overflow-hidden rounded-full bg-slot-line" aria-hidden="true">
        <div className="h-full rounded-full bg-pine transition-all duration-300" style={{ width: `${percent}%` }} />
      </div>

      {/* Mistakes */}
      <div className="flex items-center gap-1.5" role="img" aria-label={`${t.game.mistakesLabel}: ${mistakes}/${maxMistakes}`}>
        <span className="text-[13px] text-muted">{t.game.mistakesLabel}</span>
        {Array.from({ length: maxMistakes }, (_, i) => (
          <span
            key={i}
            className={`h-4 w-4 rounded-full border-[3px] transition-colors ${
              i < mistakes ? 'border-danger bg-danger' : 'border-pine bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
