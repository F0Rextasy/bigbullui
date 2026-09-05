import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";

export const metadata = { title: "Design System & Tokens" };

const principles = [
  {
    title: "Warm paper, ink lines",
    text: "Light theme is a cream stub (#F6F0E0 on #17130C). Dark theme is a night stub (#16120B on #F3EAD3) — a tactile material shift, not a cold mechanical inversion.",
  },
  {
    title: "Stamp red means action",
    text: "One accent (#BC3A28, brighter in dark) marks primary actions, focus rings, and status badges. Everything else stays calm and neutral.",
  },
  {
    title: "Mono speaks, sans explains",
    text: "JetBrains Mono for micro labels, readouts, tickets, and serial numbers. Inter Tight for headings with tight tracking and UI body copy.",
  },
  {
    title: "Borders do the talking",
    text: "Dashed ticket edges, double frames on cards, squarish corners. Depth comes from crisp ink strokes and paper borders, not heavy drop blurs.",
  },
];

const tokens = [
  { name: "--background", light: "#f6f0e0", dark: "#16120b", desc: "Page and canvas background" },
  { name: "--foreground", light: "#17130c", dark: "#f3ead3", desc: "Primary text and sharp ink strokes" },
  { name: "--card", light: "#fffdf5", dark: "#1e1810", desc: "Surface containers and elevated stubs" },
  { name: "--border", light: "#d8c9ac", dark: "#3a3122", desc: "Dashed outlines and card dividers" },
  { name: "--primary", light: "#17130c", dark: "#f3ead3", desc: "Filled buttons and solid contrast" },
  { name: "--accent", light: "#bc3a28", dark: "#d95b43", desc: "Stamp red action, badges, and focus rings" },
  { name: "--muted", light: "#ece3cc", dark: "#241e13", desc: "Secondary badges and inactive track bg" },
  { name: "--radius", light: "0.5rem", dark: "0.5rem", desc: "Tactile squarish ticket corner radius" },
];

const overrideCode = `/* In your globals.css after importing bigbullui */
@import "tailwindcss";
@import "bigbullui/css";

/* 1. Override tokens globally */
:root {
  --radius: 0.25rem; /* sharper retro corners */
  --accent: #c2410c; /* warm amber stamp */
}

/* 2. Custom night stub colors */
.dark {
  --background: #0f172a; /* deep navy paper */
  --accent: #f97316;     /* vibrant orange stamp */
  --border: #1e293b;
}

/* 3. Extend Tailwind v4 utility theme inline */
@theme inline {
  --font-ticket: "JetBrains Mono", monospace;
}`;

export default function DesignPage() {
  return (
    <article className="space-y-12">
      <header className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="rounded border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-accent">
            Ticket Stub Spec
          </span>
          <span className="font-mono text-xs text-muted-foreground">Tailwind CSS v4</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Design System & Tokens</h1>
        <p className="text-muted-foreground">
          The Ticket Stub visual language every component speaks. Tokens live in{" "}
          <code className="font-mono text-xs text-foreground">bigbullui.css</code> — override
          them and the entire library adapts instantly.
        </p>
      </header>

      {/* CORE PHILOSOPHY */}
      <section className="grid gap-4 sm:grid-cols-2">
        {principles.map((item) => (
          <div key={item.title} className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-medium text-foreground">{item.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </section>

      {/* DESIGN TOKENS TABLE */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Core Design Tokens</h2>
          <p className="text-sm text-muted-foreground">
            All components reference these semantic variables via Tailwind utilities (e.g.{" "}
            <code className="font-mono text-xs text-foreground">bg-background</code>,{" "}
            <code className="font-mono text-xs text-foreground">border-border</code>,{" "}
            <code className="font-mono text-xs text-foreground">text-accent</code>).
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 font-mono text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5">CSS Variable</th>
                <th className="px-4 py-2.5">Light (Paper)</th>
                <th className="px-4 py-2.5">Dark (Night)</th>
                <th className="px-4 py-2.5">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tokens.map((token) => (
                <tr key={token.name} className="hover:bg-muted/20">
                  <td className="px-4 py-2.5 font-mono text-xs font-semibold text-foreground">
                    {token.name}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      {token.light.startsWith("#") && (
                        <span
                          className="h-3.5 w-3.5 rounded-xs border border-border"
                          style={{ backgroundColor: token.light }}
                        />
                      )}
                      <span>{token.light}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      {token.dark.startsWith("#") && (
                        <span
                          className="h-3.5 w-3.5 rounded-xs border border-border"
                          style={{ backgroundColor: token.dark }}
                        />
                      )}
                      <span>{token.dark}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{token.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TAILWIND V4 CUSTOMIZATION GUIDE */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Tailwind CSS v4 Customization</h2>
          <p className="text-sm text-muted-foreground">
            In Tailwind CSS v4, theme values are defined directly in CSS using standard CSS variables and{" "}
            <code className="font-mono text-xs text-foreground">@theme inline</code>. No{" "}
            <code className="font-mono text-xs text-foreground">tailwind.config.js</code> required.
          </p>
        </div>

        <CodeBox code={overrideCode} block />
      </section>

      {/* MOTION & A11Y */}
      <section className="space-y-3 rounded-lg border border-dashed border-foreground/40 p-5 bg-card">
        <h2 className="text-lg font-semibold tracking-tight">Motion & Accessibility (A11y)</h2>
        <p className="text-sm text-muted-foreground">
          Tactile transitions with snappy spring easing. Every component includes{" "}
          <code className="font-mono text-xs text-foreground">motion-reduce</code> fallbacks for users with vestibular sensitivities.
          Full keyboard focus rings (<code className="font-mono text-xs text-foreground">focus-visible:ring-2 ring-ring</code>) are guaranteed across all interactive elements.
        </p>
        <div className="pt-2 text-xs">
          <Link href="/docs/installation" className="text-accent underline font-medium">
            → View Installation & CLI Guide
          </Link>
        </div>
      </section>
    </article>
  );
}
