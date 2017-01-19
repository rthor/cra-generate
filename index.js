#!/usr/bin/env node

'use strict'

var chalk = require('chalk')
var version = process.versions.node

if (version.split('.')[0] < 4) {
  console.error(
    chalk.red(
      'You are running Node v' + version + '.\n' +
      'cra-generate requires Node v4 or higher. \n' +
      'Please update your version of Node.'
    )
  )
  process.exit(1)
}

require('./cli')
