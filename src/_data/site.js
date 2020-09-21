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
    date: {
      year: now.getFullYear(),
    },
  }
}
