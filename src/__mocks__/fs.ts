interface fs_t {
  readFileSync: (path: string) => string
  existsSync: (path: string) => boolean
  writeFileSync: () => void
  __setupMockDirectories: (directories: Array<string>) => void
}

interface foldersMap_t {
  [directory: string]: boolean
}

const fs: fs_t = jest.genMockFromModule('fs')
let foldersThatExists: foldersMap_t = {}

fs.readFileSync = path => `Content at: [${path}]`

fs.existsSync = path => Boolean(path in foldersThatExists)

fs.writeFileSync = () => {}

fs.__setupMockDirectories = directories => {
  foldersThatExists = Object.create(null)
  for (let index = 0; index < directories.length; index++) {
    foldersThatExists[directories[index]] = true
  }
}

export = fs
