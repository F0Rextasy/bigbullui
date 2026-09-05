import Link from "next/link";
import { components } from "@/lib/registry-site";
import { DocsExplorer } from "@/components/site/docs-explorer";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Components" };

export default function DocsIndex() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4 border-b border-dashed border-border pb-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Components</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {components.length} tactile, zero-dependency open-source React components.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <Link
              href="/docs/installation"
              className="rounded-md border border-border px-2.5 py-1 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              Setup guide &rarr;
            </Link>
            <Link
              href="/docs/agents"
              className="rounded-md border border-border px-2.5 py-1 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              AI agent kit &rarr;
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="font-mono text-muted-foreground">Quick install:</span>
          <CodeBox code="npm install bigbullui" />
        </div>
      </div>

      {/* Explorer */}
      <DocsExplorer components={components} />
    </div>
  );
}
