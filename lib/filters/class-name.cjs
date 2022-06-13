module.exports = function (value) {
  if (Array.isArray(value)) {
    return value.flat().join(" ").trim();
  }

  return value;
};
