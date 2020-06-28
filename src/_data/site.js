module.exports = function () {
  const now = new Date()

  return {
    title: 'Andy Stanford-Bluntish',
    description: 'I build things on the web. I love what I do.',
    author: {
      name: 'Andy Stanford-Bluntish',
    },
    url: 'https://andybluntish.com',
    date: {
      year: now.getFullYear(),
    },
    theme: {
      light: {
        primary: '#d93f00',
        foreground: '#363d49',
        background: '#fff',
      },
      dark: {
        primary: '#ff9e66',
        foreground: '#d1d6e0',
        background: '#1b1d22',
      },
    },
  }
}
