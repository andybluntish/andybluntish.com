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
  eleventyConfig.addTransform(
    "purgecss",
    require("./lib/transforms/purgecss.cjs")
  );
  eleventyConfig.addTransform(
    "htmlmin",
    require("./lib/transforms/htmlmin.cjs")
  );

  // Filters
  eleventyConfig.addFilter(
    "className",
    require("./lib/filters/class-name.cjs")
  );
  eleventyConfig.addFilter(
    "machineDate",
    require("./lib/filters/machine-date.cjs")
  );
  eleventyConfig.addFilter(
    "shortDate",
    require("./lib/filters/short-date.cjs")
  );
  eleventyConfig.addFilter(
    "humanDate",
    require("./lib/filters/human-date.cjs")
  );
  eleventyConfig.addFilter(
    "humanDateTime",
    require("./lib/filters/human-date-time.cjs")
  );

  // Shortcodesshortcodes
  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    require("./lib/shortcodes/image.cjs")
  );

  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/manifest.json");

  return {
    dir: { input: "src", output: "dist" },
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
