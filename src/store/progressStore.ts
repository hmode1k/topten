import { create } from 'zustand'
import type { QuestionResult } from '../types'
import type { GameState } from '../lib/gameLogic'
import { dateKey, loadProgress, saveProgress, yesterdayKey, type Progress } from '../lib/storage'
import { isBetter } from '../lib/stats'

interface ProgressStore {
  progress: Progress
  recordResult: (result: QuestionResult) => void
  saveGame: (game: GameState) => void
  clearGame: (questionId: string) => void
}

const HISTORY_CAP = 200

export const useProgressStore = create<ProgressStore>((set, get) => {
  const commit = (progress: Progress) => {
    saveProgress(progress)
    set({ progress })
  }

  return {
    progress: loadProgress(),

    recordResult: (result) => {
      const p = get().progress
      const today = dateKey()
      const streak =
        p.lastPlayed === today ? p.streak : p.lastPlayed === yesterdayKey() ? p.streak + 1 : 1
      const { [result.questionId]: _removed, ...saved } = p.saved
      commit({
        ...p,
        results: isBetter(result, p.results[result.questionId])
          ? { ...p.results, [result.questionId]: result }
          : p.results,
        history: [...p.history, result].slice(-HISTORY_CAP),
        saved,
        streak,
        lastPlayed: today,
      })
    },

    saveGame: (game) => {
      const p = get().progress
      commit({ ...p, saved: { ...p.saved, [game.questionId]: game } })
    },

    clearGame: (questionId) => {
      const p = get().progress
      if (!p.saved[questionId]) return
      const { [questionId]: _removed, ...saved } = p.saved
      commit({ ...p, saved })
    },
  }
})
