const formatters = require('../lib/beer/formatters')

describe('uniq', () => {
  const { uniq } = formatters

  test('it returns an empty array with "empty" input', () => {
    expect(uniq(undefined)).toEqual([])
    expect(uniq(null)).toEqual([])
    expect(uniq(false)).toEqual([])
    expect(uniq({ array: false })).toEqual([])
  })

  test('it returns a unique array unmodified', () => {
    const list = [1, 2, 3, 'a', 'b', 'c']

    expect(uniq(list)).toEqual(list)
  })

  test('it removes duplicates from an array', () => {
    const list = [1, 2, 3, 2, '1', 'a', 'b', 3, 'c']
    const expected = [1, 2, 3, '1', 'a', 'b', 'c']

    expect(uniq(list)).toEqual(expected)
  })
})

describe('abv', () => {
  const { abv, BLANK_VALUE } = formatters

  test('it returns the blank value when input is empty or not a number', () => {
    expect(abv(0)).toEqual(BLANK_VALUE)
    expect(abv(undefined)).toEqual(BLANK_VALUE)
    expect(abv(null)).toEqual(BLANK_VALUE)
    expect(abv(false)).toEqual(BLANK_VALUE)
    expect(abv('nope')).toEqual(BLANK_VALUE)
  })

  test('it returns number as a percentage', () => {
    expect(abv(4)).toEqual('4.0%')
    expect(abv(5.2)).toEqual('5.2%')
    expect(abv(6.69)).toEqual('6.7%')
    expect(abv('3.2')).toEqual('3.2%')
  })
})

describe('ibu', () => {
  const { ibu, BLANK_VALUE } = formatters

  test('it returns the blank value when input is empty or not a number', () => {
    expect(ibu(0)).toEqual(BLANK_VALUE)
    expect(ibu(undefined)).toEqual(BLANK_VALUE)
    expect(ibu(null)).toEqual(BLANK_VALUE)
    expect(ibu(false)).toEqual(BLANK_VALUE)
    expect(ibu('nope')).toEqual(BLANK_VALUE)
  })

  test('it returns number rounded to the nearest integer', () => {
    expect(ibu(23.2)).toEqual(23)
    expect(ibu(23.6)).toEqual(24)
    expect(ibu('75.2')).toEqual(75)
  })
})

describe('ebc', () => {
  const { ebc, BLANK_VALUE } = formatters

  test('it returns the blank value when input is empty or not a number', () => {
    expect(ebc(0)).toEqual(BLANK_VALUE)
    expect(ebc(undefined)).toEqual(BLANK_VALUE)
    expect(ebc(null)).toEqual(BLANK_VALUE)
    expect(ebc(false)).toEqual(BLANK_VALUE)
    expect(ebc('nope')).toEqual(BLANK_VALUE)
  })

  test('it converts input from SRM to EBC', () => {
    expect(ebc(15)).toEqual('29.6')
  })

  test('it returns number with one decimal place', () => {
    expect(ebc(30.3122)).toEqual('59.7')
  })
})
