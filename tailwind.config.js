const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      current: 'currentColor',
      gray: colors.trueGray,
      foreground: {
        DEFAULT: 'var(--foreground)',
        dark: 'var(--foreground)',
      },
      background: {
        DEFAULT: 'var(--background)',
        dark: 'var(--background)',
      },
      accent: {
        DEFAULT: 'var(--accent)',
        dark: 'var(--accent)',
      },
      deemphasised: {
        DEFAULT: 'var(--deemphasised)',
        dark: 'var(--deemphasised)',
      },
    },
    extend: {
      screens: {
        light: { raw: '(prefers-color-scheme: light)' },
        dark: { raw: '(prefers-color-scheme: dark)' },
      },
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
