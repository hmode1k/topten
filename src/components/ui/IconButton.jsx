/**
 * Square icon-only button (44x44).
 *
 * Props:
 *  - label    REQUIRED accessible name (screen readers + tooltip), since the
 *             button has no visible text.
 *  - tone     'dark'  -> outlined, for dark backgrounds (header)
 *             'light' -> plain, for the cream game card
 *  - children the icon
 */
const TONES = {
  dark: 'border border-forest-ring text-white hover:bg-forest-panel',
  light: 'text-muted hover:bg-slot',
};

export default function IconButton({ label, tone = 'light', className = '', children, ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${TONES[tone]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
