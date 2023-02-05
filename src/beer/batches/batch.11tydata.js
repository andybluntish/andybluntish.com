module.exports = {
  eleventyComputed: {
    title: (data) => `Beer | ${data.batch.name}`,
  },
};
