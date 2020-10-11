module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      textColor: {
        primary: 'var(--foreground)',
        accent: 'var(--accent)',
      },
      backgroundColor: {
        primary: 'var(--background)',
      },
    },
  },
  purge: {
    preserveHtmlElements: false,
    content: ['./src/**/*.html', './src/**/*.njk', './src/**/*.md'],
  },
}
