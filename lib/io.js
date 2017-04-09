'use strict'

const fs = require('fs')
const mkdir = require('mkpath')
const path = require('path')

function writeToDisk(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8')
}

function getComponentPath(componentName, directory, fileName) {
  const cwd = process.cwd()
  const root = path.join(cwd, 'src')
  mkdir.sync(root)

  const dir = path.join(root, directory)
  mkdir.sync(dir)

  const componentPath = path.join(dir, fileName)
  if (fs.existsSync(componentPath)) {
    throw new Error(`Component ${componentName} already exists at ${
      `./${path.relative(process.cwd(), src)}`
    }`)
  }

  mkdir.sync(componentPath)
  return componentPath
}

module.exports = {
  getComponentPath,
  writeToDisk,
}
