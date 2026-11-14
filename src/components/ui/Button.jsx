/**
 * Text button used across the site.
 *
 * Props:
 *  - variant   'primary' (green) | 'light' (white) | 'outline' (green outline)
 *  - className extra Tailwind classes (e.g. "w-full")
 *  - ...rest   any native <button> prop (onClick, type, disabled, ...)
 *
 * All variants are at least 44px tall to be comfortable to tap.
 */
const VARIANTS = {
  primary: 'bg-pine text-white hover:bg-ink',
  light: 'bg-white text-ink hover:bg-cream',
  outline: 'border border-pine bg-transparent text-pine hover:bg-pine hover:text-white',
};

export default function Button({ variant = 'primary', className = '', type = 'button', ...rest }) {
  return (
    <button
      type={type}
      className={`inline-flex h-11 items-center justify-center rounded-xl px-6 text-base font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      {...rest}
    />
  );
}
