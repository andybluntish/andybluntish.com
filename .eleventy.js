const isProd = process.env.NODE_ENV === 'production'

if (!isProd) {
  require('dotenv').config()
}

const markdownIt = require('markdown-it')
const htmlmin = require('html-minifier')
const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')

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

  eleventyConfig.addFilter('date', function (date) {
    return new Date(date)
  })

  eleventyConfig.addFilter('machineDate', function (date) {
    return date.toISOString()
  })

  eleventyConfig.addFilter('shortDate', function (date) {
    return new Intl.DateTimeFormat('en-AU', {
      dateStyle: 'short',
    }).format(date)
  })

  eleventyConfig.addFilter('humanDate', function (date) {
    return new Intl.DateTimeFormat('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  })

  eleventyConfig.addFilter('humanDateTime', function (date) {
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

  eleventyConfig.addFilter('formatABV', function (value = 0) {
    return new Intl.NumberFormat('en-AU', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100)
  })

  eleventyConfig.addFilter('formatIBU', function (value = 0) {
    if (typeof value === 'string') {
      value = value.trim()
    }

    const num = Math.round(value)

    if (isNaN(num)) {
      return value
    } else if (!value) {
      return '-'
    } else {
      return value
    }
  })

  eleventyConfig.addFilter('srmToEBC', function (value = 0) {
    const num = Number(value)
    if (isNaN(num)) {
      return value
    }

    return value * 1.97
  })

  eleventyConfig.addFilter('formatEBC', function (value = 0) {
    if (typeof value === 'string') {
      value = value.trim()
    }

    const num = Number.parseFloat(value)

    if (isNaN(num)) {
      return value
    } else {
      return num.toFixed(1)
    }
  })

  eleventyConfig.addWatchTarget('src/*.css')

  eleventyConfig.addPassthroughCopy('src/img')
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
