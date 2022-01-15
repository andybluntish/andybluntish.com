module.exports = function () {
  const now = new Date();
  const url = "https://andybluntish.com";
  const name = "Andy Stanford-Bluntish";
  const email = "andybluntish@gmail.com";
  const username = "andybluntish";

  return {
    title: name,
    description: "I build things on the web. I love what I do.",
    shortName: username,
    author: {
      name,
      email,
      username,
    },
    url,
    copyright: {
      start: 2006,
      end: now.getFullYear(),
    },
  };
};
