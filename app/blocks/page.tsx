import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { BlocksExplorer, type BlockSection } from "@/components/site/blocks-explorer";

export const metadata = { title: "Blocks" };

const SECTIONS: BlockSection[] = [
  {
    group: "Admin dashboards",
    icon: "dashboard",
    blurb: "KPIs, ledgers, and back-office desks",
    items: ["admin-overview", "admin-analytics", "admin-ecommerce", "admin-crm", "admin-finance", "admin-saas"],
  },
  {
    group: "App boards",
    icon: "app",
    blurb: "Boards, inboxes, and players",
    items: [
      "app-mail", "app-tasks", "app-chat", "app-calendar", "app-users", "app-files",
      "app-kanban", "app-notes", "app-invoices", "app-contacts", "app-bookmarks", "app-player",
    ],
  },
  {
    group: "Auth passes",
    icon: "auth",
    blurb: "Logins, OTP, and recovery flows",
    items: ["auth-login", "auth-register", "auth-forgot", "auth-reset", "auth-verify", "auth-2fa"],
  },
  {
    group: "System pages",
    icon: "system",
    blurb: "Settings, pricing, help, and empty states",
    items: ["settings-account", "page-pricing", "page-faq", "page-404", "page-empty", "form-wizard"],
  },
  {
    group: "Marketing",
    icon: "marketing",
    blurb: "Heroes, features, and footers",
    items: [
      "landing-hero", "landing-heroes-2", "landing-features", "landing-testimonials",
      "landing-cta", "landing-footer", "landing-logos",
    ],
  },
  {
    group: "Content sections",
    icon: "content",
    blurb: "Contact, team, stats, and galleries",
    items: ["block-contact", "block-team", "block-stats", "block-gallery", "block-timeline", "block-newsletter"],
  },
  {
    group: "Operations",
    icon: "operations",
    blurb: "Logistics, HR, support, and academy desks",
    items: ["admin-logistics", "admin-hr", "admin-support", "admin-marketing", "admin-academy"],
  },
  {
    group: "Storefront",
    icon: "storefront",
    blurb: "Product, cart, checkout, and confirmation",
    items: ["page-product", "page-checkout", "page-cart", "page-storefront", "page-order-success"],
  },
  {
    group: "Service pages",
    icon: "service",
    blurb: "Events, portals, API desks, and live chat",
    items: [
      "block-event-landing", "block-customer-portal", "block-dev-api-keys",
      "block-live-chat", "block-user-profile-dossier",
    ],
  },
  {
    group: "Bookings & local",
    icon: "ticket",
    blurb: "Reservations, rentals, and appointments",
    items: [
      "block-restaurant", "block-real-estate", "block-course", "block-clinic", "block-event-ticketing",
      "block-hotel", "block-job-board", "block-portfolio", "block-gym", "block-car-rental",
      "block-pet-adoption", "block-conference",
    ],
  },
  {
    group: "Pages",
    icon: "pages",
    blurb: "Blog, careers, contact, and company pages",
    items: ["page-blog", "page-article", "page-careers", "page-contact", "page-about"],
  },
];

export default function BlocksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      <header className="space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">BIGBULLUI // BLOCKS</p>
        <h1 className="font-mono text-3xl font-black uppercase tracking-tight sm:text-4xl">Ready-to-print page blocks</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Full sections composed only from stock primitives. Copy a file from src/components/blocks into your project.
        </p>
      </header>
      <BlocksExplorer sections={SECTIONS} />
      </main>
      <SiteFooter />
    </div>
  );
}
