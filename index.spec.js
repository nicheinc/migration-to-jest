import { expect } from 'chai'
import sinon from 'sinon'
import { add, once } from './index'

describe('Testing assorted utils', () => {
  context('add', () => {
    it('Adds two numbers', () => {
      const result = add(1, 2)
      expect(result).to.eq(3)
    })
  })

  context('once', () => {
    it('Only invokes the function once', () => {
      const fn = sinon.stub().returns(1)
      const onceFn = once(fn)
      onceFn()
      onceFn()
      onceFn()
      onceFn()
      sinon.assert.calledOnce(fn)
    })
  })
})
