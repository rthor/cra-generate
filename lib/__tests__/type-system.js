'use strict'

const typeSystem = require('../type-system')

const jsMock = `
function testFunction(arg) {
  return arg * 2
}

console.log(testFunction('foo'))
`.trim()

const flowMock = `
// @flow

function testFunction(arg) {
  return arg * 2
}

console.log(testFunction('foo'))
`.trim()

describe('typeSystem', () => {
  test('defaults to regular JS', () => {
    const actual = typeSystem(null, jsMock)
    expect(actual).toEqual({ content: jsMock })
  })

  test('supports flow', () => {
    const actual = typeSystem('flow', jsMock)
    expect(actual).toEqual({ content: flowMock })
  })
})
