const isProd = process.env.NODE_ENV === 'production'

if (!isProd) {
  require('dotenv').config()
}

const markdownIt = require('markdown-it')
const htmlmin = require('html-minifier')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

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

  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addTransform('purgecss', function (content, outputPath) {
    if (isProd && outputPath.endsWith('.html')) {
      // get the contents of the <style> block
      // using the content and styles, run purge css
      // replace the contents of the <style> block with the pruged css
      // optionally, minify the css (though this can be handled by htmlmin in the next step)
    }

    return content
  })

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (isProd && outputPath.endsWith('.html')) {
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

  eleventyConfig.addFilter('machineDate', function (date) {
    if (typeof date.toISOString !== 'function') {
      date = new Date(date)
    }

    return date.toISOString()
  })

  eleventyConfig.addFilter('shortDate', function (date) {
    if (typeof date.toISOString !== 'function') {
      date = new Date(date)
    }

    return new Intl.DateTimeFormat('en-AU', {
      dateStyle: 'short',
    }).format(date)
  })

  eleventyConfig.addFilter('humanDate', function (date) {
    if (typeof date.toISOString !== 'function') {
      date = new Date(date)
    }

    return new Intl.DateTimeFormat('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  })

  eleventyConfig.addFilter('humanDateTime', function (date) {
    if (typeof date.toISOString !== 'function') {
      date = new Date(date)
    }

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
