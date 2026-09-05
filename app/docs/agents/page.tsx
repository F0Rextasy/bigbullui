import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "AI Agents" };

const duties = [
  {
    title: "Install first",
    text: "Run npm install bigbullui and import the design tokens before generating any UI.",
  },
  {
    title: "Use typed props",
    text: "Every component is fully typed — read the Props table on each component page.",
  },
  {
    title: "Keep accessibility",
    text: "Preserve ARIA attributes, keyboard support and focus management when customizing.",
  },
  {
    title: "Respect the theme",
    text: "Use semantic tokens only; toggle dark mode with the .dark class on html.",
  },
];

export default function AgentsPage() {
  const skill = readFileSync(join(process.cwd(), "SKILL.md"), "utf8");

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">AI Agents</h1>
        <p className="text-muted-foreground">
          What an agent should do with bigbullui, plus the copy-paste skill file.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {duties.map((duty, i) => (
          <div key={duty.title} className="rounded-lg border border-border bg-card p-5">
            <span className="font-mono text-sm text-accent-strong">0{i + 1}</span>
            <h2 className="mt-2 font-medium">{duty.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{duty.text}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">SKILL.md</h2>
        <CodeBox code={skill} block maxHeight="480px" />
      </section>
    </article>
  );
}
