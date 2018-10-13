"use strict"
const utils = require("./utils")

module.exports = ({
  componentPath,
  componentName,
  fileName,
  semiColon,
  cssExtension,
  noTest,
  isFunctional,
}) =>
  utils.createTemplate(componentPath, {
    [`${fileName}.${cssExtension}`]: `
.${componentName} {}
  `,

    "index.ts": `
export { default } from './${fileName}'${semiColon}
  `,

    [`${fileName}.test.tsx`]: noTest
      ? ""
      : `
import * as React from 'react'${semiColon}
import * as ReactDOM from 'react-dom'${semiColon}
import ${componentName} from './${fileName}'${semiColon}

it('renders without crashing', () => {
  const div = document.createElement('div')${semiColon}
  ReactDOM.render(<${componentName} />, div)${semiColon}
})${semiColon}
  `,

    [`${fileName}.tsx`]: isFunctional
      ? `
import * as React from 'react'${semiColon}
import './${fileName}.${cssExtension}'${semiColon}

const ${componentName}: React.SFC = ({}) => (
  <div className="${componentName}"></div>
)${semiColon}

export default ${componentName}${semiColon}

  `
      : `
import * as React from 'react'${semiColon}
import './${fileName}.${cssExtension}'${semiColon}

class ${componentName} extends React.Component<{}, {}> {
  public state = {}${semiColon}

  public render() {
    return (
      <div className="${componentName}"></div>
    )${semiColon}
  }
}

export default ${componentName}${semiColon}
  `,
  })
