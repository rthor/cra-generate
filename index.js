#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const os = require('os')
const mkpath = require('mkpath')
const options = process.argv.slice(2)

if (options.length < 1) {
  process.exit(1)
}

function captialized(word) {
  const _word = '' + word
  return _word.charAt(0).toUpperCase() + _word.slice(1)
}

function getFile(file) {
  return fs.readFileSync(path.resolve(__dirname, 'templates/component/', file), 'utf8')
}

function saveFile(name, ext, file) {
  const filePath = path.join(targetPath, `/${name}.${ext}`)
  const contents = file.replace(/\$Name\$/g, Component).replace(/\$name\$/g, component)
  fs.writeFile(filePath, contents, 'utf8')
}

const component = options.shift()
const Component = captialized(component)

const isPure = options.includes('--pure') || options.includes('-p')
const useFlow = options.includes('--flow') || options.includes('-f')

const targetPath = path.resolve(process.cwd(), 'src/components/', component)

const jsFiles = {
  index: getFile('index.js'),
  [component]: getFile(isPure ? 'stateless.js' : 'stateful.js'),
}

const styles = getFile('styles.css')

mkpath(targetPath, err => {
  if (err) {
    return process.exit(1)
  }

  Object.keys(jsFiles).forEach(file => {
    let content = jsFiles[file]
    if (useFlow) content = `// @flow${os.EOL}${os.EOL}${content}`
    saveFile(file, 'js', content)
  })

  saveFile('styles', 'css', styles)
})
