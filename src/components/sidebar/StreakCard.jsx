/**
 * Dark card showing the player's day streak.
 *
 * Props: days (number)
 */
import { t } from '../../content/strings.js';

export default function StreakCard({ days }) {
  return (
    <section className="rounded-2xl border border-forest-line bg-forest-panel p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-extrabold">{t.sidebar.streakTitle}</h2>
        <span className="font-display text-3xl font-black text-gold">{days}</span>
      </div>
      <p className="mt-0.5 text-[13px] text-muted-dark">{t.sidebar.streakHint}</p>
    </section>
  );
}
