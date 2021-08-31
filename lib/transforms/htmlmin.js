const htmlmin = require("html-minifier");

module.exports = function (content, outputPath) {
  if (process.env.NODE_ENV === "production" && outputPath.endsWith(".html")) {
    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
    });
  }

  return content;
};
