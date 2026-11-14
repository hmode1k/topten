/** @type {import('tailwindcss').Config} */

/**
 * Design tokens for the site.
 *
 * Every color used in the UI is defined here, so re-theming the whole site
 * means editing this one file (e.g. swap the gold accent, or the greens).
 * Components only use these names (bg-forest, text-ink, border-gold, ...)
 * and never raw hex values.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // --- Dark green surfaces (page + sidebar) ---
        forest: {
          DEFAULT: '#0A2A20', // page background
          panel: '#123F31', // sidebar cards
          row: '#0F3528', // rows inside sidebar cards
          line: '#1F5A45', // borders on dark panels
          divider: '#1B4A39', // header / footer divider lines
          ring: '#2A6650', // outlined icon buttons on dark
        },
        // --- Greens used on light surfaces ---
        pine: '#1B5E43', // buttons, progress bar, active outlines
        ink: '#0F3D2E', // main text on light surfaces
        // --- Light surfaces ---
        cream: '#F6F4EE', // game card background
        mint: '#DDEFE6', // "correct" chip background
        slot: '#E6EFE9', // hidden answer slot background
        'slot-line': '#DCE6DF', // light borders
        // --- Text helpers ---
        muted: '#4F6A5E', // secondary text on light surfaces
        'muted-dark': '#A9C4B7', // secondary text on dark surfaces
        'slot-text': '#8AA397', // "؟؟؟؟" placeholder text in hidden slots
        // --- Accents ---
        gold: '#C9A24B', // rank badges, "10" underline, streak number
        danger: '#C62F3F', // used mistakes
        'danger-soft': '#FBE4E4', // wrong-answer chip background
      },
      fontFamily: {
        // Loaded from Google Fonts in index.html
        display: ['Cairo', 'sans-serif'],
        body: ['Tajawal', 'sans-serif'],
      },
      boxShadow: {
        card: '0 24px 60px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
};
