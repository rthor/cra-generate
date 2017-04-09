'use strict'

const javascript = require('./template.javascript')
const eol = require('os').EOL
const jsRegex = /\.js$/i

module.exports = config => javascript(config)
  .map(file => {
    if (jsRegex.test(file.fileName)) {
      file.content = `// @flow${eol}${eol}${file.content}`
    }
    return file
  })
