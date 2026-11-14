/**
 * Small pill under the guess box showing feedback ("إجابة صحيحة", ...).
 *
 * The wrapper always reserves its height, so the layout does not jump when a
 * message appears or disappears, and is an aria-live region so screen readers
 * announce each new message.
 *
 * Props: feedback  { tone: 'success' | 'error' | 'info', text } | null
 */
import { TONE } from '../../hooks/useTop10Game.js';
import { CheckIcon } from '../ui/Icons.jsx';

const TONE_CLASSES = {
  [TONE.SUCCESS]: 'bg-mint text-ink',
  [TONE.ERROR]: 'bg-danger-soft text-danger',
  [TONE.INFO]: 'bg-slot text-muted',
};

export default function StatusChip({ feedback }) {
  return (
    <div className="mt-2 flex min-h-[28px] justify-center" aria-live="polite">
      {feedback && (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-sm font-bold ${TONE_CLASSES[feedback.tone]}`}
        >
          {feedback.tone === TONE.SUCCESS && <CheckIcon className="h-3.5 w-3.5" />}
          {feedback.text}
        </span>
      )}
    </div>
  );
}
