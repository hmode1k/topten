/**
 * Small inline SVG icons (stroke style, inherit the current text color).
 *
 * Every icon accepts a `className` so size/color can be set from Tailwind:
 *   <CheckIcon className="h-5 w-5 text-pine" />
 * They are decorative (aria-hidden); put an aria-label on the button that
 * contains them.
 */

/** Shared SVG attributes. */
function Svg({ className = 'h-5 w-5', strokeWidth = 2, children }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function UndoIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </Svg>
  );
}

export function ShareIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4" />
    </Svg>
  );
}

export function MoonIcon(props) {
  return (
    <Svg {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </Svg>
  );
}

export function CheckIcon(props) {
  return (
    <Svg strokeWidth={3} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Svg>
  );
}
