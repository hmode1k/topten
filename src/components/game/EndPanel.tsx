import { Link } from 'react-router-dom'
import { formatTime, toAr } from '../../lib/arabic'
import { MAX_MISTAKES, foundCount, type GameState } from '../../lib/gameLogic'
import { Button, ButtonLink } from '../Button'

/**
 * Temporary end-of-round panel shown on the game screen.
 * The full Results page is not designed yet; replace this once the owner approves it.
 */
export default function EndPanel({
  game,
  total,
  topicPath,
  nextId,
  onRetry,
}: {
  game: GameState
  total: number
  topicPath: string
  nextId?: string
  onRetry: () => void
}) {
  const won = game.status === 'won'
  return (
    <section
      aria-live="polite"
      className={`rounded-card border p-6 ${won ? 'border-brand/50 bg-brand-tint' : 'border-pink/40 bg-pink-tint'}`}
    >
      <h2 className="text-3xl font-black">{won ? 'أحسنت! أكملت القائمة' : 'انتهت الجولة'}</h2>
      <p className="mt-2 text-lg text-mut">
        وجدت {toAr(foundCount(game))} من {toAr(total)}، وأخطأت {toAr(game.mistakes)} من {toAr(MAX_MISTAKES)}، في{' '}
        {formatTime(game.seconds)}.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={onRetry}>العب مرة ثانية</Button>
        {nextId && (
          <ButtonLink to={`/play/${nextId}`} variant="secondary">
            السؤال التالي
          </ButtonLink>
        )}
        <Link
          to={topicPath}
          className="inline-flex h-12 items-center whitespace-nowrap px-4 font-bold text-mut hover:text-ink"
        >
          كل الأسئلة
        </Link>
      </div>
    </section>
  )
}
