/**
 * SAMPLE DATA ONLY.
 *
 * These objects stand in for what your backend will return. They are used by
 * src/services/api.js until you replace those functions with real requests.
 * The shapes documented here are the contract between front end and backend.
 * The sample answers are placeholders and are not verified facts.
 */

/**
 * @typedef {Object} Answer
 * @property {number}   rank     Position in the top 10 (1 = best).
 * @property {string}   text     The answer as displayed once revealed.
 * @property {string[]} aliases  Other accepted spellings / names.
 *
 * @typedef {Object} Challenge
 * @property {string}   id       Unique id (also used to reset game state).
 * @property {number}   number   Public challenge number, e.g. 12.
 * @property {string}   title    The question, e.g. "أشهر 10 ألعاب ...".
 * @property {string}   host     Name shown under the logo ("مع ...").
 * @property {Answer[]} answers  Exactly 10 answers.
 *
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} tag    Small label on the right (e.g. challenge count).
 */

/** @type {Challenge} */
export const mockChallenge = {
  id: 'challenge-12',
  number: 12,
  title: 'أشهر 10 ألعاب فيديو مبيعًا',
  host: '[اسمك]',
  answers: [
    { rank: 1, text: 'ماينكرافت', aliases: ['ماين كرافت', 'minecraft'] },
    { rank: 2, text: 'جراند ثفت أوتو 5', aliases: ['جي تي إيه 5', 'جتا 5', 'gta 5', 'gta v'] },
    { rank: 3, text: 'تيتريس', aliases: ['tetris'] },
    { rank: 4, text: 'ويي سبورتس', aliases: ['wii sports'] },
    { rank: 5, text: 'ببجي', aliases: ['pubg', 'بوبجي'] },
    { rank: 6, text: 'ماريو كارت 8', aliases: ['mario kart 8', 'ماريو كارت'] },
    { rank: 7, text: 'ريد ديد ريدمبشن 2', aliases: ['red dead redemption 2', 'rdr2'] },
    { rank: 8, text: 'تيراريا', aliases: ['terraria'] },
    { rank: 9, text: 'ذا ويتشر 3', aliases: ['ويتشر 3', 'the witcher 3'] },
    { rank: 10, text: 'سوبر ماريو براذرز', aliases: ['سوبر ماريو', 'super mario bros'] },
  ],
};

/** @type {Category[]} */
export const mockCategories = [
  { id: 'games', name: 'ألعاب', tag: '[عدد]' },
  { id: 'football', name: 'كرة القدم', tag: '[عدد]' },
  { id: 'movies', name: 'أفلام ومسلسلات', tag: '[عدد]' },
  { id: 'geography', name: 'جغرافيا', tag: '[عدد]' },
  { id: 'food', name: 'أكلات', tag: '[عدد]' },
];

/** Current play streak in days. */
export const mockStreak = 7;
