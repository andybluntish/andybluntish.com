module.exports = function () {
  const now = new Date()
  const email = 'andybluntish@gmail.com'
  const username = 'andybluntish'

  return {
    name: 'andybluntish.com',
    title: 'Andy Stanford-Bluntish',
    description: 'I build things on the web. I love what I do.',
    shortName: username,
    author: {
      name: 'Andy Stanford-Bluntish',
      email,
    },
    url: 'https://andybluntish.com',
    copyright: {
      start: 2006,
      end: now.getFullYear(),
    },
    footer: {
      links: [
        {
          title: 'Twitter',
          href: `https://twitter.com/${username}/`,
        },
        {
          title: 'CodePen',
          href: `https://codepen.io/${username}/`,
        },
        {
          title: 'GitHub',
          href: `https://github.com/${username}/`,
        },
        {
          title: 'Instagram',
          href: `https://instagram.com/${username}/`,
        },
        {
          title: 'Email',
          href: `mailto:${email}`,
        },
      ],
    },
  }
}
