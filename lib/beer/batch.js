const { accessSync } = require("fs");
const EleventyFetch = require("@11ty/eleventy-fetch");
const fetchAllPages = require("../fetch-all-pages");
const {
  abv,
  ibu,
  ebc,
  uniq,
  fermentables,
  hops,
  yeasts,
} = require("./formatters");

class Batch {
  constructor(data = {}) {
    this.data = data;
  }

  get id() {
    return this.data?._id;
  }

  get recipeId() {
    return this.data?.recipe._id;
  }

  get slug() {
    return this.data?.recipe?.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]+/g, "")
      .replace(/\s+/g, "-");
  }

  get imageName() {
    if (!this._imageName) {
      try {
        const name = this.slug.replace(/-/g, "_");
        accessSync(`src/_img/beer/${name}.png`);
        this._imageName = name;
      } catch (err) {
        this._imageName = "default";
      }
    }

    return this._imageName;
  }

  get imagePath() {
    return `./src/_img/beer/${this.imageName}.png`;
  }

  get imageAlt() {
    return `${this.name} can label`;
  }

  get name() {
    return this.data?.recipe?.name;
  }

  get style() {
    return this.data?.recipe?.style?.name;
  }

  get brewMethod() {
    return this.data?.recipe?.type;
  }

  get abv() {
    return abv(this.data?.measuredAbv);
  }

  get ibu() {
    return ibu(this.data?.estimatedIbu);
  }

  get ebc() {
    return ebc(this.data?.estimatedColor);
  }

  get og() {
    return this.data?.estimatedOg;
  }

  get fg() {
    return this.data?.estimatedFg;
  }

  get fermentables() {
    return fermentables(this.data?.recipe?.fermentables);
  }

  get hops() {
    return hops(this.data?.recipe?.hops);
  }

  get yeasts() {
    return yeasts(this.data?.recipe?.yeasts);
  }

  get brewDate() {
    return new Date(this.data?.brewDate);
  }

  get tags() {
    return uniq(this.data?.recipe?.searchTags).filter(Boolean);
  }

  static fetchAll(pageSize = 50) {
    return fetchAllPages(fetchBatches, pageSize);
  }
}

async function fetchBatches(offset = 0, limit = 50) {
  const status = "Archived";
  const include = [
    "recipe._id",
    "recipe.style.name",
    "measuredAbv",
    "estimatedIbu",
    "estimatedColor",
    "tasteRating",
    "brewDate",
    "recipe.type",
    "recipe.searchTags",
    "recipe.fermentables",
    "recipe.hops",
    "recipe.yeasts",
    "estimatedOg",
    "estimatedFg",
  ].join(",");
  const url = `https://api.brewfather.app/v1/batches?limit=${limit}&offset=${offset}&status=${status}&include=${include}`;

  try {
    const data = await EleventyFetch(url, {
      duration: "1d",
      type: "json",
      fetchOptions: {
        headers: {
          Authorization: `Basic ${process.env.BREW_FATHER_TOKEN}`,
        },
      },
    });

    return data.map((d) => new Batch(d));
  } catch (err) {
    console.error(err);

    return [];
  }
}

module.exports = Batch;
