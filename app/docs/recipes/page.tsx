import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";
import { CompareHelper } from "@/components/site/compare-helper";

export const metadata = { title: "Recipes" };

const RECIPES = [
  {
    id: "checkout-flow",
    title: "Checkout flow",
    description: "Cart summary, coupon validation, and a sticky claim bar for ticket checkout.",
    code: `import { CheckoutSummary } from "@/components/ui/checkout-summary";
import { CouponField } from "@/components/ui/coupon-field";
import { StickyBar } from "@/components/ui/sticky-bar";

export function Checkout() {
  return (
    <>
      <CheckoutSummary />
      <CouponField onApply={(code) => console.log(code)} />
      <StickyBar itemCount={2} total="$90.00" actionText="ADMIT NOW" />
    </>
  );
}`,
    parts: [
      { href: "/docs/checkout-summary", label: "Checkout Summary" },
      { href: "/docs/coupon-field", label: "Coupon Field" },
      { href: "/docs/sticky-bar", label: "Sticky Bar" },
    ],
  },
  {
    id: "auth-gate",
    title: "Auth gate",
    description: "Login form, OTP verification, and two-factor setup for box office staff.",
    code: `import { LoginForm } from "@/components/ui/login-form";
import { OtpVerify } from "@/components/ui/otp-verify";
import { TwoFactor } from "@/components/ui/two-factor";

export function AuthGate() {
  return (
    <>
      <LoginForm onSubmit={(v) => console.log(v)} />
      <OtpVerify onVerify={(code) => console.log(code)} />
      <TwoFactor />
    </>
  );
}`,
    parts: [
      { href: "/docs/login-form", label: "Login Form" },
      { href: "/docs/otp-verify", label: "OTP Verify" },
      { href: "/docs/two-factor", label: "Two Factor" },
    ],
  },
  {
    id: "ops-dashboard",
    title: "Ops dashboard",
    description: "KPI strip, trend chart, and live activity feed for nightly venue operations.",
    code: `import { KpiStrip } from "@/components/ui/kpi-strip";
import { LineChart } from "@/components/ui/line-chart";
import { ActivityFeed } from "@/components/ui/activity-feed";

export function OpsDashboard() {
  return (
    <>
      <KpiStrip tiles={[{ label: "ADMITTED", value: "4,820" }]} />
      <LineChart series={[{ label: "Scans", data: [10, 22, 18, 30] }]} />
      <ActivityFeed />
    </>
  );
}`,
    parts: [
      { href: "/docs/kpi-strip", label: "KPI Strip" },
      { href: "/docs/line-chart", label: "Line Chart" },
      { href: "/docs/activity-feed", label: "Activity Feed" },
    ],
  },
];

export default function RecipesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4 border-b border-dashed border-border pb-6">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Recipes</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Copy-paste compositions of bigbullui components for checkout, auth, and dashboards.
        </p>
      </div>
      <div className="space-y-6">
        {RECIPES.map((r) => (
          <section
            key={r.id}
            aria-labelledby={r.id}
            className="rounded-lg border-2 border-foreground bg-card p-4 shadow-xs outline-1 outline-dashed outline-offset-[-5px] outline-border sm:p-6"
          >
            <h2 id={r.id} className="font-mono text-base font-bold text-foreground">
              {r.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
            <div className="mt-3">
              <CodeBox code={r.code} />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.parts.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {p.label} &rarr;
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      <section aria-labelledby="compare-metrics" className="space-y-3">
        <h2 id="compare-metrics" className="font-mono text-base font-bold text-foreground">
          Compare metric components
        </h2>
        <CompareHelper
          titleA="Stat Tile"
          valuesA={["Single metric", "Tilt on hover", "Spark bars", "Data pages"]}
          titleB="KPI Strip"
          valuesB={["Four tiles", "Static grid", "Spark bars", "Dashboards"]}
          rows={["Scope", "Motion", "Trend", "Best for"]}
          note="Use Stat Tile for a hero number, Kpi Strip for the full nightly summary."
        />
      </section>
    </div>
  );
}
