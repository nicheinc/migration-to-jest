export const add = (a, b) => a + b
export const sub = (a, b) => a - b
export const mul = (a, b) => a * b
export const div = (a, b) => a / b

export const isString = val => typeof val === 'string'

export const prop = (propName, obj) => obj[propName]

export const once = fn =>
  ((first = true) => () => (first ? ((first = !first), (fn = fn())) : fn))()
