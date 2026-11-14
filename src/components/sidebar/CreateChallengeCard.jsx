/**
 * White call-to-action card: "make your own challenge".
 *
 * Props: onCreate  called when the button is pressed (no page exists for
 * this yet; hook it up to your router when you build it).
 */
import { t } from '../../content/strings.js';
import Button from '../ui/Button.jsx';

export default function CreateChallengeCard({ onCreate }) {
  return (
    <section id="leaderboard" className="rounded-2xl bg-white p-4 text-ink">
      <h2 className="mb-1 font-display text-lg font-extrabold">{t.sidebar.createTitle}</h2>
      <p className="mb-3 text-sm leading-relaxed text-muted">{t.sidebar.createText}</p>
      <Button className="w-full" onClick={onCreate}>
        {t.sidebar.createButton}
      </Button>
    </section>
  );
}
