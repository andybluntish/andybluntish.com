const BLANK_VALUE = '-'

function uniq(value) {
  if (!Array.isArray(value)) {
    return []
  }

  return [...new Set(value)]
}

function abv(value) {
  const abv = Number(value)

  if (!value || Number.isNaN(abv)) {
    return BLANK_VALUE
  }

  return new Intl.NumberFormat('en-AU', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(abv / 100)
}

function ibu(value = 0) {
  const ibu = Math.round(value)

  if (Number.isNaN(ibu) || !ibu) {
    return BLANK_VALUE
  } else {
    return ibu
  }
}

function ebc(value = 0) {
  const ebc = Number(value) * 1.97

  if (Number.isNaN(ebc) || !ebc) {
    return BLANK_VALUE
  } else {
    return ebc.toFixed(1)
  }
}

module.exports = {
  BLANK_VALUE,
  uniq,
  abv,
  ibu,
  ebc,
}
