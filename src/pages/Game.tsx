import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Page from '../components/Page'
import Breadcrumb from '../components/Breadcrumb'
import { ButtonLink } from '../components/Button'
import SlotGrid from '../components/game/SlotGrid'
import GuessInput from '../components/game/GuessInput'
import MistakesCard from '../components/game/MistakesCard'
import FoundCard from '../components/game/FoundCard'
import GameActions from '../components/game/GameActions'
import NextQuestions from '../components/game/NextQuestions'
import EndPanel from '../components/game/EndPanel'
import { findQuestion } from '../data/categories'
import { foundCount } from '../lib/gameLogic'
import { useGameStore } from '../store/gameStore'

export default function Game() {
  const { questionId = '' } = useParams()
  const navigate = useNavigate()
  const located = findQuestion(questionId)

  const { game, guess, feedback, feedbackId, begin, setGuess, submit, hint, giveUp, tick } = useGameStore()

  // Load (or resume) the round whenever the question changes
  useEffect(() => {
    if (located) begin(located.question)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId])

  // Timer: counts up while playing
  const playing = game?.status === 'playing'
  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [playing, tick])

  if (!located) {
    return (
      <Page header="game">
        <h1 className="text-3xl font-black">ما لقينا هذا السؤال</h1>
        <p className="mt-2 text-mut">ارجع للفئات واختر سؤالًا آخر.</p>
        <ButtonLink to="/categories" className="mt-6">
          الفئات
        </ButtonLink>
      </Page>
    )
  }

  const { category, topic, question } = located
  const topicPath = `/categories/${category.id}/${topic.id}`
  const index = topic.questions.findIndex((q) => q.id === question.id)
  const others = topic.questions.filter((q) => q.id !== question.id)
  const nextQuestion = topic.questions[index + 1] ?? topic.questions[0]
  const hasNext = nextQuestion && nextQuestion.id !== question.id

  // `game` may still belong to the previous question for one render
  if (!game || game.questionId !== question.id) return <Page header="game">{null}</Page>

  const ended = game.status === 'won' || game.status === 'lost'

  return (
    <Page header="game">
      <Breadcrumb
        back={{ label: 'الأسئلة', to: topicPath }}
        items={[
          { label: 'الفئات', to: '/categories' },
          { label: category.name, to: `/categories/${category.id}` },
          { label: topic.name, to: topicPath },
          { label: question.title },
        ]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main column: first in the DOM, so it is on the right in RTL */}
        <div>
          <h1 className="text-[32px] font-black leading-tight sm:text-5xl">
            {question.title} في {topic.name}
          </h1>
          <p className="mt-3 text-lg text-mut">
            اكتب اسم عنصر واضغط Enter، والإجابة الصحيحة تنزل في مكانها. بعد ٥ أخطاء تنتهي الجولة.
          </p>

          <div className="mt-8">
            <SlotGrid question={question} game={game} />
          </div>

          <div className="mt-8">
            {ended ? (
              <EndPanel
                game={game}
                total={question.answers.length}
                topicPath={topicPath}
                nextId={hasNext ? nextQuestion.id : undefined}
                onRetry={() => begin(question, true)}
              />
            ) : (
              <GuessInput
                value={guess}
                onChange={setGuess}
                onSubmit={submit}
                onHint={hint}
                feedback={feedback}
                feedbackId={feedbackId}
              />
            )}
          </div>
        </div>

        {/* Sidebar: second in the DOM, so it is on the left in RTL */}
        <aside className="space-y-4" aria-label="حالة الجولة">
          <MistakesCard mistakes={game.mistakes} seconds={game.seconds} wrong={game.wrong} />
          <FoundCard found={foundCount(game)} total={question.answers.length} />
          {!ended && (
            <GameActions
              hintsLeft={game.hintsLeft}
              hintText={game.hintText}
              onHint={hint}
              onSkip={() => hasNext && navigate(`/play/${nextQuestion.id}`)}
              onGiveUp={giveUp}
              canSkip={Boolean(hasNext)}
            />
          )}
          <NextQuestions topicName={topic.name} topicPath={topicPath} questions={others.slice(0, 2)} />
        </aside>
      </div>
    </Page>
  )
}
