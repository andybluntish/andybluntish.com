import EleventyFetch from "@11ty/eleventy-fetch";

const fallbackRobots = `
# Dark Visitors Robots.txt

# AI Data Scraper
# https://darkvisitors.com/agents/applebot-extended

User-agent: Applebot-Extended
Disallow: /

# AI Data Scraper
# https://darkvisitors.com/agents/bytespider

User-agent: Bytespider
Disallow: /

# AI Data Scraper
# https://darkvisitors.com/agents/ccbot

User-agent: CCBot
Disallow: /

# AI Data Scraper
# https://darkvisitors.com/agents/claudebot

User-agent: ClaudeBot
Disallow: /

# AI Data Scraper
# https://darkvisitors.com/agents/diffbot

User-agent: Diffbot
Disallow: /

# AI Data Scraper
# https://darkvisitors.com/agents/facebookbot

User-agent: FacebookBot
Disallow: /

# AI Data Scraper
# https://darkvisitors.com/agents/google-extended

User-agent: Google-Extended
Disallow: /

# AI Data Scraper
# https://darkvisitors.com/agents/gptbot

User-agent: GPTBot
Disallow: /

# AI Data Scraper
# https://darkvisitors.com/agents/omgili

User-agent: omgili
Disallow: /

# Undocumented AI Agent
# https://darkvisitors.com/agents/anthropic-ai

User-agent: anthropic-ai
Disallow: /

# Undocumented AI Agent
# https://darkvisitors.com/agents/claude-web

User-agent: Claude-Web
Disallow: /

# Undocumented AI Agent
# https://darkvisitors.com/agents/cohere-ai

User-agent: cohere-ai
Disallow: /
`;

export default async function () {
  const url = "https://api.darkvisitors.com/robots-txts";
  const token = process.env.DARK_VISITORS_TOKEN;

  let robots = "";
  try {
    robots = await EleventyFetch(url, {
      duration: "1d",
      fetchOptions: {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_types: ["AI Data Scraper", "Undocumented AI Agent"],
          disallow: "/",
        }),
      },
    });
  } catch (error) {
    console.error(error);
    robots = fallbackRobots;
  }

  return { robots };
}
