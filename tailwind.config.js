/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-bg': '#faf8ef',
        'board-bg': '#bbada0',
        'tile-empty': '#cdc1b4',
        'text-dark': '#776e65',
        'text-light': '#f9f6f2',
        'score-bg': '#bbada0',
        'score-label': '#eee4da',
        'button-bg': '#8f7a66',
        'button-hover': '#9f8a76',
      },
      fontFamily: {
        sans: ['Clear Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      keyframes: {
        appear: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        appear: 'appear 0.2s ease-in-out',
      }
    },
  },
  plugins: [],
}
