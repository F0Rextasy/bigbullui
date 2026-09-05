import { readFileSync } from "node:fs";
import { join } from "node:path";
import { components } from "@/lib/registry-site";
import { CodeBox } from "@/components/site/code-box";
import { DocsExplorer } from "@/components/site/docs-explorer";

export const metadata = { title: "Components" };

const installCss = `@import "tailwindcss";
@import "bigbullui/css";`;

const installUsage = `import { Button } from "bigbullui";

<Button>Admit one</Button>`;

const skillMd = readFileSync(join(process.cwd(), "SKILL.md"), "utf8");

export default function DocsIndex() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Components</h1>
        <p className="mt-2 text-muted-foreground">
          Animated, accessible open-source React components. Search or browse by category.
        </p>
      </div>

      <section className="space-y-3 rounded-lg border border-border bg-card p-6 outline-1 outline-dashed outline-offset-[-6px]">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Quick start
        </span>
        <h2 className="text-lg font-semibold tracking-tight">Install via npm</h2>
          <CodeBox code="npm install bigbullui" />
        <p className="text-sm text-muted-foreground">
          Add the design tokens to your global CSS:
        </p>
          <CodeBox code={installCss} block />
          <CodeBox code={installUsage} block />
      </section>

      <section className="space-y-3 rounded-lg border border-dashed border-foreground/40 p-6">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          AI agents
        </span>
        <h2 className="text-lg font-semibold tracking-tight">Teach your agent bigbullui</h2>
        <p className="text-sm text-muted-foreground">
          Paste SKILL.md into any coding agent. It covers installation, tokens, components and rules.
        </p>
          <CodeBox code={skillMd} block maxHeight="256px" />
      </section>

      <DocsExplorer components={components} />
    </div>
  );
}
