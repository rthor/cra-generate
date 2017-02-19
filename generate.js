'use strict'

const EOL = require('os').EOL
const fs = require('fs')
const mkdir = require('mkpath')
const chalk = require('chalk')
const path = require('path')
const nodetree = require('nodetree')
const caseTransform = require('./lib/case-transform')

function template(file) {
  const filePath = path.resolve(__dirname, 'templates/component/', file)
  return {
    filePath,
    content: fs.readFileSync(filePath, 'utf8'),
  }
}

function replaceVars(content, componentName, fileName, cssExtension, semi) {
  return content.replace(/\$Name\$/g, componentName)
                .replace(/\$name\$/g, fileName)
                .replace(/\$semi\$/g, semi ? ';' : '')
                .replace(/\$css-ext\$/g, cssExtension)
}

function saveToFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8')
}

function relativePath(src) {
  return `./${path.relative(process.cwd(), src)}`
}

function getComponentPath(componentName, directory, fileName) {
  const cwd = process.cwd()
  const root = path.join(cwd, 'src')
  mkdir.sync(root)

  const dir = path.join(root, directory)
  mkdir.sync(dir)
  const componentPath = path.join(dir, fileName)
  const exists = fs.existsSync(componentPath)

  if (exists) {
    console.error(chalk.red(`Component ${chalk.bold(componentName)} already exists at ${relativePath(componentPath)}`))
    return process.exit(1)
  }

  mkdir.sync(componentPath)
  return componentPath
}

function implementTypeChecking(typeSystem, content) {
  let mutatedContent

  switch (typeSystem) {
    case 'flow':
      mutatedContent = `// @flow${EOL}${EOL}${content}`
      break
    default:
      mutatedContent = content
      break
  }

  return {
    content: mutatedContent,
  }
}

module.exports = function generate(component, options) {
  const fileName = caseTransform(component, options.fileFormat)
  const componentName = caseTransform(component, options.componentFormat)
  const componentPath = getComponentPath(componentName, options.directory, fileName)

  const scriptFiles = [
    template('index.js'),
    template(options.isFunctional ? 'stateless.js' : 'stateful.js'),
  ]

  if (options.test === 'jest') {
    scriptFiles.push(template('jest.js'))
  }
  const styleFiles = [template('styles.css')]
  const cssExtension = options.cssExtension.replace(/^\./, '')

  scriptFiles.forEach(script => {
    const name = path.parse(script.filePath).name
    const content = implementTypeChecking(options.typeCheck, script.content).content
    const scriptName = (
      name === 'index' ? 'index' : name === 'jest' ? `${fileName}.test` : `${fileName}`
    )
    const filePath = path.join(componentPath, `${scriptName}.js`)
    saveToFile(filePath, replaceVars(content, componentName, scriptName, cssExtension, options.semi))
  })

  styleFiles.forEach(style => {
    const filePath = path.join(componentPath, `${fileName}.${cssExtension}`)
    saveToFile(filePath, replaceVars(style.content, componentName, fileName, cssExtension, options.semi))
  })

  console.log(chalk.green(`Generated ${chalk.cyan.bold(componentName)}:\n`))

  nodetree(componentPath, {
    prune: true,
    noreport: true
  })
}
