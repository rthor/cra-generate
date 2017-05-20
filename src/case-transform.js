// @flow

"use strict"

const chalk = require("chalk")
const changeCase = require("change-case")

const allowedNameTransforms = {
  camelCase: true,
  constantCase: true,
  headerCase: true,
  paramCase: true,
  pascalCase: true,
  snakeCase: true,
}

function caseTransform(str: string, transformFunction: string = "pascalCase") {
  if (!allowedNameTransforms.hasOwnProperty(transformFunction)) {
    const message =
      "Invalid transform, allowed transform functions are:\n[" +
      Object.keys(allowedNameTransforms).join(", ") +
      "]"
    throw new Error(message)
  }
  return changeCase[transformFunction](str)
}

module.exports = caseTransform
