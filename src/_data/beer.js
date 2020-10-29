const CacheAsset = require('@11ty/eleventy-cache-assets')

module.exports = async function () {
  const recipes = await fetchRecipes()
  const batches = await fetchBatches()

  return {
    title: 'Beer',
    description: 'Beer is for fun.',
    recipes,
    batches,
  }
}

async function fetchRecipes() {
  return []
}

async function fetchBatches() {
  const limit = 50
  const status = 'Archived'
  const include = [
    'recipe.style.name',
    'measuredAbv',
    'estimatedIbu',
    'estimatedColor',
    'tasteRating',
    'brewDate',
  ].join(',')
  const url = `https://api.brewfather.app/v1/batches?limit=${limit}&status=${status}&include=${include}`

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
