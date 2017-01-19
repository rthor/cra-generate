#!/usr/bin/env node
'use strict'

const commander = require('commander')
const chalk = require('chalk')
const getConfig = require('./config')
const generate = require('./generate')
const version = require('./package.json').version

let component = null

const program = commander
  .version(version)
  .option('-f, --functional', 'create a functional component')
  .option('-t, --type-check [system]', 'add @flow comment to script files')
  .option('-c, --css-extension [extension]', 'changes the extension of generated css files')
  .option('-d, --directory [dir]', 'specify a directory for the component')
  .option('--test [type]', 'either "jest" or "none"')
  .arguments('<component>')
  .action((c) => component = c)
  .parse(process.argv)

if (component == null) {
  console.error('A component’s name is required.')
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<component>')}`)
  process.exit(1)
} else {
  generate(component, getConfig(program))
}
