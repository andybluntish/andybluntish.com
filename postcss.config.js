const plugins = [require('tailwindcss')]

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('autoprefixer'), require('cssnano'))
}

module.exports = { plugins }
