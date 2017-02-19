'use strict'

const path = require('path')
const typeSystem = require('./type-system')

function replaceVars(content, componentName, fileName, cssExtension, semi) {
  return content.replace(/\$Name\$/g, componentName)
    .replace(/\$name\$/g, fileName)
    .replace(/\$semi\$/g, semi ? ';' : '')
    .replace(/\$css-ext\$/g, cssExtension)
}

module.exports = ({
  componentPath,
  componentName,
  fileName,
  cssExtension,
  semicolon,
  typeCheck,
}) => {
  const scriptFormatter = script => {
    const content = typeSystem(typeCheck, script.content).content
    const name = path.parse(script.filePath).name
    const scriptName = (
      name === 'index' ? 'index' : name === 'jest' ? `${fileName}.test` : `${fileName}`
    )
    return {
      path: path.join(componentPath, `${scriptName}.js`),
      content: replaceVars(content, componentName, scriptName, cssExtension, semicolon),
    }
  }

  const styleFormatter = style => ({
    path: path.join(componentPath, `${fileName}.${cssExtension}`),
    content: replaceVars(style.content, componentName, fileName, cssExtension, semicolon),
  })
  
  return ({ type, template }) => {
    switch (type) {
      case 'script':
        return scriptFormatter(template)
      case 'style':
        return styleFormatter(template)
      default:
        throw new Error(`Formatter: Unknown content type "${type}"`)
    }
  }
}