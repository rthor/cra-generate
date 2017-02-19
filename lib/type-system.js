'use strict'

const EOL = require('os').EOL

module.exports = function implementTypeChecking(typeSystem, content) {
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
