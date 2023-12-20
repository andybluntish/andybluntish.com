import dotenv from "dotenv";

import markdownIt from "markdown-it";
import eleventyNavigation from "@11ty/eleventy-navigation";
import eleventyUpgradeHelp from "@11ty/eleventy-upgrade-help";

import minify from "./lib/minify.js";

import pluginWebc from "@11ty/eleventy-plugin-webc";
import { EleventyRenderPlugin } from "@11ty/eleventy";
import { writeFileSync } from "fs";

if (process.env.BUILD_ENV !== "production") {
  dotenv.config();
}

export default async function (eleventyConfig) {
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

  // Static files
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/manifest.json");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // After build
  eleventyConfig.on("eleventy.after", async ({ results }) => {
    if (process.env.BUILD_ENV !== "production") {
      // skip minification in development
      return;
    }

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
}
