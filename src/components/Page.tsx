import type { ReactNode } from 'react'
import Header from './Header'

/** Header + centered content column (48px side padding on desktop). */
export default function Page({
  children,
  header = 'app',
}: {
  children: ReactNode
  header?: 'landing' | 'app' | 'game'
}) {
  return (
    <div className="min-h-screen bg-bg">
      <Header variant={header} />
      <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-8 sm:px-8 lg:px-12">{children}</main>
    </div>
  )
}
