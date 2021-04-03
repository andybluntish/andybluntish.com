module.exports = function (value) {
  if (typeof value.toISOString !== 'function') {
    value = new Date(value)
  }

  return value.toISOString()
}
