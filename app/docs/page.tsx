import Link from "next/link";
import { components } from "@/lib/registry-site";
import { CodeCopy } from "@/components/site/code-copy";

export const metadata = { title: "Components" };

const installCss = `@import "tailwindcss";
@import "bigbullui/css";`;

const installUsage = `import { CometButton } from "bigbullui";

<CometButton>Get started</CometButton>`;

export default function DocsIndex() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-[-0.03em]">Components</h1>
      <p className="mt-2 text-muted-foreground">
        {components.length} animated, accessible components. Copy the code, own it — or install the package.
      </p>

      <section className="mt-8 space-y-3 rounded-lg border border-border bg-card p-5">
        <h2 className="font-medium">Install via npm</h2>
        <div className="overflow-hidden rounded-lg bg-[#08080c]">
          <div className="flex items-center justify-end px-3 pt-3">
            <CodeCopy code="npm install bigbullui" />
          </div>
          <pre className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]">
            <code>npm install bigbullui</code>
          </pre>
        </div>
        <p className="text-sm text-muted-foreground">
          Add the design tokens to your CSS, then import any component:
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {components.map((component) => (
          <Link
            key={component.name}
            href={`/docs/${component.name}`}
            className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/20"
          >
            <h2 className="font-medium">{component.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{component.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
