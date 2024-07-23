import { execSync } from "child_process";

const now = new Date(); const host = "andybluntish.com";
const gitSha = execSync("git rev-parse --short HEAD").toString().trim();
const author = {
  name: "Andy Stanford-Bluntish",
  email: "andybluntish@gmail.com",
  username: "andybluntish",
};

export default {
  title: author.name,
  description: "I build things on the web. I love what I do.",
  author,
  host,
  baseUrl: `https://${host}`,
  copyright: {
    date: now,
    message: `Copyright (c) 2006–${now.getFullYear()} ${author.name}`,
  },
  year: new Date().getFullYear(),
  gitSha,
};
