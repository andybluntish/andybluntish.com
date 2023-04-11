const { accessSync } = require("fs");
const EleventyFetch = require("@11ty/eleventy-fetch");
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

  get batchNo() {
    return this.data?.batchNo;
  }

  get slug() {
    return this.data?.recipe?.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]+/g, "")
      .replace(/\s+/g, "-");
  }

  get permalink() {
    return `beer/brew-log/${this.id}/`;
  }

  get href() {
    return `/${this.permalink}`;
  }

  get imageName() {
    if (!this._imageName) {
      try {
        const name = this.slug.replace(/-/g, "_");
        accessSync(`src/_img/beer/${name}.png`);
        this._imageName = name;
      } catch (err) {
        this._imageName = "";
      }
    }

    return this._imageName;
  }

  get imagePath() {
    return `./src/_img/beer/${this.imageName}.png`;
  }

  get imageAlt() {
    return `${this.name} beer can label`;
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
    return gravity(this.data?.measuredOg || this.data?.estimatedOg);
  }

  get fg() {
    return gravity(this.data?.measuredFg || this.data?.estimatedFg);
  }

  get fermentables() {
    return fermentables(this.data?.recipe?.fermentables);
  }

  get fermentablesList() {
    return this.fermentables?.join(", ");
  }

  get hops() {
    return hops(this.data?.recipe?.hops);
  }

  get hopsList() {
    return this.hops?.join(", ");
  }

  get yeasts() {
    return yeasts(this.data?.recipe?.yeasts);
  }

  get yeastsList() {
    return this.yeasts?.join(", ");
  }

  get brewDate() {
    return new Date(this.data?.brewDate);
  }

  get tags() {
    return uniq(this.data?.recipe?.searchTags).filter(Boolean);
  }

  static async fetchAll() {
    const records = await Promise.all([
      fetchAllRecords(null, [], "Conditioning"),
      fetchAllRecords(null, [], "Completed"),
      fetchAllRecords(null, [], "Archived"),
    ]);

    return records
      .flat()
      .map((b) => new Batch(b))
      .sort((a, b) => b.batchNo - a.batchNo);
  }
}

async function fetchAllRecords(lastId = null, data = [], status = "Archived") {
  const records = await fetchPage(lastId, status);

  if (records.length === 0) {
    return data;
  }

  data.push(...records);
  const lastRecord = records[records.length - 1];
  return fetchAllRecords(lastRecord["_id"], data, status);
}

async function fetchPage(lastId = null, status = "Archived") {
  const apiVersion = "v2";
  const limit = 50;
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
    "measuredOg",
    "measuredFg",
    "estimatedFg",
    "batchNo",
  ].join(",");

  const startAfter = lastId ? `&start_after=${lastId}` : "";
  const url = `https://api.brewfather.app/${apiVersion}/batches?limit=${limit}&status=${status}&include=${include}${startAfter}`;

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

module.exports = Batch;
