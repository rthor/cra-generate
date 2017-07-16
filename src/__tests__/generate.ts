jest.mock("fs")
jest.mock("mkpath")

import generate = require("../generate")
import * as path from "path"

describe("generate", () => {
  it("should fail if component already exists", () => {
    require("fs").__setupMockDirectories([
      path.resolve(process.cwd(), "src", "components", "Test"),
    ])
    expect(() => {
      generate("test")
    }).toThrowErrorMatchingSnapshot()
  })

  it("should generate a component with default config", () => {
    const data = generate("test-component")
    expect(data.componentName).toMatchSnapshot()
    expect(data.files.map(({ content }) => content)).toMatchSnapshot()
  })

  it("should generate functional components", () => {
    const data: any = generate("test-component", { functional: true })
    const file = data.files.find(
      ({ fileName }) => fileName === "TestComponent.js"
    )
    expect(file.content).toMatchSnapshot()
  })

  it("should add semi colons", () => {
    const data: any = generate("test-component", { semi: true })
    expect(data.files.map(({ content }) => content)).toMatchSnapshot()
  })

  it("should change css extension", () => {
    const data: any = generate("t", { cssExtension: "sass" })
    expect(
      data.files.find(({ fileName }) => fileName === "T.sass").content
    ).toMatchSnapshot()
  })

  it("should skip test file", () => {
    const data = generate("t", { test: "none" })
    expect(data.files.length).toBe(3)
  })

  it("should use flow type", () => {
    const data: any = generate("t", { typeCheck: "flow" })
    const scripts = data.files
      .filter(({ fileName }) => fileName.includes(".js", -1))
      .map(({ content }) => content)
    expect(scripts).toMatchSnapshot()
  })

  it("should use customized directory", () => {
    const data = generate("t", { directory: "foo" })
    expect(data.componentPath).toContain("/src/foo/T")
  })
})
