const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  theme: {
    colors: {
      current: 'currentColor',
      gray: colors.trueGray,
      foreground: {
        DEFAULT: '#363d49',
        dark: '#d1d6e0',
      },
      background: {
        DEFAULT: '#fff',
        dark: '#1b1d22',
      },
      accent: {
        DEFAULT: '#d93f00',
        dark: '#ff9e66',
      },
      deemphasised: {
        DEFAULT: '#727780',
        dark: '#81858c',
      },
    },
    extend: {
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
      gridTemplateColumns: {
        layout: 'calc(50vw - 19rem) auto calc(50vw - 19rem)',
      },
      textColor: {
        primary: 'var(--foreground)',
      },
      backgroundColor: {
        primary: 'var(--background)',
      },
    },
  },
  variants: {
    transform: ['responsive', 'motion-safe', 'motion-reduce'],
    transitionDuration: ['responsive', 'motion-safe', 'motion-reduce'],
  },
  purge: {
    preserveHtmlElements: false,
    content: ['./src/**/*.html', './src/**/*.njk', './src/**/*.md'],
  },
}
