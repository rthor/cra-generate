'use strict'

const generate = require('../generate')

jest.mock('fs')
jest.mock('mkpath')

describe('generate', () => {
  test('returns an array of files', () => {
    const data = generate('test-component')
    expect(data.componentName).toBe('TestComponent')
    expect(Array.isArray(data.files)).toBeTruthy()
  })
})
