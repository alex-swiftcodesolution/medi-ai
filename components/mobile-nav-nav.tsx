// components/mobile-bottom-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Home, User, Wallet, Pill, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Chat" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
  { href: "/dashboard/wallet", icon: Wallet, label: "Wallet" },
  { href: "/dashboard/cabinet", icon: Pill, label: "Cabinet" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-around border-t bg-background md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Button
            key={item.href}
            asChild
            variant="ghost"
            size="icon"
            className={cn("flex-1 h-14 rounded-none", active && "text-primary")}
            aria-label={item.label}
          >
            <Link href={item.href}>
              <Icon className="h-5 w-5" />
            </Link>
          </Button>
        );
      })}

      {/* Logout button – same size, icon only */}
      <Button
        variant="ghost"
        size="icon"
        className="flex-1 h-14 rounded-none text-destructive"
        onClick={signOut}
        aria-label="Logout"
      >
        <LogOut className="h-5 w-5" />
      </Button>
    </div>
  );
}
