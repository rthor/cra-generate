'use strict'

const path = require('path')
const eol = require('os').EOL

exports.createTemplate = (componentPath, defs) =>
  Object.keys(defs).filter(fileName => defs[fileName]).map(fileName => ({
    fileName,
    filePath: path.join(componentPath, fileName),
    content: (defs[fileName] = ('' + defs[fileName]).trim() + eol),
  }))
