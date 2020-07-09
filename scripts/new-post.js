#!/usr/bin/env node

const fs = require('fs')
const now = new Date()
const timestamp = Math.floor(now.valueOf() / 1e3)
const outputPath = `./src/posts/${timestamp}.md`
const content = `
---
date: ${now.toISOString()}
---

`.trimStart()

fs.writeFileSync(outputPath, content)
