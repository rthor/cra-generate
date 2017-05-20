"use strict"

const caseTransform = require("../case-transform")

describe("caseTransform", () => {
  it("should throw on undefined transformation function", () => {
    expect(() => caseTransform("", "foobar")).toThrowErrorMatchingSnapshot()
  })

  it("should use the correct transform function", () => {
    const transformFunctions = [
      "camelCase",
      "constantCase",
      "headerCase",
      "paramCase",
      "pascalCase",
      "snakeCase",
    ]
    for (const transform of transformFunctions) {
      expect(caseTransform("test this", transform)).toMatchSnapshot()
    }
  })

  it("should default to pascal case", () => {
    expect(caseTransform("test this")).toMatchSnapshot()
  })
})
