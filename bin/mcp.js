#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- MCP server runs on plain Node, require() is intentional */

/**
 * bigbullui MCP server (zero dependencies, stdio JSON-RPC 2.0).
 * Exposes components, blocks, icons, design tokens, resources, and prompts to AI coding assistants.
 */

const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

const SITE = "https://ui.bigbullapp.com";
let VERSION = "unknown";
try {
  VERSION = require("../package.json").version;
} catch {
  // unreachable package.json keeps the placeholder in place
}
const GITHUB_RAW_TAG =
  VERSION !== "unknown"
    ? `https://raw.githubusercontent.com/F0Rextasy/bigbullui/v${VERSION}`
    : "https://raw.githubusercontent.com/F0Rextasy/bigbullui/main";
const GITHUB_RAW = "https://raw.githubusercontent.com/F0Rextasy/bigbullui/main";

function packageRoot() {
  return path.resolve(__dirname, "..");
}

const DEFAULT_ALLOWED_HOSTS = new Set([
  "ui.bigbullapp.com",
  "bigbullui.com",
  "raw.githubusercontent.com",
]);

function isAllowedHost(hostname) {
  const extra = (process.env.BIGBULLUI_REGISTRY_ALLOWLIST || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const host = String(hostname || "").toLowerCase();
  return DEFAULT_ALLOWED_HOSTS.has(host) || extra.includes(host);
}

const FETCH_TIMEOUT_MS = 15000;
const MAX_FETCH_BYTES = 5 * 1024 * 1024;
const MAX_RPC_LINE_BYTES = 1024 * 1024;

function fetchUrl(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      reject(new Error(`Invalid URL: ${url}`));
      return;
    }
    if (parsed.protocol !== "https:") {
      reject(new Error(`Refusing non-HTTPS URL: ${url}`));
      return;
    }
    if (!isAllowedHost(parsed.hostname)) {
      reject(new Error(`Refusing disallowed host "${parsed.hostname}" (SSRF guard): ${url}`));
      return;
    }
    const req = https.get(parsed, { headers: { "User-Agent": "bigbullui-mcp" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (redirects >= 5) {
          res.destroy();
          reject(new Error(`Too many redirects fetching ${url}`));
          return;
        }
        let nextUrl;
        try {
          nextUrl = new URL(res.headers.location, parsed);
        } catch {
          reject(new Error(`Invalid redirect location fetching ${url}`));
          return;
        }
        if (nextUrl.protocol !== "https:") {
          reject(new Error(`Refusing non-HTTPS redirect to ${nextUrl.href}`));
          return;
        }
        if (!isAllowedHost(nextUrl.hostname)) {
          reject(new Error(`Refusing redirect to disallowed host "${nextUrl.hostname}"`));
          return;
        }
        fetchUrl(nextUrl.href, redirects + 1).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        res.destroy();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      let totalBytes = 0;
      let aborted = false;
      const expectedLength =
        res.headers["content-length"] && !res.headers["content-encoding"]
          ? Number(res.headers["content-length"])
          : null;

      res.on("data", (chunk) => {
        totalBytes += chunk.length;
        if (totalBytes > MAX_FETCH_BYTES) {
          aborted = true;
          req.destroy(new Error(`Response exceeded ${MAX_FETCH_BYTES} bytes for ${url}`));
          return;
        }
        chunks.push(chunk);
      });
      res.on("aborted", () => {
        if (aborted) return;
        aborted = true;
        reject(new Error(`Stream aborted before completion for ${url}`));
      });
      res.on("end", () => {
        if (aborted) return;
        if (!res.complete) {
          reject(new Error(`Incomplete HTTP response for ${url}`));
          return;
        }
        if (expectedLength !== null && !Number.isNaN(expectedLength) && totalBytes !== expectedLength) {
          reject(new Error(`Truncated response for ${url}: expected ${expectedLength} bytes, got ${totalBytes}`));
          return;
        }
        res.destroy();
        resolve(Buffer.concat(chunks).toString("utf8"));
      });
      res.on("error", reject);
    });
    req.setTimeout(FETCH_TIMEOUT_MS, () => req.destroy(new Error(`Timed out fetching ${url}`)));
    req.on("error", reject);
  });
}

async function loadJson(rel, url) {
  const local = path.join(packageRoot(), rel);
  if (fs.existsSync(local)) return JSON.parse(fs.readFileSync(local, "utf8"));
  return JSON.parse(await fetchUrl(url));
}

async function loadText(rel, url, fallbackUrl) {
  const local = path.join(packageRoot(), rel);
  if (fs.existsSync(local)) return fs.readFileSync(local, "utf8");
  return fallbackUrl ? await fetchUrl(url).catch(() => fetchUrl(fallbackUrl)) : await fetchUrl(url);
}

const cache = {};
async function componentsIndex() {
  if (!cache.components) {
    cache.components = await loadJson("public/components.json", `${SITE}/components.json`);
  }
  return cache.components.components;
}

async function blocksIndex() {
  if (!cache.blocks) {
    cache.blocks = await loadJson("public/blocks.json", `${SITE}/blocks.json`);
  }
  return cache.blocks;
}

async function iconsIndex() {
  if (!cache.icons) {
    cache.icons = await loadJson("public/icons.json", `${SITE}/icons.json`);
  }
  return cache.icons;
}

async function propsIndex() {
  if (!cache.props) {
    const raw = await loadJson("src/data/docs-content.json", `${SITE}/docs-content.json`).catch(() => null);
    cache.props = raw && typeof raw === "object" && raw.props ? raw.props : {};
  }
  return cache.props;
}

async function themeCss() {
  if (!cache.theme) {
    cache.theme = await loadText("bigbullui.css", `${GITHUB_RAW_TAG}/bigbullui.css`, `${GITHUB_RAW}/bigbullui.css`);
  }
  return cache.theme;
}

function sliceCssSection(css, section) {
  if (!section || section === "all") return css;
  if (section === "tokens") {
    const end = css.indexOf("@keyframes");
    return end > 0 ? css.slice(0, end).trim() : css;
  }
  if (section === "dark") {
    const m = css.match(/\.dark\s*\{[\s\S]*?\n\}/);
    return m ? m[0] : "";
  }
  if (section === "keyframes") {
    const start = css.indexOf("@keyframes");
    return start >= 0 ? css.slice(start).trim() : "";
  }
  return css;
}

async function getRegistryPayload(slug, kindLabel) {
  const clean = String(slug || "").replace(/\.tsx$/, "");
  if (!/^[a-z0-9][a-z0-9-]*$/.test(clean)) {
    throw new Error(`Invalid ${kindLabel} name: ${slug}`);
  }
  const reg = await loadJson(`public/r/${clean}.json`, `${SITE}/r/${clean}.json`).catch(() => null);
  if (!reg) throw new Error(`Unknown ${kindLabel}: ${clean}. Use list_${kindLabel}s to discover names.`);
  const regFiles = Array.isArray(reg.files) ? reg.files : [];
  const docsUrl = reg.type === "registry:block" ? `${SITE}/blocks/${clean}` : `${SITE}/docs/${clean}`;
  const MAX_TOTAL = 80000;
  let remaining = MAX_TOTAL;
  let truncated = false;
  const files = [];
  for (const f of regFiles) {
    const content = typeof f.content === "string" ? f.content : "";
    const slice = remaining > 0 ? content.slice(0, remaining) : "";
    if (slice.length < content.length) truncated = true;
    remaining = Math.max(0, remaining - slice.length);
    files.push({
      path: f.path,
      ...(f.target ? { target: f.target } : {}),
      type: f.type,
      content: slice,
    });
  }
  return {
    name: reg.name,
    title: reg.title,
    type: reg.type,
    docs: docsUrl,
    install: `npx bigbullui add ${clean}`,
    registryDependencies: Array.isArray(reg.registryDependencies) ? reg.registryDependencies : [],
    files,
    truncated,
  };
}

const TOOLS = [
  {
    name: "list_components",
    description: "List bigbullui React components with titles and descriptions. Filter by free-text search and/or category.",
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
    description: "Get a component's full TSX source, bundled sibling files, and docs URL.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", description: "Component slug, e.g. ticket-card" } },
      required: ["name"],
    },
  },
  {
    name: "list_blocks",
    description: "List ready page blocks (admin dashboards, app screens, auth, pricing, checkout, marketing).",
    inputSchema: { type: "object", properties: { search: { type: "string" } } },
  },
  {
    name: "get_block",
    description: "Get a page block's full TSX source, UI dependencies, and install command.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", description: "Block slug, e.g. admin-overview" } },
      required: ["name"],
    },
  },
  {
    name: "get_props",
    description: "Get TypeScript prop interfaces and extracted defaults for a UI component.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", description: "Component slug, e.g. dialog" } },
      required: ["name"],
    },
  },
  {
    name: "list_icons",
    description: "List bigbullui stroke icons. Filter by free text.",
    inputSchema: {
      type: "object",
      properties: {
        search: { type: "string" },
        limit: { type: "number", description: "Max results (default 50, max 200)" },
      },
    },
  },
  {
    name: "get_icon",
    description: "Get one icon's TSX component source and page URL.",
    inputSchema: { type: "object", properties: { name: { type: "string" } }, required: ["name"] },
  },
  {
    name: "get_theme",
    description: "Get the Ticket Stub design tokens (bigbullui.css). Supports optional section filter: all | tokens | dark | keyframes.",
    inputSchema: {
      type: "object",
      properties: {
        section: { type: "string", enum: ["all", "tokens", "dark", "keyframes"] },
      },
    },
  },
];

const RESOURCES = [
  {
    uri: "bigbullui://tokens",
    name: "bigbullui Design Tokens",
    description: "Complete Tailwind v4 theme variables, dark mode tokens, and @keyframes from bigbullui.css",
    mimeType: "text/css",
  },
  {
    uri: "bigbullui://catalog",
    name: "Component Catalog Index",
    description: "Full JSON index of all UI components, categories, and lifecycle statuses",
    mimeType: "application/json",
  },
  {
    uri: "bigbullui://blocks",
    name: "Page Blocks Index",
    description: "Full JSON index of prebuilt page blocks",
    mimeType: "application/json",
  },
];

const PROMPTS = [
  {
    name: "build-page",
    description: "Compose an accessible bigbullui screen from zero-dependency blocks and components",
    arguments: [
      { name: "feature", description: "Target screen or flow (e.g. billing settings, checkout, kanban)", required: true },
    ],
  },
  {
    name: "audit-a11y",
    description: "Audit a TSX snippet against bigbullui accessibility, RTL, and semantic token rules",
    arguments: [
      { name: "component", description: "Component slug or JSX snippet to inspect", required: true },
    ],
  },
  {
    name: "migrate-theme",
    description: "Replace hard-coded palette classes and hex colors with semantic bigbullui CSS tokens",
    arguments: [
      { name: "source", description: "CSS or TSX snippet to migrate", required: true },
    ],
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
    return await getRegistryPayload(a.name, "component");
  }
  if (name === "get_block") {
    return await getRegistryPayload(a.name, "block");
  }
  if (name === "get_props") {
    const slug = String(a.name || "").replace(/\.tsx$/, "");
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) throw new Error(`Invalid component name: ${a.name}`);
    const allProps = await propsIndex();
    const doc = allProps[slug];
    if (!doc) throw new Error(`No extracted prop docs found for "${slug}".`);
    const props = Array.isArray(doc) ? doc : (doc.props || []);
    return { name: slug, docs: `${SITE}/docs/${slug}`, exports: Array.isArray(doc) ? [] : (doc.exports || []), props };
  }
  if (name === "list_blocks") {
    const idx = await blocksIndex();
    const q = (a.search || "").toLowerCase();
    const hits = idx.blocks
      .filter((b) => !q || b.toLowerCase().includes(q))
      .map((b) => ({ name: b, gallery: `${SITE}/blocks/${b}`, install: `npx bigbullui add ${b}` }));
    return { count: hits.length, blocks: hits };
  }
  if (name === "list_icons") {
    const idx = await iconsIndex();
    const q = (a.search || "").toLowerCase();
    const limit = Math.min(Math.max(a.limit || 50, 1), 200);
    const hits = idx.icons
      .filter((n) => !q || n.toLowerCase().includes(q))
      .slice(0, limit)
      .map((n) => ({ name: n, page: `${SITE}/icons/${n}` }));
    return { count: hits.length, total: idx.count, icons: hits };
  }
  if (name === "get_icon") {
    const slug = String(a.name || "").replace(/^icon-/, "");
    if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`Invalid icon name: ${a.name}`);
    const reg = await loadJson(`public/r/icons/${slug}.json`, `${SITE}/r/icons/${slug}.json`).catch(() => null);
    if (!reg) throw new Error(`Unknown icon: ${slug}. Use list_icons to discover names.`);
    const file = reg.files && reg.files[0];
    const full = file && typeof file.content === "string" ? file.content : "";
    return {
      name: slug,
      page: `${SITE}/icons/${slug}`,
      install: `npx bigbullui add icon-${slug}`,
      source: full.slice(0, 20000),
      truncated: full.length > 20000,
    };
  }
  if (name === "get_theme") {
    const raw = await themeCss();
    const css = sliceCssSection(raw, a.section);
    return {
      setup: '@import "tailwindcss";\n@import "bigbullui/css";',
      usage: "Use semantic tokens only (bg-primary, text-muted-foreground, border-border, bg-destructive, text-destructive-foreground). Never hard-code hex.",
      section: a.section || "all",
      bytes: css.length,
      css,
      truncated: false,
    };
  }
  throw new Error(`Unknown tool: ${name}`);
}

function textResult(payload) {
  return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
}

function writeFrame(obj) {
  try {
    process.stdout.write(JSON.stringify(obj) + "\n");
  } catch (err) {
    if (err && (err.code === "EPIPE" || err.code === "ERR_STREAM_DESTROYED")) process.exit(0);
    throw err;
  }
}

function reply(id, result) {
  if (id === undefined) return;
  writeFrame({ jsonrpc: "2.0", id, result });
}

function fail(id, code, message) {
  if (id === undefined) return;
  writeFrame({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });
}

process.stdout.on("error", (err) => {
  if (err && (err.code === "EPIPE" || err.code === "ERR_STREAM_DESTROYED")) process.exit(0);
});

async function handle(msg) {
  if (!msg || typeof msg !== "object" || Array.isArray(msg)) {
    fail(null, -32600, "Invalid JSON-RPC request");
    return;
  }
  const hasId = Object.prototype.hasOwnProperty.call(msg, "id");
  const isValidId = msg.id === null || typeof msg.id === "string" || typeof msg.id === "number";
  if (msg.jsonrpc !== "2.0" || typeof msg.method !== "string" || (hasId && !isValidId)) {
    if (hasId) fail(isValidId ? msg.id : null, -32600, "Invalid Request");
    return;
  }
  if (msg.method === "initialize") {
    const requested = msg.params && msg.params.protocolVersion;
    reply(msg.id, {
      protocolVersion: typeof requested === "string" && /^20\d{2}-/.test(requested) ? requested : "2024-11-05",
      capabilities: { tools: {}, resources: {}, prompts: {} },
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
    const toolName = msg.params && msg.params.name;
    if (typeof toolName !== "string" || !toolName) {
      fail(msg.id, -32602, "Missing tool name parameter");
      return;
    }
    try {
      const out = await callTool(toolName, msg.params.arguments);
      reply(msg.id, textResult(out));
    } catch (err) {
      reply(msg.id, {
        content: [{ type: "text", text: err && err.message ? err.message : String(err) }],
        isError: true,
      });
    }
    return;
  }
  if (msg.method === "resources/list") {
    reply(msg.id, { resources: RESOURCES });
    return;
  }
  if (msg.method === "resources/read") {
    const uri = msg.params && msg.params.uri;
    try {
      if (uri === "bigbullui://tokens") {
        const css = await themeCss();
        reply(msg.id, { contents: [{ uri, mimeType: "text/css", text: css }] });
      } else if (uri === "bigbullui://catalog") {
        const comps = await componentsIndex();
        reply(msg.id, { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(comps, null, 2) }] });
      } else if (uri === "bigbullui://blocks") {
        const blks = await blocksIndex();
        reply(msg.id, { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(blks, null, 2) }] });
      } else if (typeof uri === "string" && uri.startsWith("bigbullui://component/")) {
        const slug = uri.slice("bigbullui://component/".length);
        const payload = await getRegistryPayload(slug, "component");
        reply(msg.id, { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(payload, null, 2) }] });
      } else {
        fail(msg.id, -32602, `Unknown resource URI: ${String(uri)}`);
      }
    } catch (err) {
      fail(msg.id, -32603, err && err.message ? err.message : String(err));
    }
    return;
  }
  if (msg.method === "prompts/list") {
    reply(msg.id, { prompts: PROMPTS });
    return;
  }
  if (msg.method === "prompts/get") {
    const promptName = msg.params && msg.params.name;
    const args = (msg.params && msg.params.arguments) || {};
    if (promptName === "build-page") {
      reply(msg.id, {
        description: "Build an accessible page with bigbullui components",
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Build "${args.feature || "dashboard"}" using bigbullui semantic tokens (never hardcode hex), logical RTL spacing (ms-/me-/ps-/pe-), and native/WAI-ARIA accessible controls. Start by checking list_blocks and get_component.`,
            },
          },
        ],
      });
    } else if (promptName === "audit-a11y") {
      reply(msg.id, {
        description: "Audit component accessibility and semantic tokens",
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Audit "${args.component || "button"}" for explicit button types, keyboard navigation, Escape stack / focus-trap on overlays, semantic contrast tokens, and logical RTL classes.`,
            },
          },
        ],
      });
    } else if (promptName === "migrate-theme") {
      reply(msg.id, {
        description: "Migrate hardcoded colors to bigbullui semantic tokens",
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Convert hardcoded hex/Tailwind colors in:\n\n${args.source || ""}\n\ninto semantic tokens from bigbullui.css (bg-background, text-foreground, bg-card, border-border, bg-primary, text-primary-foreground, bg-destructive, text-destructive-foreground).`,
            },
          },
        ],
      });
    } else {
      fail(msg.id, -32602, `Unknown prompt: ${String(promptName)}`);
    }
    return;
  }
  if (msg.method.startsWith("notifications/") || !hasId) return;
  fail(msg.id, -32601, `Method not found: ${msg.method}`);
}

let buffer = "";
let overflowed = false;
function processLine(line) {
  if (!line) return;
  try {
    handle(JSON.parse(line)).catch((err) => process.stderr.write(`mcp error: ${err.message}\n`));
  } catch (err) {
    fail(null, -32700, `Parse error: ${err.message}`);
  }
}

process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  if (buffer.length > MAX_RPC_LINE_BYTES) {
    overflowed = true;
    const nl = buffer.indexOf("\n");
    if (nl < 0) {
      buffer = "";
      fail(null, -32600, `JSON-RPC frame exceeded ${MAX_RPC_LINE_BYTES} byte limit`);
      return;
    }
  }
  let idx;
  while ((idx = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);
    if (overflowed) {
      overflowed = false;
      fail(null, -32600, `JSON-RPC frame exceeded ${MAX_RPC_LINE_BYTES} byte limit`);
      continue;
    }
    processLine(line);
  }
});
process.stdin.on("end", () => {
  if (overflowed) {
    fail(null, -32600, `JSON-RPC frame exceeded ${MAX_RPC_LINE_BYTES} byte limit`);
    return;
  }
  const trailing = buffer.trim();
  buffer = "";
  processLine(trailing);
});
