/**
 * Site header: logo + name (right), navigation (center), actions (left).
 * (Right/left are as seen in RTL; the DOM order is simply logo, nav, actions.)
 *
 * The nav links currently point to in-page anchors. Replace the `href`s with
 * router links when you add pages.
 */
import { t } from '../../content/strings.js';
import Button from '../ui/Button.jsx';
import IconButton from '../ui/IconButton.jsx';
import { MoonIcon } from '../ui/Icons.jsx';

const NAV_LINKS = [
  { label: t.nav.todayGame, href: '#game' },
  { label: t.nav.categories, href: '#categories' },
  { label: t.nav.leaderboard, href: '#leaderboard' },
  { label: t.nav.howToPlay, href: '#how' },
];

export default function Header({ onToggleTheme, onLogin }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-forest-divider px-5 py-4 sm:px-10">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-white font-display text-xl font-black text-ink"
          aria-hidden="true"
        >
          10
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-display text-[22px] font-black">{t.site.name}</span>
          <span className="text-[13px] text-muted-dark">{t.site.tagline}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav aria-label="main" className="order-3 flex w-full flex-wrap justify-center gap-x-7 gap-y-2 font-medium md:order-none md:w-auto">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="text-[#CFE5D9] transition-colors hover:text-white">
            {link.label}
          </a>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <IconButton tone="dark" label={t.nav.toggleTheme} onClick={onToggleTheme}>
          <MoonIcon />
        </IconButton>
        <Button variant="light" onClick={onLogin}>
          {t.nav.login}
        </Button>
      </div>
    </header>
  );
}
