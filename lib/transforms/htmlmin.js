const htmlmin = require("html-minifier");

function minify(content) {
  return htmlmin.minify(content, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
  });
}

module.exports = function (content, outputPath) {
  const isEnabled =
    process.env.NODE_ENV === "production" && outputPath.endsWith(".html");

  if (isEnabled) {
    return minify(content);
  }

  return content;
};
