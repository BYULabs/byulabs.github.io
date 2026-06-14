const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_pages/**/*.html',
    './_posts/**/*.html',
    './**/*.markdown',
    './*.html',
    './src/**/*.{html,tsx,ts,jsx,js}',
    './assets/js/*.js',
  ],
  darkMode: ['selector', '[class~="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('light', '.light &');
    }),
  ],
}
