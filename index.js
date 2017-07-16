#!/usr/bin/env node

"use strict"

var chalk = require("chalk")
var version = process.versions.node

if (~~version.split(".")[0] < 6) {
  console.error(
    chalk.red(
      "You are running Node v" +
        version +
        ".\n" +
        "cra-generate requires Node v6 or higher. \n" +
        "Please update your version of Node."
    )
  )
  process.exit(1)
}

require("./lib/src/cli")
