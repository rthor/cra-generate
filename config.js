'use strict'

const fs = require('fs')
const path = require('path')

let pkg = {}

try {
  pkg = require(path.resolve(process.cwd(), 'package.json'))
} catch (err) {}

const defaultOptions =  {
  directory: 'components',
  typeCheck: fs.existsSync(path.join(process.cwd(), '.flowconfig')) && 'flow',
  cssExtension: 'css',
  semi: true,
  fileFormat: 'pascalCase',
  componentFormat: 'pascalCase',
  test: 'jest',
}

module.exports = function (program) {
  const config = Object.assign({}, defaultOptions, pkg.craGenerate || {})

  config.isFunctional = Boolean(program.functional)
  config.semi = program.semi

  if (program.test) {
    config.test = program.test === 'none' ? false : program.test
  }

  if (program.cssExtension) {
    config.cssExtension = program.cssExtension
  }

  if (program.typeCheck) {
    config.typeCheck = program.typeCheck
  }

  if (program.directory) {
    config.directory = program.directory
  }

  return config
}
