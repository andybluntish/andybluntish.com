const Batch = require('../../lib/beer/batch')

module.exports = async function () {
  const pageSize = 50
  const batches = await Batch.fetchAll(pageSize)

  return {
    title: 'Brew log',
    description: 'Beer is for fun.',
    batches,
  }
}
