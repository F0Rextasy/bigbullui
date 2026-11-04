import pkg from "../../package.json";

/** Published CLI version, so docs never drift from package.json. */
export const SITE_VERSION = pkg.version;
/** Static block inventory for the site search index (client-side; app/blocks reads the dir instead). */
export const BLOCK_SLUGS = [
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
] as const;

/** "admin-overview" -> "Admin Overview". */
export function slugTitle(slug: string): string {
  return slug.split("-").map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
}
