#!/usr/bin/env node

const fs = require('fs')

let now = new Date()
if (process.argv[2]) {
  now = new Date(process.argv[2])
}

const timestamp = Math.trunc(now.valueOf() / 1e3)
const outputPath = `./src/posts/${timestamp}.md`
const content = `
---
date: ${now.toISOString()}
---

`.trimStart()

fs.writeFileSync(outputPath, content)
