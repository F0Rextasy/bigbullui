import { AdminOverview } from "@/components/blocks/admin-overview";
import { AdminAnalytics } from "@/components/blocks/admin-analytics";
import { AdminEcommerce } from "@/components/blocks/admin-ecommerce";
import { AdminCrm } from "@/components/blocks/admin-crm";
import { AdminFinance } from "@/components/blocks/admin-finance";
import { AdminSaas } from "@/components/blocks/admin-saas";
import { AppMail } from "@/components/blocks/app-mail";
import { AppTasks } from "@/components/blocks/app-tasks";
import { AppChat } from "@/components/blocks/app-chat";
import { AppCalendar } from "@/components/blocks/app-calendar";
import { AppUsers } from "@/components/blocks/app-users";
import { AppFiles } from "@/components/blocks/app-files";
import { AppKanban } from "@/components/blocks/app-kanban";
import { AuthLogin } from "@/components/blocks/auth-login";
import { AuthRegister } from "@/components/blocks/auth-register";
import { AuthForgot } from "@/components/blocks/auth-forgot";
import { AuthReset } from "@/components/blocks/auth-reset";
import { AuthVerify } from "@/components/blocks/auth-verify";
import { Auth2fa } from "@/components/blocks/auth-2fa";
import { SettingsAccount } from "@/components/blocks/settings-account";
import { PagePricing } from "@/components/blocks/page-pricing";
import { PageFaq } from "@/components/blocks/page-faq";
import { Page404 } from "@/components/blocks/page-404";
import { PageEmpty } from "@/components/blocks/page-empty";
import { FormWizard } from "@/components/blocks/form-wizard";
import { LandingHero } from "@/components/blocks/landing-hero";
import { LandingFeatures } from "@/components/blocks/landing-features";
import { LandingTestimonials } from "@/components/blocks/landing-testimonials";
import { LandingCta } from "@/components/blocks/landing-cta";
import { LandingFooter } from "@/components/blocks/landing-footer";
import { LandingLogos } from "@/components/blocks/landing-logos";
import { BlockContact } from "@/components/blocks/block-contact";
import { BlockTeam } from "@/components/blocks/block-team";
import { BlockStats } from "@/components/blocks/block-stats";
import { BlockGallery } from "@/components/blocks/block-gallery";
import { BlockTimeline } from "@/components/blocks/block-timeline";
import { BlockNewsletter } from "@/components/blocks/block-newsletter";
import { CopyBlock } from "@/components/site/copy-block";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata = { title: "Blocks" };

const SECTIONS: { group: string; items: { name: string; node: React.ReactNode }[] }[] = [
  {
    group: "Admin dashboards",
    items: [
      { name: "admin-overview", node: <AdminOverview /> },
      { name: "admin-analytics", node: <AdminAnalytics /> },
      { name: "admin-ecommerce", node: <AdminEcommerce /> },
      { name: "admin-crm", node: <AdminCrm /> },
      { name: "admin-finance", node: <AdminFinance /> },
      { name: "admin-saas", node: <AdminSaas /> },
    ],
  },
  {
    group: "App boards",
    items: [
      { name: "app-mail", node: <AppMail /> },
      { name: "app-tasks", node: <AppTasks /> },
      { name: "app-chat", node: <AppChat /> },
      { name: "app-calendar", node: <AppCalendar /> },
      { name: "app-users", node: <AppUsers /> },
      { name: "app-files", node: <AppFiles /> },
      { name: "app-kanban", node: <AppKanban /> },
    ],
  },
  {
    group: "Auth passes",
    items: [
      { name: "auth-login", node: <AuthLogin /> },
      { name: "auth-register", node: <AuthRegister /> },
      { name: "auth-forgot", node: <AuthForgot /> },
      { name: "auth-reset", node: <AuthReset /> },
      { name: "auth-verify", node: <AuthVerify /> },
      { name: "auth-2fa", node: <Auth2fa /> },
    ],
  },
  {
    group: "System pages",
    items: [
      { name: "settings-account", node: <SettingsAccount /> },
      { name: "page-pricing", node: <PagePricing /> },
      { name: "page-faq", node: <PageFaq /> },
      { name: "page-404", node: <Page404 /> },
      { name: "page-empty", node: <PageEmpty /> },
      { name: "form-wizard", node: <FormWizard /> },
    ],
  },
  {
    group: "Marketing",
    items: [
      { name: "landing-hero", node: <LandingHero /> },
      { name: "landing-features", node: <LandingFeatures /> },
      { name: "landing-testimonials", node: <LandingTestimonials /> },
      { name: "landing-cta", node: <LandingCta /> },
      { name: "landing-footer", node: <LandingFooter /> },
      { name: "landing-logos", node: <LandingLogos /> },
    ],
  },
  {
    group: "Content sections",
    items: [
      { name: "block-contact", node: <BlockContact /> },
      { name: "block-team", node: <BlockTeam /> },
      { name: "block-stats", node: <BlockStats /> },
      { name: "block-gallery", node: <BlockGallery /> },
      { name: "block-timeline", node: <BlockTimeline /> },
      { name: "block-newsletter", node: <BlockNewsletter /> },
    ],
  },
];

export default function BlocksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl space-y-12 px-4 py-10 sm:px-6">
      <header className="space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">BIGBULLUI // BLOCKS</p>
        <h1 className="font-mono text-3xl font-black uppercase tracking-tight sm:text-4xl">Ready-to-print page blocks</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Full sections composed only from stock primitives. Copy a file from src/components/blocks into your project.
        </p>
      </header>
      {SECTIONS.map((section) => (
        <section key={section.group} className="space-y-6">
          <h2 className="font-mono text-sm font-black uppercase tracking-[0.25em] text-muted-foreground">{section.group}</h2>
          {section.items.map((item) => (
            <article key={item.name} id={item.name} className="space-y-3 scroll-mt-24">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-mono text-base font-black uppercase tracking-wider">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <CopyBlock name={item.name} />
                  <code className="rounded border border-dashed border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    npx bigbullui add {item.name}
                  </code>
                </div>
              </div>
              {item.node}
            </article>
          ))}
        </section>
      ))}
      </main>
      <SiteFooter />
    </div>
  );
}
