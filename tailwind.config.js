/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#4F378B',
        50: '#F0EBFF',
        100: '#C8BBEA',
        200: '#A692D1',
        300: '#816EB3',
        400: '#674D9B',
        500: '#4F378B',
        600: '#3E256F',
        700: '#2D165B',
        800: '#1E0D45',
        900: '#11062B',
        950: '#060011',
      },
      error: {
        DEFAULT: '#8C1D18',
        content: '#F9DEDC',
        focus: '#601410',
        'content-focus': '#F2B8B5',
      },
    },
    fontFamily: {
      serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
    },
    extend: {},
  },
  plugins: [],
}
