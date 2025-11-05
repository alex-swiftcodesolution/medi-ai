// app/dashboard/page.tsx
import Chat from "@/components/chat/Chat";
import { Card } from "@/components/ui/card";

export default function DashboardHome() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="h-full">
        <Chat />
      </Card>
    </div>
  );
}
