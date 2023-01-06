const dotenv = require("dotenv");
const markdownIt = require("markdown-it");
const eleventyNavigation = require("@11ty/eleventy-navigation");
const eleventyUpgradeHelp = require("@11ty/eleventy-upgrade-help");
const purgecss = require("./lib/transforms/purgecss.js");
const htmlmin = require("./lib/transforms/htmlmin.js");
const machineDate = require("./lib/filters/machine-date.js");
const shortDate = require("./lib/filters/short-date.js");
const humanDate = require("./lib/filters/human-date.js");
const pluginWebc = require("@11ty/eleventy-plugin-webc");

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
  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_includes/components/**/*.webc",
  });

  // Transforms
  eleventyConfig.addTransform("purgecss", purgecss);
  eleventyConfig.addTransform("htmlmin", htmlmin);

  // Filters
  eleventyConfig.addFilter("machineDate", machineDate);
  eleventyConfig.addFilter("shortDate", shortDate);
  eleventyConfig.addFilter("humanDate", humanDate);

  // Static files
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/manifest.json");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  return {
    dir: { input: "src", output: "dist" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
