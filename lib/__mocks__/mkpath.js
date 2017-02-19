'use strict'

const mkpath = jest.genMockFromModule('mkpath')

mkpath.sync = function(path) {
  return path
}

module.exports = mkpath
