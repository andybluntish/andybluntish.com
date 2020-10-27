const fetchAllPages = require('./fetch-all-pages')

describe('fetchAllPages', () => {
  test('fetches only once with fewer results than the limit', async () => {
    const fetcher = jest
      .fn()
      .mockReturnValue([])
      .mockReturnValueOnce(Array.from(Array(2)))
    const results = await fetchAllPages(fetcher, 5)

    expect(results).toHaveLength(2)
    expect(fetcher).toHaveBeenCalledTimes(1)
    expect(fetcher).toHaveBeenCalledWith(0, 5)
  })

  test('checks for more records when results equal the limit', async () => {
    const fetcher = jest
      .fn()
      .mockReturnValue([])
      .mockReturnValueOnce(Array.from(Array(5)))
    const results = await fetchAllPages(fetcher, 5)

    expect(results).toHaveLength(5)
    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(fetcher).toHaveBeenNthCalledWith(1, 0, 5)
    expect(fetcher).toHaveBeenNthCalledWith(2, 5, 5)
  })

  test('keeps fetching until results count is less than the limit', async () => {
    const fetcher = jest
      .fn()
      .mockReturnValue([])
      .mockReturnValueOnce(Array.from(Array(5)))
      .mockReturnValueOnce(Array.from(Array(5)))
      .mockReturnValueOnce(Array.from(Array(5)))
    const results = await fetchAllPages(fetcher, 5)

    expect(results).toHaveLength(15)
    expect(fetcher).toHaveBeenCalledTimes(4)
    expect(fetcher).toHaveBeenNthCalledWith(1, 0, 5)
    expect(fetcher).toHaveBeenNthCalledWith(2, 5, 5)
    expect(fetcher).toHaveBeenNthCalledWith(3, 10, 5)
    expect(fetcher).toHaveBeenNthCalledWith(4, 15, 5)
  })

  test('stops fetching with non-zero results that are less than the limit', async () => {
    const fetcher = jest
      .fn()
      .mockReturnValue([])
      .mockReturnValue(Array.from(Array(2)))
      .mockReturnValueOnce(Array.from(Array(5)))
    const results = await fetchAllPages(fetcher, 5)

    expect(results).toHaveLength(7)
    expect(fetcher).toHaveBeenCalledTimes(2)
    expect(fetcher).toHaveBeenNthCalledWith(1, 0, 5)
    expect(fetcher).toHaveBeenNthCalledWith(2, 5, 5)
  })
})
