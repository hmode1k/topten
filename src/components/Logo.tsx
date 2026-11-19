import { Link } from 'react-router-dom'

/**
 * LOGO PLACEHOLDER.
 * To use the real logo: put the file in /public (for example /public/logo.svg)
 * and set LOGO_SRC = '/logo.svg'. Nothing else needs to change.
 */
const LOGO_SRC: string | null = null

export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <Link to="/" aria-label="توب ١٠، الصفحة الرئيسية" className="flex items-center gap-3">
      {LOGO_SRC ? (
        <img src={LOGO_SRC} alt="" style={{ width: size, height: size }} className="object-contain" />
      ) : (
        <span
          aria-hidden="true"
          style={{ width: size, height: size }}
          className="grid place-items-center rounded-xl border-2 border-dashed border-brand/60 text-[11px] font-bold text-brand"
        >
          شعار
        </span>
      )}
      <span className="text-[26px] font-black leading-none">توب ١٠</span>
    </Link>
  )
}
