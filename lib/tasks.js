const { promisify } = require('util')
const cp = require('child_process')
const exec = promisify(cp.exec)

const input = './src'
const output = './dist'
const buildCommand = `yarn run eleventy --input=${input} --output=${output}`

async function clean() {
  console.log('- clean')

  await exec(`rm -rf ${output}`)
}

async function build() {
  console.log('- build')

  await exec(buildCommand)
}

async function serve() {
  console.log('serving...')

  await exec(`${buildCommand} --serve`)
}

async function purgeCSS() {
  console.log('- purge CSS')
}

async function minifyHTML() {
  console.log('- minify HTML')
}

async function minifyCSS() {
  console.log('- minify CSS')
}

async function done() {
  console.log('All done!')
}

exports.build = () =>
  Promise.resolve()
    .then(clean)
    .then(build)
    .then(purgeCSS)
    .then(() => Promise.all([minifyHTML(), minifyCSS()]))
    .then(done)

exports.serve = () => Promise.resolve().then(clean).then(serve).then(done)
