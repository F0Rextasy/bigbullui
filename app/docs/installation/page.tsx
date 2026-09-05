import { CodeBox } from "@/components/site/code-box";

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

const cliInit = `npx bigbullui init`;
const cliAdd = `npx bigbullui add button badge ticket-card`;

export default function InstallationPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Installation</h1>
        <p className="text-muted-foreground">
          Three ways to build with bigbullui: pull components with the CLI, install the all-in-one npm package, or copy source files directly.
        </p>
      </header>

      {/* METHOD A: CLI */}
      <section className="space-y-6 rounded-lg border-2 border-dashed border-border p-6 bg-card">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                Recommended
              </span>
              <h2 className="text-xl font-semibold tracking-tight">Method A · CLI (Code you own)</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Directly drops zero-dependency component source code into your project.
            </p>
          </div>
          <span className="font-mono text-xs text-muted-foreground">🎫 CLI v0.2</span>
        </div>

        <div className="space-y-5">
          <Step n="01" title="Initialize project & tokens">
            <p className="text-sm text-muted-foreground">
              Creates <code className="font-mono text-xs text-foreground">lib/utils.ts</code> and copies design tokens.
            </p>
            <CodeBox code={cliInit} />
          </Step>

          <Step n="02" title="Add components">
            <p className="text-sm text-muted-foreground">
              Fetch any component with zero dependencies. Sibling utilities are automatically bundled.
            </p>
            <CodeBox code={cliAdd} />
          </Step>

          <Step n="03" title="Use in your views">
            <CodeBox code={`import { Button } from "@/components/ui/button";\nimport { TicketCard } from "@/components/ui/ticket-card";\n\nexport default function Page() {\n  return (\n    <TicketCard title="VIP ADMISSION" serial="№ 00481">\n      <Button>Claim Pass</Button>\n    </TicketCard>\n  );\n}`} block />
          </Step>
        </div>
      </section>

      {/* METHOD B: NPM */}
      <section className="space-y-6 rounded-lg border border-border p-6 bg-card/50">
        <div className="border-b border-border pb-3">
          <h2 className="text-lg font-semibold tracking-tight">Method B · npm package</h2>
          <p className="text-xs text-muted-foreground">
            Single dependency bundling all 460+ components with pre-built ESM/CJS treeshaking.
          </p>
        </div>

        <div className="space-y-5">
          <Step n="B · 01" title="Install the package">
            <CodeBox code="npm install bigbullui" />
          </Step>

          <Step n="B · 02" title="Add design tokens to globals.css">
            <CodeBox code={cssSetup} block />
          </Step>

          <Step n="B · 03" title="Import and use">
            <CodeBox code={npmUsage} block />
          </Step>
        </div>
      </section>

      {/* METHOD C: MANUAL */}
      <section className="space-y-3 rounded-lg border border-dashed border-foreground/30 p-5">
        <h2 className="text-base font-semibold tracking-tight">Method C · Manual copy-paste</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Copy the target file from <code className="font-mono text-xs text-foreground">src/components/ui/[name].tsx</code> into your project.
          </li>
          <li>
            Create <code className="font-mono text-xs text-foreground">./lib/utils.ts</code> with the 7-line <code className="font-mono text-xs text-foreground">cn</code> helper.
          </li>
          <li>
            Import <code className="font-mono text-xs text-foreground">bigbullui/css</code> or copy token variables into your stylesheet.
          </li>
        </ol>
      </section>
    </article>
  );
}
