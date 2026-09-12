import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Anthropic-AI",
    "PerplexityBot",
    "Google-Extended",
    "CCBot",
    "Bytespider",
    "Applebot-Extended",
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: "https://ui.bigbullapp.com/sitemap.xml",
    host: "https://ui.bigbullapp.com",
  };
}
