class Batch {
  constructor(data) {
    this.data = data
  }

  get id() {
    return this.data._id
  }

  get name() {
    return this.data.recipe.name
  }

  get style() {
    return this.data.recipe.style.name
  }

  get abv() {
    return new Intl.NumberFormat('en-AU', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(this.data.measuredAbv / 100)
  }

  get ibu() {
    const value = Math.round(this.data.estimatedIbu)

    if (isNaN(value) || !value) {
      return '-'
    } else {
      return value
    }
  }

  get ebc() {
    const value = Number(this.data.estimatedColor) * 1.97

    if (isNaN(value) || !value) {
      return '-'
    } else {
      return value.toFixed(1)
    }
  }

  get og() {
    return this.data.estimatedOg
  }

  get fg() {
    return this.data.estimatedFg
  }

  get fermentables() {
    const fermentables = (this.data.recipe.fermentables || []).map((d) => d.name)

    return [...new Set(fermentables)]
  }

  get hops() {
    const hops = (this.data.recipe.hops || []).map((d) => d.name)

    return [...new Set(hops)]
  }

  get yeasts() {
    const yeasts = (this.data.recipe.yeasts || []).map((d) => `${d.name} (${d.productId})`)

    return [...new Set(yeasts)]
  }

  get brewDate() {
    return new Date(this.data.brewDate)
  }
}

module.exports = Batch
