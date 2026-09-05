import { CopyButton } from "@/components/ui/copy-button";

export const metadata = { title: "Installation" };

const cssSetup = `@import "tailwindcss";
@import "bigbullui/css";`;

const npmUsage = `import { Button } from "bigbullui";

<Button>Admit one</Button>`;

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight">
        <span className="font-mono text-sm text-accent-strong">{n}</span> {title}
      </h2>
      {children}
    </section>
  );
}

function CodeBox({ code }: { code: string }) {
  return (
    <div className="overflow-hidden rounded-lg bg-[#08080c]">
      <div className="flex items-center justify-end px-3 pt-3">
          <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-[#fafaf7]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function InstallationPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Installation</h1>
        <p className="text-muted-foreground">
          Two ways to use bigbullui: install the npm package, or copy the source files into your project.
        </p>
      </header>

      <Step n="A · 01" title="Install the package">
        <CodeBox code="npm install bigbullui" />
      </Step>

      <Step n="A · 02" title="Add the design tokens">
        <CodeBox code={cssSetup} />
      </Step>

      <Step n="A · 03" title="Use any component">
        <CodeBox code={npmUsage} />
      </Step>

      <section className="space-y-3 rounded-lg border border-dashed border-foreground/40 p-5">
        <h2 className="text-lg font-semibold tracking-tight">Copy-paste alternative</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Copy the files you need from <code className="font-mono text-xs text-foreground">src/components/ui/</code> plus
            the <code className="font-mono text-xs text-foreground">cn</code> helper at{" "}
            <code className="font-mono text-xs text-foreground">src/components/ui/lib/utils.ts</code>, keeping the structure.
          </li>
          <li>
            Copy the token CSS (<code className="font-mono text-xs text-foreground">:root</code>,{" "}
            <code className="font-mono text-xs text-foreground">.dark</code>,{" "}
            <code className="font-mono text-xs text-foreground">@theme inline</code>,{" "}
            <code className="font-mono text-xs text-foreground">@keyframes</code>) from{" "}
            <code className="font-mono text-xs text-foreground">bigbullui.css</code> into your stylesheet.
          </li>
          <li>Import and use — no install step, the code is yours.</li>
        </ol>
      </section>
    </article>
  );
}
