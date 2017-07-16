import * as fs from 'fs'
import * as mkdir from 'mkpath'
import * as path from 'path'

export function writeToDisk(filePath: string, content: string) {
  fs.writeFileSync(filePath, content, 'utf8')
}

export function getComponentPath(
  componentName: string,
  directory: string,
  fileName: string
) {
  const cwd = process.cwd()
  const root = path.join(cwd, 'src')
  mkdir.sync(root)

  const dir = path.join(root, directory)
  mkdir.sync(dir)

  const componentPath = path.join(dir, fileName)
  if (fs.existsSync(componentPath)) {
    throw new Error(
      `Component ${componentName} already exists at ${`./${path.relative(
        process.cwd(),
        componentPath
      )}`}`
    )
  }

  mkdir.sync(componentPath)
  return componentPath
}
