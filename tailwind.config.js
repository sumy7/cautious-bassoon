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
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        appear: 'appear 0.3s ease-in-out',
        float: 'float 3s ease-in-out infinite',
      },
      boxShadow: {
        'tile': '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)',
        'tile-hover': '0 4px 8px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.15)',
        'board': '0 4px 20px rgba(0, 0, 0, 0.15), 0 0 40px rgba(187, 173, 160, 0.3)',
        'score': '0 2px 10px rgba(0, 0, 0, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.1)',
        'button': '0 4px 10px rgba(143, 122, 102, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
        'button-hover': '0 6px 15px rgba(143, 122, 102, 0.4), 0 4px 8px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(237, 194, 46, 0.5), 0 0 40px rgba(237, 194, 46, 0.3)',
      }
    },
  },
  plugins: [],
}
