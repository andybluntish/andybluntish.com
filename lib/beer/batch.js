const { abv, ibu, ebc, uniq } = require('./formatters')

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
    const fermentables = (this.data?.recipe?.fermentables || []).map((d) => d?.name)

    return uniq(fermentables)
  }

  get hops() {
    const hops = (this.data?.recipe.hops || []).map((d) => d?.name)

    return uniq(hops)
  }

  get yeasts() {
    const yeasts = (this.data?.recipe?.yeasts || []).map((d) => {
      const { name, productId } = d
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
}

module.exports = Batch
