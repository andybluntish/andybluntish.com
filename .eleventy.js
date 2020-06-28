module.exports = (config) => {
  config.addLayoutAlias('base', 'layouts/base.html')
  config.addLayoutAlias('home', 'layouts/home.html')
  config.addPassthroughCopy('src/img')

  return {
    dir: { input: 'src', output: 'dist' },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
