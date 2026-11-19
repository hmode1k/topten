import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md' | 'lg'

const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-colors'
const variants: Record<Variant, string> = {
  primary: 'bg-brand text-brand-ink shadow-glow hover:brightness-105',
  secondary: 'border border-line text-ink hover:bg-card',
}
const sizes: Record<Size, string> = {
  sm: 'h-10 rounded-[12px] px-4 text-[15px]',
  md: 'h-12 rounded-btn px-6 text-base',
  lg: 'h-14 rounded-btn px-8 text-lg',
}

const cls = (variant: Variant, size: Size, extra = '') =>
  `${base} ${variants[variant]} ${sizes[size]} ${extra}`

interface Common {
  variant?: Variant
  size?: Size
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cls(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: Common & LinkProps) {
  return (
    <Link className={cls(variant, size, className)} {...rest}>
      {children}
    </Link>
  )
}
