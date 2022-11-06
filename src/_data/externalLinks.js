const site = require("./site")();

module.exports = function () {
  const links = [
    {
      title: "Twitter",
      href: "https://twitter.com/andybluntish/",
      footer: true,
    },
    {
      title: "CodePen",
      href: "https://codepen.io/andybluntish/",
      footer: true,
    },
    {
      title: "GitHub",
      href: "https://github.com/andybluntish/",
      footer: true,
    },
    {
      title: "Instagram",
      href: "https://instagram.com/andybluntish/",
      footer: true,
    },
    {
      title: "Email",
      href: `mailto:${site.author.email}`,
      footer: true,
    },
    {
      title: "Mastodon",
      href: "https://mastodon.online/@andybluntish",
    },
  ];

  return links;
};
