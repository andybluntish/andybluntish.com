const CheckIn = require("../../../lib/beer/check-in.js");

module.exports = async function () {
  const checkins = await CheckIn.fetchAll();

  return { checkins };
};
