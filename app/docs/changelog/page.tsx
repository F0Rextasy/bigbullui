import changelog from "@/data/changelog.json";

export const metadata = { title: "Changelog" };

const ENTRIES = [
  {
    version: "0.2.0",
    date: "2026-09-06",
    notes: [
      "Standalone kpi-strip component with registry entry and live docs preview.",
      "Horizon chart band rendering rebuilt on SVG paths with layered opacity.",
      "Mobile game HUD set: joystick, d-pad, action and combo buttons, health, mana, XP, boss bar, team frames, damage vignette.",
      "Purged novelty refs removed from README, docs snippets, and wave manifests.",
      "New docs routes: videos, recipes, and this changelog.",
    ],
  },
  {
    version: "0.1.0",
    date: "2026-08-01",
    notes: [
      "Initial ticket stub component library with docs site and CLI.",
      "Zero-dependency rule enforced by integrity tests.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4 border-b border-dashed border-border pb-6">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Changelog</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Release history for bigbullui components, docs, and automation.
        </p>
      </div>
      <div className="space-y-4">
        {(changelog.entries as { version: string; date: string; title?: string; notes?: string[]; changes?: string[] }[]).map((e) => (
          <section
            key={e.version}
            aria-label={`Version ${e.version}`}
            className="rounded-lg border-2 border-foreground bg-card p-4 shadow-xs outline-1 outline-dashed outline-offset-[-5px] outline-border sm:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-mono text-base font-black text-foreground">v{e.version}</h2>
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{e.date}</span>
            </div>
            {e.title ? <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{e.title}</p> : null}
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {(e.changes ?? e.notes ?? []).map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </section>
        ))}
        {ENTRIES.map((e) => (
          <section
            key={e.version}
            aria-label={`Version ${e.version}`}
            className="rounded-lg border-2 border-foreground bg-card p-4 shadow-xs outline-1 outline-dashed outline-offset-[-5px] outline-border sm:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-mono text-base font-black text-foreground">v{e.version}</h2>
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{e.date}</span>
            </div>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              {e.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
