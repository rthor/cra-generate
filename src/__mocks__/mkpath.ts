interface mkpath_t {
  sync: (path: string) => string
}

const mkpath: mkpath_t = jest.genMockFromModule('mkpath')

mkpath.sync = path => path

export = mkpath
