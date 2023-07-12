const dotenv = require("dotenv");
const markdownIt = require("markdown-it");
const eleventyNavigation = require("@11ty/eleventy-navigation");
const eleventyUpgradeHelp = require("@11ty/eleventy-upgrade-help");
const minify = require("./lib/minify.js");
const machineDate = require("./lib/filters/machine-date.js");
const shortDate = require("./lib/filters/short-date.js");
const humanDate = require("./lib/filters/human-date.js");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const { writeFileSync } = require("fs");

if (process.env.BUILD_ENV !== "production") {
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
    }),
  );

  // Plugins
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(eleventyNavigation);
  eleventyConfig.addPlugin(eleventyUpgradeHelp);
  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_includes/components/**/*.webc",
  });

  // Filters
  eleventyConfig.addFilter("machineDate", machineDate);
  eleventyConfig.addFilter("shortDate", shortDate);
  eleventyConfig.addFilter("humanDate", humanDate);

  // Static files
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/manifest.json");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // After build
  eleventyConfig.on("eleventy.after", async ({ results }) => {
    for (const result of results) {
      const { content, outputPath } = result;
      const minified = await minify(content, outputPath);

      writeFileSync(outputPath, minified);
    }
  });

  return {
    dir: { input: "src", output: "dist" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
