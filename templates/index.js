"use strict"

const flowtype = require("./template.flowtype")
const javascript = require("./template.javascript")

module.exports = fileType => {
  switch (fileType.toLowerCase()) {
    case "flow":
    case "flowtype":
      return flowtype
    default:
      return javascript
  }
}
