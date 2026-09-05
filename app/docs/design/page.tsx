import Link from "next/link";

export const metadata = { title: "Design System" };

const principles = [
  {
    title: "Warm paper, ink lines",
    text: "Light theme is a cream stub (#F6F0E0 on #17130C). Dark theme is a night stub (#16120B on #F3EAD3) — a different material, not an inversion.",
  },
  {
    title: "Stamp red means action",
    text: "One accent (#BC3A28, brighter in dark) marks primary actions, focus rings and status. Everything else stays neutral.",
  },
  {
    title: "Mono speaks, sans explains",
    text: "JetBrains Mono for micro labels, readouts and code. Inter Tight for headings with tight tracking and everything else.",
  },
  {
    title: "Borders do the talking",
    text: "Dashed ticket edges, double frames on surfaces, squarish corners. Depth comes from ink, not blur.",
  },
];

export default function DesignPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Design System</h1>
        <p className="text-muted-foreground">
          The Ticket Stub language every component speaks. Tokens live in{" "}
          <code className="font-mono text-xs text-foreground">bigbullui.css</code> — override
          them and the whole library follows.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {principles.map((item) => (
          <div key={item.title} className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-medium">{item.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3 rounded-lg border border-dashed border-foreground/40 p-5">
        <h2 className="text-lg font-semibold tracking-tight">Motion and dark mode</h2>
        <p className="text-sm text-muted-foreground">
          Small tactile transitions with spring easing; every animation has a reduced-motion
          fallback. Dark mode is a single <code className="font-mono text-xs text-foreground">.dark</code> class
          on <code className="font-mono text-xs text-foreground">html</code>. Full spec:{" "}
          <code className="font-mono text-xs text-foreground">DESIGN.md</code> in the repo, and the{" "}
          <Link href="/docs/installation" className="underline">
            installation guide
          </Link>{" "}
          for tokens setup.
        </p>
      </section>
    </article>
  );
}
