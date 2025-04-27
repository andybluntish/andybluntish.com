import EleventyFetch from "@11ty/eleventy-fetch";
import {
  BLANK_VALUE,
  gravity,
  abv,
  ibu,
  ebc,
  uniq,
  fermentables,
  hops,
  yeasts,
} from "./formatters.js";

export default class Batch {
  constructor(data = {}) {
    this.data = data;
  }

  get batchNo() {
    return this.data?.batchNo;
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
    return ibu(this.data?.estimatedIbu) || BLANK_VALUE;
  }

  get ebc() {
    return ebc(this.data?.estimatedColor) || BLANK_VALUE;
  }

  get colour() {
    const c = Math.round(ebc(this.data?.estimatedColor) || 0);
    switch (c) {
      case 0:
        return "#ddd";
      case 1:
        return "#FFE699";
      case 2:
        return "#FFD878";
      case 3:
        return "#FFCA5A";
      case 4:
        return "#FFBF42";
      case 5:
        return "#FBB123";
      case 6:
        return "#F8A600";
      case 7:
        return "#F39C00";
      case 8:
        return "#EA8F00";
      case 9:
        return "#E58500";
      case 10:
        return "#DE7C00";
      case 11:
        return "#D77200";
      case 12:
        return "#CF6900";
      case 13:
        return "#CB6200";
      case 14:
        return "#C35900";
      case 15:
        return "#BB5100";
      case 16:
        return "#B54C00";
      case 17:
        return "#B04500";
      case 18:
        return "#A63E00";
      case 19:
        return "#A13700";
      case 20:
        return "#9B3200";
      case 21:
        return "#952D00";
      case 22:
        return "#8E2900";
      case 23:
        return "#882300";
      case 24:
        return "#821E00";
      case 25:
        return "#7B1A00";
      case 26:
        return "#771900";
      case 27:
        return "#701400";
      case 28:
        return "#6A0E00";
      case 29:
        return "#660D00";
      case 30:
        return "#5E0B00";
      case 31:
        return "#5A0A02";
      case 32:
        return "#560A05";
      case 33:
        return "#520907";
      case 34:
        return "#4C0505";
      case 35:
        return "#470606";
      case 36:
        return "#440607";
      case 37:
        return "#3F0708";
      case 38:
        return "#3B0607";
      case 39:
        return "#3A070B";
      case 40:
        return "#36080A";
      default:
        return "#000";
    }
  }

  get og() {
    const value = this.data?.measuredOg || this.data?.estimatedOg;
    return gravity(value) || BLANK_VALUE;
  }

  get fg() {
    const value = this.data?.measuredFg || this.data?.estimatedFg;
    return gravity(value) || BLANK_VALUE;
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
