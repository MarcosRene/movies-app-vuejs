/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: '"Inter", sans-serif',
      },

      keyframes: {
        'slider-right-to-left': {
          '0%': { transform: 'translateX(100px)', opacity: 0 },
          '100%': { transform: 'translateX(0px)', opacity: 1 },
        },
        'slider-left-to-right': {
          '0%': { transform: 'translateX(-100px)', opacity: 0 },
          '100%': { transform: 'translateX(0px)', opacity: 1 },
        },
      },
      animation: {
        'slider-right-to-left': 'slider-right-to-left 1s ease-in-out',
        'slider-left-to-right': 'slider-left-to-right 1s ease-in-out',
      },
    },
  },
  plugins: [],
}
