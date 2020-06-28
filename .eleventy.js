module.exports = (config) => {
  config.addPassthroughCopy('src/img')

  return {
    dir: { input: 'src', output: 'dist', includes: '_includes' },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
