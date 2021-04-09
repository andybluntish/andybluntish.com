if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const markdownIt = require('markdown-it')

module.exports = (eleventyConfig) => {
  eleventyConfig.setDataDeepMerge(true)

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
    })
  )

  // Plugins
  eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'))
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'))
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))

  // Transforms
  eleventyConfig.addTransform('purgecss', require('./lib/transforms/purgecss'))
  eleventyConfig.addTransform('htmlmin', require('./lib/transforms/htmlmin'))

  // Filters
  eleventyConfig.addFilter('machineDate', require('./lib/filters/machine-date'))
  eleventyConfig.addFilter('shortDate', require('./lib/filters/short-date'))
  eleventyConfig.addFilter('humanDate', require('./lib/filters/human-date'))
  eleventyConfig.addFilter('humanDateTime', require('./lib/filters/human-date-time'))

  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('src/manifest.json')
  eleventyConfig.addPassthroughCopy('src/_redirects')

  return {
    dir: { input: 'src', output: 'dist' },
    templateFormats: ['html', 'njk', 'md'],
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
