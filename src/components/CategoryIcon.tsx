import {
  Cpu,
  FlaskConical,
  Film,
  Gamepad2,
  Globe,
  Goal,
  Music,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'
import type { Tint } from '../types'

const icons: Record<string, LucideIcon> = {
  gamepad: Gamepad2,
  goal: Goal,
  utensils: UtensilsCrossed,
  film: Film,
  music: Music,
  globe: Globe,
  cpu: Cpu,
  flask: FlaskConical,
}

// background / foreground per tint (guide, section 3)
export const tintStyles: Record<Tint, { bg: string; fg: string }> = {
  mint: { bg: 'rgba(74,222,128,.14)', fg: '#4ADE80' },
  violet: { bg: '#2E1B63', fg: '#B79DFF' },
  pink: { bg: '#3B1635', fg: '#FF6B93' },
  blue: { bg: '#1D2150', fg: '#8EA2FF' },
}

export default function CategoryIcon({
  icon,
  tint,
  size = 56,
}: {
  icon: string
  tint: Tint
  size?: number
}) {
  const Icon = icons[icon] ?? Gamepad2
  const { bg, fg } = tintStyles[tint]
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-[16px]"
      style={{ width: size, height: size, background: bg, color: fg }}
    >
      <Icon style={{ width: size * 0.46, height: size * 0.46 }} />
    </span>
  )
}
