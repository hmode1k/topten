---
name: top10-project-guide
description: Full project brief for "توب ١٠" (Top 10), an Arabic RTL typing-guessing game website. Covers product, design system, page specs, game logic, data model and a React + Tailwind build plan. Use when designing, building or extending any part of this site.
---

# توب ١٠ (Top 10): project guide

Read this whole file before doing anything. It is the single source of truth for the product, the design and the build. If something here conflicts with a guess, follow this file. If something is missing, ask the owner instead of inventing it.

---

## 1. Product

**What it is:** an Arabic-first (RTL) web game. A simple typing game with no game engine.

**Flow:**
1. The player picks a **category** (ألعاب، رياضة، طعام ومطابخ، أفلام ومسلسلات، موسيقى، دول وجغرافيا، تقنية، علوم).
2. Inside it, a **topic** (for ألعاب: ماينكرافت، جي تي إيه ٦، دارك سولز، فورتنايت، ماريو، زيلدا، فالورانت، فيفا).
3. Inside it, a **question** (e.g. "أندر ١٠ عناصر في ماينكرافت").
4. The **game screen** loads: the question, a typing box with a submit button, **10 empty slots**, and a **mistakes counter out of 5**.

**Core rules:**
- Each question has exactly 10 correct answers, ranked 1 to 10.
- The player types a guess and presses Enter or the "حزّر" button.
- Correct guess: it drops into its rank slot (e.g. guessing "ألماس" fills slot 10 if that is its rank).
- Wrong guess: mistakes +1 and the guess appears as a struck-through chip. Repeated guesses do not count twice.
- 5 mistakes ends the round. Filling all 10 wins.
- Spelling does not need to be exact (Arabic hamza variants, tashkeel, ة/ه, ى/ي are normalized; small typos tolerated).
- Extras: hints (limited uses), skip, give up, timer, daily challenge, leaderboard, dashboard with progress ("24 of 120 questions solved").

**Monetization:** planned but NOT decided or designed (ads and/or premium). Do not build ad or paywall UI until the owner chooses. Leave clean slots only (see section 9).

---

## 2. Non-negotiable design rules

1. `<html lang="ar" dir="rtl">`. The layout is mirrored: logo on the right, tools/avatar on the left, sidebars on the LEFT of the main content, ranks 1-5 in the right column and 6-10 in the left column.
2. **No letter-spacing anywhere** (`tracking-normal`, and never negative tracking). It breaks Arabic letter joining.
3. Use **Arabic-Indic digits** (٠١٢٣٤٥٦٧٨٩) for all numbers shown in the UI. Provide a `toAr(n)` helper.
4. **Dark purple theme with one soft mint-green accent.** Never use bright lime (the owner rejected it). Never use plain red for mistakes; use the pink token.
5. Use logical Tailwind utilities, not left/right: `ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`, `start-*`, `end-*`. Flip directional icons (chevrons) with `rtl:rotate-180` or by choosing the correct icon.
6. Avoid bidi-scrambled strings. Write "المركز ٤٢" not "#٤٢"; write "٣ من ١٠" not "٣ / ١٠".
7. The submit button wording is **"حزّر"** (the owner's own word). The submit button sits next to the input (on its left in RTL), as a separate button.
8. Copy: plain, short, active voice, sentence case. Buttons name the action: حزّر، ابدأ، كمّل، استسلام، تخطي. Errors say what happened and what to do.
9. Desktop first (1440px). Responsive down to mobile is required for the build.

---

## 3. Design tokens

| Token | Hex | Use |
|---|---|---|
| bg | `#140B26` | page background |
| card | `#1F1338` | cards, inputs |
| card2 | `#271A47` | active nav pill, raised surfaces |
| ink | `#F5F1FF` | primary text |
| mut | `#B3A6D4` | secondary text |
| soft | `#7F71A8` | tertiary text |
| line | `#33265C` | borders |
| brand (mint) | `#4ADE80` | success, primary button, progress, input border |
| onbrand | `#0F2A1A` | text on mint |
| violet | `#7C52F0` | active tab, filled-slot border |
| violetTint | `#2E1B63` | filled slot / chip background |
| pink | `#FF6B93` | mistakes, hard difficulty |
| pinkTint | `#3B1635` | mistake chip background |
| track | `#2C2150` | empty slot number tile, progress track |

Category icon tints (background / foreground): mint (`rgba(74,222,128,.14)` / `#4ADE80`), violet (`#2E1B63` / `#B79DFF`), pink (`#3B1635` / `#FF6B93`), blue (`#1D2150` / `#8EA2FF`).
Daily-challenge banner: `linear-gradient(110deg,#3B2290,#5B34D6)`, border `#6D45E0`.

**Typography:** Tajawal (400/500/700/800/900) via Google Fonts; fallback system sans. Scale: hero 68px/900, page title 50px/900, section title 38px/900, card title 24px/900, body 18-19px/500, labels 14-16px/700. Body line-height about 1.7, line length under 80 characters.

**Shape:** page side padding 48px, grid gaps 18px. Radii: cards 22px, buttons 14px (small 12px), input 22px, slots 14-16px, chips full. Cards are flat (background + 1px border). Only the primary button and the landing hero card get a soft glow.

---

## 4. Tailwind setup (use Tailwind v3.4 with Vite + React + TypeScript)

```bash
npm create vite@latest top10 -- --template react-ts
cd top10
npm i react-router-dom lucide-react zustand
npm i -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#140B26', card: '#1F1338', card2: '#271A47',
        ink: '#F5F1FF', mut: '#B3A6D4', soft: '#7F71A8', line: '#33265C',
        brand: { DEFAULT: '#4ADE80', ink: '#0F2A1A', tint: 'rgba(74,222,128,0.14)' },
        violet: { DEFAULT: '#7C52F0', tint: '#2E1B63' },
        pink: { DEFAULT: '#FF6B93', tint: '#3B1635' },
        track: '#2C2150',
      },
      fontFamily: { sans: ['Tajawal', 'system-ui', 'sans-serif'] },
      borderRadius: { card: '22px', btn: '14px' },
      boxShadow: { glow: '0 12px 30px -12px rgba(74,222,128,.55)' },
      letterSpacing: { normal: '0' },
    },
  },
  plugins: [],
}
```

`index.html`: set `<html lang="ar" dir="rtl">`, add the Google Fonts link for Tajawal.
`src/index.css`: `@tailwind base; @tailwind components; @tailwind utilities;` then `body{ @apply bg-bg text-ink font-sans antialiased; letter-spacing:0 }`.

---

## 5. Project structure

```
src/
  main.tsx, App.tsx            router + layout
  lib/
    arabic.ts                  toAr(), normalizeArabic(), matchGuess()
    storage.ts                 localStorage progress helpers
  data/
    categories.ts              categories -> topics -> questions (placeholder content)
  store/
    gameStore.ts               zustand: round state machine
    progressStore.ts           solved questions, best scores, streak (persisted)
  components/
    Header.tsx, Breadcrumb.tsx, Chip.tsx, Button.tsx, ProgressBar.tsx,
    CategoryCard.tsx, TopicCard.tsx, QuestionRow.tsx, Tabs.tsx, SearchBox.tsx,
    game/ Slot.tsx, SlotGrid.tsx, GuessInput.tsx, MistakesCard.tsx,
          WrongChips.tsx, GameActions.tsx, NextQuestions.tsx
    dashboard/ StatCard.tsx, WeeklyChart.tsx, CategoryProgress.tsx,
               RecentGames.tsx, Achievements.tsx
  pages/
    Landing.tsx, Categories.tsx, Topics.tsx, Questions.tsx,
    Game.tsx, Results.tsx, Leaderboard.tsx, Dashboard.tsx, SignIn.tsx
```

**Routes:**
```
/                         Landing
/categories               Categories
/categories/:cat          Topics (e.g. games)
/categories/:cat/:topic   Questions list (e.g. minecraft)
/play/:questionId         Game screen
/results/:questionId      Results screen
/leaderboard              Leaderboard
/dashboard                Dashboard (my progress)
/signin                   Sign in / sign up
```

---

## 6. Data model

```ts
export type Difficulty = 'easy' | 'medium' | 'hard'; // سهل / متوسط / صعب

export interface Answer {
  rank: number;            // 1..10
  label: string;           // display name, e.g. "بيضة التنين"
  aliases?: string[];      // accepted alternatives, e.g. ["دراغون ايج"]
}
export interface Question {
  id: string;
  title: string;           // "أندر ١٠ عناصر"
  difficulty: Difficulty;
  hints?: string[];        // up to 2-3, shown one at a time
  answers: Answer[];       // exactly 10
}
export interface Topic    { id: string; name: string; questions: Question[]; }
export interface Category { id: string; name: string; icon: string; tint: 'mint'|'violet'|'pink'|'blue'; topics: Topic[]; }
```

Content is placeholder now; the owner will replace it. Keep content in `data/categories.ts` (later swappable for an API/DB). Seed at least: ألعاب > ماينكرافت with 3 complete questions so every page has real content.

Progress model (persisted in localStorage, key `top10:progress:v1`):
```ts
interface QuestionResult { questionId: string; found: number; mistakes: number; seconds: number; solvedAt: string; won: boolean; }
interface Progress { results: Record<string, QuestionResult>; streak: number; lastPlayed: string; }
```
"Solved" = `won === true`. Dashboard numbers (solved of total, accuracy, best time, streak, per-category progress) are derived from this.

---

## 7. Game logic

**State machine** (zustand): `idle -> playing -> won | lost`.
State: `question`, `found: Record<rank, Answer>`, `wrong: string[]` (normalized), `guess`, `mistakes`, `seconds`, `hintsLeft`, `status`, `lastFeedback`.

**On submit(guess):**
1. Normalize the guess. Ignore empty input.
2. If it was already guessed (correct or wrong), show feedback "جرّبتها من قبل" and do NOT add a mistake.
3. Find the matching answer (exact normalized match against `label` and `aliases`, then fuzzy match).
4. Match: put it in `found[rank]`, feedback "صح! مكانه رقم ٣" (mint), animate that slot once.
5. No match: `mistakes += 1`, add chip, feedback "غلط: «ستيف» مش بالقائمة" style message in pink (keep the tone simple and non-apologetic).
6. If `found` has 10 entries -> `won`. If `mistakes === 5` -> `lost` (reveal the missing answers in a muted style). Navigate to Results after a short delay.

**Hint:** reveals the next hint text for an unfound answer without filling the slot; limited to 2 uses ("متبقي ٢").
**Skip:** goes to the next question (not counted as a loss). **Give up:** ends the round as lost.
**Timer:** counts up in seconds while `playing`; display as ٠٢:١٤.
**Keyboard:** Enter = submit, Esc = clear, Tab = hint. Keep focus in the input at all times (autofocus, refocus after submit).

**`lib/arabic.ts`:**
```ts
const AR = '٠١٢٣٤٥٦٧٨٩';
export const toAr = (n: number | string) => String(n).replace(/\d/g, d => AR[+d]);

export function normalizeArabic(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, '')   // tashkeel + tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
    .replace(/[^\p{L}\p{N}\s]/gu, '')               // punctuation
    .replace(/^ال/, '')                              // leading "al-"
    .replace(/\s+/g, ' ')
    .trim();
}

export function levenshtein(a: string, b: string) { /* standard DP */ }

// tolerate 1 typo for words of 5+ chars, 2 typos for 9+ chars, 0 for short words
export function isMatch(guess: string, target: string) {
  const g = normalizeArabic(guess), t = normalizeArabic(target);
  if (g === t) return true;
  const max = t.length >= 9 ? 2 : t.length >= 5 ? 1 : 0;
  return max > 0 && levenshtein(g, t) <= max;
}
```
Add unit tests (Vitest) for: hamza variants, ة/ه, tashkeel, "ال" prefix, one-typo tolerance, and that short words do not fuzzy-match wrongly.

---

## 8. Page specs

**Header (all pages):** 72px, bottom border. Right: logo (mint rounded square with "١٠" + "توب ١٠") then nav pills: الفئات، المتصدرون، لوحتي (active = card2 pill). Left: sound toggle, settings, avatar (mint circle, dark initials). On Landing the left side is "تسجيل الدخول" + mint "ابدأ اللعب" button, and nav is الفئات، كيف تلعب، المتصدرون.

**Landing:** hero (right: chip "لعبة كتابة جديدة", H1 "اكتب أفضل ١٠ قبل ما تخسر فرصك الخمس", short paragraph, buttons "ابدأ اللعب" + "كيف تلعب؟", 3 stats; left: a live-looking game preview card with floating chips "الأخطاء ١ من ٥" and "صح! مكانه رقم ٣"); category grid (8 cards); "كيف تلعب؟" three numbered steps (numbering is allowed here because it is a real sequence); daily-challenge banner (purple gradient, "تحدي اليوم", "العب الآن"); weekly top-5 players table; footer (logo, links, rights).

**Categories:** title "اختر فئة", search box, daily-challenge banner, filter tabs (الكل، الأكثر لعبًا، جديد، أكملتها), 4-column grid of category cards: icon tile, name, progress bar, "٣٦ سؤالًا" and "حللت ٤".

**Topics (e.g. ألعاب):** breadcrumb with back button, big icon + title + "حللت ٤ من ٣٦ سؤالًا في هذه الفئة", search, tabs (الكل، ألعاب بدأتها، ألعاب جديدة), 4-column grid of topic cards (letter tile, name, "بدأت"/"جديد" chip, progress bar, counts).

**Questions (e.g. ماينكرافت):** breadcrumb, header, tabs (كل الأسئلة، لم أحلها، حللتها) + difficulty filter, a card list of rows: number tile, title, difficulty chip, status chip (حللتها / قيد اللعب / جديد), best score "٨ من ١٠", action button (ابدأ / كمّل / العب مرة ثانية). Left side card: progress ring (٣٣٪), solved count, accuracy, best time, rank "المركز ٣١", "متصدرو ماينكرافت" button. Titles omit the topic name (the page already says it). Buttons never wrap.

**Game (the core screen):** breadcrumb row. Right/main column: H1 question ("أندر ١٠ عناصر في ماينكرافت"), one-line rules ("اكتب اسم عنصر واضغط Enter، والإجابة الصحيحة تنزل في مكانها. بعد ٥ أخطاء تنتهي الجولة."), 10 slots in two columns of five (right column ranks 1-5, left column 6-10; each slot 80px tall: empty = dashed border, dim number tile, small dash; filled = violetTint background, violet border, mint number tile with dark text, answer name 25px/800; newest gets a soft mint ring; rank 1 shows tag "الأندر"), then the input row: big input (96px, 2px mint border, soft mint ring, 38px text, mint caret) + separate mint "حزّر" button (30px/900, glow). Under it: shortcuts "Enter حزّر · Tab تلميح · Esc مسح · لا يهم الإملاء الدقيق أو الهمزات". Left sidebar (340px): mistakes card ("الأخطاء ١ من ٥", 5 pips turning pink, time ٠٢:١٤, struck-through wrong chips), found card ("تم العثور على ٣ من ١٠" + progress), buttons (كشف تلميح with "متبقي ٢" badge, تخطي, استسلام), "التالي في ماينكرافت" list with difficulty and a "عرض كل أسئلة ماينكرافت" link. Feedback message line appears under the input after each guess (mint for correct, pink for wrong).

**Results (NOT designed yet; propose to the owner first, keep the same system):** win/lose heading, the full 10-slot list (found = mint, missed = muted with the answer revealed), stats (found x of 10, mistakes x of 5, time, accuracy), buttons "العب مرة ثانية" / "السؤال التالي" / "شارك نتيجتك", and a "المتصدرون" teaser.

**Leaderboard (NOT designed yet):** tabs (اليوم، الأسبوع، كل الوقت) + topic filter, top-3 highlight, ranked table (rank, avatar+name, solved count, points), "ترتيبك" sticky row.

**Dashboard:** greeting "أهلًا أحمد" + sentence "حللت ٢٤ سؤالًا من أصل ١٢٠. باقي ٩٦ سؤالًا بانتظارك."; rank card "المركز ٤٢ من ١٬٢٠٠" + "كمّل اللعب"; 4 stat cards (أسئلة محلولة ٢٤ من ١٢٠، الدقة ٨٢٪، أفضل وقت، أيام متتالية ٧); overall progress bar; weekly activity bars (today = mint, others violet); progress by category (bars); recent games (title, category, score chip, day); achievements (locked ones dimmed).

**SignIn (NOT designed yet):** simple centered card; keep the guest flow ("تلعب بدون تسجيل") prominent.

---

## 9. Monetization slots (only when the owner decides)

Keep these as empty, easily removable containers; do not render ads or paywalls by default:
- a banner between sections on the Landing page and under the question list;
- a "Pro" button in the header and a Pro card on the dashboard;
- an interstitial before "العب مرة ثانية" on Results.
Never put ads inside the Game screen's play area.

---

## 10. Build plan (do it in stages and verify each)

1. Scaffold (Vite + React + TS + Tailwind v3.4), tokens, font, RTL root, `toAr`, `normalizeArabic` + tests.
2. Shared components (Header, Button, Chip, ProgressBar, Tabs, SearchBox, Breadcrumb, cards).
3. Data file with placeholder content and the stores.
4. **Game page first** (it is the heart): slots, input + button, mistakes, hints, timer, keyboard shortcuts, win/lose.
5. Categories -> Topics -> Questions pages wired with real routing and progress.
6. Landing page.
7. Dashboard (derived from the progress store).
8. Results, Leaderboard (mock data), SignIn (UI only) after the owner approves their designs.
9. Responsive pass (mobile 390px, tablet 768px), keyboard focus rings (visible, mint), `prefers-reduced-motion` respected, contrast check.
10. Verify in a browser: take screenshots of every page at 1440px and 390px and compare against the design images. Check specifically: RTL mirroring, joined Arabic letters, no wrapped buttons, no bidi-scrambled numbers, the mint submit button sits left of the input.

Motion: keep it minimal. One subtle fill animation when a correct answer drops into its slot, a small shake on a wrong guess. No scattered hover animations or entrance fades.

Accessibility: the input has a visible label (`aria-label="اكتب تخمينك"`), feedback region is `aria-live="polite"`, slots are a list with rank + content readable by screen readers, all buttons are real `<button>`s.

---

## 11. Decisions already made by the owner (do not revisit without asking)

- Language: Arabic only, RTL.
- Palette: dark purple + soft mint green. Bright lime rejected.
- The guess box has a separate submit button "حزّر" next to it.
- Game is typing only; no game engine.
- Questions have exactly 10 ranked answers; 5 mistakes max.
- Category > topic > question structure.
- Content is placeholder and will be replaced by the owner.

## 12. Open questions (ask the owner)

- Monetization model (ads, subscription, or both).
- Accounts: guest play allowed? Where do leaderboards and progress live (localStorage now, backend later)?
- Real question content and who writes it.
- Scoring formula for the leaderboard (speed bonus? mistakes penalty?).
- Domain / brand name final form (currently "توب ١٠").

## 13. Reference images the owner should attach

Game screen (final), landing, categories, topics, questions, dashboard PNGs from the design chat. If the images are attached, match them pixel-closely; this file explains the intent and the rules behind them.
