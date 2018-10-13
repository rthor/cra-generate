"use strict"

const fs = require("fs")
const path = require("path")

let pkg = {}

try {
  pkg = require(path.resolve(process.cwd(), "package.json"))
} catch (err) {}

const getTypeCheck = () => {
  const hasFlow = fs.existsSync(path.join(process.cwd(), ".flowconfig"))
  const hasTypescript = fs.existsSync(path.join(process.cwd(), "tsconfig.json"))
  if (hasFlow) {
    return "flow"
  } else if (hasTypescript) {
    return "typescript"
  }

  return false
}

const defaultOptions = {
  directory: "components",
  typeCheck: getTypeCheck(),
  cssExtension: "css",
  semi: true,
  type: "stateful",
  fileFormat: "pascalCase",
  componentFormat: "pascalCase",
  test: "jest",
}

module.exports = function(program) {
  const config = Object.assign({}, defaultOptions, pkg.craGenerate || {})

  config.isFunctional =
    (config.type === "functional" && !program.stateful) || program.functional

  if (program.test) {
    config.test = program.test === "none" ? false : program.test
  }

  if (program.cssExtension) {
    config.cssExtension = program.cssExtension
  }

  if (program.typeCheck && typeof program.typeCheck === "string") {
    config.typeCheck = program.typeCheck
  }

  if (program.directory) {
    config.directory = program.directory
  }

  return config
}
