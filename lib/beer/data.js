const Batch = require("./batch.js");

module.exports = async function () {
  const batches = await Batch.fetchAll();

  return { batches };
};
