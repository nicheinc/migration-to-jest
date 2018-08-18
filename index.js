export const add = (a, b) => a + b

export const once = fn =>
  ((first = true) => () => (first ? ((first = !first), (fn = fn())) : fn))()
