import { Button } from "bigbullui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "bigbullui";
import { ThemeToggle } from "./theme-toggle";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--background)",
        color: "var(--foreground)",
        padding: 24,
      }}
    >
      <Card style={{ maxWidth: 420, width: "100%" }}>
        <CardHeader>
          <CardTitle>Admit one</CardTitle>
          <CardDescription>Your bigbullui starter is ready.</CardDescription>
        </CardHeader>
        <CardContent style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Button>Get Started</Button>
          <ThemeToggle />
        </CardContent>
      </Card>
    </main>
  );
}
