module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_pages/**/*.html',
    './_posts/**/*.html',
    './**/*.markdown',
    './index.html',
    './src/**/*.{html,tsx,ts,jsx,js}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      colors: {
        'byu-navy': '#002E5D',
        'byu-royal': '#0047BA',
        'byu-light-blue': '#BDD6E6',
        'byu-slate': '#7C878E',
        'byu-light-gray': '#C7C9C7',
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
}
