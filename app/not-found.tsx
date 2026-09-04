import Link from "next/link";
import { SiteNav } from "@/components/site/site-nav";

export const metadata = {
  title: "404 — Void Ticket",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteNav />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="relative w-full max-w-lg rounded-lg border-[1.5px] border-foreground bg-card p-8 outline-1 outline-dashed outline-offset-[-7px] sm:p-10">
          {/* Header row: Ticket metadata */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              ADMIT · 000
            </span>
            <span className="inline-block rotate-[-3deg] rounded-sm border border-accent px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
              VOID / REVOKED
            </span>
          </div>

          {/* Body */}
          <div className="py-8">
            <div className="font-mono text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
              404
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              This stub was cancelled.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The seat, component, or URL you are looking for does not exist or has already been torn from the booklet.
            </p>
          </div>

          {/* Perforation divider */}
          <div className="relative my-2 border-t border-dashed border-border" />

          {/* Footer actions */}
          <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-xs text-muted-foreground">
              SECTION: VOID · ROW: 0
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/docs"
                className="inline-flex h-9 cursor-pointer items-center rounded-md border border-border bg-transparent px-4 text-xs font-medium transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Browse components
              </Link>
              <Link
                href="/"
                className="inline-flex h-9 cursor-pointer items-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-all duration-150 hover:scale-[1.02] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Return home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">bigbullui</span>
          <span>© 2026 bigbullui · MIT licensed</span>
        </div>
      </footer>
    </div>
  );
}
