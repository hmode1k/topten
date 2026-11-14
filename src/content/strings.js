/**
 * All user-facing text lives here (Arabic).
 *
 * Keeping copy out of the components means you can reword the site, or later
 * add another language, without touching any JSX.
 * Components import this object as `t`, e.g. `t.game.guessButton`.
 */
export const t = {
  site: {
    name: 'توب 10',
    // TODO: replace with your real site / host name.
    tagline: '[اسم موقعك هنا]',
    copyright: '© [اسم موقعك] 2026',
    footerHint: 'خمّن أعلى 10 إجابات قبل أن تنتهي محاولاتك الخمس.',
  },

  nav: {
    todayGame: 'لعبة اليوم',
    categories: 'الفئات',
    leaderboard: 'المتصدرون',
    howToPlay: 'كيف تلعب',
    toggleTheme: 'الوضع الليلي',
    login: 'تسجيل الدخول',
  },

  game: {
    guessLabel: 'إجابتك',
    guessPlaceholder: 'اكتب إجابتك...',
    guessButton: 'خمّن',
    foundCount: (found, total) => `وجدت ${found} من ${total}`,
    mistakesLabel: 'الأخطاء',
    giveUp: 'استسلم وأظهر الإجابات',
    playAgain: 'العب مرة أخرى',
  },

  // Messages shown in the status chip under the guess box.
  feedback: {
    correct: 'إجابة صحيحة',
    wrong: 'إجابة خاطئة',
    duplicate: 'وجدت هذه الإجابة من قبل',
    won: 'أحسنت! وجدت كل الإجابات',
    lost: 'انتهت محاولاتك',
    gaveUp: 'تم إظهار الإجابات',
  },

  sidebar: {
    streakTitle: 'أيام متتالية',
    streakHint: 'العب كل يوم لتحافظ على سلسلتك.',
    categoriesTitle: 'فئات التحدي',
    showAll: (count) => `عرض الكل (${count})`,
    showLess: 'عرض أقل',
    createTitle: 'اصنع تحدّيك',
    createText: 'اختر موضوعًا واكتب أفضل 10 إجابات وشاركها مع أصدقائك.',
    createButton: 'ابدأ الآن',
  },

  state: {
    loading: 'جارٍ التحميل...',
    error: 'تعذّر تحميل التحدي. حاول مرة أخرى.',
    retry: 'إعادة المحاولة',
  },
};
