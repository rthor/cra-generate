'use strict'

const fs = jest.genMockFromModule('fs')

fs.readFileSync = (path) => `Content at: [${path}]`

fs.existsSync = () => true

fs.writeFileSync = function(filePath, content, encoding) {
  console.log(filePath, ':')
  console.log(content)
}

module.exports = fs
