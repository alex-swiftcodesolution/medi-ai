// components/dashboard-content.tsx
import { cn } from "@/lib/utils";

export default function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        "flex-1 overflow-y-auto p-4 md:p-6",
        // 4rem ≈ 64px → height of bottom nav (h-14 = 56px + border)
        "pb-20 md:pb-6"
      )}
    >
      {children}
    </main>
  );
}
