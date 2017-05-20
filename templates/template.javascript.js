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

    "index.js": `
export { default } from './${fileName}'${semiColon}
  `,

    [`${fileName}.test.js`]: noTest
      ? ""
      : `
import React from 'react'${semiColon}
import ReactDOM from 'react-dom'${semiColon}
import ${componentName} from './${fileName}'${semiColon}

it('renders without crashing', () => {
  const div = document.createElement('div')${semiColon}
  ReactDOM.render(<${componentName} />, div)${semiColon}
})${semiColon}
  `,

    [`${fileName}.js`]: isFunctional
      ? `
import React from 'react'${semiColon}
import './${fileName}.${cssExtension}'${semiColon}

const ${componentName} = ({}) => (
  <div className="${componentName}"></div>
)${semiColon}

export default ${componentName}${semiColon}

  `
      : `
import React, { Component } from 'react'${semiColon}
import './${fileName}.${cssExtension}'${semiColon}

class ${componentName} extends Component {
  state = {}${semiColon}

  render() {
    return (
      <div className="${componentName}"></div>
    )${semiColon}
  }
}

export default ${componentName}${semiColon}
  `,
  })
