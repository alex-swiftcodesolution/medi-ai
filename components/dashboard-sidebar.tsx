// components/dashboard-sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Home, User, Wallet, Pill, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Chat", icon: Home },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/cabinet", label: "Cabinet", icon: Pill },
];

export default function DashboardSidebar({
  className,
}: {
  className?: string;
}) {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <aside className={cn("w-64 border-r bg-card p-4 flex flex-col", className)}>
      <Link
        href="/dashboard"
        className="flex items-center gap-2 font-bold text-xl mb-8"
      >
        <Pill className="w-6 h-6" />
        MediAI
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Button
              key={item.href}
              asChild
              variant={active ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </nav>

      <Button
        variant="ghost"
        onClick={signOut}
        className="w-full justify-start"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </aside>
  );
}
