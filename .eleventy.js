module.exports = (config) => {
  config.addLayoutAlias('base', 'layouts/base.html')
  config.addLayoutAlias('home', 'layouts/home.html')

  config.addPassthroughCopy('src/*.css')
  config.addPassthroughCopy('src/img')

  return {
    dir: { input: 'src', output: 'dist' },
    templateFormats: ['html', 'njk', 'md'],
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
