const fs = require('fs')
const path = require('path')
const readline = require('readline')
const os = require('os')
const KSUID = require('ksuid')

const dir = './src/notes/'
const files = fs.readdirSync(dir).filter((file) => path.extname(file) === '.md')

files.forEach((fileName) => {
  const filePath = `${dir}${fileName}`
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  })

  let id
  let lines = []
  rl.on('line', (line) => {
    const match = line.match(/^date: ([0-9TZ:\-.]*)$/)
    if (match && match[1]) {
      let dateString = match[1]
      id = KSUID.randomSync(new Date(dateString))
      lines.push(`uuid: ${id.string}`)
      lines.push(`date: ${id.date.toISOString()}`)
    } else {
      lines.push(line)
    }
  })

  rl.on('close', () => {
    const newFilePath = `${dir}${id.string}.md`
    console.log('==============')
    console.log(`Removing file: ${filePath}`)
    fs.rmSync(filePath)
    console.log(`Writing file: ${newFilePath}`)
    fs.writeFileSync(newFilePath, lines.join(os.EOL))
    console.log('--------------')
  })
})
