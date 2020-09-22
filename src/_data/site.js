module.exports = function () {
  const now = new Date()

  return {
    title: 'Andy Stanford-Bluntish',
    description: 'I build things on the web. I love what I do.',
    shortName: 'andybluntish',
    author: {
      name: 'Andy Stanford-Bluntish',
      email: 'hello@bluntish.net',
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
          href: 'https://twitter.com/andybluntish/',
        },
        {
          title: 'CodePen',
          href: 'https://codepen.io/andybluntish/',
        },
        {
          title: 'GitHub',
          href: 'https://github.com/andybluntish/',
        },
        {
          title: 'Instagram',
          href: 'https://instagram.com/andybluntish/',
        },
        {
          title: 'Email',
          href: 'mailto:hello@bluntish.net',
        },
      ],
    },
  }
}
