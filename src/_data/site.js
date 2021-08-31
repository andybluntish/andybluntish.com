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
    },
    url,
    copyright: {
      start: 2006,
      end: now.getFullYear(),
    },
    footer: {
      links: [
        {
          title: "Twitter",
          href: `https://twitter.com/${username}/`,
        },
        {
          title: "CodePen",
          href: `https://codepen.io/${username}/`,
        },
        {
          title: "GitHub",
          href: `https://github.com/${username}/`,
        },
        {
          title: "Instagram",
          href: `https://instagram.com/${username}/`,
        },
        {
          title: "Email",
          href: `mailto:${email}`,
        },
      ],
    },
  };
};
