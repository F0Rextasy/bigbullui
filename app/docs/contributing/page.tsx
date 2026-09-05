import Link from "next/link";

export const metadata = { title: "Contributing" };

const steps = [
  {
    n: "01",
    title: "Pick an issue",
    text: "Bugs, ideas and component requests live in GitHub Issues. Comment to claim one.",
  },
  {
    n: "02",
    title: "Build it zero-dep",
    text: "New components import only react and ./lib/utils. Typed props, keyboard support, both themes.",
  },
  {
    n: "03",
    title: "Document it",
    text: "Register metadata, add a live preview, usage snippet and props rows.",
  },
  {
    n: "04",
    title: "Verify and open a PR",
    text: "tsc clean and production build green. One component per PR keeps reviews fast.",
  },
];

export default function ContributingPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Contributing</h1>
        <p className="text-muted-foreground">
          Everyone can contribute: components, docs, bug reports, ideas. Start
          with an{" "}
          <a
            href="https://github.com/F0Rextasy/bigbullui/issues"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            issue
          </a>
          , finish with a pull request.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {steps.map((step) => (
          <div key={step.n} className="rounded-lg border border-border bg-card p-5">
            <span className="font-mono text-sm text-accent-strong">{step.n}</span>
            <h2 className="mt-2 font-medium">{step.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3 rounded-lg border border-dashed border-foreground/40 p-5">
        <h2 className="text-lg font-semibold tracking-tight">Full guide</h2>
        <p className="text-sm text-muted-foreground">
          Local setup, component checklist, PR rules and project layout live in{" "}
          <code className="font-mono text-xs text-foreground">CONTRIBUTING.md</code> at the repo
          root. Coding agents should also read <code className="font-mono text-xs text-foreground">SKILL.md</code> and{" "}
          <Link href="/docs/agents" className="underline">
            the agents guide
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
