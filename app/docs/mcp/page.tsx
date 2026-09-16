import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "MCP Server" };

const CLAUDE = `claude mcp add bigbullui -- npx -y bigbullui mcp`;
const JSON_CFG = `{
  "mcpServers": {
    "bigbullui": { "command": "npx", "args": ["-y", "bigbullui", "mcp"] }
  }
}`;
const SMOKE = `echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | npx -y bigbullui mcp`;

const TOOLS = [
  ["list_components", "Search 650+ components by text and category."],
  ["get_component", "Full TSX source + docs URL for one slug."],
  ["list_blocks", "75 ready page blocks (admin, auth, pricing, marketing)."],
  ["list_icons", "1099 stroke icons, free-text filter."],
  ["get_icon", "One icon source + page link."],
  ["get_theme", "Ticket Stub tokens, setup snippet, keyframes."],
];

export default function McpPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">MCP Server</h1>
        <p className="text-muted-foreground">
          Zero-backend MCP server over stdio. The agent queries the registry, blocks, icons and
          theme — no library install needed in the user project.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Claude Code</h2>
        <CodeBox code={CLAUDE} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Cursor · VS Code · Codex</h2>
        <p className="text-sm text-muted-foreground">
          Paste into MCP settings JSON. A ready-to-copy <code className="font-mono text-xs text-foreground">.mcp.json</code> also ships at the repo root.
        </p>
        <CodeBox code={JSON_CFG} block />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Tools</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {TOOLS.map(([name, desc]) => (
            <li key={name} className="rounded-lg border border-border bg-card p-4">
              <p className="font-mono text-xs font-bold">{name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Smoke test</h2>
        <CodeBox code={SMOKE} />
      </section>
    </article>
  );
}
