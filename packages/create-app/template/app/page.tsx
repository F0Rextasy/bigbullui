import { Button } from "bigbullui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "bigbullui";
import { ThemeToggle } from "./theme-toggle";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6 text-foreground">
      <Card className="w-full max-w-[420px]">
        <CardHeader>
          <CardTitle>Admit one</CardTitle>
          <CardDescription>Your bigbullui starter is ready.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Button>Get Started</Button>
          <ThemeToggle />
        </CardContent>
      </Card>
    </main>
  );
}
