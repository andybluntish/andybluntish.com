const parse5 = require('parse5')
const { PurgeCSS } = require('purgecss')
const CleanCSS = require('clean-css')

module.exports = async function (content, outputPath) {
  if (process.env.NODE_ENV === 'production' && outputPath.endsWith('.html')) {
    // parse the HTML content
    const document = parse5.parse(content)

    // get the <style> node from the <head>
    const styleNode = document.childNodes
      .find((node) => node.nodeName === 'html')
      .childNodes.find((node) => node.nodeName === 'head')
      .childNodes.find((node) => node.nodeName === 'style')
      .childNodes.find((node) => node.nodeName === '#text')
    // store the CSS as a string
    const css = styleNode.value
    // remove the CSS from the <style> node (otherwise purging will think it's being used)
    styleNode.value = ''
    // serialize the HTML without CSS as a string
    const contentWithoutStyles = parse5.serialize(document)
    // run purgecss using the content (sans-CSS) and the extracted CSS
    const purgeCSSResult = await new PurgeCSS().purge({
      content: [
        {
          raw: contentWithoutStyles,
          extension: 'html',
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
    })
    const purgedCSS = purgeCSSResult[0].css
    // minify styles
    const minifiedCSS = new CleanCSS({}).minify(purgedCSS).styles

    // set the <style> node content to the purged CSS string
    styleNode.value = minifiedCSS

    // return the serialized document as the content for this page
    // the <style> node's content now includes only the CSS used in the HTML of the page
    return parse5.serialize(document)
  }

  return content
}
