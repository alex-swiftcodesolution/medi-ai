"use client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">
        MediAI
      </Link>
      <div className="flex gap-2">
        {user ? (
          <>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/wallet">Wallet</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/cabinet">Cabinet</Link>
            </Button>
            <Button variant="ghost" onClick={signOut}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
