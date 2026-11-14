/**
 * Big "توب 10" heading with the gold underline on the number.
 * (No props. The host line "مع ..." was removed.)
 */
export default function GameTitle() {
  return (
    <h1 className="text-center font-display text-5xl font-black leading-tight text-ink">
      توب{' '}
      {/* The gold underline is an inset shadow so it sits behind the digits */}
      <span className="shadow-[inset_0_-8px_0_theme(colors.gold)]">10</span>
    </h1>
  );
}
