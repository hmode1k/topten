import { describe, expect, it } from 'vitest'
import { isMatch, levenshtein, normalizeArabic, toAr, formatTime } from './arabic'

describe('toAr', () => {
  it('converts digits', () => {
    expect(toAr(1204)).toBe('١٢٠٤')
  })
})

describe('normalizeArabic', () => {
  it('unifies hamza variants', () => {
    expect(normalizeArabic('أحمد')).toBe(normalizeArabic('احمد'))
    expect(normalizeArabic('إيمان')).toBe(normalizeArabic('ايمان'))
  })
  it('treats ة and ه the same', () => {
    expect(normalizeArabic('منارة')).toBe(normalizeArabic('مناره'))
  })
  it('treats ى and ي the same', () => {
    expect(normalizeArabic('موسى')).toBe(normalizeArabic('موسي'))
  })
  it('removes tashkeel', () => {
    expect(normalizeArabic('حَزَّر')).toBe(normalizeArabic('حزر'))
  })
  it('drops the leading ال', () => {
    expect(normalizeArabic('الماس')).toBe(normalizeArabic('ماس'))
  })
})

describe('isMatch', () => {
  it('matches exact after normalization', () => {
    expect(isMatch('بيضة التنين', 'بيضه التنين')).toBe(true)
  })
  it('tolerates one typo in words of 5+ chars', () => {
    expect(levenshtein('بيضه التنين', 'بيضه التنيين')).toBe(1)
    expect(isMatch('بيضة التنيين', 'بيضة التنين')).toBe(true)
  })
  it('does not fuzzy-match short words', () => {
    expect(isMatch('نار', 'نور')).toBe(false)
    expect(isMatch('سيف', 'صيف')).toBe(false)
  })
  it('ignores empty guesses', () => {
    expect(isMatch('', 'ماس')).toBe(false)
  })
})

describe('formatTime', () => {
  it('formats mm:ss in Arabic digits', () => {
    expect(formatTime(134)).toBe('٠٢:١٤')
  })
})
