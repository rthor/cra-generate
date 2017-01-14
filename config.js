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
  fileFormat: 'pascalCase',
  componentFormat: 'pascalCase',
}

module.exports = function (program) {
  const config = Object.assign({}, defaultOptions, pkg.craGenerate || {})

  config.isFunctional = Boolean(program.functional)

  if (program.typeCheck) {
    config.typeCheck = program.typeCheck
  }

  if (program.directory) {
    config.directory = program.directory
  }

  return config
}
