module.exports = function (value) {
  if (typeof value.toISOString !== 'function') {
    value = new Date(value)
  }

  const formattedDate = new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(value)

  const formattedTime = new Intl.DateTimeFormat('en-AU', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(value)

  return `${formattedDate} at ${formattedTime}`
}
