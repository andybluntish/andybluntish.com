module.exports = async function fetchPaginated(url, options, limit = 50) {
  let data = []

  // Make a request for data
  // If the results count equals the pagination limit, request more data
  for (let count = limit, offset = 0; count === limit; offset += limit) {
    let results = await fetchPage(url, options, offset, limit)
    count = results.length
    if (count) {
      data = data.concat(results)
    }
  }

  return data
}

async function fetchPage(url, options, offset, limit) {
  // fake response for testing
  if (offset >= 200) {
    return { length: 3 }
  } else {
    return { length: limit }
  }
}
