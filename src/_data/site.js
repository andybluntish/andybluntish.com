import { execSync } from "child_process";

export default function () {
  const author = {
    name: "Andy Stanford-Bluntish",
    email: "andybluntish@gmail.com",
    username: "andybluntish",
  };

  const host = "andybluntish.com";
  const gitSha = execSync("git rev-parse --short HEAD").toString().trim();

  return {
    title: author.name,
    description: "I build things on the web. I love what I do.",
    author,
    host,
    baseUrl: `https://${host}`,
    copyrightYear: new Date().getFullYear(),
    gitSha,
  };
}
