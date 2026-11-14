/**
 * The white banner showing the challenge question.
 *
 * Props: title (string)
 */
export default function QuestionBanner({ title }) {
  return (
    <h2 className="mt-3 rounded-xl border border-slot-line bg-white px-4 py-2.5 text-center font-display text-xl font-extrabold text-ink">
      {title}
    </h2>
  );
}
