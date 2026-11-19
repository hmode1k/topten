# توب ١٠ (Top 10)

Arabic RTL typing-guess game. React + TypeScript + Vite + Tailwind 3.4 + zustand.
The product and design rules live in `TOP10-PROJECT-GUIDE.md`.

```bash
npm install
npm run dev     # development server
npm test        # Vitest: Arabic helpers + game logic
npm run build   # type-check + production build
```

## What is built

| Route | Page |
| --- | --- |
| `/` | Landing (hero only: headline, play button, stats, game preview) |
| `/categories` | Categories (search, filter tabs, daily challenge) |
| `/categories/:cat` | Topics |
| `/categories/:cat/:topic` | Questions list with progress card |
| `/play/:questionId` | Game screen (slots, hints, timer, keyboard shortcuts, end-of-round panel) |
| `/dashboard` | Dashboard, derived from saved progress |

Waiting for the owner's approval before they are built: **Results**, **Leaderboard**, **SignIn**
(their routes show a "coming soon" page; the game screen shows a simple end panel for now).

## Things to know

- **Logo placeholder:** `src/components/Logo.tsx`. Put the real file in `/public` and set `LOGO_SRC`.
- **Content** is placeholder (Minecraft, 3 questions) in `src/data/categories.ts`.
- **Mock data** (rank numbers, player name) is in `src/lib/mock.ts`. Replace it when a backend exists.
- **Progress** is saved in `localStorage` under `top10:progress:v1`.
- **Monetization:** no ad or paywall UI yet (guide section 9).
- Sound and settings buttons in the header are UI only for now.
