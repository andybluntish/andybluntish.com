import cheerio from "cheerio";
import { PurgeCSS } from "purgecss";
import CleanCSS from "clean-css";
import htmlmin from "html-minifier";

async function purge(content) {
  // parse the HTML content
  const $ = cheerio.load(content);

  // get the first <style> node from the <head>
  const styleNode = $("head > style").first();

  // store the CSS as a string
  const css = styleNode.text();

  // remove the CSS from the <style> node (otherwise purging will think it's being used)
  styleNode.text("");

  // serialize the HTML without CSS as a string
  const contentWithoutStyles = $.html();

  // run purgecss using the content (sans-CSS) and the extracted CSS
  const purgeCSSResult = await new PurgeCSS().purge({
    content: [
      {
        raw: contentWithoutStyles,
        extension: "html",
      },
    ],
    css: [
      {
        raw: css,
      },
    ],
    variables: true,
    fontFace: true,
    keyframes: true,
  });

  const purgedCSS = purgeCSSResult[0].css;

  // minify styles
  const minifiedCSS = new CleanCSS({}).minify(purgedCSS).styles;

  // set the <style> node content to the purged CSS string
  styleNode.text(minifiedCSS);

  // return the serialized document as the content for this page
  // the <style> node's content now includes only the CSS used in the HTML of the page!
  return $.html();
}

function minify(content) {
  return htmlmin.minify(content, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
  });
}

export default async function (content, outputPath) {
  if (!outputPath.endsWith(".html") || !/<html/.test(content)) {
    return content.trim();
  }

  const purged = await purge(content);
  const minified = minify(purged);

  return minified.trim();
}
