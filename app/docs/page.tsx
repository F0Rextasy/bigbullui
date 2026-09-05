import { readFileSync } from "node:fs";
import { join } from "node:path";
import { components } from "@/lib/registry-site";
import { CodeBlock } from "@/components/ui/code-block";
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
          Animated, accessible React components with zero dependencies. Search or browse by category.
        </p>
      </div>

      <section className="space-y-3 rounded-lg border border-border bg-card p-6 outline-1 outline-dashed outline-offset-[-6px]">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Quick start
        </span>
        <h2 className="text-lg font-semibold tracking-tight">Install via npm</h2>
        <CodeBlock code="npm install bigbullui" variant="terminal" showLineNumbers={false} allowToggleLineNumbers={false} allowToggleWordWrap={false} showNotches={false} />
        <p className="text-sm text-muted-foreground">
          Add the design tokens to your global CSS:
        </p>
        <CodeBlock code={installCss} language="css" showLineNumbers={false} allowToggleLineNumbers={false} allowToggleWordWrap={false} showNotches={false} />
        <CodeBlock code={installUsage} language="tsx" showLineNumbers={false} allowToggleLineNumbers={false} allowToggleWordWrap={false} showNotches={false} />
      </section>

      <section className="space-y-3 rounded-lg border border-dashed border-foreground/40 p-6">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          AI agents
        </span>
        <h2 className="text-lg font-semibold tracking-tight">Teach your agent bigbullui</h2>
        <p className="text-sm text-muted-foreground">
          Paste SKILL.md into any coding agent. It covers installation, tokens, components and rules.
        </p>
        <CodeBlock code={skillMd} language="markdown" maxHeight="256px" showNotches={false} />
      </section>

      <DocsExplorer components={components} />
    </div>
  );
}
