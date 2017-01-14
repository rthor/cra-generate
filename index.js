#!/usr/bin/env node
'use strict'

const commander = require('commander')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const mkpath = require('mkpath')
const { EOL } = require('os')
const { version } = require('./package.json')

let component

const program = commander
  .version(version)
  .option('-f, --functional', 'create a functional component')
  .option('-t, --use-flow', 'add @flow comment to script files')
  .arguments('<component>')
  .action((c) => component = c)
  .parse(process.argv)

if (!component) {
  console.error('A component’s name is required.')
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<component>')}`)
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

const Component = captialized(component)
const isPure = program.functional
const useFlow = program.useFlow

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
    if (useFlow) content = `// @flow${EOL}${EOL}${content}`
    saveFile(file, 'js', content)
  })

  saveFile('styles', 'css', styles)
})
