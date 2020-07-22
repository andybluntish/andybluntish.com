const { series, parallel } = require('gulp')
const { exec } = require('child_process')

const input = './src'
const output = './dist'
const buildCommand = `yarn run eleventy --input=${input} --output=${output}`

async function clean() {
  return exec(`rm -rf ${output}`)
}

function build() {
  return exec(buildCommand)
}

function serve() {
  return exec(`${buildCommand} --serve`)
}

async function purgeCSS() {}

async function minifyHTML() {}

async function minifyCSS() {}

exports.build = series(clean, build, purgeCSS, parallel(minifyHTML, minifyCSS))
exports.serve = series(clean, serve)
