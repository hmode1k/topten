import { create } from 'zustand'
import type { Question } from '../types'
import {
  createGame,
  giveUp as giveUpGame,
  revealHint,
  submitGuess,
  tick as tickGame,
  foundCount,
  type Feedback,
  type GameState,
} from '../lib/gameLogic'
import { useProgressStore } from './progressStore'

interface GameStore {
  question: Question | null
  game: GameState | null
  guess: string
  feedback: Feedback | null
  feedbackId: number // bumps on every feedback so the UI can retrigger animations
  begin: (question: Question, fresh?: boolean) => void
  setGuess: (guess: string) => void
  submit: () => void
  hint: () => void
  giveUp: () => void
  tick: () => void
  leave: () => void
}

export const useGameStore = create<GameStore>((set, get) => {
  /** Persist the round: resume data while playing, a result once it ends. */
  const persist = (before: GameState | null, after: GameState) => {
    const progress = useProgressStore.getState()
    if (after.status === 'playing') {
      progress.saveGame(after)
      return
    }
    if (before?.status === 'playing') {
      progress.recordResult({
        questionId: after.questionId,
        found: foundCount(after),
        mistakes: after.mistakes,
        seconds: after.seconds,
        solvedAt: new Date().toISOString(),
        won: after.status === 'won',
      })
    }
  }

  const apply = (game: GameState, feedback: Feedback | null = null) => {
    const before = get().game
    persist(before, game)
    set((s) => ({
      game,
      feedback,
      feedbackId: feedback ? s.feedbackId + 1 : s.feedbackId,
      guess: feedback ? '' : s.guess,
    }))
  }

  return {
    question: null,
    game: null,
    guess: '',
    feedback: null,
    feedbackId: 0,

    begin: (question, fresh = false) => {
      const saved = useProgressStore.getState().progress.saved[question.id]
      if (fresh) useProgressStore.getState().clearGame(question.id)
      const game = !fresh && saved && saved.status === 'playing' ? saved : createGame(question)
      set({ question, game, guess: '', feedback: null })
    },

    setGuess: (guess) => set({ guess }),

    submit: () => {
      const { question, game, guess } = get()
      if (!question || !game) return
      const result = submitGuess(game, question, guess)
      if (!result.feedback) return
      apply(result.state, result.feedback)
    },

    hint: () => {
      const { question, game } = get()
      if (!question || !game) return
      const next = revealHint(game, question)
      if (next === game) return
      persist(game, next)
      set({ game: next }) // keep the typed guess and the feedback line as they are
    },

    giveUp: () => {
      const { game } = get()
      if (game) apply(giveUpGame(game), null)
    },

    // The timer ticks every second; resume data is saved on the next guess.
    tick: () => {
      const { game } = get()
      if (game && game.status === 'playing') set({ game: tickGame(game) })
    },

    leave: () => set({ question: null, game: null, guess: '', feedback: null }),
  }
})
