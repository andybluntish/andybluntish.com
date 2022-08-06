async function fetchAllPages(fetcher, limit = 10, start = 0) {
  let data = [];

  // Make a request for data
  // If the results count equals the pagination limit, request more data
  // otherwise there are no more results, so stop.
  for (let count = limit, offset = start; count === limit; offset += limit) {
    let results = await fetcher(offset, limit);
    count = results.length;
    if (count) {
      data = data.concat(results);
    }
  }

  return data;
}

module.exports = fetchAllPages;
