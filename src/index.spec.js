import { expect } from 'chai'
import sinon from 'sinon'
import { add, sub, mul, div, isString, prop, once } from './index'

describe('Testing assorted utils', () => {
  context('add', () => {
    it('Adds two numbers', () => {
      const result = add(1, 2)
      expect(result).to.equal(3)
    })
  })

  context('sub', () => {
    it('Subtracts one number from another', () => {
      const result = sub(3, 1)
      expect(result).to.equal(2)
    })
  })

  context('mul', () => {
    it('Multiplies numbers', () => {
      const result = mul(3, 2)
      expect(result).to.equal(6)
    })
  })

  context('div', () => {
    it('Divides first number by the second', () => {
      const result = div(6, 2)
      expect(result).to.eq(3)
    })
  })

  context('isString', () => {
    it('Returns true for a string', () => {
      const input = 'Hello world'
      const result = isString(input)
      expect(result).to.be.true
    })

    it('Returns false for a number', () => {
      const input = 5
      const result = isString(input)
      expect(result).to.be.false
    })

    it('Returns true for an interpolated string', () => {
      const number = 127
      const input = `The number is ${number}`
      const result = isString(input)
      expect(result).to.be.true
    })
  })

  context('prop', () => {
    it('Returns the value for an existing prop', () => {
      const input = { a: 'A', b: 'B' }
      const result = prop('a', input)
      expect(result).not.to.be.undefined
      expect(result).to.equal('A')
    })

    it('Returns undefined for a non-existent prop', () => {
      const input = { a: 'A', b: 'B' }
      const result = prop('x', input)
      expect(result).to.be.undefined
    })
  })

  context('once', () => {
    it('Only invokes the function once', () => {
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
