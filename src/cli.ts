import * as chalk from 'chalk'
import * as path from 'path'
import commander = require('commander')
import generate = require('./generate')
import pkg = require('../../package.json')

let component = null

const program = commander
  .version(pkg.version)
  .option('-f, --functional', 'create a functional component')
  .option('-s, --stateful', 'create a stateful class component')
  .option('-t, --type-check [system]', 'add @flow comment to script files')
  .option(
    '-c, --css-extension [extension]',
    'changes the extension of generated css files'
  )
  .option('-d, --directory [dir]', 'specify a directory for the component')
  .option('--test [type]', 'either "jest" or "none"')
  .arguments('<component>')
  .action(c => (component = c))
  .parse(process.argv)

if (component == null) {
  console.error(chalk.red('A component’s name is required.'))
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<component>')}`)
  process.exit(1)
}

try {
  const { files, componentName, componentPath } = generate(component, program)
  console.log(
    chalk.green(
      `Generated ${chalk.cyan.bold(componentName)} at ${chalk.cyan(
        `./${path.relative(process.cwd(), componentPath)}`
      )}:`
    )
  )
  for (const file of files) {
    console.log(' -', file.fileName)
  }
} catch (error) {
  console.log(chalk.red(error.message))
}
console.log('')
