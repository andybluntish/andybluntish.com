import Batch from "../../../lib/beer/batch.js";

export default async function () {
  const batches = await Batch.fetchAll();

  return { batches };
}
