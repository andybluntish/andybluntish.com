const Image = require("@11ty/eleventy-img");

module.exports = async function (src, alt, sizes = "100vw") {
  let metadata = await Image(src, {
    widths: [500, 1000],
    formats:
      process.env.NODE_ENV === "production"
        ? ["avif", "webp", "jpeg"]
        : ["webp", "jpeg"],
    outputDir: "./dist/img/",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });
};
