import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { CopyBlock } from "@/components/site/copy-block";

export function generateStaticParams() {
  return [
    "admin-overview", "admin-analytics", "admin-ecommerce", "admin-crm", "admin-finance", "admin-saas",
    "app-mail", "app-tasks", "app-chat", "app-calendar", "app-users", "app-files", "app-kanban",
    "auth-login", "auth-register", "auth-forgot", "auth-reset", "auth-verify", "auth-2fa",
    "settings-account", "page-pricing", "page-faq", "page-404", "page-empty", "form-wizard",
    "landing-hero", "landing-features", "landing-testimonials", "landing-cta", "landing-footer", "landing-logos",
    "block-contact", "block-team", "block-stats", "block-gallery", "block-timeline", "block-newsletter",
    "admin-logistics", "admin-hr", "admin-support", "admin-marketing", "admin-academy",
    "app-notes", "app-invoices", "app-contacts", "app-bookmarks", "app-player",
    "page-product", "page-checkout", "page-cart", "page-storefront", "page-order-success",
    "block-event-landing", "block-customer-portal", "block-dev-api-keys", "block-live-chat", "block-user-profile-dossier",
    "landing-heroes-2", "page-blog", "page-article", "page-careers", "page-contact", "page-about",
    "block-restaurant", "block-real-estate", "block-course", "block-clinic", "block-event-ticketing",
    "block-hotel", "block-job-board", "block-portfolio", "block-gym", "block-car-rental",
    "block-pet-adoption", "block-conference",
  ].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.split("-").map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
  return { title: `${title} — Block` };
}

export default async function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) notFound();
  let Node: React.ComponentType | null = null;
  // Dynamic specifier: slug is runtime-selected per request; a static
  // 75-entry map would duplicate generateStaticParams above.
  try {
    const mod = (await import(`@/components/blocks/${slug}`)) as Record<string, unknown>;
    const found = Object.values(mod).find((v) => typeof v === "function");
    if (typeof found === "function") Node = found as React.ComponentType;
  } catch {
    notFound();
  }
  if (!Node) notFound();
  const Render = Node as React.ComponentType;
  const title = slug.split("-").map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <Link href="/blocks" className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground">
          ← All blocks
        </Link>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <h1 className="font-mono text-2xl font-black uppercase">{title}</h1>
          <CopyBlock name={slug} />
        </div>
        <div className="mt-6">
          <Render />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
