// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-md p-8 shadow-xl border-0">
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              MediAI
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your personal health companion
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="w-full">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
