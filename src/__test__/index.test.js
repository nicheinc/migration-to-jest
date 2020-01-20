import sinon from 'sinon'
import { add, sub, mul, div, isString, prop, once } from './index'

//// Test
sinon.spy
sandbox.spy
//// End Test 

describe('Testing assorted utils', () => {
  describe('add', () => {
    test('Adds two numbers', () => {
      const result = add(1, 2)
      expect(result).toBe(3)
    })
  })

  describe('sub', () => {
    test('Subtracts one number from another', () => {
      const result = sub(3, 1)
      expect(result).toBe(2)
    })
  })

  describe('mul', () => {
    test('Multiplies numbers', () => {
      const result = mul(3, 2)
      expect(result).toBe(6)
    })
  })

  describe('div', () => {
    test('Divides first number by the second', () => {
      const result = div(6, 2)
      expect(result).toBe(3)
    })
  })

  describe('isString', () => {
    test('Returns true for a string', () => {
      const input = 'Hello world'
      const result = isString(input)
      expect(result).toBe(true)
    })

    test('Returns false for a number', () => {
      const input = 5
      const result = isString(input)
      expect(result).toBe(false)
    })

    test('Returns true for an interpolated string', () => {
      const number = 127
      const input = `The number is ${number}`
      const result = isString(input)
      expect(result).toBe(true)
    })
  })

  describe('prop', () => {
    test('Returns the value for an existing prop', () => {
      const input = { a: 'A', b: 'B' }
      const result = prop('a', input)
      expect(result).not.toBeUndefined()
      expect(result).toBe('A')
    })

    test('Returns undefined for a non-existent prop', () => {
      const input = { a: 'A', b: 'B' }
      const result = prop('x', input)
      expect(result).toBeUndefined()
    })
  })

  describe('once', () => {
    test('Only invokes the function once', () => {
      const fn = sinon.stub()
      const onceFn = once(fn)
      onceFn()
      onceFn()
      onceFn()
      onceFn()
      sinon.assert.calledOnce(fn)
    })
  })
})
