# Top 10 – Front end

Arabic (RTL) "guess the Top 10" game. React 18 + Vite + Tailwind CSS 3.
This is the **front end only**; the backend is not included. All data comes
from sample files until you connect your API (see "Connecting your backend").

## Run it

Requires Node.js 18 or newer.

```bash
npm install
npm run dev      # development server with hot reload
npm run build    # production build in /dist
npm run preview  # serve the production build locally
```

## Project structure

```
index.html                  Page shell: lang="ar" dir="rtl", Google Fonts
tailwind.config.js          ALL colors / fonts (the design tokens)
src/
  main.jsx                  Mounts <App />
  App.jsx                   Home page: header, game + sidebar, footer
  index.css                 Tailwind directives + base styles
  content/strings.js        Every piece of Arabic text in the UI
  data/mockData.js          Sample challenge/categories + data shapes (typedefs)
  services/api.js           The ONLY file that talks to the backend
  hooks/
    useHomeData.js          Loads challenge, categories, streak (status/reload)
    useTop10Game.js         Game rules and state (no UI)
  lib/
    normalizeArabic.js      Makes answer matching forgiving (ا/أ/إ, ة/ه, tashkeel)
  components/
    ui/                     Button, IconButton, Icons (reusable, no game logic)
    layout/                 Header, Footer
    game/                   GameCard (owns state) and its parts:
                            GameTitle, QuestionBanner, GuessForm,
                            StatusChip, ProgressRow, AnswerGrid, AnswerSlot
    sidebar/                Sidebar, StreakCard, CategoriesCard, CreateChallengeCard
```

Every file starts with a comment explaining what it is and what props it takes.

## Common changes

| I want to...                         | Edit                                             |
| ------------------------------------ | ------------------------------------------------ |
| Change colors (gold, greens, ...)    | `tailwind.config.js` → `theme.extend.colors`     |
| Change fonts                         | `index.html` (link) + `tailwind.config.js`       |
| Reword any text                      | `src/content/strings.js`                         |
| Change the number of allowed mistakes | `MAX_MISTAKES` in `src/hooks/useTop10Game.js`   |
| Change how answers are matched       | `src/lib/normalizeArabic.js` / `submitGuess`     |
| Reorder / remove sidebar cards       | `src/components/sidebar/Sidebar.jsx`             |
| Rearrange the game card              | `src/components/game/GameCard.jsx`               |
| Change how many categories show before "show all" | `initialCount` prop in `CategoriesCard.jsx` |
| Change the page width / side padding | `max-w-[1400px]` and `px-*` in `App.jsx`         |
| Add a site name / logo               | `Header.jsx`, `strings.js` (`site.*`)            |

## Connecting your backend

1. Open `src/services/api.js`. Each function (`getDailyChallenge`,
   `getCategories`, `getStreak`) currently returns sample data.
2. Replace each body with a `fetch` call (an example is in the file header) and
   keep the returned shape. The shapes (`Challenge`, `Answer`, `Category`) are
   documented at the top of `src/data/mockData.js`.
3. Set the base URL with a `.env` file: `VITE_API_BASE=https://your-api.example`
   or use the dev proxy example in `vite.config.js`.

A challenge looks like this:

```json
{
  "id": "challenge-12",
  "number": 12,
  "title": "…the question…",
  "host": "…",
  "answers": [
    { "rank": 1, "text": "…", "aliases": ["…", "…"] }
  ]
}
```

Guess checking currently happens in the browser (`submitGuess` in
`useTop10Game.js`), which means the answers are sent to the client. If you
want to keep answers secret, make `submitGuess` call a backend endpoint
instead and have the API return only the matched answer for each guess.

## Placeholders (TODO)

- `[اسم موقعك]`, `[اسمك]`, `[عدد]` in `strings.js` / `mockData.js`.
- Login, theme toggle, category click, "create challenge": empty handlers in
  `App.jsx`, ready to be connected.
- The sample answers in `mockData.js` are placeholders, not verified facts.

## Notes

- **RTL:** the page is `dir="rtl"`, so flex/grid layouts mirror automatically.
  Prefer Tailwind logical utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`)
  over `ml/mr/pl/pr` when adding new styles.
- **Accessibility:** icon buttons require a `label`, the input has a hidden
  `<label>`, feedback is announced through an `aria-live` region.
