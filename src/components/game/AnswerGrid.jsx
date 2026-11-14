/**
 * The 10 answer slots.
 *
 * Layout: on phones a single column (1..10). From the `sm` breakpoint up, two
 * columns filled column-by-column, so 1-5 are in the first column (the right
 * side in RTL) and 6-10 in the second.
 *
 * The row count is passed through a CSS variable (--rows) so the grid works
 * for any number of answers, not just 10.
 *
 * Props: slots  [{ rank, text, state }]
 */
import AnswerSlot from './AnswerSlot.jsx';

export default function AnswerGrid({ slots }) {
  const rows = Math.ceil(slots.length / 2);

  return (
    <ol
      className="mt-3 grid grid-cols-1 gap-x-3 gap-y-2 sm:grid-flow-col sm:grid-cols-2 sm:[grid-template-rows:repeat(var(--rows),minmax(0,1fr))]"
      style={{ '--rows': rows }}
    >
      {slots.map((slot) => (
        <AnswerSlot key={slot.rank} {...slot} />
      ))}
    </ol>
  );
}
