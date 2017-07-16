import * as fs from 'fs'
import * as path from 'path'

let pkg: any = {}

try {
  pkg = require(path.resolve(process.cwd(), 'package.json'))
} catch (err) {}

const defaultOptions = {
  directory: 'components',
  typeCheck: fs.existsSync(path.join(process.cwd(), '.flowconfig')) && 'flow',
  cssExtension: 'css',
  isFunctional: false,
  semi: true,
  type: 'stateful',
  fileFormat: 'pascalCase',
  componentFormat: 'pascalCase',
  test: 'jest',
}

type options_t = typeof defaultOptions

export = (program: any): options_t => {
  const config: options_t = {
    ...defaultOptions,
    ...pkg.craGenerate || {},
  }

  config.isFunctional =
    (config.type === 'functional' && !program.stateful) || program.functional

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
