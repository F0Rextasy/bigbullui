import { readFileSync } from "node:fs";
import { join } from "node:path";
import { components } from "@/lib/registry-site";
import { CodeCopy } from "@/components/site/code-copy";
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
        <div className="overflow-hidden rounded-lg bg-[#08080c]">
          <div className="flex items-center justify-end px-3 pt-3">
            <CodeCopy code="npm install bigbullui" />
          </div>
          <pre className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]">
            <code>npm install bigbullui</code>
          </pre>
        </div>
        <p className="text-sm text-muted-foreground">
          Add the design tokens to your global CSS:
        </p>
        <div className="overflow-hidden rounded-lg bg-[#08080c]">
          <div className="flex items-center justify-end px-3 pt-3">
            <CodeCopy code={installCss} />
          </div>
          <pre className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]">
            <code>{installCss}</code>
          </pre>
        </div>
        <div className="overflow-hidden rounded-lg bg-[#08080c]">
          <div className="flex items-center justify-end px-3 pt-3">
            <CodeCopy code={installUsage} />
          </div>
          <pre className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]">
            <code>{installUsage}</code>
          </pre>
        </div>
      </section>

      <section className="space-y-3 rounded-lg border border-dashed border-foreground/40 p-6">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          AI agents
        </span>
        <h2 className="text-lg font-semibold tracking-tight">Teach your agent bigbullui</h2>
        <p className="text-sm text-muted-foreground">
          Paste SKILL.md into any coding agent. It covers installation, tokens, components and rules.
        </p>
        <div className="overflow-hidden rounded-lg bg-[#08080c]">
          <div className="flex items-center justify-end px-3 pt-3">
            <CodeCopy code={skillMd} />
          </div>
          <pre className="max-h-64 overflow-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]">
            <code>{skillMd}</code>
          </pre>
        </div>
      </section>

      <DocsExplorer components={components} />
    </div>
  );
}
