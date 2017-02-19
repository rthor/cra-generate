'use strict'

const caseTransform = require('../case-transform')

describe('caseTransform', () => {
  test('returns empty string', () => {
    const emptyString = ''
    const actual = caseTransform(emptyString)
    expect(actual).toBe(emptyString)
  })

  test('throws on undefined transformation function', () => {
    const error = 'Invalid transform, allowed transform functions are:\n' +
      '[camelCase, constantCase, headerCase, paramCase, pascalCase, snakeCase]'
    expect(() => caseTransform('', 'foobar')).toThrowError(error)
  })

  describe('transform functions', () => {
    test('camelCase', () => {
      expect(caseTransform('test this', 'camelCase')).toBe('testThis')
    })

    test('constantCase', () => {
      expect(caseTransform('test this', 'constantCase')).toBe('TEST_THIS')
    })

    test('headerCase', () => {
      expect(caseTransform('test this', 'headerCase')).toBe('Test-This')
    })

    test('paramCase', () => {
      expect(caseTransform('test this', 'paramCase')).toBe('test-this')
    })

    test('pascalCase', () => {
      expect(caseTransform('test this', 'pascalCase')).toBe('TestThis')
    })

    test('snakeCase', () => {
      expect(caseTransform('test this', 'snakeCase')).toBe('test_this')
    })

    test('defaults to pascalCase', () => {
      const actual = caseTransform('test this')
      const expected = 'TestThis'
      expect(actual).toBe(expected)
    })
  })
})
