import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-3xl font-semibold">Nudge</h1>
      <p className="text-muted-foreground">Setup works.</p>
      <Button>Test button</Button>
    </main>
  );
}
