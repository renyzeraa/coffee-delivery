/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        background: '#FAFAFA',
        'base-card': '#F3F2F2',
        'base-input': '#EDEDED',
        'base-button': '#E6E6E5',
        'base-hover': '#D7D5D5',
        'base-label': '#8D8686',
        'base-text': '#574F4D',
        'base-subtitle': '#403937',
        'base-title': '#272221',

        'purple-light': '#EBE5F9',
        purple: '#8047F8',
        'purple-dark': '#4B2995',

        'yellow-light': '#F1E9C9',
        yellow: '#DBAC2C',
        'yellow-dark': '#C47F17',
      },
      fontFamily: {
        'baloo-2': ['"Baloo 2"', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      }
    },
    fontSize: {
      'titleXL': ['3rem', '130%'],
      'titleL': ['2rem', '130%'],
      'titleM': ['1.5rem', '130%'],
      'titleS': ['1.25rem', '130%'],
      'titleXS': ['1.125rem', '130%'],
      'textL': ['1.25rem', '130%'],
      'textM': ['1rem', '130%'],
      'textS': ['0.875rem', '130%'],
      'textXS': ['0.75rem', '130%'],
      tag: ['0.625rem', '130%'],
      'buttonG': ['0.875rem', '130%'],
      'buttonM': ['0.75rem', '130%'],
    }
  },
  plugins: [],
}

