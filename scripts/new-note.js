const fs = require('fs')
const KSUID = require('ksuid')

let now = new Date()
if (process.argv[2]) {
  now = new Date(process.argv[2])
}

const id = KSUID.randomSync(now)
const outputPath = `./src/notes/${id.string}.md`
const content = `
---
uuid: ${id.string}
date: ${id.date.toISOString()}
---

`.trimStart()

fs.writeFileSync(outputPath, content)
