module.exports = function () {
  const author = {
    name: "Andy Stanford-Bluntish",
    email: "andybluntish@gmail.com",
    username: "andybluntish",
  };

  const externalLinks = [
    {
      title: "Mastodon",
      href: `https://mastodon.online/@${author.username}`,
    },
    {
      title: "GitHub",
      href: `https://github.com/${author.username}/`,
    },
    {
      title: "CodePen",
      href: `https://codepen.io/${author.username}/`,
    },
  ];

  const host = "andybluntish.com";

  return {
    title: author.name,
    description: "I build things on the web. I love what I do.",
    author,
    host,
    baseUrl: `https://${host}`,
    copyrightYear: new Date().getFullYear(),
    externalLinks,
  };
};
