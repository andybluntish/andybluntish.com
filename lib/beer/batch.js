const {
  abv,
  ibu,
  ebc,
  uniq,
  normaliseFermentable,
  normaliseHop,
  normaliseYeast,
} = require('./formatters')
const fetchAllPages = require('../fetch-all-pages')
const CacheAsset = require('@11ty/eleventy-cache-assets')

class Batch {
  constructor(data = {}) {
    this.data = data
  }

  get id() {
    return this.data?._id
  }

  get name() {
    return this.data?.recipe?.name
  }

  get style() {
    return this.data?.recipe?.style?.name
  }

  get abv() {
    return abv(this.data?.measuredAbv || 0)
  }

  get ibu() {
    return ibu(this.data?.estimatedIbu)
  }

  get ebc() {
    return ebc(this.data?.estimatedColor)
  }

  get og() {
    return this.data?.estimatedOg
  }

  get fg() {
    return this.data?.estimatedFg
  }

  get fermentables() {
    const fermentables = (this.data?.recipe?.fermentables || [])
      .map((d) => d?.name)
      .map(normaliseFermentable)

    return uniq(fermentables)
  }

  get hops() {
    const hops = (this.data?.recipe?.hops || []).map((d) => d?.name).map(normaliseHop)

    return uniq(hops)
  }

  get yeasts() {
    const yeasts = (this.data?.recipe?.yeasts || []).map((d) => {
      let { name, productId } = d
      name = normaliseYeast(name)

      if (!productId || productId === '-') {
        return name
      }

      return `${name} (${productId})`
    })

    return uniq(yeasts)
  }

  get brewDate() {
    return new Date(this.data?.brewDate)
  }

  get tags() {
    const tags = this.data?.recipe?.searchTags

    return uniq(tags)
  }

  static fetchAll(pageSize = 50) {
    return fetchAllPages(fetchBatches, pageSize)
  }
}

async function fetchBatches(offset = 0, limit = 50) {
  const status = 'Archived'
  const include = [
    'recipe.style.name',
    'measuredAbv',
    'estimatedIbu',
    'estimatedColor',
    'tasteRating',
    'brewDate',
    'recipe.searchTags',
    'recipe.fermentables',
    'recipe.hops',
    'recipe.yeasts',
    'estimatedOg',
    'estimatedFg',
  ].join(',')
  const url = `https://api.brewfather.app/v1/batches?limit=${limit}&offset=${offset}&status=${status}&include=${include}`

  try {
    const data = await CacheAsset(url, {
      duration: '1d',
      type: 'json',
      fetchOptions: {
        headers: {
          Authorization: `Basic ${process.env.BREW_FATHER_TOKEN}`,
        },
      },
    })

    return data.map((d) => new Batch(d))
  } catch (err) {
    console.error(err)

    return []
  }
}

module.exports = Batch
