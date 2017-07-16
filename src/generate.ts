import caseTransform = require("./case-transform")
import getConfig = require("./config")
import * as templates from "../templates"
import * as io from "./io"

export = function generate(component: string, options: any = {}) {
  options = getConfig(options)

  const fileName = caseTransform(component, options.fileFormat)
  const componentName = caseTransform(component, options.componentFormat)
  const componentPath = io.getComponentPath(
    componentName,
    options.directory,
    fileName
  )

  const files = templates(options.typeCheck || "")({
    fileName,
    componentName,
    componentPath,
    noTest: !options.test,
    isFunctional: options.isFunctional,
    semiColon: options.semi ? ";" : "",
    cssExtension: options.cssExtension.replace(/^\./, ""),
  })

  for (const file of files) {
    io.writeToDisk(file.filePath, file.content)
  }

  return { componentName, componentPath, files }
}
