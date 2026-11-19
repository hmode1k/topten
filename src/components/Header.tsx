import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CircleHelp, Settings, Trophy, Volume2, VolumeX } from 'lucide-react'
import Logo from './Logo'
import { ButtonLink } from './Button'

type Variant = 'landing' | 'app' | 'game'

const navItems = {
  landing: [
    { to: '/categories', label: 'الفئات' },
    { to: '/leaderboard', label: 'المتصدرون' },
  ],
  app: [
    { to: '/categories', label: 'الفئات' },
    { to: '/leaderboard', label: 'المتصدرون' },
    { to: '/dashboard', label: 'لوحتي' },
  ],
  game: [],
}

const iconBtn =
  'grid h-10 w-10 place-items-center rounded-full text-mut hover:bg-card hover:text-ink'

function Tools() {
  const [soundOn, setSoundOn] = useState(true)
  return (
    <>
      <button
        type="button"
        aria-label={soundOn ? 'إيقاف الصوت' : 'تشغيل الصوت'}
        aria-pressed={!soundOn}
        onClick={() => setSoundOn((v) => !v)}
        className={iconBtn}
      >
        {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>
      <button type="button" aria-label="الإعدادات" className={iconBtn}>
        <Settings className="h-5 w-5" />
      </button>
      <span
        aria-label="حسابك"
        className="grid h-10 w-10 place-items-center rounded-full bg-brand text-base font-extrabold text-brand-ink"
      >
        أح
      </span>
    </>
  )
}

export default function Header({ variant = 'app' }: { variant?: Variant }) {
  const items = navItems[variant]
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-8 lg:h-[72px] lg:px-12 lg:py-0">
        <Logo />

        {items.length > 0 && (
          <nav aria-label="التنقل الرئيسي" className="order-last flex w-full gap-1 lg:order-none lg:w-auto">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-[12px] px-4 py-2 text-base font-bold ${
                    isActive ? 'bg-card2 text-ink' : 'text-mut hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}

        {variant === 'game' && (
          <nav aria-label="روابط اللعبة" className="flex gap-1">
            <Link to="/leaderboard" className="inline-flex items-center gap-2 rounded-[12px] px-4 py-2 font-bold text-mut hover:text-ink">
              <Trophy aria-hidden="true" className="h-4 w-4" />
              المتصدرون
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 rounded-[12px] px-4 py-2 font-bold text-mut hover:text-ink">
              <CircleHelp aria-hidden="true" className="h-4 w-4" />
              طريقة اللعب
            </Link>
          </nav>
        )}

        {/* ms-auto pushes the tools to the end of the row, the left side in RTL */}
        <div className="ms-auto flex items-center gap-2">
          {variant === 'landing' ? (
            <>
              <Link to="/signin" className="px-3 text-base font-bold text-mut hover:text-ink">
                تسجيل الدخول
              </Link>
              <ButtonLink to="/categories" size="sm">
                ابدأ اللعب
              </ButtonLink>
            </>
          ) : (
            <Tools />
          )}
        </div>
      </div>
    </header>
  )
}
