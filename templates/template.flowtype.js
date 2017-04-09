'use strict'

const javascript = require('./template.javascript')
const jsRegex = /\.js$/i

module.exports = config => javascript(config)
  .map(file => {
    if (jsRegex.test(file.fileName)) {
      file.content = `// @flow\n\n${file.content}`
    }
    return file
  })