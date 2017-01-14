# Create React App Generator

Scaffold a React component.

```bash
Usage: cra-generate [options] <component>

Options:

  -h, --help                 output usage information
  -V, --version              output the version number
  -f, --functional           create a functional component
  -d, --directory [dir]      specify a directory for the component
```

If a `.flowconfig` is present, a `// @flow` comment is prepended to all script files.

Project specific settings can be added to the `package.json` file under the `craGenerate` key. Eg

```json
"craGenerate": {
  "fileFormat": "paramCase",
  "directory": "widgets"
}
```

| option          | type    | default     | description                                                                      |
|-----------------|---------|-------------|----------------------------------------------------------------------------------|
| directory       | `string`  | "components"  | Where, relative to the `./src/` directory, the component should be.                          |
| fileFormat      | `string`  | "pascalCase"  | One of: camelCase, constantCase, headerCase, paramCase, pascalCase or snakeCase. |
| componentFormat | `string`  | "pascalCase"  | One of: camelCase, constantCase, headerCase, paramCase, pascalCase or snakeCase. |
| typeCheck       | `undefined|string` | `undefined` | Can be set explicitly to "flow".                                                 |

## License

MIT
