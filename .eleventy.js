if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = (eleventyConfig) => {
  eleventyConfig.setQuietMode(true);

  eleventyConfig.setLibrary(
    "md",
    require("markdown-it")({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
    })
  );

  // Plugins
  eleventyConfig.addPlugin(require("@11ty/eleventy-navigation"));
  eleventyConfig.addPlugin(require("@11ty/eleventy-upgrade-help"));

  // Transforms
  eleventyConfig.addTransform("purgecss", require("./lib/transforms/purgecss"));
  eleventyConfig.addTransform("htmlmin", require("./lib/transforms/htmlmin"));

  // Filters
  eleventyConfig.addFilter(
    "machineDate",
    require("./lib/filters/machine-date")
  );
  eleventyConfig.addFilter("shortDate", require("./lib/filters/short-date"));
  eleventyConfig.addFilter("humanDate", require("./lib/filters/human-date"));
  eleventyConfig.addFilter(
    "humanDateTime",
    require("./lib/filters/human-date-time")
  );

  // Shortcodesshortcodes
  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    require("./lib/shortcodes/image")
  );

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/manifest.json");

  return {
    dir: { input: "src", output: "dist" },
    templateFormats: ["html", "njk", "md"],
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
