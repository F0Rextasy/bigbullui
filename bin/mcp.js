#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- MCP server runs on plain Node, require() is intentional */

/**
 * bigbullui MCP server (zero dependencies, stdio JSON-RPC).
 * Exposes the component registry, blocks, icons, and theme to AI coding
 * assistants (Claude Code, Cursor, Copilot). No backend: data resolves from
 * the local checkout when present, otherwise from the published site/GitHub.
 *
 * Configure (Claude Code): claude mcp add bigbullui -- npx -y bigbullui mcp
 * Configure (JSON): { "mcpServers": { "bigbullui": { "command": "npx", "args": ["-y", "bigbullui", "mcp"] } } }
 */

const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const SITE = "https://ui.bigbullapp.com";
const GITHUB_RAW = "https://raw.githubusercontent.com/F0Rextasy/bigbullui/main";
const VERSION = "1.1.1";

function packageRoot() {
  return path.resolve(__dirname, "..");
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "bigbullui-mcp" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchUrl(res.headers.location).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

async function loadJson(rel, url) {
  const local = path.join(packageRoot(), rel);
  if (fs.existsSync(local)) return JSON.parse(fs.readFileSync(local, "utf8"));
  return JSON.parse(await fetchUrl(url));
}

async function loadText(rel, url) {
  const local = path.join(packageRoot(), rel);
  if (fs.existsSync(local)) return fs.readFileSync(local, "utf8");
  return await fetchUrl(url);
}

const cache = {};
async function componentsIndex() {
  if (!cache.components) {
    cache.components = await loadJson("public/components.json", `${SITE}/components.json`);
  }
  return cache.components.components;
}

const TOOLS = [
  {
    name: "list_components",
    description: "List bigbullui React components (659) with titles and descriptions. Filter by free-text search and/or category.",
    inputSchema: {
      type: "object",
      properties: {
        search: { type: "string", description: "Free text matched against name, title, description" },
        category: {
          type: "string",
          enum: ["ticket-stub", "form", "pickers", "charts", "data", "feedback", "navigation", "editors", "media"],
          description: "Component category",
        },
        limit: { type: "number", description: "Max results (default 30, max 100)" },
      },
    },
  },
  {
    name: "get_component",
    description: "Get a component's full TSX source plus docs URL. Paste the source into the user's project (copy-paste model) or run `npx bigbullui add <name>`.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", description: "Component slug, e.g. ticket-card" } },
      required: ["name"],
    },
  },
  {
    name: "list_blocks",
    description: "List the 63 ready page blocks (admin dashboards, app screens, auth, pricing, checkout, marketing).",
    inputSchema: { type: "object", properties: { search: { type: "string" } } },
  },
  {
    name: "list_icons",
    description: "List bigbullicons stroke icons (1023). Filter by free text.",
    inputSchema: {
      type: "object",
      properties: {
        search: { type: "string" },
        limit: { type: "number", description: "Max results (default 50, max 200)" },
      },
    },
  },
  {
    name: "get_theme",
    description: "Get the Ticket Stub design tokens (bigbullui.css): CSS variables, dark theme, keyframes. Required setup: `@import \"tailwindcss\"; @import \"bigbullui/css\";`",
    inputSchema: { type: "object", properties: {} },
  },
];

async function callTool(name, args) {
  const a = args || {};
  if (name === "list_components") {
    const all = await componentsIndex();
    const q = (a.search || "").toLowerCase();
    const limit = Math.min(Math.max(a.limit || 30, 1), 100);
    const hits = all
      .filter(
        (c) =>
          (!a.category || c.category === a.category) &&
          (!q || `${c.name} ${c.title} ${c.description}`.toLowerCase().includes(q))
      )
      .slice(0, limit)
      .map((c) => ({ ...c, docs: `${SITE}/docs/${c.name}`, registry: `${SITE}/r/${c.name}.json` }));
    return { count: hits.length, components: hits };
  }
  if (name === "get_component") {
    const slug = String(a.name || "").replace(/\.tsx$/, "");
    if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`Invalid component name: ${a.name}`);
    const reg = await loadJson(`public/r/${slug}.json`, `${SITE}/r/${slug}.json`).catch(() => null);
    if (!reg) throw new Error(`Unknown component: ${slug}. Use list_components to discover names.`);
    const file = reg.files && reg.files[0];
    return {
      name: reg.name,
      title: reg.title,
      docs: `${SITE}/docs/${slug}`,
      install: `npx bigbullui add ${slug}`,
      source: file && typeof file.content === "string" ? file.content.slice(0, 60000) : null,
    };
  }
  if (name === "list_blocks") {
    const idx = await loadJson("public/blocks.json", `${SITE}/blocks.json`);
    const q = (a.search || "").toLowerCase();
    const hits = idx.blocks
      .filter((b) => !q || b.toLowerCase().includes(q))
      .map((b) => ({ name: b, gallery: `${SITE}/blocks`, install: `npx bigbullui add ${b}` }));
    return { count: hits.length, blocks: hits };
  }
  if (name === "list_icons") {
    const idx = await loadJson("public/icons.json", `${SITE}/icons.json`);
    const q = (a.search || "").toLowerCase();
    const limit = Math.min(Math.max(a.limit || 50, 1), 200);
    const hits = idx.icons
      .filter((n) => !q || n.toLowerCase().includes(q))
      .slice(0, limit)
      .map((n) => ({ name: n, page: `${SITE}/icons/${n}` }));
    return { count: hits.length, total: idx.count, icons: hits };
  }
  if (name === "get_theme") {
    const css = await loadText("bigbullui.css", `${GITHUB_RAW}/bigbullui.css`);
    return {
      setup: '@import "tailwindcss";\n@import "bigbullui/css";',
      usage: "Components use semantic tokens only (bg-primary, text-muted-foreground, border-border, bg-success, text-warning, ...). Never hard-code hex.",
      css: css.slice(0, 20000),
    };
  }
  throw new Error(`Unknown tool: ${name}`);
}

function textResult(payload) {
  return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
}

function reply(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + "\n");
}

function fail(id, code, message) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }) + "\n");
}

async function handle(msg) {
  if (!msg || msg.jsonrpc !== "2.0" || typeof msg.method !== "string") return;
  if (msg.method === "initialize") {
    reply(msg.id, {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "bigbullui", version: VERSION },
    });
    return;
  }
  if (msg.method === "ping") {
    reply(msg.id, {});
    return;
  }
  if (msg.method === "tools/list") {
    reply(msg.id, { tools: TOOLS });
    return;
  }
  if (msg.method === "tools/call") {
    try {
      const out = await callTool(msg.params && msg.params.name, msg.params && msg.params.arguments);
      reply(msg.id, textResult(out));
    } catch (err) {
      fail(msg.id, -32603, err && err.message ? err.message : String(err));
    }
    return;
  }
  if (msg.method.startsWith("notifications/")) return;
  if (msg.id !== undefined) fail(msg.id, -32601, `Method not found: ${msg.method}`);
}

let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let idx;
  while ((idx = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);
    if (!line) continue;
    try {
      handle(JSON.parse(line)).catch((err) => process.stderr.write(`mcp error: ${err.message}\n`));
    } catch (err) {
      process.stderr.write(`mcp parse error: ${err.message}\n`);
    }
  }
});
