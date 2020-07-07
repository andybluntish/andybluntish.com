const htmlmin = require('html-minifier')

module.exports = (config) => {
  config.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        minifyCSS: true,
        minifyJS: true,
      })
    }

    return content
  })

  config.addLayoutAlias('base', 'layouts/base.html')
  config.addLayoutAlias('home', 'layouts/home.html')

  config.addPassthroughCopy('src/img')
  config.addPassthroughCopy('src/manifest.json')
  config.addPassthroughCopy('src/_redirects')

  return {
    dir: { input: 'src', output: 'dist' },
    templateFormats: ['html', 'njk', 'md'],
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
