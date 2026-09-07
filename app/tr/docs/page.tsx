import Link from "next/link";

export const metadata = { title: "TR Docs" };

const PAGES = [
  { href: "/tr/docs/kurulum", title: "Kurulum", desc: "CLI ile kurulum ve token kurulumu." },
  { href: "/tr/docs/bilesenler", title: "Bilesenler", desc: "Populer bilesenlere hizli bakis." },
  { href: "/tr/docs/tema", title: "Tema", desc: "Ticket Stub tema ve dark stub gecisi." },
];

export default function TrDocsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">BIGBULLUI // TR</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">Turkce Dokuman Baslangici</h1>
      <p className="mt-2 text-sm text-muted-foreground">Kurulum ve populer sayfalarin Turkce ozetleri. Ingilizce tam referans icin docs bolumune bakin.</p>
      <div className="mt-6 grid gap-3">
        {PAGES.map((p) => (
          <Link key={p.href} href={p.href} className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="font-mono text-sm font-bold">{p.title}</span>
            <span className="mt-1 block text-sm text-muted-foreground">{p.desc}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
