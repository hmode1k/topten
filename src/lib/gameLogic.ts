import type { Answer, Question } from '../types'
import { isMatch, normalizeArabic, toAr } from './arabic'

export const MAX_MISTAKES = 5
export const MAX_HINTS = 2

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost'

export interface Feedback {
  kind: 'correct' | 'wrong' | 'repeat'
  text: string
  rank?: number
}

export interface GameState {
  questionId: string
  found: Record<number, Answer> // rank -> answer
  wrong: string[] // display text of wrong guesses
  tried: string[] // normalized guesses already tried (right or wrong)
  mistakes: number
  seconds: number
  hintsLeft: number
  hintText: string | null
  status: GameStatus
  lastRank: number | null // newest found slot (gets the mint ring)
}

export function createGame(question: Question): GameState {
  return {
    questionId: question.id,
    found: {},
    wrong: [],
    tried: [],
    mistakes: 0,
    seconds: 0,
    hintsLeft: MAX_HINTS,
    hintText: null,
    status: 'playing',
    lastRank: null,
  }
}

export const foundCount = (s: GameState) => Object.keys(s.found).length

const names = (a: Answer) => [a.label, ...(a.aliases ?? [])]

/** Exact normalized match first, then fuzzy. */
export function findAnswer(question: Question, guess: string): Answer | undefined {
  const g = normalizeArabic(guess)
  if (!g) return undefined
  const exact = question.answers.find((a) => names(a).some((n) => normalizeArabic(n) === g))
  if (exact) return exact
  return question.answers.find((a) => names(a).some((n) => isMatch(guess, n)))
}

export function submitGuess(
  state: GameState,
  question: Question,
  guess: string,
): { state: GameState; feedback: Feedback | null } {
  if (state.status !== 'playing') return { state, feedback: null }
  const key = normalizeArabic(guess)
  if (!key) return { state, feedback: null }

  const match = findAnswer(question, guess)

  // Already tried, or an answer that is already on the board: no extra mistake.
  if (state.tried.includes(key) || (match && state.found[match.rank])) {
    return { state, feedback: { kind: 'repeat', text: 'جرّبتها من قبل' } }
  }

  const tried = [...state.tried, key]

  if (match) {
    const found = { ...state.found, [match.rank]: match }
    const won = Object.keys(found).length === question.answers.length
    return {
      state: { ...state, found, tried, lastRank: match.rank, status: won ? 'won' : 'playing' },
      feedback: { kind: 'correct', text: `صح! مكانه رقم ${toAr(match.rank)}`, rank: match.rank },
    }
  }

  const mistakes = state.mistakes + 1
  return {
    state: {
      ...state,
      tried,
      wrong: [...state.wrong, guess.trim()],
      mistakes,
      status: mistakes >= MAX_MISTAKES ? 'lost' : 'playing',
    },
    feedback: { kind: 'wrong', text: `غلط: «${guess.trim()}» مش بالقائمة` },
  }
}

/** Reveal the next hint without filling a slot. Falls back to a first-letter hint. */
export function revealHint(state: GameState, question: Question): GameState {
  if (state.status !== 'playing' || state.hintsLeft <= 0) return state
  const used = MAX_HINTS - state.hintsLeft
  let text = question.hints?.[used]
  if (!text) {
    const missing = question.answers.find((a) => !state.found[a.rank])
    if (!missing) return state
    const stripped = missing.label.replace(/^ال/, '')
    text = `إحدى الإجابات الناقصة تبدأ بحرف «${stripped[0]}»`
  }
  return { ...state, hintsLeft: state.hintsLeft - 1, hintText: text }
}

export const giveUp = (state: GameState): GameState =>
  state.status === 'playing' ? { ...state, status: 'lost' } : state

export const tick = (state: GameState): GameState =>
  state.status === 'playing' ? { ...state, seconds: state.seconds + 1 } : state
