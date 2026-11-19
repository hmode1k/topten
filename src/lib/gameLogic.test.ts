import { describe, expect, it } from 'vitest'
import { categories } from '../data/categories'
import { createGame, findAnswer, foundCount, giveUp, revealHint, submitGuess } from './gameLogic'

const q = categories[0].topics[0].questions[0]

describe('game logic', () => {
  it('has exactly 10 ranked answers per seeded question', () => {
    for (const question of categories[0].topics[0].questions) {
      expect(question.answers.length).toBe(10)
      expect(question.answers.map((a) => a.rank).join(',')).toBe('1,2,3,4,5,6,7,8,9,10')
    }
  })

  it('places a correct guess in its rank slot', () => {
    const r = submitGuess(createGame(q), q, 'تفاحه ذهبيه مسحوره')
    expect(r.state.found[3].label).toBe('تفاحة ذهبية مسحورة')
    expect(r.feedback?.text).toBe('صح! مكانه رقم ٣')
  })

  it('counts a wrong guess once and ignores repeats', () => {
    let s = createGame(q)
    s = submitGuess(s, q, 'ألماس').state
    expect(s.mistakes).toBe(1)
    const again = submitGuess(s, q, 'الماس')
    expect(again.state.mistakes).toBe(1)
    expect(again.feedback?.kind).toBe('repeat')
  })

  it('does not accept the same answer twice', () => {
    let s = submitGuess(createGame(q), q, 'بيضة التنين').state
    const r = submitGuess(s, q, 'دراغون ايج')
    expect(r.feedback?.kind).toBe('repeat')
    expect(foundCount(r.state)).toBe(1)
  })

  it('loses after 5 mistakes', () => {
    let s = createGame(q)
    for (const w of ['سيف', 'خشب', 'تراب', 'ورق', 'قلم']) s = submitGuess(s, q, w).state
    expect(s.status).toBe('lost')
  })

  it('wins after all 10 are found', () => {
    let s = createGame(q)
    for (const a of q.answers) s = submitGuess(s, q, a.label).state
    expect(s.status).toBe('won')
  })

  it('uses hints up to the limit', () => {
    let s = revealHint(createGame(q), q)
    s = revealHint(s, q)
    expect(s.hintsLeft).toBe(0)
    expect(revealHint(s, q).hintsLeft).toBe(0)
  })

  it('give up ends the round as lost', () => {
    expect(giveUp(createGame(q)).status).toBe('lost')
  })

  it('fuzzy match tolerates one typo in a long label', () => {
    expect(findAnswer(q, 'تفاحة ذهبية مسحوره')?.rank).toBe(3)
  })
})
