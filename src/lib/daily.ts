import type { Question } from '../types'

/** Same pick for everyone on a given (UTC) day, cycling through all questions. */
export function pickDaily(questions: Question[], date: Date = new Date()): Question | undefined {
  if (questions.length === 0) return undefined
  const day = Math.floor(date.getTime() / 86_400_000)
  return questions[day % questions.length]
}
