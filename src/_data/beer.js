const Batch = require('../../lib/beer/batch')
const Recipe = require('../../lib/beer/recipe')

module.exports = async function () {
  const pageSize = 50
  const batches = await Batch.fetchAll(pageSize)
  const recipes = await Recipe.fetchAll(pageSize)

  return {
    title: 'Beer',
    description: 'Beer is for fun.',
    recipes,
    batches,
  }
}
