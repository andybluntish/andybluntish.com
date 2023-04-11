const fontPreloadMap = {
  "short-stack": [
    { href: "/fonts/Silkscreen-Regular-subset.woff2" },
    { href: "/fonts/Silkscreen-Bold-subset.woff2" },
  ],
};

const fontPreloadDefault = [{ href: "/fonts/Mona-Sans-subset.woff2" }];

module.exports = {
  eleventyComputed: {
    title: (data) => `Brew log | ${data.batch.name}`,
    pageStylesheet: (data) => `/beer/batches/${data.batch.slug}`,
    preloadFonts: (data) => {
      return fontPreloadMap[data.batch.slug] || fontPreloadDefault;
    },
  },
};
