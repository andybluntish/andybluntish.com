const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'media',
  theme: {
    colors: {
      current: 'currentColor',
      gray: colors.coolGray,
      foreground: 'var(--foreground)',
      background: 'var(--background)',
      accent: 'var(--accent)',
      deemphasised: 'var(--deemphasised)',
      divider: 'var(--divider)',
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
