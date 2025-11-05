// app/dashboard/layout.tsx
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/dashboard-sidebar";
import MobileBottomNav from "@/components/mobile-nav-nav";
import DashboardContent from "@/components/dashboard-content";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {}
        },
        remove: (name, options) => {
          try {
            cookieStore.delete({ name, ...options });
          } catch {}
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  return (
    <AuthProvider>
      <div className="flex h-screen bg-background">
        {/* Desktop / Tablet Sidebar */}
        <DashboardSidebar className="hidden md:flex" />

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />

        {/* Main Content */}
        <DashboardContent>{children}</DashboardContent>
      </div>
    </AuthProvider>
  );
}
