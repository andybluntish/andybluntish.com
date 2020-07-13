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

  config.addFilter('machineDate', function (date) {
    return date.toISOString()
  })

  config.addFilter('humanDate', function (date) {
    const formattedDate = new Intl.DateTimeFormat('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)

    const formattedTime = new Intl.DateTimeFormat('en-AU', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date)

    return `${formattedDate} at ${formattedTime}`
  })

  config.addLayoutAlias('base', 'layouts/base.html')
  config.addLayoutAlias('post', 'layouts/post.html')

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
