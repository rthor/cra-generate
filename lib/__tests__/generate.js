'use strict'

const generate = require('../generate')

describe('generate', () => {
  beforeAll(() => {
    jest.mock('fs')
    jest.mock('mkpath')
  })

  test('returns an array of files', () => {
    const data = generate('test-component')
    expect(data.componentName).toBe('TestComponent')
    expect(Array.isArray(data.files)).toBeTruthy()
  })
})
