const { accessSync } = require("fs");
const EleventyFetch = require("@11ty/eleventy-fetch");
const fetchAllPages = require("../fetch-all-pages.js");
const {
  gravity,
  abv,
  ibu,
  ebc,
  uniq,
  fermentables,
  hops,
  yeasts,
} = require("./formatters.js");

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
    return this.data?.name;
  }

  get style() {
    return this.data?.style?.name;
  }

  get og() {
    return gravity(this.data?.og);
  }

  get fg() {
    return gravity(this.data?.fg);
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

  static async fetchAll() {
    const records = await fetchAllRecords();

    return records
      .map((r) => new Recipe(r))
      .sort((a, b) => b.brewDate - a.brewDate);
  }
}

async function fetchAllRecords(lastId = null, data = []) {
  const records = await fetchPage(lastId);

  if (records.length === 0) {
    return data;
  }

  data.push(...records);
  const lastRecord = records[records.length - 1];
  return fetchAllRecords(lastRecord["_id"], data);
}

async function fetchPage(lastId = null) {
  const apiVersion = "v2";
  const limit = 50;
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
  const startAfter = lastId ? `&start_after=${lastId}` : "";
  const url = `https://api.brewfather.app/${apiVersion}/recipes?limit=${limit}&include=${include}${startAfter}`;

  try {
    return await EleventyFetch(url, {
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
