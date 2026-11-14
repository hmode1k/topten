/**
 * Root component = the home page.
 *
 *   Header
 *   main: [ GameCard ........ | Sidebar ]   (stacked on phones/tablets)
 *   Footer
 *
 * Data comes from useHomeData (which calls src/services/api.js). Handlers for
 * login, theme, category selection and "create challenge" are placeholders
 * (TODO) for you to wire up once the backend / routing exists.
 */
import GameCard from './components/game/GameCard.jsx';
import Footer from './components/layout/Footer.jsx';
import Header from './components/layout/Header.jsx';
import Button from './components/ui/Button.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import { t } from './content/strings.js';
import { useHomeData } from './hooks/useHomeData.js';

export default function App() {
  const { status, challenge, categories, streak, reload } = useHomeData();

  // TODO: replace these placeholders with real behaviour.
  const handleLogin = () => {};
  const handleToggleTheme = () => {};
  const handleSelectCategory = () => {};
  const handleCreateChallenge = () => {};

  return (
    <div className="flex min-h-screen flex-col bg-forest text-white">
      <Header onLogin={handleLogin} onToggleTheme={handleToggleTheme} />

      {/* Wide container with small side padding so the game card gets more room. */}
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-3 pb-10 pt-5 sm:px-5">
        {status === 'loading' && <p className="py-20 text-center text-muted-dark">{t.state.loading}</p>}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-muted-dark">{t.state.error}</p>
            <Button variant="light" onClick={reload}>
              {t.state.retry}
            </Button>
          </div>
        )}

        {status === 'ready' && challenge && (
          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
            <GameCard key={challenge.id} challenge={challenge} />
            <Sidebar
              streak={streak}
              categories={categories}
              onSelectCategory={handleSelectCategory}
              onCreateChallenge={handleCreateChallenge}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
