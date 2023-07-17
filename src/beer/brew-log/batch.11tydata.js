module.exports = {
  eleventyComputed: {
    title: (data) => `Brew log | ${data.batch.name}`,
    pageStylesheet: (data) => `/beer/batches/${data.batch.slug}`,
    bodyClass: (data) => `batch-${data.batch.slug}`,
  },
};
