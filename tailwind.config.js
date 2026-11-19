/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#140B26',
        card: '#1F1338',
        card2: '#271A47',
        ink: '#F5F1FF',
        mut: '#B3A6D4',
        soft: '#7F71A8',
        line: '#33265C',
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
