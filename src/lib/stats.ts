import type { Question, QuestionResult } from '../types'
import type { Progress } from './storage'
import { dateKey } from './storage'
import { foundCount } from './gameLogic'

export type QuestionStatus = 'new' | 'playing' | 'won'

export function questionStatus(p: Progress, questionId: string): QuestionStatus {
  if (p.results[questionId]?.won) return 'won'
  if (p.saved[questionId] || p.results[questionId]) return 'playing'
  return 'new'
}

/** Best "found" count to show as "٨ من ١٠"; null if never played. */
export function bestScore(p: Progress, questionId: string): number | null {
  const saved = p.saved[questionId]
  const result = p.results[questionId]
  if (result) return result.found
  if (saved) return foundCount(saved)
  return null
}

export const solvedIn = (p: Progress, questions: Question[]) =>
  questions.filter((q) => p.results[q.id]?.won).length

export const startedIn = (p: Progress, questions: Question[]) =>
  questions.filter((q) => questionStatus(p, q.id) !== 'new').length

/** Is `next` a better result than `prev` for the same question? */
export function isBetter(next: QuestionResult, prev?: QuestionResult): boolean {
  if (!prev) return true
  if (next.won !== prev.won) return next.won
  if (next.found !== prev.found) return next.found > prev.found
  return next.seconds < prev.seconds
}

export interface Overview {
  solved: number
  accuracy: number | null // percent, null when nothing played yet
  bestSeconds: number | null
  streak: number
}

export function overview(p: Progress): Overview {
  const rounds = p.history
  const correct = rounds.reduce((n, r) => n + r.found, 0)
  const guesses = rounds.reduce((n, r) => n + r.found + r.mistakes, 0)
  const wins = Object.values(p.results).filter((r) => r.won)
  return {
    solved: wins.length,
    accuracy: guesses ? Math.round((correct / guesses) * 100) : null,
    bestSeconds: wins.length ? Math.min(...wins.map((r) => r.seconds)) : null,
    streak: p.streak,
  }
}

/** Rounds finished on each of the last 7 days, oldest first. */
export function weeklyActivity(p: Progress): { date: string; weekday: number; count: number }[] {
  const days: { date: string; weekday: number; count: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = dateKey(d)
    days.push({
      date: key,
      weekday: d.getDay(),
      count: p.history.filter((r) => dateKey(new Date(r.solvedAt)) === key).length,
    })
  }
  return days
}
