module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    preserveHtmlElements: false,
    content: ['./src/**/*.html', './src/**/*.njk', './src/**/*.md'],
  },
}
