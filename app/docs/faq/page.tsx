import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata = { title: "FAQ" };

const QA: { q: string; a: string }[] = [
  { q: "What is bigbullui?", a: "An open-source React 19 + Tailwind CSS v4 component library with a Ticket-Stub aesthetic: 659 copy-paste components, 75 page blocks, and 1099 hand-drawn stroke icons. MIT licensed, zero runtime dependencies." },
  { q: "How do I install a single component?", a: "Run npx bigbullui add button (any slug works). The file lands in your components/ui with its cn() helper. No install needed at all if you copy the source by hand." },
  { q: "Does it work with shadcn?", a: "Yes. Every component and block is published as registry JSON: npx shadcn@latest add https://ui.bigbullapp.com/r/button.json. Same copy-paste ownership model." },
  { q: "How do I use it with AI coding assistants?", a: "Three ways: the MCP server (claude mcp add bigbullui -- npx -y bigbullui mcp), the agent rules at /skill.md, or per-component markdown at /md/<slug>." },
  { q: "How does dark mode work?", a: "Toggle the dark class on <html>. All tokens switch automatically; every component works in both themes without prop changes." },
  { q: "Is it accessible?", a: "Components ship WAI-ARIA roles, keyboard navigation, visible focus rings, and motion-reduce fallbacks. The docs run automated axe scans in CI." },
  { q: "Is it really zero-dependency?", a: "UI files import only react and a 7-line cn() helper. No Radix, Lucide, Framer Motion, or CVA in component sources — enforced by tests." },
  { q: "How do I theme it?", a: "Override the CSS variables from bigbullui.css, use the /theme studio (presets + fine tune + shadcn import), or pick a ready theme in /create." },
  { q: "Does it support RTL?", a: "Yes. Spacing uses logical props (ms-, me-, ps-, pe-, text-start), so layouts flip automatically under dir=\"rtl\"." },
  { q: "Can I use just the icons?", a: "Yes: npm i bigbullicons gives you the 1090 icons without components, or pull one with npx bigbullui add icon-ticket." },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Docs</p>
        <h1 className="mt-1 font-mono text-2xl font-black uppercase">FAQ</h1>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: QA.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
        <div className="mt-6 space-y-3">
          {QA.map((item) => (
            <details key={item.q} className="group rounded-lg border border-border bg-card p-4 open:border-foreground">
              <summary className="cursor-pointer font-mono text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {item.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
