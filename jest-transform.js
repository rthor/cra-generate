"use strict"

const flow = require("flow-remove-types")

module.exports = {
  process(src) {
    return flow(src).toString()
  },
}
