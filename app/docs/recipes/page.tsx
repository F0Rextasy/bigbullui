import Link from "next/link";
import { CodeBox } from "@/components/site/code-box";
import { CompareHelper } from "@/components/site/compare-helper";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Recipes",
  description: "Copy-paste component recipes for checkout, auth gates, dashboards, and React Hook Form / Zod / Server Action validation.",
  path: "/docs/recipes",
});

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

const FORM_RECIPES = [
  {
    id: "server-actions-zod",
    title: "React 19 Server Actions + Zod (zero extra form deps)",
    description: "Uncontrolled native FormData validation using useActionState with bigbullui Field, Input, Select, Checkbox, and Switch.",
    code: `"use client";

import * as React from "react";
import { z } from "zod";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const TicketOrderSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  tier: z.enum(["vip", "general"], { message: "Select a ticket tier" }),
  agree: z.literal("on", { message: "Accept the venue policy" }),
});

type ActionState = { errors?: Record<string, string[]>; ok?: boolean };

async function submitOrder(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = TicketOrderSchema.safeParse({
    email: formData.get("email"),
    tier: formData.get("tier"),
    agree: formData.get("agree"),
  });
  if (!parsed.success) return { errors: parsed.error.flatten().fieldErrors };
  return { ok: true };
}

export function ServerActionForm() {
  const [state, action, pending] = React.useActionState(submitOrder, {});
  return (
    <form action={action} className="space-y-4">
      <Field htmlFor="order-email" label="Email" error={state.errors?.email?.[0]} required>
        <Input id="order-email" name="email" type="email" aria-invalid={Boolean(state.errors?.email)} />
      </Field>
      <Field htmlFor="order-tier" label="Tier" error={state.errors?.tier?.[0]} required>
        <Select
          id="order-tier"
          name="tier"
          defaultValue="general"
          options={[
            { value: "general", label: "General Admission" },
            { value: "vip", label: "VIP Front Row" },
          ]}
        />
      </Field>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox name="agree" value="on" />
          <span>I agree to venue terms</span>
        </label>
        <Switch name="alerts" aria-label="SMS gate alerts" />
      </div>
      <Button type="submit" disabled={pending}>{pending ? "Submitting..." : "Claim pass"}</Button>
    </form>
  );
}`,
  },
  {
    id: "react-hook-form-zod",
    title: "React Hook Form + Zod (register + Controller)",
    description: "Bind native inputs with register(ref + name) and controlled Select/DatePicker/Checkbox via Controller.",
    code: `"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  holder: z.string().min(2, "Name is required"),
  section: z.string().min(1, "Pick a section"),
  eventDate: z.date({ message: "Choose event date" }),
  notify: z.boolean(),
});

type Values = z.infer<typeof FormSchema>;

export function RhfTicketForm({ onSave }: { onSave: (v: Values) => void }) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(FormSchema),
    defaultValues: { holder: "", section: "a", notify: true },
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <Field htmlFor="holder" label="Pass Holder" error={errors.holder?.message} required>
        <Input id="holder" {...register("holder")} aria-invalid={Boolean(errors.holder)} />
      </Field>
      <Controller
        control={control}
        name="section"
        render={({ field }) => (
          <Field htmlFor="section" label="Section" error={errors.section?.message}>
            <Select
              id="section"
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              options={[{ value: "a", label: "Section A" }, { value: "b", label: "Balcony" }]}
            />
          </Field>
        )}
      />
      <Controller
        control={control}
        name="eventDate"
        render={({ field }) => (
          <Field htmlFor="event-date" label="Show Date" error={errors.eventDate?.message}>
            <DatePicker value={field.value} onChange={field.onChange} />
          </Field>
        )}
      />
      <Controller
        control={control}
        name="notify"
        render={({ field }) => (
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            <span>Email ticket PDF</span>
          </label>
        )}
      />
      <Button type="submit">Reserve seat</Button>
    </form>
  );
}`,
  },
  {
    id: "conform-zod",
    title: "Conform + Zod Progressive Enhancement",
    description: "Wire @conform-to/react getInputProps and native reset support cleanly without custom wrappers.",
    code: `"use client";

import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const Schema = z.object({
  coupon: z.string().min(4, "Code must be at least 4 characters"),
  express: z.boolean().optional(),
});

export function ConformForm() {
  const [form, fields] = useForm({
    onValidate: ({ formData }) => parseWithZod(formData, { schema: Schema }),
    shouldValidate: "onBlur",
  });

  return (
    <form {...getFormProps(form)} className="space-y-4">
      <Field htmlFor={fields.coupon.id} label="Promo Code" error={fields.coupon.errors?.[0]}>
        <Input {...getInputProps(fields.coupon, { type: "text" })} />
      </Field>
      <label className="flex items-center gap-2 text-sm">
        <Switch name={fields.express.name} defaultChecked={Boolean(fields.express.initialValue)} />
        <span>Express entry</span>
      </label>
      <Button type="submit">Apply code</Button>
    </form>
  );
}`,
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
              <CodeBox code={r.code} block language="tsx" />
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
      <section aria-labelledby="form-adapters" className="space-y-4">
        <div className="border-t border-dashed border-border pt-6">
          <h2 id="form-adapters" className="font-mono text-base font-bold text-foreground">
            Form library &amp; Server Action adapters
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            bigbullui stays zero-dependency, while every form control forwards <code className="font-mono text-xs text-foreground">ref</code>, <code className="font-mono text-xs text-foreground">name</code>, <code className="font-mono text-xs text-foreground">aria-invalid</code>, and native <code className="font-mono text-xs text-foreground">form.reset</code> events.
          </p>
        </div>
        <div className="space-y-6">
          {FORM_RECIPES.map((r) => (
            <section
              key={r.id}
              aria-labelledby={r.id}
              className="rounded-lg border-2 border-foreground bg-card p-4 shadow-xs outline-1 outline-dashed outline-offset-[-5px] outline-border sm:p-6"
            >
              <h3 id={r.id} className="font-mono text-sm font-bold text-foreground">
                {r.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
              <div className="mt-3">
                <CodeBox code={r.code} block language="tsx" />
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
