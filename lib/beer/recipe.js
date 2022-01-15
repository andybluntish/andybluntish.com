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
const { accessSync } = require("fs");

class Recipe {
  constructor(data = {}) {
    this.data = data;
  }

  get id() {
    return this.data?._id;
  }

  get slug() {
    return this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]+/g, "")
      .replace(/\s+/g, "-");
  }

  get imageName() {
    if (!this._imageName) {
      try {
        const name = this.slug; //.replace(/-/g, "_");
        accessSync(`src/img/beer/${name}.png`);
        this._imageName = name;
      } catch (err) {
        this._imageName = "default";
      }
    }

    return this._imageName;
  }

  get imagePath() {
    return `./src/img/beer/${this.imageName}.png`;
  }

  get imageAlt() {
    return `${this.name} can label`;
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

  get isPublished() {
    return this.tags.includes("published");
  }

  get isCore() {
    return this.tags.includes("core");
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
    const data = await CacheAsset(url, {
      duration: "1d",
      type: "json",
      fetchOptions: {
        headers: {
          Authorization: `Basic ${process.env.BREW_FATHER_TOKEN}`,
        },
      },
    });

    return data.map((d) => new Recipe(d));
  } catch (err) {
    console.error(err);

    return [];
  }
}

module.exports = Recipe;
