const {
  abv,
  ibu,
  ebc,
  uniq,
  fermentables,
  hops,
  yeasts,
} = require("./formatters");
const fetchAllPages = require("../fetch-all-pages");
const CacheAsset = require("@11ty/eleventy-cache-assets");

class Recipe {
  constructor(data = {}) {
    this.data = data;
  }

  get id() {
    return this.data?._id;
  }

  get name() {
    return this.data?.name;
  }

  get style() {
    return this.data?.style?.name;
  }

  get og() {
    return this.data?.og;
  }

  get fg() {
    return this.data?.fg;
  }

  get abv() {
    return abv(this.data?.abv);
  }

  get ibu() {
    return ibu(this.data?.ibu);
  }

  get ebc() {
    return ebc(this.data?.color);
  }

  get fermentables() {
    return fermentables(this.data?.fermentables);
  }

  get hops() {
    return hops(this.data?.hops);
  }

  get yeasts() {
    return yeasts(this.data?.yeasts);
  }

  get tags() {
    return uniq(this.data?.searchTags).filter(Boolean);
  }

  static fetchAll(pageSize = 50) {
    return fetchAllPages(fetchRecipes, pageSize);
  }
}

async function fetchRecipes(offset = 0, limit = 50) {
  const include = [
    "og",
    "fg",
    "abv",
    "ibu",
    "color",
    "fermentables",
    "hops",
    "yeasts",
    "searchTags",
  ].join(",");
  const url = `https://api.brewfather.app/v1/recipes?limit=${limit}&offset=${offset}&include=${include}`;

  try {
    return CacheAsset(url, {
      duration: "1d",
      type: "json",
      fetchOptions: {
        headers: {
          Authorization: `Basic ${process.env.BREW_FATHER_TOKEN}`,
        },
      },
    });
  } catch (err) {
    console.error(err);

    return [];
  }
}

module.exports = Recipe;
