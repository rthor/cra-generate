'use strict'

const caseTransform = require('./case-transform')
const createFormatter = require('./formatter')
const getConfig = require('../config')
const io = require('./io')

module.exports = function generate(component, options = getConfig({})) {
  const fileName = caseTransform(component, options.fileFormat)
  const componentName = caseTransform(component, options.componentFormat)
  const componentPath = io.getComponentPath(componentName, options.directory, fileName)

  const fileFormatter = createFormatter({
    fileName,
    componentName,
    componentPath,
    semicolon: options.semi,
    typeCheck: options.typeCheck,
    cssExtension: options.cssExtension.replace(/^\./, ''),
  })

  const files = [
    { type: 'script', template: io.getTemplate('index.js') },
    { type: 'script', template: io.getTemplate(options.isFunctional ? 'stateless.js' : 'stateful.js') },
    { type: 'script', template: options.test === 'jest' ? io.getTemplate('jest.js') : null },
    { type: 'style', template: io.getTemplate('styles.css') }
  ]
    .filter(file => file.template !== null)
    .map(file => fileFormatter(file))

  for (const file of files) {
    io.writeToDisk(file.path, file.content)
  }

  return { componentName, componentPath, files }
}
