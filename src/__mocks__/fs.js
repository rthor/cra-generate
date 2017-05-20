"use strict"

const fs = jest.genMockFromModule("fs")
let foldersThatExists = {}

fs.readFileSync = path => `Content at: [${path}]`

fs.existsSync = path => {
  return foldersThatExists[path] != null
}

fs.writeFileSync = function(filePath, content, encoding) {}

fs.__setupMockDirectories = directories => {
  foldersThatExists = Object.create(null)
  for (let index = 0; index < directories.length; index++) {
    foldersThatExists[directories[index]] = true
  }
}

module.exports = fs
