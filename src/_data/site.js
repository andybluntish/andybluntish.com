module.exports = function () {
  const author = {
    name: "Andy Stanford-Bluntish",
    email: "andybluntish@gmail.com",
    username: "andybluntish",
  };

  const externalLinks = [
    {
      title: "Twitter",
      href: `https://twitter.com/${author.username}/`,
      footer: true,
    },
    {
      title: "CodePen",
      href: `https://codepen.io/${author.username}/`,
      footer: true,
    },
    {
      title: "GitHub",
      href: `https://github.com/${author.username}/`,
      footer: true,
    },
    {
      title: "Instagram",
      href: `https://instagram.com/${author.username}/`,
      footer: true,
    },
    {
      title: "Email",
      href: `mailto:${author.email}`,
      footer: true,
    },
    {
      title: "Mastodon",
      href: `https://mastodon.online/@${author.username}`,
    },
  ];

  const host = "andybluntish.com";

  return {
    title: author.name,
    shortName: "AndySB",
    description: "I build things on the web. I love what I do.",
    author,
    host,
    baseUrl: `https://${host}`,
    copyrightYear: new Date().getFullYear(),
    externalLinks,
  };
};
