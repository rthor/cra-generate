"use strict"

const flowtype = require("./template.flowtype")
const javascript = require("./template.javascript")
const typescript = require("./template.typescript")

module.exports = fileType => {
  switch (fileType.toLowerCase()) {
    case "flow":
    case "flowtype":
      return flowtype
    case "typescript":
      return typescript
    default:
      return javascript
  }
}
