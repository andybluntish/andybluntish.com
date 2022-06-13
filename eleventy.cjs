const dotenv = require("dotenv");
const markdownIt = require("markdown-it");
const eleventyNavigation = require("@11ty/eleventy-navigation");
const eleventyUpgradeHelp = require("@11ty/eleventy-upgrade-help");
const purgecss = require("./lib/transforms/purgecss.cjs");
const htmlmin = require("./lib/transforms/htmlmin.cjs");
const className = require("./lib/filters/class-name.cjs");
const machineDate = require("./lib/filters/machine-date.cjs");
const shortDate = require("./lib/filters/short-date.cjs");
const humanDate = require("./lib/filters/human-date.cjs");
const humanDateTime = require("./lib/filters/human-date-time.cjs");
const image = require("./lib/shortcodes/image.cjs");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

module.exports = (eleventyConfig) => {
  eleventyConfig.setQuietMode(true);

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
    })
  );

  // Plugins
  eleventyConfig.addPlugin(eleventyNavigation);
  eleventyConfig.addPlugin(eleventyUpgradeHelp);

  // Transforms
  eleventyConfig.addTransform("purgecss", purgecss);
  eleventyConfig.addTransform("htmlmin", htmlmin);

  // Filters
  eleventyConfig.addFilter("className", className);
  eleventyConfig.addFilter("machineDate", machineDate);
  eleventyConfig.addFilter("shortDate", shortDate);
  eleventyConfig.addFilter("humanDate", humanDate);
  eleventyConfig.addFilter("humanDateTime", humanDateTime);

  // Shortcodesshortcodes
  eleventyConfig.addNunjucksAsyncShortcode("image", image);

  // Static files
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/manifest.json");

  return {
    dir: { input: "src", output: "dist" },
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
