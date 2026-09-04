export const metadata = { title: "Design Tokens" };

type Token = { name: string; value: string; usage: string };

const light: Token[] = [
  { name: "--background", value: "#F6F0E0", usage: "Page cream" },
  { name: "--foreground", value: "#17130C", usage: "Ink text" },
  { name: "--muted", value: "#ECE3CC", usage: "Muted surfaces" },
  { name: "--muted-foreground", value: "#6F6350", usage: "Secondary text" },
  { name: "--card", value: "#FFFDF5", usage: "Card surface" },
  { name: "--border", value: "#D8C9AC", usage: "Tan hairlines" },
  { name: "--input", value: "#C9BA99", usage: "Field borders" },
  { name: "--primary", value: "#17130C", usage: "Solid ink elements" },
  { name: "--primary-foreground", value: "#FBF5E8", usage: "Text on ink" },
  { name: "--secondary", value: "#ECE3CC", usage: "Soft fills" },
  { name: "--accent", value: "#BC3A28", usage: "Stamp red" },
  { name: "--accent-foreground", value: "#FFF6E8", usage: "Text on stamp red" },
  { name: "--accent-strong", value: "#BC3A28", usage: "Emphasis, links" },
  { name: "--ring", value: "#BC3A28", usage: "Focus rings" },
  { name: "--radius", value: "0.5rem", usage: "Base corner radius" },
];

const dark: Token[] = [
  { name: "--background", value: "#16120B", usage: "Night stub" },
  { name: "--foreground", value: "#F3EAD3", usage: "Cream text" },
  { name: "--muted", value: "#241E13", usage: "Muted surfaces" },
  { name: "--muted-foreground", value: "#A89A7E", usage: "Secondary text" },
  { name: "--card", value: "#1E1810", usage: "Card surface" },
  { name: "--border", value: "#3A3122", usage: "Warm dark hairlines" },
  { name: "--input", value: "#4A3F2C", usage: "Field borders" },
  { name: "--primary", value: "#F3EAD3", usage: "Solid cream elements" },
  { name: "--primary-foreground", value: "#16120B", usage: "Text on cream" },
  { name: "--secondary", value: "#241E13", usage: "Soft fills" },
  { name: "--accent", value: "#D95B43", usage: "Stamp red, brightened" },
  { name: "--accent-foreground", value: "#FFF6E6", usage: "Text on stamp red" },
  { name: "--accent-strong", value: "#E8705A", usage: "Emphasis, links" },
  { name: "--ring", value: "#E0573D", usage: "Focus rings" },
  { name: "--radius", value: "0.5rem", usage: "Base corner radius" },
];

function TokenTable({ tokens }: { tokens: Token[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary text-left text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Swatch</th>
            <th className="px-4 py-2 font-medium">Token</th>
            <th className="px-4 py-2 font-medium">Value</th>
            <th className="px-4 py-2 font-medium">Usage</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name} className="border-t border-border">
              <td className="px-4 py-2">
                <span
                  aria-hidden
                  className="inline-block size-8 rounded-sm border border-border"
                  style={{ backgroundColor: token.value }}
                />
              </td>
              <td className="px-4 py-2 font-mono text-xs">{token.name}</td>
              <td className="px-4 py-2 font-mono text-xs">{token.value}</td>
              <td className="px-4 py-2 text-muted-foreground">{token.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TokensPage() {
  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-[-0.03em]">Design Tokens</h1>
        <p className="text-muted-foreground">
          Every bigbullui component reads these CSS variables. Override them to retheme the whole library.
        </p>
      </header>
      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Light — ticket stub</h2>
        <TokenTable tokens={light} />
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Dark — night stub</h2>
        <TokenTable tokens={dark} />
      </section>
    </article>
  );
}
