/**
 * Text normalisation used when comparing a player's guess with the answers.
 *
 * Players type Arabic in many slightly different ways (with/without diacritics,
 * أ / إ / ا, ة / ه, ى / ي, extra spaces...). Normalising BOTH the guess and the
 * stored answers makes matching forgiving without any fuzzy logic.
 *
 * NOTE: if the backend later validates guesses itself, this file can be
 * deleted, or kept for instant client-side feedback.
 */

// Arabic diacritics (tashkeel) and the tatweel stretch character.
const DIACRITICS_AND_TATWEEL = /[ً-ٰٟـ]/g;

/**
 * @param {string} text Raw user input or stored answer text.
 * @returns {string} A canonical form suitable for equality comparison.
 */
export function normalizeArabic(text) {
  return String(text ?? '')
    .toLowerCase() // Latin letters (e.g. "GTA V")
    .replace(DIACRITICS_AND_TATWEEL, '')
    .replace(/[أإآٱ]/g, 'ا') // alef variants -> plain alef
    .replace(/ى/g, 'ي') // alef maqsura -> ya
    .replace(/ة/g, 'ه') // ta marbuta -> ha
    .replace(/[^\p{L}\p{N}\s]/gu, '') // drop punctuation
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim();
}
