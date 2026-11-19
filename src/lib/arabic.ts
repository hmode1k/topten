const AR = '٠١٢٣٤٥٦٧٨٩'

/** Convert digits to Arabic-Indic digits for display. */
export const toAr = (n: number | string): string => String(n).replace(/\d/g, (d) => AR[+d])

export function normalizeArabic(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, '') // tashkeel + tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[^\p{L}\p{N}\s]/gu, '') // punctuation
    .replace(/^ال/, '') // leading "al-"
    .replace(/\s+/g, ' ')
    .trim()
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
    }
    prev = cur
  }
  return prev[b.length]
}

/** Tolerate 1 typo for words of 5+ chars, 2 typos for 9+ chars, 0 for short words. */
export function isMatch(guess: string, target: string): boolean {
  const g = normalizeArabic(guess)
  const t = normalizeArabic(target)
  if (!g || !t) return false
  if (g === t) return true
  const max = t.length >= 9 ? 2 : t.length >= 5 ? 1 : 0
  return max > 0 && levenshtein(g, t) <= max
}

/** mm:ss with Arabic-Indic digits, e.g. ٠٢:١٤ */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return toAr(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
}
