const plugins = []

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('autoprefixer'))
  plugins.push(
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    })
  )
}

module.exports = { plugins }
