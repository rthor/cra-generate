'use strict'

const fs = require('fs')
const mkdir = require('mkpath')
const path = require('path')

function getTemplate(file) {
  const filePath = path.resolve(__dirname, '../templates/component/', file)
  return {
    filePath,
    content: fs.readFileSync(filePath, 'utf8'),
  }
}

function writeToDisk(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8')
}

function getRelativePath(src) {
  return `./${path.relative(process.cwd(), src)}`
}

function getComponentPath(componentName, directory, fileName) {
  const cwd = process.cwd()
  const root = path.join(cwd, 'src')
  mkdir.sync(root)

  const dir = path.join(root, directory)
  mkdir.sync(dir)

  const componentPath = path.join(dir, fileName)
  if (fs.existsSync(componentPath)) {
    throw new Error(`Component ${componentName} already exists at ${getRelativePath(componentPath)}`)
  }

  mkdir.sync(componentPath)
  return componentPath
}

module.exports = {
  getComponentPath,
  getRelativePath,
  getTemplate,
  writeToDisk,
}
