import type { Question } from '../../types'
import type { GameState } from '../../lib/gameLogic'
import Slot from './Slot'

/**
 * Two columns of five. In RTL the first column is on the right, so ranks 1-5
 * land on the right and 6-10 on the left (grid-flow-col fills a column at a time).
 */
export default function SlotGrid({ question, game }: { question: Question; game: GameState }) {
  const lost = game.status === 'lost'
  return (
    <ol
      aria-label="القائمة"
      className="grid list-none grid-cols-1 gap-[14px] p-0 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-5 sm:gap-[18px]"
    >
      {question.answers.map((answer) => {
        const found = game.found[answer.rank]
        return (
          <Slot
            key={answer.rank}
            rank={answer.rank}
            answer={found}
            newest={game.lastRank === answer.rank}
            missed={lost && !found ? answer : undefined}
            tag={question.topTag}
          />
        )
      })}
    </ol>
  )
}
