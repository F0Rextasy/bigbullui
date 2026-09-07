import Link from "next/link";

export const metadata = { title: "Bilesenler" };

const ITEMS = [
  { href: "/docs/button", title: "Button", desc: "Giris ve onay aksiyonlari icin damga butonu." },
  { href: "/docs/ticket-card", title: "Ticket Card", desc: "Etkinlik giris bileti yuzeyi." },
  { href: "/docs/data-table", title: "Data Table", desc: "Siralama ve aramali operasyon tablosu." },
  { href: "/docs/dialog", title: "Dialog", desc: "Odak tuzakli kisa form penceresi." },
];

export default function BilesenlerPage() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">TR // BILESENLER</p>
      <h1 className="text-3xl font-semibold tracking-tight">Populer Bilesenler</h1>
      <div className="grid gap-3">
        {ITEMS.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="font-mono text-sm font-bold">{c.title}</span>
            <span className="mt-1 block text-sm text-muted-foreground">{c.desc}</span>
          </Link>
        ))}
      </div>
      <Link href="/tr/docs" className="font-mono text-xs uppercase tracking-wider text-accent-strong hover:underline">TR docs &rarr;</Link>
    </main>
  );
}
