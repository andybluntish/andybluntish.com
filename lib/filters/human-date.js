module.exports = function (value) {
  if (typeof value.toISOString !== "function") {
    value = new Date(value);
  }

  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(value);
};
