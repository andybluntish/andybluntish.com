export default function () {
  const author = {
    name: "Andy Stanford-Bluntish",
    email: "andybluntish@gmail.com",
    username: "andybluntish",
  };

  const host = "andybluntish.com";

  return {
    title: author.name,
    description: "I build things on the web. I love what I do.",
    author,
    host,
    baseUrl: `https://${host}`,
    copyrightYear: new Date().getFullYear(),
  };
}
