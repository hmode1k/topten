import type { ReactNode } from 'react'
import type { Difficulty } from '../types'

export type ChipTone = 'neutral' | 'mint' | 'violet' | 'pink'

const tones: Record<ChipTone, string> = {
  neutral: 'border-line bg-card2 text-mut',
  mint: 'border-brand/40 bg-brand-tint text-brand',
  violet: 'border-violet/60 bg-violet-tint text-[#B79DFF]',
  pink: 'border-pink/40 bg-pink-tint text-pink',
}

export default function Chip({
  tone = 'neutral',
  children,
  className = '',
}: {
  tone?: ChipTone
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1 text-sm font-bold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export const difficultyLabel: Record<Difficulty, string> = {
  easy: 'سهل',
  medium: 'متوسط',
  hard: 'صعب',
}

const difficultyTone: Record<Difficulty, ChipTone> = {
  easy: 'mint',
  medium: 'violet',
  hard: 'pink',
}

export function DifficultyChip({ difficulty }: { difficulty: Difficulty }) {
  return <Chip tone={difficultyTone[difficulty]}>{difficultyLabel[difficulty]}</Chip>
}
