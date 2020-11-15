const CacheAsset = require('@11ty/eleventy-cache-assets')
const Batch = require('../../lib/beer/batch')
const fetchAllPages = require('../../lib/fetch-all-pages')

module.exports = async function () {
  const pageSize = 50
  const batches = await Batch.fetchAll(pageSize)
  const recipes = await fetchAllPages(fetchRecipes, pageSize)

  return {
    title: 'Beer',
    description: 'Beer is for fun.',
    recipes,
    batches,
  }
}

async function fetchRecipes(offset = 0, limit = 50) {
  const include = ['fermentables', 'hops', 'yeasts', 'og', 'fg', 'abv', 'ibu', 'searchTags'].join(
    ','
  )
  const url = `https://api.brewfather.app/v1/recipes?limit=${limit}&offset=${offset}&include=${include}`

  try {
    return CacheAsset(url, {
      duration: '1d',
      type: 'json',
      fetchOptions: {
        headers: {
          Authorization: `Basic ${process.env.BREW_FATHER_TOKEN}`,
        },
      },
    })
  } catch (err) {
    console.error(err)

    return []
  }
}
