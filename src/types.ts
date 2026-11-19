export type Difficulty = 'easy' | 'medium' | 'hard' // سهل / متوسط / صعب

export interface Answer {
  rank: number // 1..10
  label: string // display name, e.g. "بيضة التنين"
  aliases?: string[] // accepted alternatives
}

export interface Question {
  id: string
  title: string // "أندر ١٠ عناصر"
  difficulty: Difficulty
  hints?: string[] // shown one at a time
  answers: Answer[] // exactly 10
}

export interface Topic {
  id: string
  name: string
  questions: Question[]
}

export type Tint = 'mint' | 'violet' | 'pink' | 'blue'

export interface Category {
  id: string
  name: string
  icon: string // key in components/CategoryIcon.tsx
  tint: Tint
  topics: Topic[]
}

export interface QuestionResult {
  questionId: string
  found: number
  mistakes: number
  seconds: number
  solvedAt: string // ISO date-time
  won: boolean
}
