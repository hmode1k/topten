/**
 * The main cream game card. It owns the game state (via useTop10Game) and
 * composes the smaller pieces in ./ . To change the card's layout, edit the
 * order of the children below; to change the rules, edit hooks/useTop10Game.js.
 *
 * Props:
 *  - challenge  the challenge to play (see Challenge typedef in data/mockData.js)
 *
 * Tip: App.jsx renders this with `key={challenge.id}`, so loading a different
 * challenge automatically resets all game state.
 */
import { t } from '../../content/strings.js';
import { useTop10Game } from '../../hooks/useTop10Game.js';
import Button from '../ui/Button.jsx';
import AnswerGrid from './AnswerGrid.jsx';
import GameTitle from './GameTitle.jsx';
import GuessForm from './GuessForm.jsx';
import ProgressRow from './ProgressRow.jsx';
import QuestionBanner from './QuestionBanner.jsx';
import StatusChip from './StatusChip.jsx';

export default function GameCard({ challenge }) {
  const game = useTop10Game(challenge);

  return (
    <section
      id="game"
      className="min-w-0 rounded-3xl bg-cream px-4 pb-6 pt-5 text-ink shadow-card sm:px-5"
    >
      <GameTitle />
      <QuestionBanner title={challenge.title} />
      <GuessForm onGuess={game.submitGuess} disabled={game.isOver} />
      <StatusChip feedback={game.feedback} />
      <ProgressRow
        found={game.foundCount}
        total={game.total}
        mistakes={game.mistakes}
        maxMistakes={game.maxMistakes}
      />
      <AnswerGrid slots={game.slots} />

      <div className="mt-4 flex justify-center">
        {game.isOver ? (
          <Button variant="primary" className="h-10 px-5 text-[15px]" onClick={game.reset}>
            {t.game.playAgain}
          </Button>
        ) : (
          <Button variant="outline" className="h-10 px-5 text-[15px]" onClick={game.giveUp}>
            {t.game.giveUp}
          </Button>
        )}
      </div>
    </section>
  );
}
