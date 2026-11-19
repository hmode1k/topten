import type { QuestionResult } from '../types'
import type { GameState } from './gameLogic'

export const PROGRESS_KEY = 'top10:progress:v1'

export interface Progress {
  results: Record<string, QuestionResult> // best result per question
  history: QuestionResult[] // every finished round, newest last (capped)
  saved: Record<string, GameState> // unfinished rounds, so "كمّل" can resume
  streak: number
  lastPlayed: string // local date, YYYY-MM-DD
}

export const emptyProgress = (): Progress => ({
  results: {},
  history: [],
  saved: {},
  streak: 0,
  lastPlayed: '',
})

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return emptyProgress()
    return { ...emptyProgress(), ...JSON.parse(raw) }
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p))
  } catch {
    // storage full or blocked: progress just won't persist
  }
}

/** Local date as YYYY-MM-DD. */
export const dateKey = (d: Date = new Date()): string => {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export const yesterdayKey = (): string => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return dateKey(d)
}
