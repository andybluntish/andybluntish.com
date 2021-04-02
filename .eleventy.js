const isProd = process.env.NODE_ENV === 'production'

if (!isProd) {
  require('dotenv').config()
}

const markdownIt = require('markdown-it')
const parse5 = require('parse5')
const { PurgeCSS } = require('purgecss')
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

  eleventyConfig.addTransform('purgecss', async function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      // parse the HTML content
      const document = parse5.parse(content)

      // get the <style> node from the <head>
      const styleNode = document.childNodes
        .find((node) => node.nodeName === 'html')
        .childNodes.find((node) => node.nodeName === 'head')
        .childNodes.find((node) => node.nodeName === 'style')
        .childNodes.find((node) => node.nodeName === '#text')
      // store the CSS as a string
      const css = styleNode.value
      // remove the CSS from the <style> node (otherwise purging will think it's being used)
      styleNode.value = ''
      // serialize the HTML without CSS as a string
      const contentWithoutStyles = parse5.serialize(document)
      // run purgecss using the content (sans-CSS) and the extracted CSS
      const purgeCSSResult = await new PurgeCSS().purge({
        content: [
          {
            raw: contentWithoutStyles,
            extension: 'html',
          },
        ],
        css: [
          {
            raw: css,
          },
        ],
        variables: true,
        fontFace: true,
        keyframes: true,
      })

      // set the <style> node content to the purged CSS string
      styleNode.value = purgeCSSResult[0].css

      // return the serialized document as the content for this page
      // the <style> node's content now includes only the CSS used in the HTML of the page
      return parse5.serialize(document)
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
