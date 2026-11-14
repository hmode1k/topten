/**
 * One numbered row of the answer grid.
 *
 * Three visual states (see SLOT in hooks/useTop10Game.js):
 *  - hidden : grey row with "؟؟؟؟؟؟"
 *  - found  : white row, gold border + badge, check mark
 *  - missed : revealed after the game ended; white row, muted, no check
 *
 * Props: rank (number), text (string), state ('hidden' | 'found' | 'missed')
 */
import { SLOT } from '../../hooks/useTop10Game.js';
import { CheckIcon } from '../ui/Icons.jsx';

const ROW_CLASSES = {
  [SLOT.HIDDEN]: 'border-slot-line bg-slot',
  [SLOT.FOUND]: 'border-gold bg-white',
  [SLOT.MISSED]: 'border-slot-line bg-white',
};

const BADGE_CLASSES = {
  [SLOT.HIDDEN]: 'bg-white',
  [SLOT.FOUND]: 'bg-gold',
  [SLOT.MISSED]: 'bg-slot',
};

const TEXT_CLASSES = {
  [SLOT.HIDDEN]: 'text-slot-text',
  [SLOT.FOUND]: 'text-ink',
  [SLOT.MISSED]: 'text-muted',
};

const HIDDEN_PLACEHOLDER = '؟؟؟؟؟؟';

export default function AnswerSlot({ rank, text, state }) {
  return (
    <li className={`flex h-11 items-center gap-2.5 rounded-xl border px-2.5 ${ROW_CLASSES[state]}`}>
      <span
        className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg font-display text-[15px] font-extrabold text-ink ${BADGE_CLASSES[state]}`}
      >
        {rank}
      </span>
      <span className={`min-w-0 flex-1 truncate font-display text-base font-bold ${TEXT_CLASSES[state]}`}>
        {state === SLOT.HIDDEN ? HIDDEN_PLACEHOLDER : text}
      </span>
      {state === SLOT.FOUND && <CheckIcon className="h-4 w-4 flex-none text-pine" />}
    </li>
  );
}
